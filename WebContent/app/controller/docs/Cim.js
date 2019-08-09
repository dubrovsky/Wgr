Ext.define('TK.controller.docs.Cim', {
    extend: 'Ext.app.Controller',

    requires: [],

    views: [
        'cim.CimList',
        'cim.CimForm',
        'cim.CimFormPanel',
        'cim.CimVgCtGrTreeFormWin',
        'cim.CimDocs9TreeFormWin',
        'cim.CimPlombsTreeFormWin'
    ],
    stores: ['Cims'],
    models: ['Cim'],
    refs: [{
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'list',
        selector: 'viewport > tabpanel > cimlist'
    }, {
        ref:'cim',
        selector:'viewport > tabpanel > cim'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > cim > cimpanel'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > cim > cimpanel >field[name="disp.g18v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > cim > cimpanel >field[name="disp.g18k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > cim > cimpanel >field[name="disp.g18g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > cim > cimpanel >field[name="disp.g9"]'
    }],
    init: function() {
        this.control({
            /*'viewport > tabpanel > docsform button[action="smgs2Cim"]': {
                click: this.onSmgs2Cim
            }*/
            'cim button[action=changeVgCtGr]': {
                click: this.onCimVgCtGrWinShow
            },
            'cim button[action=changeDocs9]': {
                click: this.onCimDocs9WinShow
            },
            'cim button[action=changePlombs]': {
                click: this.onCimPlombsWinShow
            },
            'cim  > cimpanel': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            }
        });
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        // нажатие кнопки выбора страны отправителя
        form.down('button[action=country]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16_1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=country_4]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g46_1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
            },
            this
        );
        form.getComponent('cimformpanel').getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('cimformpanel').getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('cimformpanel').getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);

        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                //был nsi
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('cimformpanel').getComponent('g1_panel'));
            },
            this
        );
        // form.down('triggerfield[name=smgs.g16_1]').onTriggerClick = Ext.bind(function(){
        //     var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16_1]').getValue()).getComponent(0);
        //     nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        // }, this);
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                //был nsi
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g4]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('cimformpanel').getComponent('g4_panel'));
            },
            this
        );
        // form.down('triggerfield[name=smgs.g46_1]').onTriggerClick = Ext.bind(function(){
        //     var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46_1]').getValue()).getComponent(0);
        //     nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
        // }, this);
        form.down('detailtabpanel[itemId=g7_panel_tab_7]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG7().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g7_panel_tab_722]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('plat').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('plat').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectPlatG4, tab);
                    }, this);
                }
            },
            this
        );
        /*form.down('detailtabpanel[itemId=g9_panel_tab_9]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('ncas').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDocG9, tab);
                    }, this);
                }
            },
            this
        );*/
        form.getComponent('cimformpanel').getComponent('smgs.g101').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('cimformpanel').getComponent('smgs.g101').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG102r, form);
        }, this);
        form.down('detailtabpanel[itemId=g13_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG13().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        form.getComponent('cimformpanel').getComponent('smgs.g162').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('cimformpanel').getComponent('smgs.g162').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        /*form.down('detailtabpanel[itemId=g18v_panel_tab]').on(
            'add',
            function(vags, vag, inx){
                if(vags.isXType('detailtabpanel',true) && vag.getComponent('g18k_panel_tab')) {
                    vag.getComponent('g18k_panel_tab').on('add',function(kons, kon, inx){
                        if(kons.isXType('detailtabpanel',true) && kon.getComponent('fcNetto')) {
                            kon.getComponent('fcNetto').getComponent('netto').on('change', this.onNetto);
                            kon.getComponent('fcTara').getComponent('tara').on('change', this.onTara);
                            kon.getComponent('fcBrutto').getComponent('brutto').on('change', this.onBrutto);
                        }
                    }, this);
                }
            },
            this
        );*/
        /*form.getComponent('smgs.g24N').on('change', this.onG24);
        form.getComponent('smgs.g24T').on('change', this.onG24);*/
    },
    /*onNetto:function(newVal, oldVal){
        var prefix = this.ownerCt.getComponent('nettoPref').getValue(),
            konts = this.up('detailtabpanel'),
            itogo = 0,
            tara = this.ownerCt.ownerCt.getComponent('fcTara').getComponent('tara').getValue(),
            netto = this.getValue();

        konts.items.each(function(kon){
            itogo += kon.getComponent('fcNetto').getComponent('netto').getValue() ? kon.getComponent('fcNetto').getComponent('netto').getValue() : 0;
        });
        this.up('form').getComponent('smgs.g24N').setValue(itogo ? itogo : '');
//        this.up('form').getComponent('nettoDisp').setValue(itogo ? prefix+itogo : '');
        if(!Ext.isNumber(netto) || !Ext.isNumber(tara)) return;
        this.ownerCt.ownerCt.getComponent('fcBrutto').getComponent('brutto').setValue(netto + tara);
    },*/
    /*onTara:function(newVal, oldVal){
        var prefix = this.ownerCt.getComponent('taraPref').getValue(),
            konts = this.up('detailtabpanel'),
            itogo = 0,
            netto = this.ownerCt.ownerCt.getComponent('fcNetto').getComponent('netto').getValue(),
            tara = this.getValue();

        konts.items.each(function(kon){
            itogo += kon.getComponent('fcTara').getComponent('tara').getValue() ? kon.getComponent('fcTara').getComponent('tara').getValue() : 0;
        });
        this.up('form').getComponent('smgs.g24T').setValue(itogo ? itogo : '');
//        this.up('form').getComponent('taraDisp').setValue(itogo ? prefix+itogo : '');
        if(!Ext.isNumber(netto) || !Ext.isNumber(tara)) return;
        this.ownerCt.ownerCt.getComponent('fcBrutto').getComponent('brutto').setValue(tara + netto);
    },*/
    /*onBrutto:function(newVal, oldVal){
        var prefix = this.ownerCt.getComponent('bruttoPref').getValue(),
            konts = this.up('detailtabpanel'),
            itogo = 0;

        konts.items.each(function(kon){
            itogo += kon.getComponent('fcBrutto').getComponent('brutto').getValue() ? kon.getComponent('fcBrutto').getComponent('brutto').getValue() : 0;
        });
        this.up('form').getComponent('smgs.g24B').setValue(itogo ? itogo : '');
//        this.up('form').getComponent('bruttoDisp').setValue(itogo ? prefix+itogo : '');
    },*/
    /*onG24:function(){
        var owner = this.ownerCt,
            tara = parseFloat(owner.getComponent('smgs.g24T').getValue()),
            netto = parseFloat(owner.getComponent('smgs.g24N').getValue()),
            g24B = owner.getComponent('smgs.g24B'), newsum;
//        if(isNaN(val1)) val1 = 0;
//        if(isNaN(val2)) val2 = 0;
//        if(isNaN(val1) || isNaN(val2)) return;
        if(!Ext.isNumber(netto) || !Ext.isNumber(tara)) return;
        g24B.setValue(tara + netto);
//        newsum = val1 + val2;
//        oldsum = g24B.getValue();
//        g24B.setValue(newsum > 0 ? newsum : '');
//        g24B.fireEvent('change', g24B, newsum, oldsum);
//        if(owner.getComponent('g18v_panel').child('radiogroup').getValue()['smgs.vidKontOtpr'] == 1) {
//            owner.getComponent('g18v_panel').setDisplayedField();
//        }
    },
    onG24B:function(){
        var radio = this.ownerCt.getComponent('g18v_panel').child('radiogroup').getValue()['smgs.vidKontOtpr'];
        if(radio == 1 || radio == 2) {
            this.ownerCt.getComponent('g18v_panel').setDisplayedField();
        }
    },*/

    onChangeData:function(btn, ev,out){
        var panel, tabpanels,me;
        // выбор вызвовшего окна шаблон или форма
        me=out?out:this;

        // установка кода отправителя
        if(btn.itemId.indexOf('g1') != -1){
            var value=me.getComponent('cimformpanel').getComponent('smgs.g2').getValue();
            me.getComponent('cimformpanel').getComponent('g1_panel').getComponent('smgs.g2_E').setValue(value);
        }
        // установка кода получателя
        if(btn.itemId.indexOf('g4') != -1){
            var value=me.getComponent('cimformpanel').getComponent('smgs.g5').getValue();
            me.getComponent('cimformpanel').getComponent('g4_panel').getComponent('smgs.g5_E').setValue(value);
        }

        if(btn.itemId.indexOf('g18') == -1){
            panel = me.getComponent('cimformpanel').getComponent(btn.itemId + 'panel');
            tabpanels = panel.query('detailtabpanel');
            for(var i = 0; i < tabpanels.length; i++){
                if(tabpanels[i].items.getCount() == 0){  // add tab by default if noone exists
                    tabpanels[i].onAddTab();
                }
            }
        }
        /*else {
            panel = this.getComponent('g18v_panel');    // dont add tabs by default
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);

        }*/
        panel.show();
        me.maskPanel(true);
    },
    // занечение полей выбранного отправитлеля в форму
    selectOtprG1: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.xtype==='cim_g1_detailpanel')?out:this;
        var data = record.data;
        me.getComponent('naim').getComponent('smgs.g1').setValue(data['g1']);
        me.getComponent('smgs.g2_E').setValue(data['g2']);
        me.getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['g_1_5k']);
        me.getComponent('strn').getComponent('smgs.g16_1').setValue(data['g16_1']);
        me.getComponent('smgs.g17_1').setValue(data['g17_1']);
        me.getComponent('smgs.g18_1').setValue(data['g18_1']);
        me.getComponent('smgs.g19_1').setValue(data['g19_1']);
        me.getComponent('smgs.g110').setValue(data['g110']);
        me.getComponent('smgs.g1_dop_info').setValue(data['dop_info']);
        view.up('window').close();
    },
    //
    selectCountriesG1: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.xtype==='avisocim')?out:this;
        var data = record.data;
        me.getComponent('cimformpanel').getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['abc2']);
        me.getComponent('cimformpanel').getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16_1').setValue(data['anaim']);
        view.up('window').close();
    },
    selectOtprG4: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.xtype==='cim_g4_detailpanel')?out:this;
        var data = record.data;
        me.getComponent('naim').getComponent('smgs.g4').setValue(data['g1']);
        me.getComponent('smgs.g5_E').setValue(data['g2']);
        me.getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['g_1_5k']);
        me.getComponent('strn').getComponent('smgs.g46_1').setValue(data['g16_1']);
        me.getComponent('smgs.g17_1_1').setValue(data['g17_1']);
        me.getComponent('smgs.g48_1').setValue(data['g18_1']);
        me.getComponent('smgs.g49').setValue(data['g19_1']);
        me.getComponent('smgs.g110_1').setValue(data['g110']);
        me.getComponent('smgs.g4_dop_info').setValue(data['dop_info']);
        view.up('window').close();
    },
    selectCountriesG4: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.xtype==='avisocim')?out:this;
        var data = record.data;
        me.getComponent('cimformpanel').getComponent('g4_panel').getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['abc2']);
        me.getComponent('cimformpanel').getComponent('g4_panel').getComponent('strn').getComponent('smgs.g46_1').setValue(data['anaim']);
        view.up('window').close();
    },
    selectDocG9: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.xtype==='avisocim')?out:this;
        var data = record.data;
        me.getComponent('code').setValue(data.nsiFNn);
        me.getComponent('ncas').setValue(data.nsiFNcas);
        me.getComponent('text').setValue(data.nsiFDesc);
        me.getComponent('text2').setValue(data.nsiFDsc3);
        view.up('window').close();
    },
    selectStaG102r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('cimformpanel').getComponent("smgs.g101").setValue(data.staName);
