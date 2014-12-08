Ext.define('TK.controller.Nsi', {
    extend:'Ext.app.Controller',

    views:['nsi.ListDir'],
    stores:['NsiDirs'],
    models:['NsiDir', 'SmgsPlat', 'SmgsOtpr', 'NsiSta'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        }
    ],
    init:function () {
        this.control({
            'viewport > tabpanel > nsilistdir button[action="view"]':{
                click:this.onView
            },
            'viewport > tabpanel > nsilistdir button[action="uploadNsi"]':{
                click:this.onUploadNsi
            },
            'viewport > tabpanel > nsilistdir button[action="exportDir2Excel"]':{
                click:this.onExportDir2Excel
            },
            'viewport > tabpanel > nsilistdir':{
                itemdblclick:this.onView,
                select: this.onRowclick
            }
        });
    },
    onExportDir2Excel:function (btn) {
        var list = btn.up('grid'),
            model,
            me;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        me = this;
        model = list.getSelectionModel().getLastSelected();

        window.open('Report_exportDir2Excel.do?' +
            'name=' + model.get('name') + '&dirDescr=' + model.get('descr')+ '&zipped=' + model.get('zipped'),
            '_self','');

        this.getCenter().getEl().mask('Идет формирование файла...');
        new Ext.util.DelayedTask(function(){
            Ext.TaskManager.start({
                run: function(){
                    Ext.Ajax.request({
                        url: 'Report_checkExportDir2Excel.do',
                        success: function (response) {
                            var responseObj = Ext.decode(response.responseText);
                            if(responseObj['success']){
                                me.getCenter().getEl().unmask();
                                Ext.TaskManager.destroy();
                                return false;
                            } else {
                                return true;
                            }
                        },
                        failure: function (response) {
                            me.getCenter().getEl().unmask();
                            Ext.TaskManager.destroy();
                            TK.Utils.makeErrMsg(response, this.errorMsg);
                        }
                    });

                },
                interval: 1000
            });
        }).delay(1000);
    },
    onUploadNsi:function (btn) {
        var grid = btn.up('grid');
        Ext.create('Ext.window.Window', {
            title:this.titleUpload,
            width:600, y:1, modal:true,
            layout:'fit',
            items:{
                xtype:'form',
                autoHeight:true,
                bodyStyle:'padding: 10px 10px 0 10px;',
                labelWidth:40,
                items:[
                    {xtype:'filefield', emptyText:this.labelSelectFile, fieldLabel:this.labelFile, name:'upload', buttonText:this.btnSearch, anchor:'100%'}
//            {xtype:'hidden', name:'search.routeId', value:routeId}
                ],
                buttons:[
                    {
                        text:this.btnSave,
                        handler:function (btn) {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url:'File_uploadNsi.do',
                                    waitMsg:'Загрузка файла...',
                                    scope:this,
                                    success:function (form, action) {
                                        form.reset();
                                        grid.store.load();
                                        btn.up('window').close();
                                    }, failure:function (form, action) {
                                        TK.Utils.makeErrMsg(action.response, 'Внимание! Ошибка чтения файла...');
                                    }
                                });
                            }
                        }
                    },
                    {
                        text:this.btnClose,
                        handler:function (btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        }).show();
    },
    onView:function (btn) {
        var list = btn.up('grid');
        if (!TK.Utils.isRowSelected(list)) {
            return false;
        }
        var data = list.selModel.getLastSelected().data;
        if (this[data.name]) {
            this[data.name]();
        }
    },
    selectRoad2Sta:function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('roadname', data.roadName);
        rec.set('roadun', data.roadUn);
        this.doLayout();
        view.up('window').close();
    },
    nsiRoutes:function (query, project) {
        return Ext.widget('nsilist', {
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleRoute;
            },
            buildStoreModel:function () {
                return ['name', 'hid', 'project'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_route';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerProject, dataIndex:'project', flex:1, renderer:TK.Utils.renderLongStr},
                    {text:this.headerRoute, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            },
            buildExtraParams:function () {
                return {'search.project':project};
            }
        });
    },
    nsiProjects:function (query) {
        return Ext.widget('nsilist', {
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleProject;
            },
            buildStoreModel:function () {
                return ['name', 'hid'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_project';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerName, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiRoad:function () {
        return Ext.widget('nsilist', {
            width:600,
            buildTitle:function (config) {
                config.title = this.titleRoad;
            },
            buildStoreModel:function () {
                return ['roadNo', 'roadName', 'roadUn'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_road';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'roadNo'},
                    {text:this.headerName, dataIndex:'roadName', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    selectManager2Sta:function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('managno', data.managNo);
        rec.set('managun', data.managUn);
        rec.set('countryname', data.countryname);
        this.doLayout();
        view.up('window').close();
    },
    nsiManagement:function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику администраций железных дорог',
            width:600,
            buildTitle:function (config) {
                config.title = this.titleManagement;
            },
            buildStoreModel:function () {
                return ['managNo', 'managName', 'managUn', 'countryname'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_management';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'managNo'},
                    {text:this.headerName, dataIndex:'managName', flex:1, renderer:TK.Utils.renderLongStr},
                    {text:this.headerCountry, dataIndex:'countryname', renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiSta:function (query) {
        var me = this,
            onRoad = Ext.bind(function () {
                var nsiGrid1 = this.getController('Nsi').nsiRoad().getComponent(0);
                nsiGrid1.on('itemdblclick', this.getController('Nsi').selectRoad2Sta, win.getComponent(0));
            }, this),
            onManager = Ext.bind(function () {
                var nsiGrid1 = this.getController('Nsi').nsiManagement().getComponent(0);
                nsiGrid1.on('itemdblclick', this.getController('Nsi').selectManager2Sta, win.getComponent(0));
            }, this),
            win = Ext.widget('nsieditlist', {
//                title:'Поиск по справочнику станций ж.д.',
                width:1000,
                prefix:'staE',
                editPrivileg:'CIM_DIR_STA',
                search:query,
                buildTitle:function (config) {
                    config.title = this.titleSta;
                },
                buildStoreModel:function () {
                    return 'TK.model.NsiSta';
                },
                buildUrlPrefix:function () {
                    return 'Sta';
                },
                buildColModel:function (config) {
                    config.items.columns = [
                        {xtype:'actioncolumn', width:55,
                            items:[
                                {icon:'./resources/images/save.gif', tooltip:this.ttipSave, action:'save', handler:me.onSaveRecord, getClass:this.onGetClass, scope:this},
                                {icon:'./resources/images/delete.png', tooltip:this.ttipDel, action:'del', handler:me.onDelRecord, getClass:this.onGetClass, scope:this}
                            ]
                        },
                        {text:this.headerStn, dataIndex:'staName', flex:1, editor:{xtype:'textfield', maxLength:100}, /*sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false,*/ renderer:TK.Utils.renderLongStr},
                        {text:this.headerStn1, dataIndex:'staNameCh', flex:1, editor:{xtype:'textfield', maxLength:100},  renderer:TK.Utils.renderLongStr},
                        {text:this.headerStn2, dataIndex:'staNameEn', flex:1, editor:{xtype:'textfield', maxLength:100},  renderer:TK.Utils.renderLongStr},
                        {text:this.headerCode, dataIndex:'staNo', editor:{xtype:'textfield', maxLength:8}},
                        {text:this.headerZhD, dataIndex:'roadname', editor:{xtype:'trigger', maxLength:254, triggerCls:'dir', onTriggerClick:onRoad, editable:false}},
                        {text:this.headerCodeAdm, dataIndex:'managno', editor:{xtype:'trigger', maxLength:5, triggerCls:'dir', onTriggerClick:onManager, editable:false}},
                        {text:this.headerCountry, dataIndex:'countryname'/*editor:{xtype:'textfield', maxLength:232},*/ }
                    ];
                },
                newRecord:function () {
                    return Ext.create('TK.model.NsiSta', {});
                },
                onBeforeEdit:function (editor, props) {
                    if (!tkUser.hasPriv(this.editPrivileg) || props.record.get('ro') == '1') { // switch off editing
                        return false;
                    }
                },
                onGetClass:function (value, meta, record) {
                    if (tkUser.hasPriv(this.editPrivileg) && record.get('ro') == '1') {
                        return 'hide_el';
                    }
                    /*if (record.get('ro') == '0') {
                        return 'show_el';
                    }*/
                },
                prepareData:function (rec) {
                    var data = {};
                    data[this.prefix + '.stUn'] = rec.data['stUn'];
                    data[this.prefix + '.staName'] = rec.data['staName'];
                    data[this.prefix + '.staNameCh'] = rec.data['staNameCh'];
                    data[this.prefix + '.staNameEn'] = rec.data['staNameEn'];
                    data[this.prefix + '.staNo'] = rec.data['staNo'];
                    data[this.prefix + '.road.roadUn'] = rec.data['roadun'];
                    data[this.prefix + '.management.managUn'] = rec.data['managun'];
                    return data;
                }
            });
        return win;
    },
    nsiCountries:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику стран',
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleCountries;
            },
            buildStoreModel:function () {
                return ['kod', 'abc2', 'sokrNam', 'naim'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_countries';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'abc2'},
                    {text:this.headerCountry, dataIndex:'naim', flex:1, renderer:TK.Utils.renderLongStr},
                    {text:this.headerWay, dataIndex:'sokrNam'}
                ];
            }
        });
    },
    nsiCountriesGd:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику стран ж.д.',
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleCountriesZhd;
            },
            buildStoreModel:function () {
                return ['roadNo', 'managNo', 'roadName', 'countryName', 'roadUn'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_countriesGd';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerWayCode, dataIndex:'roadNo'},
                    {text:this.headerCodeAdm, dataIndex:'managNo'},
                    {text:this.headerZhD, dataIndex:'roadName', flex:1, renderer:TK.Utils.renderLongStr},
                    {text:this.headerCountry, dataIndex:'countryName', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDangCode:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику опасных грузов',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleDangerous;
            },
            buildStoreModel:function () {
                return ['hid', 'code', 'descr'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_dangCode';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'code'},
                    {text:this.headerName, dataIndex:'descr', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiKarantin:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику карантинных грузов',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleKarantin;
            },
            buildStoreModel:function () {
                return ['hid', 'kgvn', 'nzgr'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_karantin';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'kgvn'},
                    {text:this.headerName, dataIndex:'nzgr', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiVeterin:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику ветеринарных грузов',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleVeterin;
            },
            buildStoreModel:function () {
                return ['hid', 'kgvn', 'nzgr'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_veterin';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'kgvn'},
                    {text:this.headerName, dataIndex:'nzgr', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    selectGng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('kgvn').setValue(data.code);
        this.getComponent('nzgr').setValue(data.name);
        view.up('window').close();
    },
    nsiGng:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ГНГ',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleGng;
            },
            buildStoreModel:function () {
                return ['hid', 'code', 'name', {name: 'ohr', type: 'boolean'}];
            },
            buildUrlPrefix:function () {
                return 'Nsi_gng';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'code'},
                    {text:this.headerName, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    cargoGng:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ГНГ',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleGng;
            },
            buildStoreModel:function () {
                return ['c_gn_un', 'cargo_group', 'cargo_fullname'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_cargoGng';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'cargo_group'},
                    {text:this.headerName, dataIndex:'cargo_fullname', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    selectEtsng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ekgvn').setValue(data.code);
        this.getComponent('enzgr').setValue(data.name);
        view.up('window').close();
    },
    nsiEtsng:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ЕТ СНГ',
            width:700,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleEtsng;
            },
            buildStoreModel:function () {
                return ['hid', 'code', 'name', {name: 'ohr', type: 'boolean'}];
            },
            buildUrlPrefix:function () {
                return 'Nsi_etsng';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'code'},
                    {text:this.headerName, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG23:function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику видов документов',
            width:700,
            buildTitle:function (config) {
                config.title = this.titleDocs;
            },
            buildStoreModel:function () {
                return ['nsiFDesc', 'nsiFDsc2', 'nsiFDsc3', 'nsiFNn', 'nsiFNcas'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams:function () {
                return {type:9};
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCoedEdi, dataIndex:'nsiFNn'},
                    {text:this.headerCustCode, dataIndex:'nsiFNcas'},
                    {text:this.headerName1, dataIndex:'nsiFDesc', flex:1, renderer:TK.Utils.renderLongStr},
                    {text:this.headerName2, dataIndex:'nsiFDsc3', flex:1},
                    {text:this.headerName3, dataIndex:'nsiFDsc2', flex:1}
                ];
            }
        });
    },
    nsiPlat:function (query) {
        var me = this;
        return Ext.widget('nsieditlist', {
//            title:'Поиск по справочнику плательщиков по железным дорогам (экспедиторы)',
            width:750,
            search:query,
            editPrivileg:'CIM_DIR_PLAT',
            buildTitle:function (config) {
                config.title = this.titlePlat;
            },
            buildStoreModel:function () {
                return 'TK.model.SmgsPlat';
            },
            buildUrlPrefix:function () {
                return 'NsiPlatel';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {xtype:'actioncolumn', width:55,
                        items:[
                            {icon:'./resources/images/save.gif', tooltip:this.ttipSave, action:'save', handler:me.onSaveRecord},
                            {icon:'./resources/images/delete.png', tooltip:this.ttipDel, action:'del', handler:me.onDelRecord}
                        ]
                    },
                    {text:this.headerCodeAdm, dataIndex:'dorR', editor:{xtype:'combo', maxLength:5, store:['РЖД', 'УЗ', 'БЧ', 'УТИ', 'КЗХ', 'КРГ', 'ЖСР'], typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true}},
                    {text:this.headerName, dataIndex:'platR', flex:2, editor:{xtype:'textfield', maxLength:45}, renderer:TK.Utils.renderLongStr},
                    {text:this.headerPayerMeth, dataIndex:'primR', flex:1, editor:{xtype:'textfield', maxLength:70}, renderer:TK.Utils.renderLongStr},
                    {text:this.headerPayerCode, dataIndex:'kplat', editor:{xtype:'textfield', maxLength:50}},
                    {text:this.headerPayerCode1, dataIndex:'kplat1', editor:{xtype:'textfield', maxLength:50}},
                    {text:this.headerPayerCode2, dataIndex:'kplat2', editor:{xtype:'textfield', maxLength:50}}
                ];
            },
            newRecord:function () {
                return Ext.create('TK.model.SmgsPlat', {dorR:'', platR:'', primR:'', kplat:'', kplat1:'', hid:''});
            }
        });
    },
    nsiOtpr:function (query) {
        var me = this,
            onStrana = Ext.bind(function () {
                var nsiGrid1 = this.getController('Nsi').nsiCountries().getComponent(0);
                nsiGrid1.on('itemdblclick', this.getController('Nsi').selectCountriesNsiOtpr, win.getComponent(0));
            }, this),
            win = Ext.widget('nsieditlist', {
//                title:'Поиск по справочнику юридических лиц (отправителей/получателей)',
                width:850,
                maximizable: true,
                search:query,
                editPrivileg:'CIM_DIR',
                buildTitle:function (config) {
                    config.title = this.titleOtpr;
                },
                buildStoreModel:function () {
                    return 'TK.model.SmgsOtpr';
                },
                buildUrlPrefix:function () {
                    return 'NsiSmgsG1';
                },
                buildColModel:function (config) {
                    config.items.columns = [
                        {xtype:'actioncolumn', width:55,
                            items:[
                                {icon:'./resources/images/save.gif', tooltip:this.ttipSave, action:'save', handler:me.onSaveRecord},
                                {icon:'./resources/images/delete.png', tooltip:this.ttipDel, action:'del', handler:me.onDelRecord}
                            ]
                        },
                        {text:this.headerName, dataIndex:'g1r', flex:5, editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
                        {text:this.headerCountryCode, dataIndex:'g_1_5k', flex:1, editor:{xtype:'textfield', maxLength:3}},
                        {text:this.headerCountryName, dataIndex:'g16r', flex:4, editor:{xtype:'trigger', maxLength:550, triggerCls:'dir', onTriggerClick:onStrana}, renderer:TK.Utils.renderLongStr},
                        {text:this.headerCity, dataIndex:'g18r_1', flex:4, editor:{xtype:'textfield', maxLength:32}},
                        {text:this.headerAddress, dataIndex:'g19r', flex:5, editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
                        {text:'код ТГНЛ', dataIndex:'g2', flex:3, editor:{xtype:'textfield', maxLength:32}},
                        {text:'код ОКПО', dataIndex:'g3', flex:3, editor:{xtype:'textfield', maxLength:32}},
                        {text:'код ИНН', dataIndex:'g_2inn', flex:3, editor:{xtype:'textfield', maxLength:32}}
                    ];
                },
                newRecord:function () {
                    return Ext.create('TK.model.SmgsOtpr', {g1r:'', g_1_5k:'', g16r:'', g18r_1:'', g19r:'', g2:'', g3:'', g_2inn:'', hid:''});
                }
            });

        return win;
    },
    onG24:function () {
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
    onG24B:function () {
        var arr, g15 = this.ownerCt.getComponent('smgs._g24B');
        if (this.getValue()) {
            arr = (this.getValue() + '').split('.');
            g15.setText(TK.Utils.num2str(arr[0]) + (arr[1] ? '.' + arr[1] : '') + ' кг');
        } else {
            g15.setText('');
        }
    },
    nsiDocG7:function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width:500,
            buildTitle:function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel:function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams:function () {
                return {type:7};
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'nsiFNn'},
                    {text:this.headerName1, dataIndex:'nsiFDesc', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG9:function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width:500,
            buildTitle:function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel:function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams:function () {
                return {type:9};
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'nsiFNn'},
                    {text:this.headerName1, dataIndex:'nsiFDesc', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDocG13:function () {
        return Ext.widget('nsilist', {
//            title:'Справочник документов',
            width:500,
            buildTitle:function (config) {
                config.title = this.titleDocs1;
            },
            buildStoreModel:function () {
                return ['nsiFNn', 'nsiFDesc'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_fieldsOpt';
            },
            buildExtraParams:function () {
                return {type:13};
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'nsiFNn'},
                    {text:this.headerName1, dataIndex:'nsiFDesc', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiCurrency:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику валют',
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleCurrency;
            },
            buildStoreModel:function () {
                return ['hid', 'abv3', 'name'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_currency';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'abv3'},
                    {text:this.headerDescr, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiTnved:function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику кодов ТНВЭД',
            width:600,
            buildTitle:function (config) {
                config.title = this.titleTnved;
            },
            buildStoreModel:function () {
                return ['hid', 'kod', 'naim'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_tnved';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'kod'},
                    {text:this.headerDescr, dataIndex:'naim', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiDeliv:function (query) {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику условий поставки',
            width:600,
            search:query,
            buildTitle:function (config) {
                config.title = this.titleDeliv;
            },
            buildStoreModel:function () {
                return ['hid', 'kod', 'name'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_deliv';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'kod'},
                    {text:this.headerDescr, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiUpak:function () {
        return Ext.widget('nsilist', {
//            title:'Поиск по справочнику видов упаковки',
            width:600,
            buildTitle:function (config) {
                config.title = this.titleUpak;
            },
            buildStoreModel:function () {
                return ['hid', 'kod', 'kypk', 'name'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_upak';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerCode, dataIndex:'kod'},
                    {text:this.headerDescr, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                ];
            }
        });
    },
    nsiGroups:function () {
        return Ext.widget('nsilist', {
//            title:this.title1,
            width:500, height:500,
            buildTitle:function (config) {
                config.title = this.title1;
            },
            buildStoreModel:function () {
                return ['name', 'descr'];
            },
            buildUrlPrefix:function () {
                return 'Nsi_groups';
            },
            buildColModel:function (config) {
                config.items.columns = [
                    {text:this.headerName, dataIndex:'name', flex:1},
                    {text:this.headerDescr, dataIndex:'descr', flex:2, renderer:TK.Utils.renderLongStr}
                ];
            },
            buildGridDockedItems:function (config) {
                config.items.dockedItems = [
                    {
                        dock:'top',
                        xtype:'toolbar',
                        items:{
                            xtype:'searchfield',
                            store:config.items.store
                        }
                    }
                ]
            }
        });
    },

    selectCountriesNsiOtpr:function (view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('g_1_5k', data.abc2);
        rec.set('g16r', data.naim);
        view.up('window').close();
    },
    selectCountriesG1:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data.naim);
        view.up('window').close();
    },
    selectCountriesG5:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data.naim);
        view.up('window').close();
    },
    selectPlatG4:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('dorR').setValue(data['dorR']);
        this.getComponent('platR').setValue(data['platR']);
        this.getComponent('primR').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
        if (this.getComponent('kplat2')) {
            this.getComponent('kplat2').setValue(data['kplat2']);
        }
        view.up('window').close();
    },
    selectGroup:function (view, record, item, index) {
        var data = record.data,
            rec = this.selModel.getLastSelected();
        rec.set('name', data.name);
        view.up('window').close();
    },
    selectDocG23: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('ncas').setValue(data['nsiFNcas']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        this.getComponent('text2').setValue(data['nsiFDsc3']);
        view.up('window').close();
    },
    onAddRecord:function (btn) {
        var owner = btn.up('nsieditlist'), grid = owner.getComponent(0), /*ind = grid.store.getCount(),*/
            r = owner.newRecord(), rowEditing = grid.plugins[0];
        rowEditing.cancelEdit();
        grid.store.insert(0, r);
        rowEditing.startEditByPosition({row:0, column:0});
    },
    onDivFocus:function () {
        this.removeCls('bg-c-white');
        this.addCls('div-active');
    },
    onSaveRecord:function (grid, rowIndex, colIndex) {
        var rec = grid.store.getAt(rowIndex), errors = rec.validate(), owner = grid.up('nsieditlist'), rowEditing = grid.ownerCt.plugins[0];
        rowEditing.completeEdit();
        if (errors.isValid()) {
            Ext.Ajax.request({
                url:owner.buildUrlPrefix() + '_save.do',
                params:owner.prepareData(rec),
                success:function (response, options) {
                    grid.store.load();
                },
                failure:function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    onDelRecord:function (grid, rowIndex, colIndex) {
        var rec = grid.store.getAt(rowIndex), data = rec.data, owner = grid.up('nsieditlist');
        if (!rec.phantom) {
            Ext.Ajax.request({
                url:owner.buildUrlPrefix() + '_delete.do',
                params:owner.prepareData(rec),
//                params: {task: 'delete', 'nsi.hid':data.hid},
                success:function (response, options) {
                    grid.store.load();
                },
                failure:function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        } else {
            grid.store.remove(rec);
        }
    },
    onRowclick: function(field, newValue, oldValue){
        var grid = view.up('grid'),
            btn = grid.getDockedComponent('top').getComponent('export2Excel'),
            hid = grid.selModel.getLastSelected().get('hid');

        if(btn){
            if(hid != 100){
                btn.enable();
            } else {
                btn.disable();
            }
        }
    }
});