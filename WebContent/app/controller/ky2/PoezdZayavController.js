Ext.define('TK.controller.ky2.PoezdZayavController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky2.poezd.into.PoezdZayavList',
        'ky2.poezd.into.PoezdZayavForm',
        'ky2.poezd.out.PoezdZayavList',
        'ky2.poezd.out.PoezdZayavForm',
        'ky2.poezd.BasePoezdZayavList',
        'ky2.poezd.BasePoezdZayavForm',
        'ky2.AbstractList',
        'ky2.AbstractForm'
    ],
    stores: [
        'ky2.PoezdZayavsBase',
        'ky2.PoezdZayavsInto',
        'ky2.PoezdZayavsOut'
        // 'ky2.PoezdsDir'
    ],
    models: [
        'ky2.PoezdZayavBase',
        'ky2.PoezdZayavInto',
        'ky2.PoezdZayavOut',
        'PackDoc'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'zayavlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'zayavform',
        selector: 'viewport > tabpanel ky2abstractform#ky2poezdzayavform'
    }],

    init: function () {
        this.control({
            'ky2poezdzayavintolist button[action="create"]': {
                click: this.createZayavInto
            },
            'ky2poezdzayavoutlist button[action="create"]': {
                click: this.createZayavOut
            },
            'ky2poezdzayavintolist button[action="edit"]': {
                click: this.editZayavInto
            },
            'ky2poezdzayavoutlist button[action="edit"]': {
                click: this.editZayavOut
            },
            'ky2poezdzayavintolist': {
                itemdblclick: this.editZayavInto
            },
            'ky2poezdzayavoutlist': {
                itemdblclick: this.editZayavOut
            },
            'ky2poezdzayavintolist button[action="delete"]': {
                click: this.deleteZayav
            },
            'ky2poezdzayavoutlist button[action="delete"]': {
                click: this.deleteZayav
            },
            'ky2poezdzayavintoform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdzayavoutform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdzayavintoform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2poezdzayavoutform button[action="save"]': {
                click: this.saveZayav
            }
        });
    },


    createZayavInto: function (btn) {
        this.createZayav('ky2poezdzayavintoform', 'TK.model.ky2.PoezdZayavInto');
    },
    createZayavOut: function (btn) {
        this.createZayav('ky2poezdzayavoutform', 'TK.model.ky2.PoezdZayavOut');
    },
    createZayav: function (xtype, modelClsName) {
        var zayavlist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = zayavlist.getStore().getProxy().extraParams,
            zayav = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction'],
                transport: 'P'
            }),
            zayavcontainer = Ext.widget(xtype, {title: this.getFormTitle(extraParams['direction'])});

        zayavcontainer.down('form').loadRecord(zayav);
        zayavcontainer.down('form').initFieldsWithDefaultsValues();
        //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(zayavcontainer);
    },

    getFormTitle: function(direction) {
        if (direction === 1)
            return 'Создание заявки на ввоз';
        else if (direction === 2)
            return 'Создание заявки на вывоз';
        else
            return '';
    },

    editZayavInto: function (btn) {
        this.editZayav('ky2poezdzayavintoform', 'TK.model.ky2.PoezdZayavInto');
    },

    editZayavOut: function (btn) {
        this.editZayav('ky2poezdzayavoutform', 'TK.model.ky2.PoezdZayavOut');
    },

    editZayav: function (xtype, modelClsName) {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }

        var hid = zayavlist.getSelectionModel().getLastSelected().get('hid'),
            no_zayav = zayavlist.getSelectionModel().getLastSelected().get('noZayav');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var zayavcontainer = this.getCenter().add(Ext.widget(xtype, {title: 'Редактирование заявки ' + no_zayav}));

        zayavcontainer.setLoading(true);

        var zayav = Ext.ModelManager.getModel(modelClsName);

        zayav.load(hid, {
            scope: this,
            //params:{action: serverAction},
            params: {action: 'edit'},
            callback: function (zayav, operation, success) {
                if (success) {
                    zayavcontainer.down('form').loadRecord(zayav);

                    // this.showVagons(poezd.vagons());
                }
                zayavcontainer.setLoading(false);
            }
        });
    },

    deleteZayav: function () {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: 'Удалить заявку?', buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    zayavlist.setLoading(true);
                    var zajav = zayavlist.getSelectionModel().getLastSelected();
                    zajav.destroy({
                        params: {action: 'delete'},

                        callback: function (zajav, operation) {
                            zayavlist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                zayavlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },

    saveExit: function () {
        this.saveZayav(1);
    },

    saveZayav: function (close) {
        var form = this.getZayavform();
        if (form.isValid()) {
            var zayav = form.getRecord(),
                newZayav = (zayav.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            zayav.set(values);
            if (newZayav) {
                zayav.setRoute(Ext.create('TK.model.Route', {hid: zayav.get('route.hid')}));
            }
            zayav.save({
                params: {action: 'save'},
                callback: function (zayav, operation, success) {
                    if (success) {
                        if (Ext.isNumber(close)) {
                            var closeBtn = form.down('button[action="close"]');
                            closeBtn.fireEvent('click',closeBtn);
                        }
                        else {
                            form.loadRecord(zayav);
                            if (newZayav) {       // packdoc will be available after save
                                zayav.setPackDoc(Ext.create('TK.model.PackDoc', {hid: zayav.get('packDoc.hid')}));
                            }
                        }
                    }
                    this.getCenter().setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    }
});
