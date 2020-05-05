Ext.define('TK.controller.ky2.PoezdZayavController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    requires: [
        'TK.Utils',
        'TK.model.PackDoc',
        'TK.model.Route',
        'TK.view.ky2.poezd.zayav.Filter'
    ],

    views: [
        'ky2.poezd.into.PoezdZayavList',
        'ky2.poezd.into.PoezdZayavForm',
        'ky2.poezd.out.PoezdZayavList',
        'ky2.poezd.out.PoezdZayavForm',
        'ky2.poezd.BasePoezdZayavList',
        'ky2.poezd.BasePoezdZayavForm',
        'ky2.poezd.zayav.PoezdZayavList',
        'ky2.poezd.zayav.PoezdZayavForm',
        'ky2.poezd.zayav.Filter',
        'ky2.AbstractList',
        'ky2.AbstractForm'
    ],
    stores: [
        'ky2.PoezdZayavsBase',
        'ky2.PoezdZayavsInto',
        'ky2.PoezdZayavs',
        'ky2.PoezdZayavsOut'
        // 'ky2.PoezdsDir'
    ],
    models: [
        'ky2.PoezdZayavBase',
        'ky2.PoezdZayavInto',
        'ky2.PoezdZayavOut',
        'ky2.PoezdZayav',
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
            'ky2poezdzayavlist button[action="create"]': {
                click: this.onCreateZayav
            },
            'ky2poezdzayavintolist button[action="create"]': {
                click: this.createZayavInto
            },
            'ky2poezdzayavoutlist button[action="create"]': {
                click: this.createZayavOut
            },
            'ky2poezdzayavlist button[action="edit"]': {
                click: this.onEditZayav
            },
            'ky2poezdzayavintolist button[action="edit"]': {
                click: this.editZayavInto
            },
            'ky2poezdzayavoutlist button[action="edit"]': {
                click: this.editZayavOut
            },
            'ky2poezdzayavvgctgrtreeformpoezd button[action=editZajav]': {
                click: this.editZayavFromOutside
            },
            'ky2poezdzayavvgctgrtreeformpoezdinto button[action=editZajav]': {
                click: this.editZayavIntoFromOutside
            },
            'ky2poezdzayavvgctgrtreeformpoezdout button[action=editZajav]': {
                click: this.editZayavOutFromOutside
            },
            'ky2poezdzayavlist': {
                itemdblclick: this.onEditZayav,
                /*itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                },*/
                cellclick: function (view, td, cellIndex, record) {
                    var dataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
                    if (dataIndex === 'messCount') {
                        this.fireEvent('showOrUpdateMessanger', view, record);
                    }
                }
            },
            'ky2poezdzayavintolist': {
                itemdblclick: this.editZayavInto,
                /*itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                },*/
                cellclick: function (view, td, cellIndex, record) {
                    var dataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
                    if (dataIndex === 'messCount') {
                        this.fireEvent('showOrUpdateMessanger', view, record);
                    }
                }
            },
            'ky2poezdzayavoutlist': {
                itemdblclick: this.editZayavOut,
                /*itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                },*/
                cellclick: function (view, td, cellIndex, record) {
                    var dataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
                    if (dataIndex === 'messCount') {
                        this.fireEvent('showOrUpdateMessanger', view, record);
                    }
                }
            },
            'ky2poezdzayavlist button[action="delete"]': {
                click: this.onDeleteZayav
            },
            'ky2poezdzayavintolist button[action="delete"]': {
                click: this.deleteZayav
            },
            'ky2poezdzayavoutlist button[action="delete"]': {
                click: this.deleteZayav
            },
            'ky2poezdzayavform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdzayavintoform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdzayavoutform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2poezdzayavform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2poezdzayavintoform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2poezdzayavoutform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2basepoezdzayavform button[action="upload"]': {
                click: this.onUploadZayav
            },
            'ky2poezdzayavform button[action="nsiOtpr"]': {
                click: this.onShowNsiOtpr
            },
            'ky2poezdzayavlist button[action="filterPoezdZayav"]': {
                click: this.filterZayav
            },
            'ky2poezdzayavfilter button[action="applyFilter"]': {
                click: this.applyFilterZayav
            }
        });
    },


    onCreateZayav: function (btn) {
        this.createZayav('ky2poezdzayavform', 'TK.model.ky2.PoezdZayav');
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
            zayavcontainer = Ext.widget(xtype, {title: this.titleCreate});

        zayavcontainer.down('form').loadRecord(zayav);
        zayavcontainer.down('form').initFieldsWithDefaultsValues();
        this.getController('ky2.AvtoZayavController').getClientForCreate(zayavcontainer.down('form'), zayav, extraParams['routeId']);

        //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(zayavcontainer);
    },

    getFormTitle: function (direction) {
        if (direction === 1)
            return this.titleCreateOrderImport;
        else if (direction === 2)
            return this.titleCreateOrderExport;
        else
            return '';
    },

    editZayavFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        this.editZayav('ky2poezdzayavform', 'TK.model.ky2.PoezdZayav', rootNode.get('hid'));
    },

    editZayavIntoFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        this.editZayav('ky2poezdzayavintoform', 'TK.model.ky2.PoezdZayavInto', rootNode.get('hid'));
    },

    editZayavOutFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        this.editZayav('ky2poezdzayavoutform', 'TK.model.ky2.PoezdZayavOut', rootNode.get('hid'));
    },

    onEditZayav: function (btn) {
        this.checkEditZayav('ky2poezdzayavform', 'TK.model.ky2.PoezdZayav');
    },

    editZayavInto: function (btn) {
        this.checkEditZayav('ky2poezdzayavintoform', 'TK.model.ky2.PoezdZayavInto');
    },

    editZayavOut: function (btn) {
        this.checkEditZayav('ky2poezdzayavoutform', 'TK.model.ky2.PoezdZayavOut');
    },

    checkEditZayav: function (xtype, modelClsName) {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }

        var hid = zayavlist.getSelectionModel().getLastSelected().get('hid');
        this.editZayav(xtype, modelClsName, hid);
    },

    editZayav: function (xtype, modelClsName, hid) {
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var zayavcontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit}));

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

    onDeleteZayav: function (btn) {
        this.deleteZayav(btn);
    },

    deleteZayav: function (btn) {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delOrderMsg, buttons: Ext.Msg.YESNO,
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

    saveZayav: function (close, nextStepFunction) {
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
                            closeBtn.fireEvent('click', closeBtn);
                        } else {
                            form.loadRecord(zayav);
                            if (newZayav) {       // packdoc will be available after save
                                zayav.setPackDoc(Ext.create('TK.model.PackDoc', {hid: zayav.get('packDoc.hid')}));
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
            Ext.Msg.alert(this.warningMsg, this.formInvalid);
        }
    },

    onUploadZayav: function (btn) {
        this.saveZayav(null, this.uploadZayav.bind(this));
    },

    uploadZayav: function () {
        var record = this.getZayavform().getRecord(),
            zayavHid = record.get('hid');
        if (zayavHid == null) {
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
                    {xtype: 'hidden', name: 'hid', value: zayavHid}
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
                                url: 'ky2/secure/PoezdZayav.do',
                                params: {action: 'upload'},
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

    onShowNsiOtpr: function (btn) {
        this.getController('ky2.PoezdController').showNsiOtpr(this.getZayavform().getForm());
    },

    filterZayav: function (btn) {
        var win = Ext.widget('ky2poezdzayavfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    applyFilterZayav: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getZayavlist().getStore());
        }
    }

});
