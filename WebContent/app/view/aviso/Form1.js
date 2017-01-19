Ext.define('TK.view.aviso.Form1', {
    extend:'TK.view.aviso.Form',
    alias:'widget.aviso1',
    buildItems:function (config) {
        config.items = [
            {xtype:'box', autoEl:{tag:'img', src:'resources/images/aviso.jpg'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'3'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:5},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'aviso1'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},

            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].hid", itemId:'vagHid'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid", itemId:'konHid'},

            {x:9, y:8, xtype:'label', text:'№:'},
            {x:45, y:3, name:'smgs.aviso_num', itemId:'smgs.aviso_num', maxLength:20, width:50, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:9, y:35, xtype:'label', text:this.labelDate},
            {x:45, y:30, xtype:'datefield', name:'smgs.aviso_dat', itemId:'smgs.aviso_dat', width:80, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:150, y:8, xtype:'label', text:this.labelCodyDo},
            {x:265, y:3, xtype:'datefield', name:'smgs.aviso_cod_dat', itemId:'smgs.aviso_cod_dat', width:80, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:373, y:8, xtype:'label', text:this.labelVsegoSmgs},
            {x:453, y:3, xtype:'numberfield', name:'smgs.amount', itemId:'smgs.amount', minValue:1, value:1, width:45, readOnly:true, readOnlyCls:'x-item-disabled'},
//            {x:150, y:35, xtype:'checkboxfield', boxLabel:'Готова для формирования СМГС', name:'smgs.ready', itemId:'smgs.ready', inputValue: '4'},
            {x:373, y:35, xtype:'label', text:this.labelZakazNum},
            {x:453, y:30, name:'smgs.zakazNo', itemId:'smgs.zakazNo', maxLength:20, width:100},
            {x:509, y:8, xtype:'label', text:this.labelWagenNum},
            {x:593, y:3, name:'smgs.npoezd', itemId:'smgs.npoezd', maxLength:32, width:350},

            {xtype:'textarea', x:935, y:4, width:350, height:55, name:'smgs.guInf', itemId:'smgs.guInf'},
            {xtype:'textarea', x:89, y:110, width:590, height:114, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false, readOnlyCls:'x-item-disabled'},
            /*{
                xtype:'button',
                text:this.btnChange,
                x:370, y:87,
                action:'change',
                itemId:'g1_'
            },*/
            {xtype:'textarea', x:89, y:270, width:590, height:114, readOnly:true, name:'disp.g5', itemId:'disp.g5', submitValue:false, readOnlyCls:'x-item-disabled'},
            /*{
                xtype:'button',
                text:this.btnChange,
                x:370, y:247,
                action:'change',
                itemId:'g5_'
            },*/
            {xtype:'textarea', x:683, y:212, width:600, height:70, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false, readOnlyCls:'x-item-disabled'},
            {x:683, y:283, xtype:'label', text:this.labelNotes, style:'font-weight:bold;', itemId:'g4primLabel'},
            {x:763, y:283, xtype:'textarea', width:520, height:40, name:'smgs.g4prim', itemId:'smgs.g4prim', maxLength:250},
            /*{
                xtype:'button',
                text:this.btnChange,
                x:905, y:190,
                action:'change',
                itemId:'g4_'
            },*/
            /*{
                xtype:'button',
                text:this.btnCopy20,
                width:110,
                x:970, y:190,
                iconCls:'copy',
                handler:function () {
                    this.getComponent('smgs.g18').setValue(this.getComponent('disp.g4').getValue());
                },
                scope:this
            },*/
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
            {xtype:'textarea', x:13, y:515, width:665, height:77, readOnly:true, name:'disp.g7', itemId:'disp.g7', submitValue:false, readOnlyCls:'x-item-disabled'},
           /* {
                xtype:'button',
                text:this.btnChange,
                x:236, y:494,
                action:'change',
                itemId:'g7_'
            },*/

            {xtype:'textarea', x:90, y:795, width:112, height:280, readOnly:true, name:'disp.g9', itemId:'disp.g9', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:90, y:770,
                action:'change',
                itemId:'g9_'
            },

            {xtype:'textarea', x:203, y:795, width:800, height:280, readOnly:true, name:'disp.g11', itemId:'disp.g11', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:607, y:770,
                action:'change',
                itemId:'g11_'
            },
            {x:683, y:32, name:'smgs.g691', itemId:'smgs.g691', maxLength:2, width:58, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:747, y:32, name:'smgs.g692', itemId:'smgs.g692', maxLength:6, width:180, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:90, y:1077, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024, width:1197, height:63},
            {x:436, y:73, name:'smgs.g2_', itemId:'smgs.g2_', maxLength:32, width:239/*, submitValue:false*/},
            {x:436, y:235, name:'smgs.g5_', itemId:'smgs.g5_', maxLength:32, width:239/*, submitValue:false*/},
            {x:683, y:92, name:'smgs.g694', itemId:'smgs.g694', maxLength:50, width:243},
            {x:1026, y:71, name:'smgs.g141', itemId:'smgs.g141', maxLength:40, width:256},
            {x:683, y:157, xtype:'trigger', name:"smgs.g162r", itemId:"smgs.g162r", maxLength:80, triggerCls:'dir', width:299, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:682, y:346, xtype:'textarea', name:'smgs.g26', itemId:'smgs.g26', maxLength:128, width:603, height:128},
            {x:13, y:407, xtype:'textarea', name:'smgs.g15', itemId:'smgs.g15', maxLength:512, width:332, height:85, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:346, y:407, xtype:'textarea', name:'smgs.g15r', itemId:'smgs.g15r', maxLength:512, width:332, height:84},

            {x:13, y:638, name:'smgs.g101r', itemId:'smgs.g101r', maxLength:80, width:333, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:347, y:638, xtype:'trigger', name:"smgs.g102r", itemId:"smgs.g102r", maxLength:64, triggerCls:'dir', width:333, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:13, y:684, name:'smgs.g_10_3r', itemId:'smgs.g_10_3r', maxLength:3, width:35, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:413, y:600, name:'smgs.g12', itemId:'smgs.g12', maxLength:2, width:60, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:484, y:600, name:'smgs.g121', itemId:'smgs.g121', maxLength:6, width:195, readOnly:true, readOnlyCls:'x-item-disabled'},
            {x:880, y:718, xtype:'checkbox', name:'smgs.g22', inputValue:'1', itemId:'smgs.g22'},
            {x:1012, y:780, xtype:'label', text:this.labelNetto, style:'font-weight:bold;'},
            {x:1012, y:795, xtype:'numberfield', name:'smgs.g24N', itemId:'smgs.g24N', maxLength:10, width:140, minValue:0},
            {x:1012, y:825, xtype:'label', text:this.labelTara, style:'font-weight:bold;'},
            {x:1012, y:840, xtype:'numberfield', name:'smgs.g24T', itemId:'smgs.g24T', maxLength:10, width:140, minValue:0},
            {x:1012, y:870, xtype:'label', text:this.labelBrutto, style:'font-weight:bold;'},
            {x:1012, y:885, xtype:'numberfield', name:'smgs.g24B', itemId:'smgs.g24B', maxLength:10, width:140, minValue:0},
            {x:1158, y:780, xtype:'numberfield', name:'smgs.g38', itemId:'smgs.g38', maxLength:10, width:125, minValue:0},
            {x:180, y:1148, xtype:'label', itemId:'smgs.g14', style:'font-weight:bold;'},
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
            {x:20, y:1680, xtype:'datefield', name:'smgs.g67', itemId:'smgs.g67', width:80},
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
                    {fieldLabel:this.labelTGNL, name:'smgs.g2_1', itemId:'smgs.g2_1', maxLength:32},
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelOKPO,
                        layout:'hbox',
                        itemId:'code_p1',
                        items:[
                            {xtype:'textfield', name:'smgs.g2', itemId:'smgs.g2', maxLength:32, flex:7},
                            {xtype:'label', text:this.labelINN, flex:6, margins:'0 0 0 10'},
                            {xtype:'textfield', name:'smgs.g_2inn', itemId:'smgs.g_2inn', maxLength:32, flex:8, margins:'0 0 0 5'}
                        ]
                    },
                    {xtype:'hidden', name:"smgs.g111", itemId:"smgs.g111"},
                    {xtype:'hidden', name:"smgs.g17_1", itemId:"smgs.g17_1"}
                ],
                setDisplayedField:function() {
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
                    if(field.getValue()){
                        row1 += row1 ? ' ' : '';
                        row1 += 'ТГНЛ ' + field.getValue();
                    }
                    row1 += row1 ? ';' : '';

                    container = this.getComponent('code_p1');
                    field = container.getComponent('smgs.g2');
                    if(field.getValue()){
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
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }
                    row3 += row3 ? ';' : '';

                    container = this;
                    field = container.getComponent('smgs.g18r_1');
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                        row3 += row3 ? ';' : '';
                    }

                    container = this;
                    field = container.getComponent('smgs.g19r');
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }

                    // result
                    result = row1 ? row1 : '';
                    if(row2){
                        result += result ? '\n' : '';
                        result += row2;
                    }

                    if(row3){
                        result += result ? '\n' : '';
                        result += row3;
                    }

                    this.ownerCt.getComponent('disp.g1').setValue(result);
