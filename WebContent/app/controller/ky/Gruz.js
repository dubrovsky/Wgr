Ext.define('TK.controller.ky.Gruz', {
    extend:'Ext.app.Controller',

    views: [
        'ky.poezd.into.vagon.kont.gruz.List',
        'ky.poezd.into.vagon.kont.gruz.Form',
        'ky.poezd.out.vagon.kont.gruz.List',
        'ky.poezd.out.vagon.kont.gruz.Form',

        'ky.avto.into.kont.gruz.List',
        'ky.avto.into.kont.gruz.Form',
        'ky.avto.out.kont.gruz.List',
        'ky.avto.out.kont.gruz.Form',

        'ky.kontnotransp.gruz.List',
        'ky.kontnotransp.gruz.Form',
        'ky.BaseGruzForm',
        'ky.BaseGruzList',
        'ky.yard.kont.gruz.Form',
        'ky.yard.kont.gruz.List'
    ],
    models: [
        'ky.GruzBase',
        'ky.GruzInPoezdInto',
        'ky.GruzInPoezdOut',
        'ky.GruzInAvtoInto',
        'ky.GruzInAvtoOut',
        'ky.GruzNoTrasp',
        'ky.GruzInYard'
    ],
    stores:[
        'ky.GruzsInPoezdInto',
        'ky.GruzsInPoezdOut',
        'ky.GruzsNoTrasp',
        'ky.GruzsInAvtoInto',
        'ky.GruzsInAvtoOut',
        'ky.GruzsInYard'
    ],
    refs:[{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref:'gruzlist',
        selector:'window > #kygruzlist'
    },{
        ref: 'kontform',
        selector: 'window > #kykontform'
    },{
        ref: 'gruzform',
        selector: 'window > #kygruzform'
    }],
    init:function() {
        this.control({
            'kygruzinpoezdintolist button[action="create"]': {
                click: this.createGruzInPoezdInto
            },
            'kygruzinyardlist button[action="create"]': {
                click: this.createGruzInYard
            },
            'kygruzinavtointolist button[action="create"]': {
                click: this.createGruzInAvtoInto
            },
            'kygruzinpoezdintolist button[action="edit"]': {
                click: this.editGruzInPoezdInto
            },
            'kygruzinyardlist button[action="edit"]': {
                click: this.editGruzInYard
            },
            'kygruzinavtointolist button[action="edit"]': {
                click: this.editGruzInAvtoInto
            },
            'kygruzinpoezdintolist': {
                itemdblclick: this.editGruzInPoezdInto
            },
            'kygruzinyardlist': {
                itemdblclick: this.editGruzInYard
            },
            'kygruzinavtointolist': {
                itemdblclick: this.editGruzInAvtoInto
            },
            'kygruzinpoezdoutlist button[action="create"]': {
                click: this.createGruzInPoezdOut
            },
            'kygruzinavtooutlist button[action="create"]': {
                click: this.createGruzInAvtoOut
            },
            'kygruzinpoezdoutlist button[action="edit"]': {
                click: this.editGruzInPoezdOut
            },
            'kygruzinpoezdoutlist': {
                itemdblclick: this.editGruzInPoezdOut
            },
            'kygruzinavtooutlist button[action="edit"]': {
                click: this.editGruzInAvtoOut
            },
            'kygruzinavtooutlist': {
                itemdblclick: this.editGruzInAvtoOut
            },
            'kygruzinpoezdintolist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruzinyardlist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruzinpoezdintoform button[action="save"]': {
                click: this.saveGruz
            },
            'kygruzinyardform button[action="save"]': {
                click: this.saveGruz
            },
            'kygruzinpoezdoutlist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruzinpoezdoutform button[action="save"]': {
                click: this.saveGruz
            },

            'kygruzinavtointolist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruzinavtointoform button[action="save"]': {
                click: this.saveGruz
            },
            'kygruzinavtooutlist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruzinavtooutform button[action="save"]': {
                click: this.saveGruz
            },

            'kygruznotransplist button[action="create"]': {
                click: this.createGruzNoPoezd
            },

            'kygruznotransplist button[action="edit"]': {
                click: this.editGruzNoPoezd
            },
            'kygruznotransplist': {
                itemdblclick: this.editGruzNoPoezd
            },
            'kygruznotransplist button[action="delete"]': {
                click: this.deleteGruz
            },
            'kygruznotranspform button[action="save"]': {
                click: this.saveGruz
            },
            'kygruzinpoezdintoform button[action="nsiGng"]': {
                click: this.showNsiGng
            },
            'kygruzinyardform button[action="nsiGng"]': {
                click: this.showNsiGng
            },
            'kygruzinpoezdoutform button[action="nsiGng"]': {
                click: this.showNsiGng
            },
            'kygruzinavtointoform button[action="nsiGng"]': {
                click: this.showNsiGng
            },
            'kygruzinavtooutform button[action="nsiGng"]': {
                click: this.showNsiGng
            },
            'kygruznotranspform button[action="nsiGng"]': {
                click: this.showNsiGng
            }
        });
    },
    createGruzInPoezdInto: function(btn){
        this.createGruz('kygruzinpoezdintoform', 'TK.model.ky.GruzInPoezdInto');
    },
    createGruzInYard: function(btn){
        this.createGruz('kygruzinyardform', 'TK.model.ky.GruzInYard');
    },
    createGruzInPoezdOut: function(btn){
        this.createGruz('kygruzinpoezdoutform', 'TK.model.ky.GruzInPoezdOut');
    },
    createGruzInAvtoInto: function(btn){
        this.createGruz('kygruzinavtointoform', 'TK.model.ky.GruzInAvtoInto');
    },
    createGruzInAvtoOut: function(btn){
        this.createGruz('kygruzinavtooutform', 'TK.model.ky.GruzInAvtoOut');
    },
    createGruzNoPoezd: function(btn){
        this.createGruz('kygruznotranspform', 'TK.model.ky.GruzNoTrasp');
    },
    createGruz: function(xtype, modelClsName){
        var gruzcontainer = Ext.widget(xtype, {title: this.titleCreate});
        gruzcontainer.down('form').loadRecord(Ext.create(modelClsName));
    },


    editGruzInPoezdInto: function(btn){
        this.editGruz('kygruzinpoezdintoform');
    },
    editGruzInYard: function(btn){
        this.editGruz('kygruzinyardform');
    },
    editGruzInPoezdOut: function(btn){
        this.editGruz('kygruzinpoezdoutform');
    },
    editGruzInAvtoInto: function(btn){
        this.editGruz('kygruzinavtointoform');
    },
    editGruzInAvtoOut: function(btn){
        this.editGruz('kygruzinavtooutform');
    },
    editGruzNoPoezd: function(btn){
        this.editGruz('kygruznotranspform');
    },
    editGruz: function(xtype){
        var gruzlist = this.getGruzlist();
        if(!TK.Utils.isRowSelected(gruzlist)){
            return false;
        }

        var gruz = gruzlist.getSelectionModel().getLastSelected(),
            gruzcontainer = Ext.widget(xtype, {title: this.titleEdit});

        gruzcontainer.down('form').loadRecord(gruz);
    },


    saveGruz:function(btn){
//        var form = btn.up('form').getForm();
        var form = this.getGruzform();
        if (form.isValid()) {
            var win = btn.up('window'),
                gruz = form.getRecord(),
                newGruz = (gruz.getId() == null),
                values = form.getValues();

            win.setLoading(true);

            gruz.set(values);
            if(newGruz){
                var kont = this.getKontform().getRecord();
                gruz.setKont(kont);
            }
            gruz.save({
                params:{action: 'save'},
                callback: function(gruz, operation, success) {
                    win.setLoading(false);
                    if(success){
                        win.close();
                        if(newGruz){  // new record
                            var gruzlist = this.getGruzlist();

                            gruzlist.getStore().add(gruz);
                            kont.gruzs().add(gruz);

                            gruzlist.getSelectionModel().select(gruz);
                        }
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    deleteGruz:function(btn){
        var gruzlist = this.getGruzlist();
        if(!TK.Utils.isRowSelected(gruzlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    gruzlist.setLoading(true);
                    var gruz = gruzlist.getSelectionModel().getLastSelected();
                    gruz.destroy({
                        params:{action: 'delete'/*, hid: gruzyard.get('hid')*/},
                        callback: function(gruz, operation) {
                            gruzlist.setLoading(false);
                            /*if(operation['complete'] && !operation['exception']){
                             var gruzStore = list.getStore();
                             gruzStore.removeAt(gruzStore.indexOf(model));
                             }*/
                        },
                        scope: this
                    });
                }
            }
        });


    },
    showNsiGng: function(btn){
        var form = this.getGruzform().getForm(),
            nsiGrid = this.getController('Nsi').nsiGng(form.findField('kgvn').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectGng, form);
    },
    selectGng: function(view, record){
        this.findField('nzgr').setValue(record.get('name'));
        this.findField('kgvn').setValue(record.get('code'));
        view.up('window').close();
    }
});
