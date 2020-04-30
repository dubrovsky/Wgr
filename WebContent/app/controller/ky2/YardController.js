Ext.define('TK.controller.ky2.YardController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],

    requires: [
        'TK.Utils',
        'TK.model.ky2.YardBase',
        'TK.model.ky2.YardSector',
        'TK.view.ky2.yard.Filter',
        'TK.view.ky2.yard.ChangeClient',
        'TK.view.ky2.yard.YardSectorList',
        'TK.view.user.ListGroups'
    ],


    views: [
        'ky2.yard.YardList',
        'ky2.yard.YardForm',
        'ky2.yard.Filter',
        'ky2.yard.YardSectorList',
        'ky2.yard.YardSectorForm',
        'ky2.AbstractList'
    ],
    stores: [
        'ky2.Yards',
        'ky2.YardSectors',
        'ky2.YardFilterPoezdsDir',
        'ky2.YardFilterGruzotprsDir'
    ],
    models: [
        'ky2.YardBase',
        'ky2.YardSector',
        'ky2.YardFilterDir'
    ],
    refs: [{
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'yardlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'yardform',
        selector: 'ky2yardform > form'
    }, {
        ref: 'yardsectorform',
        selector: 'ky2yardsectorform > form'
    }, {
        ref: 'yardsectorlist',
        selector: 'ky2yardsectorlist > grid'
    }],

    init: function () {
        this.control({
            'ky2yardlist button[action="yard"] menuitem[action=create]': {
                click: this.createYard
            },
            'ky2yardsectorlist button[action="create"]': {
                click: this.createYardSector
            },
            // 'ky2yardlist button[action="yard"] menuitem[action=edit]': {
            //     click: this.editYard
            // },
            'ky2yardsectorlist button[action="edit"]': {
                click: this.editYardSector
            },
            'ky2yardlist': {
                itemdblclick: function() {
                    this.getController('ky2.YardCtGrController').editKont();
                },
                itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                }
                /*,
                select: this.selectYardInList*/
            },
            'ky2yardlist button[action="delete"]': {
                click: this.deleteYard
            },
            'ky2yardsectorlist button[action="delete"]': {
                click: this.deleteYardSector
            },
            'ky2yardlist button[action="filterKontYard"]': {
                click: this.filterKontYard
            },
            'ky2yardlist button[action="clearFilter"]': {
                click: this.clearFilter
            },
            /*'ky2yardfilter datefield[name="startDate"]': {
                select: this.selectFilterStartDate
            },
            'ky2yardfilter datefield[name="endDate"]': {
                select: this.selectFilterEndDate
            },*/
            'ky2yardfilter button[action="applyFilterKontYard"]': {
                click: this.applyFilterKontYard
            },
            'ky2yardform button[action="save"]': {
                click: this.saveYard
            },
            'ky2yardsectorform button[action="save"]': {
                click: this.saveYardSector
            },
            'ky2yardlist button[action="getYardSectors"]': {
                click: this.getYardSectors
            },
            'ky2yardsectorform button[action=getUserGroups]': {
                click: this.getUserGroups
            },
            'ky2yardlist button[action="xls"] menuitem[action=xlsfilter]': {
                click: this.onUploadXLS
            },
            'ky2yardlist button[action="xls"] menuitem[action=xlsexport]': {
                click: this.onExportXLS
            },
            'ky2yardlist button[action="xls"] menuitem[action=xlsstan]': {
                click: this.onExportXLS
            },
            'ky2yardlist button[action="xls"] menuitem[action=xlsupdate]': {
                click: this.onUpdateXLS
            },
            'ky2yardchangeclient button[action="changeClient"]': {
                click: this.changeClient
            },
            'ky2yardlist button[action="changeClient"]': {
                click: this.onChangeClient
            },
            'ky2yardchangeclient button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            }


            /*,
            'ky2yardsectorlist > grid': {
                // itemdblclick: this.selectYardSector,
                deleteYardSector: this.deleteYardSector,
                saveYardSector: this.saveYardSector
            }*/
        });
    },

    showNsiOtpr: function (btn) {
        var panel = btn.up(),
            nsiGrid = this.getController('Nsi').nsiKyClient(panel.down('#gruzotpr').getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, panel);
    },

    selectClient: function (view, record) {
        var data = record.data;
        this.down('#clientHid').setValue(data['hid']);
        this.down('#gruzotpr').setValue(data['sname']);
        view.up('window').close();
    },



    onUpdateXLS: function () {
        var win = Ext.create('Ext.window.Window', {
            title: 'Загрузка XLS',
            width: 600, y: 100, modal: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                autoHeight: true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {
                        xtype: 'filefield',
                        emptyText: 'Выбор файла для загрузки...',
                        fieldLabel: 'Файл',
                        name: 'upload',
                        buttonText: 'Обзор...',
                        anchor: '100%'
                    }
                ],
                buttons: [{
                    text: 'Загрузить',
                    handler: function (btn) {
                        var form = btn.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'ky2/secure/Yard.do',
                                params: {action: 'update', routeId: this.getYardlist().getStore().getProxy().extraParams.routeId},
                                waitMsg: 'Загрузка',
                                scope: this,
                                success: function (form, action) {
                                    Ext.Msg.alert('Внимание', 'Данные обновлены');
                                    this.getYardlist().getStore().reload();

                                    win.close();
                                }
                                , failure: function (form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope: this
                }, {
                    text: 'Закрыть',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
            }
        }).show();
    },

    onExportXLS: function (btn) {
        var store = this.getYardlist().getStore(),
            proxy = store.getProxy(),
            params = Ext.clone(proxy.extraParams),
            url = proxy.url,
            filters = [];
        params.action = btn.action;
        if(store.filters && store.filters.getCount() > 0) {
            store.filters.each(function (filter) {
                filters.push({property: filter.property, value: filter.value});
            });
            params.filter = Ext.encode(filters);
        }

        window.open(url + '?' + Ext.Object.toQueryString (params), '_blank', '');
    },

    onUploadXLS: function () {
        var win = Ext.create('Ext.window.Window', {
            title: 'Загрузка XLS',
            width: 600, y: 100, modal: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                autoHeight: true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {
                        xtype: 'filefield',
                        emptyText: 'Выбор файла для загрузки...',
                        fieldLabel: 'Файл',
                        name: 'upload',
                        buttonText: 'Обзор...',
                        anchor: '100%'
                    }
                ],
                buttons: [{
                    text: 'Загрузить',
                    handler: function (btn) {
                        var form = btn.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'ky2/secure/Yard.do',
                                params: {action: 'upload'},
                                waitMsg: 'Загрузка',
                                scope: this,
                                success: function (form, action) {
                                    var nkons = Ext.JSON.decode(action.response.responseText).rows[0];
                                    this.getYardlist().getStore().getProxy().extraParams.nkons = nkons;
                                    this.getYardlist().getStore().load({
                                        callback: function (records, operation, success) {
                                            var nkonsReturn = [],
                                                notFoundCounter = 0,
                                                notFoundString = '',
                                                invalidLastDigit = '';
                                            Ext.Object.each(records, function (idx, sector) {
                                                Ext.each(sector.get('konts'), function (kont) {
                                                    nkonsReturn.push(kont['nkon']);
                                                });
                                            });
                                            Ext.each(nkons, function (nkon) {
                                                if (!nkonsReturn.includes(nkon)) {
                                                    notFoundCounter ++;
                                                    notFoundString += nkon + ' ';
                                                    var valid = TK.Validators.kontNumLastDigit(nkon);
                                                    if (Ext.isString(valid) || !valid)
                                                        invalidLastDigit += nkon + ' ';
                                                }
                                            }, this);
                                            Ext.Msg.show({
                                                width: 500,
                                                title: 'Внимание',
                                                msg: 'Не найдено: ' + notFoundCounter + '<br> ' + notFoundString + '<br>' + (invalidLastDigit.length !== 0 ? 'Неверный контрольный знак:<br>' + invalidLastDigit : ''),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.WARNING
                                            });
                                        },
                                        scope: this
                                    });
                                    // this.applyFilter(nkons);
                                    win.close();
                                }
                                , failure: function (form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope: this
                }, {
                    text: 'Закрыть',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
            }
        }).show();
    },

    createYard: function (btn) {
        var yardcontainer = Ext.widget('ky2yardform', {title: this.titleCreate});
        yardcontainer.down('form').loadRecord(Ext.create('TK.model.ky2.YardBase'));
    },

    createYardSector: function (btn) {
        var yardcontainer = Ext.widget('ky2yardsectorform', {title: this.titleCreateSector});
        yardcontainer.down('form').loadRecord(Ext.create('TK.model.ky2.YardSector'));
    },

    onChangeClient: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isRowSelected(yardlist)) {
            return false;
        }
        var win = Ext.widget('ky2yardchangeclient');
        Ext.each(yardlist.selModel.getSelection(), function (yard) {
                win.down('form').add({xtype: 'numberfield', hidden:'true', name: 'hid', value: yard.get('konts')[0]['hid']});
            }
        );
    },

    editYard: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isOneRowSelected(yardlist)) {
            return false;
        }

        var yardcontainer = Ext.widget('ky2yardform', {title: this.titleEdit});
        yardcontainer.setLoading(true);

        var yard = Ext.ModelManager.getModel('TK.model.ky2.YardBase'),
            hid = yardlist.selModel.getLastSelected().get('hid');

        yard.load(hid, {
            scope: this,
            params: {action: 'edit'},
            callback: function (yard, operation, success) {
                if (success) {
                    var form = yardcontainer.down('form');
                    this.checkForKontyardSector(yard.getSector(), form.getForm());
                    form.loadRecord(yard);
                }
                yardcontainer.setLoading(false);
            }
        });
    },
    editYardSector: function (btn) {
        var yardsectorlist = this.getYardsectorlist();
        if (!TK.Utils.isRowSelected(yardsectorlist)) {
            return false;
        }

        var yardsectorcontainer = Ext.widget('ky2yardsectorform', {title: this.titleEditSector});
        yardsectorcontainer.setLoading(true);

        var yardsector = Ext.ModelManager.getModel('TK.model.ky2.YardSector'),
            hid = yardsectorlist.selModel.getLastSelected().get('hid');

        yardsector.load(hid, {
            scope: this,
            params: {action: 'edit'},
            callback: function (yardsector, operation, success) {
                if (success) {
                    var form = yardsectorcontainer.down('form');
                    // this.checkForKontyardSector(yard.getSector(), form.getForm());
                    form.loadRecord(yardsector);
                    if (yardsector.get('groups')) {
                        form.getForm().setValues({"usr.groupsIds": yardsector.get('groups').replace(/,/g, '\n').replace(/ /g, '')});
                    }
                }
                yardsectorcontainer.setLoading(false);
            }
        });
    },

    checkForKontyardSector: function (sector, form) {
        if (sector) {
            var store = form.findField('sector.hid').getStore();
            store.removeAll();
            store.add(sector);
            form.findField('sector.hid').setValue(sector.get('hid'));
        }
    },
    deleteYard: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isRowSelected(yardlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    yardlist.setLoading(true);
                    var yard = yardlist.getSelectionModel().getLastSelected();
                    yard.destroy({
                        params: {action: 'delete'/*, hid: kontyard.get('hid')*/},
                        callback: function (yard, operation) {
                            yardlist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                yardlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    deleteYardSector: function (btn) {
        var yardsectorlist = this.getYardsectorlist();
        if (!TK.Utils.isRowSelected(yardsectorlist)) {
            return false;
        }

        Ext.Msg.show({
            title: this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    yardsectorlist.setLoading(true);
                    var yardsector = yardsectorlist.getSelectionModel().getLastSelected();
                    yardsector.destroy({
                        params: {action: 'delete'/*, hid: kontyard.get('hid')*/},
                        callback: function (yard, operation) {
                            yardsectorlist.setLoading(false);
                            if (operation['complete'] && !operation['exception']) {
                                yardsectorlist.getStore().reload();
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    saveYard: function (btn) {
        var form = this.getYardform().getForm();
        if (form.isValid()) {
            var win = btn.up('window'),
                yard = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);

            yard.set(values);
            yard.set('konts', []);
            yard.save({
                params: {action: 'save'},
                callback: function (yard, operation, success) {
                    win.setLoading(false);
                    if (success) {
                        win.close();
                        this.getYardlist().getStore().reload();
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    saveYardSector: function (btn) {
        var form = this.getYardsectorform().getForm();
        if (form.isValid()) {
            var win = btn.up('window'),
                yardsector = form.getRecord(),
                values = form.getValues();

            win.setLoading(true);

            yardsector.set(values);
            yardsector.set('groups', values['usr.groupsIds']);
            yardsector.set('routeHid', this.getMenutree().lastSelectedLeaf.id.split('_')[2]);
            yardsector.save({
                params: {action: 'save'},
                callback: function (yard, operation, success) {
                    win.setLoading(false);
                    if (success) {
                        win.close();
                        this.getYardsectorlist().getStore().reload();
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    filterKontYard: function (btn) {
        var win = Ext.widget('ky2yardfilter');
        win.down('#gruzotpr').getStore().getProxy().extraParams['routeId'] = this.getYardlist().getStore().getProxy().extraParams['routeId'];
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },

    applyFilterKontYard: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getYardlist().getStore());
        }
    },

    changeClient: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            Ext.Ajax.request({
                url: 'ky2/secure/Yard.do',
                params: {action: 'change_client', jsonRequest: Ext.encode(form.getValues())},
                scope: this,
                success: function (response, options) {
                    this.getYardlist().getStore().reload();
                    btn.up('window').close();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });

        }
    },

    clearFilter: function (btn) {
        var store = this.getYardlist().getStore();
        store.clearFilter(true);
        delete store.getProxy().extraParams.nkons;
        store.load();
    },

    getYardSectors: function (btn) {
        var win = Ext.widget('ky2yardsectorlist'),
            store = win.down('grid').getStore();

        store.load({params: {action: 'list'}});
        /*
        var win = Ext.widget('ky2poezdsimportdir'),
            store = win.down('grid').getStore();
            // poezdModel = poezdlist.getSelectionModel().getLastSelected();

        store.load({
            params: {
                action: 'import_poezd_list'/*,
                 routeId: poezdModel.get('route.hid')*/
    },
    /* saveYardSector: function (yardsectorlist, yardsector) {
       /*var errors = yardsector.validate(),
             owner = yardsectorlist.up('nsieditlist'),
             rowEditing = yardsectorlist.plugins[0];
         rowEditing.completeEdit();
         if (errors.isValid()) {
             var newYardsector = (yardsector.getId() == null);
             Ext.Ajax.request({
                 url: owner.buildUrlPrefix() + '_save.do',
                 params: owner.prepareData(yardsector),
                 scope: this,
                 success: function (response, options) {
                     yardsectorlist.getStore().reload();
                 },
                 failure: function (response, options) {
                     TK.Utils.makeErrMsg(response, 'Error!..');
                 }
             });
         } else {
             TK.Utils.failureDataMsg();
         }
},*/
    /*deleteYardSector: function (yardsectorlist, yardsector) {
        var owner = yardsectorlist.up('nsieditlist');
        if (!yardsector.phantom) {
            Ext.Ajax.request({
                url: owner.buildUrlPrefix() + '_delete.do',
                params: owner.prepareData(yardsector),
                scope: this,
                success: function (response, options) {
                    yardsectorlist.getStore().reload();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            yardsectorlist.getStore().remove(yardsector);
        }
    },*/
    getUserGroups: function (btn) {
        Ext.create('Ext.window.Window', {
//            title: 'Список групп',
            width: 500, height: 500, y: 1,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: {xtype: 'userlistgroups', ownerBtn: btn}
        });
    },
    selectFilterStartDate: function (combo, records) {
        this.selectFilterDate(combo);
    },
    selectFilterEndDate: function (combo, records) {
        this.selectFilterDate(combo);
    },
    selectFilterDate: function (combo) {
        var form = combo.up('form'),
            values = form.getValues();

        if (values['startDate'] && values['endDate']) {
            var poezdCombo = form.down('combo#npprm');
            var gruzotprCombo = form.down('combo#gruzotpr');
            poezdCombo.clearValue();
            gruzotprCombo.clearValue();
            poezdCombo.getStore().load({
                params: {
                    action: 'get_poezds_in_interval',
                    reportParams: Ext.encode({startDate: values['startDate'], endDate: values['endDate']})
                },
                success: function (response, options) {
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
            gruzotprCombo.getStore().load({
                params: {
                    action: 'get_gruzotpr_in_interval',
                    reportParams: Ext.encode({startDate: values['startDate'], endDate: values['endDate']})
                },
                success: function (response, options) {
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
    }
});
