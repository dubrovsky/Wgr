Ext.define('TK.controller.ky2.AvtoZayavController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
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
        'ky2.AbstractForm'
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
        this.control({
            'ky2basezayavavtolist button[action="create"]': {
                click: this.createZayavInto
            },
            // 'ky2avtozayavoutlist button[action="create"]': {
            //     click: this.createZayavOut
            // },
            'ky2basezayavavtolist button[action="edit"]': {
                click: this.editZayavInto
            },
            // 'ky2avtozayavoutlist button[action="edit"]': {
            //     click: this.editZayavOut
            // },

            'ky2basezayavavtolist': {
                itemdblclick: this.editZayavInto
            },
            // 'ky2avtozayavoutlist': {
            //     itemdblclick: this.editZayavOut
            // },
            'ky2basezayavavtolist button[action="delete"]': {
                click: this.deleteZayav
            },
            // 'ky2avtozayavoutlist button[action="delete"]': {
            //     click: this.deleteZayav
            // },
            // 'ky2avtointolist button[action="showAvtosOutDir4AvtoIntoBind"]': {
            //     click: this.showAvtosOutDir4AvtoIntoBind
            // },
            // 'ky2avtooutlist button[action="showAvtosIntoDir4AvtoOutBind"]': {
            //     click: this.showAvtosIntoDir4AvtoOutBind
            // },
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
            // 'ky2avtointoform button[action="print"] menuitem[action="wz"]': {
            //     click: this.createWZ
            // },
            // 'ky2avtooutform button[action="print"] menuitem[action="wz"]': {
            //     click: this.createWZ
            // },
            // 'ky2avtointoform button[action="print"] menuitem[action="pz"]': {
            //     click: this.createPZ
            // },
            // 'ky2avtooutlist button[action="print"] menuitem[action="wz"]': {
            //     click: this.createWZlist
            // },
            // 'ky2avtointolist button[action="print"] menuitem[action="pz"]': {
            //     click: this.createPZlst
            // },
            // 'ky2avtooutform button[action="print"] menuitem[action="pz"]': {
            //     click: this.createPZ
            // },
            // 'ky2avtointolist button[action="createAvtoOutFromInto"]': {
            //     click: this.createAvtoOutFromAvtoIntolist
            // },
            // 'ky2avtointolist button[action="copyAvtoIntoToInto"]': {
            //     click: this.copyAvtoIntoToInto
            // },
            // 'ky2avtointoform button[action="createAvtoOutFromInto"]': {
            //     click: this.createAvtoOutFromAvtoIntoform
            // },
            'ky2avtozayavintoform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            }
            // 'ky2avtooutform button[action="nsiOtpr"]': {
            //     click: this.showNsiOtpr
            // },
            // 'ky2avtointoform button[action="retNkonFind"]': {
            //     click: this.retNkonFind
            // }



        });
    },


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
                'route.hid': extraParams['routeId'],
                // direction: extraParams['direction'],
                transport: 'A'
            }),
            zayavcontainer = Ext.widget(xtype, {title: this.getFormTitle(extraParams['direction'])});

        zayavcontainer.down('form').loadRecord(zayav);
        zayavcontainer.down('form').initFieldsWithDefaultsValues();
        //  poezdcontainer.down('form').getForm().findField('dprbDate').setValue(new Date());

        this.getCenter().add(zayavcontainer);
    },

    getFormTitle: function(direction) {
        if (direction === 1)
            return 'Создание заявки на выгрузку';
        else if (direction === 2)
            return 'Создание заявки на погрузку';
        else
            return 'Создание заявки';
    },

    editZayavInto: function (btn) {
        this.editZayav('ky2avtozayavintoform', 'TK.model.ky2.AvtoZayavInto');
    },

    editZayavOut: function (btn) {
        this.editZayav('ky2avtozayavoutform', 'TK.model.ky2.AvtoZayavOut');
    },

    editZayav: function (xtype, modelClsName) {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }

        var hid = zayavlist.getSelectionModel().getLastSelected().get('hid'),
            no_zayav = zayavlist.getSelectionModel().getLastSelected().get('no_zayav');

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
    },




    // copyAvtoIntoToInto: function (btn) {
    //     var avtolist = this.getAvtolist();
    //     if (!TK.Utils.isRowSelected(avtolist)) {
    //         return false;
    //     }
    //     Ext.Msg.show({
    //         title: 'Подтверждение',
    //         msg: 'Копировать авто?',
    //         buttons: Ext.Msg.YESNO,
    //         icon: Ext.Msg.QUESTION,
    //         scope: this,
    //         fn: function (buttonId) {
    //             if (buttonId === 'yes') {
    //                 this.getCenter().setLoading(true);
    //                 Ext.Ajax.request({
    //                     url: 'ky2/secure/Avto.do',
    //                     params: {
    //                         action: 'copy_avtointo_to_avtointo',
    //                         hid: avtolist.getSelectionModel().getLastSelected().get('hid')
    //                     },
    //                     scope: this,
    //                     success: function (response, options) {
    //                         this.getCenter().setLoading(false);
    //                         Ext.Msg.show({
    //                             title: '',
    //                             msg: 'Ok',
    //                             buttons: Ext.Msg.OK,
    //                             icon: Ext.Msg.INFO
    //                         });
    //                         avtolist.getStore().reload();
    //                         // var text = Ext.decode(response.responseText);
    //                     },
    //                     failure: function (response) {
    //                         this.getCenter().setLoading(false);
    //                         TK.Utils.makeErrMsg(response, 'Error...');
    //                     }
    //                 });
    //             }
    //         }
    //     })
    // },
    //
    //
    // createAvtoOutFromAvtoIntoform: function (btn) {
    //     var record = this.getAvtoform().getRecord();
    //     if (record.get('hid') == null) {
    //         Ext.Msg.alert(this.warningMsg, this.warningText);
    //         return false;
    //     }
    //
    //     this.createAvtoOutFromAvtoInto(record.get('hid'));
    // },
    //
    // createAvtoOutFromAvtoIntolist: function (btn) {
    //     var avtolist = this.getAvtolist();
    //     if (!TK.Utils.isRowSelected(avtolist)) {
    //         return false;
    //     }
    //     this.createAvtoOutFromAvtoInto(avtolist.getSelectionModel().getLastSelected().get('hid'));
    // },
    //
    // createAvtoOutFromAvtoInto: function (hid) {
    //
    //     Ext.Msg.show({
    //         title: 'Подтверждение',
    //         msg: 'Создать авто по отправлению?',
    //         buttons: Ext.Msg.YESNO,
    //         icon: Ext.Msg.QUESTION,
    //         scope: this,
    //         fn: function (buttonId) {
    //             if (buttonId === 'yes') {
    //                 this.getCenter().setLoading(true);
    //                 Ext.Ajax.request({
    //                     url: 'ky2/secure/Avto.do',
    //                     params: {
    //                         action: 'create_avtoout_from_avtointo',
    //                         hid: hid
    //                     },
    //                     scope: this,
    //                     success: function (response, options) {
    //                         this.getCenter().setLoading(false);
    //                         Ext.Msg.show({
    //                             title: '',
    //                             msg: 'Авто по отправлению создано',
    //                             buttons: Ext.Msg.OK,
    //                             icon: Ext.Msg.INFO
    //                         });
    //                         // var text = Ext.decode(response.responseText);
    //                     },
    //                     failure: function (response) {
    //                         this.getCenter().setLoading(false);
    //                         TK.Utils.makeErrMsg(response, 'Error...');
    //                     }
    //                 });
    //             }
    //         }
    //     })
    // },
    //
    //
    // createWZlist: function(btn) {
    //     this.createWZPZlist('get_wz');
    // },
    // createPZlst: function(btn) {
    //     this.createWZPZlist('get_pz');
    // },
    // createWZ: function(btn) {
    //     this.createWZPZ('get_wz');
    // },
    // createPZ: function(btn) {
    //     this.createWZPZ('get_pz');
    // },
    // createWZPZlist: function(action) {
    //     var avtolist = this.getAvtolist();
    //     if (!TK.Utils.isRowSelected(avtolist)) {
    //         return false;
    //     }
    //     var hid = avtolist.getSelectionModel().getLastSelected().get('hid');
    //     this.openWZPZ(hid, action);
    // },
    // createWZPZ: function(action) {
    //     var record = this.getAvtoform().getRecord();
    //     if (record.get('hid') == null) {
    //         Ext.Msg.alert(this.warningMsg, this.warningText);
    //         return false;
    //     }
    //     this.openWZPZ(record.get('hid'), action);
    // },
    // openWZPZ: function(hid, action) {
    //     window.open('ky2/secure/Avto.do?hid=' + hid + '&action=' + action, '_self', '');
    // },
    //
    showNsiOtpr: function(btn){
        var form = this.getZayavform().getForm(),
            nsiGrid = this.getController('Nsi').nsiKyClient(form.findField('client').getValue(), form.getRecord().get('route.hid')).getComponent(0);
        nsiGrid.on('itemdblclick', this.getController('ky2.AvtoController').selectClient, form);
    }
    //
    // selectClient: function(view, record) {
    //     var data = record.data;
    //     this.findField('client').setValue(data.cl_name);
    //     view.up('window').close();
    // },
    //
    // retNkonFind: function(btn) {
    //     var form = this.getAvtoform().getForm(),
    //         url = 'ky2/secure/Yard.do',
    //         retNkon = form.findField('ret_nkon').getValue(),
    //         labelText;
    //     if (retNkon.trim() !== '') {
    //
    //         Ext.Ajax.request({
    //             url: url,
    //             params: {filter: '[{"property":"nkon","value":"'+retNkon+'"}]', action: 'list', start: 0, limit: 1, page: 1},
    //             scope: this,
    //             success: function (response) {
    //                 var respObj = Ext.decode(response.responseText);
    //                 if (respObj.rows.length !== 0) {
    //                     labelText = 'Контейнер в секторе ' + respObj.rows[0].sector.descr;
    //                 }
    //                 else {
    //                     labelText = 'Контейнер не найден';
    //                 }
    //                 Ext.getCmp('kontSectorLocation').setText(labelText);
    //             },
    //             failure: function (response) {
    //                 TK.Utils.makeErrMsg(response, 'Error...');
    //             }
    //         });
    //     }
    // }


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
