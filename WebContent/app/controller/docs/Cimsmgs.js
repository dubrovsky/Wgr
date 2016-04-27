Ext.define('TK.controller.docs.Cimsmgs', {
    extend:'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils'
    ],

    views:[
        'cimsmgs.CimSmgsList',
        'cimsmgs.CimSmgsForm',
        'cimsmgs.CimSmgsVgCtGrTreeFormWin',
        'cimsmgs.CimSmgsDocs9TreeFormWin',
        'cimsmgs.CimSmgsPlombsTreeFormWin'
    ],
    stores:[
        'CimSmgses'
    ],
    models:[
        'CimSmgs',
        'CimSmgsOtpr'
    ],
    refs:[
        {
            ref:'list',
            selector:'viewport > tabpanel > cimsmgslist'
        },
        {
            ref:'menutree',
            selector:'viewport > menutree'
        },
        {
            ref:'center',
            selector:'viewport > tabpanel'
        }, {
            ref:'cimsmgs',
            selector:'viewport > tabpanel > cimsmgs'
        }
    ],
    init:function () {
        this.control({
            'cimsmgslist':{
                select: this.onRowclick
            },
            'cimsmgs button[action=changeVgCtGr]': {
                click: this.onCimSmgsVgCtGrWinShow
            },
            'cimsmgs button[action=changeDocs9]': {
                click: this.onCimSmgsDocs9WinShow
            },
            'cimsmgs button[action=changePlombs]': {
                click: this.onCimSmgsPlombsWinShow
            },
            'cimsmgs': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            }
        });
    },
    initEvents:function (form) {
        Ext.each(form.query('button[action=change]'), function (item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);
        form.down('triggerfield[name=smgs.g1r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
            nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
        }, this);
        form.down('triggerfield[name=smgs.g4r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
            nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
        }, this);
        form.down('detailtabpanel[itemId=g7_panel_tab_7]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG7().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        /*form.down('detailtabpanel[itemId=g9_panel_tab_9]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    /!*tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG9().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);*!/
                    tab.getComponent('ncas').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectDocG23, tab);
                    }, this);
                }
            },
            this
        );*/
        form.down('detailtabpanel[itemId=g13_panel_tab_13]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG13().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g13_panel_tab_136]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('ndoc').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('ndoc').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc136, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g7_panel_tab_722]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('plat').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('plat').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                        nsiGrid.on('itemdblclick', this.selectPlatG7_22, tab);
                    }, this);
                }
            },
            this
        );
        /*form.down('detailtabpanel[itemId=g19v_panel_tab]').on(
            'add',
            function (vags, vag, inx) {
                if (vags.isXType('detailtabpanel', true) && vag.getComponent('g19k_panel_tab')) {
                    vag.getComponent('g19k_panel_tab').on('add', function (kons, kon, inx) {
                        if (kons.isXType('detailtabpanel', true) && kon.getComponent('g19g_panel_tab')) {
                            kon.getComponent('g19g_panel_tab').on('add', function (gruzs, gruz, inx) {
                                if (gruzs.isXType('detailtabpanel', true)) {
                                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function () {
                                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.selectGng, gruz);
                                    }, this);
                                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function () {
                                        var nsiGrid = this.getController('Nsi').nsiEtsng(gruz.getComponent('ekgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.selectEtsng, gruz);
                                    }, this);
                                }
                            }, this);
                        }
                    }, this);
                }
            },
            this
        );*/
    },
    selectGng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('kgvn').setValue(data['code']);
        this.getComponent('nzgr').setValue(data['name']);
        this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },
    selectEtsng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ekgvn').setValue(data.code);
        this.getComponent('enzgr').setValue(data.name);
        this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },
    onChangeData:function (btn, ev) {
        var panel, tabpanels;
        if (btn.itemId.indexOf('g19') == -1) {
            panel = this.getComponent(btn.itemId + 'panel');
        }
        /*else {
            panel = this.getComponent('g19v_panel');
//    		panel.onChangeData(btn);
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);
        }*/
        tabpanels = panel.query('detailtabpanel');
        for (var i = 0; i < tabpanels.length; i++) {
            if (tabpanels[i].items.getCount() == 0) {  // add tab by default if noone exists
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    },
    selectOtprG1:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g1').setValue(data['g1']);
        this.getComponent('smgs.g1r').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g11_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g12_1').setValue(data['g12']);
//        this.getComponent('smgs.g13').setValue(data['g13']);
        this.getComponent('smgs.g15_1').setValue(data['g15_1']);
        this.getComponent('smgs.g16_1').setValue(data['g16_1']);
        this.getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('smgs.g17_1').setValue(data['g17_1']);
        this.getComponent('smgs.g18_1').setValue(data['g18_1']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        this.getComponent('smgs.g110').setValue(data['g110']);
        this.ownerCt.getComponent('smgs.g2').setValue(data['g2']);
        this.ownerCt.getComponent('smgs.g3').setValue(data['g3']);
        view.up('window').close();
    },
    selectOtprG4:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g1_1').setValue(data['g1']);
        this.getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g41_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g42_1').setValue(data['g12']);
//        this.getComponent('smgs.g13').setValue(data['g13']);
        this.getComponent('smgs.g15_1_1').setValue(data['g15_1']);
        this.getComponent('smgs.g16_1_1').setValue(data['g16_1']);
        this.getComponent('smgs.g16r_1').setValue(data['g16r']);
        this.getComponent('smgs.g17_1_1').setValue(data['g17_1']);
        this.getComponent('smgs.g18_1_1').setValue(data['g18_1']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        this.getComponent('smgs.g110_1').setValue(data['g110']);
        this.ownerCt.getComponent('smgs.g5').setValue(data['g2']);
        this.ownerCt.getComponent('smgs.g6').setValue(data['g3']);
        view.up('window').close();
    },
    nsiOtpr:function (query) {
        var me = this;
        return Ext.widget('nsieditlist', {
            title:this.titleOtpr,
            width:1000, height:700,
            search:query,
            buildStoreModel:function () {
                return 'TK.model.CimSmgsOtpr';
            },
            buildUrlPrefix:function () {
                return 'NsiSmgsG1';
            },
            buildColModel:function (config) {
                config.items.columns = {
                    items:[
                        {xtype:'actioncolumn', width:55,
                            items:[
                                {icon:'./resources/images/save.gif', tooltip:'Сохранить', action:'save', handler:me.getController('Nsi').onSaveRecord},
                                {icon:'./resources/images/delete.png', tooltip:'Удалить', action:'del', handler:me.getController('Nsi').onDelRecord}
                            ]
                        },
                        {text:me.headerOtprName, dataIndex:'g1', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprName1, dataIndex:'g1r', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprEmail, dataIndex:'g11', editor:{xtype:'textfield', maxLength:80}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprPhone, dataIndex:'g12', editor:{xtype:'textfield', maxLength:60}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprStrCode, dataIndex:'g15_1', editor:{xtype:'textfield'}},
                        {text:me.headerOtprStr, dataIndex:'g16_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprStr1, dataIndex:'g16r', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprZip, dataIndex:'g17_1', editor:{xtype:'textfield', maxLength:10}},
                        {text:me.headerOtprCity, dataIndex:'g18_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprCity1, dataIndex:'g18r_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress, dataIndex:'g19_1', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress1, dataIndex:'g19r', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprVat, dataIndex:'g110', editor:{xtype:'textfield', maxLength:16}},
                        {text:me.headerOtprSendCode, dataIndex:'g2', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprClCode, dataIndex:'g3', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr}
                    ],
                    defaults:{sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                };
            },
            newRecord:function () {
                return Ext.create('TK.model.CimSmgsOtpr', {hid:'', g1:'', g1r:'', g11:'', g12:'', g13:'', g15_1:'', g16_1:'', g16r:'', g17_1:'', g18_1:'', g18r_1:'', g19_1:'', g19r:'', g110:'', g2:'', g3:''});
            }
        });
    },
    selectDoc:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        view.up('window').close();
    },
    selectDoc136:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ndoc').setValue(data['staNo']);
        this.getComponent('text').setValue(data['staName']);
        this.getComponent('text2').setValue(data['staNameEn']);
        this.getComponent('text3').setValue(data['staNameCh']);
        view.up('window').close();
    },
    selectPlatG7_22:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('dorR').setValue(data['dorR']);
        this.getComponent('platR').setValue(data['platR']);
        this.getComponent('primR').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
        view.up('window').close();
    },
    onRowclick:function (rowModel, model, index) {
        this.getCenter().suspendLayouts();

        var grid = Ext.ComponentQuery.query('docslist')[0];
        grid.fireEvent("cimSmgsListStatusChanged", grid);

        /*this.ftsStatusCheck();
        var delBtn = this.getList().getDockedComponent('top').getComponent('del');
        if(delBtn) {
            this.isStatusLocked('', model.get('status'), model.get('fts'), model.get('btlc'), model.get('tdgFts')) ?
                delBtn.disable() :
                delBtn.enable();
        }*/

        this.getCenter().resumeLayouts();
    },
    onCimSmgsVgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'cimsmgsVgCtGrTreeformWin', btn.up('docsform'));
    },

    onCimSmgsDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'cimsmgsDocs9TreeformWin', btn.up('docsform'));
    },

    onCimSmgsPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'cimsmgsPlombsTreeformWin', btn.up('docsform'));
    },

    setDisplayedVgCtGrFields: function(){
        var vags = this.getCimsmgs().dataObj[this.getCimsmgs().getVagCollectionName()],
            vagDisplField = this.getCimsmgs().getComponent('disp.g19v');

        if(vags){
            this.setDisplayedVagFields(vags, vagDisplField);
        } else {
            vagDisplField.setValue('');
            this.getCimsmgs().getComponent('disp.g19k').setValue('');
            this.getCimsmgs().getComponent('disp.g19g').setValue('');
        }

    },

    setDisplayedVagFields: function(vags, vagDisplField){
        var vagResult = '',
            contResult = '',
            gryzResult = '',
            gryzyGngMap = new Ext.util.MixedCollection(),
            contsGryzyResult = {},
            vag,
            conts,
        // gryzyCount = 0,
        // gryzyMassa = 0,
            contsMassa = 0,
            contDisplField = this.getCimsmgs().getComponent('disp.g19k'),
            gryzDisplField = this.getCimsmgs().getComponent('disp.g19g')/*,
         g11PrimResult = ''*/;

        for(var vagIndx in vags){
            vag = vags[vagIndx];

            if(vagIndx == '0' && !vags['1']) {  // only 1 vag
                vagResult = (vag['nvag'] ? '№ вагона/Wagen Nr ' + vag['nvag'] + '\n' : '');
                vagResult += (vag['grPod'] ? 'Тоннаж/Tragwagenfaeigkeith ' + vag['grPod'] + '\n' : '');
                vagResult += (vag['taraVag'] ? 'Тара/Tara ' + vag['taraVag'] + '\n' : '');
                vagResult += (vag['kolOs'] ? 'Оси/Achse ' + vag['kolOs'] + '\n' : '');
            } else {
                // vagResult += vag['nvag'] + '\n';
                vagResult = 'Siehe Nachweisung\nсм. Ведомость';
            }

            conts = vag[this.getCimsmgs().getContCollectionName()];
            if(conts){
                contsGryzyResult = this.setDisplayedContFields(conts, /*g11PrimResult,*/ gryzyGngMap);
                contResult += contsGryzyResult['contResult'];
                // gryzResult += contsGryzyResult['gryzResult'];
                // gryzyCount += contsGryzyResult['gryzyCount'];
                // gryzyMassa += contsGryzyResult['gryzyMassa'];
                contsMassa += contsGryzyResult['contsMassa'];
                // g11PrimResult = contsGryzyResult['g11PrimResult'];
            }
        }

        vagDisplField.setValue(vagResult);
        contDisplField.setValue(contResult);
        this.getCimsmgs().getComponent('smgs.g24N').setValue(gryzyGngMap.sum('massa'));
        this.getCimsmgs().getComponent('smgs.g24T').setValue(contsMassa);

        if(gryzyGngMap.getCount() > 0){
            if(gryzyGngMap.getCount() > 1){
                gryzResult = 'Сборный груз: Sammelgut:\n\n'/* + gryzResult*/;
            }
            gryzResult += this.setDisplayedGryzFields(gryzyGngMap);
            gryzDisplField.setValue(gryzResult);
        } else {
            gryzDisplField.setValue('');
        }
    },

    setDisplayedContFields: function(conts, /*g11PrimResult,*/ gryzyGngMap){
        var contResult = '',
        // gryzResult = '',
        // gryzyResult = {},
        // gryzyMassa = 0,
        // gryzyCount = 0,
            contsMassa = 0;

        for(var contIndx in conts){
            var cont = conts[contIndx];

            contResult += (cont['sizeFoot'] ? '1x' + cont['sizeFoot'] : '');
            contResult += (cont['notes'] ? ' ' + cont['notes'] : '');
            contResult += (cont['utiN'] ? ' Container № ' + cont['utiN'] : '');
            /*if(cont['utiN']){
                var konConst = (cont['notes'] ? '' : 'HC Container №');
                contResult += ' ' + konConst + '\n' + cont['utiN'];
            }*/
            contResult += (cont['sizeMm'] ? '\n(' + cont['sizeMm'] + 'mm)' : '');
            contResult += '\n';

            var contMassa = parseInt(cont['taraKont']);
            contsMassa += isNaN(contMassa) ? 0 : contMassa;

            var gryzy = cont[this.getCimsmgs().getGryzCollectionName()];
            if(gryzy){
                // gryzyResult = this.setDisplayedGryzFields(gryzy, gryzyCount, g11PrimResult);
                this.groupGruzByKgvn(gryzy, gryzyGngMap);
                // gryzResult += gryzyResult['gryzResult'];
                // gryzyCount += gryzyResult['gryzyCount'];
                // gryzyMassa += gryzyResult['gryzyMassa'];
                // g11PrimResult = gryzyResult['g11PrimResult'];
            }
        }

        return {
            contResult: contResult,
            // gryzResult: gryzResult,
            // gryzyCount: gryzyCount,
            // gryzyMassa: gryzyMassa,
            contsMassa: contsMassa/*,
             g11PrimResult: g11PrimResult*/
        };
    },

    groupGruzByKgvn: function(gryzy, gryzMap){
        for(var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gruzTemp = gryzMap.get(gryz['kgvn'].trim());

            if(!gruzTemp){
                gruzTemp = Ext.clone(gryz);
                gruzTemp['places'] = 0;
                gruzTemp['massa'] = 0;
                gryzMap.add(gryz['kgvn'] ? gryz['kgvn'].trim() : Ext.Number.randomInt(1, 100000), gruzTemp);
            }

            var massa = 0;
            if(gryz['massa']){
                massa = parseFloat(gryz['massa']);
                gruzTemp['massa'] += isNaN(massa) ? 0 : massa;
            }

            var places = 0;
            if(gryz['places']){
                places = parseInt(gryz['places']);
                gruzTemp['places'] += isNaN(places) ? 0 : places;
            }
        }
    },

    setDisplayedGryzFields: function(/*gryzy, g11PrimResult*/gryzyGngMap){
        var gryzResult = '',
            g11PrimResult = ''/*,
         gryzyMassa = 0,
         gryzyCount = 0*/;

        gryzyGngMap.each(function(gryz, gryzIndx) {
                gryzResult += (gryz['nzgr'] ? gryz['nzgr'] : '');
                gryzResult += (gryz['nzgrEu'] ? '\n' + gryz['nzgrEu'] : '');
                gryzResult += (gryz['kgvn'] ? '\nГНГ- ' + gryz['kgvn'] : '');
                gryzResult += (gryz['ekgvn'] ? '\nЕТ СНГ- ' + gryz['ekgvn'] : '');
                gryzResult += (gryz['upak'] ? '\nУпаковка- ' + gryz['upak'] : '');
                gryzResult += (gryz['places'] ? '\nМеста- ' + gryz['places'] : '');
                gryzResult += (gryz['massa'] ? '\nМасса- ' + gryz['massa'].toFixed(3) + 'кг\n\n' : '');

                // gryzyCount++;
                /*var gryzMassa = parseFloat(gryz['massa']);
                 gryzyMassa += isNaN(gryzMassa) ? 0 : gryzMassa;*/
                if(!g11PrimResult && gryz['ohr']){
                    g11PrimResult = 'Груз подлежит охране';

                    var g11PrimDisplField = this.getCimsmgs().getComponent('smgs.g11_prim');
                    if(!g11PrimDisplField.getValue()){     // empty
                        g11PrimDisplField.setValue(g11PrimResult);
                    } else {
                        var re = new RegExp(g11PrimResult,'gi');
                        if(g11PrimDisplField.getValue().search(re) == -1){
                            g11PrimDisplField.setValue(g11PrimDisplField.getValue() + ' ' + g11PrimResult);
                        }
                    }
                }
            },
            this
        );

        /*for(var gryzIndx in gryzy) {
         var gryz = gryzy[gryzIndx];

         gryzResult += (gryz['nzgr'] ? gryz['nzgr'] : '');
         gryzResult += (gryz['nzgrEu'] ? '\n' + gryz['nzgrEu'] : '');
         gryzResult += (gryz['kgvn'] ? '\nГНГ- ' + gryz['kgvn'] : '');
         gryzResult += (gryz['ekgvn'] ? '\nЕТ СНГ- ' + gryz['ekgvn'] : '');
         gryzResult += (gryz['upak'] ? '\nУпаковка- ' + gryz['upak'] : '');
         gryzResult += (gryz['places'] ? '\nМеста- ' + gryz['places'] : '');
         gryzResult += (gryz['massa'] ? '\nМасса- ' + gryz['massa'] + 'кг\n\n' : '');

         // gryzyCount++;
         /!*var gryzMassa = parseFloat(gryz['massa']);
         gryzyMassa += isNaN(gryzMassa) ? 0 : gryzMassa;*!/
         if(!g11PrimResult && gryz['ohr']){
         g11PrimResult = 'Груз подлежит охране';

         var g11PrimDisplField = this.getCimsmgs().getComponent('smgs.g11_prim');
         if(!g11PrimDisplField.getValue()){     // empty
         g11PrimDisplField.setValue(g11PrimResult);
         } else {
         var re = new RegExp(g11PrimResult,'gi');
         if(g11PrimDisplField.getValue().search(re) == -1){
         g11PrimDisplField.setValue(g11PrimDisplField.getValue() + ' ' + g11PrimResult);
         }
         }
         }
         }*/

        return gryzResult;
        /*return {
         gryzResult: gryzResult,
         // gryzyCount: gryzyCount,
         // gryzyMassa: gryzyMassa,
         g11PrimResult: g11PrimResult
         };*/
    },

    setDisplayedDocs9Fields: function(){
        var vags = this.getCimsmgs().dataObj[this.getCimsmgs().getVagCollectionName()],
            docs9DisplField = this.getCimsmgs().getComponent('disp.g9'),
            docs9Result = '';

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx],
                    conts = vag[this.getCimsmgs().getContCollectionName()];

                if(conts && !Ext.Object.isEmpty(conts)){

                    for(var contIndx in conts){
                        var cont = conts[contIndx],
                            docs9 = cont[this.getCimsmgs().getDocs9CollectionName()];

                        if(docs9 && !Ext.Object.isEmpty(docs9)){

                            for(var docs9Indx in docs9){
                                var doc9 = docs9[docs9Indx];

                                docs9Result += (doc9['text'] ? doc9['text'] + '  ' : '');
                                docs9Result += (doc9['text2'] ? doc9['text2'] + '  ' : '');
                                docs9Result += (doc9['ndoc'] ? doc9['ndoc'] + '  ' : '');
                                docs9Result += (doc9['dat'] ? 'от ' + doc9['dat'] + '  ' : '');
                                docs9Result += (doc9['ncopy'] ? doc9['ncopy'] + ' экз '  : '');
                                docs9Result += '\n';
                            }
                        }

                    }
                }

            }
        }

        docs9DisplField.setValue(docs9Result);
    },

    setG2012DataObj: function(){
        var vags = this.getCimsmgs().dataObj[this.getCimsmgs().getVagCollectionName()],
            plombsResult = '',
            delim = '',
            plombsCount = 0,
            vagsCount = 0,
            contsCount = 0;

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx],
                    conts = vag[this.getCimsmgs().getContCollectionName()];

                if(conts && !Ext.Object.isEmpty(conts)){

                    for(var contIndx in conts){
                        var cont = conts[contIndx],
                            plombs = cont[this.getCimsmgs().getPlombsCollectionName()];

                        if(plombs && !Ext.Object.isEmpty(plombs)){

                            for(var plombsIndx in plombs){
                                var plomb = plombs[plombsIndx];

                                if(vagIndx == 0 && !vags[1] && contIndx == 0 && !conts[1] ){ // only 1 vag and 1 cont
                                    plombsResult += delim;
                                    plombsResult += (plomb['kpl'] ? plomb['kpl'] + 'x  ' : '');
                                    plombsResult += (plomb['znak'] ? plomb['znak'] : '');
                                    delim = ', ';
                                }

                                var kpl = parseInt(plomb['kpl']);
                                plombsCount += isNaN(kpl) ? 0 : kpl;
                            }
                        }
                        contsCount++;
                    }

                }
                vagsCount++;
            }
        }

        if(vagsCount > 1 || contsCount > 1){
            plombsResult = 'SEALED / пломбы ' + plombsCount + ' (см.ведомость)';
        }
        this.getCimsmgs().dataObj['g2012'] = plombsResult;
    },

    setDisplayedPlombsFields: function(){
        this.getCimsmgs().getComponent('smgs.g2012').setValue(this.getCimsmgs().dataObj['g2012']);
    }
});