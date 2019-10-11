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
        'ky2.BaseAvtoZayavsDir',
        'ky2.avto.into.AvtoZayavsIntoDir',
        'ky2.AbstractList',
        'ky2.AbstractForm'
    ],
    stores: [
        'ky2.AvtosBase',
        'ky2.AvtosInto',
        'ky2.AvtosOut',
        'ky2.AvtoZayavsDir'
    ],
    models: [
        'ky2.AvtoBase',
        'ky2.AvtoInto',
        'ky2.AvtoOut',
        'ky2.AvtoZayavDir',
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
            'ky2avtointolist button[action="print"] menuitem[action="pz"]': {
                click: this.createPZlst
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
                click: this.createAvtoOutFromAvtoIntoform
            },
            'ky2avtointoform button[action="importFromZayav"]': {
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
            'ky2avtointoform button[action="retNkonFind"]': {
                click: this.retNkonFind
            }



        });
    },

    copyAvtoIntoToInto: function (btn) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        Ext.Msg.show({
            title: 'Подтверждение',
            msg: 'Копировать авто?',
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

    importFromZayav: function () {
        var record = this.getAvtoform().getRecord();
         if (record.get('hid') == null) {
             Ext.Msg.alert(this.warningMsg, this.warningText);
             return false;
         }

        var win = Ext.widget('ky2avtozayavsintodir'),
            store = win.down('grid').getStore();
        // poezdModel = poezdlist.getSelectionModel().getLastSelected();

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
        var avtoModel = this.getAvtoform().getRecord(),
            avtoZayavDir = this.getZayavintodir().getSelectionModel().getLastSelected();
        if (avtoZayavDir == null) {
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
            url: 'ky2/secure/Avto.do',
            params: {
                action: 'import_from_zayav',
                hid: avtoModel.get('hid'),
                zayavHid: avtoZayavDir.get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                this.getCenter().setLoading(false);
                if (success) {
                    this.getZayavintodir().up('window').close();
                    Ext.Msg.alert(this.warningMsg, 'Данные загружены');
                    // this.getPoezdlist().getStore().reload();

                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            }
        });
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
            title: 'Подтверждение',
            msg: 'Создать авто по отправлению?',
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
                                msg: 'Авто по отправлению создано',
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


    createWZlist: function(btn) {
        this.createWZPZlist('get_wz');
    },
    createPZlst: function(btn) {
        this.createWZPZlist('get_pz');
    },
    createWZ: function(btn) {
        this.createWZPZ('get_wz');
    },
    createPZ: function(btn) {
        this.createWZPZ('get_pz');
    },
    createWZPZlist: function(action) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var hid = avtolist.getSelectionModel().getLastSelected().get('hid');
        this.openWZPZ(hid, action);
    },
    createWZPZ: function(action) {
        var record = this.getAvtoform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.openWZPZ(record.get('hid'), action);
    },
    openWZPZ: function(hid, action) {
        window.open('ky2/secure/Avto.do?hid=' + hid + '&action=' + action, '_self', '');
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

    showNsiOtpr: function(btn){
        var form = this.getAvtoform().getForm(),
            nsiGrid = this.getController('Nsi').nsiKyClient(form.findField('client').getValue(), form.getRecord().get('route.hid')).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, form);
    },

    selectClient: function(view, record) {
        var data = record.data;
        this.findField('client').setValue(data.sname);
        view.up('window').close();
    },

    retNkonFind: function(btn) {
        var form = this.getAvtoform().getForm(),
            url = 'ky2/secure/Yard.do',
            retNkon = form.findField('ret_nkon').getValue(),
            labelText;
        if (retNkon.trim() !== '') {

            Ext.Ajax.request({
                url: url,
                params: {filter: '[{"property":"nkon","value":"'+retNkon+'"}]', action: 'list', start: 0, limit: 1, page: 1},
                scope: this,
                success: function (response) {
                    var respObj = Ext.decode(response.responseText);
                    if (respObj.rows.length !== 0) {
                        labelText = 'Контейнер в секторе ' + respObj.rows[0].sector.descr;
                    }
                    else {
                        labelText = 'Контейнер не найден';
                    }
                    Ext.getCmp('kontSectorLocation').setText(labelText);
                },
                failure: function (response) {
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    }


    // showAvtosOutDir4AvtoIntoBind: function (btn) {
    //     this.showAvtosDir4AvtoBind('ky2avtosout4avtointodir', 2);
    // },
    //
    // showAvtosIntoDir4AvtoOutBind: function (btn) {
    //     this.showAvtosDir4AvtoBind('ky2avtosinto4avtooutdir', 1);
    // },
    //
    // showAvtosDir4AvtoBind: function (widget, direction) {
    //     var avtolist = this.getAvtolist();
    //     if (!TK.Utils.isRowSelected(avtolist)) {
    //         return false;
    //     }
    //
    //     var win = Ext.widget(widget),
    //         store = win.down('grid').getStore(),
    //         avtoModel = avtolist.getSelectionModel().getLastSelected();
    //
    //     store.getProxy().extraParams = {action: 'avtos_dir_for_avto_bind', direction: direction, routeId: avtoModel.get('route.hid')};
    //     store.load();
    // }

});
