Ext.define('TK.view.smgs2.Smgs2Form', {
    extend: 'TK.view.DocsForm',

    alias:'widget.smgs2',

    buildItems:function (config) {
        config.items = [
            {xtype:'box', autoEl:{tag:'img', src:'resources/images/smgs2.png'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value: 12},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value: 7},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'smgs.ready', itemId:'smgs.ready'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'smgs2'},
            {xtype:'hidden', name:'smgs.cimSmgs.hid', itemId:'smgs.cimSmgs.hid'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'hidden', name:'smgs.ftsStatus', itemId:'smgs.ftsStatus'},
            {xtype:'hidden', name:'smgs.btlc_status', itemId:'smgs.btlc_status'},
            {xtype:'hidden', name:'smgs.tdg_status1', itemId:'smgs.tdg_status1'},

            {x:451, y:38, xtype:'label', text:'Номер поезда:'},
            {x:537, y:33, name:'smgs.npoezd', itemId:'smgs.npoezd', maxLength:32, width:161},

            {x:11, y:86, xtype: 'displayfield', itemId:'smgs.perevozchik', width:160, /*cls: 'rotate',*/ hideLabel: true},

            //// 1. Отправитель
            {x:506, y:87, name:'smgs.g2_', itemId:'smgs.g2_', maxLength: 32, width: 112},
            {xtype:'textarea', x:75, y:110, width:545, height:70, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:190, y:80,
                action:'change',
                itemId:'g1_'
            },
            {x:147, y:185, name:'smgs.g14', itemId:'smgs.g14_', maxLength:64, width:465},

            /// 4. Получатель
            {x:506, y:214, name:'smgs.g5_', itemId:'smgs.g5_', maxLength:32, width: 112},
            {xtype:'textarea', x:75, y:238, width:545, height:100, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:190, y:213,
                action:'change',
                itemId:'g4_'
            },

            // 29. Отправка №
            {x:920, y:26, name:'smgs.g694', itemId:'smgs.g694', maxLength:50, width:248},

            // 2. Станция отправления
            {x:1061, y:82, name:'smgs.g692', itemId:'smgs.g692', maxLength:6, width:109},
            {x:627, y:111, xtype:'trigger', name:"smgs.g162r", itemId:"smgs.g162r", maxLength:80, triggerCls:'dir', width:280},
            {x:920, y:111, name:'smgs.g163r', itemId:'smgs.g163r', maxLength:6, width:250},

            // 3. Заявления отправителя
            {x:627, y:161, xtype:'textarea', name:'smgs.zayav_otpr', itemId:'smgs.zayav_otpr', maxLength:1024, width:540, height:228},
            {x:814, y:138, xtype:'checkbox', name:'smgs.zayav_otpr_c', inputValue:'1', itemId:'smgs.zayav_otpr_c', boxLabel:'Доп. лист'},

            // 5. Станция назначения
            {x:510, y:346, name:'smgs.g121', itemId:'smgs.g121', maxLength:6, width:110},
            {x:5, y:378, xtype:'trigger', name:"smgs.g101r", itemId:"smgs.g101r", maxLength:80, triggerCls:'dir', width:370},
            {x:383, y:378, name:'smgs.g102r', itemId:'smgs.g102r', maxLength:80, width:236},

            // 6. Пограничные станции переходов
            {xtype:'textarea', x:5, y:452, width:375, height:178, readOnly:true, name:'disp.g6', itemId:'disp.g6', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:246, y:429,
                action:'change',
                itemId:'g6_'
            },

            // 21. Способ определения массы
            {x:910, y:953, xtype:'textarea', name:'smgs.gs_48', itemId:'smgs.gs_48', maxLength:50, width:260, height:60},

            // 20. Погружено
            {x:911, y:910, xtype:'radio', fieldLabel : 'отправитель', name:'smgs.g22', inputValue:'1', itemId:'smgs.g22_o', checked:true},
            {x:1050, y:910, xtype:'radio', fieldLabel : 'перевозчик', name:'smgs.g22', inputValue:'2', itemId:'smgs.g22_p'},

            // 22. Перевозчики
            //{xtype:'textarea', x:559, y:1045, width:610, height:315, readOnly:true, name:'disp.g22', itemId:'disp.g22', submitValue:false},
            {xtype:'component', x:559, y:1045, width:610, height:315, itemId:'disp.g22',
                autoEl:{tag:'div', cls:'bg-c-white', children:[
                    {tag:'table'}
                ]}
            },
            {
                xtype:'button',
                text:this.btnChange,
                x:773, y:1018,
                action:'change',
                itemId:'g22_'
            },

            // 23. Уплата провозных платежей
            {xtype:'textarea', x:5, y:1095, width:550, height:183, readOnly:true, name:'disp.g23', itemId:'disp.g23', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:235, y:1074,
                action:'change',
                itemId:'g23_'
            },
            {x:338, y:1073, xtype:'checkbox', name:'smgs.g7c', inputValue:'1', itemId:'smgs.g7c', boxLabel:'Доп. лист'},

            // 24. Документы, приложенные отправителем
            {xtype:'textarea', x:5, y:1303, width:550, height:174, readOnly:true, name:'disp.g24', itemId:'disp.g24', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:312, y:1279,
                action:'change',
                itemId:'g24_'
            },

            // 25. Информация, не предн. для перевозчика, № договора на поставку
            {x:560, y:1383, xtype:'textarea', name:'smgs.g141', itemId:'smgs.g141', maxLength:1024, width:610, height:93},
            {x:1092, y:1360, xtype:'checkbox', name:'smgs.g141c', inputValue:'1', itemId:'smgs.g141c', boxLabel:'Доп. лист'},

            // 26. Дата заключения договора перевозки
            {x:60, y:1511, xtype:'datefield', name:'smgs.g281', itemId:'smgs.g281', width:80},

            // 28. Отметки для выполнения таможенных и других административных формальностей
            {x:560, y:1500, xtype:'textarea', name:'smgs.g26', itemId:'smgs.g26', maxLength:128, width:610, height:180},
            {x:1128, y:1477, xtype:'checkbox', name:'smgs.g26c', inputValue:'1', itemId:'smgs.g26c', boxLabel:'Доп. лист'},

            // 15. Примечание
            {x:3, y:960, xtype:'label', text:'Примечание', style:'font-weight:bold;'},
            {x:3, y:975, xtype:'textarea', width:554, height:40, name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024},

            // 7-12. Вагон
            //{xtype:'textarea', x:383, y:447, width:560, height:186, readOnly:true, name:'disp.g7v', itemId:'disp.g7v', submitValue:false},
            {xtype:'component', x:383, y:447, width:560, height:186, itemId:'disp.g7v',
                autoEl:{tag:'div', cls:'bg-c-white', children:[
                    {tag:'table'}
                ]}
            },
            {
                xtype:'button',
                text:this.btnChangeWagen,
                x:460, y:423,
                action:'change',
                itemId:'g7v_'
            },
            // Контейнер
            {xtype:'textarea', x:3, y:1015, width:556, height:58, readOnly:true, name:'disp.g7k', itemId:'disp.g7k', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:437, y:1017,
                action:'change',
                itemId:'g7k_'
            },

            // 15-18. Груз
            {xtype:'component', x:3, y:655, width:903, height:322, itemId:'disp.g7g',
                autoEl:{tag:'div', cls:'bg-c-white', children:[
                    {tag:'table'}
                ]}
            },
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:174, y:636,
                action:'change',
                itemId:'g7g_'
            },

            // нетто, тара, брутто
            {xtype:'hidden', name:'smgs.g24N', itemId:'smgs.g24N'},
            {x:792, y:975, xtype:'label', text:'Т: ', style:'font-weight:bold;'},
            {x:808, y:975, xtype:'numberfield', name:'smgs.g24T', itemId:'smgs.g24T', maxLength:10, width:100, minValue:0, readOnly: true},
            {x:792, y:997, xtype:'label', text:'Б: ', style:'font-weight:bold;'},
            {x:808, y:997, xtype:'numberfield', name:'smgs.g24B', itemId:'smgs.g24B', maxLength:10, width:100, minValue:0},

            //// 1. Отправитель
            {
                xtype:'detailpanel',
                x:400, y:100, width:400, height:355,
                itemId:'g1_panel',
                title:this.labelSender,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                bodyPadding:5,
                items:[
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelName,
                        layout:'hbox',
                        itemId:'naim',
                        items:[
                            {xtype:'textarea', name:"smgs.g1r", itemId:"smgs.g1r", maxLength:512, flex:1},
                            {xtype:'button', text:'...', action:'otpr', margins:'0 0 0 5'}
                        ]
                    },
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelCountry,
                        layout:'hbox',
                        itemId:'strn',
                        items:[
                            {xtype:'textfield', name:'smgs.g15_1', itemId:'smgs.g15_1', maxLength:3, width:50},
                            {xtype:'trigger', name:"smgs.g16r", itemId:"smgs.g16r", maxLength:550, triggerCls:'dir', flex:1, margins:'0 0 0 5'}
                        ]
                    },
                    {fieldLabel:this.labelCity, name:'smgs.g18r_1', itemId:'smgs.g18r_1', maxLength:32},
                    {fieldLabel:this.labelAdress, xtype:'textarea', name:'smgs.g19r', itemId:'smgs.g19r', maxLength:250},
                    //{fieldLabel:'Код ТГНЛ', name:'smgs.g2_1', itemId:'smgs.g2_1', maxLength:32},
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:'Код ОКПО',
                        layout:'hbox',
                        itemId:'code_p1',
                        items:[
                            {xtype:'textfield', name:'smgs.g2', itemId:'smgs.g2', maxLength:32, flex:7},
                            {xtype:'label', text:'Код ИИН:', flex:6, margins:'0 0 0 10'},
                            {xtype:'textfield', name:'smgs.g_2inn', itemId:'smgs.g_2inn', maxLength:32, flex:8, margins:'0 0 0 5'}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var container,
                        field,
                        row1 = '', row2 = '', row3 = '',
                        result = '';

                    // 1 row
                    container = this.getComponent('naim');
                    field = container.getComponent('smgs.g1r');
                    row1 += field.getValue() ? field.getValue() : '';

                    container = this;
                    /*field = container.getComponent('smgs.g2_1');
                     if (field.getValue()) {
                     row1 += row1 ? ' ' : '';
                     row1 += 'ТГНЛ ' + field.getValue();
                     }
                     row1 += row1 ? ';' : '';*/

                    container = this.getComponent('code_p1');
                    field = container.getComponent('smgs.g2');
                    if (field.getValue()) {
                        row1 += row1 ? ' ' : '';
                        row1 += 'ОКПО ' + field.getValue();
                        row1 += row1 ? ';' : '';
                    }

                    // 2 row
                    container = this.getComponent('code_p1');
                    field = container.getComponent('smgs.g_2inn');
                    row2 += field.getValue() ? 'ИИН ' + field.getValue() : '';

                    // 3 row
                    container = this.getComponent('strn');
                    field = container.getComponent('smgs.g15_1');
                    row3 += field.getValue() ? field.getValue() : '';

                    container = this.getComponent('strn');
                    field = container.getComponent('smgs.g16r');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }
                    row3 += row3 ? ';' : '';

                    container = this;
                    field = container.getComponent('smgs.g18r_1');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                        row3 += row3 ? ';' : '';
                    }

                    container = this;
                    field = container.getComponent('smgs.g19r');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }

                    // result
                    result = row1 ? row1 : '';
                    if (row2) {
                        result += result ? '\n' : '';
                        result += row2;
                    }

                    if (row3) {
                        result += result ? '\n' : '';
                        result += row3;
                    }

                    this.ownerCt.getComponent('disp.g1').setValue(result);
