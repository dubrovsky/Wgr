Ext.define('TK.view.ved.VagsList', {
    extend: 'TK.view.DocsList',
    alias: 'widget.ved-vags-list',

    height: 700,
    // autoHeight: true,
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.ux.grid.FiltersFeature',
        'TK.store.VedSmgses',
        'TK.view.ved.MenuPart'
        // 'Ext.form.field.Date',
        // 'Ext.form.field.Number',
        // 'Ext.form.field.Text',
        // 'Ext.form.field.TextArea',
        // 'Ext.form.field.Trigger',
        // 'Ext.grid.column.Date',
        // 'Ext.util.Format'
    ],

    sortableColumns: false,

    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'cellplugin'
    }],

    features: [{
        ftype: 'filters'
        ,local: true
        ,updateBuffer: 200
    }],

    buildStore:function (config) {
        config.store = 'VedVags';
        // config.store = Ext.data.StoreManager.lookup('VedNaklStore');
    },

    // buildBottomBar: function () {
    //     var buttons = this.callParent(arguments);
    //     buttons.splice(0, 2); // remove minus/delete
    //     return buttons;
    // },

    buildColumns: function (config) {
        config.columns = {
            items: [{
                text: this.colTextIndex,
                dataIndex: 'indexNum',
                width: 40,
                sortable: false,
                editor:{
                    xtype:'numberfield',
                    maxLength: 3,
                    minValue: 1,
                    hideTrigger: true
                }
            },{
                text: this.colTextNvag,
                dataIndex: "nvag",
                sortable: false,
                editor:{
                    xtype: 'textfield',
                    maxLength: 20
                    // validator: TK.Validators.vagNum
                },
                renderer: function(value, metaData) {
                    var result = TK.Validators.vagNum(value);
                    if (Ext.isString(result)) {
                        metaData.innerCls = 'red';
                        metaData.tdAttr = 'data-qtip="'+result+'"';
                    }
                    return value;
                }
                //,renderer: this.vagRenderer
            },{
                text: this.colTextOwner,
                dataIndex: "owner",
                width: 50,
                addUserMenu: true,
                sortable: false,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextKind,
                dataIndex: "kind",
                addUserMenu: true,
                sortable: false,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextGp,
                addUserMenu: true,
                width: 60,
                dataIndex: "gp",
                sortable: false,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
                },
                beforeRender: function() {
                     //Ext.grid.column.Column.prototype.beforeRender.call(this);
                     this.menuDisabled = false;
                }
                // listeners: {
                //     headerclick: function (ct, column, e) {e.stopEvent() }
                // }
            },{
                text: this.colTextAxes,
                addUserMenu: true,
                width: 50,
                dataIndex: "axes",
                sortable: false,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextTara,
                addUserMenu: true,
                width: 50,
                dataIndex: "tara",
                sortable: false,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text:this.colTextPlomb,
                columns: [{
                    text: this.colTextKpl,
                    width: 50,
                    dataIndex: 'kpl',
                    sortable: false,
                    editor: {
                        xtype: 'numberfield',
                        maxValue: 255
                    }
                }, {
                    text: this.colTextZnak,
                    dataIndex: 'znak',
                    sortable: false,
                    editor:{
                        xtype:'textfield',
                        maxLength: 1000
                    },
                    renderer: this.plombRenderer
                }/*, {
                    text: "Отправитель",
                    dataIndex: 'sname',
                    renderer: this.plombRenderer
                },{
                    text: 'Дата',
                    dataIndex: 'adddate',
                    xtype: 'datecolumn',
                    renderer: this.plombRenderer
                }*/]
            },{
                text: this.colTextNum,
                dataIndex: "numClaim",
                editor: {
                    xtype: 'textfield'
                    // maxLength: 20
                },
                sortable: false
            },{
                text: this.colTextDatpp,
                dataIndex: "g281",
                addUserMenu: true,
                sortable: false,

                editor: {
                    xtype: 'datefield',
                    format: 'd.m.Y'
                    // maxLength: 20
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
                ,renderer: this.dateRenderer
            },{
                text: this.colTextKsto,
                dataIndex: 'ksto',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            }, {
                text: this.colTextNsto,
                dataIndex: 'nsto',
                addUserMenu: true,
                sortable: false,
                editor: {
                    xtype: 'textfield'
                    // maxLength:10
                },
                addFilter: true,
                // filter: {
                //     type: 'string'
                // },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextKstn,
                dataIndex: 'kstn',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextNstn,
                dataIndex: 'nstn',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                addFilter: true,
                // filter: {
                //     type: 'string'
                // },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextKontNum,
                dataIndex: 'kont',
                editor:{
                    xtype:'textfield'
                },
                renderer: function(value, metaData) {
                    var result = TK.Validators.kontNum(value);
                    if (Ext.isString(result)) {
                        metaData.innerCls = 'red';
                        metaData.tdAttr = 'data-qtip="'+result+'"';
                    }
                    return value;
                },
                sortable: false
            },{
                text: this.colTextKontType,
                dataIndex: 'kontKind',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextKontGp,
                dataIndex: 'kontGp',
                width: 50,
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextKontTara,
                dataIndex: 'kontTara',
                width: 60,
                editor:{
                    xtype:'numberfield',
                    hideTrigger: true
                    // maxLength:10
                },
                sortable: false
            },{
                text: this.colTextPlaces,
                dataIndex: 'places',
                width: 40,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                sortable: false
            },{
                text: this.colTextPack,
                dataIndex: 'upak',
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                sortable: false
            },{
                text: this.colTextGruz,
                dataIndex: 'gng',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // maxLength:10
                },
                addFilter: true,
                // filter: {
                //     type: 'string'
                // },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            },{
                text: this.colTextGruzName,
                dataIndex: "gngn",
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield'
                    // xtype:'trigger',
                    // triggerCls:'x-form-search-trigger',
                    // editable: false,
                    // onTriggerClick: function () {
                    //     this.up('grid').fireEvent('showVedPerGruzy', this);
                    // }
                },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
                // renderer: this.gruzRenderer
            },{
                text: this.colTextMbrt,
                dataIndex: 'mbrt',
                editor: {
                    xtype: 'numberfield',
                    hideTrigger: true
                },
                sortable: false
                // renderer: this.gruzRenderer
            },{
                text: this.colTextPrim,
                dataIndex: "prim",
                editor: {
                    xtype: 'textarea',
                    maxLength: 256
                },
                sortable: false
            },{
                text: this.colTextPerVed,
                dataIndex: 'perVed',
                addUserMenu: true,
                sortable: false,
                editor:{
                    xtype:'textfield',
                    maxLength:10
                },
                addFilter: true,
                // filter: {
                //     type: 'string'
                // },
                beforeRender: function() {
                     this.menuDisabled = false;
                }
            }],
            defaults: {
                // flex: 1
            }
        };
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnAdd, iconCls: 'add1', scope: this, handler: this.onAddRecord},
                '-',
                {text: this.btnDelete, iconCls: 'delete1', scope: this, handler: this.onDelRecord},
                '-',
                {text: this.btnLoad, iconCls:'upload', scope: this, action: 'load'},
                '-',
                {text: this.btnCancelFilters, iconCls:'clear', scope: this, handler: this.onClearFilters}
            ]
        });
        // if(tkUser.hasPriv('CIM_DELETE')){
        //     config.dockedItems[0].items.push(
        //         {text: this.btnDelete,iconCls:'del',itemId:'del', action:'deleteFile'},{xtype: 'tbseparator', itemId:'del1'});
        // }
        // if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
        //     config.dockedItems[0].items.push(
        //         {boxLabel:this.lableDeleted, xtype:'checkbox', inputValue:1, uncheckedValue: 0, itemId:'viewDeleted', action:'viewDeletedFiles', hideLabel: true, forDeleted: true, forPresent: true},
        //         {xtype: 'tbseparator', itemId:'viewDeleted1', forDeleted: true, forPresent: true},
        //         {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restoreFile', forDeleted: true, hidden: true},
        //         {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
        //         {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroyFile', forDeleted: true, hidden: true},
        //         {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
        //     );
        // }
    },
    newRecord:function () {
        return Ext.create('TK.model.VedVag', {'indexNum':  (this.store.max('indexNum') || 0) + 1});
    },

    onAddRecord: function(btn){
        var r = this.newRecord(),
            rowEditing = this.plugins[0],
            selectedRec = btn.up('grid').selModel.getSelection()[0],
            ind = selectedRec ? this.getStore().indexOf(selectedRec) + 1 : this.store.getCount();
        rowEditing.cancelEdit();
        this.store.insert(ind, r);
        // this.buildConstValues();
        rowEditing.startEditByPosition({row: ind, column: 1});
    },

    onClearFilters: function(){
        var filterkeys = this.filters.filters.keys,
            me = this;
        Ext.Array.each(filterkeys, function (key) {
            me.filters.getFilter(key).setActive(false, false);
            me.down('[dataIndex='+key+']').removeCls("green")

        })
    },

    onDelRecord: function(btn) {
        var sel = this.selModel.getLastSelected();
        if (sel) {
            this.store.remove(sel);
            if(this.store.getCount() > 0) {
                this.selModel.select(0);
            }
            // this.buildConstValues();
//            this.getView().refresh();
        }
    },
    // buildConstValues:function() {
     //    me.store.each(function(rec, ind, len){
     //        rec.data['sort'] = ind;
     //    }, me);
	// },
    buildBottomToolbar: function(config) {
        // config.dockedItems.push({
        //     dock: 'bottom',
        //     xtype: 'pagingtoolbar',
        //     store: config.store,
        //     displayInfo: true
        // });
    },
    prepareData: function() {
        var data = {};
        this.store.each(function(vag, ind, len){
            data['ved.vedVag['+ind+'].indexNum'] = vag.get('indexNum');
            data['ved.vedVag['+ind+'].hid'] = vag.get('hid');
            data['ved.vedVag['+ind+'].hidCs'] = vag.get('hidCs');
            data['ved.vedVag['+ind+'].nvag'] = vag.get('nvag');
            data['ved.vedVag['+ind+'].owner'] = vag.get('owner');
            data['ved.vedVag['+ind+'].kind'] = vag.get('kind');
            data['ved.vedVag['+ind+'].gp'] = vag.get('gp');
            data['ved.vedVag['+ind+'].axes'] = vag.get('axes');
            data['ved.vedVag['+ind+'].tara'] = vag.get('tara');
            data['ved.vedVag['+ind+'].kpl'] = vag.get('kpl');
            data['ved.vedVag['+ind+'].znak'] = vag.get('znak');
            data['ved.vedVag['+ind+'].numClaim'] = vag.get('numClaim');
            data['ved.vedVag['+ind+'].g281'] = vag.get('g281');
            data['ved.vedVag['+ind+'].ksto'] = vag.get('ksto');
            data['ved.vedVag['+ind+'].nsto'] = vag.get('nsto');
            data['ved.vedVag['+ind+'].kstn'] = vag.get('kstn');
            data['ved.vedVag['+ind+'].nstn'] = vag.get('nstn');
            data['ved.vedVag['+ind+'].kont'] = vag.get('kont');
            data['ved.vedVag['+ind+'].kontKind'] = vag.get('kontKind');
            data['ved.vedVag['+ind+'].kontGp'] = vag.get('kontGp');
            data['ved.vedVag['+ind+'].kontTara'] = vag.get('kontTara');
            data['ved.vedVag['+ind+'].places'] = vag.get('places');
            data['ved.vedVag['+ind+'].upak'] = vag.get('upak');
            data['ved.vedVag['+ind+'].gng'] = vag.get('gng');
            data['ved.vedVag['+ind+'].gngn'] = vag.get('gngn');
            data['ved.vedVag['+ind+'].mbrt'] = vag.get('mbrt');
            data['ved.vedVag['+ind+'].prim'] = vag.get('prim');
            data['ved.vedVag['+ind+'].perVed'] = vag.get('perVed');
            // data['project.rts['+ind+'].forDeleted'] = route.get('forDeleted');
            // route.groups().each(function(group, ix){
            //     data['project.rts['+ind+'].grps['+ix+'].name'] = group.get('name');
            // });
            // route.docs().each(function(doc, inx){
            //     data['project.rts['+ind+'].dcs['+inx+'].hid'] = doc.get('hid');
            // });
        }, this);
        return data;
    },
    copyValues2MainFlds:function(){
        var veds = Ext.getStore('Ved'),
            ved = veds.first() || veds.add(Ext.create('TK.model.Ved'))[0];
        this.reSort();
        // Ext.getStore('VedVags').sort([
        //     {
        //         property : 'indexNum',
        //         direction: 'ASC'
        //     }, {
        //         property : 'nvag',
        //         direction: 'DESC'
        //     }]
        // );
        this.reconfigure(ved.vags());

    },

    reSort: function() {
        this.getStore().sort([
            {
                property : 'indexNum',
                direction: 'ASC'
            }, {
                property : 'nvag',
                direction: 'DESC'
            }]
        );
    },

    initFilterStore: function() {
        var me = this,
        filtersStore = Ext.getStore('VedVagFilters');
        filtersStore.clearFilter();
        filtersStore.removeAll();
        Ext.Array.each(me.getColumnManager().getColumns(), function (column) {
            if (column.addFilter != null) {
                me.getStore().collect(column.dataIndex).map(function(val){
                    filtersStore.add({colId: column.dataIndex, colVal: val});
                });
            }
        });
    },

    dateRenderer: function (data) {
        var result = '';
        if(Ext.isDate(data)){
            result += Ext.util.Format.date(data, "d.m.Y");
        } else {
            result += (data != null ? data : '');
        }
        return result;
    },

    // plombRenderer: function (value, metaData, nakl) {
    //     var result = '';
    //     nakl.vags().each(function(vag) {
    //         vag.plombs().each(function(plomb) {
    //             var data = plomb.get(metaData.column.dataIndex);
    //             if(Ext.isDate(data)){
    //                 result += Ext.util.Format.date(data);
    //             } else {
    //                 result += (data != null ? data : '');
    //             }
    //             result += '<br>';
    //         });
    //     });
    //     return result;
    // },
    //
    // gruzRenderer: function (value, metaData, nakl) {
    //     var result = '';
    //     nakl.vags().each(function(vag) {
    //         vag.gruzy().each(function(gruz) {
    //             var data = gruz.get(metaData.column.dataIndex);
    //             if(Ext.isDate(data)){
    //                 result += Ext.util.Format.date(data);
    //             } else {
    //                 result += (data != null ? data : '');
    //             }
    //             result += '<br>';
    //         });
    //     });
    //     return result;
    // },
    //
    vagRenderer: function (value, metaData, nakl) {
        var result = '';
        return result;
    }
});
