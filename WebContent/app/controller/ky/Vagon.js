Ext.define('TK.controller.ky.Vagon', {
    extend:'Ext.app.Controller',

    views: [
        'ky.poezd.into.vagon.List',
        'ky.poezd.into.vagon.Form',
        'ky.poezd.out.vagon.List',
        'ky.poezd.out.vagon.Form',
        //'ky.poezd.NsiVag',
        'ky.poezd.BaseVagonForm',
        'ky.poezd.BaseVagonList'
    ],
    models: [
        'ky.VagonBase',
        'ky.VagonInto',
        'ky.VagonOut',
        'ky.VagonOutDir'
    ],
    stores:[
        'ky.VagonsInto',
        'ky.VagonsOut',
        'ky.VagonsOutDir'
    ],
    refs:[{
        ref: 'poezdform',
        selector: 'viewport > tabpanel kyabstractform#kypoezdform'
    },{
        ref: 'vagonlist',
        selector: 'viewport > tabpanel #kyvagonlist'
    },{
        ref: 'kontlist',
        selector: 'viewport > tabpanel #kykontlist'
    },{
        ref: 'vagonform',
        selector: 'window > kyabstractform#kyvagonform'
    }/*,{
        ref: 'nsivag',
        selector: 'kynsivag'
    }*/],
    init:function() {
        this.control({
            'kyvagonintolist button[action="create"]': {
                click: this.createVagonInto
            },
            'kyvagonintolist button[action="edit"]': {
                click: this.editVagonInto
            },
            'kyvagonintolist': {
                itemdblclick: this.editVagonInto,
                select: this.showKonts
            },
            'kyvagonoutlist button[action="create"]': {
                click: this.createVagonOut
            },
            'kyvagonoutlist button[action="edit"]': {
                click: this.editVagonOut
            },
            'kyvagonoutlist': {
                itemdblclick: this.editVagonOut,
                select: this.showKonts
            },
            'kyvagonintolist button[action="delete"]': {
                click: this.deleteVagon
            },
            'kyvagonintoform button[action="save"]': {
                click: this.saveVagon
            },

            'kyvagonoutlist button[action="delete"]': {
                click: this.deleteVagon
            },
            'kyvagonoutform button[action="save"]': {
                click: this.saveVagon
            },
            'kybasevagonform': {
                beforerender: this.prepareVagonForm
            }
        });
    },
    prepareVagonForm: function(vagonForm){
        vagonForm.prepareForm(
            this.getPoezdform().down('radiogroup#koleya').getValue().koleya,
            this.getPoezdform().down('combo#line').getValue()
        );
        /*var form = vagonForm.getForm(),
            lineField = form.findField('line'),
            koleya =  this.getPoezdform().down('radiogroup#koleya').getValue().koleya,
            shirVagCont = vagonForm.down('fieldcontainer#zhirVagCont'),
            uzkyVagCont = vagonForm.down('fieldcontainer#uzkyVagCont');

        if(koleya == 1) {
            lineField.getStore().loadData(
                [['948S'], ['949S'], ['950S'], ['951S'], ['Ciern/T']]
            );
            shirVagCont.show();
            uzkyVagCont.hide();
        } else if(koleya == 2){
            lineField.getStore().loadData(
                [['880'], ['881'], ['882'], ['883'], ['884'], ['948']]
            );
            shirVagCont.hide();
            uzkyVagCont.show();
        }*/
    },
    createVagonInto: function(btn){
        this.createVagon('kyvagonintoform', 'TK.model.ky.VagonInto');
    },
    createVagonOut: function(btn){
        this.createVagon('kyvagonoutform', 'TK.model.ky.VagonOut');
    },
    createVagon: function(xtype, modelClsName){
        var poezd = this.getPoezdform().getRecord(),
            koleya = this.getPoezdform().down('radiogroup#koleya').getValue().koleya,
            lineField = this.getPoezdform().down('combo#line'),
            line = lineField.getValue().toUpperCase() !== '���' ? lineField.getValue() : '';

        var vagon = Ext.create(modelClsName, {
                direction: poezd.get('direction'),
                koleya: koleya,
                'poezd.koleya': koleya,
                line: line
            }),
            vagoncontainer = Ext.widget(xtype, {title: this.titleCreate});

        vagon.setPoezd(poezd);
        vagoncontainer.down('form').loadRecord(vagon);
        vagoncontainer.down('form').initFieldsWithDefaultsValues(poezd);
    },
    editVagonInto: function(btn){
        this.editVagon('kyvagonintoform');
    },
    editVagonOut: function(btn){
        this.editVagon('kyvagonoutform');
    },
    editVagon: function(xtype){
        var vagonlist = this.getVagonlist();
        if(!TK.Utils.isRowSelected(vagonlist)){
            return false;
        }

        var vagon = vagonlist.getSelectionModel().getLastSelected(),
            vagoncontainer = Ext.widget(xtype, {title: this.titleEdit});

        vagoncontainer.down('form').loadRecord(vagon);
        this.enableCreateKontBtnInVagonForm();
    },
    enableCreateKontBtnInVagonForm: function(){
        this.getVagonform().down('button[action="plusKont"]').enable();
    },

    saveVagon:function(/*serverAction*/){
//        var form = btn.up('form').getForm();
        var form = this.getVagonform();
        if (form.isValid()) {
            var win = form.up('window'),
                vagon = form.getRecord(),
                newVagon = (vagon.getId() == null),
                values = form.getValues();

            win.setLoading(true);

            vagon.set(values);
            if(newVagon){
                var poezd = this.getPoezdform().getRecord();
                vagon.setPoezd(poezd);
            }

            vagon.save({
                params:{action: 'save'},
                callback: function(vagon, operation, success) {
                    win.setLoading(false);
                    if(success){
                        //win.close();
                        if(newVagon){  // new record
                            var vagonlist = this.getVagonlist();

                            vagonlist.getStore().add(vagon);
                            poezd.vagons().add(vagon);

                            vagonlist.getSelectionModel().select(vagon);
                            this.enableCreateKontBtnInVagonForm();
                        }
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },

    showKonts: function(/*konts*/rowModel, vagon, index){
        var kontlist = this.getKontlist(),
            konts = vagon.konts();
        if(kontlist.isHidden()){
            kontlist.show();
        }
//            kontlist.reconfigure(konts);// change konts store in grid

        kontlist.getStore().removeAll();
        if(konts.count() > 0 ){
            kontlist.getStore().add(konts.getRange());
            kontlist.getSelectionModel().select(0); // select 1st row and fire onselect event for kontainer grid
        }
    },

    deleteVagon:function(/*serverAction*/){
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
                        //params:{action: serverAction/*, hid: kontyard.get('hid')*/},
                        callback: function(vagon, operation) {
                            var vagons = vagonlist.getStore();
                            if(vagons.count() > 0) {
                                vagonlist.getSelectionModel().deselectAll();
                            }
                            var konts = this.getKontlist().getStore();
                            if(konts.count() > 0){
                                konts.removeAll();
                            }

                            var poezd = this.getPoezdform().getRecord();
                            poezd.konts().remove(vagon.konts().getRange());
                            poezd.vagons().remove(vagon);
                            vagonlist.setLoading(false);
                            /*if(operation['complete'] && !operation['exception']){
                                var vagonStore = list.getStore();
                                vagonStore.removeAt(vagonStore.indexOf(model));
                            }*/
                        },
                        scope: this
                    });
                }
            }
        });
    }
});