//                    this.ownerCt.getComponent('smgs.g2_').setValue(this.getComponent('code_p1').getComponent('smgs.g2').getValue());
                },
                /*setDisplayedField:function () {
                 var g = this.ownerCt.getComponent('disp.g1');
                 var _g1ra = (this.getComponent('naim').getComponent('smgs.g1r').getValue() ? this.getComponent('naim').getComponent('smgs.g1r').getValue() : '');
                 var _g1rb = (this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() + ' ' : '') +
                 (this.getComponent('strn').getComponent('smgs.g16r').getValue() ? this.getComponent('strn').getComponent('smgs.g16r').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g18r_1').getValue() ? this.getComponent('smgs.g18r_1').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g19r').getValue() ? this.getComponent('smgs.g19r').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g111').getValue() ? this.getComponent('smgs.g111').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g17_1').getValue() ? this.getComponent('smgs.g17_1').getValue() : '') +
                 (this.getComponent('smgs.g2_1').getValue() ? '\nТГНЛ ' + this.getComponent('smgs.g2_1').getValue() + '; ' : '') +
                 (this.getComponent('code_p1').getComponent('smgs.g2').getValue() ? 'ОКПО ' + this.getComponent('code_p1').getComponent('smgs.g2').getValue() + '; ' : '') +
                 (this.getComponent('code_p1').getComponent('smgs.g_2inn').getValue() ? 'ИИН ' + this.getComponent('code_p1').getComponent('smgs.g_2inn').getValue() + '; ' : '');
                 var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '');
                 g.setValue(_g1r);
                 this.ownerCt.getComponent('smgs.g2_').setValue(this.getComponent('code_p1').getComponent('smgs.g2').getValue());
                 },*/
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
                    {fieldLabel:this.labelTGNL, name:'smgs.g5_1', itemId:'smgs.g5_1', maxLength:32},
                    {
                        xtype:'fieldcontainer',
                        fieldLabel:this.labelOKPO,
                        layout:'hbox',
                        itemId:'code_p5',
                        items:[
                            {xtype:'textfield', name:'smgs.g5', itemId:'smgs.g5', maxLength:32, flex:7},
                            {xtype:'label', text:this.labelINN, flex:6, margins:'0 0 0 10'},
                            {xtype:'textfield', name:'smgs.g_5inn', itemId:'smgs.g_5inn', maxLength:32, flex:8, margins:'0 0 0 5'}
                        ]
                    },
                    {xtype:'hidden', name:"smgs.g411", itemId:"smgs.g111_1"},
                    {xtype:'hidden', name:"smgs.g47_1", itemId:"smgs.g17_1_1"}
                ],
                setDisplayedField:function() {
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
                    if(field.getValue()){
                        row1 += row1 ? ' ' : '';
                        row1 += 'ТГНЛ ' + field.getValue();
                    }
                    row1 += row1 ? ';' : '';

                    container = this.getComponent('code_p5');
                    field = container.getComponent('smgs.g5');
                    if(field.getValue()){
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
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }
                    row3 += row3 ? ';' : '';

                    container = this;
                    field = container.getComponent('smgs.g18r_1_1');
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                        row3 += row3 ? ';' : '';
                    }

                    container = this;
                    field = container.getComponent('smgs.g19r_1');
                    if(field.getValue()){
                        row3 += row3 ? ' ' : '';
                        row3 += field.getValue();
                    }

                    // result
                    result = row1 ? row1 : '';
                    if(row2){
                        result += result ? '\n' : '';
                        result += row2;
                    }

                    if(row3){
                        result += result ? '\n' : '';
                        result += row3;
                    }

                    this.ownerCt.getComponent('disp.g5').setValue(result);