//                    this.ownerCt.getComponent('smgs.g2_').setValue(this.getComponent('code_p1').getComponent('smgs.g2').getValue());
                },
                copyValues2MainFlds:function () {
                    for (var prop in this.bufData) {
                        if (this.getComponent('smgs.' + prop)) {
                            this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
                        }
                    }
                    this.getComponent('naim').getComponent('smgs.g1r').setValue(this.bufData.g1r);
                    this.getComponent('strn').getComponent('smgs.g15_1').setValue(this.bufData.g15_1);
                    this.getComponent('strn').getComponent('smgs.g16r').setValue(this.bufData.g16r);
                },
                copyValues2Buf:function () {
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) {
                            item.items.each(function (itm, index, length) {
                                if (itm.itemId) {
                                    this.bufData[itm.itemId.split('.')[1]] = itm.getValue();
                                }
                            }, this);
                        } else {
                            this.bufData[item.itemId.split('.')[1]] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var data = this.ownerCt.dataObj, arr;
                    this.items.each(function (item, index, length) {
                        if (item.items) {
                            item.items.each(function (itm, index, length) {
                                if (itm.itemId) {
                                    arr = itm.itemId.split('.');
                                    this.bufData[arr[1]] = data[arr[1]];
                                }
                            }, this);
                        } else {
                            arr = item.itemId.split('.');
                            this.bufData[arr[1]] = data[arr[1]];
                        }
                    }, this);
                }
            },

            /// 4. Получатель
            {
                xtype:'detailpanel',
                x:400, y:100, width:400, height:355,
                itemId:'g4_panel',
                title:this.labelReceiver,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                bodyPadding:5,
                items:[
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelName,
                        layout:'hbox',
                        itemId:'naim',
                        items:[
                            {xtype:'textarea', name:"smgs.g4r", itemId:"smgs.g1r_1", maxLength:512, flex:1},
                            {xtype:'button', text:'...', action:'poluch', margins:'0 0 0 5'}
                        ]
                    },
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelCountry,
                        layout:'hbox',
                        itemId:'strn',
                        items:[
                            {xtype:'textfield', name:'smgs.g45_1', itemId:'smgs.g_1_5k_1', maxLength:3, width:50},
                            {xtype:'trigger', name:"smgs.g46r", itemId:"smgs.g16r_1", maxLength:550, triggerCls:'dir', flex:1, margins:'0 0 0 5'}
                        ]
                    },
                    {fieldLabel:this.labelCity, name:'smgs.g48r', itemId:'smgs.g18r_1_1', maxLength:32},
                    {fieldLabel:this.labelAdress, xtype:'textarea', name:'smgs.g49r', itemId:'smgs.g19r_1', maxLength:250},
                    //{fieldLabel:'Код ТГНЛ', name:'smgs.g5_1', itemId:'smgs.g5_1', maxLength:32},
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:'Код ОКПО',
                        layout:'hbox',
                        itemId:'code_p5',
                        items:[
                            {xtype:'textfield', name:'smgs.g5', itemId:'smgs.g5', maxLength:32, flex:7},
                            {xtype:'label', text:'Код ИИН:', flex:6, margins:'0 0 0 10'},
                            {xtype:'textfield', name:'smgs.g_5inn', itemId:'smgs.g_5inn', maxLength:32, flex:8, margins:'0 0 0 5'}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var container,
                        field,
                        row1 = '', row2 = '', row3 = '',
                        result = '';

                    // 1 row
                    container = this.getComponent('naim');
                    field = container.getComponent('smgs.g1r_1');
                    row1 += field.getValue() ? field.getValue() : '';

                    /*container = this;
                     field = container.getComponent('smgs.g5_1');
                     if (field.getValue()) {
                     row1 += row1 ? ' ' : '';
                     row1 += 'ТГНЛ ' + field.getValue();
                     }
                     row1 += row1 ? ';' : '';*/

                    container = this.getComponent('code_p5');
                    field = container.getComponent('smgs.g5');
                    if (field.getValue()) {
                        row1 += row1 ? ' ' : '';
                        row1 += 'ОКПО ' + field.getValue();
                        row1 += row1 ? ';' : '';
                    }

                    // 2 row
                    container = this.getComponent('code_p5');
                    field = container.getComponent('smgs.g_5inn');
                    row2 += field.getValue() ? 'ИИН ' + field.getValue() : '';

                    // 3 row
                    container = this.getComponent('strn');
                    field = container.getComponent('smgs.g_1_5k_1');
                    row3 += field.getValue() ? field.getValue() : '';

                    container = this.getComponent('strn');
                    field = container.getComponent('smgs.g16r_1');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }
                    row3 += row3 ? ';' : '';

                    container = this;
                    field = container.getComponent('smgs.g18r_1_1');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                        row3 += row3 ? ';' : '';
                    }

                    container = this;
                    field = container.getComponent('smgs.g19r_1');
                    if (field.getValue()) {
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }

                    // result
                    result = row1 ? row1 : '';
                    if (row2) {
                        result += result ? '\n' : '';
                        result += row2;
                    }

                    if (row3) {
                        result += result ? '\n' : '';
                        result += row3;
                    }

                    this.ownerCt.getComponent('disp.g4').setValue(result);
                },
                copyValues2MainFlds:function () {
                    this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
                    this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
                    this.getComponent('naim').getComponent('smgs.g1r_1').setValue(this.bufData.g4r);
                    this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(this.bufData.g45_1);
                    this.getComponent('strn').getComponent('smgs.g16r_1').setValue(this.bufData.g46r);
                },
                copyValues2Buf:function () {
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) {
                            item.items.each(function (itm, index, length) {
                                if (itm.itemId) {
                                    this.bufData[itm.name.split('.')[1]] = itm.getValue();
                                }
                            }, this);
                        } else {
                            this.bufData[item.name.split('.')[1]] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var data = this.ownerCt.dataObj, arr;
                    this.items.each(function (item, index, length) {
                        if (item.items) {
                            item.items.each(function (itm, index, length) {
                                if (itm.itemId) {
                                    arr = itm.name.split('.');
                                    this.bufData[arr[1]] = data[arr[1]];
                                }
                            }, this);
                        } else {
                            arr = item.name.split('.');
                            this.bufData[arr[1]] = data[arr[1]];
                        }
                    }, this);
                }
            },

            // 6. Пограничные станции переходов
            {
                xtype:'detailpanel',
                x:300, y:200, width:400,
                itemId:'g6_panel',
                title:this.labelBorderStn,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses13',
                        itemId:'g6_panel_tab_13',

                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeStn, itemId:"text", maxLength:500, triggerCls:'dir', width:210},
                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"text2", maxLength:240, width:200},
                            {xtype:'textfield', labelWidth: 120, fieldLabel:'Сокр. наим. ж.д. ', itemId:"road_s_name_r", maxLength:24, width:200},
                            {xtype:'hidden', itemId:"code", value:'1'},
                            {xtype:'hidden', itemId:"fieldNum", value:'13'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f13 = '', _f13_1 = '', g = this.ownerCt.getComponent('disp.g6'), tabP = this.getComponent('g6_panel_tab_13');
                    tabP.items.each(
                        function (item, index, length) {
                            _f13 += item.getComponent('text').getValue() + " " + item.getComponent('text2').getValue() + " " + item.getComponent('road_s_name_r').getValue() + "\n";
                        }
                    );
                    g.setValue((_f13 + _f13_1));
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
//	        					tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//					    	item.setActiveTab(0);
                        }
                        else if (item.itemId) { // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function () { // panel
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function (itm, ind, len) { // tab
                                this.bufData[tCN][ind] = {};
                                itm.items.each(function (field, i, l) { // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }
                        /*else if (item.itemId) { // input field
                         this.bufData['g13c'] = item.getValue();
                         }*/
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g6_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },

            //  19. Пломбы
            {x:910, y:693, width:260, height:203, xtype:'detailgrid', hideHeaders:true, itemId:'g19_panel',
                doc:'smgs',
                coll:'cimSmgsPlombs',
                buildStore:function (config) {
                    config.store = new Ext.data.ArrayStore({
                        autoDestroy:true,
                        model:'TK.model.SmgsPlomb'
                    });
                },
                buildColModel:function (config) {
                    config.columns = [
                        {text:'Количество', dataIndex:'kpl', width:55, editor:{xtype:'numberfield', maxLength:3, minValue:0}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {text:'Пломба', dataIndex:'znak', width:200, editor:{xtype:'textfield', maxLength:128}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                    ];
                },
                newRecord:function () {
                    return Ext.create('TK.model.SmgsPlomb', {});
                },
                copyValues2MainFlds:function () {
                    var coll = this.bufData, rows = new Array();
                    for (var index in coll) {
                        var row = new Array();
                        row.push(coll[index]['kpl']);
                        row.push(coll[index]['znak']);
                        row.push(coll[index]['type']);
                        row.push(coll[index]['sort']);
                        row.push(coll[index]['hid']);
                        rows.push(row);
                    }
                    this.store.loadData(rows);
                },
                initBuf:function () {
                    this.bufData = this.ownerCt.dataObj[this.coll] || {};
                }
            },

            // 22. Перевозчики
            {
                xtype:'detailpanel',
                x:700, y:1000, width:400,
                itemId:'g22_panel',
                title:'Перевозчики',
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsPerevoz',
                        itemId:'g22_panel_tab',

                        tabItems:[
                            {xtype:'trigger', fieldLabel:'Перевозчик', itemId:"namPer", maxLength:24, triggerCls:'dir'},
                            {xtype:'trigger', fieldLabel:'Участок от', itemId:"stBeg", maxLength:48, triggerCls:'dir'},
                            {xtype:'trigger', fieldLabel:'Участок до', itemId:"stEnd", maxLength:48, triggerCls:'dir'},
                            {xtype:'textfield', fieldLabel:'Код станции от', itemId:"codStBeg", maxLength:6},
                            {xtype:'textfield', fieldLabel:'Код станции до', itemId:"codStEnd", maxLength:6},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var g = this.ownerCt.getComponent('disp.g22').el.dom.firstChild,
                        tab = this.getComponent('g22_panel_tab'),
                        row,
                        cell;

                    g.innerHTML = '';
                    tab.items.each(function (item, ind, length) {
                        row = g.insertRow(-1);

                        cell = row.insertCell(-1);
                        cell.className = 'td perevoz-td1';
                        cell.innerHTML = item.getComponent('namPer').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td perevoz-td2';
                        cell.innerHTML = item.getComponent('stBeg').getValue() + " - " + item.getComponent('stEnd').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td perevoz-td3';
                        cell.innerHTML = item.getComponent('codStBeg').getValue() + "<br>" + item.getComponent('codStEnd').getValue()
                    }, this);
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
                        }
                        else if (item.itemId) { // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function () { // panel
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function (itm, ind, len) { // tab
                                this.bufData[tCN][ind] = {};
                                itm.items.each(function (field, i, l) { // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }

                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g22_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },

            // 23. Уплата провозных платежей
            {
                xtype:'detailpanel',
                x:400, y:1060, width:400,
                itemId:'g23_panel',
                title:this.labelPayers,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsPlatels',
                        itemId:'g23_panel_tab',
                        tabItems:[
                            {xtype:'combo', fieldLabel:this.labelBukvKod, itemId:"dorR", maxLength:5, width:50, typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true,
                                store:['ВР', 'РЖД', 'БЧ', 'УЗ', 'ЧФМ', 'ЛГ', 'ЛДЗ', 'ЭВР', 'КЗХ', 'ГР', 'УТИ', 'ЗЧ', 'МТЗ', 'ДСВН', 'НЕОП', 'КЗД', 'ПКП', 'БДЖ', 'ЧФР', 'ЧД', 'МАВ', 'ЖСР', 'АЗ', 'АРМ', 'КРГ', 'ТЖД', 'ТРК', 'АФГ', 'ТЦДД', 'ДБ', 'РАИ']},
                            {xtype:'trigger', fieldLabel:this.labelPayerName, itemId:"platR", maxLength:45, triggerCls:'dir', width:200},
                            {xtype:'textarea', fieldLabel:this.labelThrough, itemId:"primR", maxLength:70, width:250},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod1, maxLength:50, itemId:"kplat", width:200},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod2, itemId:"kplat1", maxLength:50, width:200},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f722 = '', g = this.ownerCt.getComponent('disp.g23'), tabP;

                    tabP = this.getComponent('g23_panel_tab');
                    tabP.items.each(
                        function (item, index, length) {
                            if (item.getComponent('dorR').getValue()) {
                                _f722 += 'оплата по ' + item.getComponent('dorR').getValue() + ' ';
                            }
                            if (item.getComponent('platR').getValue()) {
                                _f722 += 'производится ' + item.getComponent('platR').getValue() + ' ';
                            }
                            if (item.getComponent('primR').getValue()) {
                                _f722 += ' ' + item.getComponent('primR').getValue() + ' ';
                            }
                            _f722 += (item.getComponent('kplat').getValue() ? 'код плательщика ' + item.getComponent('kplat').getValue() : '') +
                                (item.getComponent('kplat1').getValue() ? ' п/к ' + item.getComponent('kplat1').getValue() : '') +
                                '; ';
                        }
                    );
                    g.setValue(_f722);
                    //this.ownerCt.renderG20();
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
//	        					tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//					    	item.setActiveTab(0);
                        }
                        else if (item.itemId) { // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function () { // panel
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function (itm, ind, len) { // tab
                                this.bufData[tCN][ind] = {};
                                itm.items.each(function (field, i, l) { // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g23_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },

            // 24. Документы, приложенные отправителем
            {
                xtype:'detailpanel',
                x:400, y:1285, width:400,
                itemId:'g24_panel',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g24_panel_tab_9',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCustomsCode, itemId:"ncas", maxLength:6, triggerCls:'dir', width:100},
                            {xtype:'textarea', fieldLabel:this.labelNameRu, itemId:"text", maxLength:500, width:200},
                            {xtype:'textarea', fieldLabel:this.labelNameCh, itemId:"text2", maxLength:240, width:200},
                            {xtype:'textfield', fieldLabel:this.labelDocNum, itemId:"ndoc", maxLength:56, width:200},
                            {xtype:'datefield', fieldLabel:this.labelDate, itemId:"dat", width:80},
                            {xtype:'numberfield', fieldLabel:this.labelTotal, itemId:"ncopy", maxLength:10, width:200, allowDecimals:false, minValue:0},
                            {xtype:'hidden', itemId:"code"},
                            {xtype:'hidden', itemId:"fieldNum", value:'9'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f9 = '', _f9_1 = '', g = this.ownerCt.getComponent('disp.g24'), tabP = this.getComponent('g24_panel_tab_9');
                    tabP.items.each(
                        function (item, index, length) {
                            _f9_1 = '';
                            _f9_1 += (item.getComponent('text').getValue() ? item.getComponent('text').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ndoc').getValue() ? item.getComponent('ndoc').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('dat').getRawValue() ? 'от ' + item.getComponent('dat').getRawValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ncopy').getValue() ? item.getComponent('ncopy').getValue() + ' экз ' : '');
                            _f9 += (_f9_1 ? _f9_1 + '\n' : '');
                        }
                    );
                    g.setValue(_f9);
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
//	        					tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//					    	item.setActiveTab(0);
                        }
                        else if (item.itemId) { // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function () { // panel
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function (itm, ind, len) { // tab
                                this.bufData[tCN][ind] = {};
                                itm.items.each(function (field, i, l) { // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }
                        else if (item.itemId) { // input field
                            this.bufData['g9c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g24_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g9c'] = this.ownerCt.dataObj['g9c'];
                }
            },

            // 7-12. Вагон  // Контейнер  // 15-18. Груз
            {
                xtype:'detailpanel',
                x:280, y:500, width:400,
                itemId:'g7v_panel',
                mode:'',
                items:[
                    {xtype:'label', text:this.labelWagons, itemId:"g7v_label", cls:'th'},
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsCarLists',
                        itemId: 'g7v_panel_tab',
                        tabItems: [
                            {xtype:'textfield', fieldLabel:this.labelWagonNum, itemId:"nvag", maxLength:160, width:150},
                            {
                                xtype: 'combo',
                                queryMode: 'local',
                                forceSelection: true,
                                fieldLabel: 'Вагон предоставлен',
                                itemId:'vagOtm',
                                store: [['П', 'Перевозчиком'], ['О', 'Отправителем']]
                            },
                            {xtype:'numberfield', fieldLabel:'Грузоподьемность', itemId:"grPod", maxLength:10, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, itemId:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTara, itemId:"taraVag", maxLength:10, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'textfield', fieldLabel:'Тип цистерны', itemId:"cicternType", maxLength:24, width:100},
                            {xtype:'checkbox', fieldLabel:'Сцеп?', itemId:'scep', inputValue:'1', uncheckedValue:0},
                            {xtype:'textfield', fieldLabel:'Номер рефсекции', itemId:"refSecNo", maxLength:24, width:100},
                            {xtype:'numberfield', fieldLabel:'Кол. ваг. в рефсекции', itemId:"refSecKol", maxLength:3, width:100, allowDecimals:false, minValue:0},
                            {xtype:'textfield', fieldLabel:'Номер рефсекции', itemId:"refSecNo", maxLength:24, width:100},
                            {xtype:'textfield', fieldLabel:'Админ. приписки', itemId:"nameSob", maxLength:124, width:100},
                            {xtype:'numberfield', fieldLabel:'Админ. приписки, код', itemId:"kodSob", maxLength:2, width:50, decimalPrecision:0},
                            {xtype:'textfield', fieldLabel:'Код владельца вагона', itemId:"klientCode", maxLength:12, width:100},
                            {xtype:'textfield', fieldLabel:'Владелец вагона', itemId:"klientName", maxLength:124, width:100},
                            {xtype:'textfield', fieldLabel:'Род вагона', itemId:"rod", maxLength:20, width:100},

                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"},
                            {xtype:'label', text:this.labelConts, itemId:"g7k_label", cls:'th'},
                            {
                                xtype:'detailtabpanel',
                                tabCollectionName:'cimSmgsKonLists',
                                itemId:'g7k_panel_tab',
                                hasParentCollection:true,
                                tabItems:[
                                    {xtype:'textfield', fieldLabel:this.labelContNum, itemId:"utiN", maxLength:16, width:100},
                                    {xtype:'textfield', fieldLabel:this.labelVid, itemId:"vid", maxLength:80, width:253},
                                    {xtype:'numberfield', fieldLabel:'Масса тары', itemId:"taraKont", maxLength:5, width:100, allowDecimals:false, minValue:0},

                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text:this.labelCargo, itemId:"g7g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g7g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100},
                                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                                            //{xtype:'textarea', fieldLabel:this.labelNameChGng, itemId:"nzgrEu", maxLength:4000, width:250},
                                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100},
                                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:180},
                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},

                                            {xtype:'hidden', itemId:"ohr"},
                                            {xtype:'hidden', itemId:"sort"},
                                            {xtype:'hidden', itemId:"hid"}
                                        ],
                                        buildDockedItems:function (config) {
                                        }
                                    }
                                ],
                                buildDockedItems:function (config) {
                                }
                            }
                        ],
                        onAddTab:function () {
                            var vag, konts, kon;
                            switch (this.ownerCt.mode) {
                                case 'g7v_' : // vag
                                    if (this.items.getCount() == 0) {// no vags
                                        this.addTab();
                                    }
                                    break;
                                case 'g7k_' : // kon
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g7k_panel_tab'); // konts in vag
                                    if (konts.items.getCount() == 0) {// no konts
                                        konts.addTab();
                                    }
                                    break;
                                case 'g7g_' : // gruz
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g7k_panel_tab'); // konts in vag
                                    kon = konts.items.first() || konts.addTab(); // cur or new kon
                                    kon.getComponent('g7g_panel_tab').addTab(); // add new gruz
                                    break;
                            }
                            this.ownerCt.changeCmpVisibility(this.ownerCt.mode);
                        },
                        onDelTab:function () {
                            var vag, konts, kon, gruzs, gruz;
                            switch (this.ownerCt.mode) {
                                case 'g7v_' : // vag
                                    this.delTab();
                                    break;
                                case 'g7k_' : // kon
                                    vag = this.items.first();
                                    if (vag) {
                                        konts = vag.getComponent('g7k_panel_tab');
                                        kon = konts.delTab(); // del kon
                                        if (!kon) { //if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                                case 'g7g_' : // gruz
                                    vag = this.items.first();
                                    if (vag) {
                                        konts = vag.getComponent('g7k_panel_tab');
                                        kon = konts.items.first();
                                        if (kon) {
                                            gruzs = kon.getComponent('g7g_panel_tab');
                                            gruz = gruzs.delTab(); // del gruz
                                            if (!gruz) { // if no gruz, del kon
                                                konts.delTab();
                                            }
                                        } else {//if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                ],
                changeCmpVisibility:function (itemId) {
                    var vags = this.getComponent('g7v_panel_tab'), konts, gruzs;
                    switch (itemId) {
                        case 'g7v_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g7k_label').hide();
                                vag.getComponent('g7k_panel_tab').hide();
                            }, this);
                            break;
                        case 'g7k_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g7k_label').show();
                                konts = vag.getComponent('g7k_panel_tab');
                                konts.show();
                                konts.items.each(function (kon, index, length) {
                                    kon.getComponent('g7g_label').hide();
                                    gruzs = kon.getComponent('g7g_panel_tab');
                                    gruzs.hide();
                                }, this);
                            }, this);
                            break;
                        case 'g7g_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g7k_label').show();
                                konts = vag.getComponent('g7k_panel_tab');
                                konts.show();
                                konts.items.each(function (kon, index, length) {
                                    kon.getComponent('g7g_label').show();
                                    gruzs = kon.getComponent('g7g_panel_tab');
                                    gruzs.show();
                                }, this);
                            }, this);
                            break;
                    }
                },
                setDisplayedField:function () {
                    var vagTable = this.ownerCt.getComponent('disp.g7v').el.dom.firstChild,
                        vagPanelTab = this.getComponent('g7v_panel_tab'),
                        row,
                        cell;

                    vagTable.innerHTML = '';
                    vagPanelTab.items.each(function (vagTab, ind, length) {
                        row = vagTable.insertRow(-1);

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g7';
                        cell.innerHTML =
                            vagTab.getComponent('nvag').getValue() +
                            (vagTab.getComponent('scep').getValue() && (vagTab.getComponent('refSecNo').getValue() || vagTab.getComponent('refSecKol').getValue()) ?
                            ' PC' +
                            (vagTab.getComponent('refSecNo').getValue() ? ' - ' + vagTab.getComponent('refSecNo').getValue() : '') +
                            (vagTab.getComponent('refSecKol').getValue() ? '(' + vagTab.getComponent('refSecKol').getValue() + ')' : '') :
                                '') +
                            (vagTab.getComponent('rod').getValue() ? " " +  vagTab.getComponent('rod').getValue() : '') +
                            (vagTab.getComponent('klientName').getValue() ? ', ' +  vagTab.getComponent('klientName').getValue() : '') +
                            (vagTab.getComponent('nameSob').getValue() ? ', ' +  vagTab.getComponent('nameSob').getValue() : '');
                        ;

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g8';
                        cell.innerHTML = vagTab.getComponent('vagOtm').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g9';
                        cell.innerHTML = vagTab.getComponent('grPod').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g10';
                        cell.innerHTML = vagTab.getComponent('kolOs').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g11';
                        cell.innerHTML = vagTab.getComponent('taraVag').getValue();

                        cell = row.insertCell(-1);
                        cell.className = 'td smgs2-vag-g12';
                        cell.innerHTML = vagTab.getComponent('cicternType').getValue();

                        // kont
                        var kontTextArea = this.ownerCt.getComponent('disp.g7k'),
                            kontPanelTab = vagTab.getComponent('g7k_panel_tab'),
                            kont2Text = '';

                        kontPanelTab.items.each(function (kontTab, ind, length) {
                            kont2Text +=
                                kontTab.getComponent('utiN').getValue() +
                                (kontTab.getComponent('vid').getValue() ? ' - ' + kontTab.getComponent('vid').getValue() : '') +
                                (kontTab.getComponent('taraKont').getValue() ? ' (' + kontTab.getComponent('taraKont').getValue() + ')' : '') +
                                ' '
                            ;

                            var gruzTable = this.ownerCt.getComponent('disp.g7g').el.dom.firstChild,
                                gruzPanelTab = kontTab.getComponent('g7g_panel_tab');

                            gruzTable.innerHTML = '';
                            gruzPanelTab.items.each(function (gruzTab, ind, length) {
                                row = gruzTable.insertRow(-1);

                                cell = row.insertCell(-1);
                                cell.className = 'td smgs2-gruz-g15';
                                cell.innerHTML =
                                    gruzTab.getComponent('kgvn').getValue() +
                                    (gruzTab.getComponent('kgvn').getValue() || gruzTab.getComponent('nzgr').getValue() ? ' ГНГ ' : '') +
                                    gruzTab.getComponent('nzgr').getValue();
                                cell.innerHTML += cell.innerHTML ? '<br>' : '';
                                cell.innerHTML +=
                                    gruzTab.getComponent('ekgvn').getValue() +
                                    (gruzTab.getComponent('ekgvn').getValue() || gruzTab.getComponent('enzgr').getValue() ? ' ЕТСНГ ' : '') +
                                    gruzTab.getComponent('enzgr').getValue();

                                cell = row.insertCell(-1);
                                cell.className = 'td smgs2-gruz-g16';
                                cell.innerHTML = gruzTab.getComponent('upak').getValue();

                                cell = row.insertCell(-1);
                                cell.className = 'td smgs2-gruz-g17';
                                cell.innerHTML = gruzTab.getComponent('places').getValue();

                                cell = row.insertCell(-1);
                                cell.className = 'td smgs2-gruz-g18';
                                cell.innerHTML = gruzTab.getComponent('massa').getValue() ? 'Н: ' + gruzTab.getComponent('massa').getValue() : '';

                            });
                        }, this);


                        kontTextArea.setValue(kont2Text);
                    }, this);
                },
                copyValues2MainFlds:function () {
                    var newVagTab, valV, tvCN,
                        tkCN, newKonTabPanel, newKonTab, valK,
                        tgCN, newGruzTabPanel, newGruzTab, valG;
                    this.items.each(function (item, index, length) {
                        if (item.items) { // vag tabpanel
                            item.removeAll();
                            tvCN = item.tabCollectionName;
                            for (var vagTab in this.bufData[tvCN]) { //vag tab
                                newVagTab = item.addTab();
//	        					newVagTab = item.getActiveTab();
                                for (var vagField in this.bufData[tvCN][vagTab]) {//vag fields
                                    valV = this.bufData[tvCN][vagTab][vagField];
                                    if (valV instanceof Object) { // kon tabpanel
                                        tkCN = vagField;
                                        newKonTabPanel = newVagTab.down('detailtabpanel[tabCollectionName=' + tkCN + ']');
                                        for (var konTab in valV) { //kon tab
                                            newKonTab = newKonTabPanel.addTab();
//	        								newKonTab = newKonTabPanel.getActiveTab();
                                            for (var konField in valV[konTab]) {//kon fields
                                                valK = valV[konTab][konField];
                                                if (valK instanceof Object) { // gruz tabpanel
                                                    tgCN = konField;
                                                    newGruzTabPanel = newKonTab.down('detailtabpanel[tabCollectionName=' + tgCN + ']');
                                                    for (var gruzTab in valK) { //gruz tab
                                                        newGruzTab = newGruzTabPanel.addTab();
//	        											newGruzTab = newGruzTabPanel.getActiveTab();
                                                        for (var gruzField in valK[gruzTab]) {//gruz fields
                                                            valG = valK[gruzTab][gruzField];
                                                            if (newGruzTab.getComponent(gruzField)) {
                                                                newGruzTab.getComponent(gruzField).setValue(valG);
                                                            }
                                                        }
                                                    }
                                                }
                                                else if (newKonTab.getComponent(konField)) {
                                                    newKonTab.getComponent(konField).setValue(valK);
                                                }
                                            }
                                        }
                                        if (newKonTabPanel) {
//	        								newKonTabPanel.setActiveTab(0);
                                        }
                                    }
                                    else if (newVagTab.getComponent(vagField)) {
                                        newVagTab.getComponent(vagField).setValue(valV);
                                    }
                                }
                            }
//					    	item.setActiveTab(0);
                        }
                    }, this);
                },
                copyValues2Buf:function () { // panel
                    var tvCN, bufKont, tkCN, bufGruz, tgCN;
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        if (item.items) { // vag tabpanel
                            tvCN = item.tabCollectionName;
                            this.bufData[tvCN] = {};
                            item.items.each(function (vagTab, ind, len) { // vag tab
                                this.bufData[tvCN][ind] = {};
                                vagTab.items.each(function (vagField, i, l) { // vag fields
                                    if (vagField.items) { // kont tabpanel
                                        bufKont = this.bufData[tvCN][ind];
                                        tkCN = vagField.tabCollectionName;
                                        bufKont[tkCN] = {};
                                        vagField.items.each(function (konTab, kind, len) { // kont tab
                                            bufKont[tkCN][kind] = {};
                                            konTab.items.each(function (konField, i, l) { // kont fields
                                                if (konField.items) { // gruz tabpanel
                                                    bufGruz = bufKont[tkCN][kind];
                                                    tgCN = konField.tabCollectionName;
                                                    bufGruz[tgCN] = {};
                                                    konField.items.each(function (gruzTab, gind, len) { // gruz tab
                                                        bufGruz[tgCN][gind] = {};
                                                        gruzTab.items.each(function (gruzField, i, l) { // gruz fields
                                                            if (gruzField.isFormField) {
                                                                bufGruz[tgCN][gind][gruzField.itemId] = gruzField.getValue();
                                                            }
                                                        }, this);
                                                    }, this);
                                                }
                                                else if (konField.isFormField) {
                                                    bufKont[tkCN][kind][konField.itemId] = konField.getValue();
                                                }
                                            }, this);
                                        }, this);
                                    }
                                    else if (vagField.isFormField) {
                                        this.bufData[tvCN][ind][vagField.itemId] = vagField.getValue();
                                    }
                                }, this);
                            }, this);
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g7v_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            }
        ];

        if(tkUser.hasPriv('CIM_CONTS_LIST')){
            config.items.push(
                {x:431, y:13, xtype:'label', text:this.labelDocSort},
                {x:555, y:9, xtype:'numberfield', name:'smgs.sort', itemId:'smgs.sort', maxLength:3, minValue:0, allowDecimals:false, width:40},

                {x:345, y:11, xtype:'checkbox', name:'smgs.kind', itemId:'smgs.kind', inputValue:1, uncheckedValue:0, boxLabel: this.labelDocSummary, boxLabelAlign:'before'}
            );
        } else {
            config.items.push(
                {xtype:'hidden', name:'smgs.sort', itemId:'smgs.sort'},
                {xtype:'hidden', name:'smgs.kind', itemId:'smgs.kind'}
            )
        }
    },
    doStatus:function () {
        this.fireEvent("smgsFormStatusChanged", this);
    },

    defineDocState:function () {
        this.doStatus();
    },
    buildDockedItems:function (config) {
        this.callParent(arguments);
//        config.dockedItems[0].items.push('-', {text:this.btnCopyEpd, iconCls:'copy', itemId:'copyEpd', action:'copyEpd'});
        var toolbar1 = {xtype:'toolbar', dock:'bottom', items:[]};
        config.dockedItems.push(toolbar1);

        if(tkUser.hasPriv('CIM_IFTMIN')){
            toolbar1.items.push(
                {xtype:'tbtext', text:'ТБЦ:', style:'font-weight:bold;'},
                {
                    text:'Готов',
                    action:'tbcReady',
                    itemId:'tbcReady',
                    disabled:true
                },
                '-',
                {
                    text:'Отмена',
                    action:'tbcNotReady',
                    itemId:'tbcNotReady',
                    disabled:true
                },
                '-',
                '-',
                {xtype:'tbtext', text:'Iftmin:', style:'font-weight:bold;'},
                {
                    text:'Готов',
                    action:'iftminReady',
                    itemId:'iftminReady',
                    disabled:true
                },
                '-',
                {
                    text:'Отмена',
                    action:'iftminNotReady',
                    itemId:'iftminNotReady',
                    disabled:true
                },
                '-',
                {
                    text:'Не принят',
                    action:'iftminCanceled',
                    itemId:'iftminCanceled',
                    disabled:true
                },
                '-',
                '-',
                {xtype:'tbtext', text:'ФТС:', style:'font-weight:bold;'},
                {
                    text:'Готов',
                    action:'ftsReady',
                    itemId:'ftsReady',
                    disabled:true
                },
                '-',
                {
                    text:'Отмена',
                    action:'ftsNotReady',
                    itemId:'ftsNotReady',
                    disabled:true
                },
                '-',
                '-'
            );
        }

        if(tkUser.hasPriv('CIM_BTLC')){
            toolbar1.items.push(
                {xtype:'tbtext', text:'БТЛЦ:', style:'font-weight:bold;'},
                {
                    text:'Готов',
                    action:'btlcReady',
                    itemId:'btlcReady',
                    disabled:true
                },
                '-',
                {
                    text:'Отмена',
                    action:'btlcNotReady',
                    itemId:'btlcNotReady',
                    disabled:true
                },
                '-',
                {
                    text:'Не принят',
                    action:'btlcCanceled',
                    itemId:'btlcCanceled',
                    disabled:true
                },
                '-',
                '-'
            );
        }

        if(tkUser.hasPriv('CIM_TDG')){
            toolbar1.items.push(
                {xtype:'tbtext', text:'ТДГ:', style:'font-weight:bold;'},
                {
                    text:'Готов',
                    action:'tdgFtsReady',
                    itemId:'tdgFtsReady',
                    disabled:true
                },
                '-',
                {
                    text:'Отмена',
                    action:'tdgFtsNotReady',
                    itemId:'tdgFtsNotReady',
                    disabled:true
                },
                '-',
                {
                    text:'Не принят',
                    action:'tdgFtsCanceled',
                    itemId:'tdgFtsCanceled',
                    disabled:true
                },
                '-',
                '-'
            );
        }

        if (tkUser.hasPriv('CIM_SAVE')) {
            config.dockedItems[0].items.splice(7, 0, '-', {
                    text:'КП => Документ',
                    iconCls:'cont1',
                    action:'ky2DocRewrite',
                    itemId:'ky2DocRewrite'
                }
            );
        }
    },

    initServiceFields:function (data, initGrids) {
       this.getForm().setValues(data);
       if (initGrids) {
            this.getComponent('g19_panel').initServiceFields(data);
        }
    },
    initBuffers:function () {
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g4_panel').initBuf();
        this.getComponent('g6_panel').initBuf();
        this.getComponent('g19_panel').initBuf();
        this.getComponent('g22_panel').initBuf();
        this.getComponent('g23_panel').initBuf();
        this.getComponent('g24_panel').initBuf();
        this.getComponent('g7v_panel').initBuf();
    },
    initCollections:function () {
        this.getComponent('g6_panel').copyValues2MainFlds();
        this.getComponent('g19_panel').copyValues2MainFlds();
        this.getComponent('g22_panel').copyValues2MainFlds();
        this.getComponent('g23_panel').copyValues2MainFlds();
        this.getComponent('g24_panel').copyValues2MainFlds();
        this.getComponent('g7v_panel').copyValues2MainFlds();

        this.getComponent('g22_panel').fireEvent('saveDetailPanelClick', this.getComponent('g22_panel'));
    },
    initDisplayedFields:function () {
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g4_panel').setDisplayedField();
        this.getComponent('g6_panel').setDisplayedField();
        this.getComponent('g22_panel').setDisplayedField();
        this.getComponent('g23_panel').setDisplayedField();
        this.getComponent('g24_panel').setDisplayedField();
        this.getComponent('g7v_panel').setDisplayedField();
    },
    /*renderG20:function () {
        var g = this.getComponent('platel.g20').el.dom.rows[0].cells;
        g[0].innerHTML = "&nbsp;";
        g[1].innerHTML = "&nbsp;";
        g[2].innerHTML = "&nbsp;";
        g[3].innerHTML = "&nbsp;";
        g[4].innerHTML = "&nbsp;";
        var platel = this.getComponent('g4_panel').getComponent('g4_panel_tab');
        platel.items.each(
            function (item, index, length) {
                if(index > 4)
                    return;

                if (item.getComponent('dorR').getValue() && index < 31) {
                    if (item.getComponent('dorR').getValue() == "ВР") {
                        g[index].innerHTML = "10";
                    }
                    else if (item.getComponent('dorR').getValue() == "РЖД") {
                        g[index].innerHTML = "20";
                    }
                    else if (item.getComponent('dorR').getValue() == "БЧ") {
                        g[index].innerHTML = "21";
                    }
                    else if (item.getComponent('dorR').getValue() == "УЗ") {
                        g[index].innerHTML = "22";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЧФМ") {
                        g[index].innerHTML = "23";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЛГ") {
                        g[index].innerHTML = "24";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЛДЗ") {
                        g[index].innerHTML = "25";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЭВР") {
                        g[index].innerHTML = "26";
                    }
                    else if (item.getComponent('dorR').getValue() == "КЗХ") {
                        g[index].innerHTML = "27";
                    }
                    else if (item.getComponent('dorR').getValue() == "ГР") {
                        g[index].innerHTML = "28";
                    }
                    else if (item.getComponent('dorR').getValue() == "УТИ") {
                        g[index].innerHTML = "29";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЗЧ") {
                        g[index].innerHTML = "30";
                    }
                    else if (item.getComponent('dorR').getValue() == "МТЗ") {
                        g[index].innerHTML = "31";
                    }
                    else if (item.getComponent('dorR').getValue() == "ДСВН") {
                        g[index].innerHTML = "32";
                    }
                    else if (item.getComponent('dorR').getValue() == "НЕОП") {
                        g[index].innerHTML = "0";
                    }
                    else if (item.getComponent('dorR').getValue() == "КЗД") {
                        g[index].innerHTML = "33";
                    }
                    else if (item.getComponent('dorR').getValue() == "ПКП") {
                        g[index].innerHTML = "51";
                    }
                    else if (item.getComponent('dorR').getValue() == "БДЖ") {
                        g[index].innerHTML = "52";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЧФР") {
                        g[index].innerHTML = "53";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЧД") {
                        g[index].innerHTML = "54";
                    }
                    else if (item.getComponent('dorR').getValue() == "МАВ") {
                        g[index].innerHTML = "55";
                    }
                    else if (item.getComponent('dorR').getValue() == "ЖСР") {
                        g[index].innerHTML = "56";
                    }
                    else if (item.getComponent('dorR').getValue() == "АЗ") {
                        g[index].innerHTML = "57";
                    }
                    else if (item.getComponent('dorR').getValue() == "АРМ") {
                        g[index].innerHTML = "58";
                    }
                    else if (item.getComponent('dorR').getValue() == "КРГ") {
                        g[index].innerHTML = "59";
                    }
                    else if (item.getComponent('dorR').getValue() == "ТЖД") {
                        g[index].innerHTML = "66";
                    }
                    else if (item.getComponent('dorR').getValue() == "ТРК") {
                        g[index].innerHTML = "67";
                    }
                    else if (item.getComponent('dorR').getValue() == "АФГ") {
                        g[index].innerHTML = "69";
                    }
                    else if (item.getComponent('dorR').getValue() == "ТЦДД") {
                        g[index].innerHTML = "75";
                    }
                    else if (item.getComponent('dorR').getValue() == "ДБ") {
                        g[index].innerHTML = "80";
                    }
                    else if (item.getComponent('dorR').getValue() == "РАИ") {
                        g[index].innerHTML = "96";
                    }
                }
            }
        );
    },*/
    prepareGridData4Save:function () {
        return this.getComponent('g19_panel').prepareData();
    }


});