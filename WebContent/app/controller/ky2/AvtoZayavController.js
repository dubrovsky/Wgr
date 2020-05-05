Ext.define('TK.controller.ky2.AvtoZayavController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    requires: [
        'TK.Utils',
        'TK.model.PackDoc',
        'TK.model.Route',
        'TK.view.ky2.FilesForm',
        'TK.view.ky2.avto.FilterAvto'
    ],

    views: [
        'ky2.avto.into.AvtoZayavList',
        'ky2.avto.into.AvtoZayavForm',
        'ky2.avto.out.AvtoZayavList',
        'ky2.avto.out.AvtoZayavForm',
        'ky2.avto.BaseAvtoZayavList',
        'ky2.avto.BaseAvtoZayavForm',
        // 'ky2.poezd.into.PoezdsOutDir',
        // 'ky2.BasePoezdsDir',
        'ky2.AbstractList',
        'ky2.AbstractForm',
        'ky2.avto.FilterAvto'

    ],
    stores: [
        'ky2.AvtoZayavsBase',
        'ky2.AvtoZayavsInto',
        'ky2.AvtoZayavsOut'
        // 'ky2.AvtosDir'
    ],
    models: [
        'ky2.AvtoZayavBase',
        'ky2.AvtoZayavInto',
        'ky2.AvtoZayavOut',
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
        selector: 'viewport > tabpanel ky2abstractform#ky2avtozayavform'
    }],

    init: function () {
        // this.listen({
        //     store: {
        //         '#ky2.AvtoZayavsBase': {
        //             load: this.onStoreLoad
        //         }
        //     }
        // });
        this.control({
            'ky2basezayavavtolist button[action="create"]': {
                click: this.createZayavInto
            },
            'ky2basezayavavtolist button[action="edit"]': {
                click: this.editZayavInto
            },
            'ky2basezayavavtolist': {
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
            'ky2basezayavavtolist button[action="delete"]': {
                click: this.deleteZayav
            },
            'ky2avtozayavintoform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2avtozayavoutform button[action="saveExit"]': {
                click: this.saveExit
            },
            'ky2avtozayavintoform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2avtozayavoutform button[action="save"]': {
                click: this.saveZayav
            },
            'ky2avtozayavintoform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'ky2basezayavavtolist button[action="attach"]': {
                click: this.showAttached
            },
            'filesform button[action="saveFile"]': {
                click: this.onSaveFile
            },
            'ky2avtozayavintoform button[action="editCtGr"]': {
                click: this.saveAndGoToCtGr
            },
            'ky2avtozayavoutform button[action="editCtGr"]': {
                click: this.saveAndGoToCtGr
            },
            'ky2basezayavavtolist button[action="filterAvtoZayav"]': {
                click: this.filterAvto
            }
            // 'ky2avtofilter button[action="applyFilterAvto"]': {
            //     click: this.applyFilterAvto
            // },
            // 'ky2avtofilter button[action="clearFilterAvto"]': {
            //     click: this.clearFilterAvto
            // }

        });
    },

    // onStoreLoad: function (store, records) {
    //     for (var i=0; i<records.length; i++)
    //         for (var j=i+1; j<records.length; j++) {
    //             var konts1 = records[i].get('konts');
    //             var konts2 = records[j].get('konts');
    //             for (var p=0; p<konts1.length; p++)
    //                 for (var q=0; q<konts2.length; q++) {
    //                     if (konts1[p]['nkon'] === konts2[p]['nkon']) {
    //                         debugger
    //
    //                         this.setRowBackground(this.getZayavlist().getView(), records[i]);
    //                         this.setRowBackground(this.getZayavlist().getView(), records[j]);
    //                     }
    //                 }
    //         }
    // },
    //
    // setRowBackground: function(view, record) {
    //     var element = Ext.get(view.getRow(record));
    //     element.setStyle('repeatNkon');
    // },

    createZayavInto: function (btn) {
        this.createZayav('ky2avtozayavintoform', 'TK.model.ky2.AvtoZayavInto');
    },
    createZayavOut: function (btn) {
        this.createZayav('ky2avtozayavoutform', 'TK.model.ky2.AvtoZayavOut');
    },
    createZayav: function (xtype, modelClsName) {
        var zayavlist = this.getCenter().remove(this.getCenter().getComponent(0), true),
            extraParams = zayavlist.getStore().getProxy().extraParams,
            zayav = Ext.create(modelClsName, {
                'route.hid': extraParams['routeId']
                // direction: extraParams['direction'],
                // transport: 'A'
            }),
            zayavcontainer = Ext.widget(xtype, {title: this.getFormTitle(extraParams['direction'])});

        zayavcontainer.down('form').loadRecord(zayav);
        zayavcontainer.down('form').initFieldsWithDefaultsValues();
        this.getClientForCreate(zayavcontainer.down('form'), zayav, extraParams['routeId']);

        this.getCenter().add(zayavcontainer);
    },

    getClientForCreate: function(form, zayav, routeId) {
        console.log('getClientForCreate');
        Ext.Ajax.request({
            url: 'Client_list.do',
            params: {routeId: routeId, start: 0, limit: 2, page: 1},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                if (respObj.rows.length === 1) {
                    var data = respObj.rows[0];
                    form.down('#gruzotpr').setValue(data['sname']);
                    zayav.set('client.hid', data['hid']);
                }
            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });

    },

    getFormTitle: function(direction) {
        if (direction === 1)
            return this.titleCreateOrderforUnload;
        else if (direction === 2)
            return this.titleCreateOrderforLoad;
        else
            return this.titleCreateOrder;
    },

    editZayavInto: function (btn) {
        this.editAvtoZayavCheck('ky2avtozayavintoform', 'TK.model.ky2.AvtoZayavInto');
    },

    editZayavOut: function (btn) {
        this.editAvtoZayavCheck('ky2avtozayavoutform', 'TK.model.ky2.AvtoZayavOut');
    },

    editAvtoZayavCheck: function (widget, modelClsName) {
        var avtozayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(avtozayavlist)) {
            return false;
        }
        this.editZayav(widget, modelClsName, avtozayavlist.getSelectionModel().getLastSelected().get('hid'), avtozayavlist.getSelectionModel().getLastSelected().get('no_zayav'));
    },

    editZayav: function (xtype, modelClsName, hid, no_zayav) {
        // var zayavlist = this.getZayavlist();
        // if (!TK.Utils.isRowSelected(zayavlist)) {
        //     return false;
        // }
        //
        // var hid = zayavlist.getSelectionModel().getLastSelected().get('hid'),
        //     no_zayav = zayavlist.getSelectionModel().getLastSelected().get('no_zayav');

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        var zayavcontainer = this.getCenter().add(Ext.widget(xtype, {title: this.titleEdit + no_zayav}));

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
            title: this.delTitle, msg: this.msgDelOrder, buttons: Ext.Msg.YESNO,
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
            delete zayav.data.konts;

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
                            if (nextStepFunction instanceof Function)
                                nextStepFunction();
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

    showNsiOtpr: function(btn){
        console.log("showNsiOtpr");
        var form = this.getZayavform().getForm(),
            nsiGrid = this.getController('Nsi').nsiKyClient('', form.getRecord().get('route.hid')).getComponent(0);
        nsiGrid.on('itemdblclick', this.getController('ky2.AvtoController').selectClient, form);
    },

    showAttached: function () {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }
        var hid = zayavlist.getSelectionModel().getLastSelected().get('hid'),
            win = Ext.widget('filesform'),
            initData = {};
        initData['store'] = 'TK.store.ky2.AvtoFiles';
        initData['hid'] = hid;
        initData['action'] = 'zayavlist';
        win.initServiceFields(initData);
    },

    onSaveFile: function(btn) {
        var panel = btn.up('form');  // files
        if (panel.getForm().isValid()) {
            panel.getForm().submit({
                waitMsg: this.waitMsg1,
                url: 'ky2/secure/AvtoFiles.do',
                params: {action: 'save'},
                scope: this,
                success: function (form, action) {
                    panel.ownerCt.getComponent('avtofilesList').store.load();
                },
                failure: panel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },

    saveAndGoToCtGr: function (btn) {
        this.saveZayav(null, this.toCtGr.bind(this))
    },

    toCtGr: function (btn) {
        var record = this.getZayavform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.getController('ky2.AvtoZayavCtGrController').editCtGr('ky2ctgrtreeformavtozayavinto', 'TK.model.ky2.AvtoCtGrTreeNode', record.get('hid'));
    },

    filterAvto: function (btn) {
        var win = Ext.widget('ky2avtofilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    }

});
