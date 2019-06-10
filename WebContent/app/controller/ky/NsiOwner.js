Ext.define('TK.controller.ky.NsiOwner', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.nsi.owner.List',
        'ky.nsi.owner.Form',
        'ky.nsi.owner.Filter'
    ],
    stores: [
        'ky.NsiOwners'
    ],
    models: [
        'ky.NsiOwner'
    ],
    refs:[{
        ref:'ownerlist',
        selector:'window > kybasensilist#kybasensiownerlist'
    },{
        ref: 'ownerform',
        selector: 'window > kybasensiform#kybasensiownerform'
    },{
        ref: 'vagonform',
        selector: 'window > kyabstractform#kyvagonform'
    },{
        ref: 'kontform',
        selector: 'window > kyabstractform#kykontform'
    },{
        ref: 'avtoform',
        selector: 'viewport > tabpanel kyabstractform#kyavtoform'
    },{
        ref: 'vagonnsishirform',
        selector: 'window > kybasensiform#kybasensivagonshirform'
    },{
        ref: 'vagonnsiuzkyform',
        selector: 'window > kybasensiform#kybasensivagonuzkyform'
    },{
        ref: 'kontnsiform',
        selector: 'window > kybasensiform#kybasensikontform'
    }],
    init:function () {

        this.control({
            'kynsiownerlist button[action="create"]': {
                click: this.createOwner
            },
            'kynsiownerlist button[action="edit"]': {
                click: this.editOwner
            },
            'kynsiownerlist grid': {
                itemdblclick: this.getOwner
            },
            'kynsiownerform button[action="save"]': {
                click: this.saveOwner
            },
            'kynsiownerlist button[action="delete"]': {
                click: this.deleteOwner
            },
            'kynsiownerlist button[action="filter"]': {
                click: this.filterOwner
            },
            'kynsiownerfilter button[action="applyFilter"]': {
                click: this.applyFilterOwner
            },
            'kybasevagonform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            'kybasekontform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            'kybaseavtoform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            'kynsivagonshirform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            'kynsivagonuzkyform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            'kynsikontform button[action="nsiOwner"]': {
                click: this.showNsiOwner
            },
            /*'kynsiownerlist button[action="getOwner"]': {
                click: this.getOwner
            },*/
            'kyvagonintoform': {
                getkyowner: this.getOwnerForVag
            },
            'kyvagonoutform': {
                getkyowner: this.getOwnerForVag
            },
            'kynsivagonshirform': {
                getkyowner: this.getOwnerForNsiVagShir
            },
            'kynsivagonuzkyform': {
                getkyowner: this.getOwnerForNsiVagUzky
            },
            'kynsikontform': {
                getkyowner: this.getOwnerForNsiKont
            },
            'kykontinpoezdintoform': {
                getkyowner: this.getOwnerForKont
            },
            'kykontinpoezdoutform': {
                getkyowner: this.getOwnerForKont
            },
            'kykontinavtooutform': {
                getkyowner: this.getOwnerForKont
            },
            'kykontinavtointoform': {
                getkyowner: this.getOwnerForKont
            },
            'kykontinyardform': {
                getkyowner: this.getOwnerForKont
            },
            'kybaseavtoform': {
                getkyowner: this.getOwnerForAvto
            }/*,
            'kyavtooutform': {
                getkyowner: this.getOwnerForAvto
            }   */

        });
    },

    createOwner: function(btn){
        var ownercontainer = Ext.widget('kynsiownerform', {title: 'Создание'});
        ownercontainer.down('form').loadRecord(Ext.create('TK.model.ky.NsiOwner'));
    },

    editOwner: function(btn){
        var ownerlist = this.getOwnerlist();
        if(!TK.Utils.isRowSelected(ownerlist)){
            return false;
        }

        var hid = ownerlist.getSelectionModel().getLastSelected().get('hid');

        var ownercontainer = Ext.widget('kynsiownerform', {title: 'Редактирование'});

        ownercontainer.setLoading(true);

        var owner = Ext.ModelManager.getModel('TK.model.ky.NsiOwner');

        owner.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(owner, operation, success) {
                if(success){
                    ownercontainer.down('form').loadRecord(owner);
                }
                ownercontainer.setLoading(false);
            }
        });
    },
    saveOwner:function(btn){
        var form = this.getOwnerform();
        if (form.isValid()) {
            var win = btn.up('window'),
                owner = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);
            owner.set(values);
            owner.save({
                params:{action: 'save'},
                callback: function(owner, operation, success) {
                    if(success){
                        form.loadRecord(owner);
                        this.getOwnerlist().getStore().reload();
                    }
                    win.setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    deleteOwner:function(btn){
        var ownerlist = this.getOwnerlist();
        if(!TK.Utils.isRowSelected(ownerlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    ownerlist.setLoading(true);
                    var owner = ownerlist.getSelectionModel().getLastSelected();
                    owner.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},

                        callback: function(owner, operation) {
                            ownerlist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                ownerlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    filterOwner: function(btn){
        var win = Ext.widget('kynsiownerfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterOwner:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    showNsiOwner: function(btn){
        var win = Ext.widget('kynsiownerlist'),
            store = win.down('grid').getStore();

        win.caller = btn.up('window') || btn.up('form'); // form - is for avto
        store.getProxy().extraParams = {action: 'list'};
        store.load();
    },
    getOwner: function(view, nsiOwner){
        var ownerlist = this.getOwnerlist();
        if(!TK.Utils.isRowSelected(ownerlist)){
            return false;
        }

        //var owner = ownerlist.getSelectionModel().getLastSelected();
        view.up('window').caller.fireEvent('getkyowner', nsiOwner);
    },
    getOwnerForVag: function(owner){
        var form = this.getVagonform().getForm()/*,
            vagon = this.getVagonform().getRecord()*/;

        //vagon.setOwner(owner);
        form.findField('sobstv').setValue(owner.get('nameown'));
        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    },
    getOwnerForKont: function(owner){
        var form = this.getKontform().getForm()/*,
            kont = this.getKontform().getRecord()*/;

        //kont.setOwner(owner);
        form.findField('naim_sob').setValue(owner.get('nameown'));
        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    },
    getOwnerForAvto: function(owner){
        var form = this.getAvtoform().getForm()/*,
            avto = this.getAvtoform().getRecord()*/;

        //avto.setOwner(owner);
        form.findField('naim_sob').setValue(owner.get('nameown'));
        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    },
    getOwnerForNsiVagShir: function(owner){
        var form = this.getVagonnsishirform().getForm()/*,
            vagon = this.getVagonnsishirform().getRecord()*/;

        //vagon.setOwner(owner);
        form.findField('nown').setValue(owner.get('nameown'));
        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    },
    getOwnerForNsiVagUzky: function(owner){
        var form = this.getVagonnsiuzkyform().getForm()/*,
            vagon = this.getVagonnsiuzkyform().getRecord()*/;

        //vagon.setOwner(owner);
        form.findField('sobs').setValue(owner.get('nameown'));
        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    },
    getOwnerForNsiKont: function(owner){
        var form = this.getKontnsiform().getForm()/*,
            kont = this.getKontnsiform().getRecord()*/;

        //kont.setOwner(owner);
        form.findField('naim_sob').setValue(owner.get('nameown'));

        form.findField('owner.hid').setValue(owner.getId());

        this.getOwnerlist().up('window').close();

    }



});
