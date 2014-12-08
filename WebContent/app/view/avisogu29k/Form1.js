Ext.define('TK.view.avisogu29k.Form1', {
    extend:'TK.view.avisogu29k.Form',
    alias:'widget.avisogu29k1',
    buildItems:function (config) {
        config.items = [
            //            {xtype:'box', autoEl:{tag: 'img', src: 'resources/images/aviso.jpg'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'6'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:26},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'avisogu29k1'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].hid", itemId:'vagHid'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid", itemId:'konHid'},

            // Relative position
            {x:0, y:0, xtype:'panel', layout:'anchor', bodyPadding:5, itemId:'panel_gu29',
                items:[
                    {xtype:'fieldcontainer', layout:'hbox', defaults:{margin:'0 5 0 5'},
                        items:[
                            {xtype:'radiogroup', fieldLabel:this.labelGU, width:170, labelWidth:30, allowBlank:false,
                                items:[
                                    { boxLabel:this.labelGU29, name:'smgs.gu', inputValue:4},
                                    { boxLabel:this.labelGU27, name:'smgs.gu', inputValue:8}
                                ]
                            },
                            {xtype:'textfield', fieldLabel:'№', labelWidth:20, name:'smgs.aviso_num', itemId:'smgs.aviso_num', maxLength:20, width:100, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'datefield', fieldLabel:this.labelDate, labelWidth:40, name:'smgs.aviso_dat', itemId:'smgs.aviso_dat', width:150, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'numberfield', fieldLabel:this.labelVsegoGU, labelWidth:70, name:'smgs.amount', itemId:'smgs.amount', minValue:1, value:1, width:150, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'textfield', fieldLabel:this.labelZakazNum, name:'smgs.zakazNo', itemId:'smgs.zakazNo', maxLength:20, width:200, readOnly:true, readOnlyCls:'x-item-disabled'}
                        ]
                    },
                    {xtype:'textareafield', fieldLabel:'Место для особых штемпелей', name:'smgs.guInf', itemId:'smgs.guInf', maxLength:250, width:590, height:35},
                    {xtype:'fieldcontainer', itemId:'panel_gu29_g9', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelConts, width:590, height:80, readOnly:true, name:'disp.g9', itemId:'disp.g9', submitValue:false},
                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g9_'}
                        ]
                    },
                    {xtype:'fieldcontainer', itemId:'panel_gu29_g1', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelSender1, width:590, height:120, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false, readOnlyCls:'x-item-disabled'}
//                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g1_'}
                        ]
                    },
                    {xtype:'fieldcontainer', itemId:'panel_gu29_g5', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelReceiver1, width:590, height:120, readOnly:true, name:'disp.g5', itemId:'disp.g5', submitValue:false, readOnlyCls:'x-item-disabled'}
//                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g5_'}
                        ]
                    },

                    {xtype:'fieldcontainer', itemId:'panel_gu29_sto', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textfield', fieldLabel:this.labelStnSender, labelWidth:130, name:'smgs.g692', itemId:'smgs.g692', maxLength:6, width:195, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'textfield', name:'smgs.g162r', itemId:'smgs.g162r', maxLength:80, width:335, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'textfield', name:'smgs.g_16_33r', itemId:'smgs.g_16_33r', maxLength:3, width:40, readOnly:true, readOnlyCls:'x-item-disabled'},
//                            {xtype:'button', text:'...', action:'click', itemId:'button_gu29_sto'},
                            {xtype:'hidden', name:'smgs.g691', itemId:'smgs.g691', maxLength:2, width:58},
                            {xtype:'hidden', name:'smgs.g163r', itemId:'smgs.g163r', maxLength:80, width:40}
                        ]
                    },

                    {xtype:'fieldcontainer', itemId:'panel_gu29_stn', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textfield', fieldLabel:this.labelStnReceiver, labelWidth:130, name:'smgs.g121', itemId:'smgs.g121', maxLength:6, width:195, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'textfield', name:'smgs.g101r', itemId:'smgs.g101r', maxLength:80, width:335, readOnly:true, readOnlyCls:'x-item-disabled'},
                            {xtype:'textfield', name:'smgs.g_10_3r', itemId:'smgs.g_10_3r', maxLength:3, width:40, readOnly:true, readOnlyCls:'x-item-disabled'},
//                            {xtype:'button', text:'...', action:'click', itemId:'button_gu29_stn'},
                            {xtype:'hidden', name:"smgs.g102r", itemId:"smgs.g102r", maxLength:64, triggerCls:'dir', width:333},
                            {xtype:'hidden', name:'smgs.g12', itemId:'smgs.g12', maxLength:2, width:60}
                        ]
                    },

                    {xtype:'fieldcontainer', itemId:'panel_gu29_g11', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelCargo, width:590, height:220, readOnly:true, name:'disp.g11', itemId:'disp.g11', submitValue:false},
                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g11_'}
                        ]
                    },

                    {xtype:'fieldcontainer', itemId:'panel_gu29_g4', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelPayers1, width:590, height:70, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false, readOnlyCls:'x-item-disabled'}
