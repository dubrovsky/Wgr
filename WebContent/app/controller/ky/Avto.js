Ext.define('TK.controller.ky.Avto', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky.avto.AvtoFilter',
        'ky.avto.BaseAvtoForm',
        'ky.avto.BaseAvtoList',
        'ky.avto.into.List',
        'ky.avto.into.Form',
        'ky.avto.out.List',
        'ky.avto.out.Form'
    ],
    stores: [
        'ky.AvtosBase',
        'ky.AvtosInto',
        'ky.AvtosOut',
        'ky.AvtosOutDir'
    ],
    models: [
        'ky.AvtoBase',
        'ky.AvtoInto',
        'ky.AvtoOut',
        'ky.AvtoOutDir',
        'PackDoc'
    ],
    refs:[{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref: 'avtolist',
        selector: 'viewport > tabpanel grid'
    },{
        ref: 'avtoform',
        selector: 'viewport > tabpanel kyabstractform#kyavtoform'
    },{
        ref: 'kontlist',
        selector: 'viewport > tabpanel #kykontlist'
    },{
        ref: 'avtooutdir',
        selector: 'kybaseavtosoutdir'
    }],
    init:function() {
         this.control({
             'kyavtointolist button[action="create"]': {
                 click: this.createAvtoInto
             },
             'kyavtooutlist button[action="create"]': {
                 click: this.createAvtoOut
             },
             'kyavtointolist button[action="edit"]': {
                 click: this.editAvtoInto
             },
             'kyavtointolist': {
                 itemdblclick: this.editAvtoInto
             },
             'kyavtooutlist button[action="edit"]': {
                 click: this.editAvtoOut
             },
             'kyavtooutlist': {
                 itemdblclick: this.editAvtoOut
             },
             'kyavtointoform button[action="save"]': {
                 click: this.saveAvto
             },
             'kyavtooutform button[action="save"]': {
                 click: this.saveAvto
             },
             'kyavtointolist button[action="delete"]': {
                 //click: this.deletePoezdInto
                 click: this.deleteAvto
             },
             'kyavtooutlist button[action="delete"]': {
                 //click: this.deletePoezdOut
                 click: this.deleteAvto
             },
             'kyavtointolist button[action="filterAvto"]': {
                 click: this.filterAvto
             },
             'kyavtooutlist button[action="filterAvto"]': {
                 click: this.filterAvto
             },
             'kyavtofilter button[action="applyFilter"]': {
                 click: this.applyFilterAvto
             },
             'kybaseavtosoutdir': {
                 select: this.selectAvtoInAvtoOutDir
             },
             'kybaseavtoform button[action="nsiGruzPol"]': {
                 click: this.showNsiGruzPol
             },
             'kybaseavtoform button[action="nsiGruzOtpr"]': {
                 click: this.showNsiGruzOtpr
             },
             'kybaseavtoform button[action="nsiClient"]': {
                 click: this.showNsiClient
             }

        });
    },
    createAvtoInto: function(btn){
        this.createAvto('kyavtointoform', 'TK.model.ky.AvtoInto');
    },
    createAvtoOut: function(btn){
        this.createAvto('kyavtooutform', 'TK.model.ky.AvtoOut');
    },
    createAvto: function(xtype, modelClsName){
        var avtolist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = avtolist.getStore().getProxy().extraParams,
            avto = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction']
            }),
            avtocontainer = Ext.widget(xtype/*, {title: this.titleCreate}*/);

        avtocontainer.down('form').loadRecord(avto);
        avtocontainer.down('form').initFieldsWithDefaultsValues();
        //  avtocontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(avtocontainer);
    },
    editAvtoInto: function(btn){
        this.editAvto('kyavtointoform', 'TK.model.ky.AvtoInto'/*, 'edit_into'*/);
    },
    editAvtoOut: function(btn){
        this.editAvto('kyavtooutform', 'TK.model.ky.AvtoOut'/*, 'edit_out'*/);
    },
    editAvto: function(xtype, modelClsName/*, serverAction*/){
        var avtolist = this.getAvtolist();
        if(!TK.Utils.isRowSelected(avtolist)){
            return false;
        }

        var hid = avtolist.getSelectionModel().getLastSelected().get('hid');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var avtocontainer = this.getCenter().add(Ext.widget(xtype/*, {title: this.titleEdit}*/));

        avtocontainer.setLoading(true);

        var avto = Ext.ModelManager.getModel(modelClsName);

        avto.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(avto, operation, success) {
                if(success){
                    avtocontainer.down('form').loadRecord(avto);

                    this.showKonts(avto.konts());
                }
                avtocontainer.setLoading(false);
            }
        });
    },
    /*saveAvtoInto: function(btn){
        this.saveAvto("save_into");
    },
    saveAvtoOut: function(btn){
        this.saveAvto("save_out");
    },*/
    saveAvto:function(/*serverAction*/){
//        var form = btn.up('form').getForm();
        var form = this.getAvtoform();
        if (form.isValid()) {
            var avto = form.getRecord(),
                newAvto = (avto.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            avto.set(values);
            if(newAvto){
                avto.setRoute(Ext.create('TK.model.Route', {hid: avto.get('route.hid')}));
            }
            avto.save({
                //params:{action: serverAction},
                params:{action: 'save'},
                callback: function(avto, operation, success) {
                    if(success){
                        if(newAvto){       // packdoc will be available after save
                            avto.setPackDoc(Ext.create('TK.model.PackDoc', {hid: avto.get('packDoc.hid')}));
                            this.showKonts(avto.konts());
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
    deleteAvto:function(/*serverAction*/){
        var avtolist = this.getAvtolist();
        if(!TK.Utils.isRowSelected(avtolist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    avtolist.setLoading(true);
                    var avto = avtolist.getSelectionModel().getLastSelected();
                    avto.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},
                        //params:{action: serverAction/*, hid: kontyard.get('hid')*/},

                        callback: function(poezd, operation) {
                            avtolist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                avtolist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    showKonts: function(konts){
        var kontlist = this.getKontlist();
        if(kontlist.isHidden()) {
            kontlist.show();
        }

//        kontlist.reconfigure(vagons);// change vagons store in grid
        kontlist.getStore().removeAll();
        if(konts.count() > 0){
            kontlist.getStore().add(konts.getRange());
            kontlist.getSelectionModel().select(0); // select 1st row and fire onselect event for vagon grid
        }
    },
    filterAvto: function(btn){
        var win = Ext.widget('kyavtofilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterAvto:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    selectAvtoInAvtoOutDir: function(rowModel, avto, index){
        this.getAvtooutdir().initFieldsWithDefaultsValues(avto);
    },

    showNsiGruzOtpr: function(btn){
        var form = this.getAvtoform().getForm(),
            nsiGrid = this.getController('Nsi').nsiOtpr(form.findField('otp_cargo').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectGruzOtpr, form);
    },
    selectGruzOtpr: function(view, record){
        this.findField('otp_cargo').setValue(record.get('g1r'));
        view.up('window').close();
    },

    showNsiGruzPol: function(btn){
        var form = this.getAvtoform().getForm(),
            nsiGrid = this.getController('Nsi').nsiOtpr(form.findField('pol_cargo').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectGruzPol, form);
    },
    selectGruzPol: function(view, record){
        this.findField('pol_cargo').setValue(record.get('g1r'));
        view.up('window').close();
    },

    showNsiClient: function(btn){
        var form = this.getAvtoform().getForm(),
            nsiGrid = this.getController('Nsi').nsiOtpr(form.findField('client').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectClient, form);
    },
    selectClient: function(view, record){
        this.findField('client').setValue(record.get('g1r'));
        view.up('window').close();
    }

});
