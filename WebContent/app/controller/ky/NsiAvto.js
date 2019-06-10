Ext.define('TK.controller.ky.NsiAvto', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.nsi.avto.List',
        'ky.nsi.avto.Form',
        'ky.nsi.avto.Filter'
    ],
    stores: [
        'ky.NsiAvtos'
    ],
    models: [
        'ky.NsiAvto'
    ],
    refs:[{
        ref:'avtolist',
        selector:'window > kybasensilist'
    },{
        ref: 'avtoform',
        selector: 'window > kybasensiform'
    },{
        ref: 'avtomainform',
        selector: 'viewport > tabpanel kyabstractform#kyavtoform'
    }],
    init:function () {

        this.control({
            'kynsiavtolist button[action="create"]': {
                click: this.createAvto
            },
            'kynsiavtolist button[action="edit"]': {
                click: this.editAvto
            },
            'kynsiavtolist grid': {
                itemdblclick: this.selectNsiForAvto
            },
            'kynsiavtoform button[action="save"]': {
                click: this.saveAvto
            },
            'kynsiavtolist button[action="delete"]': {
                click: this.deleteAvto
            },
            'kynsiavtolist button[action="filter"]': {
                click: this.filterAvto
            },
            'kynsiavtofilter button[action="applyFilter"]': {
                click: this.applyFilterAvto
            },
            'kybaseavtoform button[action="nsiAvto"]': {
                click: this.showNsiAvto
            },
            'kybaseavtoform button[action="getAvto"]': {
                click: this.getAvto
            }
        });
    },

    createAvto: function(btn){
        var avtocontainer = Ext.widget('kynsiavtoform', {title: 'Создание'});
        avtocontainer.down('form').loadRecord(Ext.create('TK.model.ky.NsiAvto'));
    },

    editAvto: function(btn){
        var avtolist = this.getAvtolist();
        if(!TK.Utils.isRowSelected(avtolist)){
            return false;
        }

        var hid = avtolist.getSelectionModel().getLastSelected().get('hid');

        var avtocontainer = Ext.widget('kynsiavtoform', {title: 'Редактирование'});

        avtocontainer.setLoading(true);

        var avto = Ext.ModelManager.getModel('TK.model.ky.NsiAvto');

        avto.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(avto, operation, success) {
                if(success){
                    avtocontainer.down('form').loadRecord(avto);
                }
                avtocontainer.setLoading(false);
            }
        });
    },
    saveAvto:function(btn){
        var form = this.getAvtoform();
        if (form.isValid()) {
            var win = btn.up('window'),
                avto = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);
            avto.set(values);
            avto.save({
                params:{action: 'save'},
                callback: function(avto, operation, success) {
                    if(success){
                        form.loadRecord(avto);
                        this.getAvtolist().getStore().reload();
                    }
                    win.setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    deleteAvto:function(btn){
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

                        callback: function(avto, operation) {
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
    filterAvto: function(btn){
        var win = Ext.widget('kynsiavtofilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterAvto:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    showNsiAvto: function(btn){
        var win = Ext.widget('kynsiavtolist'),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: 'list'};
        store.load();
    },
    getAvto: function(btn){
        var avtoField = this.getAvtomainform().getForm().findField('no_avto');
        if(avtoField.getValue()) {
            this.getAvtomainform().setLoading(true);
            Ext.Ajax.request({
                url: 'ky/secure/NsiAvto.do',
                params: {action: 'get', noAvto: avtoField.getValue().trim()},
                scope: this,
                success: function (response, options) {
                    var respObj = Ext.decode(response.responseText);
                    if(respObj['rows']) { // check if kont found
                        //var avto = this.getAvtomainform().getRecord();
                        //avto.set(avto.getProxy().getReader().read(response)['records'][0].getData());
                        //avto.set(respObj['rows'][0]);
                        //this.getAvtomainform().loadRecord(avto);
                        var /*vagon = this.getVagonmainform().getRecord(),*/
                            nsiAvto = Ext.create('TK.model.ky.NsiAvto').getProxy().getReader().read(response)['records'][0];

                        this.copyNsiToAvto(nsiAvto);

                    }
                    this.getAvtomainform().setLoading(false);
                },
                failure: function (response, options) {
                    this.getAvtomainform().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
    },
    selectNsiForAvto: function(view, nsiAvto){
        this.copyNsiToAvto(nsiAvto);
        view.up('window').close();
    },
    copyNsiToAvto: function(nsiAvto){
        var /*avto = this.getAvtomainform().getRecord(),
            values =  this.getAvtomainform().getValues()*/
            form = this.getAvtomainform().getForm();

        form.findField('type_avto').setValue(nsiAvto.get('typeAvto'));
        form.findField('no_avto').setValue(nsiAvto.get('noAvto'));
        form.findField('no_trail').setValue(nsiAvto.get('noTrail'));
        form.findField('otp_cargo').setValue(nsiAvto.get('ownCargo'));

        form.findField('owner.hid').setValue(nsiAvto.getOwner() != null ? nsiAvto.getOwner().getId() : null);

        /*avto.set(values);

        avto.setOwner(nsiAvto.getOwner());
        avto.set('type_avto', nsiAvto.get('typeAvto'));
        avto.set('no_avto', nsiAvto.get('noAvto'));
        avto.set('no_trail', nsiAvto.get('noTrail'));
        avto.set('otp_cargo', nsiAvto.get('ownCargo'));

        this.getAvtomainform().loadRecord(avto);*/
    }

});
