Ext.define('TK.controller.ky2.PoezdController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky2.poezd.into.PoezdList',
        'ky2.poezd.into.PoezdForm',
        'ky2.poezd.out.PoezdList',
        'ky2.poezd.out.PoezdForm',
        'ky2.poezd.BasePoezdList',
        'ky2.poezd.BasePoezdForm',
        'ky2.poezd.into.PoezdsOutDir',
        'ky2.BasePoezdsDir',
        'ky2.AbstractList',
        'ky2.AbstractForm'
    ],
    stores: [
        'ky2.PoezdsBase',
        'ky2.PoezdsInto',
        'ky2.PoezdsOut',
        'ky2.PoezdsDir'
    ],
    models: [
        'ky2.PoezdBase',
        'ky2.PoezdInto',
        'ky2.PoezdOut',
        'ky2.PoezdDir',
        'PackDoc'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'poezdform',
        selector: 'viewport > tabpanel ky2abstractform#ky2poezdform'
    }],

    init: function () {
        this.control({
            'ky2poezdintolist button[action="create"]': {
                click: this.createPoezdInto
            },
            'ky2poezdoutlist button[action="create"]': {
                click: this.createPoezdOut
            },
            'ky2poezdintolist button[action="edit"]': {
                click: this.editPoezdInto
            },
            'ky2poezdoutlist button[action="edit"]': {
                click: this.editPoezdOut
            },

            'ky2poezdintolist': {
                itemdblclick: this.editPoezdInto
            },
            'ky2poezdoutlist': {
                itemdblclick: this.editPoezdOut
            },
            'ky2poezdintolist button[action="delete"]': {
                click: this.deletePoezd
            },
            'ky2poezdintolist button[action="showPoezdsOutDir4PoezdIntoBind"]': {
                click: this.showPoezdsOutDir4PoezdIntoBind
            },
            'ky2poezdoutlist button[action="showPoezdsIntoDir4PoezdOutBind"]': {
                click: this.showPoezdsIntoDir4PoezdOutBind
            },
            'ky2poezdoutlist button[action="delete"]': {
                click: this.deletePoezd
            },
            'ky2poezdintoform button[action="save"]': {
                click: this.savePoezd
            },
            'ky2poezdoutform button[action="save"]': {
                click: this.savePoezd
            },
            'ky2poezdintoform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdoutform button[action="saveExit"]': {
                click: this.saveExit
            },
            // 'ky2basepoezdform radiogroup#koleya': {
            //     change: this.onKoleyaChange
            // }
            'ky2poezdintoform button[action="editVgCtGr"]': {
                click: this.toVgCtGrInto
            },
            'ky2poezdoutform button[action="editVgCtGr"]': {
                click: this.toVgCtGrOut
            }


        });
    },

    toVgCtGrInto: function (btn) {
        this.toVgCtGr('ky2vgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    toVgCtGrOut: function (btn) {
        this.toVgCtGr('ky2vgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    toVgCtGr: function (xtype, modelClsName) {
        var record = this.getPoezdform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.getController('ky2.PoezdVgCtGrController').editVgCtGr(xtype, modelClsName, record.get('hid'));
    },

    createPoezdInto: function (btn) {
        this.createPoezd('ky2poezdintoform', 'TK.model.ky2.PoezdInto');
    },
    createPoezdOut: function (btn) {
        this.createPoezd('ky2poezdoutform', 'TK.model.ky2.PoezdOut');
    },
    createPoezd: function (xtype, modelClsName) {
        var poezdlist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = poezdlist.getStore().getProxy().extraParams,
            poezd = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction'],
                koleya: extraParams['koleya']
            }),
            poezdcontainer = Ext.widget(xtype, {title: this.getTitleByDirection(extraParams['direction'], extraParams['koleya'])});

        poezdcontainer.down('form').loadRecord(poezd);
        poezdcontainer.down('form').initFieldsWithDefaultsValues();
        //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(poezdcontainer);
    },
    editPoezdInto: function (btn) {
        this.editPoezd('ky2poezdintoform', 'TK.model.ky2.PoezdInto');
    },
    editPoezdOut: function (btn) {
        this.editPoezd('ky2poezdoutform', 'TK.model.ky2.PoezdOut');
    },
    editPoezd: function (xtype, modelClsName) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var hid = poezdlist.getSelectionModel().getLastSelected().get('hid');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var poezdcontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit}));

        poezdcontainer.setLoading(true);

        var poezd = Ext.ModelManager.getModel(modelClsName);

        poezd.load(hid, {
            scope: this,
            //params:{action: serverAction},
            params: {action: 'edit'},
            callback: function (poezd, operation, success) {
                if (success) {
                    poezdcontainer.down('form').loadRecord(poezd);

                    // this.showVagons(poezd.vagons());
                }
                poezdcontainer.setLoading(false);
            }
        });
    },
    deletePoezd: function () {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    poezdlist.setLoading(true);
                    var poezd = poezdlist.getSelectionModel().getLastSelected();
                    poezd.destroy({
                        params: {action: 'delete'},

                        callback: function (poezd, operation) {
                            poezdlist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                poezdlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    saveExit: function () {
        this.savePoezd(1);
    },

    savePoezd: function (close) {
        var form = this.getPoezdform();
        if (form.isValid()) {
            var poezd = form.getRecord(),
                newPoezd = (poezd.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            poezd.set(values);
            if (newPoezd) {
                poezd.setRoute(Ext.create('TK.model.Route', {hid: poezd.get('route.hid')}));
            }
            poezd.save({
                params: {action: 'save'},
                callback: function (poezd, operation, success) {
                    if (success) {
                        if (Ext.isNumber(close)) {
                            var closeBtn = form.down('button[action="close"]');
                            closeBtn.fireEvent('click',closeBtn);
                        }
                        else {
                            form.loadRecord(poezd);
                            if (newPoezd) {       // packdoc will be available after save
                                poezd.setPackDoc(Ext.create('TK.model.PackDoc', {hid: poezd.get('packDoc.hid')}));
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
    },

    showPoezdsOutDir4PoezdIntoBind: function (btn) {
        this.showPoezdsDir4PoezdBind('ky2poezdsout4poezdintodir', 2);
    },

    showPoezdsIntoDir4PoezdOutBind: function (btn) {
        this.showPoezdsDir4PoezdBind('ky2poezdsinto4poezdoutdir', 1);
    },

    showPoezdsDir4PoezdBind: function (widget, direction) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var win = Ext.widget(widget),
            store = win.down('grid').getStore(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected();

        store.getProxy().extraParams = {action: 'poezds_dir_for_poezd_bind', direction: direction, routeId: poezdModel.get('route.hid')};
        store.load();
    },
    getTitleByDirection: function (direction, koleya) {
        switch (direction) {
            case 1:
                return (koleya === 1 ? this.titleCreateIntoWide : this.titleCreateIntoNar);
            case 2:
                return (koleya === 1 ? this.titleCreateOutWide : this.titleCreateOutNar);
            default:
                return "";
        }
    }



});
