Ext.define('TK.controller.docs.Ved', {
    extend: 'Ext.app.Controller',

    views: ['ved.List', 'ved.Form'],
    stores: ['Veds', 'Ved', 'VedVags', 'VedVagSmgses', 'VedSmgses', 'MenuPart', 'VedVagFilters', 'Smgses4Ved'],
    models: ['Ved', 'SmgsPlomb', 'VedVag', 'VedVagSmgs'],
    refs: [
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > vedlist button[action="create"]': {
                click: this.onCreate
            }
            ,'viewport > tabpanel > vedlist button[action="edit"]': {
                click: this.onEdit
            }
            ,'viewport > tabpanel > vedlist button[action="delete"]': {
                click: this.onDelete
            }

        });
    },
    initEvents: function(form){
        // Ext.each(form.query('button[action=change]'), function(item, index) {
        //     item.on('click', Ext.bind(this.onChangeData, form));
        // }, this);
        form.down('button[action=save]').on('click',this.onSave, this);
        form.down('button[action=save_close]').on('click',this.onSaveExit, this);
        // form.getComponent('vagList4Ved').down('button[action=load]').on('click', this.onLoad, this);
        form.getComponent('vagList4Ved').down('button[action=load]').onClick = Ext.bind(function(){
            var naklGrid = this.naklMulti.call(this);
            naklGrid.down('button[action=select]').on(
                'click',
                Ext.bind(this.selectGroups, form.getComponent('vagList4Ved'))
            );

            ///// сюда дописать обработчик кнопки показать документы
            naklGrid.down('menupart').down('button[action=load]').on(
                'click',
                Ext.bind(this.selectMar, naklGrid)
            );
        }, this);
        form.getComponent('vagList4Ved').on('cellcontextmenu', this.onContext, this);
        form.getComponent('vagList4Ved').on('render', this.beforeAct, this);
        form.getComponent('vagList4Ved').on('validateedit', this.onEditRecord, this);
        form.getComponent('vagList4Ved').on('edit', this.onAfterEditRecord, this);
//        form.getComponent('vagList4Ved').headerCt.getMenu().down('button[action=clear]').on('click', this.onClear, this);
        // form.getComponent('vagList4Ved').on('sortchange', function(){ alert("dsf"); return false}, this);

        // form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);
        // form.getComponent('smgs.provozPlata').on('change', this.onProvozPlata);
        // form.getComponent('smgs.sborCennost21').on('change', this.onProvozPlata);
        // form.getComponent('smgs.sborCennost2').on('change', this.onProvozPlata);
        // form.getComponent('smgs.sborCennost22').on('change', this.onProvozPlata);
        //
        // form.down('detailtabpanel[itemId=gruz_panel_tab]').on(
        //     'add',
        //     function(tabpanel, gruz, inx){
        //         if(tabpanel.isXType('detailtabpanel',true)) {
        //             gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
        //                 var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
        //                 nsiGrid.on('itemdblclick', this.selectGng, gruz);
        //             }, this);
        //             gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
        //                 var nsiGrid = this.getController('Nsi').nsiEtsng(gruz.getComponent('ekgvn').getValue()).getComponent(0);
        //                 nsiGrid.on('itemdblclick', this.selectEtsng, gruz);
        //             }, this);
        //         }
        //     },
        //     this
        // );
        // form.down('button[action=gruzOtpr]').on(
        //     'click',
        //     function(btn){
        //         var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g1r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //         nsiGrid.on('itemdblclick', this.selectOtprG1, form);
        //     },
        //     this
        // );
        // form.down('button[action=gruzPoluch]').on(
        //     'click',
        //     function(btn){
        //         var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g4r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //         nsiGrid.on('itemdblclick', this.selectOtprG5, form);
        //     },
        //     this
        // );
        //
        form.query('#ved\\.stnoutn')[0].onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.query('#ved\\.stnoutn')[0].getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStnoutn, form);
        }, this);

        form.query('#ved\\.stninn')[0].onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.query('#ved\\.stninn')[0].getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStninn, form);
        }, this);

        form.query('#ved\\.carroutn')[0].onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiCarrier(form.query('#ved\\.carroutn')[0].getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCarrierOut, form);
        }, this);

        form.query('#ved\\.carrinn')[0].onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiCarrier(form.query('#ved\\.carrinn')[0].getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCarrierIn, form);
        }, this);

        // form.getComponent('smgs.g101r').onTriggerClick = Ext.bind(function(){
        //     var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101r').getValue()).getComponent(0);
        //     nsiGrid.on('itemdblclick', this.selectStaG101r, form);
        // }, this);
        // form.down('button[action=plat]').on(
        //     'click',
        //     function(btn){
        //         var nsiGrid = this.getController('Nsi').nsiPlat(form.getComponent('smgs.cimSmgsPlatels[0].platR').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //         nsiGrid.on('itemdblclick', this.selectPlat, form);
        //     },
        //     this
        // );
        //
        // Ext.each(form.query('textfield'), function(item, index) {
        //     item.on('focus', Ext.bind(this.onDivBlur, form));
        // }, this);
        // form.getComponent('disp.gruz').on({
        //     click: {
        //         element: 'el', //bind to the underlying el property on the panel
        //         fn: function(){
        //             this.onDivBlur.call(form);
        //             this.getController('Nsi').onDivFocus.call(form.getComponent('disp.gruz'));
        //         },
        //         scope:this
        //     }
        // });
    },

    onEditRecord: function(editor, ctx){
        var oldIndexNvag = 0,
            oldRecord,
            nvag, mbrt = 0,
            columnIndexes = ['nvag'],
            columnIndexes4Replace = ['indexNum', 'owner', 'kind', 'gp', 'axes', 'tara'],
            columnIndexes4Dublicate = ['indexNum', 'owner', 'kind', 'gp', 'axes', 'tara'];
        Ext.Array.each(columnIndexes, function (columnIndex) {
            if (ctx.field === columnIndex) {
                oldRecord =  ctx.grid.getStore().findRecord(columnIndex, ctx.value);
                if (oldRecord !== null) {
                    // oldRecord = ctx.grid.getStore().getAt(oldIndexNvag);
                    Ext.Array.each(columnIndexes4Replace, function (cIdx) {
                        ctx.record.set(cIdx, oldRecord.get(cIdx));
                    });
                }
            }
        });
        if (Ext.Array.contains(columnIndexes4Dublicate, ctx.field)) {
            nvag = ctx.record.get('nvag');
            if (nvag !== '') {
                do {
                    oldIndexNvag = ctx.grid.getStore().findExact('nvag', nvag, oldIndexNvag);
                    if (oldIndexNvag !== -1) {
                        oldRecord = ctx.grid.getStore().getAt(oldIndexNvag);
                        oldRecord.set(ctx.field, ctx.value);
                        oldIndexNvag++;
                    }
                } while (oldIndexNvag !== -1)
            }
        }
        if (ctx.field === 'kontTara') {
            if ( Ext.isNumber(ctx.record.get('mbrt')))
                mbrt = ctx.record.get('mbrt');
            if (Ext.isNumber(ctx.originalValue))
                mbrt -= ctx.originalValue;
            ctx.record.set('mbrt', mbrt + ctx.value);

        }
    },

    onAfterEditRecord: function(editor, ctx){
        var columnIndexes = ['nvag', 'indexNum'];
        if (ctx.column.addFilter != null) {
            ctx.grid.initFilterStore();
        }
        if (Ext.Array.contains(columnIndexes, ctx.field))
            ctx.grid.reSort();
    },

    beforeAct: function(ths){
        ths.filters.menuFilterText = this.filterText;
        var menu = ths.headerCt.getMenu(),
            me = this;
        ths.initFilterStore();

        menu.remove('ascItem');
        menu.remove('descItem');
        // menu.removeAll();
        var addPoints = menu.add({
                text: me.claerAll,
                iconCls: 'del1',
                action: 'clear'
            }, {
                text: me.duplicateAll,
                iconCls: 'copyData',
                action: 'copy'
            }, {
                text: me.duplicateEmpty,
                iconCls: 'copyData',
                action: 'copyToEmpty'
            }, {
                text: me.userfiltr,
                iconCls: 'filterData',
                action: 'filterData'
            }
        );
        menu.down('menuitem[action=clear]').on('click', this.onClear, ths);
        menu.down('menuitem[action=copy]').on('click', this.onCopy, ths);
        menu.down('menuitem[action=copyToEmpty]').on('click', this.onCopyToEmpty, ths);
        menu.down('menuitem[action=filterData]').onClick =  Ext.bind(function(){
            var filtrGrid = this.filtrVed.call(this, ths);
                filtrGrid.down('button[action=select]').on(
                    'click',
                    Ext.bind(this.selectData4Filter, ths)
                );
                // filtrGrid.onRender =  Ext.bind(this.onRenderFilter, ths)
            }
        , this);

        menu.on('beforeshow', function() {
            menu.items.each(function (point) {
                if (Ext.Array.contains(addPoints, point)) {
                    if (menu.activeHeader.addUserMenu != null) {
                        if (point.action === 'filterData')
                            if (menu.activeHeader.addFilter != null)
                                point.show();
                            else
                                point.hide();
                        else
                            point.show();
                    } else
                        point.hide();
                }
                else
                    point.hide();
            });
        });

    },

    selectData4Filter: function(btn){
        var grid = this,
            activeDataIndex = grid.headerCt.getMenu().activeHeader.dataIndex,
            selModel = btn.up('window').down('grid').selModel,
            selected = selModel.getSelection(),
            curFilter = grid.filters.getFilter(activeDataIndex),
            curColumn = grid.down('[dataIndex='+activeDataIndex+']');
        if (selected.length !== 0) {
            if (selected.length !== selModel.getStore().getCount()) {
                var filtersValue = [];
                Ext.each(selected, function (rec) {
                    filtersValue.push(rec.data['colVal'])
                });
                if (!curFilter)
                    curFilter = grid.filters.addFilter({dataIndex: activeDataIndex, type: 'list'});
                curFilter.setValue(filtersValue);
                if (!curFilter.active)
                    curFilter.setActive(true, false);
                grid.filters.reload();
                curColumn.addCls('green');
            }
            else {
                curFilter.setActive(false, false);
                curColumn.removeCls('green');
            }
        }
        else
            if (curFilter) {
                curFilter.setActive(false, false);
                curColumn.removeCls('green');
            }


    },

    onClear: function(){
        this.getStore().each(function(record) {
            this.getView().getRecord(record).data[this.headerCt.getMenu().activeHeader.dataIndex] = '';
        }, this);
        this.getView().refresh();
    },

    onCopy: function(){
        var sel = this.selModel.getLastSelected();
        if (sel) {
            var valToCopy = sel.data[this.headerCt.getMenu().activeHeader.dataIndex];
            if (valToCopy !== '') {
                this.getStore().each(function (record) {
                    this.getView().getRecord(record).data[this.headerCt.getMenu().activeHeader.dataIndex] = valToCopy;
                }, this);
                this.getView().refresh();
            }
        }
    },

    onCopyToEmpty: function(){
        var sel = this.selModel.getLastSelected();
        if (sel) {
            var valToCopy = sel.data[this.headerCt.getMenu().activeHeader.dataIndex];
            if (valToCopy !== '') {
                this.getStore().each(function (record) {
                    var toVal = this.getView().getRecord(record).data[this.headerCt.getMenu().activeHeader.dataIndex];
                    if (toVal === '' || toVal === null || toVal === 'null' || toVal === '0' || toVal === 0)
                        this.getView().getRecord(record).data[this.headerCt.getMenu().activeHeader.dataIndex] = valToCopy;
                }, this);
                this.getView().refresh();
            }
        }
    },

    onContext: function(ths, td, cellIndex, record, tr, rowIndex, e){
        // e.stopEvent();
        var dataIndex = ths.ownerCt.columns[cellIndex].dataIndex,
        cellValue, ctxMenu;
        if (dataIndex == 'perVed') {
            e.stopEvent();
            cellValue = record.get(dataIndex);
            if (cellValue != null && cellValue != '')
                this.addToMenu(cellValue);
            else {
                this.buildMenu(ths, e);
                // ctxMenu = this.buildMenu();
                // if (ctxMenu != null) {
                //     ctxMenu.showAt(e.getXY());
                // }
            }
        }
    },

    addToMenu:function(value) {
        var data =sessionStorage.getItem('contextMenu')
            ,data4Menu = [];
        if (data != null)
            data4Menu = JSON.parse(data);
        if (!Ext.Array.contains(data4Menu, value))
            data4Menu.push(value);
        sessionStorage.setItem("contextMenu", JSON.stringify(data4Menu))
    },

    buildMenu: function(view, e) {
        var data =sessionStorage.getItem('contextMenu')
            ,data4Menu
            ,ctxMenu;
        if (data != null) {
            data4Menu = JSON.parse(data);
            if (data4Menu.length != 0) {
                ctxMenu = Ext.create('Ext.menu.Menu', {
                    width: 100,
                    showSeparator: false,
                    plain: true,
                    buttonAlign: 'left'
                });
                for (var i=0; i<data4Menu.length; i++) {
                    ctxMenu.add({text: data4Menu[i], handler: function (btn) {
                            view.getSelectionModel().lastSelected.data.perVed = btn.text;
                            view.refresh();
                            // view.getSelectionModel().selected.set(btn.text, 'perVed');
                        } });
                }
                ctxMenu.showAt(e.getXY());
            }
        }
    },

    onCreate: function(btn){
        var doc = this.getCenter().add({xtype:'ved'/*, title:'Ведомости'*/});
        doc.initServiceFields({task:'create'});
        Ext.getStore('Ved').removeAll();
        doc.initForm();
        this.initEvents(doc);
        this.getCenter().setActiveTab(doc);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
    },

    onEdit: function(btn){
        // sessionStorage.removeItem('contextMenu');
        var list = btn.up('grid'),
            data,
            doc,
            store,
            menuItem = this.getMenutree().lastSelectedLeaf,
            titleAdd = menuItem.data['id'].indexOf('ved') !== -1 ? menuItem.data['text'] : "";
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');

        doc = this.getCenter().add({xtype:'ved', title:this.titleEdit + titleAdd, closable:false});
        // doc = this.getCenter().add({xtype:'ved'/*, title:'Ред. Проект'*/});
        data = list.selModel.getLastSelected().data;
        doc.initServiceFields({
            task:'edit',
            'ved.hid':data.hid
        });
        store = Ext.getStore('Ved'); /*||  Ext.create('Ext.data.Store', {model:'TK.model.Project', storeId: 'Projects1'})*/
        store.load({
            params:{'ved.hid':data.hid},
            scope: this,
            callback: function(records, operation, success) {
                doc.initForm('ved');
                this.initEvents(doc);
                this.getCenter().getEl().unmask();
                this.getCenter().setActiveTab(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
            }
        });
    },


    onDelete: function(btn){
        var list = btn.up('grid'),
	        me = this;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            initObj = function(data){
                var initObj = {task:'delete'};
                initObj['ved.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title: list.delMsg1, msg: list.delMsg2, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes')
                {
                    Ext.Ajax.request({
                        url: 'Ved_delete.do',
                        params: initObj(data),
                        scope: list,
                        success: function(response, options) {
                            var text = Ext.decode(response.responseText);
                            if (text.success !== true)
                                Ext.MessageBox.show({
                                    title: list.delErr1,
                                    msg: list.delErr2,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            this.store.load();
                        },
                        failure: function(response){
                            if (response.responseText){
                                var errors = Ext.decode(response.responseText);
                                if(errors.cause && errors.cause.indexOf('ConstraintViolationException') != -1){
                                    Ext.MessageBox.show({
                                        title: me.showTitle,
                                        msg: me.showMsg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                } else {
                                    TK.Utils.makeErrMsg(response, me.errorMsg);
                                }
                            }
                        }
                    });
                }
            }
        });
    },

    onSave:function(btn){
        var panel = btn.up('form'),
            doc =   tkUser.docs.getByKey(panel.xtype) ||
                    tkUser.docs.getByKey(panel.xtype+'list') || // invoices
                    tkUser.docs.getByKey(panel.ownerCt.xtype);  // files
            // buildStatus = function(){
            //     var form = panel.getForm(),
            //         statusFid = form.findField('status');
            //
            //     if(!form.findField(doc.prefix+'.hid').getValue()){
            //         statusFid.setRawValue(1);
            //     } else {
            //         statusFid.setRawValue(13);
            //     }
            // };
        if(panel.getForm().isValid() && panel.isGridDataValid()){
            // buildStatus();
            var params = panel.prepareGridData4Save();
            panel.getForm().submit({
			    waitMsg: this.waitMsg,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: params,
	            scope:this,
			    success: function(form, action) {
                    panel.initServiceFields(action.result.hid, true, action.result.doc);
                    if(form.findField('task') /*&& form.findField('task').getValue() == 'copy'*/){
                        form.findField('task').setRawValue('edit');
                    }
                    // if(panel.doStatus) panel.doStatus();
                    // if panel child of list doc type
                    var list= this.getCenter().child(panel.xtype+'list');
                    if(list){
                        list.on('activate', this.onActivateList, this);
                    }

                    // activate epd if saved doc is not epd
                    // var docTypeHidField = form.findField(doc.prefix+'.docType1'),
                    //     epdTypeHid = 0;
                    // if(docTypeHidField && docTypeHidField.getValue() != epdTypeHid){  // doc is not epd
                    //     var epdTab = this.findDocInPackByFieldValue('form', 'smgs.docType1', epdTypeHid);
                    //     if(epdTab && !epdTab.hasListener('activate')){
                    //         epdTab.on('activate', this.onActivateForm, this);
                    //     }
                    // }
			    },
			    failure: panel.failureAlert
			});
		} else {
    		TK.Utils.failureDataMsg();
    	}
    },

    onSaveExit: function(btn){
        var panel = btn.up('form'),
            doc =   tkUser.docs.getByKey(panel.xtype) ||
                    tkUser.docs.getByKey(panel.xtype+'list') || // invoices
                    tkUser.docs.getByKey(panel.ownerCt.xtype);  // files
        if(panel.getForm().isValid() && panel.isGridDataValid()){
            var params = panel.prepareGridData4Save();
            panel.getForm().submit({
                waitMsg:this.waitMsg,
                url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: params,
                scope:this,
                success: function(form, action) {
                    var closeBtn = btn.up('panel').down('button[action="close"]');
                    closeBtn.fireEvent('click',closeBtn);
                },
                failure: panel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },

    selectMar: function(btn) {
        var gridMar = btn.up('menupart'),
            gridSmgs = btn.up('window').down('grid'),
            ids = [],
            gridParams = {};

        if (gridMar.selModel.getSelection().length != 0) {
            Ext.each(gridMar.selModel.getSelection(), function (rec) {
                ids.push(rec.get('id').split('_')[2]);
            });

            gridSmgs.ownerCt.el.mask(/*'Загрузка...'*/);
            // delete gridSmgs.store.getProxy().extraParams['search.routeId'];

            gridParams = {'search.routeIds':ids, 'search.type':112, 'search.params':'ved', 'task':'list', 'limit':1000};
            Ext.apply(gridSmgs.getStore().getProxy().extraParams, gridParams);
            gridSmgs.store.load({
                scope: this,
                // params: {'search.routeIds':ids, 'search.type':112, 'search.params':'ved', 'task':'list', 'limit':1000},
                callback: function () {
                    gridSmgs.ownerCt.el.unmask();
                }
            });
        }
    },

    selectGroups: function(btn) {
        var window =  btn.up('window'),
            grid = window.down('grid'),
            ids = [],
            vagStore = Ext.getStore('VedSmgses'),
            vagGrid = this,
            maxIndex = this.store.max('indexNum') || 0;
        if (grid.selModel.getSelection().length != 0) {
            Ext.each(grid.selModel.getSelection(), function (rec) {
                ids.push(rec.get('hid'));
            });
            // vagStore = Ext.data.StoreManager().lookup('VedSmgses');
            vagStore.load({
                scope: this,
                params: {'search.ids':ids},
                callback: function () {
                    vagStore.each(function(record){
                        var rec = record.copy();

                        var oldIndexNvag =  vagGrid.store.find("nvag", rec.get('nvag'));
                        if (oldIndexNvag !== -1) {
                            var oldRecord = vagGrid.store.getAt(oldIndexNvag);
                            rec.set('indexNum', oldRecord.get('indexNum'));
                        }
                        else {
                            rec.set('indexNum', ++maxIndex);
                        }
                        vagGrid.store.add(rec);
                    });
                    vagGrid.reSort();
                    // vagGrid.store.sort([
                    //     {
                    //         property : 'indexNum',
                    //         direction: 'ASC'
                    //     }, {
                    //         property : 'nvag',
                    //         direction: 'DESC'
                    //     }]
                    // );

                    // vagGrid.store.sort("indexNum","ASC");
                    vagGrid.getView().refresh();
                    vagGrid.initFilterStore();

                    // grid.ownerCt.el.unmask();

                }
            });

        }
        // toStore.add(grid.selModel.getSelection());
        // this.getView().refresh();
        grid.store.removeAll();
        window.close();
    },

    naklMulti: function(){
        return Ext.widget('window', {
            title: this.labelDocs,
            width:1100, y:1,
            height:700,
            modal:true,
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: 5
            },
            autoShow: true,
            items:[{
                flex: 1,
                layout: 'anchor',
                xtype: 'menupart',
                autoScroll: true
            }, {
                flex: 4,
                xtype: 'grid',
                enableColumnResize: false,
                columnLines: true,
//                forceFit: true,
//                autoHeight:true,
                selType:     'checkboxmodel',
                selModel: {mode : 'MULTI'},
                viewConfig: {
                    stripeRows: true,
                    singleSelect:true
                },
                store:'Smgses4Ved',
                columns: {
                    items:[
                        {text: this.headerRoute, dataIndex: 'route',flex:2, renderer: TK.Utils.renderLongStr},
                        {text: this.headerCreate, dataIndex: 'altered',flex:1, renderer: TK.Utils.renderLongStr},
                        {text: this.headerNumClaim, dataIndex: 'numClaim',flex:1},
                        {text: this.headerVags, dataIndex: 'vags', flex:2, renderer: TK.Utils.renderLongStr},
                        {text: this.headerKont, dataIndex: 'konts', flex:2, renderer: TK.Utils.renderLongStr},
                        {text: this.headerTrain, dataIndex: 'npoezd', flex:2, renderer: TK.Utils.renderLongStr},
                        {text: this.headerNstn, dataIndex: 'nstn', flex:2, renderer: TK.Utils.renderLongStr},
                        {text: this.headerGng, dataIndex: 'gng', flex:1, renderer: TK.Utils.renderLongStr}
                    ],
                    defaults:{
                        sortable:false,
                        hideable:false,
                        menuDisabled:true,
                        draggable:false,
                        groupable:false
                    }
                },
                listeners: {
                    render : function(grid){
                        // grid.ownerCt.el.mask(/*'Загрузка...'*/);
                        // grid.store.load({
                        //     scope: this,
                        //     params: {'search.type':112, 'search.params':'ved', 'task':'list', 'limit':1000},
                        //     callback: function () {
                        //         grid.ownerCt.el.unmask();
                        //     }
                        // });
                    },
                    scope: this
                }
            }],
            dockedItems: [{
                dock:   'bottom',
                xtype:  'toolbar',
                items: ['->',
                    '-', {
                        text:    this.btnSelect,
                        action:  'select'
                    },
                    '-', {
                        text:   this.btnClose,
                        handler:function(btn) {
                            btn.up('window').down('grid').store.removeAll();
                            btn.up('window').close();
                        }
                    }]
            }]
        });
    },

    filtrVed: function(grid){
        var activeDataIndex = grid.headerCt.getMenu().activeHeader.dataIndex,
            filtersStore = Ext.getStore('VedVagFilters'),
            currentFilters = grid.filters.getFilterItems();

        // var filterStore = Ext.create('Ext.data.Store', {
        //     fields: [
        //         {name: activeDataIndex, type: 'string'}
        //     ]
        // });
        // var data = grid.getStore().collect(activeDataIndex).map(function(val){
        //     var tmp = {};
        //     tmp[activeDataIndex] = val;
        //     return tmp;
        // });
        // filterStore.loadData(data);

        return Ext.widget('window', {
            title: this.labelFilter,
            width:250,
            y:200,
            height:300,
            modal:true,
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: 5
            },
            autoShow: true,
            items:[{
//                 flex: 1,
//                 layout: 'anchor',
//                 xtype: 'menupart',
//                 autoScroll: true
            
                flex: 4,
                xtype: 'grid',
                enableColumnResize: false,
                columnLines: true,
//                forceFit: true,
//                autoHeight:true,
                selType:     'checkboxmodel',
                selModel: {mode : 'MULTI'},
                viewConfig: {
                    stripeRows: true,
                    singleSelect:true
                },
                store: filtersStore,
                features: [{
                    ftype: 'filters',
                    local: true,
                    updateBuffer: 200

                }],
                columns: {
                    items:[
                        {text: this.filterHeader, dataIndex: 'colVal', flex:1, renderer: TK.Utils.renderLongStr}
                    ],
                    defaults:{
                        sortable:false,
                        hideable:false,
                        menuDisabled:true,
                        draggable:false,
                        groupable:false
                    }
                },
                listeners: {
                    afterrender : function(grid){
                        grid.getStore().clearFilter();
                        grid.getStore().filter('colId', activeDataIndex);
                        Ext.Array.each(currentFilters, function (filter) {
                            if (filter.active &&  filter.dataIndex === activeDataIndex) {
                                Ext.Array.each(grid.getStore().data.items, function (record) {
                                    if (Ext.Array.contains(filter.getValue(), record.data['colVal']))
                                        grid.getSelectionModel().select(record, true, true);
                                })
                            }
                        });
                    },
                    scope: this
                }
            }],
            dockedItems: [{
                dock:   'bottom',
                xtype:  'toolbar',
                items: ['->',
                    '-', {
                        text:    this.btnSelect,
                        action:  'select'
                    },
                    '-', {
                        text:   this.btnClose,
                        handler:function(btn) {
                            // btn.up('window').down('grid').store.removeAll();
                            btn.up('window').close();
                        }
                    }]
            }]

        });
    },
    selectStnoutn: function(view, record, item, index) {
        var data = record.data;
        this.query('#ved\\.stnoutn')[0].setValue(data.staName);
        this.query('#ved\\.railoutn')[0].setValue(data.mnamerus);
        this.query('#ved\\.stnoutc')[0].setValue(data.staNo);
        view.up('window').close();
    },

    selectStninn: function(view, record, item, index) {
        var data = record.data;
        this.query('#ved\\.stninn')[0].setValue(data.staName);
        this.query('#ved\\.railinn')[0].setValue(data.mnamerus);
        this.query('#ved\\.stninc')[0].setValue(data.staNo);
        view.up('window').close();
    },

    selectCarrierOut: function(view, record, item, index) {
        var data = record.data;
        this.query('#ved\\.carroutc')[0].setValue(data.carrNo);
        this.query('#ved\\.carroutn')[0].setValue(data.carrNameShort);
        view.up('window').close();
    },

    selectCarrierIn: function(view, record, item, index) {
        var data = record.data;
        this.query('#ved\\.carrinc')[0].setValue(data.carrNo);
        this.query('#ved\\.carrinn')[0].setValue(data.carrNameShort);
        view.up('window').close();
    }

//     selectGng:function (view, record, item, index) {
//         var data = record.data;
//         this.getComponent('kgvn').setValue(data['code']);
//         this.getComponent('nzgr').setValue(data['name']);
//         this.getComponent('ohr').setValue(data['ohr']);
//         view.up('window').close();
//     },
//     selectEtsng:function (view, record, item, index) {
//         var data = record.data;
//         this.getComponent('ekgvn').setValue(data.code);
//         this.getComponent('enzgr').setValue(data.name);
//         this.getComponent('ohr').setValue(data['ohr']);
//         view.up('window').close();
//     },
//     onDivBlur: function(){
//         var comp = this.getComponent('disp.gruz');
//         comp.removeCls('div-active');
//         comp.addCls('bg-c-white');
//     },
//     selectCountriesG1: function(view, record, item, index) {
//         var data = record.data;
//         this.getComponent('gOtpr_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
//         this.getComponent('gOtpr_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data.naim);
//         view.up('window').close();
//     },
//     selectCountriesG5: function(view, record, item, index) {
//         var data = record.data;
//         this.getComponent('gPoluch_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
//         this.getComponent('gPoluch_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data.naim);
//         view.up('window').close();
//     },
//     selectStaG101r: function(view, record, item, index) {
//         var data = record.data;
//         this.getComponent("smgs.g101r").setValue(data.staName);
//         this.getComponent("smgs.g102r").setValue(data.roadname ? data.roadname + ' ж.д.' : '');
//         this.getComponent("smgs.g121").setValue(data.staNo);
//         view.up('window').close();
//     },
//     onG24:function(field){
//         var arr;
//         this.getController('Nsi').onG24.apply(field);
// //        field.ownerCt.getComponent('massa_propis').setText(TK.Utils.num2str(field.getValue()+''));
//         if(field.getValue()){
//             arr = (field.getValue()+'').split('.');
//             field.ownerCt.getComponent('massa_propis').setText(TK.Utils.num2str(arr[0]) + (arr[1] ? '.'+arr[1]:'') + ' кг');
//         } else {
//             field.ownerCt.getComponent('massa_propis').setText('');
//         }
//     },
//     selectOtprG1: function(view, record, item, index) {
//         var data = record.data,
//             g1r = data['g1r'] ? data['g1r'] : '';
//         g1r += data['g3'] ? ' Код ОКПО ' + data['g3'] : '';
//         g1r += data['g_2inn'] ? ' Код ИНН ' + data['g_2inn'] : '';
//         this.getComponent('smgs.g1r').setValue(g1r);
//         this.getComponent('smgs.g19r').setValue(data['g18r_1']+' '+data['g19r']);
//         this.getComponent('smgs.g2').setValue(data['g3']);
//         this.getComponent('smgs.g2_1').setValue(data['g2']);
//         this.getComponent('smgs.g_2inn').setValue(data['g_2inn']);
//         view.up('window').close();
//     },
//     selectOtprG5: function(view, record, item, index) {
//         var data = record.data,
//             g4r = data['g1r'] ? data['g1r'] : '';
//         g4r += data['g3'] ? ' Код ОКПО ' + data['g3'] : '';
//         g4r += data['g_2inn'] ? ' Код ИНН ' + data['g_2inn'] : '';
//         this.getComponent('smgs.g4r').setValue(g4r);
//         this.getComponent('smgs.g49r').setValue(data['g18r_1']+' '+data['g19r']);
//         this.getComponent('smgs.g5').setValue(data['g3']);
//         this.getComponent('smgs.g5_1').setValue(data['g2']);
//         this.getComponent('smgs.g_5inn').setValue(data['g_2inn']);
//         view.up('window').close();
//     },
//     selectPlat: function(view, record, item, index) {
//         var data = record.data;
//         this.getComponent('smgs.cimSmgsPlatels[0].platR').setValue(data['platR']);
//         this.getComponent('smgs.cimSmgsPlatels[0].kplat').setValue(data['kplat'] + ' ' + data['kplat1']);
//         view.up('window').close();
//     },
//     onProvozPlata:function(){
//         var owner = this.ownerCt,
//             val1 = parseFloat(owner.getComponent('smgs.provozPlata').getValue()),
//             val2 = parseFloat(owner.getComponent('smgs.sborCennost21').getValue()),
// 	        val3 = parseFloat(owner.getComponent('smgs.sborCennost2').getValue()),
// 	        val4 = parseFloat(owner.getComponent('smgs.sborCennost22').getValue()),
//             g24B = owner.getComponent('smgs.otprItogo'), newsum;
//         if(isNaN(val1)) val1 = 0;
//         if(isNaN(val2)) val2 = 0;
// 	    if(isNaN(val3)) val3 = 0;
// 	    if(isNaN(val4)) val4 = 0;
//         newsum = val1 + val2 + val3 + val4;
//         g24B.setValue(newsum > 0 ? newsum.toFixed(2) : '');
//     },
//     onChangeData:function(btn){
//     	var panel = this.getComponent(btn.itemId + 'panel') || this.getComponent(btn.itemId.split('_')[0] + '_panel'),
//             tabpanels = panel.query('detailtabpanel');
//
//         for(var i = 0; i < tabpanels.length; i++){
//             if(tabpanels[i].items.getCount() == 0){
//                 tabpanels[i].onAddTab();
//             }
//         }
//
//         panel.show();
//     	this.maskPanel(true);
//     },
//     onCopyEpd: function(btn){
//         alert('sdf');
//         var epd = this.getCenter().child('epd'),
//             smgs,
//             smgsForm,
//             epdForm;
//
//         if(epd && epd.hasListener('activate')) {
//             Ext.MessageBox.show({
//                 title: this.titleEpd,
//                 msg: this.msgEpd,
//                 buttons: Ext.MessageBox.OK,
//                 icon: Ext.MessageBox.WARNING
//             });
//         }
//         else if(epd){
//             epdForm = epd.getForm();
//             smgs = btn.up('gu29k');
//             smgsForm = smgs.getForm();
//             smgsForm.findField('smgs.g1r').setValue(epdForm.findField('smgs.g1r').getValue());
//             smgsForm.findField('smgs.g19r').setValue(epdForm.findField('smgs.g19r').getValue());
//             smgsForm.findField('smgs.g4r').setValue(epdForm.findField('smgs.g4r').getValue());
//             smgsForm.findField('smgs.g49r').setValue(epdForm.findField('smgs.g49r').getValue());
//             smgsForm.findField('smgs.g162r').setValue(epdForm.findField('smgs.g162r').getValue());
//             smgsForm.findField('smgs.g692').setValue(epdForm.findField('smgs.g692').getValue());
//             smgsForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').getValue());
//             smgsForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid').getValue());
//         }
//     }/*,
/*    doPrint: function(doc, datas){
        var data = {};
        data.hid = datas.hid || datas[doc.prefix+'.hid'];
        data.type = datas.type || datas[doc.prefix+'.type'];
        Ext.create('Ext.window.Window',{
            title: 'Печать',
            width: 250,
            autoShow: true,
            items:{
                xtype:'form',
                bodyPadding: 5,
                items:{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Настройка',
                    vertical: true,
                    columns: 1,
                    allowBlank: false,
                    items: [
                        {boxLabel: 'Лицевая сторона', name: 'print.page1', inputValue: true},
                        {boxLabel: 'Оборот', name: 'print.page1Back', inputValue: true}
                    ]
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->','-',{
                    text: 'Печать',
                    handler: function(btn){
                        var panel = btn.up('window').down('form');
                        if(panel.getForm().isValid()){
                            window.open(
                                Ext.String.capitalize(doc.prefix) + '_view.do?'+
                                    doc.prefix+'.hid=' + data.hid +
                                    '&task=' + doc.name +
                                    (data.type ? '&search.type='+data.type : '') +
                                    '&' + Ext.Object.toQueryString(panel.getComponent(0).getValue()),
                                'DOC'+Math.ceil(100000*Math.random()),''
                            );
                        } else {
                            TK.Utils.failureDataMsg();
                        }
                    }
                },'-',{
                    text: 'Закрыть',
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }]
            }]
        });
    },*/
    /*onPrint: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var data = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
            this.getController('Docs').doPrintGU(doc, data);
        }
    }*/
});