//                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g4_'}
                        ]
                    },

                    /*{xtype:'fieldcontainer', layout:'hbox', defaults:{margin:'0 5 0 0'},
                     items:[
                     {xtype:'textarea', fieldLabel:this.labelSenderNotes, maxLength:512, width:590, height:85, name:'smgs.g15', itemId:'smgs.g15'}
                     ]
                     },*/

                    {xtype:'fieldcontainer', itemId:'panel_gu29_g3', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'textarea', fieldLabel:this.labelSenderNotes, width:590, height:120, readOnly:true, name:'disp.g3', itemId:'disp.g3', submitValue:false},
                            {xtype:'button', text:this.btnChange, action:'change', itemId:'g3_'}
                        ]
                    },

                    {xtype:'fieldcontainer', layout:'hbox', defaults:{margin:'0 5 0 0'},
                        items:[
                            {xtype:'datefield', fieldLabel:this.labelCodesTill, labelWidth:200, name:'smgs.aviso_cod_dat', itemId:'smgs.aviso_cod_dat', readOnly:true, readOnlyCls:'x-item-disabled'}
                        ]
                    }
                ]
            },
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
                            {xtype:'textfield', name:'smgs.g_1_5k', itemId:'smgs.g_1_5k', maxLength:3, width:50},
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
                            {xtype:'textfield', name:'smgs.g2', itemId:'smgs.g2', maxLength:32, flex:7}/*,
                             {xtype:'label', text:'Код ИИН:', flex:6, margins: '0 0 0 10'},
                             {xtype:'textfield', name: 'smgs.g_2inn', itemId:'smgs.g_2inn', maxLength:32, flex:8, margins: '0 0 0 5'}*/
                        ]
                    }

                ],
                setDisplayedField:function () {
                    var g = this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g1').getComponent('disp.g1');
                    var _g1ra = (this.getComponent('naim').getComponent('smgs.g1r').getValue() ? this.getComponent('naim').getComponent('smgs.g1r').getValue() : '');
                    var _g1rb = (this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() + ' ' : '') +
                        (this.getComponent('strn').getComponent('smgs.g16r').getValue() ? this.getComponent('strn').getComponent('smgs.g16r').getValue() + '; ' : '') +
                        (this.getComponent('smgs.g18r_1').getValue() ? this.getComponent('smgs.g18r_1').getValue() + '; ' : '') +
                        (this.getComponent('smgs.g19r').getValue() ? this.getComponent('smgs.g19r').getValue() + ' ' : '') +
                        (this.getComponent('smgs.g2_1').getValue() ? '\nТГНЛ ' + this.getComponent('smgs.g2_1').getValue() + '; ' : '') +
                        (this.getComponent('code_p1').getComponent('smgs.g2').getValue() ? 'ОКПО ' + this.getComponent('code_p1').getComponent('smgs.g2').getValue() + '; ' : '') /*+
                     (this.getComponent('code_p1').getComponent('smgs.g_2inn').getValue() ? 'ИИН ' + this.getComponent('code_p1').getComponent('smgs.g_2inn').getValue() + '; ' : '')*/;
                    var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '');
                    g.setValue(_g1r);
                },
                copyValues2MainFlds:function () {
                    for (var prop in this.bufData) {
                        if (this.getComponent('smgs.' + prop)) {
                            this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
                        }
                    }
                    this.getComponent('naim').getComponent('smgs.g1r').setValue(this.bufData.g1r);
                    this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(this.bufData.g_1_5k);
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
                            {xtype:'textfield', name:'smgs.g_4_5k', itemId:'smgs.g_1_5k_1', maxLength:3, width:50},
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
                            {xtype:'textfield', name:'smgs.g5', itemId:'smgs.g5', maxLength:32, flex:7}/*,
                             {xtype:'label', text:'Код ИИН:', flex:6, margins:'0 0 0 10'},
                             {xtype:'textfield', name:'smgs.g_5inn', itemId:'smgs.g_5inn', maxLength:32, flex:8, margins:'0 0 0 5'}*/
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var g = this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g5').getComponent('disp.g5');
                    var _g1ra = (this.getComponent('naim').getComponent('smgs.g1r_1').getValue() ? this.getComponent('naim').getComponent('smgs.g1r_1').getValue() : '');
                    var _g1rb = (this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() + ' ' : '') +
                        (this.getComponent('strn').getComponent('smgs.g16r_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16r_1').getValue() + '; ' : '') +
                        (this.getComponent('smgs.g18r_1_1').getValue() ? this.getComponent('smgs.g18r_1_1').getValue() + '; ' : '') +
                        (this.getComponent('smgs.g19r_1').getValue() ? this.getComponent('smgs.g19r_1').getValue() + ' ' : '') +
                        (this.getComponent('smgs.g5_1').getValue() ? '\nТГНЛ ' + this.getComponent('smgs.g5_1').getValue() + '; ' : '') +
                        (this.getComponent('code_p5').getComponent('smgs.g5').getValue() ? 'ОКПО ' + this.getComponent('code_p5').getComponent('smgs.g5').getValue() + '; ' : '')/* +
                     (this.getComponent('code_p5').getComponent('smgs.g_5inn').getValue() ? 'ИИН ' + this.getComponent('code_p5').getComponent('smgs.g_5inn').getValue() + '; ' : '')*/;
                    var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '');
                    g.setValue(_g1r);
                },
                copyValues2MainFlds:function () {
                    this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
                    this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
//                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
//                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
                    this.getComponent('naim').getComponent('smgs.g1r_1').setValue(this.bufData.g4r);
                    this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(this.bufData.g_4_5k);
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
            {xtype:'detailpanel', x:200, y:640, width:400, itemId:'g4_panel',
                title:this.labelPayers,
                items:[
                    {xtype:'detailtabpanel', tabCollectionName:'cimSmgsPlatels', itemId:'g4_panel_tab_722',
                        tabItems:[
                            {xtype:'combo', fieldLabel:this.labelBukvKod, itemId:"dorR", maxLength:5, width:50, store:['РЖД', 'УЗ', 'БЧ', 'УТИ', 'КЗХ', 'КРГ', 'ЖСР'], typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true},
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
                    var _f7 = '', _f7_1 = '', _f722 = '', _f722_1 = '', g = this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g4').getComponent('disp.g4'), tabP;
                    tabP = this.getComponent('g4_panel_tab_722');
                    tabP.items.each(

                        function (item, index, length) {
                            if (item.getComponent('dorR').getValue()) {
                                _f722 += 'оплата по ' + item.getComponent('dorR').getValue() + ' ';
                            }
                            if (item.getComponent('platR').getValue()) {
                                _f722 += 'производится через ' + item.getComponent('platR').getValue() + ' ';
                            }
                            if (item.getComponent('primR').getValue()) {
                                _f722 += ' ' + item.getComponent('primR').getValue() + ' ';
                            }
                            _f722 += (item.getComponent('kplat').getValue() ? 'код плательщика ' + item.getComponent('kplat').getValue() : '') + (item.getComponent('kplat1').getValue() ? ' п/к ' + item.getComponent('kplat1').getValue() : '') + '\n';
                        });
                    g.setValue(_f722);
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
//								tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) { // fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//							item.setActiveTab(0);
                        } else if (item.itemId) { // input field
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
            {xtype:'detailgrid', x:200, y:40, width:300, height:350, itemId:'g9_panel', hidden:true,
                title:this.labelConts,
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
                        {text:this.headerContNum1, dataIndex:'utiN', width:100, editor:{xtype:'textfield', maxLength:16, minValue:0}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false    },
                        {text:this.headerContSize1, dataIndex:'sizeFoot', width:50, editor:{xtype:'numberfield', maxLength:5}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {text:this.headerContVid1, dataIndex:'vid', width:100, editor:{xtype:'textfield', maxLength:80}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
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
                initBuf:function () {
                    this.bufData = this.ownerCt.dataObj[this.coll] || {};
                },

                initServiceFields:function (data) {
                    var vag = this.doc, kon = this.coll, f;
                    this.store.each(function (rec, ind, len) {
                        rec.fields.each(function (field, i, l) {
                            if (field.name != 'carHid') { // kon
                                f = vag + "[" + ind + "]." + kon + "[0]." + field.name;
                                if (data[f]) {
                                    rec.data[field.name] = data[f];
                                }
                            } else { // vag
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
                            if (field.name != 'carHid') { // kon
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
                        valG += (rec.data['utiN'] ? rec.data['utiN'] : '') + (rec.data['sizeFoot'] ? ", " + rec.data['sizeFoot'] : '') + (rec.data['vid'] ? ", " + rec.data['vid'] : '') + "\n";
                    });
                    this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g9').getComponent('disp.g9').setValue(valG);
                }
            },
            {xtype:'detailpanel', x:200, y:430, width:400, zIndex:100, itemId:'g11_panel', bodyPadding:5,
                title:this.labelCargo,
                items:[
                    {xtype:'detailtabpanel', itemId:'g11_panel_tab',
                        tabCollectionName:'cimSmgsGruzs',
                        prefix:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0]',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100, action:'kgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                            {xtype:'textarea', fieldLabel:this.labelNameChGng, itemId:"nzgrEu", maxLength:4000, width:250},
                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100, action:'ekgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
//                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},
//                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
//                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:20, width:180},
//                            {xtype:'hidden', itemId:"ohr"},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var valG = '', g = this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g11').getComponent('disp.g11'), tabP = this.getComponent('g11_panel_tab');
                    tabP.items.each(

                        function (item, index, length) {
                            valG += (item.getComponent('kgvn').getValue() ? 'ГНГ- ' + item.getComponent('kgvn').getValue() + '\n' : '');
                            valG += (item.getComponent('nzgrEu').getValue() ? item.getComponent('nzgrEu').getValue() + '\n' : '');
                            valG += (item.getComponent('nzgr').getValue() ? item.getComponent('nzgr').getValue() + '\n' : '');
                            valG += (item.getComponent('ekgvn').getValue() ? 'ЕТ СНГ- ' + item.getComponent('ekgvn').getValue() + '\n' : '');
                            valG += (item.getComponent('enzgr').getValue() ? item.getComponent('enzgr').getValue() + '\n' : '');
                        });
                    g.setValue(valG);
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (gruzy, index, length) {
                        gruzy.removeAll();
                        var tab, val, tCN = gruzy.tabCollectionName;
                        for (var prop in this.bufData[tCN]) { // tab
                            tab = gruzy.onAddTab();
//							tab = gruzy.getActiveTab();
                            for (var prp in this.bufData[tCN][prop]) { // fields
                                if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                    tab.getComponent(prp).setValue(val);
                                }
                            }
                        }
//						gruzy.setActiveTab(0);
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
                                if (field.itemId) { // smgs.cimSmgsCarLists[0].sort not itemId
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }

                            }, this);
                        }, this);
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g11_panel_tab').tabCollectionName;
                    this.bufData[tCN] = (this.ownerCt.dataObj.cimSmgsCarLists[0] && this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] ? this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs : {})
                }
            },
            {
                xtype:'detailpanel',
                x:200, y:640, width:400,
                itemId:'g3_panel',
                title:this.labelSenderNotes,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g3_panel_tab_3',
                        tabItems:[
                            {xtype:'textarea', fieldLabel:this.labelNameRu, itemId:"text", maxLength:500, width:200},
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
                setDisplayedField:function(){
                    var _f9='', _f9_1='', g = this.ownerCt.getComponent('panel_gu29').getComponent('panel_gu29_g3').getComponent('disp.g3'), tabP = this.getComponent('g3_panel_tab_3');
                    tabP.items.each(
                        function(item, index,length){
                            _f9_1='';
                            _f9_1 += (item.getComponent('text').getValue() ?  item.getComponent('text').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ndoc').getValue() ?  item.getComponent('ndoc').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('dat').getRawValue() ?  'от ' + item.getComponent('dat').getRawValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ncopy').getValue() ? item.getComponent('ncopy').getValue() + ' экз ' : '');
                            _f9 += (_f9_1 ? _f9_1 + '\n' : '');
                        }
                    );
                    g.setValue(_f9);
                },
                copyValues2MainFlds:function(){
                    this.items.each(function(item,index,length){
                        if(item.items){ // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for(var prop in this.bufData[tCN]){ // tab
                                tab = item.onAddTab();
//                                tab = item.getActiveTab();
                                for(var prp in this.bufData[tCN][prop]){// fields
                                    if(tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])){
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
                        }
                        else if(item.itemId){ // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function(){ // panel
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        var tCN = item.tabCollectionName;
                        this.bufData[tCN] = {};
                        item.items.each(function(itm,ind,len){ // tab
                            this.bufData[tCN][ind]= {};
                            itm.items.each(function(field,i,l){ // fields
                                this.bufData[tCN][ind][field.itemId] = field.getValue();
                            }, this);
                        }, this);
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g3_panel_tab_3').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            }
        ];
    }
});