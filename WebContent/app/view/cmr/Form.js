Ext.define('TK.view.cmr.Form', {
    extend:'TK.view.DocsForm',
    alias:'widget.cmr',
    requires:[
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel'
    ],
    buildItems:function (config) {
        config.items = [
            {xtype:'box', autoEl:{tag:'img', src:'resources/images/cmr.jpg'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},    // status of the current operation with this doc
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'5'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:23},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'cmr'},
            {xtype:'hidden', name:'smgs.cimSmgs.hid', itemId:'smgs.cimSmgs.hid'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'textarea', x:40, y:39, width:579, height:127, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:556, y:16,
                action:'change',
                itemId:'g1_'
            },
            {xtype:'textarea', x:40, y:200, width:579, height:120, readOnly:true, name:'disp.g5', itemId:'disp.g5', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:556, y:177,
                action:'change',
                itemId:'g5_'
            },
            {xtype:'textarea', x:40, y:567, width:578, height:71, readOnly:true, name:'disp.g23', itemId:'disp.g23', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:556, y:543,
                action:'change',
                itemId:'g23_'
            },
            {xtype:'box', x:40, y:695, width:1152, height:97, itemId:'disp.g27g', componentCls:"cmr_gruz", autoEl:{tag:'table'}},
            {
                xtype:'button',
                text:this.btnChange,
                x:680, y:671,
                action:'change',
                itemId:'g27g_'
            },
            {x:39, y:944, xtype:'textarea', name:'smgs.g15', itemId:'smgs.g15', maxLength:512, width:577, height:175},

            {x:132, y:353, width:486, height:24, name:"smgs.g101", itemId:"smgs.g101"},
            {x:132, y:377, width:486, height:24, name:"smgs.g102", itemId:"smgs.g102"},
            {x:132, y:461, width:486, height:24, name:"smgs.g162", itemId:"smgs.g162"},
            {x:132, y:485, width:486, height:24, name:"smgs.g163", itemId:"smgs.g163"},

            {x:39, y:1258, width:375, name:"smgs.g28", itemId:"smgs.g28"},
            {x:415, y:1258, width:200, xtype:'datefield', name:"smgs.g281", itemId:"smgs.g281"},

            {x:38, y:1600, xtype:'textarea', name:'smgs.g4prim', itemId:'smgs.g4prim', width:578, height:55},

            {x:40, y:792, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', width:702, height:48},

            {
                xtype:'detailpanel',
                x:500, y:100, width:400, height:290,
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
                    {fieldLabel:this.labelAdress, xtype:'textarea', name:'smgs.g19r', itemId:'smgs.g19r', maxLength:250}
                ],
                setDisplayedField:function () {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g1r').getValue() ? this.getComponent('naim').getComponent('smgs.g1r').getValue() : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() + ' ' : '') +
                            (this.getComponent('strn').getComponent('smgs.g16r').getValue() ? this.getComponent('strn').getComponent('smgs.g16r').getValue() : '');
                    addr =
                        (this.getComponent('smgs.g18r_1').getValue() ? this.getComponent('smgs.g18r_1').getValue() + ' ' : '') +
                            (this.getComponent('smgs.g19r').getValue() ? this.getComponent('smgs.g19r').getValue() : '');

                    this.ownerCt.getComponent('disp.g1').setValue(naim + nl + addr + nl + strn);
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
                x:500, y:100, width:400, height:290,
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
                    {fieldLabel:this.labelAdress, xtype:'textarea', name:'smgs.g49r', itemId:'smgs.g19r_1', maxLength:250}
                ],
                setDisplayedField:function () {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g1r_1').getValue() ? this.getComponent('naim').getComponent('smgs.g1r_1').getValue() : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k_1').getValue() + ' ' : '') +
                            (this.getComponent('strn').getComponent('smgs.g16r_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16r_1').getValue() : '');
                    addr = (this.getComponent('smgs.g18r_1_1').getValue() ? this.getComponent('smgs.g18r_1_1').getValue() + ' ' : '') +
                        (this.getComponent('smgs.g19r_1').getValue() ? this.getComponent('smgs.g19r_1').getValue() : '');
                    this.ownerCt.getComponent('disp.g5').setValue(naim + nl + addr + nl + strn);
                },
                copyValues2MainFlds:function () {
                    this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
                    this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
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
            {
                xtype:'detailpanel',
                x:350, y:500, width:400,
                itemId:'g23_panel',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g23_panel_tab_9',
                        tabItems:[
                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"text", maxLength:500, width:200},
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
                        else if (item.itemId) { // input field
                            this.bufData['g9c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g23_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },

            {
                xtype:'detailpanel',
                x:280, y:630, width:400,
                itemId:'g27v_panel',
                mode:'',
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsCarLists',
                        itemId:'g27v_panel_tab',
                        tabItems:[
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
                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text:this.labelCargo, itemId:"g27g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g27g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            {xtype:'textfield', fieldLabel:this.labelCode, itemId:"kgvn", maxLength:10, width:100},
                                            {xtype:'textarea', fieldLabel:this.labelName1, itemId:"nzgr", maxLength:4000, width:250},
                                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},
                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:180},
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
                setDisplayedField:function() {
                    var _g19 = '', g = '',
//                  g = this.ownerCt.getComponent('disp.g27v').el.dom.rows[0].cells,
                        tabPV = this.getComponent('g27v_panel_tab'),
                        tabPIV = tabPV.getComponent(0);

//					// vags
                    if (tabPIV) {
                        // kont
//                        g = this.ownerCt.getComponent('disp.g27k');
                        var tabPK = tabPIV.getComponent('g27k_panel_tab');
                        var kon = tabPK.getComponent(0); // first kon
                        if (kon) {
                            g = this.ownerCt.getComponent('disp.g27g').el.dom;
                            for (var i = g.rows.length - 1; i >= 0; i--) {
                                g.deleteRow(i);
                            }

                            var gruzy = kon.getComponent('g27g_panel_tab'), row, cell;
                            gruzy.items.each(function (gruz, ind, length) {
                                row = g.insertRow(-1);

                                cell = row.insertCell(-1);
                                cell.width = 2;
                                cell = row.insertCell(-1);
                                cell.width = 700;
                                _g19 = '';
                                _g19 =
                                    (gruz.getComponent('nzgr').getValue() ? gruz.getComponent('nzgr').getValue() + '<br/>' : '')
                                    + (kon.getComponent('sizeFoot').getValue() ? '1x' +  kon.getComponent('sizeFoot').getValue() + '\'' : '')
                                    + (kon.getComponent('vid').getValue() ? ' ' + kon.getComponent('vid').getValue() : '') + '<br/>'
                                    + (kon.getComponent('utiN').getValue() ? '' + kon.getComponent('utiN').getValue() : '')
                                    + (gruz.getComponent('places').getValue() ? ' ' + gruz.getComponent('places').getValue() : '')
                                    + (gruz.getComponent('upak').getValue() ? ' ' + gruz.getComponent('upak').getValue() : '') + '<br/>';
                                cell.innerHTML = _g19;

                                cell = row.insertCell(-1);
                                cell.width = 4;
                                cell = row.insertCell(-1);
                                cell.width = 146;
                                cell.innerHTML = (gruz.getComponent('kgvn').getValue() ? " " + gruz.getComponent('kgvn').getValue() : '');

                                cell = row.insertCell(-1);
                                cell.width = 4;
                                cell = row.insertCell(-1);
                                cell.width = 136;
                                cell.innerHTML = (gruz.getComponent('massa').getValue() ? " " + gruz.getComponent('massa').getValue() + ' kg' : '');

                                cell = row.insertCell(-1);
                                cell.width = 4;
                                cell = row.insertCell(-1);
                            }, this);
                        }
                        else {
//                            g.setValue('');
                            g = this.ownerCt.getComponent('disp.g27g').el.dom;
                            for (var y = g.rows.length - 1; y >= 0; y--) {
                                g.deleteRow(y);
                            }
//                            this.ownerCt.getComponent('smgs.g14').setText('');
                        }
                    }
                    else {
//                        this.ownerCt.getComponent('disp.g27k').setValue('');
                        g = this.ownerCt.getComponent('disp.g27g').el.dom;
                        for (var z = g.rows.length - 1; z >= 0; z--) {
                            g.deleteRow(z);
                        }
//                        this.ownerCt.getComponent('smgs.g14').setText('');
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
//                                newVagTab = item.getActiveTab();
                                for (var vagField in this.bufData[tvCN][vagTab]) {//vag fields
                                    valV = this.bufData[tvCN][vagTab][vagField];
                                    if (valV instanceof Object) { // kon tabpanel
                                        tkCN = vagField;
                                        newKonTabPanel = newVagTab.down('detailtabpanel[tabCollectionName=' + tkCN + ']');
                                        for (var konTab in valV) { //kon tab
                                            newKonTab = newKonTabPanel.addTab();
//                                            newKonTab = newKonTabPanel.getActiveTab();
                                            for (var konField in valV[konTab]) {//kon fields
                                                valK = valV[konTab][konField];
                                                if (valK instanceof Object) { // gruz tabpanel
                                                    tgCN = konField;
                                                    newGruzTabPanel = newKonTab.down('detailtabpanel[tabCollectionName=' + tgCN + ']');
                                                    for (var gruzTab in valK) { //gruz tab
                                                        newGruzTab = newGruzTabPanel.addTab();
//                                                        newGruzTab = newGruzTabPanel.getActiveTab();
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
//                                            newKonTabPanel.setActiveTab(0);
                                        }
                                    }
                                    else if (newVagTab.getComponent(vagField)) {
                                        newVagTab.getComponent(vagField).setValue(valV);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
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
            }
        ];
    },
    initServiceFields:function (data, initGrids) {
        this.getForm().setValues(data);
    },
    initBuffers:function () {
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g5_panel').initBuf();
        this.getComponent('g23_panel').initBuf();
        this.getComponent('g27v_panel').initBuf();
    },
    initCollections:function () {
        this.getComponent('g23_panel').copyValues2MainFlds();
        this.getComponent('g27v_panel').copyValues2MainFlds();
    },
    initDisplayedFields:function () {
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g5_panel').setDisplayedField();
        this.getComponent('g23_panel').setDisplayedField();
        this.getComponent('g27v_panel').setDisplayedField();
    }
});