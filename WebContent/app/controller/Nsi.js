Ext.define('TK.controller.Nsi', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger',
        'Ext.grid.column.Action',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Toolbar',
        'Ext.util.DelayedTask',
        'Ext.util.TaskManager',
        'Ext.ux.form.SearchField',
        'Ext.window.Window',
        'TK.Utils',
        'TK.model.NsiCarrier',
        'TK.model.NsiSta',
        'TK.model.SmgsOtpr',
        'TK.model.SmgsPlat',
        'TK.view.edit.ClientEdit',
        'TK.view.edit.OtpavitelEdit',
        'TK.view.edit.StationCatalogEdit',
        'TK.view.user.ListGroups'

    ],

    views: ['nsi.ListDir'],
    stores: ['NsiDirs'],
    models: ['NsiDir', 'SmgsPlat', 'SmgsOtpr', 'NsiSta', 'NsiCarrier','TK.model.ky2.NsiClient'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'otpaviteledit',
            selector: 'sel_otpaviteledit'
        },
        {
            ref: 'stationedit',
            selector: 'sel_stationedit'
        }
    ],
    init: function () {
        this.control({
            'viewport > tabpanel > nsilistdir button[action="view"]': {
                click: this.onView
            },
            'viewport > tabpanel > nsilistdir button[action="uploadNsi"]': {
                click: this.onUploadNsi
            },

            'viewport > tabpanel > nsilistdir button[action="exportDir2Excel"]': {
                click: this.onExportDir2Excel
            },
            'viewport > tabpanel > nsilistdir': {
                itemdblclick: this.onView,
                select: this.onRowclick
            },
            'otpaviteledit button[action="country"]': {
                click: this.onStrana
            },
            'otpaviteledit button[action="close"]': {
                click: this.onClose
            },
            'clientedit button[action="close"]': {
                click: this.onCloseSta
            },
            'clientedit button[action="save"]': {
                click: this.onSaveClient
            },
            'clientedit button[action=getUserGroups]': {
                click: this.getUserGroups
            },
            'otpaviteledit button[action="save"]': {
                click: this.onSave
            },
            'stationedit button[action="close"]': {
                click: this.onCloseSta
            },
            'stationedit button[action="save"]': {
                click: this.onSaveSta
            },
            'stationedit button[action="adm"]': {
                click: this.staManagBind
            },
            'stationedit button[action="road"]': {
                click: this.nsiRoad
            }
        });
    },
    // экспортирует справочник в excel файл
    onExportDir2Excel: function (btn) {
        var list = btn.up('grid'),
            model,
            me;
        if (!TK.Utils.isRowSelected(list)) {
            return;
        }
        me = this;
        model = list.getSelectionModel().getLastSelected();
        this.getCenter().getEl().mask('Идет формирование файла...');
        var download = window.open('Report_exportDir2Excel.do?' +
            'name=' + model.get('name') + '&dirDescr=' + model.get('descr') + '&zipped=' + model.get('zipped'),
            '_self', '');

        download.back = me;
        download.onfocus = function (me, e, eOpts) {
            this.back.getCenter().getEl().unmask();
        };
        // постоянно вызывала ошибку

        // new Ext.util.DelayedTask(function () {
        //     Ext.TaskManager.start({
        //         run: function () {
        //             Ext.Ajax.request({
        //                 url: 'Report_checkExportDir2Excel.do',
        //                 success: function (response) {
        //                     var responseObj = Ext.decode(response.responseText);
        //                     if (responseObj['success']) {
        //                         me.getCenter().getEl().unmask();
        //                         Ext.TaskManager.destroy();
        //                         return false;
        //                     } else {
        //                         return true;
        //                     }
        //                 },
        //                 failure: function (response) {
        //                     me.getCenter().getEl().unmask();
        //                     Ext.TaskManager.destroy();
        //                     TK.Utils.makeErrMsg(response, this.errorMsg);
        //                 }
        //             });
        //
        //         },
        //         interval: 1000
        //     });
        // }).delay(1000);
        // me.getCenter().getEl().unmask();
    },
    onUploadNsi: function (btn) {
        var grid = btn.up('grid');
        Ext.create('Ext.window.Window', {
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
                    }
//            {xtype:'hidden', name:'search.routeId', value:routeId}
                ],
                buttons: [
                    {
                        text: this.btnSave,
                        handler: function (btn) {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url: 'File_uploadNsi.do',
                                    waitMsg: 'Загрузка файла...',
                                    scope: this,
                                    success: function (form, action) {
                                        form.reset();
                                        grid.store.load();
                                        btn.up('window').close();
                                    }, failure: function (form, action) {
                                        TK.Utils.makeErrMsg(action.response, 'Внимание! Ошибка чтения файла...');
                                    }
                                });
                            }
                        }
                    },
                    {
                        text: this.btnClose,
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        }).show();
    },
    onView: function (btn) {
        var list = btn.up('grid');
        if (!TK.Utils.isRowSelected(list)) {
            return false;
        }

        var data = list.selModel.getLastSelected().data;
        if (this[data.name]) {
            this[data.name]();
        }
    },
    selectRoad2Sta: function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('roadname', data.roadName);
        rec.set('roadun', data.roadUn);
        this.doLayout();
        view.up('window').close();
    },
    nsiRoutes: function (query, project) {
        return Ext.widget('nsilist', {
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleRoute;
            },
            buildStoreModel: function () {
                return ['name', 'hid', 'project'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_route';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerProject, dataIndex: 'project', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerRoute, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            },
            buildExtraParams: function () {
                return {'search.project': project};
            }
        });
    },
    nsiProjects: function (query) {
        return Ext.widget('nsilist', {
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleProject;
            },
            buildStoreModel: function () {
                return ['name', 'hid'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_project';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerName, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiRoad: function () {
        return Ext.widget('nsilist', {
            width: 600,
            buildTitle: function (config) {
                config.title = this.titleRoad;
            },
            buildStoreModel: function () {
                return ['roadNo', 'roadName', 'roadUn'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_road';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'roadNo'},
                    {text: this.headerName, dataIndex: 'roadName', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
                config.items.listeners = {
                    itemdblclick: function(dv, record, item, index, e) {
                        var data = record.data,
                            staform=Ext.ComponentQuery.query('#stationeditid #stationForm')[0];
                        staform.getComponent('road').getComponent('roadname').setValue(data['roadName']);
                        staform.getComponent('road').getComponent('roadun').setValue(data['roadUn']);
                        this.up().close();
                    }
                }
            }
        });
    },
    selectManager2Sta: function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('managno', data.managNo);
        rec.set('managun', data.managUn);
        rec.set('countryname', data.countryname);
        this.doLayout();
        view.up('window').close();
    },

    // справочник администрации жел. дор.
    nsiManagement: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику администраций железных дорог',
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleManagement;
                config.sender
            },
            buildStoreModel: function () {
                return ['managNo', 'managName', 'managUn', 'countryname', 'mnamerus'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_management';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'managNo'},
                    {text: this.headerZhD, dataIndex: 'mnamerus', renderer: TK.Utils.renderLongStr},
                    {text: this.headerCountry, dataIndex: 'countryname', renderer: TK.Utils.renderLongStr},
                    {text: this.headerName, dataIndex: 'managName', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
                // config.items.listeners = {
                //     itemdblclick: function(dv, record, item, index, e) {
                //         var data = record.data,
                //             staform=Ext.ComponentQuery.query('#stationeditid #stationForm')[0];
                //         staform.getComponent('adm').getComponent('managno').setValue(data['managNo']);
                //         staform.getComponent('countryname').setValue(data['countryname']);
                //         staform.getComponent('mnamerus').setValue(data['mnamerus']);
                //         staform.getComponent('managun').setValue(data['managUn']);
                //         this.up().close();
                //     }
                // }
            }
        });
    },
    staManagBind:function( btn)
    {

         var nsiGrid = this.getController('Nsi').nsiManagement(btn.up().getComponent('managno').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
         nsiGrid.on('itemdblclick', this.staManagDbl);
    },
    staManagDbl:function(grid,record)
    {
                var data = record.data,
                    staform=Ext.ComponentQuery.query('#stationeditid #stationForm')[0];
                staform.getComponent('adm').getComponent('managno').setValue(data['managNo']);
                staform.getComponent('countryname').setValue(data['countryname']);
                staform.getComponent('mnamerus').setValue(data['mnamerus']);
                staform.getComponent('managun').setValue(data['managUn']);
                this.up().close();
    },
    // отображение справочника станций
    nsiSta: function (query) {
        var me = this,
            // onRoad = Ext.bind(function () {
            //     var nsiGrid1 = this.getController('Nsi').nsiRoad().getComponent(0);
            //     nsiGrid1.on('itemdblclick', this.getController('Nsi').selectRoad2Sta, win.getComponent(0));
            // }, this),
            // onManager = Ext.bind(function () {
            //     var nsiGrid1 = this.getController('Nsi').nsiManagement().getComponent(0);
            //     nsiGrid1.on('itemdblclick', this.getController('Nsi').selectManager2Sta, win.getComponent(0));
            // }, this),
            win = Ext.widget('nsieditlist', {
//                title:'Поиск по справочнику станций ж.д.',
                width: 1000,
                itemId: 'staGrid',
                prefix: 'staE',
                editPrivileg: 'CIM_DIR_STA',
                search: query,
                buildTitle: function (config) {
                    config.title = this.titleSta;
                },
                buildStoreModel: function () {
                    return 'TK.model.NsiSta';
                },
                buildUrlPrefix: function () {
                    return 'Sta';
                },
                buildColModel: function (config) {
                    config.items.columns = [
                        {
                            xtype: 'actioncolumn', width: 55,
                            items: [
                                {
                                    icon:'./resources/images/edit.png',
                                    tooltip: me.tooltipEdit,
                                    action: 'save',
                                    handler: me.onEditRecordSta,
                                    getClass: this.onGetClass,
                                    scope: this
                                },
                                {
                                    icon: './resources/images/delete.png',
                                    tooltip: this.ttipDel,
                                    action: 'del',
                                    handler: me.onDelRecord,
                                    getClass: this.onGetClass,
                                    scope: this
                                }
                            ]
                        },
                        {text: this.headerStn,dataIndex: 'staName',flex: 2},
                        {text: this.headerStn1,dataIndex: 'staNameCh', flex: 2},
                        {text: this.headerStn2,dataIndex: 'staNameEn',flex: 2},
                        {text: this.headerCode, dataIndex: 'staNo',flex: 1},
                        {text: this.headerZhD,dataIndex: 'mnamerus',flex: 1},
                        // {text: this.headerZhD, dataIndex: 'roadname', editor: {xtype: 'trigger', maxLength: 254,triggerCls: 'dir', onTriggerClick: onRoad, editable: false }},
                        {text: this.headerCodeAdm,dataIndex: 'managno',flex: 1},
                        {text: this.headerCountry,dataIndex: 'countryname',flex: 1 }

                    ];
                },
                newRecord: function () {
                    return Ext.create('TK.model.NsiSta', {});
                },
                onBeforeEdit: function (editor, props) {
                    if (!tkUser.hasPriv(this.editPrivileg) || props.record.get('ro') == '1') { // switch off editing
                        return false;
                    }
                },
                onGetClass: function (value, meta, record) {
                    if (tkUser.hasPriv(this.editPrivileg) && record.get('ro') == '1') {
                        return 'hide_el';
                    }
                    /*if (record.get('ro') == '0') {
                        return 'show_el';
                    }*/
                },
                prepareData: function (rec) {
                    var data = {};
                    data[this.prefix + '.stUn'] = rec.data['stUn'];
                    data[this.prefix + '.staName'] = rec.data['staName'];
                    data[this.prefix + '.staNameCh'] = rec.data['staNameCh'];
                    data[this.prefix + '.staNameEn'] = rec.data['staNameEn'];
                    data[this.prefix + '.staNo'] = rec.data['staNo'];
                    data[this.prefix + '.road.roadun'] = rec.data['roadun'];
                    data[this.prefix + '.management.managUn'] = rec.data['managun'];
                    return data;
                }
            });
        return win;
    },
    // Отображает справочник стран для выбора.
    nsiCountries: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику стран',
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleCountries;
            },
            buildStoreModel: function () {
                return ['kod', 'abc2', 'sokrNam', 'naim', 'anaim', 'krnaim'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_countries';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCountryRu, dataIndex: 'kod', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerCode, dataIndex: 'abc2'},
                    {text: this.headerCountryRu, dataIndex: 'naim', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerCountry, dataIndex: 'anaim', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerCountryS, dataIndex: 'krnaim', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerWay, dataIndex: 'sokrNam'}
                ]
            }
        });
    },
    nsiCountriesGd: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику стран ж.д.',
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleCountriesZhd;
            },
            buildStoreModel: function () {
                return ['roadNo', 'managNo', 'roadName', 'countryName', 'roadUn'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_countriesGd';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerWayCode, dataIndex: 'roadNo'},
                    {text: this.headerCodeAdm, dataIndex: 'managNo'},
                    {text: this.headerZhD, dataIndex: 'roadName', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerCountry, dataIndex: 'countryName', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDangCode: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику опасных грузов',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleDangerous;
            },
            buildStoreModel: function () {
                return ['hid', 'code', 'descr'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_dangCode';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'code'},
                    {text: this.headerName, dataIndex: 'descr', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiKarantin: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику карантинных грузов',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleKarantin;
            },
            buildStoreModel: function () {
                return ['hid', 'kgvn', 'nzgr'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_karantin';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kgvn'},
                    {text: this.headerName, dataIndex: 'nzgr', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiVeterin: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику ветеринарных грузов',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleVeterin;
            },
            buildStoreModel: function () {
                return ['hid', 'kgvn', 'nzgr'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_veterin';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kgvn'},
                    {text: this.headerName, dataIndex: 'nzgr', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    selectGng: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('kgvn').setValue(data.code);
        this.getComponent('nzgr').setValue(data.name);
        view.up('window').close();
    },

    nsiCargoDanV: function (query) {
        return Ext.widget('nsilist', {
            width: 800,
            search: query,
            buildTitle: function (config) {
                config.title = 'Опасные грузы';
            },
            buildStoreModel: function () {
                return ['hid', 'numOon', 'carDName', 'codDanger', 'clazz', 'dangSign', 'groupPack', 'emergenCard', 'stamps'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_cargoDanV';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: 'Номер ООН', dataIndex: 'numOon', width: 50},
                    {text: 'Наименование', dataIndex: 'carDName', width: 300, renderer: TK.Utils.renderLongStr},
                    {text: 'Код опасности', dataIndex: 'codDanger'},
                    {text: 'Класс опасности', dataIndex: 'clazz'},
                    {text: 'Знак опасности', dataIndex: 'dangSign'},
                    {text: 'Группа упаковки', dataIndex: 'groupPack'},
                    {text: 'Авар карт', dataIndex: 'emergenCard'},
                    {text: 'Штампы', dataIndex: 'stamps', renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiCargoDanDe: function (query) {
        return Ext.widget('nsilist', {
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = 'Опасные грузы, нем.';
            },
            buildStoreModel: function () {
                return ['hid', 'carDNameDe', 'numOonDe', 'bem', 'ridNhmCode'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_cargoDanDe';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: 'Наименование', dataIndex: 'carDNameDe', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: 'Номер ООН', dataIndex: 'numOonDe'}
                ];
            }
        });
    },
    // выбор из справочника кодов ГНГ
    nsiGng: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ГНГ',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleGng;
            },
            buildStoreModel: function () {
                return ['hid', 'code', 'name', {name: 'ohr', type: 'boolean'}];
            },
            buildUrlPrefix: function () {
                return 'Nsi_gng';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'code'},
                    {text: this.headerName, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    // выбор из справочника кодов ГНГ для немецкого языка
    nsiGngDe: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ГНГ',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleGng;
            },
            buildStoreModel: function () {
                return ['kgvn', 'nzgr'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_gngDe';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kgvn'},
                    {text: this.headerName, dataIndex: 'nzgr', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    cargoGng: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ГНГ',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleGng;
            },
            buildStoreModel: function () {
                return ['c_gn_un', 'cargo_group', 'cargo_fullname'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_cargoGng';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'cargo_group'},
                    {text: this.headerName, dataIndex: 'cargo_fullname', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    selectEtsng: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ekgvn').setValue(data.code);
        this.getComponent('enzgr').setValue(data.name);
        view.up('window').close();
    },
    nsiEtsng: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ЕТ СНГ',
            width: 700,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleEtsng;
            },
            buildStoreModel: function () {
                return ['hid', 'code', 'name', {name: 'ohr', type: 'boolean'}];
            },
            buildUrlPrefix: function () {
                return 'Nsi_etsng';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'code'},
                    {text: this.headerName, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG23: function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику видов документов',
            width: 700,
            buildTitle: function (config) {
                config.title = this.titleDocs;
            },
            buildStoreModel: function () {
                return ['nsiFDesc', 'nsiFDsc2', 'nsiFDsc3', 'nsiFNn', 'nsiFNcas'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams: function () {
                return {type: 9};
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCoedEdi, dataIndex: 'nsiFNn'},
                    {text: this.headerCustCode, dataIndex: 'nsiFNcas'},
                    {text: this.headerName1, dataIndex: 'nsiFDesc', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerName2, dataIndex: 'nsiFDsc3', flex: 1},
                    {text: this.headerName3, dataIndex: 'nsiFDsc2', flex: 1}
                ];
            }
        });
    },
    nsiPlat: function (query) {
        var me = this;
        return Ext.widget('nsieditlist', {
//            title:'Поиск по справочнику плательщиков по железным дорогам (экспедиторы)',
            width: 750,
            search: query,
            editPrivileg: 'CIM_DIR_PLAT',
            buildTitle: function (config) {
                config.title = this.titlePlat;
            },
            buildStoreModel: function () {
                return 'TK.model.SmgsPlat';
            },
            buildUrlPrefix: function () {
                return 'NsiPlatel';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {
                        xtype: 'actioncolumn', width: 55,
                        items: [
                            {
                                icon: './resources/images/save.gif',
                                tooltip: this.ttipSave,
                                action: 'save',
                                handler: me.onSaveRecord
                            },
                            {
                                icon: './resources/images/delete.png',
                                tooltip: this.ttipDel,
                                action: 'del',
                                handler: me.onDelRecord
                            }
                        ]
                    },
                    {
                        text: this.headerCodeAdm,
                        dataIndex: 'dorR',
                        editor: {
                            xtype: 'combo',
                            maxLength: 5,
                            store: ['РЖД', 'УЗ', 'БЧ', 'УТИ', 'КЗХ', 'КРГ', 'ЖСР'],
                            typeAhead: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            selectOnFocus: true
                        }
                    },
                    {
                        text: this.headerName,
                        dataIndex: 'platR',
                        flex: 2,
                        editor: {xtype: 'textfield', maxLength: 45},
                        renderer: TK.Utils.renderLongStr
                    },
                    {
                        text: this.headerPayerMeth,
                        dataIndex: 'primR',
                        flex: 1,
                        editor: {xtype: 'textfield', maxLength: 70},
                        renderer: TK.Utils.renderLongStr
                    },
                    {text: this.headerPayerCode, dataIndex: 'kplat', editor: {xtype: 'textfield', maxLength: 50}},
                    {text: this.headerPayerCode1, dataIndex: 'kplat1', editor: {xtype: 'textfield', maxLength: 50}},
                    {text: this.headerPayerCode2, dataIndex: 'kplat2', editor: {xtype: 'textfield', maxLength: 50}}
                ];
            },
            newRecord: function () {
                return Ext.create('TK.model.SmgsPlat', {
                    dorR: '',
                    platR: '',
                    primR: '',
                    kplat: '',
                    kplat1: '',
                    hid: ''
                });
            }
        });
    },
    // запус окна выбора страны
    onStrana: function (button) {
        var nsiGrid1 = this.getController('Nsi').nsiCountries().getComponent(0);
        nsiGrid1.on('itemdblclick', this.getController('Nsi').selectCountriesOtpr, button);

    },
    nsiOtpr: function (query) {
        return this.getController('docs.Cimsmgs').nsiOtpr(query);
        /*, gridAction = nsiGrid.down('actioncolumn')*/
        
        // nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
//         var me = this,
//             onStrana = Ext.bind(function () {
//                 var nsiGrid1 = this.getController('Nsi').nsiCountries().getComponent(0);
//                 nsiGrid1.on('itemdblclick', this.getController('Nsi').selectCountriesNsiOtpr, win.getComponent(0));
//             }, this),
//             win = Ext.widget('nsieditlist', {
// //                title:'Поиск по справочнику юридических лиц (отправителей/получателей)',
//                 width: 850,
//                 maximizable: true,
//                 search: query,
//                 editPrivileg: 'CIM_DIR',
//                 buildTitle: function (config) {
//                     config.title = this.titleOtpr;
//                 },
//                 buildStoreModel: function () {
//                     return 'TK.model.SmgsOtpr';
//                 },
//                 buildUrlPrefix: function () {
//                     return 'NsiSmgsG1';
//                 },
//                 buildColModel: function (config) {
//                     config.items.columns = [
//                         {
//                             xtype: 'actioncolumn', width: 55,
//                             items: [
//                                 {
//                                     icon: './resources/images/save.gif',
//                                     tooltip: this.ttipSave,
//                                     action: 'save',
//                                     handler: me.onSaveRecord
//                                 },
//                                 {
//                                     icon: './resources/images/delete.png',
//                                     tooltip: this.ttipDel,
//                                     action: 'del',
//                                     handler: me.onDelRecord
//                                 }
//                             ]
//                         },
//                         {
//                             text: this.headerName,
//                             dataIndex: 'g1r',
//                             flex: 5,
//                             editor: {xtype: 'textarea', maxLength: 512},
//                             renderer: TK.Utils.renderLongStr
//                         },
//                         {
//                             text: this.headerCountryCode,
//                             dataIndex: 'g_1_5k',
//                             flex: 1,
//                             editor: {xtype: 'textfield', maxLength: 3}
//                         },
//                         {
//                             text: this.headerCountryName,
//                             dataIndex: 'g16r',
//                             flex: 4,
//                             editor: {xtype: 'trigger', maxLength: 550, triggerCls: 'dir', onTriggerClick: onStrana},
//                             renderer: TK.Utils.renderLongStr
//                         },
//                         {
//                             text: this.headerOtprZip,
//                             dataIndex: 'g17',
//                             flex: 2,
//                             editor: {xtype: 'textfield', maxLength: 10}
//                         },
//                         {
//                             text: this.headerCity,
//                             dataIndex: 'g18r_1',
//                             flex: 4,
//                             editor: {xtype: 'textfield', maxLength: 32}
//                         },
//                         {
//                             text: this.headerDopInfo,
//                             dataIndex: 'dop_info',
//                             flex: 5,
//                             editor: {xtype: 'textarea', maxLength: 512},
//                             renderer: TK.Utils.renderLongStr
//                         },
//                         {
//                             text: this.headerAddress,
//                             dataIndex: 'g19r',
//                             flex: 5,
//                             editor: {xtype: 'textarea', maxLength: 128},
//                             renderer: TK.Utils.renderLongStr
//                         },
//                         {text: 'код ТГНЛ', dataIndex: 'g2', flex: 3, editor: {xtype: 'textfield', maxLength: 32}},
//                         {text: 'код ОКПО', dataIndex: 'g3', flex: 3, editor: {xtype: 'textfield', maxLength: 32}},
//                         {text: 'код ИНН', dataIndex: 'g_2inn', flex: 3, editor: {xtype: 'textfield', maxLength: 32}}
//                     ];
//                 },
//                 newRecord: function () {
//                     return Ext.create('TK.model.SmgsOtpr', {
//                         g1r: '',
//                         g_1_5k: '',
//                         g16r: '',
//                         g17: '',
//                         g18r_1: '',
//                         g19r: '',
//                         g2: '',
//                         g3: '',
//                         g_2inn: '',
//                         hid: '',
//                         dop_info: ''
//                     });
//                 }
//             });
//
//         return win;
    },

    // закрываем окно добавление/редактивраония станции
    onCloseSta:function(button)
    {

        // if(button.up().up().getItemId()==='stationeditid') {
            button.up().up().destroy();
            // return;
        // }
    },
    // закрываем окно добавление/редактивраония перевозчика
    onClose: function (button) {
        button.up().up().up().destroy();
    },

    // сохраняем запись об станции
    onSaveSta: function (button) {
        var form = button.up().up().getComponent('stationForm');
        var rec = form.getValues();
        var owner = Ext.ComponentQuery.query('#staGrid')[0];
        var grid = owner.down('gridpanel');
        var data = {};
        var prefix = owner.prefix;
        if (form.isValid()) {
            data[prefix + '.stUn'] = rec['stUn'];
            data[prefix + '.staName'] = rec['staName'];
            data[prefix + '.staNameCh'] = rec['staNameCh'];
            data[prefix + '.staNameEn'] = rec['staNameEn'];
            data[prefix + '.staNo'] = rec['staNo'];
            data[prefix + '.road.roadUn'] =rec['roadun'];
            data[prefix + '.management.managUn'] = rec['managun'];
            Ext.Ajax.request({
                url: owner.buildUrlPrefix() + '_save.do',
                params: data,
                success: function (response, options) {
                    grid.store.load();
                    form.up().close();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
        else {
            Ext.Msg.alert(this.titleErrorWarning, this.warningFillErrors);
        }
    },

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

    // сохраняем запись о клиенте
    onSaveClient: function (button) {
        var form = button.up('window').down('form'),
            rec = form.getValues(),
            owner = Ext.ComponentQuery.query('#clientGrid')[0],
            grid = owner.down('gridpanel'),
            data = owner.prepareData4Save(rec);

        if (form.isValid()) {
            Ext.Ajax.request({
                url: 'Client.do',
                params: {jsonRequest: Ext.encode(data), action: 'save'},
                success: function (response, options) {
                    grid.store.reload();
                    form.up().destroy();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            Ext.Msg.alert(this.titleErrorWarning, this.warningFillErrors);
        }
    },
    // сохраняем запись об отправителе
    onSave: function (button) {

        var form = button.up().up().getComponent('otprForm');
        var rec = form.getValues();
        var owner = Ext.ComponentQuery.query('#otprGrid')[0];
        var grid = owner.down('gridpanel');
        var data = {};
        var prefix = owner.prefix;
        if (form.isValid()) {
            for (var prop in rec) {
                data[prefix + '.' + prop] = rec[prop];
            }

            rowEditing = grid.plugins[0];

            rowEditing.completeEdit();

            Ext.Ajax.request({
                url: owner.buildUrlPrefix() + '_save.do',
                params: data,
                success: function (response, options) {
                    grid.store.load();
                    form.up().up().destroy();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
        else {
            Ext.Msg.alert(this.titleErrorWarning, this.warningFillErrors);
        }

    },
    onG24: function () {
        var owner = this.ownerCt,
            val1 = parseFloat(owner.getComponent('smgs.g24T').getValue()),
            val2 = parseFloat(owner.getComponent('smgs.g24N').getValue()),
            g24B = owner.getComponent('smgs.g24B'), oldsum, newsum;
        if (isNaN(val1)) val1 = 0;
        if (isNaN(val2)) val2 = 0;
        newsum = val1 + val2;
        oldsum = g24B.getValue();
        g24B.setValue(newsum > 0 ? newsum : '');
        g24B.fireEvent('change', g24B, newsum, oldsum);
    },
    onG24B: function () {
        var arr,
            g15 = this.ownerCt.getComponent('smgs._g24B');

        if (g15) {
            if (this.getValue()) {
                arr = (this.getValue() + '').split('.');
                g15.setText(TK.Utils.num2str(arr[0]) + (arr[1] ? '.' + arr[1] : '') + ' кг');
            } else {
                g15.setText('');
            }
        }
    },
    nsiDocG7: function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width: 500,
            buildTitle: function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel: function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams: function () {
                return {type: 7};
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'nsiFNn'},
                    {text: this.headerName1, dataIndex: 'nsiFDesc', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG9: function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width: 500,
            buildTitle: function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel: function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams: function () {
                return {type: 9};
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'nsiFNn'},
                    {text: this.headerName1, dataIndex: 'nsiFDesc', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG13: function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width: 500,
            buildTitle: function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel: function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams: function () {
                return {type: 13};
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'nsiFNn'},
                    {text: this.headerName1, dataIndex: 'nsiFDesc', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiCurrency: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику валют',
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleCurrency;
            },
            buildStoreModel: function () {
                return ['hid', 'abv3', 'name'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_currency';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'abv3'},
                    {text: this.headerDescr, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiTnved: function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ТНВЭД',
            width: 600,
            buildTitle: function (config) {
                config.title = this.titleTnved;
            },
            buildStoreModel: function () {
                return ['hid', 'kod', 'naim'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_tnved';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kod'},
                    {text: this.headerDescr, dataIndex: 'naim', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDeliv: function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику условий поставки',
            width: 600,
            search: query,
            buildTitle: function (config) {
                config.title = this.titleDeliv;
            },
            buildStoreModel: function () {
                return ['hid', 'kod', 'name'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_deliv';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kod'},
                    {text: this.headerDescr, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiUpak: function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику видов упаковки',
            width: 600,
            buildTitle: function (config) {
                config.title = this.titleUpak;
            },
            buildStoreModel: function () {
                return ['hid', 'kod', 'kypk', 'name', 'nameDe'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_upak';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerCode, dataIndex: 'kod'},
                    {text: this.headerDescr + ' RU', dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.headerDescr + ' DE', dataIndex: 'nameDe', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiGroups: function () {
        return Ext.widget('nsilist', {
//            title:this.title1,
            width: 500, height: 500,
            buildTitle: function (config) {
                config.title = this.title1;
            },
            buildStoreModel: function () {
                return ['name', 'descr'];
            },
            buildUrlPrefix: function () {
                return 'Nsi_groups';
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.headerName, dataIndex: 'name', flex: 1},
                    {text: this.headerDescr, dataIndex: 'descr', flex: 2, renderer: TK.Utils.renderLongStr}
                ];
            },
            buildGridDockedItems: function (config) {
                config.items.dockedItems = [
                    {
                        dock: 'top',
                        xtype: 'toolbar',
                        items: {
                            xtype: 'searchfield',
                            store: config.items.store
                        }
                    }
                ]
            }
        });
    },

    selectCountriesNsiOtpr: function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('g_1_5k', data.abc2);
        rec.set('g16r', data.naim);

        view.up('window').close();
    },
    // выбираем страну из табличного списка странн для вставки в запись отправителя
    selectCountriesOtpr: function (view, record, item, index) {

         var data = record.data;

        this.up().getComponent('g16_1').setValue(data.anaim);
        this.up().getComponent('g16r').setValue(data.krnaim);
        this.up().up().getComponent('code_1').getComponent('g_1_5k').setValue(data.abc2);
         this.up().up().getComponent('g15_1').setValue(data.kod);

        // this.up().getComponent('g16_1').setValue(data.anaim);
        // this.up().up().getComponent('country-2').getComponent('g16r').setValue(data.krnaim);
        // this.up().up().getComponent('country-2').getComponent('g_1_5k').setValue(data.abc2);
        // this.up().up().getComponent('country-2').getComponent('g15_1').setValue(data.kod);


        view.up('window').close();
    },
    selectCountriesG1: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data.naim);
        view.up('window').close();
    },
    selectCountriesG5: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data.naim);
        view.up('window').close();
    },
    selectPlatG4: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('adm').getComponent('dorR').setValue(data['dorR']);
        this.getComponent('platR').setValue(data['platR']);
        this.getComponent('primR').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
        if (this.getComponent('kplat2')) {
            this.getComponent('kplat2').setValue(data['kplat2']);
        }
        view.up('window').close();
    },
    selectPlatG23manag:function(view, record)
    {

        var data = record.data;
        this.getComponent('adm').getComponent('dorR').setValue(data['mnamerus']);
        this.getComponent('adm').getComponent('codPer').setValue(data['managNo']);

        view.up('window').close();
    },
    selectGroup: function (view, record, item, index) {
        var data = record.data,
            rec = this.selModel.getLastSelected();
        rec.set('name', data.name);
        view.up('window').close();
    },
    /**
     * Отображает таблицу выбора клиента
     * @param query текущий клиент
     * @param routeId индентификатор маршрута
     * @returns {*}
     */
    nsiKyClient: function (query, routeId) {
        var me = this,
            modelName = 'TK.model.ky2.NsiClient',
            win = Ext.widget('nsieditlist', {
                width: 650,
                prefix: 'client',
                editPrivileg: 'CIM_DIR',
                search: query,
                routeId: routeId,
                itemId: 'clientGrid',
                buildTitle: function (config) {
                    config.title = this.titleClient;
                },
                buildExtraParams: function () {
                    return {routeId: routeId};
                },
                buildStoreModel: function () {
                    return modelName;
                },
                buildUrlPrefix: function () {
                    return 'Client';
                },
                buildColModel: function (config) {
                    config.items.columns = [
                        {
                            xtype: 'actioncolumn', width: 55,
                            items: [
                                {
                                    icon:'./resources/images/edit.png',
                                    tooltip: this.tooltipEdit,
                                    action: 'save',
                                    handler: me.onEditRecordClient,
                                    getClass: this.onGetClass,
                                    scope: this
                                },
                                {
                                    icon: './resources/images/delete.png',
                                    tooltip: this.ttipDel,
                                    action: 'del',
                                    handler: me.onDelRecord,
                                    getClass: this.onGetClass,
                                    scope: this
                                }
                            ]
                        },
                        {text: this.headerCode, dataIndex: 'clNo', flex: 1, editor: {xtype: 'textfield', maxLength: 10}},
                        {text: this.headerName, dataIndex: 'sname', flex: 4, editor: {xtype: 'textfield', maxLength: 255}},
                        {text: this.headerPZ, dataIndex: 'cntPZ', flex: 1, editor: {xtype: 'textfield', maxLength: 50}},
                        {text: this.headerWZ, dataIndex: 'cntWZ', flex: 1, editor: {xtype: 'textfield', maxLength: 50}},
                        {text: this.headerNDog, dataIndex: 'noDog', flex: 2, editor: {xtype: 'textfield', maxLength: 50}},
                        {text: this.headerDatDog, dataIndex: 'dateDog', flex: 2, editor: {xtype: 'textfield', maxLength: 255}},
                        {text: this.headerGroups, dataIndex: 'usr.groupsIds', flex: 2, renderer: TK.Utils.renderLongStr}
                    ];
                },
                newRecord: function () {
                    return Ext.create(modelName, {});
                },
                onBeforeEdit: function (editor, props) {
                    // if (!tkUser.hasPriv(this.editPrivileg)) { // switch off editing
                        return false;
                    // }
                },
                onGetClass: function (value, meta, record) {
                    if (!tkUser.hasPriv(this.editPrivileg)) {
                        return 'hide_el';
                    }
                    /*if (record.get('ro') == '0') {
                     return 'show_el';
                     }*/
                },
                prepareData: function (rec) {
                    return {'hid': rec.data['hid']};
                },
                prepareData4Save: function (rec) {
                    rec['groups'] = rec['usr.groupsIds'];
                    delete rec['usr.groupsIds'];
                    // return {'hid': rec.data['hid']};
                    return rec;
                }
            });
        return win;
    },

    nsiCarrier: function (query) {
        var me = this,
            win = Ext.widget('nsieditlist', {
                width: 1000,
                height:600,
                prefix: 'carrier',
                editPrivileg: 'CIM_DIR',
                search: query,
                buildTitle: function (config) {
                    config.title = this.carrierTitle;
                },
                buildStoreModel: function () {
                    return 'TK.model.NsiCarrier';
                },
                buildUrlPrefix: function () {
                    return 'Carrier';
                },
                buildColModel: function (config) {
                    config.items.columns = [
                        {
                            xtype: 'actioncolumn', width: 55,
                            items: [
                                {
                                    icon: './resources/images/save.gif',
                                    tooltip: this.ttipSave,
                                    action: 'save',
                                    handler: me.onSaveRecord,
                                    getClass: this.onGetClass,
                                    scope: this
                                },
                                {
                                    icon: './resources/images/delete.png',
                                    tooltip: this.ttipDel,
                                    action: 'del',
                                    handler: me.onDelRecord,
                                    getClass: this.onGetClass,
                                    scope: this
                                }
                            ]
                        },
                        {text: this.headerSt, dataIndex: 'countryNo', flex: 1, editor: {xtype: 'textfield', maxLength: 3}},
                        {text: this.headerCar,dataIndex: 'carrNo',flex: 1, editor: {xtype: 'textfield', maxLength: 4}},
                        {text: this.headerCarShort,dataIndex: 'carrNameShort', flex: 1, editor: {xtype: 'textfield', maxLength: 48},renderer: TK.Utils.renderLongStr},
                        {text: this.headerCarName,dataIndex: 'carrName',flex: 3,editor: {xtype: 'textfield', maxLength: 128},renderer: TK.Utils.renderLongStr}
                    ];
                },
                newRecord: function () {
                    return Ext.create('TK.model.NsiCarrier', {});
                },
                onBeforeEdit: function (editor, props) {
                    if (!tkUser.hasPriv(this.editPrivileg)) { // switch off editing
                        return false;
                    }
                },
                onGetClass: function (value, meta, record) {
                    if (!tkUser.hasPriv(this.editPrivileg)) {
                        return 'hide_el';
                    }
                    /*if (record.get('ro') == '0') {
                     return 'show_el';
                     }*/
                },
                prepareData: function (rec) {
                    var data = {};
                    data[this.prefix + '.carrUn'] = rec.data['carrUn'];
                    data[this.prefix + '.carrId'] = rec.data['carrId'];
                    data[this.prefix + '.countryNo'] = rec.data['countryNo'];
                    data[this.prefix + '.carrNo'] = rec.data['carrNo'];
                    data[this.prefix + '.carrNameShort'] = rec.data['carrNameShort'];
                    data[this.prefix + '.carrName'] = rec.data['carrName'];
                    return data;
                }
            });
        return win;
    },
    selectDocG23: function (view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('ncas').setValue(data['nsiFNcas']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        this.getComponent('text2').setValue(data['nsiFDsc2']);
        view.up('window').close();
    },
    // отображение окна добавления записи об перевозчике
    onAddRecord: function (btn, param1, param2, param3) {

        if (btn.up('nsieditlist').itemId === 'otprGrid') {
            win = Ext.create('Ext.window.Window', {
                title: this.titleAddWindow,
                height: 725,
                width: 750,
                modal: true,
                layout: 'fit',
                autoShow: true,
                maximizable: true,
                items:{xtype: 'otpaviteledit'}
            }).show();
            var stran = new TK.model.SmgsOtpr;
            var form = win.getComponent('ed_panel').getComponent('otprForm').getForm();
            form.loadRecord(stran);

            return win;
        }
        else if (btn.up('nsieditlist').itemId === 'staGrid') {
            return Ext.create('TK.view.edit.StationCatalogEdit').show();
        }
        else if (btn.up('nsieditlist').itemId === 'clientGrid') {
            return Ext.create('TK.view.edit.ClientEdit').show();
        }

        {
            var owner = btn.up('nsieditlist'), grid = owner.getComponent(0), /*ind = grid.store.getCount(),*/
                r = owner.newRecord(), rowEditing = grid.plugins[0];
            rowEditing.cancelEdit();
            grid.store.insert(0, r);

            rowEditing.startEditByPosition({row: 0, column: 0});
        }
    },
    onDivFocus: function () {
        this.removeCls('bg-c-white');
        this.addCls('div-active');
    },
    onSaveRecord: function (grid, rowIndex, colIndex) {
        var rec = grid.store.getAt(rowIndex), errors = rec.validate(), owner = grid.up('nsieditlist'),
            rowEditing = grid.ownerCt.plugins[0];

        rowEditing.completeEdit();
        if (errors.isValid()) {
            Ext.Ajax.request({
                url: owner.buildUrlPrefix() + '_save.do',
                params: owner.prepareData(rec),
                success: function (response, options) {
                    grid.store.load();
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },

    // удаление записи об отправителе
    onDelRecord: function (grid, rowIndex, colIndex) {
        var me = this;

        var res = Ext.Msg.show({
            title: this.titleDelMsgBox,
            msg: this.textDelMsgBox,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var rec = grid.store.getAt(rowIndex), data = rec.data, owner = grid.up('nsieditlist');
                    if (!rec.phantom) {
                        Ext.Ajax.request({
                            url: owner.buildUrlPrefix() + '_delete.do',
                            params: owner.prepareData(rec),
//                params: {task: 'delete', 'nsi.hid':data.hid},
                            success: function (response, options) {
                                grid.store.load();
                            },
                            failure: function (response, options) {
                                TK.Utils.makeErrMsg(response, 'Error!..');
                            }
                        });
                    } else {
                        grid.store.remove(rec);
                    }

                } else if (btn === 'no') {

                }
            }
        });
    },
    // редактирование записи об перевозчике
    onEditRecordSta: function (grid, rowIndex, colIndex) {
        var sta = grid.store.getAt(rowIndex),
            win= Ext.create('TK.view.edit.StationCatalogEdit').show();

        var form = win.getComponent('stationForm').getForm();
        form.loadRecord(sta);

        win.show();
        return win;
    },

    onEditRecordClient: function (grid, rowIndex, colIndex) {
        var client = grid.store.getAt(rowIndex),
            win = Ext.create('TK.view.edit.ClientEdit').show();
            win.getComponent('clientForm').getForm().loadRecord(client);
        return win;
    },

    // редактирование записи об перевозчике
    onEditRecord: function (grid, rowIndex, colIndex) {
        var stran = grid.store.getAt(rowIndex);

        win = Ext.create('Ext.window.Window', {
            title: 'Hello',
             height: 725,
            width: 750,
            modal: true,
            layout: 'fit',
            autoShow: true,
            maximizable: true,
            title: this.titleEditWindow,
            items: [{
                xtype: 'otpaviteledit'
            }
            ]
        });
        var form = win.getComponent('ed_panel').getComponent('otprForm').getForm();
        form.loadRecord(stran);

        win.show();

        return win;
    },
    onRowclick: function (field, newValue, oldValue) {

        var grid = field.view.up('grid');
        btn = grid.getDockedComponent('top').getComponent('export2Excel'),
            hid = grid.selModel.getLastSelected().get('hid');

        if (btn) {
            if (hid != 100) {
                btn.enable();
            } else {
                btn.disable();
            }
        }
    }
});