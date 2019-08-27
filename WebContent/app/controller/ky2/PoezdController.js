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
        'ky2.AbstractForm',
        'ky2.poezd.PoezdsImportDir',
        'ky2.BasePoezdsImportDir'
    ],
    stores: [
        'ky2.PoezdsBase',
        'ky2.PoezdsInto',
        'ky2.PoezdsOut',
        'ky2.PoezdsDir',
        'ky2.PoezdsImportDir'
    ],
    models: [
        'ky2.PoezdBase',
        'ky2.PoezdInto',
        'ky2.PoezdOut',
        'ky2.PoezdDir',
        'ky2.PoezdImportDir',
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
    }, {     // PoezdsImportDir
        ref: 'poezdform',
        selector: 'viewport > tabpanel ky2abstractform#ky2poezdform'
    }, {
        ref: 'poezdsImportDir',
        selector: 'ky2poezdsimportdir > ky2basepoezdsimportdir'
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
            'ky2poezdintolist button[action="createPoezdOutFromInto"]': {
                click: this.createPoezdOutFromPoezdInto
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
            'ky2poezdintolist button[action="showPoezdsImportDir"]': {
                click: this.showPoezdsImportDir
            },
            'ky2poezdsimportdir button[action="getPoesdsForImport"]': {
                click: this.importPoesd
            },
            /*'ky2poezdintolist button[action="showPoezdsOutDir4PoezdIntoBind"]': {
                click: this.showPoezdsOutDir4PoezdIntoBind
            },
            'ky2poezdoutlist button[action="showPoezdsIntoDir4PoezdOutBind"]': {
                click: this.showPoezdsIntoDir4PoezdOutBind
            },*/
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
            },
            'ky2bindtreeform button[action="editVgCtGr"]': {
                click: this.toVgCtGrFromOutside
            },
            'ky2vgctgrtreeform button[action=editPoezd]': {
                click: this.editPoezdFromOutside
            },
            'ky2bindtreeform button[action=editPoezd]': {
                click: this.editPoezdFromOutside
            }


        });
    },

    toVgCtGrFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.getController('ky2.PoezdVgCtGrController').editVgCtGr('ky2vgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode', rootNode.get('hid'));
        else
            this.getController('ky2.PoezdVgCtGrController').editVgCtGr('ky2vgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode', rootNode.get('hid'));
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

    editPoezdFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.editPoezd('ky2poezdintoform', 'TK.model.ky2.PoezdInto', rootNode.get('hid'));
        else
            this.editPoezd('ky2poezdoutform', 'TK.model.ky2.PoezdOut', rootNode.get('hid'));
    },

    editPoezdInto: function (btn) {
        this.editPoezdCheck('ky2poezdintoform', 'TK.model.ky2.PoezdInto');
    },
    editPoezdOut: function (btn) {
        this.editPoezdCheck('ky2poezdoutform', 'TK.model.ky2.PoezdOut');
    },
    editPoezdCheck: function (widget, modelClsName) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        this.editPoezd(widget, modelClsName, poezdlist.getSelectionModel().getLastSelected().get('hid'));
    },

    editPoezd: function (xtype, modelClsName, poezdHid) {
        // var poezdlist = this.getPoezdlist();
        // if (!TK.Utils.isRowSelected(poezdlist)) {
        //     return false;
        // }

        // var hid = poezdlist.getSelectionModel().getLastSelected().get('hid');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var poezdcontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit}));

        poezdcontainer.setLoading(true);

        var poezd = Ext.ModelManager.getModel(modelClsName);

        poezd.load(poezdHid, {
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

    showPoezdsImportDir: function () {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var win = Ext.widget('ky2poezdsimportdir'),
            store = win.down('grid').getStore(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected();

        store.load({
             params: {
                 action: 'import_poezd_list'/*,
                 routeId: poezdModel.get('route.hid')*/
             }
        });
    },

    importPoesd: function() {
        var poezdlist = this.getPoezdlist(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected(),
            poezdsDir = this.getPoezdsImportDir().getSelectionModel().getSelection(),
            poezdDirModel = poezdsDir.length > 0 ? poezdsDir[0] : null;

        if (poezdDirModel == null) {
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано значение',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        this.getCenter().setLoading(true);

        Ext.Ajax.request({
            url: this.getPoezdlist().getStore().getProxy().url,
            params: {
                n_packet: poezdDirModel.get('n_packet'),
                n_poezd: poezdDirModel.get('n_poezd'),
                ved_nomer: poezdDirModel.get('ved_nomer'),
                action: 'import_poesd',
                koleya: poezdModel.get('koleya'),
                direction: poezdModel.get('direction'),
                routeId: poezdModel.get('route.hid')
            },
            scope: this,
            callback: function (options, success, response) {
                this.getCenter().setLoading(false);
                if (success) {
                    this.getPoezdsImportDir().up('window').close();
                    this.getPoezdlist().getStore().reload();

                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            }
        });
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
    },
    createPoezdOutFromPoezdInto: function(btn){
        var poezdlist = this.getPoezdlist();
        if(!TK.Utils.isRowSelected(poezdlist)){
            return false;
        }

        var poezd = poezdlist.getSelectionModel().getLastSelected();
        Ext.Msg.show({
            title:'Подтверждение',
            msg: 'Создать поезд по отправлению?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes'){
                    this.getCenter().setLoading(true);
                    Ext.Ajax.request({
                        url: poezd.getProxy().url,
                        params: {
                            action: 'create_poezdout_from_poezdinto',
                            hid: poezd.get('hid')
                        },
                        scope: this,
                        success: function(response, options) {
                            this.getCenter().setLoading(false);
                            Ext.Msg.show({
                                title: '',
                                msg: 'Ok',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            // var text = Ext.decode(response.responseText);
                        },
                        failure: function(response){
                            this.getCenter().setLoading(false);
                            TK.Utils.makeErrMsg(response, 'Error...');
                        }
                    });
                }
            }
        })
    }
});
