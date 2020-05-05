Ext.define('TK.controller.ky2.AvtoController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    requires: [
        'TK.Utils',
        'TK.model.PackDoc',
        'TK.model.Route',
        'TK.model.ky2.AvtoInto',
        'TK.view.ky2.FilesForm',
        'TK.view.ky2.avto.FilterAvto',
        'TK.view.ky2.avto.into.AvtoZayavsIntoDir'
    ],

    views: [
        'ky2.avto.into.AvtoList',
        'ky2.avto.into.AvtoForm',
        'ky2.avto.out.AvtoList',
        'ky2.avto.out.AvtoForm',
        'ky2.avto.BaseAvtoList',
        'ky2.avto.BaseAvtoForm',
        // 'ky2.poezd.into.PoezdsOutDir',
        'ky2.BaseAvtoZayavsDir',
        'ky2.avto.into.AvtoZayavsIntoDir',
        'ky2.AbstractList',
        'ky2.AbstractForm',
        'ky2.FilesForm',
        'ky2.avto.FilterAvto'

    ],
    stores: [
        'ky2.AvtosBase',
        'ky2.AvtosInto',
        'ky2.AvtosOut',
        'ky2.AvtoZayavsDir',
        'ky2.AvtoFiles'

    ],
    models: [
        'ky2.AvtoBase',
        'ky2.AvtoInto',
        'ky2.AvtoOut',
        'ky2.AvtoZayavDir',
        'ky2.AvtoFile',
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
    }, {
        ref: 'zayavintodir',
        selector: 'ky2avtozayavsintodir > ky2baseavtozayavsdir'
    }, {
        ref: 'fileslist',
        selector: 'filesform > docslist'
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
                itemdblclick: this.editAvtoInto,
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
            'ky2avtooutlist': {
                itemdblclick: this.editAvtoOut,
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
            'ky2avtointolist button[action="delete"]': {
                click: this.deleteAvto
            },
            'ky2avtooutlist button[action="delete"]': {
                click: this.deleteAvto
            },
            // 'ky2avtointolist button[action="showAvtosOutDir4AvtoIntoBind"]': {
            //     click: this.showAvtosOutDir4AvtoIntoBind
            // },
            // 'ky2avtooutlist button[action="showAvtosIntoDir4AvtoOutBind"]': {
            //     click: this.showAvtosIntoDir4AvtoOutBind
            // },
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
            },
            // 'ky2avtointoform button[action="print"] menuitem[action="wz"]': {
            //     click: this.createWZ
            // },
            'ky2avtooutform button[action="print"] menuitem[action="wz"]': {
                click: this.createWZ
            },
            'ky2avtointoform button[action="print"] menuitem[action="pz"]': {
                click: this.createPZ
            },
            'ky2avtooutlist button[action="print"] menuitem[action="wz"]': {
                click: this.createWZlist
            },
            'ky2avtooutlist button[action="print"] menuitem[action="addAct"]': {
                click: this.createAct
            },
            'ky2avtooutlist button[action="print"] menuitem[action="addInterchange"]': {
                click: this.createInterchange
            },
            'ky2avtointolist button[action="print"] menuitem[action="pz"]': {
                click: this.createPZlst
            },
            'ky2avtointolist button[action="print"] menuitem[action="addAct"]': {
                click: this.createAct
            },
            'ky2avtointolist button[action="print"] menuitem[action="addInterchange"]': {
                click: this.createInterchange
            },
            // 'ky2avtooutform button[action="print"] menuitem[action="pz"]': {
            //     click: this.createPZ
            // },
            'ky2avtointolist button[action="createAvtoOutFromInto"]': {
                click: this.createAvtoOutFromAvtoIntolist
            },
            'ky2avtointolist button[action="copyAvtoIntoToInto"]': {
                click: this.copyAvtoIntoToInto
            },
            'ky2avtointoform button[action="createAvtoOutFromInto"]': {
                click: this.saveAndCreateAvtoOutFromAvtoIntoform
            },
            'ky2avtointoform button[action="importFromZayav"]': {
                click: this.saveAndImportFromZayav4Form
            },
            'ky2avtointolist button[action="importFromZayav"]': {
                click: this.importFromZayav
            },
            'ky2avtozayavsintodir button[action="getAvtoZayavsForImport"]': {
                click: this.getAvtoZayavsForImport
            },
            'ky2avtointoform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'ky2avtooutform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            // 'ky2avtointoform button[action="retNkonFind"]': {
            //     click: this.retNkonFind
            // },
            'ky2avtointolist button[action="attach"]': {
                click: this.showAttached
            },
            'ky2avtooutlist button[action="attach"]': {
                click: this.showAttached
            },
            'filesform button[action="view"]': {
                click: this.viewWZPZ
            },
            'filesform button[action="deleteFile"]': {
                click: this.delFile
            },
            'ky2avtointoform button[action="editCtGr"]': {
                click: this.saveAndGoToCtGr
            },
            'ky2avtooutform button[action="editCtGr"]': {
                click: this.saveAndGoToCtGr
            },
            'ky2avtobindtreeform button[action=editAvto]': {
                click: this.editAvtoFromOutside
            },
            'ky2avtoctgrtreeform button[action="editAvto"]': {
                click: this.editAvtoFromOutside
            },
            'ky2avtointolist button[action="filterAvto"]': {
                click: this.filterAvto
            },
            'ky2avtooutlist button[action="filterAvto"]': {
                click: this.filterAvto
            },
            'ky2avtofilter button[action="applyFilterAvto"]': {
                click: this.applyFilterAvto
            },
            'ky2avtofilter button[action="clearFilterAvto"]': {
                click: this.clearFilterAvto
            }


        });
    },

    saveAndGoToCtGr: function (btn) {
        this.saveAvto(null, this.toCtGr.bind(this))
    },

    toCtGr: function (btn) {
        var record = this.getAvtoform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.getController('ky2.AvtoCtGrController').editCtGr('ky2ctgrtreeformavtointo', 'TK.model.ky2.AvtoCtGrTreeNode', record.get('hid'));
    },


    copyAvtoIntoToInto: function (btn) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        Ext.Msg.show({
            title: this.titleConfirm,
            msg: this.msgCopyTruck,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    this.getCenter().setLoading(true);
                    Ext.Ajax.request({
                        url: 'ky2/secure/Avto.do',
                        params: {
                            action: 'copy_avtointo_to_avtointo',
                            hid: avtolist.getSelectionModel().getLastSelected().get('hid')
                        },
                        scope: this,
                        success: function (response, options) {
                            this.getCenter().setLoading(false);
                            Ext.Msg.show({
                                title: '',
                                msg: 'Ok',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            avtolist.getStore().reload();
                            // var text = Ext.decode(response.responseText);
                        },
                        failure: function (response) {
                            this.getCenter().setLoading(false);
                            TK.Utils.makeErrMsg(response, 'Error...');
                        }
                    });
                }
            }
        })
    },

    saveAndImportFromZayav4Form: function () {
        this.saveAvto(null, this.importFromZayav4Form.bind(this))
    },

    importFromZayav4Form: function () {
        var record = this.getAvtoform().getRecord();
         if (record.get('hid') == null) {
             Ext.Msg.alert(this.warningMsg, this.warningText);
             return false;
         }
        this.importFromZayav(record);
    },

    importFromZayav: function (record) {
        if (this.getAvtolist()) {
            var extraParams = this.getAvtolist().getStore().getProxy().extraParams;
            record = Ext.create('TK.model.ky2.AvtoInto', {
                'route.hid': extraParams['routeId'],
                direction: extraParams['direction']
            });
        }

        var win = Ext.widget('ky2avtozayavsintodir'),
            store = win.down('grid').getStore();

        store.load({
            params: {
                action: 'import_zayav_into_list',
                direction: record.get('direction'),
                routeId: record.get('route.hid')
            }
        });
    },

    getAvtoZayavsForImport: function () {
        // var poezdlist = this.getPoezdlist(),
        // poezdModel = poezdlist.getSelectionModel().getLastSelected(),
        // extraParams = poezdlist.getStore().getProxy().extraParams,
        var form = this.getAvtoform(),
            avtoZayavDir = this.getZayavintodir().getSelectionModel().getLastSelected();
        if (avtoZayavDir == null) {
            Ext.Msg.show({
                title: this.titeltError,
                msg: this.msgNothingSel,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'ky2/secure/Avto.do',
            params: {
                action: 'import_from_zayav',
                hid: form ? form.getRecord().get('hid') : 0,
                zayavHid: avtoZayavDir.get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                this.getCenter().setLoading(false);
                this.getZayavintodir().up('window').close();
                if (success) {
                    Ext.Msg.alert(this.warningMsg, this.msgDataLoaded);
                    if (form) {
                        var respObj = Ext.decode(response.responseText);
                        this.getAvtoform().getForm().setValues(respObj.rows[0]);
                    }
                    else
                        this.getAvtolist().getStore().reload();


                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            }
        });
    },

    showAttached: function () {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var hid = avtolist.getSelectionModel().getLastSelected().get('hid'),
            win = Ext.widget('filesform'),
            initData = {};
        win.down('#avtofile').hide();
        initData['store'] = 'TK.store.ky2.AvtoFiles';
        initData['hid'] = hid;
        initData['action'] = 'list';
        win.initServiceFields(initData);
    },

    saveAndCreateAvtoOutFromAvtoIntoform: function (btn) {
        this.saveAvto(null, this.createAvtoOutFromAvtoIntoform.bind(this));
    },

    createAvtoOutFromAvtoIntoform: function (btn) {
        var record = this.getAvtoform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }

        this.createAvtoOutFromAvtoInto(record.get('hid'));
    },

    createAvtoOutFromAvtoIntolist: function (btn) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        this.createAvtoOutFromAvtoInto(avtolist.getSelectionModel().getLastSelected().get('hid'));
    },

    createAvtoOutFromAvtoInto: function (hid) {

        Ext.Msg.show({
            title: this.lblConfirmation,
            msg: this.msgCreateCarByDeparture,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    this.getCenter().setLoading(true);
                    Ext.Ajax.request({
                        url: 'ky2/secure/Avto.do',
                        params: {
                            action: 'create_avtoout_from_avtointo',
                            hid: hid
                        },
                        scope: this,
                        success: function (response, options) {
                            this.getCenter().setLoading(false);
                            Ext.Msg.show({
                                title: '',
                                msg: this.msgCarByDepartureConfirm,
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
            }
        })
    },

    createAct: function(btn) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var konts = avtolist.getSelectionModel().getLastSelected().get('konts');
        if (konts.length === 1) {
            this.getController('ky2.AvtoCtGrController').createAct(konts[0].hid);
        }
    },

    createInterchange: function(btn) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var konts = avtolist.getSelectionModel().getLastSelected().get('konts');
        if (konts.length === 1) {
            this.getController('ky2.AvtoCtGrController').createInterchange(konts[0].hid);
        }
    },

    createWZlist: function(btn) {
        this.createWZPZlist('get_wz');
    },

    createPZlst: function(btn) {
        this.createWZPZlist('get_pz');
    },

    createWZ: function(btn) {
        this.saveAndCreateWZPZ('get_wz');
    },

    createPZ: function(btn) {
        this.saveAndCreateWZPZ('get_pz');
    },

    createWZPZlist: function(action) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        // else if (avtolist.getSelectionModel().getLastSelected().get('konts').length === 0) {
        //     Ext.Msg.alert(this.warningMsg, 'На авто отсутствует контейнер');
        //     return false;
        // }
        var hid = avtolist.getSelectionModel().getLastSelected().get('hid');
        this.openWZPZ(hid, action);
    },

    saveAndCreateWZPZ: function(action) {
        this.saveAvto(null, this.createWZPZ.bind(this, action));
    },

    createWZPZ: function(action) {
        var record = this.getAvtoform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        // else if (record.get('konts').length === 0) {
        //     Ext.Msg.alert(this.warningMsg, 'На авто отсутствует контейнер');
        //     return false;
        // }
        this.openWZPZ(record.get('hid'), action);
        this.getAvtolist().getStore().reload();
    },

    openWZPZ: function(hid, action) {
        window.open('ky2/secure/Avto.do?hid=' + hid + '&action=' + action, '_blank', '');
    },

    viewWZPZ: function() {
        var fileslist = this.getFileslist();
        if (!TK.Utils.isRowSelected(fileslist)) {
            return false;
        }
        window.open('ky2/secure/AvtoFiles.do?hid=' + fileslist.getSelectionModel().getLastSelected().get('hid') + '&action=view', '_blank', '');
    },

    delFile: function() {
        var fileslist = this.getFileslist();
        if (!TK.Utils.isRowSelected(fileslist)) {
            return false;
        }
        Ext.Msg.show({title: 'Подтверждение', msg: 'Удалить файл?', buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes') {
                    Ext.Ajax.request({
                        url: 'ky2/secure/AvtoFiles.do',
                        params: {action: 'delete', hid: fileslist.getSelectionModel().getLastSelected().get('hid')},
                        scope: fileslist,
                        success: function(response, options) {
                            this.store.reload();
                        },
                        failure: function(response){
                            TK.Utils.makeErrMsg(response, me.errorMsg);
                        }
                    });
                }
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

    editAvtoFromOutside: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.editAvto('ky2avtointoform', 'TK.model.ky2.AvtoInto', rootNode.get('hid'));
        else
            this.editAvto('ky2avtooutform', 'TK.model.ky2.AvtoOut', rootNode.get('hid'));
    },

    editAvtoInto: function (btn) {
        this.editAvtoCheck('ky2avtointoform', 'TK.model.ky2.AvtoInto');
    },

    editAvtoOut: function (btn) {
        this.editAvtoCheck('ky2avtooutform', 'TK.model.ky2.AvtoOut');
    },

    editAvtoCheck: function (widget, modelClsName) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        this.editAvto(widget, modelClsName, avtolist.getSelectionModel().getLastSelected().get('hid'));
    },

    editAvto: function (xtype, modelClsName, hid) {
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
                    delete avto.data.konts;
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

    saveAvto: function (close, nextStepFunction) {
        var form = this.getAvtoform();
        if (form.isValid()) {
            var avto = form.getRecord(),
                newAvto = (avto.getId() == null),
                values = form.getValues();

            this.getCenter().setLoading(true);
            avto.set(values);
            delete avto.data.konts;
            // avto.set('konts', []);

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
        console.log("AvtoController showNsiOtpr");
        var form = this.getAvtoform().getForm(),
            nsiGrid = this.getController('Nsi').nsiKyClient('', form.getRecord().get('route.hid')).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, form);
    },

    selectClient: function(view, record) {
        var data = record.data;
        this.findField('client.sname').setValue(data['sname']);
        var avtoModel = this.getRecord();
        avtoModel.set('client.hid', data['hid']);
        view.up('window').close();
    },


    filterAvto: function (btn) {
        var win = Ext.widget('ky2avtofilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },

    applyFilterAvto: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getAvtolist().getStore());
        }
    },

    clearFilterAvto: function (btn) {
        btn.up('form').getForm().reset();
        this.getAvtolist().getStore().clearFilter(true);
        this.getAvtolist().getStore().load();
    }
});