//        this.getComponent("smgs.g_10_3r").setValue(data.mnamerus);
        this.getComponent('cimformpanel').getComponent("smgs.g104").setValue(data.countryname);
        this.getComponent('cimformpanel').getComponent("smgs.g12").setValue(data.managno);
        this.getComponent('cimformpanel').getComponent("smgs.g121").setValue(data.staNo);
        view.up('window').close();
    },
    // выбор документа в окне G7
    selectDoc: function(view, record, item, index,out) {
        var me=(out.type==='dblclick')?this:out;
        var data = record.data;
        me.getComponent('code').setValue(data['nsiFNn']);
        me.getComponent('text').setValue(data['nsiFDesc']);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('cimformpanel').getComponent('smgs.g162').setValue(data.staName);
        this.getComponent('cimformpanel').getComponent('smgs.g164').setValue(data.countryname);
        this.getComponent('cimformpanel').getComponent('smgs.g17').setValue(data.staNo);
        this.getComponent('cimformpanel').getComponent('smgs.g171').setValue(data.managno);

        view.up('window').close();
    },
    // выбор плательщика в окне G7
    selectPlatG4: function(view, record, item, index,out) {
        // выбор вызвовшего окна шаблон или форма
        var me=(out.type==='dblclick')?this:out;
        var data = record.data;
        me.getComponent('dor').setValue(data['dorR']);
        me.getComponent('plat').setValue(data['platR']);
        me.getComponent('prim').setValue(data['primR']);
        me.getComponent('kplat').setValue(data['kplat']);
        me.getComponent('kplat1').setValue(data['kplat1']);
        if(me.getComponent('kplat2')) {
            me.getComponent('kplat2').setValue(data['kplat2']);
        }
        view.up('window').close();
    },
    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },
    onCimVgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'cimVgCtGrTreeformWin', btn.up('docsform'));
    },
    onCimDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'cimDocs9TreeformWin', btn.up('docsform'));
    },
    onCimPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'cimPlombsTreeformWin', btn.up('docsform'));
    },
    setDisplayedVgCtGrFields: function(docForm){
        this.fireEvent('displayedVgCtGrFields', this, docForm);
    },
    setDisplayedDocs9Fields: function(docForm){
        this.fireEvent('displayedDocs9Fields', this, docForm);
    },
    setDisplayedPlombsFields: function(docForm){
        this.fireEvent('displayedPlombsFields', this, docForm);
        // docForm.getComponent('smgs.g2012').setValue(docForm.dataObj['g2012']);
    },
    setG2012DataObj: function(docForm){
        this.fireEvent('savePlombsToDataObj', this, docForm);
    }

    /*,
    onSmgs2Cim: function(btn){
        var smgs = this.getCenter().child('smgs'),
            cim = this.getCenter().child('cim'),
            packId = cim.getForm().findField('smgs.packDoc.hid').getValue() || smgs.getForm().findField('smgs.packDoc.hid').getValue(),
            smgs2cim = function(){
                var smgsF = smgs.getForm(),
                    cimF = cim.getForm();

                cimF.findField('smgs.g1').setValue(smgsF.findField('smgs.g1r').getValue());
                cimF.findField('smgs.g_1_5k').setValue(smgsF.findField('smgs.g15_1').getValue());
                cimF.findField('smgs.g16_1').setValue(smgsF.findField('smgs.g16r').getValue());
                cimF.findField('smgs.g18_1').setValue(smgsF.findField('smgs.g18r_1').getValue());
                cimF.findField('smgs.g19_1').setValue(smgsF.findField('smgs.g19r').getValue());
                cim.getComponent('g1_panel').setDisplayedField();
                cim.getComponent('g1_panel').copyValues2Buf();
                cimF.findField('smgs.g4').setValue(smgsF.findField('smgs.g4r').getValue());
                cimF.findField('smgs.g_4_5k').setValue(smgsF.findField('smgs.g45_1').getValue());
                cimF.findField('smgs.g46_1').setValue(smgsF.findField('smgs.g46r').getValue());
                cimF.findField('smgs.g48_1').setValue(smgsF.findField('smgs.g48r').getValue());
                cimF.findField('smgs.g49').setValue(smgsF.findField('smgs.g49r').getValue());
                cim.getComponent('g4_panel').setDisplayedField();
                cim.getComponent('g4_panel').copyValues2Buf();
                cimF.findField('smgs.g2').setValue(smgsF.findField('smgs.g2').getValue());
                cimF.findField('smgs.g5').setValue(smgsF.findField('smgs.g5').getValue());
                cimF.findField('smgs.g12').setValue(smgsF.findField('smgs.g12').getValue());
                cimF.findField('smgs.g121').setValue(smgsF.findField('smgs.g121').getValue());
                cimF.findField('smgs.g101').setValue(smgsF.findField('smgs.g101r').getValue());
//                cimF.findField('smgs.g141').setValue(smgsF.findField('smgs.g141').getValue());

                var smgsPlats = smgs.getComponent('g4_panel').getComponent('g4_panel_tab_722');
                if(smgsPlats.items.getCount() > 0){
                    var cimPlats = cim.getComponent('g7_panel').getComponent('g7_panel_tab_722');
                    cimPlats.removeAll();
                    smgsPlats.items.each(function(smgsPlat,ind,len){
                        var cimPlat = cimPlats.addTab();
                        cimPlat.getComponent('dor').setValue(smgsPlat.getComponent('dorR').getValue());
                        cimPlat.getComponent('plat').setValue(smgsPlat.getComponent('platR').getValue());
                        cimPlat.getComponent('prim').setValue(smgsPlat.getComponent('primR').getValue());
                        cimPlat.getComponent('kplat').setValue(smgsPlat.getComponent('kplat').getValue());
                        cimPlat.getComponent('kplat1').setValue(smgsPlat.getComponent('kplat1').getValue());
                    });
                }
                cim.getComponent('g7_panel').setDisplayedField();
                cim.getComponent('g7_panel').copyValues2Buf();

                var smgsDocs = smgs.getComponent('g23_panel').getComponent('g23_panel_tab_9');
                if(smgsDocs.items.getCount() > 0){
                    cim.getComponent('g9_panel').bufData = Ext.clone(smgs.getComponent('g23_panel').bufData);
                    for(var doc in cim.getComponent('g9_panel').bufData['cimSmgsDocses9']){
                        cim.getComponent('g9_panel').bufData['cimSmgsDocses9'][doc]['hid'] = '';
                    }
                    cim.getComponent('g9_panel').copyValues2MainFlds();
                    cim.getComponent('g9_panel').setDisplayedField();
                }

                cimF.findField('smgs.g162').setValue(smgsF.findField('smgs.g162r').getValue());

                var smgsVags = smgs.getComponent('g27v_panel').getComponent('g27v_panel_tab');
                if(smgsVags.items.getCount() > 0){
                    cim.getComponent('g18v_panel').bufData = Ext.clone(smgs.getComponent('g27v_panel').bufData);
                    for(var vag in cim.getComponent('g18v_panel').bufData['cimSmgsCarLists']){
                        cim.getComponent('g18v_panel').bufData['cimSmgsCarLists'][vag]['hid'] = '';
                        for(var kon in cim.getComponent('g18v_panel').bufData['cimSmgsCarLists'][vag]['cimSmgsKonLists']){
                            cim.getComponent('g18v_panel').bufData['cimSmgsCarLists'][vag]['cimSmgsKonLists'][kon]['hid'] = '';
                            for(var gruz in cim.getComponent('g18v_panel').bufData['cimSmgsCarLists'][vag]['cimSmgsKonLists'][kon]['cimSmgsGruzs']){
                                cim.getComponent('g18v_panel').bufData['cimSmgsCarLists'][vag]['cimSmgsKonLists'][kon]['cimSmgsGruzs'][gruz]['hid'] = '';
                            }
                        }
                    }

                    cim.getComponent('g18v_panel').copyValues2MainFlds();
                    cim.getComponent('g18v_panel').setDisplayedField();
                }
                cimF.findField('smgs.g22').setValue(smgsF.findField('smgs.g22').getValue());
                cimF.findField('smgs.g11_prim').setValue(smgsF.findField('smgs.g11_prim').getValue());
                cimF.findField('smgs.g26').setValue(smgsF.findField('smgs.g26').getValue());
                cimF.findField('smgs.g24N').setValue(smgsF.findField('smgs.g24N').getValue());
                cimF.findField('smgs.g24T').setValue(smgsF.findField('smgs.g24T').getValue());
                cimF.findField('smgs.g24B').setValue(smgsF.findField('smgs.g24B').getValue());
                cimF.findField('smgs.g67').setValue(smgsF.findField('smgs.g281').getValue());
                cimF.findField('smgs.g691').setValue(smgsF.findField('smgs.g691').getValue());
                cimF.findField('smgs.g692').setValue(smgsF.findField('smgs.g692').getValue());
                cimF.findField('smgs.g694').setValue(smgsF.findField('smgs.g694').getValue());
            };

        if(smgs.hasListener('activate')){
            Ext.Msg.show({title: 'Невозможно выполнить операцию',msg: "Не загружен СМГС. Необходимо перейти на вкладку СМГС и повторить операцию", buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
        } else if(!packId){
            Ext.Msg.show({title: 'Невозможно выполнить операцию',msg: "Не сформирован пакет документов. Операция доступна лишь в сформированном пакете", buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
        } else{
            smgs2cim();
        }
        /!*
        if(smgs.hasListener('activate') && packId){
             this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');
             Ext.Ajax.request({
                 url: 'Smgs_view1.do',
                 params: {'smgs.packDoc.hid': packId,'smgs.type': 2},
                 scope: this,
                 success: function(response, options) {
                     this.getCenter().getEl().unmask();
                     if(!response.responseText){
                         smgs.dataObj = {};
                     } else {
                         smgs.dataObj = Ext.decode(response.responseText);
                         smgs.initForm('smgs');
                         smgs.un('activate', this.getController('Docs').onActivateForm, this.getController('Docs'));
                         smgs2cim();
                     }

                 },
                 failure: function(response){
                     this.getCenter().getEl().unmask();
                     TK.Utils.makeErrMsg(response, this.errorMsg);
                 }
             });
        } else if(packId) {
            smgs2cim();
        }*!/
    }*/
});