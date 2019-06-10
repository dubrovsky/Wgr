Ext.define('TK.controller.ky.Poezd', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky.poezd.into.List',
        'ky.poezd.into.Form',
        'ky.poezd.out.List',
        'ky.poezd.out.Form',
        'ky.poezd.BaseListForPoezd',
        'ky.poezd.into.ListForPoezd',
        'ky.poezd.out.ListForPoezd',
        'ky.poezd.into.Form',
        'ky.poezd.out.List',
        'ky.poezd.PoezdFilter',
        'ky.poezd.BasePoezdForm',
        'ky.poezd.BasePoezdList'
    ],
    stores: [
        'ky.PoezdsBase',
        'ky.PoezdsInto',
        'ky.PoezdsOut'
    ],
    models: [
        'ky.PoezdBase',
        'ky.PoezdInto',
        'ky.PoezdOut',
        'ky.ListForPoezd',
        'PackDoc'
    ],
    refs:[{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    },{
        ref: 'vagonlist',
        selector: 'viewport > tabpanel #kyvagonlist'
    },{
        ref: 'poezdform',
        selector: 'viewport > tabpanel kyabstractform#kypoezdform'
    },{
        ref: 'poezdoutdir',
        selector: 'kybasepoezdsoutdir'
    }],
    init:function() {
         this.control({
            'kypoezdintolist button[action="create"]': {
                click: this.createPoezdInto
            },
            'kypoezdoutlist button[action="create"]': {
                 click: this.createPoezdOut
            },
            'kypoezdintolist button[action="edit"]': {
                click: this.editPoezdInto
            },
             'kypoezdintolist button[action="createPoezdOutFromInto"]': {
                 click: this.createPoezdOutFromPoezdInto
             },
            'kypoezdintolist': {
                itemdblclick: this.editPoezdInto
            },
            'kypoezdoutlist button[action="edit"]': {
                 click: this.editPoezdOut
            },
            'kypoezdoutlist': {
                 itemdblclick: this.editPoezdOut
            },
            'kypoezdintolist button[action="delete"]': {
                //click: this.deletePoezdInto
                click: this.deletePoezd
            },
            'kypoezdintoform button[action="save"]': {
                 //click: this.savePoezdInto
                click: this.savePoezd
            },
             'kypoezdintoform button[action="listForPoezdInto"]': {
                 click: this.listForPoezdInto
             },
             'kypoezdoutform button[action="listForPoezdOut"]': {
                 click: this.listForPoezdOut
             },
            'kypoezdoutlist button[action="delete"]': {
                 //click: this.deletePoezdOut
                click: this.deletePoezd
            },
            'kypoezdoutform button[action="save"]': {
                 //click: this.savePoezdOut
                click: this.savePoezd
            },
             'kypoezdintolist button[action="filterPoezd"]': {
                 click: this.filterPoezd
             },
             'kypoezdoutlist button[action="filterPoezd"]': {
                 click: this.filterPoezd
             },
             'kypoezdfilter button[action="applyFilter"]': {
                 click: this.applyFilterPoezd
             },
             'kybasepoezdsoutdir': {
                 select: this.selectPoezdInPoezdOutDir
             },
             'kybasepoezdform radiogroup#koleya': {
                 change: this.onKoleyaChange
             },
             'kybasepoezdform combo#line': {
                 change: this.onLineChange
             },
             'kypoezdintoform button[action="nsiOtpr"]': {
                 click: this.showNsiOtpr
             }
        });
    },
    createPoezdInto: function(btn){
        this.createPoezd('kypoezdintoform', 'TK.model.ky.PoezdInto');
    },
    createPoezdOut: function(btn){
        this.createPoezd('kypoezdoutform', 'TK.model.ky.PoezdOut');
    },
    createPoezd: function(xtype, modelClsName){
        var poezdlist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = poezdlist.getStore().getProxy().extraParams,
            poezd = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction']
            }),
            poezdcontainer = Ext.widget(xtype, {title: this.titleCreate});

        poezdcontainer.down('form').loadRecord(poezd);
        poezdcontainer.down('form').initFieldsWithDefaultsValues();
      //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(poezdcontainer);
    },
    editPoezdInto: function(btn){
        this.editPoezd('kypoezdintoform', 'TK.model.ky.PoezdInto'/*, 'edit_into'*/);
    },
    editPoezdOut: function(btn){
        this.editPoezd('kypoezdoutform', 'TK.model.ky.PoezdOut'/*, 'edit_out'*/);
    },
    editPoezd: function(xtype, modelClsName/*, serverAction*/){
        var poezdlist = this.getPoezdlist();
        if(!TK.Utils.isRowSelected(poezdlist)){
            return false;
        }

        var hid = poezdlist.getSelectionModel().getLastSelected().get('hid');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var poezdcontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit}));

        poezdcontainer.setLoading(true);

        var poezd = Ext.ModelManager.getModel(modelClsName);

        poezd.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(poezd, operation, success) {
                if(success){
                    poezdcontainer.down('form').loadRecord(poezd);

                    this.showVagons(poezd.vagons());
                }
                poezdcontainer.setLoading(false);
            }
        });
    },
    createPoezdOutFromPoezdInto: function(btn){
        var poezdlist = this.getPoezdlist();
        if(!TK.Utils.isRowSelected(poezdlist)){
            return false;
        }

        var poezd = poezdlist.getSelectionModel().getLastSelected();
        Ext.Msg.show({
            title:'Подтверждение',
            msg: 'Создать поезд по отправлению?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    this.getCenter().setLoading(true);
                    Ext.Ajax.request({
                        url: poezd.getProxy().url,
                        params: {
                            action: 'CREATE_POEZDOUT_FROM_POEZDINTO',
                            hid: poezd.get('hid')
                        },
                        scope: this,
                        success: function(response, options) {
                            this.getCenter().setLoading(false);
                            Ext.Msg.show({
                                title: '',
                                msg: 'Ok',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            // var text = Ext.decode(response.responseText);
                        },
                        failure: function(response){
                            this.getCenter().setLoading(false);
                            TK.Utils.makeErrMsg(response, 'Error...');
                        }
                    });
                }
            }
        })
    },

    /*savePoezdInto: function(btn){
        this.savePoezd("save_into");
    },
    savePoezdOut: function(btn){
        this.savePoezd("save_out");
    },*/
    savePoezd:function(/*serverAction*/){
//        var form = btn.up('form').getForm();
        var form = this.getPoezdform();
        if (form.isValid()) {
            var poezd = form.getRecord(),
                newPoezd = (poezd.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            poezd.set(values);
            if(newPoezd){
                poezd.setRoute(Ext.create('TK.model.Route', {hid: poezd.get('route.hid')}));
            }
            poezd.save({
                //params:{action: serverAction},
                params:{action: 'save'},
                callback: function(poezd, operation, success) {
                    if(success){
                        form.loadRecord(poezd);
                        if(newPoezd){       // packdoc will be available after save
                            poezd.setPackDoc(Ext.create('TK.model.PackDoc', {hid: poezd.get('packDoc.hid')}));
                            this.showVagons(poezd.vagons());
                        }
                    }
                    this.getCenter().setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    showVagons: function(vagons){
        var vagonlist = this.getVagonlist();
        if(vagonlist.isHidden()) {
            vagonlist.show();
        }

//        vagonlist.reconfigure(vagons);// change vagons store in grid
        vagonlist.getStore().removeAll();
        if(vagons.count() > 0){
            vagonlist.getStore().add(vagons.getRange());
            vagonlist.getSelectionModel().select(0); // select 1st row and fire onselect event for vagon grid
        }
    },
    /*deletePoezdInto: function(btn){
        this.deletePoezd("delete_into");
    },
    deletePoezdOut: function(btn){
        this.deletePoezd("delete_out");
    },*/
    deletePoezd:function(/*serverAction*/){
        var poezdlist = this.getPoezdlist();
        if(!TK.Utils.isRowSelected(poezdlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    poezdlist.setLoading(true);
                    var poezd = poezdlist.getSelectionModel().getLastSelected();
                    poezd.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},
                        //params:{action: serverAction/*, hid: kontyard.get('hid')*/},

                        callback: function(poezd, operation) {
                            poezdlist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                poezdlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    listForPoezdInto:function(btn){
        this.listForPoezd('list_for_poezd_into', 'kylistforpoezdinto');
    },
    listForPoezdOut:function(btn){
        this.listForPoezd('list_for_poezd_out', 'kylistforpoezdout');
    },

    listForPoezd: function(action, widget){
        var poezd = this.getPoezdform().getRecord(),
            hid = poezd.getId();
        if(!hid){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Сохраните документ',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }
        var container = Ext.widget(widget, {title: 'Список по поезду №' + poezd.get('nppr')});

        container.setLoading(true);

        Ext.Ajax.request({
            url: 'ky/secure/Poezd.do',
            params:{action: action, hid: hid},
            scope:this,
            callback: function(options, success, response){
                if(success){
                    var respObj = Ext.decode(response.responseText);
                    if(respObj['rows'] && respObj['rows'][0]){
                        var result = respObj['rows'][0];
                        if(result['vags'] && result['vags'].length > 0){
                            container.down('grid').getStore().loadData(result['vags']);
                        }
                        container.down('#vagSum').setValue(result['vagSum']);
                        container.down('#kontSum').setValue(result['kontSum']);
                    }

                } else {
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
                container.setLoading(false);
            }
        });
    },
    filterPoezd: function(btn){
        var win = Ext.widget('kypoezdfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterPoezd:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    selectPoezdInPoezdOutDir: function(rowModel, vagon, index){
        this.getPoezdoutdir().initFieldsWithDefaultsValues(vagon.getPoezd());
    },
    onLineChange: function(field, newValue){
        var store = this.getVagonlist().getStore();
        if(store.count() > 0 || store.isFiltered()){
            store.clearFilter();
            if(newValue.toUpperCase() !== 'ВСЕ'){
                store.filter('line', newValue);
            }
        }
    },
    onKoleyaChange: function(field, newValue){
        var lineField =  field.up('form').getForm().findField('line');
        if(newValue.koleya === 1){
            lineField.getStore().loadData(
                [['Все'], ['948S'], ['949S'], ['950S'], ['951S'], ['Ciern/T']]
            );
            lineField.setValue('Все');
        } else if(newValue.koleya === 2){
            lineField.getStore().loadData(
                [['Все'], ['880'], ['881'], ['882'], ['883'], ['884'], ['948']]
            );
            lineField.setValue('Все');
        }
    },
    showNsiOtpr: function(btn){
        var form = this.getPoezdform().getForm(),
            nsiGrid = this.getController('Nsi').nsiOtpr(form.findField('gruzotpr').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectOtpr, form);
    },
    selectOtpr: function(view, record){
        this.findField('gruzotpr').setValue(record.get('g1r'));
        view.up('window').close();
    }
});
