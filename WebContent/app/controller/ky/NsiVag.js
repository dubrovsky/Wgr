Ext.define('TK.controller.ky.NsiVag', {
    extend:'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.nsi.vagon.shir.List',
        'ky.nsi.vagon.shir.Form',
        'ky.nsi.vagon.uzky.List',
        'ky.nsi.vagon.uzky.Form',
        //'ky.nsi.vagon.BaseNsiVagonList',
        //'ky.nsi.vagon.BaseNsiVagonForm',
        'ky.nsi.BaseFilter',
        'ky.nsi.vagon.Filter',
        'ky.nsi.BaseList',
        'ky.nsi.BaseForm'
    ],
    stores: [
        'ky.NsiVagsShir',
        'ky.NsiVagsUzky'
    ],
    models: [
        'ky.NsiVagShir',
        'ky.NsiVagUzky'
    ],
    refs:[{
        ref: 'poezdform',
        selector: 'viewport > tabpanel kyabstractform#kypoezdform'
    },{
        ref: 'vagonform',
        selector: 'window > kybasensiform'
    },{
        ref:'vagonlist',
        selector:'window > kybasensilist'
    },{
        ref: 'vagonmainform',
        selector: 'window > kyabstractform#kyvagonform'
    }],
    init:function () {

        this.control({
            'kynsivagonshirlist button[action="create"]': {
                click: this.createShirVagon
            },
            'kynsivagonuzkylist button[action="create"]': {
                click: this.createUzkyVagon
            },
            'kynsivagonshirlist button[action="edit"]': {
                click: this.editShirVagon
            },
            'kynsivagonshirlist kybasensilist': {
                itemdblclick: this.selectNsiForVagonShir
            },
            'kynsivagonuzkylist button[action="edit"]': {
                click: this.editUzkyVagon
            },
            'kynsivagonuzkylist kybasensilist': {
                itemdblclick: this.selectNsiForVagonUzky
            },
            'kynsivagonshirform button[action="save"]': {
                click: this.saveVagon
            },
            'kynsivagonuzkyform button[action="save"]': {
                click: this.saveVagon
            },
            'kynsivagonuzkylist button[action="delete"]': {
                click: this.deleteVagon
            },
            'kynsivagonshirlist button[action="delete"]': {
                click: this.deleteVagon
            },
            'kynsivagonshirlist button[action="filter"]': {
                click: this.filterVagon
            },
            'kynsivagonuzkylist button[action="filter"]': {
                click: this.filterVagon
            },
            'kybasevagonform button[action="getVagonShir"]': {
                click: this.getVagonShir
            },
            'kybasevagonform button[action="getVagonUzky"]': {
                click: this.getVagonUzky
            },
            'kynsivagonfilter button[action="applyFilter"]': {
                click: this.applyFilterVagon
            },
            'kybasevagonform button[action="nsiVagShir"]': {
                click: this.showNsiVagonShir
            },
            'kybasevagonform button[action="nsiVagUzky"]': {
                click: this.showNsiVagonUzky
            }
            /*'kybasevagonform combo#nvag': {
                //beforequery: this.beforeQueryNvag,
                select: this.selectFromNsiVag,
                blur: this.blurNvag
            },*/
           /* 'kyvagonoutform button[action="nsiVag"]': {
                click: this.showNsiVag
            },*/
            /*'kynsivag > grid':{
                itemdblclick: this.selectFromNsiVag
            }*/
        });
    },
    createShirVagon: function(btn){
        this.createVagon('kynsivagonshirform', 'TK.model.ky.NsiVagShir');
    },
    createUzkyVagon: function(btn){
        this.createVagon('kynsivagonuzkyform', 'TK.model.ky.NsiVagUzky');
    },
    createVagon: function(xtype, modelClsName){
        var vagoncontainer = Ext.widget(xtype, {title: 'Создание'});
        vagoncontainer.down('form').loadRecord(Ext.create(modelClsName));
    },
    editShirVagon: function(btn){
        this.editVagon('kynsivagonshirform', 'TK.model.ky.NsiVagShir');
    },
    editUzkyVagon: function(btn){
        this.editVagon('kynsivagonuzkyform', 'TK.model.ky.NsiVagUzky');
    },
    editVagon: function(xtype, modelClsName){
        var vagonlist = this.getVagonlist();
        if(!TK.Utils.isRowSelected(vagonlist)){
            return false;
        }

        var hid = vagonlist.getSelectionModel().getLastSelected().get('hid');

        var vagoncontainer = Ext.widget(xtype, {title: 'Редактирование'});

        vagoncontainer.setLoading(true);

        var vagon = Ext.ModelManager.getModel(modelClsName);

        vagon.load(hid, {
            scope:this,
            //params:{action: serverAction},
            params:{action: 'edit'},
            callback: function(vagon, operation, success) {
                if(success){
                    vagoncontainer.down('form').loadRecord(vagon);
                }
                vagoncontainer.setLoading(false);
            }
        });
    },
    saveVagon:function(btn){
        var form = this.getVagonform();
        if (form.isValid()) {
            var win = btn.up('window'),
                vagon = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);
            vagon.set(values);
            vagon.save({
                params:{action: 'save'},
                callback: function(vagon, operation, success) {
                    if(success){
                        form.loadRecord(vagon);
                        this.getVagonlist().getStore().reload();
                    }
                    win.setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    deleteVagon:function(btn){
        var vagonlist = this.getVagonlist();
        if(!TK.Utils.isRowSelected(vagonlist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    vagonlist.setLoading(true);
                    var vagon = vagonlist.getSelectionModel().getLastSelected();
                    vagon.destroy({
                        params:{action: 'delete'/*, hid: kontyard.get('hid')*/},

                        callback: function(vagon, operation) {
                            vagonlist.setLoading(false);
                            if(operation['complete'] && !operation['exception']){
                                vagonlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    filterVagon: function(btn){
        var win = Ext.widget('kynsivagonfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterVagon:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    showNsiVagonShir: function(){
        this.showNsiVagon('kynsivagonshirlist');
    },
    showNsiVagonUzky: function(){
        this.showNsiVagon('kynsivagonuzkylist');
    },
    showNsiVagon: function(widget){
        var win = Ext.widget(widget),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: 'list'};
        store.load();
    },
    getVagonShir: function(btn){
         this.getVagon('NsiVagShir.do', 'TK.model.ky.NsiVagShir', 'shir');
    },
    getVagonUzky: function(btn){
        this.getVagon('NsiVagUzky.do', 'TK.model.ky.NsiVagUzky', 'uzky');
    },
    getVagon: function(action, modelClsName, koleya){
        var vagonField = this.getVagonmainform().getForm().findField('nvag');
        if(vagonField.getValue()) {
            this.getVagonmainform().setLoading(true);
            Ext.Ajax.request({
                url: 'ky/secure/' + action,
                params: {action: 'get', nvag: vagonField.getValue().trim()},
                scope: this,
                success: function (response, options) {
                    var respObj = Ext.decode(response.responseText);
                    if(respObj['rows']) { // check if vagon found
                        var /*vagon = this.getVagonmainform().getRecord(),*/
                            nsiVagon = Ext.create(modelClsName).getProxy().getReader().read(response)['records'][0];

                        this.copyNsiToVagon(nsiVagon, koleya);

                    }
                    this.getVagonmainform().setLoading(false);
                },
                failure: function (response, options) {
                    this.getVagonmainform().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
    },
    selectNsiForVagonShir: function(view, nsiVagon){
        this.copyNsiToVagon(nsiVagon, 'shir');
        view.up('window').close();
    },
    selectNsiForVagonUzky: function(view, nsiVagon){
        this.copyNsiToVagon(nsiVagon, 'uzky');
        view.up('window').close();
    },
    copyNsiToVagon: function(nsiVagon, koleya){
        var /*vagon = this.getVagonmainform().getRecord(),
            values =  this.getVagonmainform().getValues();*/
            form = this.getVagonmainform().getForm();


        if(koleya === 'shir') {
            form.findField('nvag').setValue(nsiVagon.get('nvag'));
            form.findField('kpv').setValue(nsiVagon.get('owntypen'));
            form.findField('podSila').setValue(nsiVagon.get('gp'));
            form.findField('masTar').setValue(nsiVagon.get('tara'));
            form.findField('plan_rem').setValue(nsiVagon.get('datePlanrem'));
            form.findField('type_no').setValue(nsiVagon.get('typeNo'));
            form.findField('model').setValue(nsiVagon.get('modelvag'));
            form.findField('dlina').setValue(nsiVagon.get('dlvag'));
            form.findField('sobstv').setValue(nsiVagon.get('nown'));
            form.findField('probeg').setValue(nsiVagon.get('ostProbeg'));
            form.findField('reviz').setValue(nsiVagon.get('dProbegV'));
        } else {
            form.findField('nvag').setValue(nsiVagon.get('nvaguf'));
            form.findField('kpv').setValue(nsiVagon.get('kodownvag'));
            form.findField('podSila').setValue(nsiVagon.get('grpodvag'));
            form.findField('masTar').setValue(nsiVagon.get('mnetvag'));
            form.findField('plan_rem').setValue(nsiVagon.get('dPlanrem'));
            form.findField('type_no').setValue(nsiVagon.get('typevag'));
            form.findField('dlina').setValue(nsiVagon.get('dlvag'));
            form.findField('sobstv').setValue(nsiVagon.get('sobs'));
            form.findField('kolOs').setValue(nsiVagon.get('osi'));
        }
        form.findField('owner.hid').setValue(nsiVagon.getOwner() != null ? nsiVagon.getOwner().getId() : null);
        form.findField('nvag').focus();
        /*vagon.set(values);
        vagon.setOwner(nsiVagon.getOwner());
        if(koleya === 'shir') {
            vagon.set('nvag', nsiVagon.get('nvag'));
            vagon.set('kpv', nsiVagon.get('owntypen'));
            vagon.set('podSila', nsiVagon.get('gp'));
            vagon.set('masTar', nsiVagon.get('tara'));
            vagon.set('plan_rem', nsiVagon.get('datePlanrem'));
            vagon.set('type_no', nsiVagon.get('typeNo'));
            vagon.set('model', nsiVagon.get('modelvag'));
            vagon.set('dlina', nsiVagon.get('dlvag'));
            vagon.set('sobstv', nsiVagon.get('nown'));
            vagon.set('probeg', nsiVagon.get('ostProbeg'));
            vagon.set('reviz', nsiVagon.get('dProbegV'));
            //vagon.set('kolOs', nsiVagon.get('kolOs'));
        } else {
            vagon.set('nvag', nsiVagon.get('nvaguf'));
            vagon.set('kpv', nsiVagon.get('kodownvag'));
            vagon.set('podSila', nsiVagon.get('grpodvag'));
            vagon.set('masTar', nsiVagon.get('mnetvag'));
            vagon.set('plan_rem', nsiVagon.get('dPlanrem'));
            vagon.set('type_no', nsiVagon.get('typevag'));
            vagon.set('dlina', nsiVagon.get('dlvag'));
            vagon.set('sobstv', nsiVagon.get('sobs'));
            vagon.set('kolOs', nsiVagon.get('osi'));
        }

        this.getVagonmainform().loadRecord(vagon);*/
    }

    /*,
    beforeQueryNvag: function(queryPlan){
        var store = queryPlan.combo.getStore();
        store.getProxy().extraParams = {action: 'list'};
        store.pageSize = 0;
    }*/

});
