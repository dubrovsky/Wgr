Ext.define('TK.controller.ky2.YardController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.yard.YardList',
        'ky2.yard.YardForm'
    ],
    stores: [
        'ky2.Yards',
        'ky2.YardSectors'
    ],
    models: [
        'ky2.YardBase',
        'ky2.YardSector'
    ],
    refs: [{
        ref: 'yardlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'yardform',
        selector: 'ky2yardform > form'
    }],

    init: function () {
        this.control({
            'ky2yardlist button[action="create"]': {
                click: this.createYard
            },
            'ky2yardlist button[action="edit"]': {
                click: this.editYard
            },
            'ky2yardlist': {
                itemdblclick: this.editYard/*,
                select: this.selectYardInList*/
            },
            'ky2yardlist button[action="delete"]': {
                click: this.deleteYard
            },
            'ky2yardform button[action="save"]': {
                click: this.saveYard
            }
        });
    },

    createYard: function (btn) {
        var yardcontainer = Ext.widget('ky2yardform', {title: this.titleCreate});
        yardcontainer.down('form').loadRecord(Ext.create('TK.model.ky2.YardBase'));
    },

    editYard: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isRowSelected(yardlist)) {
            return false;
        }

        var yardcontainer = Ext.widget('ky2yardform', {title: this.titleEdit});
        yardcontainer.setLoading(true);

        var yard = Ext.ModelManager.getModel('TK.model.ky2.YardBase'),
            hid = yardlist.selModel.getLastSelected().get('hid');

        yard.load(hid, {
            scope: this,
            params: {action: 'edit'},
            callback: function (yard, operation, success) {
                if (success) {
                    var form = yardcontainer.down('form');
                    this.checkForKontyardSector(yard.getSector(), form.getForm());
                    form.loadRecord(yard);
                }
                yardcontainer.setLoading(false);
            }
        });
    },
    checkForKontyardSector: function (sector, form) {
        if (sector) {
            var store = form.findField('sector.hid').getStore();
            store.removeAll();
            store.add(sector);
            form.findField('sector.hid').setValue(sector.get('hid'));
        }
    },
    deleteYard: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isRowSelected(yardlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    yardlist.setLoading(true);
                    var yard = yardlist.getSelectionModel().getLastSelected();
                    yard.destroy({
                        params: {action: 'delete'/*, hid: kontyard.get('hid')*/},
                        callback: function (yard, operation) {
                            yardlist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                yardlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    saveYard: function (btn) {
        var form = this.getYardform().getForm();
        if (form.isValid()) {
            var win = btn.up('window'),
                yard = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);

            yard.set(values);
            yard.save({
                params: {action: 'save'},
                callback: function (yard, operation, success) {
                    win.setLoading(false);
                    if (success) {
                        win.close();
                        this.getYardlist().getStore().reload();
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    }
});
