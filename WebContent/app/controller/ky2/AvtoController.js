Ext.define('TK.controller.ky2.AvtoController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky2.avto.into.AvtoList',
        'ky2.avto.into.AvtoForm',
        'ky2.avto.out.AvtoList',
        'ky2.avto.out.AvtoForm',
        'ky2.avto.BaseAvtoList',
        'ky2.avto.BaseAvtoForm',
        // 'ky2.poezd.into.PoezdsOutDir',
        // 'ky2.BasePoezdsDir',
        'ky2.AbstractList',
        'ky2.AbstractForm'
    ],
    stores: [
        'ky2.AvtosBase',
        'ky2.AvtosInto',
        'ky2.AvtosOut',
        'ky2.AvtosDir'
    ],
    models: [
        'ky2.AvtoBase',
        'ky2.AvtoInto',
        'ky2.AvtoOut',
        'ky2.AvtoDir',
        'PackDoc'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'avtolist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'avtoform',
        selector: 'viewport > tabpanel ky2abstractform#ky2avtoform'
    }],

    init: function () {
        this.control({
            'ky2avtointolist button[action="create"]': {
                click: this.createAvtoInto
            },
            'ky2avtooutlist button[action="create"]': {
                click: this.createAvtoOut
            },
            'ky2avtointolist button[action="edit"]': {
                click: this.editAvtoInto
            },
            'ky2avtooutlist button[action="edit"]': {
                click: this.editAvtoOut
            },

            'ky2avtointolist': {
                itemdblclick: this.editAvtoInto
            },
            'ky2avtooutlist': {
                itemdblclick: this.editAvtoOut
            },
            'ky2avtointolist button[action="delete"]': {
                click: this.deleteAvto
            },
            'ky2avtooutlist button[action="delete"]': {
                click: this.deleteAvto
            },
            'ky2avtointolist button[action="showAvtosOutDir4AvtoIntoBind"]': {
                click: this.showAvtosOutDir4AvtoIntoBind
            },
            'ky2avtooutlist button[action="showAvtosIntoDir4AvtoOutBind"]': {
                click: this.showAvtosIntoDir4AvtoOutBind
            },
            'ky2avtointoform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2avtooutform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2avtointoform button[action="save"]': {
                click: this.saveAvto
            },
            'ky2avtooutform button[action="save"]': {
                click: this.saveAvto
            }
        });
    },

    createAvtoInto: function (btn) {
        this.createAvto('ky2avtointoform', 'TK.model.ky2.AvtoInto');
    },
    createAvtoOut: function (btn) {
        this.createAvto('ky2avtooutform', 'TK.model.ky2.AvtoOut');
    },
    createAvto: function (xtype, modelClsName) {
        var poezdlist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = poezdlist.getStore().getProxy().extraParams,
            poezd = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction']
            }),
            poezdcontainer = Ext.widget(xtype, {title: this.titleCreate});

        poezdcontainer.down('form').loadRecord(poezd);
        poezdcontainer.down('form').initFieldsWithDefaultsValues();
        //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(poezdcontainer);
    },
    editAvtoInto: function (btn) {
        this.editAvto('ky2avtointoform', 'TK.model.ky2.AvtoInto');
    },
    editAvtoOut: function (btn) {
        this.editAvto('ky2avtooutform', 'TK.model.ky2.AvtoOut');
    },
    editAvto: function (xtype, modelClsName) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }

        var hid = avtolist.getSelectionModel().getLastSelected().get('hid');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var avtocontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit}));

        avtocontainer.setLoading(true);

        var avto = Ext.ModelManager.getModel(modelClsName);

        avto.load(hid, {
            scope: this,
            //params:{action: serverAction},
            params: {action: 'edit'},
            callback: function (avto, operation, success) {
                if (success) {
                    avtocontainer.down('form').loadRecord(avto);

                    // this.showVagons(poezd.vagons());
                }
                avtocontainer.setLoading(false);
            }
        });
    },
    deleteAvto: function () {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    avtolist.setLoading(true);
                    var avto = avtolist.getSelectionModel().getLastSelected();
                    avto.destroy({
                        params: {action: 'delete'},

                        callback: function (avto, operation) {
                            avtolist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                avtolist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    saveExit: function () {
        this.saveAvto(1);
    },

    saveAvto: function (close) {
        var form = this.getAvtoform();
        if (form.isValid()) {
            var avto = form.getRecord(),
                newAvto = (avto.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            avto.set(values);
            if (newAvto) {
                avto.setRoute(Ext.create('TK.model.Route', {hid: avto.get('route.hid')}));
            }
            avto.save({
                params: {action: 'save'},
                callback: function (avto, operation, success) {
                    if (success) {
                        if (Ext.isNumber(close)) {
                            var closeBtn = form.down('button[action="close"]');
                            closeBtn.fireEvent('click',closeBtn);
                        }
                        else {
                            form.loadRecord(avto);
                            if (newAvto) {       // packdoc will be available after save
                                avto.setPackDoc(Ext.create('TK.model.PackDoc', {hid: avto.get('packDoc.hid')}));
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

    showAvtosOutDir4AvtoIntoBind: function (btn) {
        this.showAvtosDir4AvtoBind('ky2avtosout4avtointodir', 2);
    },

    showAvtosIntoDir4AvtoOutBind: function (btn) {
        this.showAvtosDir4AvtoBind('ky2avtosinto4avtooutdir', 1);
    },

    showAvtosDir4AvtoBind: function (widget, direction) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }

        var win = Ext.widget(widget),
            store = win.down('grid').getStore(),
            avtoModel = avtolist.getSelectionModel().getLastSelected();

        store.getProxy().extraParams = {action: 'avtos_dir_for_avto_bind', direction: direction, routeId: avtoModel.get('route.hid')};
        store.load();
    }

});
