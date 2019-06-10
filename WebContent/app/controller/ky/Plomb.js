Ext.define('TK.controller.ky.Plomb', {
    extend:'Ext.app.Controller',

    views: [
        'ky.poezd.into.vagon.kont.plomb.List',
        'ky.poezd.out.vagon.kont.plomb.List',

        'ky.avto.into.kont.plomb.List',
        'ky.avto.out.kont.plomb.List',

        'ky.kontnotransp.plomb.List',
        'ky.BasePlombList',
        'ky.yard.kont.plomb.List'
    ],
    models: [
        'ky.PlombBase',
        'ky.PlombInPoezdInto',
        'ky.PlombInPoezdOut',
        'ky.PlombInAvtoInto',
        'ky.PlombInAvtoOut',
        'ky.PlombInYard',
        'ky.PlombNoTrasp'
    ],
    stores: [
        'ky.PlombsInAvtoInto',
        'ky.PlombsInAvtoOut',
        'ky.PlombsInPoezdInto',
        'ky.PlombsInPoezdOut',
        'ky.PlombsNoTrasp',
        'ky.PlombsInYard'
    ],
    refs:[{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref: 'plomblist',
        selector: 'window > #kyplomblist'
    },{
        ref: 'kontform',
        selector: 'window > #kykontform'
    },{
        ref: 'plombform',
        selector: 'window > #kyplombform'
    }],
    init:function() {
        this.control({
            'kyplombinpoezdintolist button[action="create"]': {
                click: this.createPlombInPoezdInto
            },
            'kyplombinpoezdintolist button[action="edit"]': {
                click: this.editPlombInPoezdInto
            },
            'kyplombinpoezdintolist': {
                itemdblclick: this.editPlombInPoezdInto,
                save: this.savePlomb,
                'delete': this.deletePlomb
            },
            'kyplombinpoezdoutlist button[action="create"]': {
                click: this.createPlombInPoezdOut
            },
            'kyplombinpoezdoutlist button[action="edit"]': {
                click: this.editPlombInPoezdOut
            },
            'kyplombinpoezdoutlist': {
                itemdblclick: this.editPlombInPoezdOut,
                save: this.savePlomb,
                'delet': this.deletePlomb
            },

            'kyplombnotransplist button[action="create"]': {
                click: this.createPlombNoPoezd
            },

            'kyplombnotransplist button[action="edit"]': {
                click: this.editPlombNoPoezd
            },
            'kyplombnotransplist': {
                itemdblclick: this.editPlombNoPoezd,
                save: this.savePlomb,
                'delete': this.deletePlomb
            },

            'kyplombinavtointolist button[action="create"]': {
                click: this.createPlombInAvtoInto
            },
            'kyplombinavtointolist button[action="edit"]': {
                click: this.editPlombInAvtoInto
            },
            'kyplombinavtointolist': {
                itemdblclick: this.editPlombInAvtoInto,
                save: this.savePlomb,
                'delete': this.deletePlomb
            },
            'kyplombinavtooutlist button[action="create"]': {
                click: this.createPlombInAvtoOut
            },
            'kyplombinavtooutlist button[action="edit"]': {
                click: this.editPlombInAvtoOut
            },
            'kyplombinavtooutlist': {
                itemdblclick: this.editPlombInAvtoOut,
                save: this.savePlomb,
                'delete': this.deletePlomb
            }

            ,
            'kyplombinyardlist button[action="create"]': {
                click: this.createPlombInYard
            },
            'kyplombinyardlist button[action="edit"]': {
                click: this.editPlombInYard
            },
            'kyplombinyardlist': {
                itemdblclick: this.editPlombInYard,
                save: this.savePlomb,
                'delete': this.deletePlomb
            }

        });
    },
    createPlombInPoezdInto: function(btn){
        this.createPlomb('kyplombinpoezdintoform', 'TK.model.ky.PlombInPoezdInto');
    },
    createPlombInPoezdOut: function(btn){
        this.createPlomb('kyplombinpoezdoutform', 'TK.model.ky.PlombInPoezdOut');
    },
    createPlombInAvtoInto: function(btn){
        this.createPlomb('kyplombinavtointoform', 'TK.model.ky.PlombInAvtoInto');
    },
    createPlombInAvtoOut: function(btn){
        this.createPlomb('kyplombinavtooutform', 'TK.model.ky.PlombInAvtoOut');
    },
    createPlombNoPoezd: function(btn){
        this.createPlomb('kyplombnotranspform', 'TK.model.ky.PlombNoTrasp');
    },
    createPlombInYard: function(btn){
        this.createPlomb('kyplombinyardform', 'TK.model.ky.PlombInYard');
    },
    createPlomb: function(xtype, modelClsName){
        /*var plombcontainer = Ext.widget(xtype, {title: this.titleCreate});
        plombcontainer.down('form').loadRecord(Ext.create(modelClsName));*/

        var plomb = Ext.create(modelClsName, {kpl: 1}),
            grid = this.getPlomblist(),
            cellEditing = grid.getPlugin('cellplugin');

        grid.getStore().insert(0, plomb);
        cellEditing.startEditByPosition({
            row: 0,
            column: 1
        });
    },

    editPlombInPoezdInto: function(btn){
        this.editPlomb('kyplombinpoezdintoform');
    },
    editPlombInPoezdOut: function(btn){
        this.editPlomb('kyplombinpoezdoutform');
    },

    editPlombInAvtoInto: function(btn){
        this.editPlomb('kyplombinavtointoform');
    },
    editPlombInAvtoOut: function(btn){
        this.editPlomb('kyplombinavtooutform');
    },
    editPlombInYard: function(btn){
        this.editPlomb('kyplombinyardform');
    },

    editPlombNoPoezd: function(btn){
        this.editPlomb('kyplombnotranspform');
    },
    editPlomb: function(xtype){
        var plomblist = this.getPlomblist();
        if(!TK.Utils.isRowSelected(plomblist)){
            return false;
        }

        var plomb = plomblist.getSelectionModel().getLastSelected(),
            plombcontainer = Ext.widget(xtype, {title: this.titleEdit});

        plombcontainer.down('form').loadRecord(plomb);
    },

    /*savePlomb:function(btn){
//        var form = btn.up('form').getForm();
        var form = this.getPlombform();
        if (form.isValid()) {
            var win = btn.up('window'),
                plomb = form.getRecord(),
                newPlomb = (plomb.getId() == null),
                values = form.getValues();

            win.setLoading(true);
            plomb.set(values);
            if(newPlomb){
                var kont = this.getKontform().getRecord();
                plomb.setKont(kont);
            }
            plomb.save({
                params:{action: 'save'},
                callback: function(plomb, operation, success) {
                    win.setLoading(false);
                    if(success){
                        win.close();
                        if(newPlomb){  // new record
                            //var plomblist = this.getPlomblist();

                            //plomblist.getStore().add(plomb);
                            kont.plombs().add(plomb);

                            //plomblist.getSelectionModel().select(plomb);
                        }
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
*/
    savePlomb:function(grid, plomb){
        var win = grid.up('window'),
            newPlomb = (plomb.getId() == null);

        win.setLoading(true);
        if(newPlomb){
            var kont = this.getKontform().getRecord();
            plomb.setKont(kont);
        }
        plomb.save({
            params:{action: 'save'},
            callback: function(plomb, operation, success) {
                win.setLoading(false);
                if(success){
                    //win.close();
                    if(newPlomb){  // new record
                        kont.plombs().add(plomb);
                    }
                }
            },
            scope: this
        });

    },
    deletePlomb:function(plomblist, plomb){
        //var plomblist = this.getPlomblist();
        if(!TK.Utils.isRowSelected(plomblist)){
            return false;
        }

        var win = plomblist.up('window');
        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    win.setLoading(true);
                    plomb.destroy({
                        params:{action: 'delete'/*, hid: plombyard.get('hid')*/},
                        callback: function(plomb, operation) {
                            win.setLoading(false);
                        },
                        scope: this
                    });
                }
            }
        });
    }
    /*,
    deletePlomb:function(btn){
        var plomblist = this.getPlomblist();
        if(!TK.Utils.isRowSelected(plomblist)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    plomblist.setLoading(true);
                    var plomb = plomblist.getSelectionModel().getLastSelected();
                    plomb.destroy({
                        params:{action: 'delete'*//*, hid: plombyard.get('hid')*//*},
                        callback: function(plomb, operation) {
                            plomblist.setLoading(false);
                        },
                        scope: this
                    });
                }
            }
        });
    }*/
});
