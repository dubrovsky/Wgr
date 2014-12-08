Ext.define('TK.view.cim.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.cim',
    requires: [
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel',
        'TK.view.edit.DetailGrid'
    ],
    buildItems:function(config) {
        config.items = [
            {xtype:'box', autoEl:{tag: 'img', src: 'resources/images/cim.jpg'}, itemId:'blank'},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'7'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:21},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'cim'},

            {x:334, y:13, xtype:'checkbox', name:'smgs.cim', inputValue:'1', itemId:'smgs.cim',uncheckedValue:0},
            {xtype:'textarea',x:122, y:75, width:360, height:105, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false},
            {   xtype:'button',
                text:this.btnChange,
                x:417, y:181,
                action:'change',
                itemId:'g1_'
            },
            {x:512, y:60, name: 'smgs.g2', itemId:'smgs.g2', maxLength:32, width:175},
            {x:512, y:100, name: 'smgs.g3', itemId:'smgs.g3', maxLength:32, width:175},
            {x:570, y:140, name: 'smgs.g11_1', itemId:'smgs.g11_1', maxLength:80, width:115},
            {x:545, y:164, name: 'smgs.g12_1', itemId:'smgs.g12_1', maxLength:60, width:140},
            {x:545, y:188, name: 'smgs.g13_1', itemId:'smgs.g13_1', maxLength:60, width:140},

            {x:965, y:70, name: 'smgs.g8', itemId:'smgs.g8', maxLength:64, width:250},
            {x:512, y:224, name: 'smgs.g5', itemId:'smgs.g5', maxLength:32, width:175},
            {x:512, y:267, name: 'smgs.g6', itemId:'smgs.g6', maxLength:32, width:175},
            {x:575, y:300, name: 'smgs.g41_1', itemId:'smgs.g41_1', maxLength:80, width:115},
            {x:550, y:324, name: 'smgs.g42_1', itemId:'smgs.g42_1', maxLength:60, width:140},
            {x:550, y:348, name: 'smgs.g43_1', itemId:'smgs.g43_1', maxLength:60, width:140},
            {xtype:'textarea',x:122, y:240, width:360, height:105, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:417, y:346,
                action:'change',
                itemId:'g4_'
            },
            {xtype:'textarea',x:691, y:112, width:585, height:99, readOnly:true, name:'disp.g7', itemId:'disp.g7', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:698, y:86,
                action:'change',
                itemId:'g7_'
            },

            {xtype:'textarea',x:694, y:236, width:585, height:132, readOnly:true, name:'disp.g9', itemId:'disp.g9', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:818, y:214,
                action:'change',
                itemId:'g9_'
            },


            {x:9, y:423, xtype:'trigger', name: 'smgs.g101', itemId:'smgs.g101', triggerCls:'dir', maxLength:80, width:338},
            {x:349, y:423, name:"smgs.g104", itemId:"smgs.g104", maxLength:64, width:338},
            {x:266, y:380, name: 'smgs.g11', itemId:'smgs.g11', maxLength:40, width:209},
            {x:501, y:380, name: 'smgs.g12', itemId:'smgs.g12', maxLength:2, width:43},
            {x:551, y:380, name: 'smgs.g121', itemId:'smgs.g121', maxLength:6, width:135},
            {xtype:'textarea',x:9, y:525, width:424, height:83, readOnly:true, name:'disp.g13', itemId:'disp.g13', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:302, y:503,
                action:'change',
                itemId:'g13_'
            },

            {x:457, y:513, name: 'smgs.g141', itemId:'smgs.g141', maxLength:40, width:40},
            {x:505, y:513, name: 'smgs.g142', itemId:'smgs.g142', maxLength:32, width:180},
            {x:1074, y:378, name: 'smgs.g171', itemId:'smgs.g171', maxLength:2, width:43},
            {x:1130, y:378, name: 'smgs.g17', itemId:'smgs.g17', maxLength:10, width:135},
            {x:696, y:449, xtype:'trigger', name:"smgs.g162", itemId:"smgs.g162", maxLength:80, triggerCls:'dir', width:400},
            {x:1100, y:449, name:"smgs.g164", itemId:"smgs.g164", maxLength:64, width:175},
            {x:702, y:658, xtype:'checkbox', name:'smgs.incoterms', inputValue:'1', itemId:'smgs.incoterms',uncheckedValue:0},
            {x:702, y:620, xtype:'checkbox', name:'smgs.frankofracht', inputValue:'1', itemId:'smgs.frankofracht',uncheckedValue:0},
            {x:847, y:652, name: 'smgs.kodUslPost', itemId:'smgs.kodUslPost', maxLength:3, width:68},
//            {x:764, y:695, xtype:'checkbox', name:'smgs.rid', inputValue:'1', itemId:'smgs.rid',checked:true,uncheckedValue:0},
            {x:635, y:695, xtype:'checkbox', name:'smgs.g21', inputValue:'1', itemId:'smgs.g21',uncheckedValue:0},
            {x:764, y:695, xtype:'checkbox', name:'smgs.g22', inputValue:'1', itemId:'smgs.g22',uncheckedValue:0},
            {x:1024, y:599, xtype:'textarea', name: 'smgs.g191', itemId:'smgs.g191', maxLength:128, width:253, height:37},
            {x:909, y:378, name: 'smgs.g161', itemId:'smgs.g161', maxLength:8, width:133},

            {x:693, y:541, xtype:'label', text:this.labelNotes, style: 'font-weight:bold;'},
            {x:693, y:555, xtype:'textarea', width:376, height:30, name:'smgs.vagPrim', itemId:'smgs.vagPrim',maxLength:512},
            {x:693, y:498, xtype:'textarea', width:376, height:45, readOnly:true, name:'disp.g18v', itemId:'disp.g18v', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeWagen,
                x:850, y:476,
                action:'change',
                itemId:'g18v_'
            },

            {x:7, y:727,xtype:'textarea', width:785, height:270, readOnly:true, name:'disp.g18g', itemId:'disp.g18g', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:30, y:700,
                action:'change',
                itemId:'g18k_'
            },
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:170, y:700,
                action:'change',
                itemId:'g18g_'
            },

            {x:1073, y:496, name: 'smgs.g18B1', itemId:'smgs.g18B1', maxLength:4, width:91},
            {x:1193, y:496, name: 'smgs.g18B2', itemId:'smgs.g18B2', maxLength:4, width:88},
