Ext.define('TK.controller.ky.Yard', {
    extend:'Ext.app.Controller',

    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.yard.List',
        'ky.yard.Form',
        'ky.yard.Filter',
        'ky.yard.KontsInPoezdIntoDir',
        'ky.yard.YardDir',
        'ky.yard.KontsAllDir',
        'ky.yard.AvtosOutDir',
        'ky.BaseYardDir',
        'ky.yard.KontsNoTranspDir',
        'ky.BaseYardDirFilter',
        'ky.yard.PoezdsOutDir',
        'ky.yard.KontsInAvtoIntoDir'
    ],
    stores: [
        'ky.Yards',
        'ky.YardSectors',
        'ky.YardsDir'
    ],
    models: [
        'ky.YardBase',
        'ky.Yard',
        'ky.YardSector'
    ],
    refs:[{
        ref: 'yardlist',
        selector: 'viewport > tabpanel grid'
    },{
        ref: 'yardform',
        selector: 'kyyardform > form'
    },{
        ref: 'yardsectorlist',
        selector: 'nsieditlist#yardsectorcontainer > grid'
    },{
        ref:'kontspoezdintoforyardlist',
        selector:'kykontsinpoezdintoyarddir > grid'
    },{
        ref:'kontsnotranspforyardlist',
        selector:'kykontsnotranspyarddir > grid'
    },{
        ref:'kontsallforyardlist',
        selector:'kykontsallyarddir > grid'
    },{
        ref: 'kontlist',
        selector: 'viewport > tabpanel #kykontlist'
    },{
        ref: 'yarddir',
        selector: 'kybaseyarddir'
    }],
    init:function () {
        this.listen({
            store: {
                '#ky.Yards': {
                    load: this.afterYardStoreLoad
                }
            }
        });

        this.control({
            'kyyardlist button[action="create"]': {
                click: this.createYard
            },
            'kyyardlist button[action="edit"]': {
                click: this.editYard
            },
            'kyyardlist': {
                itemdblclick: this.editYard,
                select: this.selectYardInList
            },
            'kyyardlist button[action="delete"]': {
                click: this.deleteYard
            }
            ,
            'kyyardlist button[action="filterKontYard"]': {
                click: this.filterKontYard
            },
            'kyyardlist button[action="grafYard"]': {
                click: this.grafYard
            },
            'kyyardforpoezdintodir button[action="filterYardDir"]': {
                click: this.filterYardDir
            },
            'kyyardforavtointodir button[action="filterYardDir"]': {
                click: this.filterYardDir
            },
            'kyyardnodir button[action="filterYardDir"]': {
                click: this.filterYardDir
            },
            'kyyardinyarddir button[action="filterYardDir"]': {
                click: this.filterYardDir
            },
            'kyyardfilter button[action="applyFilterKontYard"]': {
                click: this.applyFilterKontYard
            },
            'kybaseyarddirfilter button[action="applyFilterYardDir"]': {
                click: this.applyFilterYardDir
            },
            'kyyardform button[action="save"]': {
                click: this.saveYard
            },
            'kyyardform button[action="nsiYardSector"]': {
                click: this.showNsiYardSector
            },
            'nsieditlist#yardsectorcontainer > grid': {
                itemdblclick: this.selectYardSector,
                deleteYardSector: this.deleteYardSector,
                saveYardSector: this.saveYardSector
            },

            'kykontinpoezdintolist button[action="yardPlacesForKontList"]': {
                click: this.yardPlacesForKontInPoezdIntoList
            },
            'kykontinpoezdintolist': {
                yardCancel: this.yardPlacesCancelForKontInPoezdIntoList
            },
            'kykontinavtointolist': {
                yardCancel: this.yardPlacesCancelForKontInAvtoIntoList
            },


            'kykontinpoezdoutlist': {
                yardCancel: this.yardPlacesCancelForKontInPoezdOutList
            },
            'kykontinavtooutlist': {
                yardCancel: this.yardPlacesCancelForKontInAvtoOutList
            },

            'kykontinavtointolist button[action="yardPlacesForKontList"]': {
                click: this.yardPlacesForKontInAvtoIntoList
            },
            'kykontnotransplist button[action="yardPlacesForKontList"]': {
                click: this.yardPlacesForKontNoTranspList
            },
            'kyyardlist button[action="kontReposition"]': {
                click: this.yardPlacesForKontInYardList
            }
        });
    },
    createYard:function(btn){
        var yardcontainer = Ext.widget('kyyardform', {title: this.titleCreate});
        yardcontainer.down('form').loadRecord(Ext.create('TK.model.ky.Yard'));
    },
    editYard:function(btn){
        var yardlist = this.getYardlist();
        if(!TK.Utils.isRowSelected(yardlist)){
            return false;
        }

        var yardcontainer = Ext.widget('kyyardform', {title:this.titleEdit})
        yardcontainer.setLoading(true);

        var yard = Ext.ModelManager.getModel('TK.model.ky.Yard'),
            hid = yardlist.selModel.getLastSelected().get('hid');

        yard.load(hid, {
            scope:this,
            params:{action: 'edit'},
            callback: function(yard, operation, success) {
                if(success){
                    var form = yardcontainer.down('form');
                    this.checkForKontyardSector(yard.getSector(), form.getForm());
                    form.loadRecord(yard);
                }
                yardcontainer.setLoading(false);
            }
        });
    },
    saveYard:function(btn){
        var form = this.getYardform().getForm();
        if (form.isValid()) {
            var win = btn.up('window'),
                yard = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);

            yard.set(values);
            yard.save({
                params:{action: 'save'},
                callback: function(yard, operation, success) {
                    win.setLoading(false);
                    if(success){
                        win.close();
                        this.getKyYardsStore().reload();
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    checkForKontyardSector: function(sector, form){
        if(sector){
            var store = form.findField('sector.hid').getStore();
            store.removeAll();
            store.add(sector);
            form.findField('sector.hid').setValue(sector.get('hid'));
        }
    },
    deleteYard:function(btn){
        var yardlist = this.getYardlist();
        if(!TK.Utils.isRowSelected(yardlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    yardlist.setLoading(true);
                    var yard = yardlist.getSelectionModel().getLastSelected();
                    yard.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},
                        callback: function(yard, operation) {
                            yardlist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                yardlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    grafYard: function(btn){
        var win = Ext.widget('kygrafyardform');
        //var yardlist = this.getYardlist();

        //this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterKontYard: function(btn){
        var win = Ext.widget('kyyardfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterYardDir: function(btn){
        var win = Ext.widget('kybaseyarddirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    applyFilterKontYard:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getYardlist().getStore());
        }
    },
    applyFilterYardDir:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getYarddir().getStore());
        }
    },
    afterYardStoreLoad: function(store, records, successful){
        this.stylingFilterBtn();
    },
    stylingFilterBtn: function(){
        /*var filter_btn = this.getYardlist().down('button[action="filterKontYard"]'),
            store = this.getYardlist().getStore();

        if(store.filters.getCount() > 0){
            filter_btn.setIconCls('filter_check');

        } else {
            filter_btn.setIconCls('filter');

        }*/

    },
    showNsiYardSector: function(btn){
        var me = this;

            Ext.widget('nsieditlist', {
                width:700,
                editPrivileg:'CIM_KONT_YARD',
                searchEmptyText:me.headerName,
                itemId:'yardsectorcontainer',
    //            search:query,
                buildTitle:function (config) {
                    config.title = this.titleKontSector;
                },
                /*buildStore:function (config) {
                    config.items.store = me.getKyYardSectorsStore();
                },*/
                buildStoreModel:function () {
                    return 'TK.model.ky.YardSector';
                },
                buildUrlPrefix:function () {
                    return 'ky/secure/YardSector';
                },
                buildColModel:function (config) {
                    config.items.columns = [
                        {xtype:'actioncolumn',
                            width:55,
                            items:[
                                {icon:'./resources/images/save.gif', tooltip:this.ttipSave, action:'save', handler: function(view, rowIndex, colIndex){
                                    var yardsectorlist = view.up('grid'),
                                        yardsector = yardsectorlist.getStore().getAt(rowIndex);
                                    yardsectorlist.fireEvent('saveYardSector', yardsectorlist, yardsector);
                                }},
                                {icon:'./resources/images/delete.png', tooltip:this.ttipDel, action:'delete', handler: function(view, rowIndex, colIndex){
                                    var yardsectorlist = view.up('grid'),
                                        yardsector = yardsectorlist.getStore().getAt(rowIndex);
                                    yardsectorlist.fireEvent('deleteYardSector', yardsectorlist, yardsector);
                                }}
                            ]
                        },
                        {text:this.headerName, dataIndex:'name', flex:1, editor:{xtype:'textfield', maxLength:20}, renderer:TK.Utils.renderLongStr},
                        {text:this.headerDescr, dataIndex:'descr', flex:1, editor:{xtype:'textfield', maxLength:100}, renderer:TK.Utils.renderLongStr}
                    ];
                },
                newRecord:function () {
                    return Ext.create('TK.model.ky.YardSector');
                }
            });
    }
    ,selectYardSector: function(view, yardsector){
        this.checkForKontyardSector(yardsector, this.getYardform().getForm());
        view.up('window').close();
    }
    ,deleteYardSector: function(yardsectorlist, yardsector){
        var owner = yardsectorlist.up('nsieditlist');
        if (!yardsector.phantom) {
            Ext.Ajax.request({
                url: 'secure/' + owner.buildUrlPrefix() + '_delete.do',
                params:owner.prepareData(yardsector),
                scope: this,
                success:function (response, options) {
                    this.getKyYardsStore().reload();

                    var kontsectorscombo = this.getYardform().getForm().findField('sector.hid');
                    if(kontsectorscombo.getValue() == yardsector.get('hid')){
                        owner.close();
                        kontsectorscombo.up('window').close();
                        /*kontsectorscombo.clearValue();
                        kontsectorscombo.getStore().remove(kontsectorscombo.findRecord('hid', yardsector.get('hid')));*/
                    } else {
                        yardsectorlist.getStore().reload();
                    }
                },
                failure:function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            yardsectorlist.getStore().remove(yardsector);
        }
    },
    saveYardSector: function(yardsectorlist, yardsector){
        var errors = yardsector.validate(),
            owner = yardsectorlist.up('nsieditlist'),
            rowEditing = yardsectorlist.plugins[0];
        rowEditing.completeEdit();
        if (errors.isValid()) {
            var newYardsector = (yardsector.getId() == null);
            Ext.Ajax.request({
                url: 'secure/' + owner.buildUrlPrefix() + '_save.do',
                params:owner.prepareData(yardsector),
                scope: this,
                success:function (response, options) {
                    if(!newYardsector) {
                        this.getKyYardsStore().reload();
                    }
                    yardsectorlist.getStore().reload();

                    var kontsectorscombo = this.getYardform().getForm().findField('sector.hid');
                    if(kontsectorscombo.getValue() == yardsector.get('hid')){
                        this.checkForKontyardSector(yardsector, this.getYardform().getForm());  // update sector in yard form
                    }
                },
                failure:function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    yardPlacesForKontInPoezdIntoList: function(btn){
        this.yardPlacesForKontList('kyyardforpoezdintodir', this.getKontlist());
    },
    yardPlacesCancelForKontInPoezdIntoList: function(){
        this.yardPlacesForKontList('kyyardcancelforpoezdintodir', this.getKontlist());
    },
    yardPlacesCancelForKontInPoezdOutList: function(){
        this.yardPlacesForKontList('kyyardcancelforpoezdoutdir', this.getKontlist());
    },
    yardPlacesCancelForKontInAvtoIntoList: function(){
        this.yardPlacesForKontList('kyyardcancelforavtointodir', this.getKontlist());
    },
    yardPlacesCancelForKontInAvtoOutList: function(){
        this.yardPlacesForKontList('kyyardcancelforavtooutdir', this.getKontlist());
    },
    yardPlacesForKontInAvtoIntoList: function(btn){
        this.yardPlacesForKontList('kyyardforavtointodir', this.getKontlist());
    },
    yardPlacesForKontNoTranspList: function(btn){
        this.yardPlacesForKontList('kyyardnodir', this.getKontlist());
    },
    yardPlacesForKontInYardList: function(btn){
        this.yardPlacesForKontList('kyyardinyarddir', this.getYardlist());
    },
    yardPlacesForKontList: function(xtype, list){
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }

        Ext.widget(xtype);

        var store = this.getKyYardsDirStore();
        store.currentPage = 1;
        store.clearFilter(true);
        store.getProxy().extraParams = {action: 'yardplaces_for_kont_list'};
        store.load();
    },
    selectYardInList: function(rowModel, yard, index){
        var yardlist = this.getYardlist(),
            unbindKontBtn = yardlist.down('button[action="unbindKont"]'),
            kontRepositionBtn = yardlist.down('button[action="kontReposition"]'),
            poezdOutForKontListBtn = yardlist.down('button[action="poezdOutDirForKont"]'),
            avtoOutForKontListBtn = yardlist.down('button[action="avtoOutDirForKont"]'),
            kontCreateBtn = yardlist.down('button[action="createKont"]'),
            kontEditBtn = yardlist.down('button[action="editKont"]'),
            kontDelBtn = yardlist.down('button[action="delKont"]'),
            kont = yard.getKont();

        if(kont){
            /*unbindKontBtn.setDisabled(kont.get('status') != 'YARD');
            kontRepositionBtn.setDisabled(kont.get('status') != 'YARD');
            poezdOutForKontListBtn.setDisabled(kont.get('status') != 'YARD');
            avtoOutForKontListBtn.setDisabled(kont.get('status') != 'YARD');*/
            if(kont.get('prevStatus')) {
                unbindKontBtn.setDisabled(false);
            } else {
                unbindKontBtn.setDisabled(true);
            }

            kontRepositionBtn.setDisabled(false);
            poezdOutForKontListBtn.setDisabled(false);
            avtoOutForKontListBtn.setDisabled(false);
            kontCreateBtn.setDisabled(true);
            kontEditBtn.setDisabled(false);
            kontDelBtn.setDisabled(false);
        } else {
            unbindKontBtn.setDisabled(true);
            kontRepositionBtn.setDisabled(true);
            poezdOutForKontListBtn.setDisabled(true);
            avtoOutForKontListBtn.setDisabled(true);
            kontCreateBtn.setDisabled(false);
            kontEditBtn.setDisabled(true);
            kontDelBtn.setDisabled(true);
        }

    }

});
