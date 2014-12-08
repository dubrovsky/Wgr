Ext.define('TK.view.slovnakl.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.slovnakl',
    requires: [
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel'
    ],
    buildItems: function (config) {
        config.items = [
            {xtype: 'box', autoEl: {tag: 'img', src: 'resources/images/slov_nakl.png'}, itemId: 'blank'},
            {xtype: 'hidden', name: 'smgs.hid', itemId: 'smgs.hid'},
            {xtype: 'hidden', name: 'task', itemId: 'task'},
            {xtype: 'hidden', name: 'status', itemId: 'status'},  // status of the current operation with this doc
            {xtype: 'hidden', name: 'smgs.type', itemId: 'smgs.type', value: 9},
            {xtype: 'hidden', name: 'smgs.route.hid', itemId: 'smgs.route.hid'},
            {xtype: 'hidden', name: 'smgs.packDoc.hid', itemId: 'smgs.packDoc.hid'},
            {xtype: 'hidden', name: 'smgs.docType1', itemId: 'smgs.docType1', value: 6},
            {xtype: 'hidden', name: 'search.docType', itemId: 'search.docType', value: 'slovnakl'},

            {xtype: 'textarea', x: 25, y: 282, width: 584, height: 114, readOnly: true, name: 'disp.g1', itemId: 'disp.g1', submitValue: false},
            {
                xtype: 'button',
                text: this.btnChange,
                x: 273, y: 259,
                action: 'change',
                itemId: 'g1_'
            },
            {xtype: 'textarea', x: 25, y: 506, width: 582, height: 133, readOnly: true, name: 'disp.g5', itemId: 'disp.g5', submitValue: false},
            {
                xtype: 'button',
                text: this.btnChange,
                x: 273, y: 484,
                action: 'change',
                itemId: 'g5_'
            },
            {x: 389, y: 201, name: 'smgs.g2_', itemId: 'smgs.g2_', maxLength: 32, width: 215},
            {x: 412, y: 230, name: 'smgs.g3_', itemId: 'smgs.g3_', maxLength: 32, width: 194},
            {x: 389, y: 454, name: 'smgs.g5_', itemId: 'smgs.g5_', maxLength: 32, width: 215},
            {x: 412, y: 480, name: 'smgs.g7_', itemId: 'smgs.g7_', maxLength: 32, width: 194},
            {x: 25, y: 660, xtype: 'textarea', name: 'smgs.g15', itemId: 'smgs.g15', maxLength: 512, width: 583, height: 71},
            {x: 141, y: 735, xtype: 'trigger', name: 'smgs.g101', itemId: 'smgs.g101', maxLength: 80, triggerCls: 'dir', width: 230},
            {x: 418, y: 745, name: 'smgs.g121', itemId: 'smgs.g121', maxLength: 6, width: 184},
            {x: 123, y: 799, name: "smgs.g102", itemId: "smgs.g102", maxLength: 64, width: 270},
            {x: 421, y: 841, xtype: 'checkbox', name: 'smgs.g21', inputValue: '1', itemId: 'smgs.g21', uncheckedValue: 0},
            {x: 550, y: 839, xtype: 'checkbox', name: 'smgs.g22', inputValue: '1', itemId: 'smgs.g22', uncheckedValue: 0},

            {x: 611, y: 281, xtype: 'textarea', width: 669, height: 109, readOnly: true, name: 'disp.g14', itemId: 'disp.g14', submitValue: false},
            {
                xtype: 'button',
                text: this.btnChange,
                x: 865, y: 259,
                action: 'change',
                itemId: 'g14_'
            },
            {x: 636, y: 534, name: 'smgs.g141', itemId: 'smgs.g141', maxLength: 40, width: 420},
            {x: 613, y: 754, xtype: 'textarea', width: 671, height: 135, readOnly: true, name: 'disp.g22', itemId: 'disp.g22', submitValue: false},
            {
                xtype: 'button',
                text: this.btnChange,
                x: 676, y: 732,
                action: 'change',
                itemId: 'g22_'
            },
            {x: 1014, y: 638, xtype: 'displayfield', value: 'Prefix'},
            {x: 1010, y: 658, name: 'smgs.nettoPref', itemId: 'smgs.nettoPref', maxLength: 20, width: 45},
            {x: 1057, y: 658, xtype: 'numberfield', name: 'smgs.g24N', itemId: 'smgs.g24N', maxLength: 10, width: 130, minValue: 0},

            {x: 814, y: 665, xtype: 'displayfield', value: 'Prefix'},
            {x: 810, y: 684, name: 'smgs.taraPref', itemId: 'smgs.taraPref', maxLength: 20, width: 45},
            {x: 857, y: 684, xtype: 'numberfield', name: 'smgs.g24T', itemId: 'smgs.g24T', maxLength: 10, width: 130, minValue: 0},

            {x: 1014, y: 682, xtype: 'displayfield', value: 'Prefix'},
            {x: 1010, y: 702, name: 'smgs.bruttoPref', itemId: 'smgs.bruttoPref', maxLength: 20, width: 45},
            {x: 1057, y: 702, xtype: 'numberfield', name: 'smgs.g24B', itemId: 'smgs.g24B', maxLength: 10, width: 130, minValue: 0},
            {x: 617, y: 685, name: 'smgs.g23', itemId: 'smgs.g23', maxLength: 20, width: 175},

            /*{xtype: 'hidden', name: 'smgs.cimSmgsCarLists[0].hid', itemId: 'smgs.cimSmgsCarLists[0].hid'},
            {xtype: 'hidden', name: 'smgs.cimSmgsCarLists[0].sort', itemId: 'smgs.cimSmgsCarLists[0].sort', value: '0' },
            {x: 620, y: 600, name: 'smgs.cimSmgsCarLists[0].nvag', itemId: "smgs.cimSmgsCarLists[0].nvag", maxLength: 16, width: 300},
            {x: 1163, y: 600, xtype: 'numberfield', name: 'smgs.cimSmgsCarLists[0].kolOs', itemId: "smgs.cimSmgsCarLists[0].kolOs", maxLength: 2, width: 110, allowDecimals: false, minValue: 0},
            {x: 1010, y: 600, xtype: 'numberfield', name: 'smgs.cimSmgsCarLists[0].taraVag', itemId: "smgs.cimSmgsCarLists[0].taraVag", maxLength: 10, width: 137, minValue: 0, decimalPrecision: 1},*/

//            {x:693, y:498, xtype:'textarea', width:376, height:45, readOnly:true, name:'disp.g11v', itemId:'disp.g11v', submitValue:false},
            {x: 620, y: 600, xtype: 'displayfield', itemId: "disp.nvag", width: 300, fieldStyle:'background: white'},
            {x: 1163, y: 600, xtype: 'displayfield', itemId: "disp.kolOs", width: 110, fieldStyle:'background: white'},
            {x: 1010, y: 600, xtype: 'displayfield', itemId: "disp.taraVag", width: 110, fieldStyle:'background: white'},
            {
                xtype:'button',
                text:this.btnChangeWagen,
                x:710, y:572,
                action:'change',
                itemId:'g11v_'
            },

            {x: 25, y: 865, xtype: 'textarea', width: 583, height: 100, readOnly: true, name: 'disp.g11', itemId: 'disp.g11', submitValue: false},
            {
                xtype: 'button',
                text: this.btnChangeCont,
                x: 80, y: 842,
                action: 'change',
                itemId: 'g11k_'
            },
            {
                xtype: 'button',
                text: this.btnChangeGr,
                x: 218, y: 842,
                action: 'change',
                itemId: 'g11g_'
            },
            {x: 25, y: 961, xtype: 'label', text: this.labelNotes, style: 'font-weight:bold;'},
            {x: 25, y: 975, xtype: 'textarea', name: 'smgs.g11_prim', itemId: 'smgs.g11_prim', maxLength: 1024, width: 583, height: 55},
            {x: 30, y: 1041, xtype: 'displayfield', itemId: "disp.utiPrefs", width: 105, fieldStyle:'background: white'},
            {x: 162, y: 1041, xtype: 'displayfield', itemId: "disp.utiNums", width: 105, fieldStyle:'background: white'},
            {x: 290, y: 1045, xtype: 'displayfield', itemId: "disp.utiQuant", width: 105, fieldStyle:'background: white'},
            {x: 420, y: 1041, xtype: 'displayfield', itemId: "disp.utiNhm", width: 170, fieldStyle:'background: white'},

            {
                xtype: 'detailpanel',
                x: 500, y: 100, width: 400, height: 290,
                itemId: 'g1_panel',
                title: this.labelSender,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelName,
                        layout: 'hbox',
                        itemId: 'naim',
                        items: [
                            {xtype: 'textarea', name: "smgs.g1", itemId: "smgs.g1", maxLength: 512, flex: 1},
                            {xtype: 'button', text: '...', action: 'otpr', margins: '0 0 0 5'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId: 'strn',
                        items: [
                            {xtype: 'textfield', name: 'smgs.g_1_5k', itemId: 'smgs.g_1_5k', maxLength: 3, width: 50},
                            {xtype: 'trigger', name: "smgs.g16_1", itemId: "smgs.g16_1", maxLength: 32, triggerCls: 'dir', flex: 1, margins: '0 0 0 5'}
                        ]
                    },
                    {fieldLabel: this.labelCity, name: 'smgs.g18_1', itemId: 'smgs.g18_1', maxLength: 32},
                    {fieldLabel: this.labelAdress, xtype: 'textarea', name: 'smgs.g19_1', itemId: 'smgs.g19_1', maxLength: 128}
                ],
                setDisplayedField: function () {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g1').getValue() ? this.getComponent('naim').getComponent('smgs.g1').getValue() + nl : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() + ' ' : '') +
                            (this.getComponent('strn').getComponent('smgs.g16_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16_1').getValue() : '');
                    if (strn) strn += nl;
                    addr = (this.getComponent('smgs.g18_1').getValue() ? this.getComponent('smgs.g18_1').getValue() + ' ' : '') +
                        (this.getComponent('smgs.g19_1').getValue() ? this.getComponent('smgs.g19_1').getValue() : '');
                    this.ownerCt.getComponent('disp.g1').setValue(naim + strn + addr);
                },
                copyValues2MainFlds: function () {
                    for (var prop in this.bufData) {
                        if (this.getComponent('smgs.' + prop)) {
                            this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
                        }
                    }
                    this.getComponent('naim').getComponent('smgs.g1').setValue(this.bufData.g1);
                    this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(this.bufData.g_1_5k);
                    this.getComponent('strn').getComponent('smgs.g16_1').setValue(this.bufData.g16_1);
                },
                copyValues2Buf: function () {
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
                initBuf: function () {
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
                xtype: 'detailpanel',
                x: 500, y: 350, width: 400, height: 290,
                itemId: 'g5_panel',
                title: this.labelReceiver,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelName,
                        layout: 'hbox',
                        itemId: 'naim',
                        items: [
                            {xtype: 'textarea', name: "smgs.g4", itemId: "smgs.g4", maxLength: 512, flex: 1},
                            {xtype: 'button', text: '...', action: 'poluch', margins: '0 0 0 5'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId: 'strn',
                        items: [
                            {xtype: 'textfield', name: 'smgs.g_4_5k', itemId: 'smgs.g_4_5k', maxLength: 3, width: 50},
                            {xtype: 'trigger', name: "smgs.g46_1", itemId: "smgs.g46_1", maxLength: 32, triggerCls: 'dir', flex: 1, margins: '0 0 0 5'}
                        ]
                    },
                    {fieldLabel: this.labelCity, name: 'smgs.g48_1', itemId: 'smgs.g48_1', maxLength: 32},
                    {fieldLabel: this.labelAdress, xtype: 'textarea', name: 'smgs.g49', itemId: 'smgs.g49', maxLength: 128}
                ],
                setDisplayedField: function () {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g4').getValue() ? this.getComponent('naim').getComponent('smgs.g4').getValue() + nl : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_4_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_4_5k').getValue() + ' ' : '') +
                            (this.getComponent('strn').getComponent('smgs.g46_1').getValue() ? this.getComponent('strn').getComponent('smgs.g46_1').getValue() : '');
                    if (strn) strn += nl;
                    addr = (this.getComponent('smgs.g48_1').getValue() ? this.getComponent('smgs.g48_1').getValue() + ' ' : '') +
                        (this.getComponent('smgs.g49').getValue() ? this.getComponent('smgs.g49').getValue() : '');
                    this.ownerCt.getComponent('disp.g5').setValue(naim + strn + addr);
                },
                copyValues2MainFlds: function () {
                    this.getComponent('smgs.g48_1').setValue(this.bufData.g48_1);
                    this.getComponent('smgs.g49').setValue(this.bufData.g49);
//                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
//                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
                    this.getComponent('naim').getComponent('smgs.g4').setValue(this.bufData.g4);
                    this.getComponent('strn').getComponent('smgs.g_4_5k').setValue(this.bufData.g_4_5k);
                    this.getComponent('strn').getComponent('smgs.g46_1').setValue(this.bufData.g46_1);
                },
                copyValues2Buf: function () {
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
                initBuf: function () {
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
                xtype: 'detailpanel',
                x: 350, y: 50, width: 400,
                itemId: 'g14_panel',
                title: this.labelPayers,
                items: [
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsPlatels',
                        itemId: 'g14_panel_tab_722',
                        tabItems: [
                            {xtype: 'trigger', fieldLabel: this.labelPayerName, itemId: "plat", maxLength: 45, triggerCls: 'dir', width: 200},
                            {xtype: 'textarea', fieldLabel: this.labelThrough, itemId: "prim", maxLength: 70, width: 250},
                            {xtype: 'textfield', fieldLabel: this.labelPayerKod1, maxLength: 50, itemId: "kplat", width: 200},
                            {xtype: 'textfield', fieldLabel: this.labelPayerKod2, itemId: "kplat1", maxLength: 50, width: 200},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    }
                ],
                setDisplayedField: function () {
                    var result = '',
                        g = this.ownerCt.getComponent('disp.g14'),
                        tabP;

                    tabP = this.getComponent('g14_panel_tab_722');
                    tabP.items.each(
                        function (item, index, length) {
                            if (index > 0) {  // if more then 1 tab, i.e. plats
                                result += '\n';
                            }
                            if (item.getComponent('plat').getValue()) {
                                result += item.getComponent('plat').getValue();
                            }
                            if (item.getComponent('prim').getValue()) {
                                result += ', ' + item.getComponent('prim').getValue();
                            }
                            if (item.getComponent('kplat').getValue()) {
                                result += ', ' + item.getComponent('kplat').getValue();
                            }
                            if (item.getComponent('kplat1').getValue()) {
                                result += ', ' + item.getComponent('kplat1').getValue();
                            }
                        }
                    );
                    g.setValue(result);
                },
                copyValues2MainFlds: function () {
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
                copyValues2Buf: function () { // panel
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
                initBuf: function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g14_panel_tab_722').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype: 'detailpanel',
                x: 190, y: 700, width: 400,
                itemId: 'g22_panel',
                title: this.labelSenderDocs,
                items: [
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsDocses9',
                        itemId: 'g22_panel_tab_9',
                        tabItems: [
//                            {xtype:'trigger', fieldLabel:this.labelCustomsCode, itemId:"ncas", maxLength:6, triggerCls:'dir', width:100},
//                            {xtype:'textarea', fieldLabel:this.labelNameRu, itemId:"text", maxLength:500, width:200},
                            {xtype: 'textarea', fieldLabel: this.labelNameEu, itemId: "text2", maxLength: 240, width: 200},
                            {xtype: 'textfield', fieldLabel: this.labelDocNum, itemId: "ndoc", maxLength: 56, width: 200},
                            {xtype: 'datefield', fieldLabel: this.labelDate, itemId: "dat", width: 80},
                            {xtype: 'numberfield', fieldLabel: this.labelTotal, itemId: "ncopy", maxLength: 10, width: 200, allowDecimals: false, minValue: 0},
                            {xtype: 'hidden', itemId: "code"},
                            {xtype: 'hidden', itemId: "fieldNum", value: '9'},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    }
                ],
                setDisplayedField: function () {
                    var _f9 = '',
                        _f9_1 = '',
                        g = this.ownerCt.getComponent('disp.g22'),
                        tabP = this.getComponent('g22_panel_tab_9');
                    tabP.items.each(
                        function (item, index, length) {
                            _f9_1 = '';
                            _f9_1 += (item.getComponent('text2').getValue() ? item.getComponent('text2').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ndoc').getValue() ? item.getComponent('ndoc').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('dat').getRawValue() ? item.getComponent('dat').getRawValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ncopy').getValue() ? item.getComponent('ncopy').getValue() : '');
                            _f9 += (_f9_1 ? _f9_1 + '\n' : '');
                        }
                    );
                    g.setValue(_f9);
                },
                copyValues2MainFlds: function () {
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
                        /*else if (item.itemId) { // input field
                         item.setValue(this.bufData[item.itemId.split('.')[1]]);
                         }*/
                    }, this);
                },
                copyValues2Buf: function () { // panel
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
                         this.bufData['g9c'] = item.getValue();
                         }*/
                    }, this);
                },
                initBuf: function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g22_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
//                    this.bufData['g9c'] = this.ownerCt.dataObj['g9c'];
                }
            },
            {
                xtype: 'detailpanel',
                x: 280, y: 750, width: 500,
                itemId: 'g11_panel',
                mode: '',
                bodyPadding: 3,
                items: [
                    {xtype:'label', text: this.labelWagons, itemId:"g11v_label", cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsCarLists',
                        itemId:'g11v_panel_tab',
                        tabItems:[
                            {xtype:'textfield', fieldLabel:this.labelWagonNum, itemId:"nvag", maxLength:16, width:150},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, itemId:"kolOs", maxLength:2, width:150, allowDecimals: false, minValue: 0},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTara, itemId:"taraVag", maxLength:10, width:150, minValue: 0, decimalPrecision: 1},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"},
                            {xtype:'label', text: this.labelConts, itemId:"g11k_label", cls:'th'},
                            {
                                xtype:'detailtabpanel',
                                tabCollectionName:'cimSmgsKonLists',
                                itemId:'g11k_panel_tab',
                                hasParentCollection:true,
                                tabItems:[
                                    {xtype: 'fieldcontainer', fieldLabel:this.labelSize+' / '+this.labelCategory, itemId:'fcSizeKat', layout: 'hbox',
                                        items: [
                                            {xtype: 'displayfield', value:'x', fieldCls:'x-form-display-field bold'},
                                            {xtype: 'numberfield', itemId:'sizeFoot', flex: 1, maxLength:5, allowDecimals:false, minValue:0,margins: '0 2 0 2'},
                                            {xtype: 'displayfield', value: '\'', fieldCls:'x-form-display-field bold'},
                                            {xtype: 'textfield', itemId:'kat', flex: 5, margins: '0 0 0 8', maxLength:40}
                                        ]
                                    },

                                    {xtype: 'fieldcontainer', fieldLabel: this.labelWagonNum + '/' + this.labelWagonOtpr, itemId:'fcNvag', layout: 'hbox',
                                        items: [
                                            {xtype: 'displayfield', value: 'ŠR vag:'},
                                            {xtype: 'textfield', itemId:'nvag', flex:1, margins: '0 3 0 3', maxLength:16},
                                            {xtype: 'displayfield', value: '/'},
                                            {xtype: 'textfield', itemId:'g25', flex:1, margins: '0 0 0 3', maxLength:50}
                                        ]
                                    },

                                    {xtype:'textfield', fieldLabel:this.labelContNum, itemId:"utiN", maxLength:16},

                                    {xtype: 'fieldcontainer', fieldLabel: this.labelNetto, layout: 'hbox', itemId:'fcNetto',
                                        items: [
                                            {xtype: 'textfield', itemId : 'nettoPref', width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'prefix'},
                                            {xtype: 'numberfield', itemId : 'netto', maxLength:10, minValue:0, flex: 1, margins: '0 10 0 10'},
                                            {xtype: 'textfield', itemId : 'nettoSuf', width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'suffix'}
                                        ]
                                    },
                                    {xtype: 'fieldcontainer', fieldLabel: this.labelTara, layout: 'hbox', itemId:'fcTara',
                                        items: [
                                            {xtype: 'textfield', itemId : 'taraPref', width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'prefix'},
                                            {xtype: 'numberfield', itemId : 'tara', maxLength:10, minValue:0, flex:  1, margins: '0 10 0 10'},
                                            {xtype: 'textfield', itemId : 'taraSuf',  width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'suffix'}
                                        ]
                                    },
                                    {xtype: 'fieldcontainer', fieldLabel: this.labelBrutto, layout: 'hbox', itemId:'fcBrutto',
                                        items: [
                                            {xtype: 'textfield', itemId : 'bruttoPref', width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'prefix'},
                                            {xtype: 'numberfield', itemId : 'brutto', maxLength:10, minValue:0, flex:  1, margins: '0 10 0 10'},
                                            {xtype: 'textfield', itemId : 'bruttoSuf', width: 35, margins: '0 2 0 0', maxLength:20},
                                            {xtype: 'displayfield', value: 'suffix'}
                                        ]
                                    },

                                    {xtype:'textfield', fieldLabel:this.labelVid, itemId:"vid", maxLength:80},
                                    {xtype:'textarea', fieldLabel:this.labelNotes, itemId:"prim", maxLength:512, height:50},

                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text: this.labelCargo, itemId:"g11g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g11g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            {xtype:'textfield', fieldLabel:this.labelCode + 'NHM', itemId:"kgvn", maxLength:10, width:100},
//                                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"nzgr", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelName + ' Eu', itemId:"nzgrEu", maxLength:4000, width:250},
//                                            {xtype:'textarea', fieldLabel:this.labelName + ' (RID)', itemId:"nzgrRid", maxLength:4000, width:250},
//                                            {xtype:'textarea', fieldLabel:this.labelName + ' (RID) Eu', itemId:"nzgrRidEu", maxLength:4000, width:250},
//                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                                            {xtype:'hidden', itemId:"sort"},
                                            {xtype:'hidden', itemId:"hid"}
                                        ],
                                        buildDockedItems:function(config) {}
                                    }
                                ],
                                buildDockedItems:function(config) {}
                            }
                        ],
                        onAddTab:function() {
                            var vag, konts, kon;
                            switch (this.ownerCt.mode) {
                                case 'g11v_' : // vag
                                    if(this.items.getCount() == 0){// no vags
                                        this.addTab();
                                    }
                                    break;
                                case 'g11k_' : // kon
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g11k_panel_tab'); // konts in vag
                                    konts.addTab();
                                    break;
                                case 'g11g_' : // gruz
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g11k_panel_tab'); // konts in vag
                                    kon = konts.items.first() || konts.addTab(); // cur or new kon
                                    kon.getComponent('g11g_panel_tab').addTab(); // add new gruz
                                    break;
                            }
                            this.ownerCt.changeCmpVisibility(this.ownerCt.mode);
                        },
                        onDelTab:function() {
                            var vag, konts, kon, gruzs, gruz;
                            switch (this.ownerCt.mode) {
                                case 'g11v_' : // vag
                                    this.delTab();
                                    break;
                                case 'g11k_' : // kon
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g11k_panel_tab');
                                        kon = konts.delTab(); // del kon
                                        if(!kon){ //if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                                case 'g11g_' : // gruz
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g11k_panel_tab');
                                        kon = konts.items.first();
                                        if(kon){
                                            gruzs = kon.getComponent('g11g_panel_tab');
                                            gruz = gruzs.delTab(); // del gruz
                                            if(!gruz){ // if no gruz, del kon
                                                konts.delTab();
                                            }
                                        } else{//if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                ],
                changeCmpVisibility:function(itemId){
                    var vags = this.getComponent('g11v_panel_tab'),konts, gruzs;
                    switch (itemId) {
                        case 'g11v_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g11k_label').hide();
                                vag.getComponent('g11k_panel_tab').hide();
                            }, this);
                            break;
                        case 'g11k_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g11k_label').show();
                                konts = vag.getComponent('g11k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g11g_label').hide();
                                    gruzs = kon.getComponent('g11g_panel_tab');
                                    gruzs.hide();
                                }, this);
                            }, this);
                            break;
                        case 'g11g_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g11k_label').show();
                                konts = vag.getComponent('g11k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g11g_label').show();
                                    gruzs = kon.getComponent('g11g_panel_tab');
                                    gruzs.show();
                                }, this);
                            }, this);
                            break;
                    }
                },
                setDisplayedField:function(){
                    var dispField,
                        value = '',
                        vags = this.getComponent('g11v_panel_tab'),
                        vag= vags.getComponent(0),
                        gruzy,
                        form = this.ownerCt,
                        KONTAJNER = 'kontajner',
                        dataStr = '', fCon, hasGruz,
                        utiPrefs = '', utiNums = '', utiNhm = '', utiQuant = '';

                    if(vag){
                        dispField = form.getComponent('disp.nvag');
                        dispField.setValue(vag.getComponent('nvag').getValue());
                        dispField = form.getComponent('disp.kolOs');
                        dispField.setValue(vag.getComponent('kolOs').getValue());
                        dispField = form.getComponent('disp.taraVag');
                        dispField.setValue(vag.getComponent('taraVag').getValue());

                        vag.getComponent('g11k_panel_tab').items.each(function(kon, ix, len){

                            if(ix == 0){ // 1-st kontainer
                                gruzy = kon.getComponent('g11g_panel_tab');
                                hasGruz = gruzy.items.getCount() > 0;
                                value = len + 'x';
                                utiQuant = len;
                                if(hasGruz){
                                    value += '  Ložený ' + KONTAJNER;
                                    fCon = kon.getComponent('fcSizeKat');
                                    if(fCon.getComponent('kat').getValue()){
                                        value += ' (' + kon.getComponent('fcSizeKat').getComponent('kat').getValue() + ')';
                                    }
                                    if(gruzy.getComponent(0).getComponent('nzgrEu').getValue()){
                                        value += '\n' + gruzy.getComponent(0).getComponent('nzgrEu').getValue();
                                    }
                                    if(fCon.getComponent('sizeFoot').getValue()){
                                        utiNhm = fCon.getComponent('sizeFoot').getValue() + '\'';
                                    }
                                    if(gruzy.getComponent(0).getComponent('kgvn').getValue()){
                                        utiNhm += ' / ' + gruzy.getComponent(0).getComponent('kgvn').getValue();
                                    }
                                } else {
                                    value += '  Prázdny ' + KONTAJNER;
                                    if(form.getComponent('smgs.g11_prim').getValue()){
                                        value += '\n' + form.getComponent('smgs.g11_prim').getValue();
                                    }
                                }
                            }
                            fCon = kon.getComponent('fcNvag');
                            if(hasGruz){
                                dataStr = '';
                                if(fCon.getComponent('nvag').getValue()){
                                    dataStr = '\n' + 'ŠR vag: ' + fCon.getComponent('nvag').getValue();
                                }
                                if(fCon.getComponent('g25').getValue()){
                                    dataStr += (dataStr ? '/' + fCon.getComponent('g25').getValue() : '\n' + fCon.getComponent('g25').getValue());
                                }
                                value += dataStr;
                            }
                            value += '\n';
                            if(kon.getComponent('utiN').getValue()){
                                value += kon.getComponent('utiN').getValue();
                                utiPrefs += kon.getComponent('utiN').getValue().substr(0,4) + '<br/>';
                                utiNums  += kon.getComponent('utiN').getValue().substr(4) + '<br/>';
                            }
                            if(hasGruz){
                                fCon = kon.getComponent('fcNetto');
                                if(fCon.getComponent('nettoPref').getValue()){
                                    value += ' ' + fCon.getComponent('nettoPref').getValue();
                                }
                                if(fCon.getComponent('netto').getValue()){
                                    value += ' ' + fCon.getComponent('netto').getValue();
                                }
                                if(fCon.getComponent('nettoSuf').getValue()){
                                    value += fCon.getComponent('nettoSuf').getValue();
                                }
                                fCon = kon.getComponent('fcTara');
                                if(fCon.getComponent('taraPref').getValue()){
                                    value += ' ' + fCon.getComponent('taraPref').getValue();
                                }
                                if(fCon.getComponent('tara').getValue()){
                                    value += ' ' + fCon.getComponent('tara').getValue();
                                }
                                if(fCon.getComponent('taraSuf').getValue()){
                                    value += fCon.getComponent('taraSuf').getValue();
                                }
                                fCon = kon.getComponent('fcBrutto');
                                if(fCon.getComponent('bruttoPref').getValue()){
                                    value += ' ' + fCon.getComponent('bruttoPref').getValue();
                                }
                                if(fCon.getComponent('brutto').getValue()){
                                    value += ' ' + fCon.getComponent('brutto').getValue();
                                }
                                if(fCon.getComponent('bruttoSuf').getValue()){
                                    value += fCon.getComponent('bruttoSuf').getValue();
                                }
                                if(kon.getComponent('prim').getValue()){
                                    value += ' ' + kon.getComponent('prim').getValue();
                                }
                            } else {
                                dataStr = '';
                                fCon = kon.getComponent('fcTara');
                                if(fCon.getComponent('taraPref').getValue()){
                                    dataStr = ', ' + fCon.getComponent('taraPref').getValue();
                                }
                                if(fCon.getComponent('tara').getValue()){
                                    dataStr += dataStr ? '' : ', ';
                                    dataStr += fCon.getComponent('tara').getValue();
                                }
                                if(dataStr && fCon.getComponent('taraSuf').getValue()){
                                    dataStr += fCon.getComponent('taraSuf').getValue();
                                }
                                value += dataStr;

                                if(kon.getComponent('vid').getValue()){
                                    value += ', ' + kon.getComponent('vid').getValue();
                                }

                                dataStr = '';
                                fCon = kon.getComponent('fcNetto');
                                if(fCon.getComponent('nettoPref').getValue()){
                                    dataStr += ', ' + fCon.getComponent('nettoPref').getValue();
                                }
                                if(fCon.getComponent('netto').getValue()){
                                    dataStr += dataStr ? '' : ', ';
                                    dataStr += fCon.getComponent('netto').getValue();
                                }
                                if(dataStr && fCon.getComponent('nettoSuf').getValue()){
                                    dataStr += fCon.getComponent('nettoSuf').getValue();
                                }
                                value += dataStr;

                                if(kon.getComponent('fcSizeKat').getComponent('sizeFoot').getValue()){
                                    utiNhm += kon.getComponent('fcSizeKat').getComponent('sizeFoot').getValue() + '\'';
                                }
                                if(form.getComponent('smgs.g23').getValue()){
                                    utiNhm += ' / ' + form.getComponent('smgs.g23').getValue();
                                }
                                utiNhm += '<br/>';
                            }

                        }, this);
                        dispField = form.getComponent('disp.g11');
                        dispField.setValue(value);

                        dispField = form.getComponent('disp.utiPrefs');
                        dispField.setValue(utiPrefs);
                        dispField = form.getComponent('disp.utiNums');
                        dispField.setValue(utiNums);
                        dispField = form.getComponent('disp.utiNhm');
                        dispField.setValue(utiNhm);
                        dispField = form.getComponent('disp.utiQuant');
                        dispField.setValue(utiQuant);

                    }
                    else{
                        dispField = form.getComponent('disp.nvag');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.kolOs');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.taraVag');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.g11');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.utiQuant');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.utiNhm');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.utiPrefs');
                        dispField.setValue('');
                        dispField = form.getComponent('disp.utiNums');
                        dispField.setValue('');
                    }
                },
                copyValues2MainFlds:function(){
                    var newVagTab, valV, tvCN,
                        tkCN, newKonTabPanel, newKonTab, valK,
                        tgCN, newGruzTabPanel, newGruzTab, valG, field;
                    this.items.each(function(item,index,length){
                        if(item.isXType('detailtabpanel', true)){ // vag tabpanel
                            item.removeAll();
                            tvCN = item.tabCollectionName;
                            for(var vagTab in this.bufData[tvCN]){ //vag tab
                                newVagTab = item.addTab();
//                                newVagTab = item.getActiveTab();
                                for(var vagField in this.bufData[tvCN][vagTab]){//vag fields
                                    valV = this.bufData[tvCN][vagTab][vagField];
                                    if(valV instanceof Object){ // kon tabpanel
                                        tkCN = vagField;
                                        newKonTabPanel = newVagTab.down('detailtabpanel[tabCollectionName='+tkCN+']');
                                        for(var konTab in valV){ //kon tab
                                            newKonTab = newKonTabPanel.addTab();
//                                            newKonTab = newKonTabPanel.getActiveTab();
                                            for(var konField in valV[konTab]){//kon fields
                                                valK = valV[konTab][konField];
                                                if(valK instanceof Object){ // gruz tabpanel
                                                    tgCN = konField;
                                                    newGruzTabPanel = newKonTab.down('detailtabpanel[tabCollectionName='+tgCN+']');
                                                    for(var gruzTab in valK){ //gruz tab
                                                        newGruzTab = newGruzTabPanel.addTab();
//                                                        newGruzTab = newGruzTabPanel.getActiveTab();
                                                        for(var gruzField in valK[gruzTab]){//gruz fields
                                                            valG = valK[gruzTab][gruzField];
                                                            if(newGruzTab.getComponent(gruzField)) {
                                                                newGruzTab.getComponent(gruzField).setValue(valG);
                                                            }
                                                        }
                                                    }
                                                }
//                                                else if(newKonTab.getComponent(konField)) {
//                                                    newKonTab.getComponent(konField).setValue(valK);
//                                                }
                                                else if((field = newKonTab.down('#' + konField))) {
                                                    field.setValue(valK);
                                                }

                                            }
                                        }
                                        if(newKonTabPanel){
//                                            newKonTabPanel.setActiveTab(0);
                                        }
                                    }
                                    else if(newVagTab.getComponent(vagField)){
                                        newVagTab.getComponent(vagField).setValue(valV);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
                            /* } else if(item.isXType('radiogroup', true)){
                             item.setValue({'smgs.vidKontOtpr':this.bufData['vidKontOtpr']});*/
                        } else if(item.isFormField) {
                            item.setValue(this.bufData[item.itemId]);
                        }
                    }, this);
                },
                copyValues2Buf:function(){ // panel
                    var tvCN,bufKont,tkCN,bufGruz,tgCN;
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        if(item.isXType('detailtabpanel', true)){ // vag tabpanel
                            tvCN = item.tabCollectionName;
                            this.bufData[tvCN] = {};
                            item.items.each(function(vagTab,ind,len){ // vag tab
                                this.bufData[tvCN][ind]= {};
                                vagTab.items.each(function(vagField,i,l){ // vag fields
                                    if(vagField.items){ // kont tabpanel
                                        bufKont = this.bufData[tvCN][ind];
                                        tkCN = vagField.tabCollectionName;
                                        bufKont[tkCN] = {};
                                        vagField.items.each(function(konTab,kind,len){ // kont tab
                                            bufKont[tkCN][kind]= {};
                                            konTab.items.each(function(konField,i,l){ // kont fields
                                                if(konField.isXType('detailtabpanel', true)){ // gruz tabpanel
                                                    bufGruz = bufKont[tkCN][kind];
                                                    tgCN = konField.tabCollectionName;
                                                    bufGruz[tgCN] = {};
                                                    konField.items.each(function(gruzTab,gind,len){ // gruz tab
                                                        bufGruz[tgCN][gind]= {};
                                                        gruzTab.items.each(function(gruzField,i,l){ // gruz fields
                                                            if(gruzField.isFormField){
                                                                bufGruz[tgCN][gind][gruzField.itemId] = gruzField.getValue();
                                                            }
                                                        }, this);
                                                    }, this);
                                                }
                                                else if(konField.isFormField){
                                                    bufKont[tkCN][kind][konField.itemId] = konField.getValue();
                                                }
                                                else if(konField.isXType('fieldcontainer', true)){
                                                    konField.items.each(function(field){
                                                        if(field.isFormField){
                                                            bufKont[tkCN][kind][field.itemId] = field.getValue();
                                                        }
                                                    }, this);
                                                }
                                            }, this);
                                        }, this);
                                    }
                                    else if(vagField.isFormField){
                                        this.bufData[tvCN][ind][vagField.itemId] = vagField.getValue();
                                    }
                                }, this);
                            }, this);
                            /*} else if(item.isXType('radiogroup', true)){
                             this.bufData['vidKontOtpr'] = item.getValue()['smgs.vidKontOtpr'];*/
                        } else if(item.isFormField){
                            this.bufData[item.itemId] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g11v_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            }


        ]
    },
    initServiceFields: function (data) {
        this.getForm().setValues(data);
    },
    initBuffers: function () {
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g5_panel').initBuf();
        this.getComponent('g14_panel').initBuf();
        this.getComponent('g22_panel').initBuf();
        this.getComponent('g11_panel').initBuf();
    },
    initCollections: function () {
        this.getComponent('g14_panel').copyValues2MainFlds();
        this.getComponent('g22_panel').copyValues2MainFlds();
        this.getComponent('g11_panel').copyValues2MainFlds();
    },
    initDisplayedFields: function () {
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g5_panel').setDisplayedField();
        this.getComponent('g14_panel').setDisplayedField();
        this.getComponent('g22_panel').setDisplayedField();
        this.getComponent('g11_panel').setDisplayedField();
    }
});