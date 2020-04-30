Ext.define('TK.controller.ky2.PoezdController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    requires: [
        'TK.Utils',
        'TK.model.PackDoc',
        'TK.model.Route',
        'TK.model.ky2.PoezdInto',
        'TK.view.ky2.poezd.FilterPPV',
        'TK.view.ky2.poezd.PoezdsImportDir',
        'TK.view.ky2.poezd.VagonsImportDir',
        'TK.view.ky2.poezd.into.PoezdIntoForPoezdOutDir',
        'TK.view.ky2.poezd.out.PoezdsIntoForPoezdOutDir',
        'TK.view.ky2.poezd.zayav.Filter'
    ],

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
        'ky2.BasePoezdsImportDir',
        'ky2.poezd.VagonsImportDir',
        'ky2.BaseVagonsImportDir',
        'ky2.poezd.into.PoezdIntoForPoezdOutDir',
        'ky2.poezd.BasePoezdIntoForPoezdOut',
        'ky2.poezd.out.PoezdsIntoForPoezdOutDir',
        'ky2.poezd.into.PoezdZayavsIntoDir',
        'ky2.poezd.out.PoezdZayavsOutDir',
        'ky2.BasePoezdZayavsDir',
        'nsi.EditList',
        'nsi.List',
        'ky2.poezd.FilterPPV'
    ],
    stores: [
        'ky2.PoezdsBase',
        'ky2.PoezdsInto',
        'ky2.PoezdsOut',
        'ky2.PoezdsDir',
        'ky2.PoezdsImportDir',
        'ky2.VagonsImportDir',
        'ky2.PoezdIntoForPoezdOutDir',
        'ky2.PoezdsIntoForPoezdOutDir',
        'ky2.PoezdZayavsDir'
    ],
    models: [
        'ky2.PoezdBase',
        'ky2.PoezdInto',
        'ky2.PoezdOut',
        'ky2.PoezdDir',
        'ky2.PoezdImportDir',
        'ky2.VagonImportDir',
        'ky2.PoezdIntoForPoezdOutDir',
        'ky2.PoezdsIntoForPoezdOutDir',
        'ky2.PoezdZayavDir',
        'ky2.Client',
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
    }, {
        ref: 'vagonsImportDir',
        selector: 'ky2vagonsimportdir > ky2basevagonsimportdir'
    }, {
        ref: 'poezdIntoForPoezdOutList',
        selector: 'ky2poezdintoforpoezdoutdir > ky2basepoezdintoforpoezdout'
    }, {
        ref: 'poezdsIntoForPoezdOutList',
        selector: 'ky2poezdsintoforpoezdoutdir > ky2basepoezdintoforpoezdout'
    }, {
        ref: 'poezdZayavsIntoList',
        selector: 'ky2poezdzayavsintodir > ky2basepoezdzayavsdir'
    }, {
        ref: 'poezdZayavsOutList',
        selector: 'ky2poezdzayavsoutdir > ky2basepoezdzayavsdir'
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
            'ky2poezdintolist button[action="getPoezdIntoForPoezdOut"]': {
                click: this.onGetPoezdIntoForPoezdOut
            },
            'ky2poezdoutlist button[action="getPoezdsIntoForPoezdOut"]': {
                click: this.getPoezdsIntoForPoezdOut
            },
            'ky2poezdsintoforpoezdoutdir combo': {
                select: this.changePoezdIntoForPoezdOut
            },
            'ky2poezdintoforpoezdoutdir button[action="createPoezdOutFromPoezdInto"]': {
                click: this.createPoezdOutFromPoezdInto
            },
            'ky2poezdsintoforpoezdoutdir button[action="createPoezdOutFromPoezdInto"]': {
                click: this.createPoezdOutFromPoezdsInto
            },
            'ky2poezdoutlist button[action="edit"]': {
                click: this.editPoezdOut
            },

            'ky2poezdintolist': {
                itemdblclick: this.editPoezdInto,
                itemclick: this.onClickItem
            },
            'ky2poezdoutlist': {
                itemdblclick: this.editPoezdOut,
                itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                }
            },
            'ky2poezdintolist button[action="delete"]': {
                click: this.deletePoezd
            },
            'ky2poezdintoform button[action="import"] menuitem[action="showPoezdsImportDir"]': {
                click: this.onShowPoezdsImportDir
            },
            'ky2poezdsimportdir button[action="getPoesdsForImport"]': {
                click: this.showVagonsImportDir
            },
            'ky2basevagonsimportdir button[action="getVagonsForImport"]': {
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
            'ky2poezdintoform button[action="import"] menuitem[action=upload]': {
                click: this.onUploadPoezd
            },
            'ky2poezdintoform button[action="import"] menuitem[action=uploadUpdate]': {
                click: this.onUpdatePoezd
            },
            'ky2basepoezdlist button[action="reports"] menuitem[action="xlsexport"]': {
                click: this.exportPoezd
            },
            // 'ky2basepoezdlist button[action="reports"] menuitem[action="r27"]': {
            //     click: this.r27
            // },
            // 'ky2basepoezdlist button[action="reports"] menuitem[action="r27Blank"]': {
            //     click: this.r27
            // },
            'ky2poezdoutform button[action="import"] menuitem[action=uploadUpdate]': {
                click: this.onUpdatePoezd
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
                click: this.editPoezdFromVgCtGr
            },
            'ky2bindtreeform button[action=editPoezd]': {
                click: this.editPoezdFromOutside
            },
            'ky2poezdintoform button[action="nsiOtpr"]': {
                click: this.onShowNsiOtpr
            },
            'ky2poezdoutform button[action="nsiOtpr"]': {
                click: this.onShowNsiOtpr
            },
            'ky2poezdintoform button[action="import"] menuitem[action="getZajavIntoForPoezdInto"]': {
                click: this.getZajavIntoForPoezdInto
            },
            'ky2poezdintolist button[action="getZajavIntoForPoezdInto"]': {
                click: this.getZajavIntoForPoezdInto
            },
            'ky2poezdoutform button[action="import"] menuitem[action="getZajavOutForPoezdOut"]': {
                click: this.getZajavOutForPoezdOut
            },
            'ky2poezdzayavsintodir button[action="addToPoezdFromZayav"]': {
                click: this.addToPoezdIntoFromZayavInto
            },
            'ky2poezdzayavsoutdir button[action="addToPoezdFromZayav"]': {
                click: this.addToPoezdOutFromZayavOut
            },
            'ky2poezdintolist button[action="filterPoezd"]': {
                click: this.filterPoezd
            },
            'ky2poezdoutlist button[action="filterPoezd"]': {
                click: this.filterPoezd
            },
            'ky2poezdzayavfilter button[action="applyFilter"]': {
                click: this.applyFilterPoezd
            },
            'ky2poezdzayavfilter button[action="clearFilter"]': {
                click: this.clearFilterPoezd
            },
            'ky2poezdsimportdir button[action="filterPPV"]': {
                click: this.filterPPV
            },
            'ky2poezdfilterppv button[action="applyFilter"]': {
                click: this.applyFilterPPV
            },
            'ky2poezdfilterppv button[action="clearFilter"]': {
                click: this.clearFilterPPV
            },
            'ky2basevagonsimportdir': {
                selectionchange: this.onSelectionchange
            }

        });
    },

    onExportPoezd: function (btn) {
        this.savePoezd(null, this.exportPoezd.bind(this));
    },

    onUploadPoezd: function (btn) {
        this.savePoezd(null, this.uploadPoezd.bind(this, 'upload'));
    },

    onUpdatePoezd: function (btn) {
        this.savePoezd(null, this.uploadPoezd.bind(this, 'update'));
    },

    exportPoezd: function (btn) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        window.open('ky2/secure/Poezd.do?hid=' + poezdlist.getSelectionModel().getLastSelected().get('hid') + '&action=export_poezd', '_blank', '');
    },

    r27: function (btn) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        window.open('ky2/secure/Poezd.do?hid=' + poezdlist.getSelectionModel().getLastSelected().get('hid') + '&action=' + btn.action, '_blank', '');
    },

    uploadPoezd: function (action) {
        var record = this.getPoezdform().getRecord(),
            poezdHid = record.get('hid');
        if (poezdHid == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }

        var win = Ext.create('Ext.window.Window', {
            title: this.titleUpload,
            width: 600, y: 1, modal: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                autoHeight: true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {
                        xtype: 'filefield',
                        emptyText: this.labelSelectFile,
                        fieldLabel: this.labelFile,
                        name: 'upload',
                        buttonText: this.btnSearch,
                        anchor: '100%'
                    },
                    {xtype: 'hidden', name: 'hid', value: poezdHid}
                    // {xtype: 'hidden', name:'search.docId', value: doc['hid']},
                    // {xtype: 'hidden', name:'search.type', value: doc['type']},
                    // {xtype: 'hidden', name:'status', value: 2}
                ],
                buttons: [{
                    text: this.btnSave,
                    handler: function (btn) {
                        var form = btn.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'ky2/secure/Poezd.do',
                                params: {action: action},
                                waitMsg: this.waitMsg,
                                scope: this,
                                success: function (form, action) {
                                    form.reset();
                                    Ext.Msg.alert(this.warningMsg, this.uploadText);
                                    btn.up('window').close();
                                }
                                , failure: function (form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope: this
                }, {
                    text: this.btnClose,
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
            }
        }).show();
    },


    toVgCtGrFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.getController('ky2.PoezdVgCtGrController').editVgCtGr('ky2vgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode', rootNode.get('hid'), 'ky2/secure/PoezdVgCtGr.do', 'poezd');
        else
            this.getController('ky2.PoezdVgCtGrController').editVgCtGr('ky2vgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode', rootNode.get('hid'), 'ky2/secure/PoezdVgCtGr.do', 'poezd');
    },

    toVgCtGrInto: function (btn) {
        this.savePoezd(null, this.toVgCtGr.bind(this, 'ky2vgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode'));
    },

    toVgCtGrOut: function (btn) {
        this.savePoezd(null, this.toVgCtGr.bind(this, 'ky2vgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode'));
    },

    toVgCtGr: function (xtype, modelClsName) {
        var record = this.getPoezdform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.getController('ky2.PoezdVgCtGrController').editVgCtGr(xtype, modelClsName, record.get('hid'), 'ky2/secure/PoezdVgCtGr.do', 'poezd');
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

    editPoezdFromVgCtGr: function (btn) {
        this.getController('ky2.PoezdVgCtGrController').saveClick(null, null, null, btn, null, null, null, null, this.editPoezdFromOutside.bind(this, btn));
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

    savePoezd: function (close, nextStepFunction) {
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
                            closeBtn.fireEvent('click', closeBtn);
                        } else {
                            form.loadRecord(poezd);
                            if (newPoezd) {       // packdoc will be available after save
                                poezd.setPackDoc(Ext.create('TK.model.PackDoc', {hid: poezd.get('packDoc.hid')}));
                            }
                            if (nextStepFunction instanceof Function) {
                                nextStepFunction();
                            }
                        }
                    }
                    this.getCenter().setLoading(false);
                },
                scope: this
            });
        } else {
            Ext.Msg.alert(this.titleWarn, this.msgInvalid);
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

        store.getProxy().extraParams = {
            action: 'poezds_dir_for_poezd_bind',
            direction: direction,
            routeId: poezdModel.get('route.hid')
        };
        store.load();
    },

    onShowPoezdsImportDir: function (btn) {
        this.savePoezd(null, this.showPoezdsImportDir.bind(this));
    },

    showPoezdsImportDir: function () {
        var record = this.getPoezdform().getRecord(),
            poezdHid = record.get('hid');
        if (poezdHid == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }

        var win = Ext.widget('ky2poezdsimportdir'),
            store = win.down('grid').getStore();
        Ext.apply(store.getProxy().extraParams, {'action': 'import_poezd_list'});
        // poezdModel = poezdlist.getSelectionModel().getLastSelected();

        store.load();
        // store.load({
        //     extraParams: {
        //         action: 'import_poezd_list'/*,
        //          routeId: poezdModel.get('route.hid')*/
        //     }
        // });
    },

    showVagonsImportDir: function (btn) {
        var poezdModel = this.getPoezdform().getRecord(),
            poezdsDir = this.getPoezdsImportDir().getSelectionModel().getSelection(),
            poezdDirModel = poezdsDir.length > 0 ? poezdsDir[0] : null;
        if (poezdDirModel == null) {
            Ext.Msg.show({
                title: this.errorTitle,
                msg: this.noSelectionError,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        var win = Ext.widget('ky2vagonsimportdir'),
            grid = win.down('grid'),
            store = grid.getStore();
        store.getProxy().extraParams = {
            action: 'import_poezd_vagon_list',
            n_packet: poezdDirModel.get('n_packet'),
            n_poezd: poezdDirModel.get('n_poezd'),
            ved_nomer: poezdDirModel.get('ved_nomer')
        };
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (success) {
                    grid.getSelectionModel().selectAll(true);
                    this.vagKontRecount4PPV(grid.getSelectionModel(), true);
                }
            }
        });
        btn.up('window').close();
    },

    onSelectionchange: function(model) {
        this.vagKontRecount4PPV(model);
    },

    vagKontRecount4PPV: function(model, init) {
        var selected = model.getSelection(),
            grid = model.view.ownerCt,
            kontsSel = 0;
        Ext.Object.each(selected, function (index, vagon) {
            kontsSel += vagon.get('cnkon');
        });
        if (init)
            grid.up('window').down('#vagContAll').setText('Всего вагонов/контейнеров - ' + selected.length + '/' + kontsSel);
        grid.up('window').down('#vagContSel').setText('Выбрано - ' + selected.length + '/' + kontsSel);
    },

    importPoesd: function (btn) {
        // var poezdlist = this.getPoezdlist(),
        // poezdModel = poezdlist.getSelectionModel().getLastSelected(),
        // extraParams = poezdlist.getStore().getProxy().extraParams,
        var poezdModel = this.getPoezdform().getRecord(),
            vagonsDir = this.getVagonsImportDir().getSelectionModel().getSelection(),
            extraParams = this.getVagonsImportDir().getStore().getProxy().extraParams,
            nvags = [];
        // poezdDirModel = poezdsDir.length > 0 ? poezdsDir[0] : null;
        if (vagonsDir.length === 0) {
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано значение',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        Ext.Array.each(vagonsDir, function (vagon) {
            nvags.push(vagon.get('nvag'));
        });
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: Ext.ModelManager.getModel('TK.model.ky2.VagonImportDir').getProxy().url,
            params: {
                n_packet: extraParams['n_packet'],
                n_poezd: extraParams['n_poezd'],
                ved_nomer: extraParams['ved_nomer'],
                action: 'import_poesd',
                nvag: nvags,
                hid: poezdModel.get('hid')
                // koleya: extraParams['koleya'],
                // direction: extraParams['direction'],
                // routeId: extraParams['routeId']
            },
            scope: this,
            callback: function (options, success, response) {
                this.getCenter().setLoading(false);
                if (success) {
                    this.getVagonsImportDir().up('window').close();
                    var editVagKontGruz = this.getPoezdform().down('button[action="editVgCtGr"]');
                    editVagKontGruz.fireEvent('click', editVagKontGruz);
                    // Ext.Msg.alert(this.warningMsg, this.uploadText);
                    // this.getPoezdlist().getStore().reload();

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

    createPoezdOutFromPoezdInto: function (btn) {
        var vaglist = this.getPoezdIntoForPoezdOutList();
        var win = vaglist.up('window');
        var vagModels = vaglist.getSelectionModel().getSelection();
        if (vagModels.length > 0) {
            var vagHids = [];
            Ext.each(vagModels, function (model, index) {
                vagHids.push(model.get('hid'));
            });
            win.setLoading(true);
            Ext.Ajax.request({
                // url: poezdModel.getProxy().url,
                url: 'ky2/secure/Poezd.do',
                params: {
                    action: 'create_poezdout_from_poezdinto',
                    hids: vagHids,
                    hid: vaglist.getPoezdHid()
                },
                scope: this,
                success: function (response, options) {
                    win.setLoading(false);
                    win.close();
                    Ext.Msg.show({
                        title: '',
                        msg: 'Ok',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    var isYardTreepanel = win.getIsYardTreepanel(); // come from yard
                    if (isYardTreepanel) {
                        var respObj = Ext.decode(response.responseText);
                        this.fireEvent("onRemoveVagsFromYard", respObj['rows'][0]);
                    } else {
                        this.getPoezdlist().getStore().reload();
                    }
                    // var text = Ext.decode(response.responseText);
                },
                failure: function (response) {
                    this.getCenter().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    },

    addToPoezdOutFromZayavOut: function (btn) {
        this.addToPoezdFromZayav(this.getPoezdZayavsOutList(), 'add_to_poezdout_from_zayavout', btn.up('window').getCaller());
    },

    addToPoezdIntoFromZayavInto: function (btn) {
        var caller = btn.up('window').getCaller();
        this.addToPoezdFromZayav(this.getPoezdZayavsIntoList(), caller.isXType('form') ? 'add_to_poezdinto_from_zayavinto' : 'create_poezdinto_from_zayavinto', caller);
    },

    addToPoezdFromZayav: function (zayavlist, action, caller) {
        var win = zayavlist.up('window');
        var zayavModel = zayavlist.getSelectionModel().getLastSelected();
        if (zayavModel) {
            // var poezdModel = this.getPoezdlist().getSelectionModel().getLastSelected();
            var poezdModel = this.getPoezdform() ? this.getPoezdform().getRecord() : null;
            win.setLoading(true);
            Ext.Ajax.request({
                url: 'ky2/secure/Poezd.do',
                params: {
                    action: action,
                    zayavHid: zayavModel.get('hid'),
                    hid: poezdModel ? poezdModel.get('hid') : null,
                    koleya: caller.isXType('grid') ? caller.getStore().getProxy().extraParams['koleya'] : null
                },
                scope: this,
                success: function (response, options) {
                    win.setLoading(false);
                    win.close();
                    /*if (action.indexOf('zayavinto') !== -1) {
                        this.getPoezdlist().getStore().reload();
                        Ext.Msg.show({
                            title: '',
                            msg: 'Ok',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }*/

                    if (action.indexOf('zayavout') !== -1) {
                        this.getController('ky2.BindPoezdAndYardController').getPoesdAndYardForBind('ky2poezd2yardbindtreeformout', poezdModel.get('hid'), zayavModel.get('hid')); // go to yard
                    } else {
                        if (caller.isXType('form')) {
                            var respObj = Ext.decode(response.responseText);
                            this.getPoezdform().getForm().setValues(respObj.rows[0]);
                        } else {
                            this.getPoezdlist().getStore().reload();
                        }
                    }
                },
                failure: function (response) {
                    this.getCenter().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    },

    createPoezdOutFromPoezdsInto: function (btn) {
        var vaglist = this.getPoezdsIntoForPoezdOutList();
        var win = vaglist.up('window');
        var vagModels = vaglist.getSelectionModel().getSelection();
        if (vagModels.length > 0) {
            var vagHids = [];
            Ext.each(vagModels, function (model, index) {
                vagHids.push(model.get('hid'));
            });
            var poezdModel = this.getPoezdlist().getSelectionModel().getLastSelected();
            win.setLoading(true);
            Ext.Ajax.request({
                url: poezdModel.getProxy().url,
                params: {
                    action: 'create_poezdout_from_poezdsinto',
                    hids: vagHids,
                    hidInto: win.down('combo').getValue(),
                    hidOut: poezdModel.get('hid')
                },
                scope: this,
                success: function (response, options) {
                    win.setLoading(false);
                    this.getPoezdlist().getStore().reload();
                    vaglist.getStore().reload();
                    Ext.Msg.show({
                        title: '',
                        msg: 'Ok',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    // var text = Ext.decode(response.responseText);
                },
                failure: function (response) {
                    this.getCenter().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    },

    onGetPoezdIntoForPoezdOut: function (btn) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        this.getPoezdIntoForPoezdOut(poezdlist.getSelectionModel().getLastSelected().get('hid'));
    },

    getPoezdIntoForPoezdOut: function (hid, isYardTreepanel) {
        Ext.Msg.show({
            title: this.titleConfirmation,
            msg: this.msgTrainByDeparture,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    var win = Ext.widget('ky2poezdintoforpoezdoutdir'),
                        store = win.down('grid').getStore();

                    win.down('grid').setPoezdHid(hid);
                    if (isYardTreepanel) {
                        win.setIsYardTreepanel(true);
                    }
                    store.load({
                        params: {
                            action: 'get_poezdinto_for_poezdout',
                            hid: hid
                        }
                    });
                }
            }
        });
    },

    changePoezdIntoForPoezdOut: function (btn) {
        var win = btn.up('window'),
            store = win.down('grid').getStore(),
            poezdHid = win.down('combo').getValue();

        store.load({
            params: {
                action: 'get_poezdinto_for_poezdout',
                hid: poezdHid
            }
        });
    },

    getPoezdsIntoForPoezdOut: function (btn) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var win = Ext.widget('ky2poezdsintoforpoezdoutdir'),
            comboStore = win.down('combo').getStore(),
            gridStore = win.down('grid').getStore(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected();

        comboStore.getProxy().extraParams = {routeId: poezdModel.get('route.hid'), koleya: poezdModel.get('koleya')};
        gridStore.removeAll(true); // clear store
    },

    onShowNsiOtpr: function (btn) {
        console.log("PoezdController NsiOtpr")
        this.showNsiOtpr(this.getPoezdform().getForm());
    },

    showNsiOtpr: function (form) {
        var nsiGrid = this.getController('Nsi').nsiKyClient(form.findField('gruzotpr').getValue(), form.getRecord().get('route.hid')).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, form);
    },

    selectClient: function (view, record) {
        var data = record.data;
        this.findField('gruzotpr').setValue(data['sname']);
        var poezdModel = this.getRecord();
        poezdModel.set('client.hid', data['hid']);
        view.up('window').close();
    },

    getZajavOutForPoezdOut: function (btn) {
        var form = btn.up('form');
        // this.getZajavForPoezd('ky2poezdzayavsoutdir', 'get_zayavout_for_poezdout', form.getRecord(), form);
        this.savePoezd(null, this.getZajavForPoezd.bind(this, 'ky2poezdzayavsoutdir', 'get_zayavout_for_poezdout', form.getRecord(), form));
    },

    getZajavIntoForPoezdInto: function (btn) {
        var poezdModel;
        var list = btn.up('grid');
        if (list) {
            var extraParams = list.getStore().getProxy().extraParams;
            poezdModel = Ext.create('TK.model.ky2.PoezdInto', {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction'],
                koleya: extraParams['koleya']
            });
            this.getZajavForPoezd('ky2poezdzayavsintodir', 'get_zayavinto_for_poezdinto', poezdModel, list);
        } else {
            var form = btn.up('form');
            poezdModel = form.getRecord();
            this.savePoezd(null, this.getZajavForPoezd.bind(this, 'ky2poezdzayavsintodir', 'get_zayavinto_for_poezdinto', poezdModel, form));
        }

        // this.getZajavForPoezd('ky2poezdzayavsintodir', 'get_zayavinto_for_poezdinto', poezdModel, form);
    },

    getZajavForPoezd: function (xtype, action, poezdModel, caller) {
        /*var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }*/
        // var poezdModel = this.getPoezdform().getRecord();
        if (caller.isXType('form') && poezdModel.get('hid') == null) {
            Ext.Msg.alert('Предупреждение', 'Поезд не сохранен');
            return false;
        }

        var win = Ext.widget(xtype),
            store = win.down('grid').getStore();
        // poezdModel = poezdlist.getSelectionModel().getLastSelected();

        win.setCaller(caller);
        store.load({
            params: {
                action: action,
                direction: poezdModel.get('direction'),
                routeId: poezdModel.get('route.hid')
            }
        });
    },

    filterPoezd: function (btn) {
        var win = Ext.widget('ky2poezdzayavfilter');
        win.down('#noZayav').hide();
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },

    applyFilterPoezd: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getPoezdlist().getStore());
        }
    },

    clearFilterPoezd: function (btn) {
        btn.up('form').getForm().reset();
        this.getPoezdlist().getStore().clearFilter(true);
        this.getPoezdlist().getStore().load();
    },

    filterPPV: function (btn) {
        var win = Ext.widget('ky2poezdfilterppv');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },

    applyFilterPPV: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getPoezdsImportDir().getStore());
        }
    },

    clearFilterPPV: function (btn) {
        btn.up('form').getForm().reset();
        this.getPoezdsImportDir().getStore().clearFilter(true);
        this.getPoezdsImportDir().getStore().load();
    },

    onClickItem: function (gridview, record) {
        this.fireEvent('updateMessanger', gridview, record);
        var yardBtn = gridview.ownerCt.down('toolbar[dock="top"] button#yard');
        if (!record.get('vagCount') || record.get('vagCount') === 0) {
            yardBtn.hide();
        } else {
            yardBtn.show();
        }
    }
});
