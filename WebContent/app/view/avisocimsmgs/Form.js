Ext.define('TK.view.avisocimsmgs.Form', {
    extend:'TK.view.DocsForm',
    alias:'widget.avisocimsmgs1',
    requires: [
        'Ext.button.Button',
        'Ext.data.ArrayStore',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Hidden',
        'Ext.form.field.Number',
        'Ext.form.field.Radio',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger',
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Separator',
        'TK.model.SmgsKon',
        'TK.view.edit.DetailGrid',
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel'
    ],
    buildItems:function(config) {
        config.items = [
            {xtype:'box', autoEl:{tag: 'img', src: 'resources/images/cimsmgs4.jpg'}},
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},   // status of the current operation with this doc
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'10'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:27},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'avisocimsmgs'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},

            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].hid", itemId:'vagHid'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort", value:'0'},
            {xtype:'hidden', name:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid", itemId:'konHid'},


            {x:9, y:38, xtype:'label', text:'№:'},
            {x:45, y:33, name:'smgs.aviso_num', itemId:'smgs.aviso_num', maxLength:20, width:50},
            {x:9, y:65, xtype:'label', text:this.labelDate},
            {x:45, y:60, xtype:'datefield', name:'smgs.aviso_dat', itemId:'smgs.aviso_dat', width:80},


            {x:150, y:38, xtype:'label', text:this.labelCodyDo},
            {x:265, y:33, xtype:'datefield', name:'smgs.aviso_cod_dat', itemId:'smgs.aviso_cod_dat', width:80},
            {x:373, y:38, xtype:'label', text:this.labelVsegoSmgs},
            {x:483, y:33, xtype:'numberfield', name:'smgs.amount', itemId:'smgs.amount', minValue:1, value:1, width:45},
//            {x:150, y:35, xtype:'checkboxfield', boxLabel:'Готова для формирования СМГС', name:'smgs.ready', itemId:'smgs.ready', inputValue: '4'},
            {x:373, y:65, xtype:'label', text:this.labelZakazNum},
            {x:453, y:60, name:'smgs.zakazNo', itemId:'smgs.zakazNo', maxLength:20, width:100},
            {x:559, y:38, xtype:'label', text:this.labelWagenNum},
            {x:643, y:33, name:'smgs.npoezd', itemId:'smgs.npoezd', maxLength:32, width:350},


            {xtype:'textarea',x:134, y:159, width:355, height:105, readOnly:true, name:'disp.g1', itemId:'disp.g1', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:430, y:265,
                action:'change',
                itemId:'g1_'
            },
            {xtype:'textarea',x:134, y:312, width:355, height:105, readOnly:true, name:'disp.g4', itemId:'disp.g4', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:430, y:418,
                action:'change',
                itemId:'g4_'
            },
            {xtype:'textarea',x:697, y:186, width:581, height:58, readOnly:true, name:'disp.g7', itemId:'disp.g7', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:697, y:162,
                action:'change',
                itemId:'g7_'
            },
            {xtype:'textarea',x:697, y:245, width:581, height:40, name:'smgs.g4prim', itemId:'smgs.g4prim'},
            /*{xtype:'textarea',x:697, y:310, width:581, height:89, readOnly:true, name:'disp.g9', itemId:'disp.g9', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:905, y:287,
                action:'change',
                itemId:'g9_'
            },*/
            {xtype:'textarea',x:16, y:585, width:423, height:83, readOnly:true, name:'disp.g13', itemId:'disp.g13', submitValue:false},
            {
                xtype:'button',
                text:this.btnChange,
                x:441, y:645,
                action:'change',
                itemId:'g13_'
            },


            {xtype:'textarea', x:16, y:815, width:112, height:280, readOnly:true, name:'disp.g20k', itemId:'disp.g20k', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:16, y:770,
                action:'change',
                itemId:'g20k_'
            },

            {xtype:'textarea', x:118, y:815, width:740, height:280, readOnly:true, name:'disp.g20g', itemId:'disp.g20g', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:580, y:790,
                action:'change',
                itemId:'g20g_'
            },

            /*{xtype:'textarea',x:696, y:667, width:273, height:76, readOnly:true, name:'disp.g19v', itemId:'disp.g19v', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeWagen,
                x:835, y:645,
                action:'change',
                itemId:'g19v_'
            },
            {xtype:'textarea',x:16, y:815, width:100, height:238, readOnly:true, name:'disp.g19k', itemId:'disp.g19k', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeCont,
                x:16, y:770,
                action:'change',
                itemId:'g19k_'
            },
            {xtype:'textarea',x:118, y:815, width:735, height:238, readOnly:true, name:'disp.g19g', itemId:'disp.g19g', submitValue:false},
            {
                xtype:'button',
                text:this.btnChangeGr,
                x:380, y:791,
                action:'change',
                itemId:'g19g_'
            },*/
//            {x:512, y:60, name: 'smgs.npoezd',fieldLabel:this.labelWagenNum, labelStyle:'font-weight:bold;', itemId:'smgs.npoezd', maxLength:32, width:250},
            {x:16, y:1053, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024, width:835, height:60},
            {x:512, y:140, name: 'smgs.g2', itemId:'smgs.g2', maxLength:32, width:175},
            {x:512, y:180, name: 'smgs.g3', itemId:'smgs.g3', maxLength:32, width:175},
            {x:575, y:215, name: 'smgs.g11_1', itemId:'smgs.g11_1', maxLength:80, width:115},
            {x:550, y:239, name: 'smgs.g12_1', itemId:'smgs.g12_1', maxLength:60, width:140},
            {x:550, y:263, name: 'smgs.g13_1', itemId:'smgs.g13_1', maxLength:60, width:140},
            {x:965, y:162, name: 'smgs.g8', itemId:'smgs.g8', maxLength:64, width:150},
            {x:512, y:292, name: 'smgs.g5', itemId:'smgs.g5', maxLength:32, width:175},
            {x:512, y:332, name: 'smgs.g6', itemId:'smgs.g6', maxLength:32, width:175},
            {x:575, y:367, name: 'smgs.g41_1', itemId:'smgs.g41_1', maxLength:80, width:115},
            {x:550, y:391, name: 'smgs.g42_1', itemId:'smgs.g42_1', maxLength:60, width:140},
            {x:550, y:415, name: 'smgs.g43_1', itemId:'smgs.g43_1', maxLength:60, width:140},
            {x:445, y:582, name: 'smgs.g141', itemId:'smgs.g141', maxLength:40, width:61},
            {x:507, y:582, name: 'smgs.g142', itemId:'smgs.g142', maxLength:32, width:186},
            {x:16, y:483, name: 'smgs.g101', itemId:'smgs.g101', maxLength:80, width:350},
            {x:16, y:515, name: 'smgs.g101r', itemId:'smgs.g101r', maxLength:80, width:350},
            {x:372, y:483, name: 'smgs.g102', itemId:'smgs.g102', maxLength:64, width:320},
            {x:372, y:515, name: 'smgs.g102r', itemId:'smgs.g102r', maxLength:64, width:320},

            {x:16, y:540, name: 'smgs.g2017', itemId:'smgs.g2017', maxLength:250, width:677},

            {x:258, y:455, name: 'smgs.g11', itemId:'smgs.g11', maxLength:40, width:225},
            {x:494, y:455, name: 'smgs.g12', itemId:'smgs.g12', maxLength:2, width:57},
            {x:555, y:455, name: 'smgs.g121', itemId:'smgs.g121', maxLength:6, width:138},
            {x:16, y:690, xtype:'textarea', name: 'smgs.g15', itemId:'smgs.g15', maxLength:512, width:337, height:55},
            {x:355, y:690, xtype:'textarea', name: 'smgs.g15r', itemId:'smgs.g15r', maxLength:512, width:337, height:55},
            {x:696, y:441, name: 'smgs.g162', itemId:'smgs.g162', maxLength:80, width:276},
            {x:696, y:465, name: 'smgs.g162r', itemId:'smgs.g162r', maxLength:80, width:276},
            {x:978, y:441, name: 'smgs.g163', itemId:'smgs.g163', maxLength:64, width:300},
            {x:978, y:465, name: 'smgs.g163r', itemId:'smgs.g163r', maxLength:64, width:300},
            {x:906, y:406, name: 'smgs.g161', itemId:'smgs.g161', maxLength:8, width:135},
            {x:1070, y:406, name: 'smgs.g171', itemId:'smgs.g171', maxLength:2, width:57},
            {x:1136, y:406, name: 'smgs.g17', itemId:'smgs.g17', maxLength:40, width:141},
            {x:696, y:525, xtype:'textarea', name: 'smgs.g18', itemId:'smgs.g18', maxLength:512, width:194, height:76},
            {x:892, y:525, xtype:'textarea', name: 'smgs.g18r', itemId:'smgs.g18r', maxLength:512, width:194, height:76},
            {x:856, y:608, name: 'smgs.g181', itemId:'smgs.g181', maxLength:10, width:227},
            {x:1089, y:525, xtype:'textarea', name: 'smgs.g18B1', itemId:'smgs.g18B1', maxLength:100, width:89, height: 117},

            /*{x:830, y:165, xtype:'checkbox', name:'smgs.g7c', inputValue:'1', itemId:'smgs.g7c', boxLabel:this.labelDopList},
            {x:985, y:290, xtype:'checkbox', name:'smgs.g9c', inputValue:'1', itemId:'smgs.g9c', boxLabel:this.labelDopList},
            {x:975, y:505, xtype:'checkbox', name:'smgs.g18c', inputValue:'1', itemId:'smgs.g18c', boxLabel:this.labelDopList},
            {x:306, y:565, xtype:'checkbox', name:'smgs.g13c', inputValue:'1', itemId:'smgs.g13c', boxLabel:this.labelDopList},
            {x:580, y:667, xtype:'checkbox', name:'smgs.g15c', inputValue:'1', itemId:'smgs.g15c', boxLabel:this.labelDopList},
            {x:165, y:752, xtype:'checkbox', name:'smgs.g20c', inputValue:'1', itemId:'smgs.g20c', boxLabel:this.labelDopList},*/

            {x:1189, y:525, name: 'smgs.g18B2', itemId:'smgs.g18B2', maxLength:4, width:89},
            {x:972, y:667, xtype:'textarea', name: 'smgs.g191', itemId:'smgs.g191', maxLength:16, width:90, height:75},
            {x:1065, y:667, xtype:'textarea', name: 'smgs.g192', itemId:'smgs.g192', maxLength:5, width:28, height:75},
            {x:1096, y:667, xtype:'textarea', name: 'smgs.g193', itemId:'smgs.g193', maxLength:16, width:89, height:75},
            {x:1188, y:690, xtype:'numberfield', name: 'smgs.g48', itemId:'smgs.g48', maxLength:16, width:92, minValue:0},
            {x:648, y:750, xtype:'checkbox', name:'smgs.g21', inputValue:'1', itemId:'smgs.g21'},
            {x:830, y:748, xtype:'checkbox', name:'smgs.g22', inputValue:'1', itemId:'smgs.g22'},
            {x:805, y:1158, xtype:'radio', name:'smgs.g25', inputValue:'1', itemId:'smgs.g25_v'},
            {x:945, y:1158, xtype:'radio', name:'smgs.g25', inputValue:'2', itemId:'smgs.g25_k', checked:true},
            {x:865, y:770, xtype:'label', text:this.labelCodeGng, style: 'font-weight:bold;'},
            {x:865, y:785, name: 'smgs.g23', itemId:'smgs.g23', maxLength:20, width:120},
            {x:865, y:815, xtype:'label', text:this.labelCodeEtsng, style: 'font-weight:bold;'},
            {x:865, y:830, name: 'smgs.g23b', itemId:'smgs.g23b', maxLength:20, width:120},
//        {x:865, y:865, name: 'smgs.g23a', itemId:'smgs.g23a', maxLength:20, width:120},
            {x:1001, y:785, xtype:'label', text:this.labelNetto, style: 'font-weight:bold;'},
            {x:1047, y:780, xtype:'numberfield', name: 'smgs.g24N', itemId:'smgs.g24N', maxLength:14, width:92, minValue:0, decimalPrecision:3},
            {x:1001, y:810, xtype:'label', text:this.labelTara, style: 'font-weight:bold;'},
            {x:1047, y:805, xtype:'numberfield', name: 'smgs.g24T', itemId:'smgs.g24T', maxLength:14, width:92, minValue:0, decimalPrecision:3},
            {x:1001, y:835, xtype:'label', text:this.labelBrutto, style: 'font-weight:bold;'},
            {x:1047, y:830, xtype:'numberfield', name: 'smgs.g24B', itemId:'smgs.g24B', maxLength:14, width:92, minValue:0, decimalPrecision:3},
            {x:1005, y:860, xtype:'label', itemId:'smgs._g24B', style: 'font-size: 11px;', width: 134},
            {x:1005, y:900, xtype:'textarea', name: 'smgs.g_24_bcn', itemId:'smgs.g_24_bcn', maxLength:20, width:134, height:40},

            {x:1150, y:795, xtype:'numberfield', name: 'smgs.g38', itemId:'smgs.g38', maxLength:10, width:100, minValue:0},
            {x:865, y:970, xtype:'textarea', name: 'smgs.g26', itemId:'smgs.g26', maxLength:128, width:260, height:70},
            {x:1150, y:970, xtype:'textarea', name: 'smgs.g27', itemId:'smgs.g27', maxLength:64, width:120, height:70},
            {x:1150, y:1075, xtype:'textarea', name: 'smgs.g39', itemId:'smgs.g39', maxLength:50, width:120, height:70},
            {x:16, y:1128, name: 'smgs.g2012', itemId:'smgs.g2012', maxLength:160, width:838},
            {x:802, y:1193, name: 'smgs.g591', itemId:'smgs.g591', maxLength:2, width:44},
            {x:855, y:1193, name: 'smgs.g592', itemId:'smgs.g592', maxLength:2, width:44},
            {x:902, y:1193, name: 'smgs.g593', itemId:'smgs.g593', maxLength:2, width:44},
            {x:949, y:1193, name: 'smgs.g594', itemId:'smgs.g594', maxLength:2, width:44},
            {x:995, y:1193, name: 'smgs.g595', itemId:'smgs.g595', maxLength:2, width:44},
            {x:1042, y:1193, name: 'smgs.g596', itemId:'smgs.g596', maxLength:2, width:44},
            {x:1095, y:1193, name: 'smgs.g597', itemId:'smgs.g597', maxLength:2, width:44},
            {x:1142, y:1193, name: 'smgs.g598', itemId:'smgs.g598', maxLength:6, width:137},
            {x:715, y:1242, xtype:'textarea', name: 'smgs.g60', itemId:'smgs.g60', maxLength:240, width:563, height:60},
            {x:713, y:1317, name: 'smgs.g61', itemId:'smgs.g61', maxLength:80, width:377},
            {x:1095, y:1317, name: 'smgs.g611', itemId:'smgs.g611', maxLength:2, width:42},
            {x:1142, y:1317, name: 'smgs.g612', itemId:'smgs.g612', maxLength:6, width:137},
            {x:865, y:1357, name: 'smgs.g62', itemId:'smgs.g62', maxLength:16, width:116},
            {x:984, y:1357, name: 'smgs.g621', itemId:'smgs.g621', maxLength:4, width:100},
            {x:1085, y:1357, name: 'smgs.g622', itemId:'smgs.g622', maxLength:4, width:100},
            {x:17, y:1403, xtype:'textarea', name: 'smgs.g29', itemId:'smgs.g29', maxLength:128, width:170, height:91},
            {x:189, y:1403, xtype:'textarea', name: 'smgs.g29r', itemId:'smgs.g29r', maxLength:128, width:170, height:91},
            {x:364, y:1407, xtype:'textarea', name: 'smgs.g30', itemId:'smgs.g30', maxLength:64, width:327, height:87},
            {x:697, y:1407, xtype:'textarea', name: 'smgs.g63', itemId:'smgs.g63', maxLength:180, width:580, height:86},
            {x:17, y:1517, xtype:'textarea', name: 'smgs.g64', itemId:'smgs.g64', maxLength:160, width:342, height:100},
            {x:364, y:1528, xtype:'textarea', name: 'smgs.g65', itemId:'smgs.g65', maxLength:200, width:412, height:89},
            {x:782, y:1525, xtype:'textarea', name: 'smgs.g651', itemId:'smgs.g651', maxLength:160, width:402, height:91},
            {x:1187, y:1524, xtype:'textarea', name: 'smgs.g652', itemId:'smgs.g652', maxLength:30, width:90, height:92},
            {x:17, y:1639, xtype:'textarea', name: 'smgs.ga66', itemId:'smgs.ga66', maxLength:100, width:342, height:77},
            {x:380, y:1639, xtype:'datefield', name: 'smgs.g67', itemId:'smgs.g67', width:80},
            {x:336, y:1737, xtype:'checkbox', name:'smgs.gb661', inputValue:'1', itemId:'smgs.gb661'},
            {x:270, y:1818, name: 'smgs.gb662', itemId:'smgs.gb662', maxLength:4, width:90},
            {x:800, y:1646, name: 'smgs.g68', itemId:'smgs.g68', maxLength:6, width:132},
            {x:1057, y:1639, name: 'smgs.g691', itemId:'smgs.g691', maxLength:2, width:40},
            {x:1130, y:1639, name: 'smgs.g692', itemId:'smgs.g692', maxLength:6, width:134},
            {x:1010, y:1705, name: 'smgs.g693', itemId:'smgs.g693', maxLength:4, width:88},
            {x:1130, y:1705, name: 'smgs.g694', itemId:'smgs.g694', maxLength:50, width:134},
            {x:938, y:1765, xtype:'textarea', name: 'smgs.g28', itemId:'smgs.g28', maxLength:240, width:250, height:85},
            {x:1190, y:1765, xtype:'datefield', name: 'smgs.g281', itemId:'smgs.g281', width:80},

            {x:102, y:1169, name: 'smgs.ga491', itemId:'smgs.ga491', maxLength:2, width:44},
            {x:102, y:1206, name: 'smgs.ga492', itemId:'smgs.ga492', maxLength:2, width:44},
            {x:148, y:1169, name: 'smgs.ga493', itemId:'smgs.ga493', maxLength:6, width:137},
            {x:148, y:1206, name: 'smgs.ga494', itemId:'smgs.ga494', maxLength:6, width:137},

            {x:290, y:1169, name: 'smgs.ga50', itemId:'smgs.ga50', maxLength:3, width:74},
            {x:369, y:1169, name: 'smgs.ga51', itemId:'smgs.ga51', maxLength:6, width:143},

            {x:290, y:1206, name: 'smgs.ga52', itemId:'smgs.ga52', maxLength:6, width:74},
            {x:369, y:1206, name: 'smgs.ga53', itemId:'smgs.ga53', maxLength:3, width:143},

            {x:39, y:1245, name: 'smgs.ga54', itemId:'smgs.ga54', maxLength:7, width:166},
            {x:212, y:1245, name: 'smgs.ga55', itemId:'smgs.ga55', maxLength:4, width:96},
            {x:314, y:1245, name: 'smgs.ga56', itemId:'smgs.ga56', maxLength:4, width:97},
            {x:417, y:1245, name: 'smgs.ga57', itemId:'smgs.ga57', maxLength:4, width:96},


            {
                xtype:'detailpanel',
                x:500, y:100, width:400,
                itemId:'g1_panel',
                title:this.labelSender,
                items:[
                    {xtype:'textarea', fieldLabel:this.labelName, name:'smgs.g1', itemId:'smgs.g1', maxLength:512}
                    ,{xtype:'trigger', fieldLabel:this.labelNameRu, name:"smgs.g1r", itemId:"smgs.g1r", maxLength:512, triggerCls:'dir'/*, onTriggerClick: otprSprav.createDelegate(this, ['cimsmgs','g1_panel'])*/}
                    ,{fieldLabel:this.labelCountryCode, name: 'smgs.g15_1', itemId:'smgs.g15_1', maxLength:3}
                    ,{fieldLabel:this.labelCountry, name: 'smgs.g16_1', itemId:'smgs.g16_1', maxLength:32}
                    ,{fieldLabel:this.labelCountryRu, name: 'smgs.g16r', itemId:'smgs.g16r', maxLength:32}
                    ,{fieldLabel:this.labelZip, name: 'smgs.g17_1', itemId:'smgs.g17_1', maxLength:10}
                    ,{fieldLabel:this.labelCity, name: 'smgs.g18_1', itemId:'smgs.g18_1', maxLength:32}
                    ,{fieldLabel:this.labelCityRu, name: 'smgs.g18r_1', itemId:'smgs.g18r_1', maxLength:32}
                    ,{xtype:'textarea', fieldLabel:this.labelAdress, name: 'smgs.g19_1', itemId:'smgs.g19_1', maxLength:128}
                    ,{xtype:'textarea', fieldLabel:this.labelAdressRu, name: 'smgs.g19r', itemId:'smgs.g19r', maxLength:250}
                    ,{fieldLabel:'VAT', name: 'smgs.g110', itemId:'smgs.g110', maxLength:16}
                ],
                setDisplayedField: function () {
                    var g = this.ownerCt.getComponent('disp.g1');

                    var _g1a = (this.getComponent('smgs.g1').getValue() ? this.getComponent('smgs.g1').getValue() : '');
                    var _g1b = (this.getComponent('smgs.g19_1').getValue() ? this.getComponent('smgs.g19_1').getValue() : '') +
                        (this.getComponent('smgs.g17_1').getValue() ? ' ' + this.getComponent('smgs.g17_1').getValue() : '') +
                        (this.getComponent('smgs.g18_1').getValue() ? ' ' + this.getComponent('smgs.g18_1').getValue() : '');
                    var _g1c = (this.getComponent('smgs.g16_1').getValue() ? this.getComponent('smgs.g16_1').getValue() : '') +
                        (this.getComponent('smgs.g110').getValue() ? ' ' + this.getComponent('smgs.g110').getValue() : '');
                    var _g1 = _g1a + (_g1a ? '\n' : '') + _g1b + (_g1b ? '\n' : '') + _g1c + (_g1c ? '\n' : '');

                    var _g1ra = (this.getComponent('smgs.g1r').getValue() ? this.getComponent('smgs.g1r').getValue() : '');
                    var _g1rb = (this.getComponent('smgs.g19r').getValue() ? this.getComponent('smgs.g19r').getValue() : '') +
                        (this.getComponent('smgs.g17_1').getValue() ? ' ' + this.getComponent('smgs.g17_1').getValue() : '') +
                        (this.getComponent('smgs.g18r_1').getValue() ? ' ' + this.getComponent('smgs.g18r_1').getValue() : '');
                    var _g1rc = (this.getComponent('smgs.g16r').getValue() ? this.getComponent('smgs.g16r').getValue() : '') +
                        (this.getComponent('smgs.g110').getValue() ? ' ' + this.getComponent('smgs.g110').getValue() : '');
                    var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '') + _g1rc;

                    g.setValue((_g1 ? _g1 : '') + _g1r);
                },
                copyValues2MainFlds: function () {
                    for (var prop in this.bufData) {
                        this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
                    }
                },
                copyValues2Buf: function () {
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        this.bufData[item.itemId.split('.')[1]] = item.getValue();
                    }, this);
                },
                initBuf: function () {
                    this.bufData = {};
                    var data = this.ownerCt.dataObj;
                    this.items.each(function (item, index, length) {
                        var arr = item.itemId.split('.');
                        this.bufData[arr[1]] = data[arr[1]];
                    }, this);
                }
            },
            {
                xtype:'detailpanel',
                x:500, y:250, width:400,
                itemId:'g4_panel',
                title:this.labelReceiver,
                items:[
                    {xtype:'textarea', fieldLabel:this.labelName, name:'smgs.g4', itemId:'smgs.g1_1', maxLength:512}
                    ,{xtype:'trigger', fieldLabel:this.labelNameRu, name:"smgs.g4r", itemId:"smgs.g1r_1", maxLength:512, triggerCls:'dir'/*, onTriggerClick: otprSprav.createDelegate(this, ['cimsmgs','g4_panel'])*/}
                    ,{fieldLabel:this.labelCountryCode, name: 'smgs.g45_1', itemId:'smgs.g15_1_1', maxLength:3}
                    ,{fieldLabel:this.labelCountry, name: 'smgs.g46_1', itemId:'smgs.g16_1_1', maxLength:32}
                    ,{fieldLabel:this.labelCountryRu, name: 'smgs.g46r', itemId:'smgs.g16r_1', maxLength:32}
                    ,{fieldLabel:this.labelZip, name: 'smgs.g47_1', itemId:'smgs.g17_1_1', maxLength:10}
                    ,{fieldLabel:this.labelCity, name: 'smgs.g48_1', itemId:'smgs.g18_1_1', maxLength:32}
                    ,{fieldLabel:this.labelCityRu, name: 'smgs.g48r', itemId:'smgs.g18r_1', maxLength:32}
                    ,{xtype:'textarea', fieldLabel:this.labelAdress, name: 'smgs.g49', itemId:'smgs.g19_1', maxLength:128}
                    ,{xtype:'textarea', fieldLabel:this.labelAdressRu, name: 'smgs.g49r', itemId:'smgs.g19r_1', maxLength:250}
                    ,{fieldLabel:'VAT', name: 'smgs.g410', itemId:'smgs.g110_1', maxLength:16}
                ],
                setDisplayedField:function () {
                    var g = this.ownerCt.getComponent('disp.g4');

                    var _g1a = (this.getComponent('smgs.g1_1').getValue() ? this.getComponent('smgs.g1_1').getValue() : '');
                    var _g1b = (this.getComponent('smgs.g19_1').getValue() ? this.getComponent('smgs.g19_1').getValue() : '') +
                        (this.getComponent('smgs.g17_1_1').getValue() ? ' ' + this.getComponent('smgs.g17_1_1').getValue() : '') +
                        (this.getComponent('smgs.g18_1_1').getValue() ? ' ' + this.getComponent('smgs.g18_1_1').getValue() : '');
                    var _g1c = (this.getComponent('smgs.g16_1_1').getValue() ? this.getComponent('smgs.g16_1_1').getValue() : '') +
                        (this.getComponent('smgs.g110_1').getValue() ? ' ' + this.getComponent('smgs.g110_1').getValue() : '');
                    var _g1 = _g1a + (_g1a ? '\n' : '') + _g1b + (_g1b ? '\n' : '') + _g1c + (_g1c ? '\n' : '');

                    var _g1ra = (this.getComponent('smgs.g1r_1').getValue() ? this.getComponent('smgs.g1r_1').getValue() : '');
                    var _g1rb = (this.getComponent('smgs.g19r_1').getValue() ? this.getComponent('smgs.g19r_1').getValue() : '') +
                        (this.getComponent('smgs.g17_1_1').getValue() ? ' ' + this.getComponent('smgs.g17_1_1').getValue() : '') +
                        (this.getComponent('smgs.g18r_1').getValue() ? ' ' + this.getComponent('smgs.g18r_1').getValue() : '');
                    var _g1rc = (this.getComponent('smgs.g16r_1').getValue() ? this.getComponent('smgs.g16r_1').getValue() : '') +
                        (this.getComponent('smgs.g110_1').getValue() ? ' ' + this.getComponent('smgs.g110_1').getValue() : '');
                    var _g1r = _g1ra + (_g1ra ? '\n' : '') + _g1rb + (_g1rb ? '\n' : '') + _g1rc;

                    g.setValue((_g1 ? _g1 : '') + _g1r);
                },
                copyValues2MainFlds:function () {
                    var form = this.ownerCt.getForm();
                    for (var prop in this.bufData) {
                        form.findField('smgs.' + prop).setValue(this.bufData[prop]);
                    }
                },
                copyValues2Buf:function () {
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        this.bufData[item.name.split('.')[1]] = item.getValue();
                    }, this);
                },
                initBuf:function () {
                    this.bufData = {};
                    var data = this.ownerCt.dataObj;
                    this.items.each(function (item, index, length) {
                        var arr = item.name.split('.');
                        this.bufData[arr[1]] = data[arr[1]];
                    }, this);
                }
            },
            {
                xtype:'detailpanel',
                x:290, width:450,
                itemId:'g7_panel',
                title:this.labelZayavSenderPayers,
                items:[
                    {xtype:'label', text: this.labelZayavSender, cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses7',
                        itemId:'g7_panel_tab_7',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeDoc, itemId:"code", maxLength:3/*, onTriggerClick: fieldsOptSearch*/, triggerCls:'dir', width:50 },
                            {xtype:'textarea', fieldLabel:this.labelTextRu, itemId:"text", maxLength:500, width:200},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text2", maxLength:240, width:200},
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
                            {xtype:'trigger', fieldLabel:this.labelPayerName,  itemId:"plat", maxLength:45/*, onTriggerClick:nsiPlat*/, triggerCls:'dir', width:200},
                            {xtype:'textfield', fieldLabel:this.labelPayerNameRu,  itemId:"platR", maxLength:45, width:200},
                            {xtype:'combo', fieldLabel:this.labelBukvKod,  itemId:"dor", maxLength:5, width:50,
                                store: ['PKP','DB','SNCF','RZD','UZ','BC','UTI', 'KTZ', 'KRG','ZSR'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true},
                            {xtype:'combo', fieldLabel:this.labelBukvKod,  itemId:"dorR", maxLength:5, width:50,
                                store: ['РЖД','УЗ','БЧ','УТИ', 'КЗХ', 'КРГ','ЖСР'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true},
                            {xtype:'textarea', fieldLabel:this.labelPayment, itemId:"prim", maxLength:70, width:250},
                            {xtype:'textarea', fieldLabel:this.labelPaymentRu, itemId:"primR",  maxLength:70, width:250},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod1, maxLength:50, itemId:"kplat", width:200},
                            {xtype:'textfield', fieldLabel:this.labelPayerKod2, itemId:"kplat1", maxLength:50, width:200},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f7 = '', _f722 = '', g = this.ownerCt.getComponent('disp.g7'), tabP = this.getComponent('g7_panel_tab_7');
                    tabP.items.each(
                        function (item, index, length) {
                            _f7 +=
                                (item.getComponent('code').getValue() ? item.getComponent('code').getValue() + "." : "")
                                + (item.getComponent('text').getValue() ? " " + item.getComponent('text').getValue() : "")
                                + (item.getComponent('text').getValue() && item.getComponent('text2').getValue() ? " /" : "")
                                + (item.getComponent('text2').getValue() ? " " + item.getComponent('text2').getValue() : "")
                                + "\n";
                        }
                    );

                    tabP = this.getComponent('g7_panel_tab_722');
                    if(tabP.items.length > 0) {
                        _f722 += "22.";
                    }
                    tabP.items.each(
                        function (item, index, length) {
                            _f722 += " Оплата по "
                                + (item.getComponent('dorR').getValue() ? item.getComponent('dorR').getValue() : "")
                                + (item.getComponent('dorR').getValue() && item.getComponent('dor').getValue() ? " / " : "")
                                + (item.getComponent('dor').getValue() ? item.getComponent('dor').getValue() : "")
                                + " производится через "
                                + (item.getComponent('platR').getValue() ? item.getComponent('platR').getValue() : "")
                                + (item.getComponent('platR').getValue() && item.getComponent('plat').getValue() ? " / " : "")
                                + (item.getComponent('plat').getValue() ? item.getComponent('plat').getValue() : "")
                                + (item.getComponent('primR').getValue() && item.getComponent('prim').getValue() ? " способ оплаты " : "")
                                + (item.getComponent('primR').getValue() ? item.getComponent('primR').getValue() : "")
                                + (item.getComponent('primR').getValue() && item.getComponent('prim').getValue() ? " / " : "")
                                + (item.getComponent('prim').getValue() ? item.getComponent('prim').getValue() : "")
                                + (item.getComponent('kplat').getValue() ? " код плательщика " + item.getComponent('kplat').getValue() : "")
                                + (item.getComponent('kplat1').getValue() ? " п/к " + item.getComponent('kplat1').getValue() : "")
                                + ";";
                        }
                    );
                    if(tabP.items.length > 0) {
                        _f722 += "\n";
                    }
                    g.setValue((_f7 + _f722));
                },
                copyValues2MainFlds:function(){
                    this.items.each(function(item,index,length){
                        if(item.items){ // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for(var prop in this.bufData[tCN]){ // tab
                                tab = item.onAddTab();
//        					tab = item.getActiveTab();
                                for(var prp in this.bufData[tCN][prop]){// fields
                                    if(tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])){
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//				    	item.setActiveTab(0);
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
//								if(field.xtype != 'radiogroup'){
//									this.bufData[tCN][ind][field.itemId] = field.getValue();
//								}
//								else
                                    if(field.getValue()){
                                        this.bufData[tCN][ind][field.itemId] = field.getValue().inputValue;
                                    }
                                }, this);
                            }, this);
                        }
                        else if(item.itemId){ // input field
                            this.bufData['g7c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    var tCN = this.getComponent('g7_panel_tab_7').tabCollectionName;
                    this.bufData = {};
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    tCN = this.getComponent('g7_panel_tab_722').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g7c'] = this.ownerCt.dataObj['g7c'];
                }
            },
            /*{
                xtype:'detailpanel',
                x:290, y:250, width:400,
                itemId:'g9_panel',
                title:this.labelSenderDocs,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g9_panel_tab_9',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeDoc, itemId:"code", maxLength:3*//*, onTriggerClick: fieldsOptSearch*//*, triggerCls:'dir', width:50 },
                            {xtype:'textarea', fieldLabel:this.labelTextRu, itemId:"text", maxLength:500, width:200},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text2", maxLength:240, width:200},
                            {xtype:'hidden', itemId:"fieldNum", value:'9'},
                            {xtype:'hidden', itemId:"dat"},
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
                            _f9_1 += (item.getComponent('text2').getValue() ?  item.getComponent('text2').getValue() + '  ' : '');
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
//        					tab = item.getActiveTab();
                                for(var prp in this.bufData[tCN][prop]){// fields
                                    if(tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])){
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//				    	item.setActiveTab(0);
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
                            this.bufData['g9c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g9_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g9c'] = this.ownerCt.dataObj['g9c'];
                }
            },*/
            {
                xtype:'detailpanel',
                x:450, y:560, width:400,
                itemId:'g13_panel',
                title:this.labelCommercTerms,
                items:[
                    {xtype:'label', text: this.labelCommercTerms, cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses13',
                        itemId:'g13_panel_tab_13',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeDoc, itemId:"code", maxLength:3/*, onTriggerClick: fieldsOptSearch*/, triggerCls:'dir', width:50 },
                            {xtype:'textarea', fieldLabel:this.labelTextRu, itemId:"text", maxLength:500, width:200, height: 66},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text2", maxLength:240, width:200, height: 66},
                            {xtype:'hidden', itemId:"fieldNum", value:'13'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    },
                    {xtype:'label', text: 'Выходные пограничные станции', cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses136',
                        itemId:'g13_panel_tab_136',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:'Код станции', itemId:"ndoc", maxLength:6/*, onTriggerClick: fieldsOptSearch*/, triggerCls:'dir', width:50 },
                            {xtype:'textarea', fieldLabel:this.labelTextRu, itemId:"text", maxLength:500, width:200, height: 44},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text2", maxLength:240, width:200, height: 44},
                            {xtype:'textarea', fieldLabel:this.labelText, itemId:"text3", maxLength:240, width:200, height: 44},
                            {xtype:'hidden', itemId:"code", value:'6'},
                            {xtype:'hidden', itemId:"fieldNum", value:'13.6'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function () {
                    var _f13 = '', g = this.ownerCt.getComponent('disp.g13'), tabP = this.getComponent('g13_panel_tab_13');
                    tabP.items.each(
                        function (item, index, length) {
                            _f13 +=
                                (item.getComponent('code').getValue() ? item.getComponent('code').getValue() + ". " : "")
                                + (item.getComponent('text').getValue() ? item.getComponent('text').getValue(): "")
                                + (item.getComponent('text').getValue() && item.getComponent('text2').getValue() ? " / " : "")
                                + (item.getComponent('text2').getValue() ? item.getComponent('text2').getValue(): "")
                                + "\n";
                        }
                    );
                    tabP = this.getComponent('g13_panel_tab_136');
                    if(tabP.items.length > 0) {
                        _f13 += "6.";
                    }
                    tabP.items.each(
                        function (item, index, length) {
                            _f13 += " "
                                + (item.getComponent('ndoc').getValue() ? item.getComponent('ndoc').getValue() + " ": "")
                                + (item.getComponent('text').getValue() ? item.getComponent('text').getValue(): "")
                                + (item.getComponent('text').getValue() && item.getComponent('text2').getValue() ? " / " : "")
                                + (item.getComponent('text2').getValue() ? item.getComponent('text2').getValue(): "")
                                + ((item.getComponent('text').getValue() || item.getComponent('text2').getValue()) && item.getComponent('text3').getValue() ? " / " : "")
                                + (item.getComponent('text3').getValue() ? item.getComponent('text3').getValue(): "")
                                + ";";
                        }
                    );
                    if(tabP.items.length > 0) {
                        _f13 += "\n";
                    }
                    g.setValue((_f13));
                },
                copyValues2MainFlds:function () {
                    this.items.each(function (item, index, length) {
                        if (item.items) { // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for (var prop in this.bufData[tCN]) { // tab
                                tab = item.onAddTab();
//        					tab = item.getActiveTab();
                                for (var prp in this.bufData[tCN][prop]) {// fields
                                    if (tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])) {
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//				    	item.setActiveTab(0);
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
                    var tCN = this.getComponent('g13_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    tCN = this.getComponent('g13_panel_tab_136').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                    this.bufData['g13c'] = this.ownerCt.dataObj['g13c'];
                }
            }/*,
            {
                xtype:'detailpanel',
                x:280, y:630, width:400,
                itemId:'g19v_panel',
                mode:'', //vag, kon, gruz
                items:[
                    {xtype:'label', text: this.labelWagons, itemId:"g19v_label", cls:'th'},
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsCarLists',
                        itemId:'g19v_panel_tab',
                        tabItems:[
                            {xtype:'textfield', fieldLabel:this.labelWagonNum, itemId:"nvag", maxLength:160, width:150},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTonnage, itemId:"grPod", maxLength:5, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsTara, itemId:"taraVag", maxLength:5, width:100, minValue:0, decimalPrecision:1},
                            {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, itemId:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"},
                            {xtype:'label', text: this.labelConts, itemId:"g19k_label", cls:'th'},
                            {
                                xtype:'detailtabpanel',
                                tabCollectionName:'cimSmgsKonLists',
                                itemId:'g19k_panel_tab',
                                hasParentCollection:true,
                                tabItems:[
                                    {xtype:'textfield', fieldLabel:this.labelNotes, itemId:"notes", maxLength:80, width:100},
                                    {xtype:'textfield', fieldLabel:this.labelContNum, itemId:"utiN", maxLength:16, width:100},
                                    {xtype:'numberfield', fieldLabel:this.labelSize, itemId:"sizeFoot", maxLength:5, width:100, allowDecimals:false, minValue:0},
                                    {xtype:'numberfield', fieldLabel:this.labelSizeMm, itemId:"sizeMm", maxLength:12, width:100, allowDecimals:false, minValue:0},
                                    {xtype:'hidden', itemId:"sort"},
                                    {xtype:'hidden', itemId:"hid"},
                                    {xtype:'label', text: this.labelCargo, itemId:"g19g_label", cls:'th'},
                                    {
                                        xtype:'detailtabpanel',
                                        tabCollectionName:'cimSmgsGruzs',
                                        itemId:'g19g_panel_tab',
                                        hasParentCollection:true,
                                        tabItems:[
                                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10*//*, onTriggerClick: gngSearch1*//*, triggerCls:'dir', width:100 },
                                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                                            {xtype:'textarea', fieldLabel:this.labelName1, itemId:"nzgrEu", maxLength:4000, width:250},
                                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10*//*, onTriggerClick: etsngSearch*//*, triggerCls:'dir', width:100},
                                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:14, width:80, minValue:0, decimalPrecision:3},
                                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                                            {xtype:'hidden', itemId:"ohr"},
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
                                case 'g19v_' : // vag
                                    if(this.items.getCount() == 0){// no vags
                                        this.addTab();
                                    }
                                    break;
                                case 'g19k_' : // kon
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g19k_panel_tab'); // konts in vag
                                    if(konts.items.getCount() == 0){// no konts
                                        konts.addTab();
                                    }
                                    break;
                                case 'g19g_' : // gruz
                                    vag = this.items.first() || this.addTab(); // cur or new vag
                                    konts = vag.getComponent('g19k_panel_tab'); // konts in vag
                                    kon = konts.items.first() || konts.addTab(); // cur or new kon
                                    kon.getComponent('g19g_panel_tab').addTab(); // add new gruz
                                    break;
                            }
                            this.ownerCt.changeCmpVisibility(this.ownerCt.mode);
                        },
                        onDelTab:function() {
                            var vag, konts, kon, gruzs, gruz;
                            switch (this.ownerCt.mode) {
                                case 'g19v_' : // vag
                                    this.delTab();
                                    break;
                                case 'g19k_' : // kon
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g19k_panel_tab');
                                        kon = konts.delTab(); // del kon
                                        if(!kon){ //if no kon, del vag
                                            this.delTab();
                                        }
                                    }
                                    break;
                                case 'g19g_' : // gruz
                                    vag = this.items.first();
                                    if(vag){
                                        konts = vag.getComponent('g19k_panel_tab');
                                        kon = konts.items.first();
                                        if(kon){
                                            gruzs = kon.getComponent('g19g_panel_tab');
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
                beforeSave:function() {
                    var g11_prim = this.ownerCt.getComponent('smgs.g11_prim'),
                        str = 'Груз подлежит охране',
                        re = new RegExp(str,'gi'),
                        found = false;
                    this.getComponent('g19v_panel_tab').items.each(function(vag){
                        vag.getComponent('g19k_panel_tab').items.each(function(kon){
                            kon.getComponent('g19g_panel_tab').items.each(function(gruz){
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
                changeCmpVisibility:function(itemId){
                    var vags = this.getComponent('g19v_panel_tab'),konts, gruzs;
                    switch (itemId) {
                        case 'g19v_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g19k_label').hide();
                                vag.getComponent('g19k_panel_tab').hide();
                            }, this);
                            break;
                        case 'g19k_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g19k_label').show();
                                konts = vag.getComponent('g19k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g19g_label').hide();
                                    gruzs = kon.getComponent('g19g_panel_tab');
                                    gruzs.hide();
                                }, this);
                            }, this);
                            break;
                        case 'g19g_' :
                            vags.items.each(function(vag, index,length){
                                vag.getComponent('g19k_label').show();
                                konts = vag.getComponent('g19k_panel_tab');
                                konts.show();
                                konts.items.each(function(kon, index,length){
                                    kon.getComponent('g19g_label').show();
                                    gruzs = kon.getComponent('g19g_panel_tab');
                                    gruzs.show();
                                }, this);
                            }, this);
                            break;
                    }
                },
                *//*onChangeData:function(btn){
                 this.mode = btn.itemId;
                 this.changeCmpVisibility(btn.itemId);
                 //				this.show();
                 },*//*
                setDisplayedField:function(){
                    var _g19 = '',
                        g = this.ownerCt.getComponent('disp.g19v'),
                        tabPV = this.getComponent('g19v_panel_tab'),
                        tabPIV=tabPV.getComponent(0);
                    // vags
                    if(tabPIV){
                        if(tabPV.items.getCount() == 1){
//						tabPIV = tabPV.getComponent(0);
                            _g19 += (tabPIV.getComponent('nvag').getValue() ? '№ вагона/Wagen Nr ' + tabPIV.getComponent('nvag').getValue() + '\n' : '');
                            _g19 += (tabPIV.getComponent('grPod').getValue() ? 'Тоннаж/Tragwagenfaeigkeith ' + tabPIV.getComponent('grPod').getValue() + '\n' : '');
                            _g19 += (tabPIV.getComponent('taraVag').getValue() ? 'Тара/Tara ' + tabPIV.getComponent('taraVag').getValue() + '\n' : '');
                            _g19 += (tabPIV.getComponent('kolOs').getValue() ? 'Оси/Achse ' + tabPIV.getComponent('kolOs').getValue() : '');
                        }
                        else if (tabPV.items.getCount() > 1){
                            _g19 = tabPV.items.getCount() + ' ВАГ. / ' + tabPV.items.getCount() + ' WAGEN\n';
                            tabPV.items.each(function(item, index,length){
                                _g19 += item.getComponent('nvag').getValue() + '\n';
                            }, this);
                        }
                        g.setValue(_g19);

                        // kont
                        g = this.ownerCt.getComponent('disp.g19k');
                        var tabPK = tabPIV.getComponent('g19k_panel_tab');
                        var tabPIK = tabPK.getComponent(0); // first kon
                        if(tabPIK){
                            _g19 = tabPIK.getComponent('sizeFoot').getValue() ? '1x' + tabPIK.getComponent('sizeFoot').getValue() : '';
                            _g19 += (tabPIK.getComponent('notes').getValue() ? ' ' + tabPIK.getComponent('notes').getValue() : '');
                            if(tabPIK.getComponent('utiN').getValue()){
                                var konConst = tabPIK.getComponent('notes').getValue() ? '' : 'HC Container №';
                                _g19 += ' ' + konConst + '\n' + tabPIK.getComponent('utiN').getValue();
                            }
                            _g19 += (tabPIK.getComponent('sizeMm').getValue() ? '\n(' + tabPIK.getComponent('sizeMm').getValue() + 'mm)' : '');
                            g.setValue(_g19);

                            g = this.ownerCt.getComponent('disp.g19g');
                            var tabPG = tabPIK.getComponent('g19g_panel_tab');
                            var mass = 0;
                            _g19 = (tabPG.items.getCount() > 1 ? 'Сборный груз: Sammelgut:\n\n' : '');
                            tabPG.items.each(function(tabVag,index,length){
                                _g19 += (tabVag.getComponent('nzgr').getValue() ? tabVag.getComponent('nzgr').getValue() : '');
                                _g19 += (tabVag.getComponent('nzgrEu').getValue() ? '\n' + tabVag.getComponent('nzgrEu').getValue() : '');
                                _g19 += (tabVag.getComponent('kgvn').getValue() ? '\nГНГ- ' + tabVag.getComponent('kgvn').getValue() : '');
                                _g19 += (tabVag.getComponent('ekgvn').getValue() ? '\nЕТ СНГ- ' + tabVag.getComponent('ekgvn').getValue() : '');
                                _g19 += (tabVag.getComponent('places').getValue() ? '\nМеста- ' + tabVag.getComponent('places').getValue() : '');
                                _g19 += (tabVag.getComponent('massa').getValue() ? '\nМасса- ' + tabVag.getComponent('massa').getValue() + 'кг\n\n' : '');
                                mass += tabVag.getComponent('massa').getValue();
                            },this);
                            g.setValue(_g19);
                            this.ownerCt.getComponent('smgs.g24N').setValue(mass);
                        }
                        else{
                            g.setValue('');
                            this.ownerCt.getComponent('disp.g19g').setValue('');
                        }
                    }
                    else{
                        g.setValue('');
                        this.ownerCt.getComponent('disp.g19k').setValue('');
                        this.ownerCt.getComponent('disp.g19g').setValue('');
                    }
                },
                copyValues2MainFlds:function(){
                    var newVagTab, valV, tvCN,
                        tkCN, newKonTabPanel, newKonTab, valK,
                        tgCN, newGruzTabPanel, newGruzTab, valG;
                    this.items.each(function(item,index,length){
                        if(item.items){ // vag tabpanel
                            item.removeAll();
                            tvCN = item.tabCollectionName;
                            for(var vagTab in this.bufData[tvCN]){ //vag tab
                                newVagTab = item.addTab();
//        					newVagTab = item.getActiveTab();
                                for(var vagField in this.bufData[tvCN][vagTab]){//vag fields
                                    valV = this.bufData[tvCN][vagTab][vagField];
                                    if(valV instanceof Object){ // kon tabpanel
                                        tkCN = vagField;
                                        newKonTabPanel = newVagTab.down('detailtabpanel[tabCollectionName='+tkCN+']');
                                        for(var konTab in valV){ //kon tab
                                            newKonTab = newKonTabPanel.addTab();
//        								newKonTab = newKonTabPanel.getActiveTab();
                                            for(var konField in valV[konTab]){//kon fields
                                                valK = valV[konTab][konField];
                                                if(valK instanceof Object){ // gruz tabpanel
                                                    tgCN = konField;
                                                    newGruzTabPanel = newKonTab.down('detailtabpanel[tabCollectionName='+tgCN+']');
                                                    for(var gruzTab in valK){ //gruz tab
                                                        newGruzTab = newGruzTabPanel.addTab();
//        											newGruzTab = newGruzTabPanel.getActiveTab();
                                                        for(var gruzField in valK[gruzTab]){//gruz fields
                                                            valG = valK[gruzTab][gruzField];
                                                            if(newGruzTab.getComponent(gruzField)) {
                                                                newGruzTab.getComponent(gruzField).setValue(valG);
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(newKonTab.getComponent(konField)) {
                                                    newKonTab.getComponent(konField).setValue(valK);
                                                }
                                            }
                                        }
                                        if(newKonTabPanel){
//        								newKonTabPanel.setActiveTab(0);
                                        }
                                    }
                                    else if(newVagTab.getComponent(vagField)){
                                        newVagTab.getComponent(vagField).setValue(valV);
                                    }
                                }
                            }
//				    	item.setActiveTab(0);
                        }
                    }, this);
                },
                copyValues2Buf:function(){ // panel
                    var tvCN,bufKont,tkCN,bufGruz,tgCN;
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        if(item.items){ // vag tabpanel
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
                                                if(konField.items){ // gruz tabpanel
                                                    bufGruz = bufKont[tkCN][kind];
                                                    tgCN = konField.tabCollectionName;
                                                    bufGruz[tgCN] = {};
                                                    konField.items.each(function(gruzTab,gind,len){ // gruz tab
                                                        bufGruz[tgCN][gind]= {};
                                                        gruzTab.items.each(function(gruzField,i,l){ // gruz fields
                                                            bufGruz[tgCN][gind][gruzField.itemId] = gruzField.getValue();
                                                        }, this);
                                                    }, this);
                                                }
                                                else if(konField.isFormField){
                                                    bufKont[tkCN][kind][konField.itemId] = konField.getValue();
                                                }
                                            }, this);
                                        }, this);
                                    }
                                    else if(vagField.isFormField){
                                        this.bufData[tvCN][ind][vagField.itemId] = vagField.getValue();
                                    }
                                }, this);
                            }, this);
                        }
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g19v_panel_tab').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            }*/


            ,{x:50, y:770, width:300, height:350, xtype:'detailgrid', itemId:'g20k_panel', title:this.labelConts, hidden:true,
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
                        var vags = this.ownerCt.dataObj.cimSmgsCarLists, rows = [];
                        for (var vag in vags) {
                            var row = [];
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
                    this.ownerCt.getComponent('disp.g20k').setValue(valG);
                }
            },
            {
                xtype:'detailpanel',
                x:280, y:630, width:400,
                itemId:'g20g_panel',
                title:this.labelCargo,
                bodyPadding:5,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsGruzs',
                        prefix:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0]',
                        itemId:'g20g_panel_tab',
                        tabItems:[
                            {xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100, action:'kgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameRuGng, itemId:"nzgr", maxLength:4000, width:250},
                            {xtype:'textarea', fieldLabel:this.labelNameChGng, itemId:"nzgrEu", maxLength:4000, width:250},
                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100, action:'ekgvn'},
                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                            {xtype:'numberfield', fieldLabel:this.labelMassa, itemId:'massa', maxLength:8, width:80, minValue:0},
                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                            //{xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:20, width:180},
                            {xtype:'textfield', fieldLabel:this.labelPackForeign, itemId:"upakForeign", maxLength:50, width:180},
                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:180},
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
                    this.getComponent('g20g_panel_tab').items.each(function(gruz){
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
                    var valG = '', g = this.ownerCt.getComponent('disp.g20g'), tabP = this.getComponent('g20g_panel_tab');
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
                    var tCN = this.getComponent('g20g_panel_tab').tabCollectionName;
                    this.bufData[tCN] = (this.ownerCt.dataObj.cimSmgsCarLists[0] && this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] ? this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs : {});
                }
            }
        ];

        /*if(tkUser.hasPriv('CIM_CONTS_LIST')){
            config.items.push(
//                {x:200, y:64, xtype:'label', text:this.labelDocSort},
                {x:290, y:60, xtype:'numberfield', fieldLabel:this.labelDocSort, labelWidth: 140, name:'smgs.sort', itemId:'smgs.sort', maxLength:3, minValue:0, allowDecimals:false, width:185},

                {x:180, y:62, xtype:'checkbox', name:'smgs.kind', itemId:'smgs.kind', inputValue:1, uncheckedValue:0, boxLabel: this.labelDocSummary, boxLabelAlign:'before'}
            );
        } else {
            config.items.push(
                {xtype:'hidden', name:'smgs.sort', itemId:'smgs.sort'},
                {xtype:'hidden', name:'smgs.kind', itemId:'smgs.kind'}
            )
        }*/
    },
    initForm:function (prefix) {
        this.suspendLayouts();
        this.initBuffers();
        this.getForm().setValues(this.addPrefix(prefix));
        this.initCollections();
        this.initDisplayedFields();
        this.initButtons();
        this.resumeLayouts(true);
    },
    initServiceFields: function(data, initGrids){
        this.getForm().setValues(data);
        if (initGrids) {
            this.getComponent('g20k_panel').initServiceFields(data);
        }

        if (this.getForm().findField('task').getValue() == 'copy') {
            this.getForm().findField('smgs.status').setValue('');
        }
    },
    initBuffers: function(){
        this.getComponent('g1_panel').initBuf();
        this.getComponent('g4_panel').initBuf();
        this.getComponent('g7_panel').initBuf();
        this.getComponent('g13_panel').initBuf();

        this.getComponent('g20k_panel').initBuf();
        this.getComponent('g20g_panel').initBuf();
//        this.getComponent('g9_panel').initBuf();

//        this.getComponent('g19v_panel').initBuf();
    },
    initCollections: function(){
        this.getComponent('g7_panel').copyValues2MainFlds();
//        this.getComponent('g9_panel').copyValues2MainFlds();
        this.getComponent('g13_panel').copyValues2MainFlds();
//        this.getComponent('g19v_panel').copyValues2MainFlds();

        this.getComponent('g20k_panel').copyValues2MainFlds();
        this.getComponent('g20g_panel').copyValues2MainFlds();
        if (this.dataObj.cimSmgsCarLists[0]) {
            this.getComponent('vagHid').setValue(this.dataObj.cimSmgsCarLists[0].hid);
            this.getComponent('konHid').setValue(this.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0].hid);
        }
    },
    initDisplayedFields:function(){
        this.getComponent('g1_panel').setDisplayedField();
        this.getComponent('g4_panel').setDisplayedField();
        this.getComponent('g7_panel').setDisplayedField();
        this.getComponent('g13_panel').setDisplayedField();

        this.getComponent('g20k_panel').setDisplayedField();
        this.getComponent('g20g_panel').setDisplayedField();
//        this.getComponent('g19v_panel').setDisplayedField();
    },
    prepareGridData4Save:function () {
        return this.getComponent('g20k_panel').prepareData();
    },
    doStatus:function () {
        var toolbar = this.dockedItems.items[1],
            toolbar1 = this.dockedItems.items[0],
            form = this.getForm(),
            status = form.findField('smgs.status').getValue();
        if (form.findField('task').getValue() == 'copy' || form.findField('task').getValue() == 'create') {
            return;
        }

        /*if (toolbar1.getComponent('comments')) {
            toolbar1.getComponent('comments').enable();
        }*/
        switch (status) {
            case '3': // forAgreed
                toolbar.getComponent('forAgree').disable();
                toolbar.getComponent('agreed').enable();
                toolbar.getComponent('notAgreed').enable();
                if (toolbar1.getComponent('save')) {
                    toolbar1.getComponent('save').enable();
                }
                if (toolbar1.getComponent('save_close')) {
                    toolbar1.getComponent('save_close').enable();
                }
                /*if (toolbar1.getComponent('comments')) {
                 toolbar1.getComponent('comments').enable();
                 }*/
                break;
            case '4': //agreed
                toolbar.getComponent('forAgree').disable();
                toolbar.getComponent('agreed').disable();
                toolbar.getComponent('notAgreed').enable();
                if (toolbar1.getComponent('save')) {
                    toolbar1.getComponent('save').disable();
                }
                if (toolbar1.getComponent('save_close')) {
                    toolbar1.getComponent('save_close').disable();
                }
                /*if (toolbar1.getComponent('comments')) {
                 toolbar1.getComponent('comments').disable();
                 }*/
                break;
            case '6':   // notAgreed
                toolbar.getComponent('forAgree').enable();
                toolbar.getComponent('agreed').disable();
                toolbar.getComponent('notAgreed').disable();
                if (toolbar1.getComponent('save')) {
                    toolbar1.getComponent('save').enable();
                }
                if (toolbar1.getComponent('save_close')) {
                    toolbar1.getComponent('save_close').enable();
                }
                /*if (toolbar1.getComponent('comments')) {
                 toolbar1.getComponent('comments').enable();
                 }*/
                break;
            case '7': // blocked
                toolbar.getComponent('forAgree').disable();
                toolbar.getComponent('agreed').disable();
                toolbar.getComponent('notAgreed').disable();
                if (toolbar1.getComponent('save')) {
                    toolbar1.getComponent('save').disable();
                }
                if (toolbar1.getComponent('save_close')) {
                    toolbar1.getComponent('save_close').disable();
                }
                /*if (toolbar1.getComponent('comments')) {
                 toolbar1.getComponent('comments').disable();
                 }*/
                break;
            default:
                toolbar.getComponent('forAgree').enable();
                toolbar.getComponent('agreed').disable();
                toolbar.getComponent('notAgreed').disable();
                if (toolbar1.getComponent('save')) {
                    toolbar1.getComponent('save').enable();
                }
                if (toolbar1.getComponent('save_close')) {
                    toolbar1.getComponent('save_close').enable();
                }
            /*if (toolbar1.getComponent('comments')) {
             toolbar1.getComponent('comments').enable();
             }*/
        }
    },
    initButtons:function () {
        this.doStatus();
    },
    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                xtype:'toolbar',
                dock:'bottom',
                items:['->']
            },
            {
                xtype:'toolbar',
                dock:'bottom',
                items:[
                    {
                        text:this.btnForAgree,
                        action:'forAgree',
                        itemId:'forAgree',
                        disabled:true
                    },
                    '-',
                    {
                        text:this.btnAgreed,
                        action:'agreed',
                        itemId:'agreed',
                        disabled:true
                    },
                    '-',
                    {
                        text:this.btnNotAgreed,
                        action:'notAgreed',
                        itemId:'notAgreed',
                        disabled:true
                    },
                    '-'
                ]
            }
        ];
        if (tkUser.hasPriv('CIM_SAVE')) {
            config.dockedItems[0].items.push('-', {
                text:this.btnSave,
                iconCls:'save',
                action:'save',
                itemId:'save'
            }, '-', {
                text:this.btnSaveExit,
                iconCls:'save_close',
                action:'save_close',
                itemId:'save_close'
            }/*,'-', {
                text:'Замечания',
                iconCls:'comments',
                action:'comments',
                itemId:'comments',
                disabled:true
            }*/);
        }
        config.dockedItems[0].items.push(
            '-', {
                text:this.btnClose,
                iconCls:'close1',
                action:'close'
            }, '-', {
                text:this.btnSign,
                iconCls:'signature',
                action:'signature'
            }
        );
    }
});