//            {x:7, y:724, xtype:'textarea', name:'smgs.konPrim', itemId:'smgs.konPrim', maxLength:512, width:785, height:40},
            {x:7, y:995, xtype:'label', text:this.labelNotes, style: 'font-weight:bold;'},
            {x:7, y:1009, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024, width:785, height:97},
            {x:794, y:886, xtype:'textarea', name: 'smgs.g26', itemId:'smgs.g26', maxLength:128, width:312, height:217},
            {x:796, y:729, name: 'smgs.g23', itemId:'smgs.g23', maxLength:20, width:134},
            {x:1113, y:927, xtype:'textarea', name: 'smgs.g39', itemId:'smgs.g39', maxLength:50, width:168, height:166},
            {x:693, y:1167, xtype:'textarea', name: 'smgs.g60', itemId:'smgs.g60', maxLength:240, width:590, height:56},
            {x:712, y:1240, name: 'smgs.g61', itemId:'smgs.g61', maxLength:80, width:381},
            {x:1101, y:1240, name: 'smgs.g611', itemId:'smgs.g611', maxLength:2, width:40},
            {x:1149, y:1240, name: 'smgs.g612', itemId:'smgs.g612', maxLength:6, width:133},
            {x:693, y:1413, xtype:'textarea', name: 'smgs.g63', itemId:'smgs.g63', maxLength:180, width:590, height:43},
            {x:7, y:1496, xtype:'textarea', name: 'smgs.g64', itemId:'smgs.g64', maxLength:160, width:357, height:121},
            {x:368, y:1496, xtype:'textarea', name: 'smgs.g65', itemId:'smgs.g65', maxLength:200, width:409, height:121},
            {x:783, y:1496, xtype:'textarea', name: 'smgs.g651', itemId:'smgs.g651', maxLength:160, width:405, height:121},
            {x:1193, y:1496, xtype:'textarea', name: 'smgs.g652', itemId:'smgs.g652', maxLength:30, width:90, height:121},
            {x:10, y:630, xtype:'textarea', name: 'smgs.otmPoluch', itemId:'smgs.otmPoluch', maxLength:512, width:678, height:57},

            {x:937, y:720, xtype:'displayfield', value:'Prefix', itemId:'nettoPrefDisp'},
            {x:937, y:740, name: 'smgs.nettoPref', itemId:'smgs.nettoPref', maxLength:20, width:38},
            {x:976, y:720, xtype:'displayfield', value:'Нетто', itemId:'nettoDisp'},
            {x:976, y:740, xtype:'numberfield', name: 'smgs.g24N', itemId:'smgs.g24N', maxLength:10, width:130, minValue:0},

            {x:937, y:785, name: 'smgs.taraPref', itemId:'smgs.taraPref', maxLength:20, width:38},
            {x:976, y:765, xtype:'displayfield', value:'Тара', itemId:'taraDisp'},
            {x:976, y:785, xtype:'numberfield', name: 'smgs.g24T', itemId:'smgs.g24T', maxLength:10, width:130, minValue:0},

            {x:937, y:830, name: 'smgs.bruttoPref', itemId:'smgs.bruttoPref', maxLength:20, width:38},
            {x:976, y:810, xtype:'displayfield', value:'Брутто', itemId:'bruttoDisp'},
            {x:976, y:830, xtype:'numberfield', name: 'smgs.g24B', itemId:'smgs.g24B', maxLength:10, width:130, minValue:0},

            {x:7, y:1644, xtype:'textarea', name: 'smgs.ga66', itemId:'smgs.ga66', maxLength:100, width:358, height:99},
            {x:330, y:1760, xtype:'checkbox', name:'smgs.gb661', inputValue:'1', itemId:'smgs.gb661',uncheckedValue:0},
            {x:274, y:1798, name: 'smgs.gb662', itemId:'smgs.gb662', maxLength:4, width:90},
            {x:944, y:1774, xtype:'textarea', name: 'smgs.g28', itemId:'smgs.g28', maxLength:240, width:193, height:52},
            {x:1145, y:1774, xtype:'datefield', name: 'smgs.g281', itemId:'smgs.g281', width:80},
            {x:372, y:1645, xtype:'datefield', name: 'smgs.g67', itemId:'smgs.g67', width:80},
            {x:800, y:1649, name: 'smgs.g68', itemId:'smgs.g68', maxLength:6, width:132},
            {x:1062, y:1644, name: 'smgs.g691', itemId:'smgs.g691', maxLength:2, width:39},
            {x:1135, y:1644, name: 'smgs.g692', itemId:'smgs.g692', maxLength:6, width:134},
            {x:1014, y:1713, name: 'smgs.g693', itemId:'smgs.g693', maxLength:4, width:88},
            {x:1135, y:1713, name: 'smgs.g694', itemId:'smgs.g694', maxLength:50, width:136},
            {
                xtype:'detailpanel',
                x:500, y:100, width:400, height:290,
                itemId:'g1_panel',
                title:this.labelSender,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items:[
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelName,
                        layout: 'hbox',
                        itemId:'naim',
                        items: [
                            {xtype:'textarea', name:"smgs.g1", itemId:"smgs.g1", maxLength:512, flex:1},
                            {xtype:'button', text:'...', action:'otpr',margins: '0 0 0 5'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId:'strn',
                        items: [
                            {xtype:'textfield',name: 'smgs.g_1_5k', itemId:'smgs.g_1_5k', maxLength:3, width:50},
                            {xtype:'trigger', name:"smgs.g16_1", itemId:"smgs.g16_1", maxLength:32, triggerCls:'dir', flex:1,margins: '0 0 0 5'}
                        ]
                    },
                    {fieldLabel:this.labelCity, name: 'smgs.g18_1', itemId:'smgs.g18_1', maxLength:32},
                    {fieldLabel:this.labelAdress, xtype:'textarea', name: 'smgs.g19_1', itemId:'smgs.g19_1', maxLength:128}
                ],
                setDisplayedField:function() {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g1').getValue() ? this.getComponent('naim').getComponent('smgs.g1').getValue() + nl : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_1_5k').getValue() + ' ' : '') +
                        (this.getComponent('strn').getComponent('smgs.g16_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16_1').getValue() : '');
                    if(strn) strn+= nl;
                    addr = (this.getComponent('smgs.g18_1').getValue() ? this.getComponent('smgs.g18_1').getValue() + ' ' : '')+
                        (this.getComponent('smgs.g19_1').getValue() ? this.getComponent('smgs.g19_1').getValue() : '');
                    this.ownerCt.getComponent('disp.g1').setValue(naim + strn + addr);
                },
                copyValues2MainFlds:function(){
                    for(var prop in this.bufData){
                        if(this.getComponent('smgs.' + prop)){
                            this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
                        }
                    }
                    this.getComponent('naim').getComponent('smgs.g1').setValue(this.bufData.g1);
                    this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(this.bufData.g_1_5k);
                    this.getComponent('strn').getComponent('smgs.g16_1').setValue(this.bufData.g16_1);
                },
                copyValues2Buf:function(){
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        if(item.items) {
                            item.items.each(function(itm,index,length){
                                if(itm.itemId){
                                    this.bufData[itm.itemId.split('.')[1]] = itm.getValue();
                                }
                            }, this);
                        } else {
                            this.bufData[item.itemId.split('.')[1]] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var data = this.ownerCt.dataObj, arr;
                    this.items.each(function(item,index,length){
                        if(item.items) {
                            item.items.each(function(itm,index,length){
                                if(itm.itemId){
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
                itemId:'g4_panel',
                title:this.labelReceiver,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items:[
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelName,
                        layout: 'hbox',
                        itemId:'naim',
                        items: [
                            {xtype:'textarea', name:"smgs.g4", itemId:"smgs.g4", maxLength:512, flex:1},
                            {xtype:'button', text:'...', action:'poluch',margins: '0 0 0 5'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId:'strn',
                        items: [
                            {xtype:'textfield',name: 'smgs.g_4_5k', itemId:'smgs.g_4_5k', maxLength:3, width:50},
                            {xtype:'trigger', name:"smgs.g46_1", itemId:"smgs.g46_1", maxLength:32, triggerCls:'dir', flex:1,margins: '0 0 0 5'}
                        ]
                    },
                    {fieldLabel:this.labelCity, name: 'smgs.g48_1', itemId:'smgs.g48_1', maxLength:32},
                    {fieldLabel:this.labelAdress, xtype:'textarea', name: 'smgs.g49', itemId:'smgs.g49', maxLength:128}
                ],
                setDisplayedField:function() {
                    var naim = '', strn = '', addr = '', nl = '\n';
                    naim = (this.getComponent('naim').getComponent('smgs.g4').getValue() ? this.getComponent('naim').getComponent('smgs.g4').getValue() + nl : '');
                    strn =
                        (this.getComponent('strn').getComponent('smgs.g_4_5k').getValue() ? this.getComponent('strn').getComponent('smgs.g_4_5k').getValue() + ' ' : '') +
                        (this.getComponent('strn').getComponent('smgs.g46_1').getValue() ? this.getComponent('strn').getComponent('smgs.g46_1').getValue() : '');
                    if(strn) strn+= nl;
                    addr = (this.getComponent('smgs.g48_1').getValue() ? this.getComponent('smgs.g48_1').getValue() + ' ' : '')+
                        (this.getComponent('smgs.g49').getValue() ? this.getComponent('smgs.g49').getValue() : '');
                    this.ownerCt.getComponent('disp.g4').setValue(naim + strn + addr);
                },
                copyValues2MainFlds:function(){
                    this.getComponent('smgs.g48_1').setValue(this.bufData.g48_1);
                    this.getComponent('smgs.g49').setValue(this.bufData.g49);
//                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
//                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
                    this.getComponent('naim').getComponent('smgs.g4').setValue(this.bufData.g4);
                    this.getComponent('strn').getComponent('smgs.g_4_5k').setValue(this.bufData.g_4_5k);
                    this.getComponent('strn').getComponent('smgs.g46_1').setValue(this.bufData.g46_1);
                },
                copyValues2Buf:function(){
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        if(item.items) {
                            item.items.each(function(itm,index,length){
                                if(itm.itemId){
                                    this.bufData[itm.name.split('.')[1]] = itm.getValue();
                                }
                            }, this);
                        } else {
                            this.bufData[item.name.split('.')[1]] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var data = this.ownerCt.dataObj, arr;
                    this.items.each(function(item,index,length){
                        if(item.items) {
                            item.items.each(function(itm,index,length){
                                if(itm.itemId){
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
                itemId:'g7_panel',
                title:this.labelZayavSenderPayers,
                items:[
                    {xtype:'label', text: this.labelZayavSender, cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses7',
                        itemId:'g7_panel_tab_7',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeDoc, itemId:"code", maxLength:3, triggerCls:'dir'},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text", maxLength:500},
                            {xtype:'textarea', fieldLabel:this.labelTextEu, itemId:"text2", maxLength:240},
                            {xtype:'hidden', itemId:"fieldNum", value:'7'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    },
                    {xtype:'label', text: this.labelPayers, cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsPlatels',
                        itemId:'g7_panel_tab_722',
                        tabItems:[
                            {xtype:'combo', fieldLabel:this.labelBukvKod,  itemId:"dor", maxLength:5,
                                store: ['РЖД','УЗ','БЧ','УТИ', 'КЗХ', 'КРГ','ЖСР'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true},
                            {xtype:'trigger', fieldLabel:this.labelPayerName, itemId:"plat", maxLength:45, triggerCls:'dir'},
                            {xtype:'textarea', fieldLabel:this.labelThrough, itemId:"prim",  maxLength:70},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod1, maxLength:50, itemId:"kplat"},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod2, itemId:"kplat1", maxLength:50},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function(){
                    var dispField = this.ownerCt.getComponent('disp.g7'),
                        tabP = this.getComponent('g7_panel_tab_7'),
                        arr1 = new Array(),
                        arr2 = new Array(),
                        diff, prefix = '7.';
                    tabP.items.each(
                        function(item, index,length){
                            arr1[index] =
                                (item.getComponent('code').getValue() ? prefix + item.getComponent('code').getValue() + ' ' : '') +
                                (item.getComponent('text').getValue() ? item.getComponent('text').getValue() + ' ' : '') +
                                (item.getComponent('text2').getValue() ? item.getComponent('text2').getValue()  : '' )+
                                '\n';
                        }
                    );
                    tabP = this.getComponent('g7_panel_tab_722');
                    tabP.items.each(
                        function(item, index,length){
                            arr2[index] =
                                (item.getComponent('dor').getValue() ? item.getComponent('dor').getValue() + ' ' : '') +
                                (item.getComponent('plat').getValue() ? item.getComponent('plat').getValue() + ' ' : '') +
                                (item.getComponent('prim').getValue() ? item.getComponent('prim').getValue() + ' ' : '') +
                                (item.getComponent('kplat').getValue() ? item.getComponent('kplat').getValue() + ' ' : '') +
                                (item.getComponent('kplat1').getValue() ? item.getComponent('kplat1').getValue() : '') +
                                '\n';
                        }
                    );
                    if((diff = arr1.length - arr2.length)){
                        if(diff > 0){
                            do {
                                arr2.push('');
                                diff--;
                            }while(diff > 0);
                        } else {
                            do {
                                arr1.push('');
                                diff++;
                            }while(diff < 0);
                        }
                    }
                    dispField.setValue('');
                    for(var i = 0; i < arr1.length; i++){
                        dispField.setValue(dispField.getValue() + arr1[i] + arr2[i]);
                    }
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
                        if(item.items){ // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function(itm,ind,len){ // tab
                                this.bufData[tCN][ind]= {};
                                itm.items.each(function(field,i,l){ // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g7_panel_tab_7').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    tCN = this.getComponent('g7_panel_tab_722').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype:'detailpanel',
                x:510, y:240, width:400,
                itemId:'g9_panel',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g9_panel_tab_9',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCustomsCode, itemId:"ncas", maxLength:6, triggerCls:'dir'},
                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"text", maxLength:500},
                            {xtype:'textarea', fieldLabel:this.labelNameEu, itemId:"text2", maxLength:240},
                            {xtype:'textfield', fieldLabel:this.labelDocNum, itemId:"ndoc", maxLength:56},
                            {xtype:'datefield', fieldLabel:this.labelDate, itemId:"dat"},
                            {xtype:'numberfield', fieldLabel:this.labelTotal, itemId:"ncopy", maxLength:10, allowDecimals:false, minValue:0},
                            {xtype:'hidden', itemId:"code"},
                            {xtype:'hidden', itemId:"fieldNum", value:'9'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function(){
                    var _f9='', _f9_1='', g = this.ownerCt.getComponent('disp.g9'), tabP = this.getComponent('g9_panel_tab_9');
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
                    var tCN = this.getComponent('g9_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype:'detailpanel',
                x:450, y:560, width:400,
                itemId:'g13_panel',
                title:this.labelCommercTerms,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses13',
                        itemId:'g13_panel_tab_13',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeDoc, itemId:"code", maxLength:3, triggerCls:'dir'},
                            {xtype:'textarea', fieldLabel:this.labelTextRu, itemId:"text", maxLength:500},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text2", maxLength:240},
                            {xtype:'hidden', itemId:"fieldNum", value:'13'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function(){
                    var _f13='', _f13_1='', g = this.ownerCt.getComponent('disp.g13'), tabP = this.getComponent('g13_panel_tab_13');
                    tabP.items.each(
                        function(item, index,length){
                            if(item.getComponent('text').getValue()){
                                _f13 = _f13 + (item.getComponent('code').getValue() ? "13." + item.getComponent('code').getValue() + ". " : "") +
                                        item.getComponent('text').getValue() + "\n";
                            }
                            if(item.getComponent('text2').getValue()){
                                _f13_1 = _f13_1 + (item.getComponent('code').getValue() ? "13." + item.getComponent('code').getValue() + ". " : "") +
                                        item.getComponent('text2').getValue() + "\n";
                            }
                        }
                    );
                    g.setValue((_f13 + _f13_1));
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
                        if(item.items){ // tabpanel
                            var tCN = item.tabCollectionName;
                            this.bufData[tCN] = {};
                            item.items.each(function(itm,ind,len){ // tab
                                this.bufData[tCN][ind]= {};
                                itm.items.each(function(field,i,l){ // fields
                                    this.bufData[tCN][ind][field.itemId] = field.getValue();
                                }, this);
                            }, this);
                        }
                        else if(item.itemId){ // input field
                            this.bufData['g13c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g13_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g13c'] = this.ownerCt.dataObj['g13c'];
                }
            },
            {
                xtype:'detailpanel',
                x:280, y:630, width:500,
                itemId:'g18v_panel',
                mode:'',
                bodyPadding:3,
                items:[
//                    {
//                        xtype: 'radiogroup',
//                        fieldLabel: 'Вид отправки',
//                        columns: 2,
//                        vertical: true,
//                        items: [
//                            { boxLabel: 'Контейнер с грузом', name:'smgs.vidKontOtpr', inputValue:1, checked: true},
//                            { boxLabel: 'Контейнер без груза', name:'smgs.vidKontOtpr', inputValue:2},
//                            { boxLabel: 'Вагонный лист с грузом', name:'smgs.vidKontOtpr', inputValue:3},
//                            { boxLabel: 'Вагонный лист без груза', name:'smgs.vidKontOtpr', inputValue:4}
//                        ]
//                    },
//                    {xtype:'textfield', fieldLabel:'Платформа', name:"smgs.platform", itemId:'platform', maxLength:80, width:100},
//                    {xtype:'textfield', fieldLabel:'Документ №', name:"smgs.docNum", itemId:'docNum', maxLength:80, width:100},
                    {xtype:'label', text: this.labelWagons, itemId:"g18v_label", cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsCarLists',
                        itemId:'g18v_panel_tab',
                        tabItems:[
                            {xtype:'textfield', fieldLabel:this.labelWagonNum, itemId:"nvag", maxLength:16, width:150},
//                            {xtype:'textfield', fieldLabel:'Примечание', itemId:"prim", maxLength:250, width:150},
//                            {xtype:'numberfield', fieldLabel:'Количество вагонов', itemId:'count', maxLength:10, width:80, minValue:0, allowDecimals:false},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"},
                            {xtype:'label', text: this.labelConts, itemId:"g18k_label", cls:'th'},
                            {
                                xtype:'detailtabpanel',
                                tabCollectionName:'cimSmgsKonLists',
                                itemId:'g18k_panel_tab',
                                hasParentCollection:true,
                                tabItems:[
//                                    {xtype:'numberfield', fieldLabel:'Размер', itemId:"sizeFoot", maxLength:5, allowDecimals:false, minValue:0},
//                                    {xtype:'textfield', fieldLabel:'Категория', itemId:"kat"},
                                    {xtype: 'fieldcontainer', fieldLabel:this.labelSize+' / '+this.labelCategory, itemId:'fcSizeKat', layout: 'hbox',
                                        items: [
                                           {xtype: 'displayfield', value:'x', fieldCls:'x-form-display-field bold'},
                                           {xtype: 'numberfield', itemId:'sizeFoot', flex: 1, maxLength:5, allowDecimals:false, minValue:0,margins: '0 2 0 2'},
                                           {xtype: 'displayfield', value: '\'', fieldCls:'x-form-display-field bold'},
                                           {xtype: 'textfield', itemId:'kat', flex: 5, margins: '0 0 0 8', maxLength:40}
                                        ]
                                    },

                                    {xtype: 'fieldcontainer', fieldLabel: this.labelWagonNum + '/' + this.labelWagonOtpr, itemId:'fcNvagG25', layout: 'hbox',
                                        items: [
                                           {xtype: 'displayfield', value: 'ŠR voz.'},
                                           {xtype: 'textfield', itemId:'nvag', flex:1, margins: '0 3 0 3', maxLength:16},
                                           {xtype: 'displayfield', value: '/'},
                                           {xtype: 'textfield', itemId:'g25', flex:1, margins: '0 0 0 3', maxLength:50}
                                        ]
                                    },

//                                    {xtype:'textfield', fieldLabel:'Номер вагона(широкий)', name:"nvag", itemId:'nvag'},
//                                    {xtype:'textfield', fieldLabel:'Отправка №(СМГС)', name:"g25", itemId:'g25'},

                                    {xtype:'textfield', fieldLabel:this.labelContNum, itemId:"utiN", maxLength:16},
                                    {xtype:'checkbox', fieldLabel:this.labelContPrivate, itemId:'privat', inputValue:'1', uncheckedValue:0},

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

//                                    {xtype:'numberfield', fieldLabel:'Количество контейнеров', itemId:'count', maxLength:10, width:80, minValue:0, allowDecimals:false},
                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text: this.labelCargo, itemId:"g18g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g18g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            {xtype:'textfield', fieldLabel:this.labelCode + 'NHM', itemId:"kgvn", maxLength:10, width:100},
                                            {xtype:'textarea', fieldLabel:this.labelName, itemId:"nzgr", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelName + ' Eu', itemId:"nzgrEu", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelName + ' (RID)', itemId:"nzgrRid", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelName + ' (RID) Eu', itemId:"nzgrRidEu", maxLength:4000, width:250},
                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
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
                                case 'g18v_' : // vag
                                    if(this.items.getCount() == 0){// no vags
                                        this.addTab();
                                    }
                                    break;
                                case 'g18k_' : // kon
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g18k_panel_tab'); // konts in vag
//                                    if(konts.items.getCount() == 0){// no konts
                                        konts.addTab();
//                                    }
                                    break;
                                case 'g18g_' : // gruz
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g18k_panel_tab'); // konts in vag
                                    kon = konts.items.first() || konts.addTab(); // cur or new kon
                                    kon.getComponent('g18g_panel_tab').addTab(); // add new gruz
                                    break;
                            }
                            this.ownerCt.changeCmpVisibility(this.ownerCt.mode);
                        },
                        onDelTab:function() {
                            var vag, konts, kon, gruzs, gruz;
                            switch (this.ownerCt.mode) {
                                case 'g18v_' : // vag
                                    this.delTab();
                                    break;
                                case 'g18k_' : // kon
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g18k_panel_tab');
                                        kon = konts.delTab(); // del kon
                                        if(!kon){ //if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                                case 'g18g_' : // gruz
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g18k_panel_tab');
                                        kon = konts.items.first();
                                        if(kon){
                                            gruzs = kon.getComponent('g18g_panel_tab');
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
                    var vags = this.getComponent('g18v_panel_tab'),konts, gruzs;
                    switch (itemId) {
                       case 'g18v_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g18k_label').hide();
                                vag.getComponent('g18k_panel_tab').hide();
                            }, this);
                            break;
                       case 'g18k_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g18k_label').show();
                                konts = vag.getComponent('g18k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g18g_label').hide();
                                    gruzs = kon.getComponent('g18g_panel_tab');
                                    gruzs.hide();
                                }, this);
                            }, this);
                            break;
                       case 'g18g_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g18k_label').show();
                                konts = vag.getComponent('g18k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g18g_label').show();
                                    gruzs = kon.getComponent('g18g_panel_tab');
                                    gruzs.show();
                                }, this);
                            }, this);
                            break;
                    }
                },
                setDisplayedField:function(){
                    var dispField, value = '',
                        vags = this.getComponent('g18v_panel_tab'),
                        vag= vags.getComponent(0),
                        gruzy,
                        nl='\n', space = ' ', slash = '/', comma = ',',
                        hasData, fCon;/*,
                        vidKontOtpr = this.child('radiogroup')*/
                    dispField = this.ownerCt.getComponent('disp.g18v');
                    if(vag){
                        value += vag.getComponent('nvag').getValue() ? vag.getComponent('nvag').getValue() : '';
//                        value += vag.getComponent('prim').getValue() ? nl + vag.getComponent('prim').getValue() : '';
                        dispField.setValue(value);
                        dispField = this.ownerCt.getComponent('disp.g18g');
                        value = '';
                        vag.getComponent('g18k_panel_tab').items.each(function(kon, ix, len){
                            if(ix == 0){ // 1-st kontainer
                                value = len;
                                fCon = kon.getComponent('fcSizeKat');
                                value += fCon.getComponent('sizeFoot').getValue() ? 'x' + fCon.getComponent('sizeFoot').getValue() + '\'' : '';
                                value += fCon.getComponent('kat').getValue() ? space + fCon.getComponent('kat').getValue() : '';
                            }
                            gruzy = kon.getComponent('g18g_panel_tab');
                            gruzy.items.each(function(gruz){
                                if(gruz.getComponent('kgvn').getValue()){
                                    value += nl + 'NHM ' + gruz.getComponent('kgvn').getValue();
                                    nl = '';
                                }
                                if(gruz.getComponent('nzgr').getValue()){
                                    if(nl) space = '';
                                    value += nl + space + gruz.getComponent('nzgr').getValue();
                                }
                                nl = '\n';
                                if(gruz.getComponent('nzgrEu').getValue()){
                                    value += nl + gruz.getComponent('nzgrEu').getValue();
                                }
                                if(gruz.getComponent('nzgrRid').getValue()){
                                    value += nl + gruz.getComponent('nzgrRid').getValue();
                                }
                                if(gruz.getComponent('nzgrRidEu').getValue()){
                                    value += nl + gruz.getComponent('nzgrRidEu').getValue();
                                }
                                if(gruz.getComponent('places').getValue()){
                                    value += nl + gruz.getComponent('places').getValue();
                                }
                            });
                            fCon = kon.getComponent('fcNvagG25');
                            if(fCon.getComponent('nvag').getValue()){
                                value += nl + 'ŠR voz.' + space + fCon.getComponent('nvag').getValue();
                                hasData = 1;
                            }
                            if(fCon.getComponent('g25').getValue()){
                                value += (hasData ? slash + fCon.getComponent('g25').getValue() : nl + fCon.getComponent('g25').getValue());
                            }

                            value += nl;
                            if(kon.getComponent('utiN').getValue()){
                                value += kon.getComponent('utiN').getValue();
                            }
                            if(kon.getComponent('privat').checked){
                                value += space + '"P"';
                            }
                            fCon = kon.getComponent('fcNetto');
                            if(fCon.getComponent('nettoPref').getValue()){
                                value += space + fCon.getComponent('nettoPref').getValue();
                            }
                            if(fCon.getComponent('netto').getValue()){
                                value += space + fCon.getComponent('netto').getValue();
                            }
                            if(fCon.getComponent('nettoSuf').getValue()){
                                value += fCon.getComponent('nettoSuf').getValue();
                            }
                            fCon = kon.getComponent('fcTara');
                            if(fCon.getComponent('taraPref').getValue()){
                                value += space + fCon.getComponent('taraPref').getValue();
                            }
                            if(fCon.getComponent('tara').getValue()){
                                value += space + fCon.getComponent('tara').getValue();
                            }
                            if(fCon.getComponent('taraSuf').getValue()){
                                value += fCon.getComponent('taraSuf').getValue();
                            }
                            fCon = kon.getComponent('fcBrutto');
                            if(fCon.getComponent('bruttoPref').getValue()){
                                value += space + fCon.getComponent('bruttoPref').getValue();
                            }
                            if(fCon.getComponent('brutto').getValue()){
                                value += space + fCon.getComponent('brutto').getValue();
                            }
                            if(fCon.getComponent('bruttoSuf').getValue()){
                                value += fCon.getComponent('bruttoSuf').getValue();
                            }
                            if(kon.getComponent('vid').getValue()){
                                value += slash + kon.getComponent('vid').getValue();
                            }
                            if(kon.getComponent('prim').getValue()){
                                value += nl + kon.getComponent('prim').getValue();
                            }
                        }, this);

                        dispField.setValue(value);

                    } else{
                        dispField.setValue('');
                        this.ownerCt.getComponent('disp.g18g').setValue('');
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
                    var tCN = this.getComponent('g18v_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
//                    this.bufData['vidKontOtpr'] = this.ownerCt.dataObj['vidKontOtpr'];
//                    this.bufData['platform'] = this.ownerCt.dataObj['platform'];
//                    this.bufData['docNum'] = this.ownerCt.dataObj['docNum'];
                }
            }
        ]
    },

    initServiceFields: function(data, initGrids){
        this.getForm().setValues(data);
    },
    initBuffers: function(){
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g4_panel').initBuf();
        this.getComponent('g7_panel').initBuf();
        this.getComponent('g9_panel').initBuf();
        this.getComponent('g13_panel').initBuf();
        this.getComponent('g18v_panel').initBuf();
    },
    initCollections: function(){
        this.getComponent('g7_panel').copyValues2MainFlds();
        this.getComponent('g9_panel').copyValues2MainFlds();
        this.getComponent('g13_panel').copyValues2MainFlds();
        this.getComponent('g18v_panel').copyValues2MainFlds();
    },
    initDisplayedFields:function(){
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g4_panel').setDisplayedField();
        this.getComponent('g7_panel').setDisplayedField();
        this.getComponent('g9_panel').setDisplayedField();
        this.getComponent('g13_panel').setDisplayedField();
        this.getComponent('g18v_panel').setDisplayedField();
    },
    buildDockedItems:function(config) {
        this.callParent(arguments);
        var controller = TK.app.getController('Docs'),
            menuItem = controller.getMenutree().lastSelectedLeaf;
        if(controller.docsInRoute(menuItem).getByKey('smgs')){
            config.dockedItems[0].items.push('-',{text: 'Запросить Smgs',iconCls:'smgs1',itemId: 'smgs2Cim', action:'smgs2Cim'});
        }
    }
});