//                    this.ownerCt.getComponent('smgs.g5_').setValue(this.getComponent('code_p5').getComponent('smgs.g5').getValue());
                },
                /*setDisplayedField:function () {
                 var g = this.ownerCt.getComponent('disp.g5');
                 var _g1ra = (this.getComponent('naim').getComponent('smgs.g1r_1').getValue() ? this.getComponent('naim').getComponent('smgs.g1r_1').getValue() : '');
                 var _g1rb = (this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() + ' ' : '') +
                 (this.getComponent('strn').getComponent('smgs.g16r_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16r_1').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g18r_1_1').getValue() ? this.getComponent('smgs.g18r_1_1').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g19r_1').getValue() ? this.getComponent('smgs.g19r_1').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g111_1').getValue() ? this.getComponent('smgs.g111_1').getValue() + '; ' : '') +
                 (this.getComponent('smgs.g17_1_1').getValue() ? this.getComponent('smgs.g17_1_1').getValue() : '') +
                 (this.getComponent('smgs.g5_1').getValue() ? '\nТГНЛ ' + this.getComponent('smgs.g5_1').getValue() + '; ' : '') +
                 (this.getComponent('code_p5').getComponent('smgs.g5').getValue() ? 'ОКПО ' + this.getComponent('code_p5').getComponent('smgs.g5').getValue() + '; ' : '') +
                 (this.getComponent('code_p5').getComponent('smgs.g_5inn').getValue() ? 'ИИН ' + this.getComponent('code_p5').getComponent('smgs.g_5inn').getValue() + '; ' : '');
                 var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '');
                 g.setValue(_g1r);
                 this.ownerCt.getComponent('smgs.g5_').setValue(this.getComponent('code_p5').getComponent('smgs.g5').getValue());
                 },*/
                copyValues2MainFlds:function () {
                    this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
                    this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
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
                            {xtype:'combo', fieldLabel:this.labelBukvKod, itemId:"dorR", maxLength:5, width:50,
                                store: ['ВР', 'РЖД', 'БЧ', 'УЗ', 'ЧФМ', 'ЛГ', 'ЛДЗ', 'ЭВР', 'КЗХ', 'ГР', 'УТИ', 'ЗЧ', 'МТЗ', 'ДСВН', 'НЕОП', 'КЗД', 'ПКП', 'БДЖ', 'ЧФР', 'ЧД', 'МАВ', 'ЖСР', 'АЗ', 'АРМ', 'КРГ', 'ТЖД', 'ТРК', 'АФГ', 'ТЦДД', 'ДБ', 'РАИ'], typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true},
                            {xtype:'trigger', fieldLabel:this.labelPayerName, name:"platR", itemId:"platR", maxLength:45, triggerCls:'dir', width:200},
                            {xtype:'textarea', fieldLabel:this.labelThrough, itemId:"primR", maxLength:70, width:250},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod1, maxLength:50, itemId:"kplat", width:200},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod2, itemId:"kplat1", maxLength:50, width:200},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f7 = '', _f7_1 = '', _f722 = '', _f722_1 = '', g = this.ownerCt.getComponent('disp.g4'), tabP;

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
                                '\n';
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
//                                tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
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
//                                tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
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
                        /*else if(item.itemId){ // input field
                         this.bufData['g13c'] = item.getValue();
                         }*/
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g7_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
//                    this.bufData['g13c'] = this.ownerCt.dataObj['g13c'];
                }
            },
            {x:50, y:770, width:300, height:350, xtype:'detailgrid', itemId:'g9_panel', title:this.labelConts, hidden:true,
                doc:'smgs.cimSmgsCarLists',
                coll:'cimSmgsKonLists',
                buildStore:function (config) {
                    config.store = new Ext.data.ArrayStore({
                        autoDestroy:true,
                        model:'TK.model.SmgsKon'
                    });
                },
                buildColModel:function (config) {
                    config.columns = [
                        Ext.create('Ext.grid.RowNumberer'),
                        {text:this.headerContNum, dataIndex:'utiN', width:100, editor:{xtype:'textfield', maxLength:16, minValue:0}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {text:this.headerContSize, dataIndex:'sizeFoot', width:50, editor:{xtype:'numberfield', maxLength:5}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {text:this.headerContVid, dataIndex:'vid', width:100, editor:{xtype:'textfield', maxLength:80}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                    ];
                },
                newRecord:function () {
                    return Ext.create('TK.model.SmgsKon', {});
                },
                buildDockedItems:function (config) {
                    config.dockedItems = [
                        {
                            dock:'bottom',
                            xtype:'toolbar',
                            items:[
                                {
                                    text:this.btnAdd,
                                    iconCls:'add1',
                                    scope:this,
                                    handler:this.onAddRecord
                                },
                                '-',
                                {
                                    text:this.btnDelete,
                                    iconCls:'delete1',
                                    scope:this,
                                    handler:this.onDelRecord
                                },
                                '-',
                                '->',
                                '-',
                                {
                                    text:this.btnOk,
                                    scope:this,
                                    handler:this.onSave
                                },
                                '-'
                            ]
                        }
                    ];
                },
                onSave:function () {
                    this.setDisplayedField();
                    this.hide();
                    this.ownerCt.maskPanel(false);
                },
                copyValues2MainFlds:function () {
                    if (this.ownerCt.dataObj) {
                        var vags = this.ownerCt.dataObj.cimSmgsCarLists, rows = new Array();
                        for (var vag in vags) {
                            var row = new Array();
                            row.push(vags[vag].cimSmgsKonLists[0].utiN ? vags[vag].cimSmgsKonLists[0].utiN : '');
                            row.push(vags[vag].cimSmgsKonLists[0].sizeFoot);
                            row.push(vags[vag].cimSmgsKonLists[0].vid ? vags[vag].cimSmgsKonLists[0].vid : '');
                            row.push(vags[vag].cimSmgsKonLists[0].sort);
                            row.push(vags[vag].cimSmgsKonLists[0].hid);
                            row.push(vags[vag].hid);
                            rows.push(row);
                        }
                        this.store.loadData(rows);
                    }
                },
                /*initBuf:function(){
                 this.bufData = this.ownerCt.dataObj[this.coll] || {};
                 },*/
                initServiceFields:function (data) {
                    var vag = this.doc, kon = this.coll, f;
                    this.store.each(function (rec, ind, len) {
                        rec.fields.each(function (field, i, l) {
                            if (field.name != 'carHid') {  // kon
                                f = vag + "[" + ind + "]." + kon + "[0]." + field.name;
                                if (data[f]) {
                                    rec.data[field.name] = data[f];
                                }
                            } else {   // vag
                                f = vag + "[" + ind + "].hid";
                                if (data[f]) {
                                    rec.data[field.name] = data[f];
                                }
                            }
                        });
                    }, this);
                },
                buildConstValues:function () {
                    this.store.each(function (rec, ind, len) {
                        rec.data['sort'] = 0;
                    }, this);
                },
                prepareData:function () {
                    var data = {}, vag = this.doc, kon = this.coll;
                    this.store.each(function (rec, ind, len) {
                        rec.fields.each(function (field, i, l) {
                            if (field.name != 'carHid') {  // kon
                                data[vag + '[' + ind + '].' + kon + '[0].' + field.name] = rec.data[field.name];
                            } else { // vag
                                data[vag + '[' + ind + '].hid'] = rec.data['carHid'];
                                data[vag + '[' + ind + '].sort'] = ind;
                            }
                        });
                    }, this);
                    return data;
                },
                setDisplayedField:function () {
                    var valG = '';
                    this.store.each(function (rec, ind, len) {
                        valG += rec.data['utiN'] ? rec.data['utiN'] + "\n" : '';
                    });
                    this.ownerCt.getComponent('disp.g9').setValue(valG);
                }
            },
            {
                xtype:'detailpanel',
                x:280, y:630, width:400,
                itemId:'g11_panel',
                title:this.labelCargo,
                bodyPadding:5,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsGruzs',
                        prefix:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0]',
                        itemId:'g11_panel_tab',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100, action:'kgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                            {xtype:'textarea', fieldLabel:this.labelNameChGng, itemId:"nzgrEu", maxLength:4000, width:250},
                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100, action:'ekgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},
                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                            //{xtype:'textfield', fieldLabel:this.labelPackForeign, itemId:"upakForeign", maxLength:50, width:100},
                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:100},
                            {xtype:'hidden', itemId:"ohr"},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                beforeSave:function() {
                    var g11_prim = this.ownerCt.getComponent('smgs.g11_prim'),
                        str = 'Груз подлежит охране',
                        re = new RegExp(str,'gi'),
                        found = false;
                    this.getComponent('g11_panel_tab').items.each(function(gruz){
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
                    if(!found && g11_prim.getValue()){
                        g11_prim.setValue(Ext.String.trim(g11_prim.getValue().replace(re, '')));
                    }
                },
                setDisplayedField:function () {
                    var valG = '', g = this.ownerCt.getComponent('disp.g11'), tabP = this.getComponent('g11_panel_tab');
                    tabP.items.each(
                        function (item, index, length) {
                            valG += (item.getComponent('kgvn').getValue() ? 'ГНГ- ' + item.getComponent('kgvn').getValue() + '\n' : '');
                            valG += (item.getComponent('nzgrEu').getValue() ? item.getComponent('nzgrEu').getValue() + '\n' : '');
                            valG += (item.getComponent('nzgr').getValue() ? item.getComponent('nzgr').getValue() + '\n' : '');
                            valG += (item.getComponent('ekgvn').getValue() ? 'ЕТ СНГ- ' + item.getComponent('ekgvn').getValue() + '\n' : '');
                            valG += (item.getComponent('enzgr').getValue() ? item.getComponent('enzgr').getValue() + '\n' : '');
                            valG += (item.getComponent('upak').getValue() ? 'Упаковка- ' + item.getComponent('upak').getValue() : '');
                        }
                    );
                    g.setValue(valG);
                },

                copyValues2MainFlds:function () {
                    this.items.each(function (gruzy, index, length) {
                        gruzy.removeAll();
                        var tab, val, tCN = gruzy.tabCollectionName;
                        for (var prop in this.bufData[tCN]) { // tab
                            tab = gruzy.onAddTab();
//                            tab = gruzy.getActiveTab();
                            for (var prp in this.bufData[tCN][prop]) {// fields
                                if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                    tab.getComponent(prp).setValue(val);
                                }
                            }

                        }
//                        gruzy.setActiveTab(0);
                    }, this);
                },

                copyValues2Buf:function () { // panel
                    this.bufData = {};
                    this.items.each(function (gruzy, index, length) {
                        var tCN = gruzy.tabCollectionName;
                        this.bufData[tCN] = {};
                        gruzy.items.each(function (gruz, ind, len) { // tab
                            this.bufData[tCN][ind] = {};
                            gruz.items.each(function (field, i, l) { // fields
                                if (field.itemId) {  // smgs.cimSmgsCarLists[0].sort not itemId
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }

                            }, this);
                        }, this);
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g11_panel_tab').tabCollectionName;
                    this.bufData[tCN] = (this.ownerCt.dataObj.cimSmgsCarLists[0] && this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] ? this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs : {});
                }
            }
        ];
    }
});