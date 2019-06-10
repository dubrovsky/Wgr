Ext.define('TK.controller.ky.NsiKont', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.nsi.kont.List',
        'ky.nsi.kont.Form',
        'ky.nsi.kont.Filter'
    ],
    stores: [
        'ky.NsiKonts'
    ],
    models: [
        'ky.NsiKont'
    ],
    refs:[{
        ref:'kontlist',
        selector:'window > kybasensilist'
    },{
        ref: 'kontform',
        selector: 'window > kybasensiform'
    },{
        ref: 'kontmainform',
        selector: 'window > kyabstractform#kykontform'
    }],
    init:function () {

        this.control({
            'kynsikontlist button[action="create"]': {
                click: this.createKont
            },
            'kynsikontlist button[action="edit"]': {
                click: this.editKont
            },
            'kynsikontlist grid': {
                itemdblclick: this.selectNsiForKont
            },
            'kynsikontform button[action="save"]': {
                click: this.saveKont
            },
            'kynsikontlist button[action="delete"]': {
                click: this.deleteKont
            },
            'kynsikontlist button[action="filter"]': {
                click: this.filterKont
            },
            'kynsikontfilter button[action="applyFilter"]': {
                click: this.applyFilterKont
            },
            'kybasekontform button[action="nsiKont"]': {
                click: this.showNsiKont
            },
            'kybasekontform button[action="getKont"]': {
                click: this.getKont
            }
        });
    },

    createKont: function(btn){
        var kontcontainer = Ext.widget('kynsikontform', {title: 'Создание'});
        kontcontainer.down('form').loadRecord(Ext.create('TK.model.ky.NsiKont'));
    },

    editKont: function(btn){
        var kontlist = this.getKontlist();
        if(!TK.Utils.isRowSelected(kontlist)){
            return false;
        }

        var hid = kontlist.getSelectionModel().getLastSelected().get('hid');

        var kontcontainer = Ext.widget('kynsikontform', {title: 'Редактирование'});

        kontcontainer.setLoading(true);

        var kont = Ext.ModelManager.getModel('TK.model.ky.NsiKont');

        kont.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(kont, operation, success) {
                if(success){
                    kontcontainer.down('form').loadRecord(kont);
                }
                kontcontainer.setLoading(false);
            }
        });
    },
    saveKont:function(btn){
        var form = this.getKontform();
        if (form.isValid()) {
            var win = btn.up('window'),
                kont = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);
            kont.set(values);
            kont.save({
                params:{action: 'save'},
                callback: function(kont, operation, success) {
                    if(success){
                        form.loadRecord(kont);
                        this.getKontlist().getStore().reload();
                    }
                    win.setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    deleteKont:function(btn){
        var kontlist = this.getKontlist();
        if(!TK.Utils.isRowSelected(kontlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    kontlist.setLoading(true);
                    var kont = kontlist.getSelectionModel().getLastSelected();
                    kont.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},

                        callback: function(kont, operation) {
                            kontlist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                kontlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    filterKont: function(btn){
        var win = Ext.widget('kynsikontfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterKont:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    showNsiKont: function(btn){
        var win = Ext.widget('kynsikontlist'),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: 'list'};
        store.load();
    },
    getKont: function(btn){
        var kontField = this.getKontmainform().getForm().findField('nkon');
        if(kontField.getValue()) {
            this.getKontmainform().setLoading(true);
            Ext.Ajax.request({
                url: 'ky/secure/NsiKont.do',
                params: {action: 'get', nkon: kontField.getValue().trim()},
                scope: this,
                success: function (response, options) {
                    var respObj = Ext.decode(response.responseText);
                    if(respObj['rows']) { // check if kont found
                        //var kont = this.getKontmainform().getRecord();
                        //kont.set(kont.getProxy().getReader().read(response)['records'][0].getData());
                        //kont.set(respObj['rows'][0]);
                        //this.getKontmainform().loadRecord(kont);
                        var nsiKont = Ext.create('TK.model.ky.NsiKont').getProxy().getReader().read(response)['records'][0];

                        this.copyNsiToKont(nsiKont);
                    }
                    this.getKontmainform().setLoading(false);
                },
                failure: function (response, options) {
                    this.getKontmainform().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
    },
    selectNsiForKont: function(view, nsiKont){
        this.copyNsiToKont(nsiKont);
        view.up('window').close();
    },
    copyNsiToKont: function(nsiKont){
        var /*kont = this.getKontmainform().getRecord(),*/
            /* values =  this.getKontmainform().getValues(),*/
            form = this.getKontmainform().getForm();

        form.findField('nkon').setValue(nsiKont.get('nkont'));
        form.findField('massa_tar').setValue(nsiKont.get('massaTar'));
        form.findField('pod_sila').setValue(nsiKont.get('podSila'));
        form.findField('vid').setValue(nsiKont.get('type'));
        form.findField('type').setValue(nsiKont.get('sizeFoot'));
        form.findField('naim_sob').setValue(nsiKont.get('naim_sob'));
        form.findField('owner.hid').setValue(nsiKont.getOwner() != null ? nsiKont.getOwner().getId() : null);

        form.findField('nkon').focus();
        /*kont.set(values);

        kont.setOwner(nsiKont.getOwner());
        kont.set('nkon', nsiKont.get('nkont'));
        kont.set('massa_tar', nsiKont.get('massaTar'));
        kont.set('pod_sila', nsiKont.get('podSila'));
        kont.set('vid', nsiKont.get('type'));
        kont.set('type', nsiKont.get('sizeFoot'));
        kont.set('naim_sob', nsiKont.get('naim_sob'));

        this.getKontmainform().loadRecord(kont);*/
    }


});
