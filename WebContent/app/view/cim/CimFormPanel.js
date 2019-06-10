/**
 * Created by Odmin on 28.11.2018.
 */
Ext.define('TK.view.cim.CimFormPanel', {
    extend: 'TK.view.DocsForm',
    xtype:'cimpanel',
    itemId:'cimformpanel',
    requires: [
        'TK.view.edit.Cim_g1_detailpanel',
        'TK.view.edit.Cim_g4_detailpanel',
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel'
    ],

    initComponent: function() {
        var config = {};
        this.buildItems(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildItems: function(config) {
        var me = this;
        config.deltaY=61;
        config.items =
        [

            {xtype: 'box', autoEl: {tag: 'img', src: 'resources/images/CIM 1_01.jpg'}, itemId: 'blank'},
            {xtype: 'hidden', name: 'smgs.hid', itemId: 'smgs.hid'},
            {xtype: 'hidden', name: 'task', itemId: 'task'},
            {xtype: 'hidden', name: 'status', itemId: 'status'},
            {xtype: 'hidden', name: 'smgs.type', itemId: 'smgs.type', value: '7'},
            {xtype: 'hidden', name: 'smgs.route.hid', itemId: 'smgs.route.hid'},
            {xtype: 'hidden', name: 'smgs.packDoc.hid', itemId: 'smgs.packDoc.hid'},
            {xtype: 'hidden', name: 'smgs.docType1', itemId: 'smgs.docType1', value: 21},
            {xtype: 'hidden', name: 'smgs.status', itemId: 'smgs.status'},
            {xtype: 'hidden', name: 'search.docType', itemId: 'search.docType', value: 'cim'},
            {xtype: 'hidden', name: 'smgs.g25', itemId: 'smgs.g25'},

            {x:9, y:8, xtype:'label', text:'№:',itemId:'lab_num',hidden :true},
            {x:45, y:3, name:'smgs.aviso_num', itemId:'smgs.aviso_num', maxLength:20, width:50,hidden :true},
            {x:9, y:35, xtype:'label', text:this.labelDate,itemId:'lab_dat',hidden :true,hidden :true},
            {x:45, y:30, xtype:'datefield', name:'smgs.aviso_dat', itemId:'smgs.aviso_dat', width:80,hidden :true,hidden :true},
            {x:150, y:8, xtype:'label', text:this.labelCodyDo,itemId:'lab_cod',hidden :true},
            {x:265, y:3, xtype:'datefield', name:'smgs.aviso_cod_dat', itemId:'smgs.aviso_cod_dat', width:80,hidden :true},
            {x:373, y:8, xtype:'label', text:this.labelVsegoSmgs,itemId:'lab_vsego',hidden :true},
            {x:453, y:3, xtype:'numberfield', name:'smgs.amount', itemId:'smgs.amount', minValue:0, value:0, width:45,hidden :true},
            {x:509, y:8, xtype:'label', text:this.labelWagenNum,itemId:'lab_wag_n',hidden :true},
            {x:593, y:3, name:'smgs.npoezd', itemId:'smgs.npoezd', maxLength:32, width:300,hidden :true},
            {
                x: 334,
                y: 13+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.cim',
                inputValue: '1',
                itemId: 'smgs.cim',
                uncheckedValue: 0
            },
            {
                xtype: 'textarea',
                x: 122,
                y: 75+this.deltaY,
                width: 360,
                height: 105,
                readOnly: true,
                name: 'disp.g1',
                itemId: 'disp.g1',
                submitValue: false
            },
            {
                xtype: 'button',
                text: this.btnChange,
                x: 417, y: 181+this.deltaY,
                action: 'change',
                itemId: 'g1_'
            },
            {x: 512, y: 60+this.deltaY, name: 'smgs.g2', itemId: 'smgs.g2', maxLength: 32, width: 175},
            {x: 512, y: 100+this.deltaY, name: 'smgs.g3', itemId: 'smgs.g3', maxLength: 32, width: 175},
            {x: 570, y: 140+this.deltaY, name: 'smgs.g11_1', itemId: 'smgs.g11_1', maxLength: 80, width: 115},
            {x: 545, y: 164+this.deltaY, name: 'smgs.g12_1', itemId: 'smgs.g12_1', maxLength: 60, width: 140},
            {x: 545, y: 188+this.deltaY, name: 'smgs.g13_1', itemId: 'smgs.g13_1', maxLength: 60, width: 140},

            {x: 965, y: 70+this.deltaY, name: 'smgs.g8', itemId: 'smgs.g8', maxLength: 64, width: 250},
            {x: 512, y: 224+this.deltaY, name: 'smgs.g5', itemId: 'smgs.g5', maxLength: 32, width: 175},
            {x: 512, y: 267+this.deltaY, name: 'smgs.g6', itemId: 'smgs.g6', maxLength: 32, width: 175},
            {x: 575, y: 300+this.deltaY, name: 'smgs.g41_1', itemId: 'smgs.g41_1', maxLength: 80, width: 115},
            {x: 550, y: 324+this.deltaY, name: 'smgs.g42_1', itemId: 'smgs.g42_1', maxLength: 60, width: 140},
            {x: 550, y: 348+this.deltaY, name: 'smgs.g43_1', itemId: 'smgs.g43_1', maxLength: 60, width: 140},
            {
                xtype: 'textarea',
                x: 122,
                y: 240+this.deltaY,
                width: 360,
                height: 105,
                readOnly: true,
                name: 'disp.g4',
                itemId: 'disp.g4',
                submitValue: false
            },
            {
                xtype: 'button',
                text: this.btnChange,
                x: 417, y: 346+this.deltaY,
                action: 'change',
                itemId: 'g4_'
            },
            {
                xtype: 'textarea',
                x: 691,
                y: 112+this.deltaY,
                width: 585,
                height: 99,
                readOnly: true,
                name: 'disp.g7',
                itemId: 'disp.g7',
                submitValue: false
            },
            {
                xtype: 'button',
                text: this.btnChange,
                x: 698, y: 86+this.deltaY,
                action: 'change',
                itemId: 'g7_'
            },

            {
                xtype: 'textarea',
                x: 694,
                y: 236+this.deltaY,
                width: 585,
                height: 132,
                readOnly: true,
                name: 'disp.g9',
                itemId: 'disp.g9',
                submitValue: false
            },
            {
                xtype: 'button',
                text: this.btnChange,
                x: 818, y: 214+this.deltaY,
                action: 'changeDocs9'
            },

            {
                xtype: 'button',
                text: this.btnChangePlomb,
                x: 30, y: 1070+this.deltaY,
                action: 'changePlombs'
            },

            {
                x: 9,
                y: 423+this.deltaY,
                xtype: 'trigger',
                name: 'smgs.g101',
                itemId: 'smgs.g101',
                triggerCls: 'dir',
                maxLength: 80,
                width: 338
            },
            {x: 349, y: 423+this.deltaY, name: "smgs.g104", itemId: "smgs.g104", maxLength: 64, width: 338},
            {x: 266, y: 380+this.deltaY, name: 'smgs.g11', itemId: 'smgs.g11', maxLength: 40, width: 209},
            {x: 501, y: 380+this.deltaY, name: 'smgs.g12', itemId: 'smgs.g12', maxLength: 2, width: 43},
            {x: 551, y: 380+this.deltaY, name: 'smgs.g121', itemId: 'smgs.g121', maxLength: 6, width: 135},
            {
                xtype: 'textarea',
                x: 9,
                y: 525+this.deltaY,
                width: 424,
                height: 83,
                readOnly: true,
                name: 'disp.g13',
                itemId: 'disp.g13',
                submitValue: false
            },
            {
                xtype: 'button',
                text: this.btnChange,
                x: 302, y: 503+this.deltaY,
                action: 'change',
                itemId: 'g13_'
            },

            {x: 457, y: 513+this.deltaY, name: 'smgs.g141', itemId: 'smgs.g141', maxLength: 40, width: 40},
            {x: 505, y: 513+this.deltaY, name: 'smgs.g142', itemId: 'smgs.g142', maxLength: 32, width: 180},
            {x: 1074, y: 378+this.deltaY, name: 'smgs.g171', itemId: 'smgs.g171', maxLength: 2, width: 43},
            {x: 1130, y: 378+this.deltaY, name: 'smgs.g17', itemId: 'smgs.g17', maxLength: 10, width: 135},
            {
                x: 696,
                y: 449+this.deltaY,
                xtype: 'trigger',
                name: "smgs.g162",
                itemId: "smgs.g162",
                maxLength: 80,
                triggerCls: 'dir',
                width: 400
            },
            {x: 1100, y: 449+this.deltaY, name: "smgs.g164", itemId: "smgs.g164", maxLength: 64, width: 175},
            {
                x: 702,
                y: 658+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.incoterms',
                inputValue: '1',
                itemId: 'smgs.incoterms',
                uncheckedValue: 0
            },
            {
                x: 702,
                y: 620+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.frankofracht',
                inputValue: '1',
                itemId: 'smgs.frankofracht',
                uncheckedValue: 0
            },
            {x: 847, y: 652+this.deltaY, name: 'smgs.kodUslPost', itemId: 'smgs.kodUslPost', maxLength: 3, width: 68},
//            {x:764, y:695, xtype:'checkbox', name:'smgs.rid', inputValue:'1', itemId:'smgs.rid',checked:true,uncheckedValue:0},
            {
                x: 635,
                y: 695+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.g21',
                inputValue: '1',
                itemId: 'smgs.g21',
                uncheckedValue: 0
            },
            {
                x: 764,
                y: 695+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.g22',
                inputValue: '1',
                itemId: 'smgs.g22',
                uncheckedValue: 0
            },
            {
                x: 1024,
                y: 599+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g191',
                itemId: 'smgs.g191',
                maxLength: 128,
                width: 253,
                height: 37
            },
            {x: 909, y: 378+this.deltaY, name: 'smgs.g161', itemId: 'smgs.g161', maxLength: 8, width: 133},

            {x: 693, y: 541+this.deltaY, xtype: 'label', text: this.labelNotesVag, style: 'font-weight:bold;'},
            {
                x: 693,
                y: 555+this.deltaY,
                xtype: 'textarea',
                width: 376,
                height: 30,
                name: 'smgs.vagPrim',
                itemId: 'smgs.vagPrim',
                maxLength: 512
            },
            {
                x: 693,
                y: 498+this.deltaY,
                xtype: 'textarea',
                width: 376,
                height: 45,
                readOnly: true,
                name: 'disp.g18v',
                itemId: 'disp.g18v',
                submitValue: false
            },
            {
                x: 7,
                y: 727+this.deltaY,
                xtype: 'textarea',
                width: 180,
                height: 270,
                readOnly: true,
                name: 'disp.g18k',
                itemId: 'disp.g18k',
                submitValue: false
            },
            {
                x: 187,
                y: 727+this.deltaY,
                xtype: 'textarea',
                width: 600,
                height: 270,
                readOnly: true,
                name: 'disp.g18g',
                itemId: 'disp.g18g',
                submitValue: false
            },

            {x: 92, y: 1118+this.deltaY, name: 'smgs.ga491', itemId: 'smgs.ga491', maxLength: 2, width: 44},
            {x: 92, y: 1158+this.deltaY, name: 'smgs.ga492', itemId: 'smgs.ga492', maxLength: 2, width: 44},
            {x: 140, y: 1118+this.deltaY, name: 'smgs.ga493', itemId: 'smgs.ga493', maxLength: 6, width: 137},
            {x: 140, y: 1158+this.deltaY, name: 'smgs.ga494', itemId: 'smgs.ga494', maxLength: 6, width: 137},

            {x: 282, y: 1118+this.deltaY, name: 'smgs.ga50', itemId: 'smgs.ga50', maxLength: 3, width: 74},
            {x: 363, y: 1118+this.deltaY, name: 'smgs.ga51', itemId: 'smgs.ga51', maxLength: 6, width: 143},

            {x: 282, y: 1158+this.deltaY, name: 'smgs.ga52', itemId: 'smgs.ga52', maxLength: 6, width: 74},
            {x: 363, y: 1158+this.deltaY, name: 'smgs.ga53', itemId: 'smgs.ga53', maxLength: 6, width: 143},

            {x: 32, y: 1200+this.deltaY, name: 'smgs.ga54', itemId: 'smgs.ga54', maxLength: 7, width: 166},
            {x: 205, y: 1200+this.deltaY, name: 'smgs.ga55', itemId: 'smgs.ga55', maxLength: 4, width: 96},
            {x: 307, y: 1200+this.deltaY, name: 'smgs.ga56', itemId: 'smgs.ga56', maxLength: 4, width: 97},
            {x: 410, y: 1200+this.deltaY, name: 'smgs.ga57', itemId: 'smgs.ga57', maxLength: 4, width: 96},

            {x: 93, y: 1238+this.deltaY, name: 'smgs.gb491', itemId: 'smgs.gb491', maxLength: 2, width: 44},
            {x: 93, y: 1279+this.deltaY, name: 'smgs.gb492', itemId: 'smgs.gb492', maxLength: 2, width: 44},
            {x: 140, y: 1238+this.deltaY, name: 'smgs.gb493', itemId: 'smgs.gb493', maxLength: 6, width: 137},
            {x: 140, y: 1279+this.deltaY, name: 'smgs.gb494', itemId: 'smgs.gb494', maxLength: 6, width: 137},

            {x: 802, y: 1110+this.deltaY, name: 'smgs.g591', itemId: 'smgs.g591', maxLength: 2, width: 44},
            {x: 855, y: 1110+this.deltaY, name: 'smgs.g592', itemId: 'smgs.g592', maxLength: 2, width: 44},
            {x: 902, y: 1110+this.deltaY, name: 'smgs.g593', itemId: 'smgs.g593', maxLength: 2, width: 44},
            {x: 949, y: 1110+this.deltaY, name: 'smgs.g594', itemId: 'smgs.g594', maxLength: 2, width: 44},
            {x: 998, y: 1110+this.deltaY, name: 'smgs.g595', itemId: 'smgs.g595', maxLength: 2, width: 44},
            {x: 1045, y: 1110+this.deltaY, name: 'smgs.g596', itemId: 'smgs.g596', maxLength: 2, width: 44},
            {x: 1098, y: 1110+this.deltaY, name: 'smgs.g597', itemId: 'smgs.g597', maxLength: 2, width: 44},
            {x: 1146, y: 1110+this.deltaY, name: 'smgs.g598', itemId: 'smgs.g598', maxLength: 6, width: 137},

            {x: 865, y: 1357+this.deltaY, name: 'smgs.g62', itemId: 'smgs.g62', maxLength: 16, width: 116},
            {x: 988, y: 1357+this.deltaY, name: 'smgs.g621', itemId: 'smgs.g621', maxLength: 4, width: 100},
            {x: 1090, y: 1357+this.deltaY, name: 'smgs.g622', itemId: 'smgs.g622', maxLength: 4, width: 100},

            {
                xtype: 'button',
                text: this.labelVagKontGruz,
                x: 170, y: 700+this.deltaY,
                action: 'changeVgCtGr'
            },

            {x: 1073, y: 496+this.deltaY, name: 'smgs.g18B1', itemId: 'smgs.g18B1', maxLength: 4, width: 91},
            {x: 1193, y: 496+this.deltaY, name: 'smgs.g18B2', itemId: 'smgs.g18B2', maxLength: 4, width: 88},
            {x: 7, y: 995+this.deltaY, xtype: 'label', text: this.labelNotes, style: 'font-weight:bold;'},
            {
                x: 7,
                y: 1009+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g11_prim',
                itemId: 'smgs.g11_prim',
                maxLength: 1024,
                width: 785,
                height: 50
            },
            {
                x: 135,
                y: 1060+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g2012',
                itemId: 'smgs.g2012',
                maxLength: 160,
                width: 650,
                height: 40,
                readOnly: true
            },

            {
                x: 794,
                y: 886+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g26',
                itemId: 'smgs.g26',
                maxLength: 128,
                width: 312,
                height: 217
            },
            {x: 796, y: 729+this.deltaY, name: 'smgs.g23', itemId: 'smgs.g23', maxLength: 20, width: 134},
            {
                x: 1113,
                y: 927+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g39',
                itemId: 'smgs.g39',
                maxLength: 50,
                width: 168,
                height: 166
            },
            {
                x: 693,
                y: 1167+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g60',
                itemId: 'smgs.g60',
                maxLength: 240,
                width: 590,
                height: 56
            },
            {x: 712, y: 1240+this.deltaY, name: 'smgs.g61', itemId: 'smgs.g61', maxLength: 80, width: 381},
            {x: 1101, y: 1240+this.deltaY, name: 'smgs.g611', itemId: 'smgs.g611', maxLength: 2, width: 40},
            {x: 1149, y: 1240+this.deltaY, name: 'smgs.g612', itemId: 'smgs.g612', maxLength: 6, width: 133},
            {
                x: 693,
                y: 1413+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g63',
                itemId: 'smgs.g63',
                maxLength: 180,
                width: 590,
                height: 43
            },
            {
                x: 7,
                y: 1496+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g64',
                itemId: 'smgs.g64',
                maxLength: 160,
                width: 357,
                height: 121
            },
            {
                x: 368,
                y: 1496+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g65',
                itemId: 'smgs.g65',
                maxLength: 200,
                width: 409,
                height: 121
            },
            {
                x: 783,
                y: 1496+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g651',
                itemId: 'smgs.g651',
                maxLength: 160,
                width: 405,
                height: 121
            },
            {
                x: 1193,
                y: 1496+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g652',
                itemId: 'smgs.g652',
                maxLength: 30,
                width: 90,
                height: 121
            },
            {
                x: 10,
                y: 630+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.otmPoluch',
                itemId: 'smgs.otmPoluch',
                maxLength: 512,
                width: 678,
                height: 57
            },

            {x: 937, y: 720+this.deltaY, xtype: 'displayfield', value: 'Prefix', itemId: 'nettoPrefDisp'},
            {x: 937, y: 740+this.deltaY, name: 'smgs.nettoPref', itemId: 'smgs.nettoPref', maxLength: 20, width: 38},
            {x: 976, y: 720+this.deltaY, xtype: 'displayfield', value: this.labelNetto, itemId: 'nettoDisp'},
            {
                x: 976,
                y: 740+this.deltaY,
                xtype: 'numberfield',
                name: 'smgs.g24N',
                itemId: 'smgs.g24N',
                maxLength: 10,
                width: 130,
                minValue: 0
            },

            {x: 937, y: 785+this.deltaY, name: 'smgs.taraPref', itemId: 'smgs.taraPref', maxLength: 20, width: 38},
            {x: 976, y: 765+this.deltaY, xtype: 'displayfield', value: this.labelTara, itemId: 'taraDisp'},
            {
                x: 976,
                y: 785+this.deltaY,
                xtype: 'numberfield',
                name: 'smgs.g24T',
                itemId: 'smgs.g24T',
                maxLength: 10,
                width: 130,
                minValue: 0
            },

            {x: 937, y: 830+this.deltaY, name: 'smgs.bruttoPref', itemId: 'smgs.bruttoPref', maxLength: 20, width: 38},
            {x: 976, y: 810+this.deltaY, xtype: 'displayfield', value: this.labelBrutto, itemId: 'bruttoDisp'},
            {
                x: 976,
                y: 830+this.deltaY,
                xtype: 'numberfield',
                name: 'smgs.g24B',
                itemId: 'smgs.g24B',
                maxLength: 10,
                width: 130,
                minValue: 0
            },

            {
                x: 7,
                y: 1644+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.ga66',
                itemId: 'smgs.ga66',
                maxLength: 100,
                width: 358,
                height: 99
            },
            {
                x: 330,
                y: 1760+this.deltaY,
                xtype: 'checkbox',
                name: 'smgs.gb661',
                inputValue: '1',
                itemId: 'smgs.gb661',
                uncheckedValue: 0
            },
            {x: 274, y: 1798+this.deltaY, name: 'smgs.gb662', itemId: 'smgs.gb662', maxLength: 4, width: 90},
            {
                x: 944,
                y: 1774+this.deltaY,
                xtype: 'textarea',
                name: 'smgs.g28',
                itemId: 'smgs.g28',
                maxLength: 240,
                width: 193,
                height: 52
            },
            {x: 1145, y: 1774+this.deltaY, xtype: 'datefield', name: 'smgs.g281', itemId: 'smgs.g281', width: 80},
            {x: 372, y: 1645+this.deltaY, xtype: 'datefield', name: 'smgs.g67', itemId: 'smgs.g67', width: 80},
            {x: 800, y: 1649+this.deltaY, name: 'smgs.g68', itemId: 'smgs.g68', maxLength: 6, width: 132},
            {x: 1062, y: 1644+this.deltaY, name: 'smgs.g691', itemId: 'smgs.g691', maxLength: 2, width: 39},
            {x: 1135, y: 1644+this.deltaY, name: 'smgs.g692', itemId: 'smgs.g692', maxLength: 6, width: 134},
            {x: 1014, y: 1713+this.deltaY, name: 'smgs.g693', itemId: 'smgs.g693', maxLength: 4, width: 88},
            {x: 1135, y: 1713+this.deltaY, name: 'smgs.g694', itemId: 'smgs.g694', maxLength: 50, width: 136},
            {xtype: 'cim_g1_detailpanel'},
            {xtype: 'cim_g4_detailpanel'},
            {
                xtype: 'detailpanel',
                x: 350, y: 50, width: 400,
                itemId: 'g7_panel',
                title: this.labelZayavSenderPayers,
                items: [
                    {xtype: 'label', text: this.labelZayavSender, cls: 'th'},
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsDocses7',
                        itemId: 'g7_panel_tab_7',
                        tabItems: [
                            {
                                xtype: 'trigger',
                                fieldLabel: this.labelCodeDoc,
                                itemId: "code",
                                maxLength: 3,
                                triggerCls: 'dir'
                            },
                            {xtype: 'textarea', fieldLabel: this.labelText, itemId: "text", maxLength: 500},
                            {xtype: 'textarea', fieldLabel: this.labelTextEu, itemId: "text2", maxLength: 240},
                            {xtype: 'hidden', itemId: "fieldNum", value: '7'},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    },
                    {xtype: 'label', text: this.labelPayers, cls: 'th'},
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsPlatels',
                        itemId: 'g7_panel_tab_722',
                        tabItems: [
                            {
                                xtype: 'combo',
                                fieldLabel: this.labelBukvKod,
                                itemId: "dor",
                                maxLength: 5,
                                store: ['РЖД', 'УЗ', 'БЧ', 'УТИ', 'КЗХ', 'КРГ', 'ЖСР'],
                                typeAhead: true,
                                forceSelection: true,
                                triggerAction: 'all',
                                selectOnFocus: true
                            },
                            {
                                xtype: 'trigger',
                                fieldLabel: this.labelPayerName,
                                itemId: "plat",
                                maxLength: 45,
                                triggerCls: 'dir'
                            },
                            {xtype: 'textarea', fieldLabel: this.labelThrough, itemId: "prim", maxLength: 70},
                            {xtype: 'textfield', fieldLabel: this.labelPayerKod1, maxLength: 50, itemId: "kplat"},
                            {xtype: 'textfield', fieldLabel: this.labelPayerKod2, itemId: "kplat1", maxLength: 50},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    }
                ],
                setDisplayedField: function () {
                    var dispField = this.ownerCt.getComponent('disp.g7'),
                        tabP = this.getComponent('g7_panel_tab_7'),
                        arr1 = new Array(),
                        arr2 = new Array(),
                        diff, prefix = '7.';
                    tabP.items.each(
                        function (item, index, length) {
                            arr1[index] =
                                (item.getComponent('code').getValue() ? prefix + item.getComponent('code').getValue() + ' ' : '') +
                                (item.getComponent('text').getValue() ? item.getComponent('text').getValue() + ' ' : '') +
                                (item.getComponent('text2').getValue() ? item.getComponent('text2').getValue() : '') +
                                '\n';
                        }
                    );
                    tabP = this.getComponent('g7_panel_tab_722');
                    tabP.items.each(
                        function (item, index, length) {
                            arr2[index] =
                                (item.getComponent('dor').getValue() ? item.getComponent('dor').getValue() + ' ' : '') +
                                (item.getComponent('plat').getValue() ? item.getComponent('plat').getValue() + ' ' : '') +
                                (item.getComponent('prim').getValue() ? item.getComponent('prim').getValue() + ' ' : '') +
                                (item.getComponent('kplat').getValue() ? item.getComponent('kplat').getValue() + ' ' : '') +
                                (item.getComponent('kplat1').getValue() ? item.getComponent('kplat1').getValue() : '') +
                                '\n';
                        }
                    );
                    if ((diff = arr1.length - arr2.length)) {
                        if (diff > 0) {
                            do {
                                arr2.push('');
                                diff--;
                            } while (diff > 0);
                        } else {
                            do {
                                arr1.push('');
                                diff++;
                            } while (diff < 0);
                        }
                    }
                    dispField.setValue('');
                    for (var i = 0; i < arr1.length; i++) {
                        dispField.setValue(dispField.getValue() + arr1[i] + arr2[i]);
                    }
                },
                copyValues2MainFlds: function () {
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
                    var tCN = this.getComponent('g7_panel_tab_7').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.ownerCt.dataObj[tCN];
                    tCN = this.getComponent('g7_panel_tab_722').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype: 'detailpanel',
                x: 510, y: 240, width: 400,
                itemId: 'g9_panel',
                title: this.labelSenderDocs,
                items: [
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsDocses9',
                        itemId: 'g9_panel_tab_9',
                        tabItems: [
                            {
                                xtype: 'trigger',
                                fieldLabel: this.labelCustomsCode,
                                itemId: "ncas",
                                maxLength: 6,
                                triggerCls: 'dir'
                            },
                            {xtype: 'textarea', fieldLabel: this.labelName, itemId: "text", maxLength: 500},
                            {xtype: 'textarea', fieldLabel: this.labelNameEu, itemId: "text2", maxLength: 240},
                            {xtype: 'textfield', fieldLabel: this.labelDocNum, itemId: "ndoc", maxLength: 56},
                            {xtype: 'datefield', fieldLabel: this.labelDate, itemId: "dat"},
                            {
                                xtype: 'numberfield',
                                fieldLabel: this.labelTotal,
                                itemId: "ncopy",
                                maxLength: 10,
                                allowDecimals: false,
                                minValue: 0
                            },
                            {xtype: 'hidden', itemId: "code"},
                            {xtype: 'hidden', itemId: "fieldNum", value: '9'},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    }
                ],
                setDisplayedField: function () {
                    var _f9 = '', _f9_1 = '', g = this.ownerCt.getComponent('disp.g9'),
                        tabP = this.getComponent('g9_panel_tab_9');
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
                copyValues2MainFlds: function () {
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
                copyValues2Buf: function () { // panel
                    this.bufData = {};
                    this.items.each(function (item, index, length) {
                        var tCN = item.tabCollectionName;
                        this.bufData[tCN] = {};
                        item.items.each(function (itm, ind, len) { // tab
                            this.bufData[tCN][ind] = {};
                            itm.items.each(function (field, i, l) { // fields
                                this.bufData[tCN][ind][field.itemId] = field.getValue();
                            }, this);
                        }, this);
                    }, this);
                },
                initBuf: function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g9_panel_tab_9').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.ownerCt.dataObj[tCN];
                }
            },
            {
                xtype: 'detailpanel',
                x: 450, y: 560, width: 400,
                itemId: 'g13_panel',
                title: this.labelCommercTerms,
                items: [
                    {
                        xtype: 'detailtabpanel',
                        tabCollectionName: 'cimSmgsDocses13',
                        itemId: 'g13_panel_tab_13',
                        tabItems: [
                            {
                                xtype: 'trigger',
                                fieldLabel: this.labelCodeDoc,
                                itemId: "code",
                                maxLength: 3,
                                triggerCls: 'dir'
                            },
                            {xtype: 'textarea', fieldLabel: this.labelTextRu, itemId: "text", maxLength: 500},
                            {xtype: 'textarea', fieldLabel: this.labelText, itemId: "text2", maxLength: 240},
                            {xtype: 'hidden', itemId: "fieldNum", value: '13'},
                            {xtype: 'hidden', itemId: "sort"},
                            {xtype: 'hidden', itemId: "hid"}
                        ]
                    }
                ],
                setDisplayedField: function () {
                    var _f13 = '', _f13_1 = '', g = this.ownerCt.getComponent('disp.g13'),
                        tabP = this.getComponent('g13_panel_tab_13');
                    tabP.items.each(
                        function (item, index, length) {
                            if (item.getComponent('text').getValue()) {
                                _f13 = _f13 + (item.getComponent('code').getValue() ? "13." + item.getComponent('code').getValue() + ". " : "") +
                                    item.getComponent('text').getValue() + "\n";
                            }
                            if (item.getComponent('text2').getValue()) {
                                _f13_1 = _f13_1 + (item.getComponent('code').getValue() ? "13." + item.getComponent('code').getValue() + ". " : "") +
                                    item.getComponent('text2').getValue() + "\n";
                            }
                        }
                    );
                    g.setValue((_f13 + _f13_1));
                },
                copyValues2MainFlds: function () {
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
                        else if (item.itemId) { // input field
                            this.bufData['g13c'] = item.getValue();
                        }
                    }, this);
                },
                initBuf: function () {
                    this.bufData = {};
                    var tCN = this.getComponent('g13_panel_tab_13').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.ownerCt.dataObj[tCN];
                    this.bufData['g13c'] = this.ownerCt.ownerCt.dataObj['g13c'];
                }
            }
        ]
    }
});