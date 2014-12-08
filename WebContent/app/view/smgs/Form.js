Ext.define('TK.view.smgs.Form', {
    extend:'TK.view.DocsForm',
   /* mixins: [
        'TK.controller.exchange.FormStatus',
        'TK.controller.exchange.LockChecker'
    ],*/

    alias:'widget.smgs',
    requires:[
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel',
        'TK.view.edit.DetailGrid'
    ],
    buildItems:function (config) {
        config.items = [
            {xtype:'box', autoEl:{tag:'img', src:'resources/images/smgs.jpg'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},    // status of the current operation with this doc
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'2'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:1},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'smgs.ready', itemId:'smgs.ready'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'smgs'},
            {xtype:'hidden', name:'smgs.cimSmgs.hid', itemId:'smgs.cimSmgs.hid'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'hidden', name:'smgs.ftsStatus', itemId:'smgs.ftsStatus'},
            {xtype:'hidden', name:'smgs.btlc_status', itemId:'smgs.btlc_status'},
            {xtype:'hidden', name:'smgs.tdg_status1', itemId:'smgs.tdg_status1'},

            {x:431, y:38, xtype:'label', text:this.labelWagenNum},
            {x:517, y:33, name:'smgs.npoezd', itemId:'smgs.npoezd', maxLength:32, width:161},
            {xtype:'textarea', x:935, y:4, width:350, height:55, name:'smgs.guInf', itemId:'smgs.guInf'},
            {xtype:'textarea', x:89, y:110, width:590, height:114, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:370, y:87,
                action:'change',
                itemId:'g1_'
            },
            {xtype:'textarea', x:89, y:270, width:590, height:114, readOnly:true, name:'disp.g5', itemId:'disp.g5', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:370, y:247,
                action:'change',
                itemId:'g5_'
            },
            {xtype:'textarea', x:683, y:212, width:600, height:70, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false},
            {x:683, y:283, xtype:'label', text:this.labelNotes, style:'font-weight:bold;', itemId:'g4primLabel'},
            {x:763, y:283, xtype:'textarea', width:520, height:40, name:'smgs.g4prim', itemId:'smgs.g4prim', maxLength:250},
            {
                xtype:'button',
                text:this.btnChange,
                x:905, y:190,
                action:'change',
                itemId:'g4_'
            },
            {
                xtype:'button',
                text:this.btnCopy20,
                x:970, y:190, width:110,
                iconCls:'copy',
                handler:function () {
                    this.getComponent('smgs.g18').setValue(this.getComponent('disp.g4').getValue());
                },
                scope:this
            },
            {xtype:'component', x:325, y:1358, width:288, height:29, itemId:'platel.g20',
                autoEl:{tag:'table', children:[
                    {tag:'tr', children:[
                        {tag:'td', html:'&nbsp;', cls:'td g20-td1'},
                        {tag:'td', html:'&nbsp;', cls:'td g20-td2'},
                        {tag:'td', html:'&nbsp;', cls:'td g20-td3'},
                        {tag:'td', html:'&nbsp;', cls:'td g20-td4'},
                        {tag:'td', html:'&nbsp;', cls:'td g20-td5'}
                    ]}
                ]}
            },
            {xtype:'textarea', x:13, y:515, width:665, height:77, readOnly:true, name:'disp.g7', itemId:'disp.g7', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:236, y:494,
                action:'change',
                itemId:'g7_'
            },
            {xtype:'component', x:683, y:564, width:495, height:55, itemId:'disp.g27v',
                autoEl:{tag:'table', cls:'bg-c-white', children:[
                    {tag:'tr', children:[
                        {tag:'td', html:'&nbsp;', cls:'td vag-td1'},
                        {tag:'td', html:'&nbsp;', cls:'td vag-td2'},
                        {tag:'td', html:'&nbsp;', cls:'td vag-td3'},
                        {tag:'td', html:'&nbsp;', cls:'td vag-td4'}
                    ]}
                ]}
            },
            {x:683, y:619, xtype:'label', text:this.labelNotes, style: 'font-weight:bold;'},
            {x:683, y:635, xtype:'textarea', width:495, height:70, name:'smgs.vagPrim', itemId:'smgs.vagPrim',maxLength:512},
            {
                xtype:'button',
                text:this.btnChangeWagen,
                x:855, y:538,
                action:'change',
                itemId:'g27v_'
            },
            {xtype:'textarea', x:90, y:795, width:112, height:280, readOnly:true, name:'disp.g27k', itemId:'disp.g27k', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:90, y:770,
                action:'change',
                itemId:'g27k_'
            },
            {xtype:'component', x:203, y:795, width:800, height:280, itemId:'disp.g27g', autoEl:
                {tag:'div', cls:'overflow bg-c-white', children:[
                    {tag:'table', cls:'width100'}
                ]}
            },
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:607, y:770,
                action:'change',
                itemId:'g27g_'
            },
            {xtype:'textarea', x:15, y:1414, width:589, height:233, readOnly:true, name:'disp.g23', itemId:'disp.g23', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:540, y:1391,
                action:'change',
                itemId:'g23_'
            },
            {x:683, y:32, name:'smgs.g691', itemId:'smgs.g691', maxLength:2, width:58},
            {xtype:'hidden', name:'smgs.g171', itemId:'smgs.g171', maxLength:2},
            {x:747, y:32, name:'smgs.g692', itemId:'smgs.g692', maxLength:6, width:180},
            {xtype:'hidden', name:'smgs.g17', itemId:'smgs.g17', maxLength:6},
            {x:90, y:1077, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024, width:1197, height:63},
            {x:983, y:1170, xtype:'textarea', name:'smgs.g14', itemId:'smgs.g14_', maxLength:64, width:305, height:33},
            {x:436, y:73, name:'smgs.g2_', itemId:'smgs.g2_', maxLength:32, width:239/*, submitValue:false*/},
            {x:436, y:235, name:'smgs.g5_', itemId:'smgs.g5_', maxLength:32, width:239/*, submitValue:false*/},
            {x:683, y:92, name:'smgs.g694', itemId:'smgs.g694', maxLength:50, width:243},
            {x:1026, y:71, name:'smgs.g141', itemId:'smgs.g141', maxLength:40, width:256},
            {x:683, y:157, xtype:'trigger', name:"smgs.g162r", itemId:"smgs.g162r", maxLength:80, triggerCls:'dir', width:299},
            {x:682, y:346, xtype:'textarea', name:'smgs.g26', itemId:'smgs.g26', maxLength:128, width:603, height:128},
            {x:13, y:407, xtype:'textarea', name:'smgs.g15', itemId:'smgs.g15', maxLength:512, width:332, height:85},
            {x:346, y:407, xtype:'textarea', name:'smgs.g15r', itemId:'smgs.g15r', maxLength:512, width:332, height:84},
            {x:13, y:638, name:'smgs.g101r', itemId:'smgs.g101r', maxLength:80, width:333},
            {x:347, y:638, xtype:'trigger', name:"smgs.g102r", itemId:"smgs.g102r", maxLength:64, triggerCls:'dir', width:333},
            {x:13, y:684, name:'smgs.g_10_3r', itemId:'smgs.g_10_3r', maxLength:3, width:35},
            {x:413, y:600, name:'smgs.g12', itemId:'smgs.g12', maxLength:2, width:60},
            {x:484, y:600, name:'smgs.g121', itemId:'smgs.g121', maxLength:6, width:195},
            {x:880, y:718, xtype:'checkbox', name:'smgs.g22', inputValue:'1', itemId:'smgs.g22', uncheckedValue:0},
            {x:910, y:725, name:'smgs.kontKol', itemId:'smgs.kontKol', maxLength:10, width:91},
            {x:1012, y:780, xtype:'label', text:'Нетто-', style:'font-weight:bold;'},
            {x:1012, y:795, xtype:'numberfield', name:'smgs.g24N', itemId:'smgs.g24N', maxLength:10, width:140, minValue:0},
            {x:1012, y:825, xtype:'label', text:'Тара-', style:'font-weight:bold;'},
            {x:1012, y:840, xtype:'numberfield', name:'smgs.g24T', itemId:'smgs.g24T', maxLength:10, width:140, minValue:0},
            {x:1012, y:870, xtype:'label', text:'Брутто-', style:'font-weight:bold;'},
            {x:1012, y:885, xtype:'numberfield', name:'smgs.g24B', itemId:'smgs.g24B', maxLength:10, width:140, minValue:0},
            {x:18, y:1180, xtype:'label', itemId:'smgs.g14', style:'font-weight:bold;'},
            {x:502, y:1180, xtype:'label', itemId:'smgs._g24B', style:'font-weight:bold;'},
            {x:590, y:1235, xtype:'label', itemId:'smgs.g181', style:'font-weight:bold;'},
            {x:911, y:1253, xtype:'label', itemId:'smgs.g191', style:'font-weight:bold;'},
            {x:1004, y:1234, xtype:'label', itemId:'smgs.g192', style:'font-weight:bold;'},
            {x:13, y:1300, xtype:'textarea', name:'smgs.g18', itemId:'smgs.g18', maxLength:512, width:592, height:50},
            {x:638, y:1321, xtype:'radio', name:'smgs.g25', inputValue:'1', itemId:'smgs.g25_v'},
            {x:803, y:1321, xtype:'radio', name:'smgs.g25', inputValue:'2', itemId:'smgs.g25_k', checked:true},
            {x:715, y:1321, xtype:'radio', name:'smgs.g25', inputValue:'3', itemId:'smgs.g25_m'},

            {x:775, y:1280, name:'smgs.g25Txt', itemId:'smgs.g25Txt', maxLength:10, width:75},
            {x:1155, y:1420, name:'smgs.g36', itemId:'smgs.g36', maxLength:5, width:100},

            {x:924, y:1321, xtype:'radio', name:'smgs.gs_22', inputValue:'1', itemId:'smgs.gs_22_o', checked:true},
            {x:1050, y:1321, xtype:'radio', name:'smgs.gs_22', inputValue:'2', itemId:'smgs.gs_22_zhd'},
            {x:825, y:1380, xtype:'textarea', name:'smgs.gs_24', itemId:'smgs.gs_24', maxLength:250, width:295, height:50},
            {x:20, y:1680, xtype:'datefield', name:'smgs.g281', itemId:'smgs.g281', width:80},
            {x:654, y:1681, name:'smgs.gs_48', itemId:'smgs.gs_48', maxLength:50, width:181},
            {
                xtype:'detailpanel',
                x:500, y:100, width:400, height:355,
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
                    {fieldLabel:'Код ТГНЛ', name:'smgs.g2_1', itemId:'smgs.g2_1', maxLength:32},
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
                    field = container.getComponent('smgs.g2_1');
                    if (field.getValue()) {
                        row1 += row1 ? ' ' : '';
                        row1 += 'ТГНЛ ' + field.getValue();
                    }
                    row1 += row1 ? ';' : '';

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
            {
                xtype:'detailpanel',
                x:500, y:100, width:400, height:355,
                itemId:'g5_panel',
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
                    {fieldLabel:'Код ТГНЛ', name:'smgs.g5_1', itemId:'smgs.g5_1', maxLength:32},
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

                    container = this;
                    field = container.getComponent('smgs.g5_1');
                    if (field.getValue()) {
                        row1 += row1 ? ' ' : '';
                        row1 += 'ТГНЛ ' + field.getValue();
                    }
                    row1 += row1 ? ';' : '';

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

                    this.ownerCt.getComponent('disp.g5').setValue(result);
//                    this.ownerCt.getComponent('smgs.g5_').setValue(this.getComponent('code_p5').getComponent('smgs.g5').getValue());
                },
                copyValues2MainFlds:function () {
                    this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
                    this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
//                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
//                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
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
            {
                xtype:'detailpanel',
                x:350, y:50, width:400,
                itemId:'g4_panel',
                title:this.labelPayers,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsPlatels',
                        itemId:'g4_panel_tab_722',
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
                    var _f722 = '', g = this.ownerCt.getComponent('disp.g4'), tabP;

                    tabP = this.getComponent('g4_panel_tab_722');
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
                    this.ownerCt.renderG20();
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
                    var tCN = this.getComponent('g4_panel_tab_722').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype:'detailpanel',
                x:450, y:500, width:400,
                itemId:'g7_panel',
                title:this.labelBorderStn,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses13',
                        itemId:'g7_panel_tab_13',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeStn, itemId:"text", maxLength:500, triggerCls:'dir', width:210},
                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"text2", maxLength:240, width:200},
                            {xtype:'hidden', itemId:"code", value:'1'},
                            {xtype:'hidden', itemId:"fieldNum", value:'13'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f13 = '', _f13_1 = '', g = this.ownerCt.getComponent('disp.g7'), tabP = this.getComponent('g7_panel_tab_13');
                    tabP.items.each(
                        function (item, index, length) {
                            _f13 += item.getComponent('text').getValue() + " " + item.getComponent('text2').getValue() + "\n";
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
                        else if (item.itemId) { // input field
                            this.bufData['g13c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g7_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g13c'] = this.ownerCt.dataObj['g13c'];
                }
            },
            {
                xtype:'detailpanel',
                x:280, y:630, width:400,
                itemId:'g27v_panel',
                mode:'',
                items:[
                    {xtype:'label', text:this.labelWagons, itemId:"g27v_label", cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsCarLists',
                        itemId:'g27v_panel_tab',
                        tabItems:[
                            {xtype:'textfield', fieldLabel:this.labelWagonNum, itemId:"nvag", maxLength:160, width:150},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTonnage, itemId:"grPod", maxLength:10, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, itemId:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTara, itemId:"taraVag", maxLength:10, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"},
                            {xtype:'label', text:this.labelConts, itemId:"g27k_label", cls:'th'},
                            {
                                xtype:'detailtabpanel',
                                tabCollectionName:'cimSmgsKonLists',
                                itemId:'g27k_panel_tab',
                                hasParentCollection:true,
                                tabItems:[
                                    {xtype:'textfield', fieldLabel:this.labelContNum, itemId:"utiN", maxLength:16, width:100},
                                    {xtype:'numberfield', fieldLabel:this.labelSize, itemId:"sizeFoot", maxLength:5, width:100, allowDecimals:false, minValue:0},
                                    {xtype:'textfield', fieldLabel:this.labelVid, itemId:"vid", maxLength:80, width:253},
//                                    {xtype:'textarea', fieldLabel:this.labelNotes, itemId:"prim", maxLength:512, height:50},
                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text:this.labelCargo, itemId:"g27g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g27g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            /*{xtype:'button', text:'Инвойсы', itemId:'invBrief'},*/
                                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100},
                                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelNameChGng, itemId:"nzgrEu", maxLength:4000, width:250},
                                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100},
                                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},
                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:180},
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
                                case 'g27v_' : // vag
                                    if (this.items.getCount() == 0) {// no vags
                                        this.addTab();
                                    }
                                    break;
                                case 'g27k_' : // kon
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g27k_panel_tab'); // konts in vag
                                    if (konts.items.getCount() == 0) {// no konts
                                        konts.addTab();
                                    }
                                    break;
                                case 'g27g_' : // gruz
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g27k_panel_tab'); // konts in vag
                                    kon = konts.items.first() || konts.addTab(); // cur or new kon
                                    kon.getComponent('g27g_panel_tab').addTab(); // add new gruz
                                    break;
                            }
                            this.ownerCt.changeCmpVisibility(this.ownerCt.mode);
                        },
                        onDelTab:function () {
                            var vag, konts, kon, gruzs, gruz;
                            switch (this.ownerCt.mode) {
                                case 'g27v_' : // vag
                                    this.delTab();
                                    break;
                                case 'g27k_' : // kon
                                    vag = this.items.first();
                                    if (vag) {
                                        konts = vag.getComponent('g27k_panel_tab');
                                        kon = konts.delTab(); // del kon
                                        if (!kon) { //if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                                case 'g27g_' : // gruz
                                    vag = this.items.first();
                                    if (vag) {
                                        konts = vag.getComponent('g27k_panel_tab');
                                        kon = konts.items.first();
                                        if (kon) {
                                            gruzs = kon.getComponent('g27g_panel_tab');
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
                beforeSave:function() {
                    var g11_prim = this.ownerCt.getComponent('smgs.g11_prim'),
                        str = 'Груз подлежит охране',
                        re = new RegExp(str,'gi'),
                        found = false;
                    this.getComponent('g27v_panel_tab').items.each(function(vag){
                        vag.getComponent('g27k_panel_tab').items.each(function(kon){
                            kon.getComponent('g27g_panel_tab').items.each(function(gruz){
                                if(!found && eval(gruz.getComponent('ohr').getValue())){
                                    if(!g11_prim.getValue()){     // empty
                                        g11_prim.setValue(str);
                                    } else {
                                        if(g11_prim.getValue().search(re) == -1){
                                            g11_prim.setValue(g11_prim.getValue() + ' ' + str);
                                        }
                                    }
                                    found = true;
                                }
                            });
                        });
                    });
                    if(!found && g11_prim.getValue()){
                        g11_prim.setValue(Ext.String.trim(g11_prim.getValue().replace(re, '')));
                    }
                },
                changeCmpVisibility:function (itemId) {
                    var vags = this.getComponent('g27v_panel_tab'), konts, gruzs;
                    switch (itemId) {
                        case 'g27v_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g27k_label').hide();
                                vag.getComponent('g27k_panel_tab').hide();
                            }, this);
                            break;
                        case 'g27k_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g27k_label').show();
                                konts = vag.getComponent('g27k_panel_tab');
                                konts.show();
                                konts.items.each(function (kon, index, length) {
                                    kon.getComponent('g27g_label').hide();
                                    gruzs = kon.getComponent('g27g_panel_tab');
                                    gruzs.hide();
                                }, this);
                            }, this);
                            break;
                        case 'g27g_' :
                            vags.items.each(function (vag, index, length) {
                                vag.getComponent('g27k_label').show();
                                konts = vag.getComponent('g27k_panel_tab');
                                konts.show();
                                konts.items.each(function (kon, index, length) {
                                    kon.getComponent('g27g_label').show();
                                    gruzs = kon.getComponent('g27g_panel_tab');
                                    gruzs.show();
                                }, this);
                            }, this);
                            break;
                    }
                },
                /*onChangeData:function(btn){
                 this.mode = btn.itemId;
                 this.changeCmpVisibility(btn.itemId);
                 },*/
                setDisplayedField:function () {
                    var _g19 = '',
                        g = this.ownerCt.getComponent('disp.g27v').el.dom.rows[0].cells,
                        tabPV = this.getComponent('g27v_panel_tab'),
                        tabPIV = tabPV.getComponent(0),
                        CONT_TEXT = 'Container № ';

//					// vags
                    if (tabPIV) {
                        g[0].innerHTML = tabPIV.getComponent('nvag').getValue();
                        g[1].innerHTML = tabPIV.getComponent('grPod').getValue();
                        g[2].innerHTML = tabPIV.getComponent('kolOs').getValue();
                        g[3].innerHTML = tabPIV.getComponent('taraVag').getValue();

                        // kont
                        g = this.ownerCt.getComponent('disp.g27k');
                        var tabPK = tabPIV.getComponent('g27k_panel_tab');
                        var tabPIK = tabPK.getComponent(0); // first kon
                        if (tabPIK) {
                            _g19 = (tabPIK.getComponent('utiN').getValue() ? CONT_TEXT + tabPIK.getComponent('utiN').getValue() + '\n' : '');
                            _g19 += (tabPIK.getComponent('sizeFoot').getValue() ? tabPIK.getComponent('sizeFoot').getValue() + '\n' : '');
//                            _g19 += (tabPIK.getComponent('prim').getValue() ? tabPIK.getComponent('prim').getValue() : '');

                            g.setValue(_g19);
                            this.ownerCt.getComponent('smgs.g181').setText(tabPIK.getComponent('vid').getValue());
                            this.ownerCt.getComponent('smgs.g192').setText(tabPIK.getComponent('utiN').getValue());

                            g = this.ownerCt.getComponent('disp.g27g').el.dom.firstChild;
                            for (var i = g.rows.length - 1; i >= 0; i--) {
                                g.deleteRow(i);
                            }

                            var tabPG = tabPIK.getComponent('g27g_panel_tab'), sum = 0, row, cell;
                            tabPG.items.each(function (tabVag, ind, length) {
                                row = g.insertRow(-1);
                                cell = row.insertCell(-1);
                                cell.className = 'td gruz-td1';
                                cell.innerHTML = tabVag.getComponent('upak').getValue();
                                _g19 = '';
                                _g19 += (tabVag.getComponent('kgvn').getValue() ? 'ГНГ- ' + tabVag.getComponent('kgvn').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('nzgrEu').getValue() ? tabVag.getComponent('nzgrEu').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('nzgr').getValue() ? tabVag.getComponent('nzgr').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('ekgvn').getValue() ? 'ЕТ СНГ- ' + tabVag.getComponent('ekgvn').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('enzgr').getValue() ? tabVag.getComponent('enzgr').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('massa').getValue() ? 'Масса- ' + tabVag.getComponent('massa').getValue() + '<br/>' : '');
                                _g19 += (tabVag.getComponent('places').getValue() ? 'Места- ' + tabVag.getComponent('places').getValue() + '<br/>' : '');

                                cell = row.insertCell(-1);
                                cell.className = 'td gruz-td2';
                                cell.innerHTML = _g19;
                                cell = row.insertCell(-1);
                                cell.className = 'td gruz-td3';

                                sum += tabVag.getComponent('places').getValue() ? tabVag.getComponent('places').getValue() : 0;
                            }, this);
                            if (sum > 0) {
                                g.rows[0].cells[2].innerHTML = sum;
                                this.ownerCt.getComponent('smgs.g14').setText(TK.Utils.num2str(sum + ''));
                            }
                        }
                        else {
                            g.setValue('');
                            g = this.ownerCt.getComponent('disp.g27g').el.dom.firstChild;
                            for (var y = g.rows.length - 1; y >= 0; y--) {
                                g.deleteRow(y);
                            }
                            this.ownerCt.getComponent('smgs.g181').setText('');
                            this.ownerCt.getComponent('smgs.g192').setText('');
                            this.ownerCt.getComponent('smgs.g14').setText('');
                        }
                    }
                    else {
                        g[0].innerHTML = '';
                        g[1].innerHTML = '';
                        g[2].innerHTML = '';
                        g[3].innerHTML = '';
                        this.ownerCt.getComponent('disp.g27k').setValue('');
                        g = this.ownerCt.getComponent('disp.g27g').el.dom.firstChild;
                        for (var z = g.rows.length - 1; z >= 0; z--) {
                            g.deleteRow(z);
                        }
                        this.ownerCt.getComponent('smgs.g181').setText('');
                        this.ownerCt.getComponent('smgs.g192').setText('');
                        this.ownerCt.getComponent('smgs.g14').setText('');
                    }
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
                    var tCN = this.getComponent('g27v_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype:'detailpanel',
                x:130, y:1343, width:400,
                itemId:'g23_panel',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g23_panel_tab_9',
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
                    var _f9 = '', _f9_1 = '', g = this.ownerCt.getComponent('disp.g23'), tabP = this.getComponent('g23_panel_tab_9');
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
                    var tCN = this.getComponent('g23_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g9c'] = this.ownerCt.dataObj['g9c'];
                }
            },
            {
                xtype:'detailpanel',
                x:130, y:1343, width:400,
                itemId:'hidden_panel_7',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses7',
                        itemId:'hidden_panel_tab_7',
                        tabItems:[
                            {xtype:'hidden', itemId:"text"},
                            {xtype:'hidden', itemId:"ndoc"},
                            {xtype:'hidden', itemId:"code"},
                            {xtype:'hidden', itemId:"fieldNum", value:'7'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
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

                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('hidden_panel_tab_7').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {x:607, y:1505, width:515, height:145, xtype:'detailgrid', hideHeaders:true, itemId:'g45_panel',
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
                        {text:'Количество', dataIndex:'kpl', width:105, editor:{xtype:'numberfield', maxLength:3, minValue:0}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {text:'Пломба', dataIndex:'znak', width:405, editor:{xtype:'textfield', maxLength:128}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
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

        /*var form = this.getForm(),
            toolbar1 = this.dockedItems.items[0];

        if (form.findField('task').getValue() == 'copy' || form.findField('task').getValue() == 'create') {
            return;
        }

        this.tbcStatusCheck();
        this.btlcStatusCheck();
        this.iftminStatusCheck();
        this.ftsStatusCheck();
        this.tdgStatusCheck();

        var saveBtn = toolbar1.getComponent('save');

        if(saveBtn) {
            var locked = this.isStatusLocked(
                form.findField('smgs.tbcStatus').getValue(),
                form.findField('smgs.status').getValue(),
                form.findField('smgs.ftsStatus').getValue(),
                form.findField('smgs.btlc_status').getValue(),
                form.findField('smgs.tdg_status1').getValue()
            );

            if (locked) {
                toolbar1.getComponent('save').disable();
                toolbar1.getComponent('save_close').disable();
                toolbar1.getComponent('save_print2').disable();
            } else {
                toolbar1.getComponent('save').enable();
                toolbar1.getComponent('save_close').enable();
                toolbar1.getComponent('save_print2').enable();
            }

        }*/

    },
    initButtons:function () {
        this.doStatus();
    },
    buildDockedItems:function (config) {
        this.callParent(arguments);
        config.dockedItems[0].items.push('-', {text:this.btnCopyEpd, iconCls:'copy', itemId:'copyEpd', action:'copyEpd'});
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
    },
    initForm:function (prefix) {
        this.suspendLayouts();
        this.initBuffers();
        this.getForm().setValues(this.addPrefix(prefix));
        this.initCollections();
        this.initDisplayedFields();
        this.initButtons();
        this.resumeLayouts(true);
//        console.log(this.dataObj);
    },
    initServiceFields:function (data, initGrids) {
        this.getForm().setValues(data);
        if (initGrids) {
            this.getComponent('g45_panel').initServiceFields(data);
        }
    },
    initBuffers:function () {
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g5_panel').initBuf();
        this.getComponent('g4_panel').initBuf();
        this.getComponent('g7_panel').initBuf();
        this.getComponent('g27v_panel').initBuf();
        this.getComponent('g23_panel').initBuf();
        this.getComponent('g45_panel').initBuf();

        this.getComponent('hidden_panel_7').initBuf();
    },
    initCollections:function () {
        this.getComponent('g4_panel').copyValues2MainFlds();
        this.getComponent('g7_panel').copyValues2MainFlds();
        this.getComponent('g27v_panel').copyValues2MainFlds();
        this.getComponent('g23_panel').copyValues2MainFlds();
        this.getComponent('g45_panel').copyValues2MainFlds();

        this.getComponent('hidden_panel_7').copyValues2MainFlds();
    },
    initDisplayedFields:function () {
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g5_panel').setDisplayedField();
        this.getComponent('g4_panel').setDisplayedField();
        this.getComponent('g7_panel').setDisplayedField();
        this.getComponent('g27v_panel').setDisplayedField();
        this.getComponent('g23_panel').setDisplayedField();
    },
    renderG20:function () {
        var g = this.getComponent('platel.g20').el.dom.rows[0].cells;
        g[0].innerHTML = "&nbsp;";
        g[1].innerHTML = "&nbsp;";
        g[2].innerHTML = "&nbsp;";
        g[3].innerHTML = "&nbsp;";
        g[4].innerHTML = "&nbsp;";
        var platel = this.getComponent('g4_panel').getComponent('g4_panel_tab_722');
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
    },
    prepareGridData4Save:function () {
        return this.getComponent('g45_panel').prepareData();
    }
});