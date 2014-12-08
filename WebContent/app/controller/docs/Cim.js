Ext.define('TK.controller.docs.Cim', {
    extend: 'Ext.app.Controller',

    views: ['cim.List', 'cim.Form'],
    stores: ['Cims'],
    models: ['Cim'],
    refs: [
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'list',
            selector: 'viewport > tabpanel > cimlist'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > docsform button[action="smgs2Cim"]': {
                click: this.onSmgs2Cim
            }
        });
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        form.down('triggerfield[name=smgs.g16_1]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16_1]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        }, this);
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g4]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );
        form.down('triggerfield[name=smgs.g46_1]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46_1]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
        }, this);
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
        form.down('detailtabpanel[itemId=g9_panel_tab_9]').on(
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
        );
        form.getComponent('smgs.g101').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101').getValue()).getComponent(0);
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
        form.getComponent('smgs.g162').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        form.down('detailtabpanel[itemId=g18v_panel_tab]').on(
            'add',
            function(vags, vag, inx){
                if(vags.isXType('detailtabpanel',true) && vag.getComponent('g18k_panel_tab')) {
                    vag.getComponent('g18k_panel_tab').on('add',function(kons, kon, inx){
                        if(kons.isXType('detailtabpanel',true) && kon.getComponent('fcNetto')) {
                            kon.getComponent('fcNetto').getComponent('netto').on('change', this.onNetto);
                            kon.getComponent('fcTara').getComponent('tara').on('change', this.onTara);
                            kon.getComponent('fcBrutto').getComponent('brutto').on('change', this.onBrutto);
//                            kon.getComponent('g27g_panel_tab').on('add',function(gruzs, gruz, inx){
//                                if(gruzs.isXType('detailtabpanel',true)) {
//                                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
//                                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
//                                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectGng, gruz);
//                                    }, this);
//                                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
//                                        var nsiGrid = this.getController('Nsi').nsiEtsng(gruz.getComponent('ekgvn').getValue()).getComponent(0);
//                                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectEtsng, gruz);
//                                    }, this);
//                                }
//                            }, this);
                        }
                    }, this);
                }
            },
            this
        );
//        form.getComponent('g18v_panel').child('radiogroup').on('change',this.changeVidOtpravki,this);
//        form.getComponent('g18v_panel').on(
//            'show',
//            function(){
//                var vidKontOtpr = form.getComponent('g18v_panel').child('radiogroup');
//                vidKontOtpr.fireEvent('change',vidKontOtpr,{'smgs.vidKontOtpr':vidKontOtpr.getValue()['smgs.vidKontOtpr']});
//            },
//            this
//        );
//        form.getComponent('smgs.g24B').on('change', this.onG24B);
        form.getComponent('smgs.g24N').on('change', this.onG24);
        form.getComponent('smgs.g24T').on('change', this.onG24);
    },
    onNetto:function(newVal, oldVal){
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
    },
    onTara:function(newVal, oldVal){
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
    },
    onBrutto:function(newVal, oldVal){
        var prefix = this.ownerCt.getComponent('bruttoPref').getValue(),
            konts = this.up('detailtabpanel'),
            itogo = 0;

        konts.items.each(function(kon){
            itogo += kon.getComponent('fcBrutto').getComponent('brutto').getValue() ? kon.getComponent('fcBrutto').getComponent('brutto').getValue() : 0;
        });
        this.up('form').getComponent('smgs.g24B').setValue(itogo ? itogo : '');
//        this.up('form').getComponent('bruttoDisp').setValue(itogo ? prefix+itogo : '');
    },
    onG24:function(){
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
    },
    onChangeData:function(btn, ev){
        var panel, tabpanels;
        if(btn.itemId.indexOf('g18') == -1){
            panel = this.getComponent(btn.itemId + 'panel');
            tabpanels = panel.query('detailtabpanel');
            for(var i = 0; i < tabpanels.length; i++){
                if(tabpanels[i].items.getCount() == 0){  // add tab by default if noone exists
                    tabpanels[i].onAddTab();
                }
            }
        }
        else {
            panel = this.getComponent('g18v_panel');    // dont add tabs by default
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);

        }
        panel.show();
        this.maskPanel(true);
    },
    selectOtprG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16_1').setValue(data['g16r']);
        this.getComponent('smgs.g18_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19_1').setValue(data['g19r']);
        view.up('window').close();
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['abc2']);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16_1').setValue(data['naim']);
        view.up('window').close();
    },
    selectOtprG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g4').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g46_1').setValue(data['g16r']);
        this.getComponent('smgs.g48_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g49').setValue(data['g19r']);
        view.up('window').close();
    },
    selectCountriesG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g4_panel').getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['abc2']);
        this.getComponent('g4_panel').getComponent('strn').getComponent('smgs.g46_1').setValue(data['naim']);
        view.up('window').close();
    },
    selectDocG9: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data.nsiFNn);
        this.getComponent('ncas').setValue(data.nsiFNcas);
        this.getComponent('text').setValue(data.nsiFDesc);
        this.getComponent('text2').setValue(data.nsiFDsc3);
        view.up('window').close();
    },
    selectStaG102r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent("smgs.g101").setValue(data.staName);
//        this.getComponent("smgs.g_10_3r").setValue(data.mnamerus);
        this.getComponent("smgs.g104").setValue(data.countryname);
        this.getComponent("smgs.g12").setValue(data.managno);
        this.getComponent("smgs.g121").setValue(data.staNo);
        view.up('window').close();
    },
    selectDoc: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162').setValue(data.staName);
        this.getComponent("smgs.g164").setValue(data.countryname);
        this.getComponent('smgs.g17').setValue(data.staNo);
        this.getComponent('smgs.g171').setValue(data.managno);

        view.up('window').close();
    },
//    changeVidOtpravki:function(field, newValue){
//        if(!Ext.isArray(newValue['smgs.vidKontOtpr'])){
//            var ownerCt = field.ownerCt, vag, kont, gruzy;
//            vag = ownerCt.getComponent('g18v_panel_tab').getComponent(0);
//            if(vag){
//                switch (newValue['smgs.vidKontOtpr']) {
//                    case 1:
//                        ownerCt.getComponent('platform').show();
//                        ownerCt.getComponent('docNum').show();
//                        vag.getComponent('nvag').show();
//                        vag.getComponent('prim').hide();
//                        vag.getComponent('count').hide();
//                        if((kont = vag.getComponent('g18k_panel_tab').getComponent(0))){
//                            kont.getComponent('utiN').show();
//                            kont.getComponent('kat').show();
//                            kont.getComponent('privat').show();
//                            kont.getComponent('count').hide();
////                            if(ownerCt.mode == 'g18g_'){
////                                gruzy = kont.getComponent('g18g_panel_tab');
////                                gruzy.show();
////                                kont.getComponent('g18g_label').show();
////                            }
//                        }
//                        ownerCt.ownerCt.getComponent('g18g_').show();
//                        break;
//                    case 2:
//                        ownerCt.getComponent('platform').show();
//                        ownerCt.getComponent('docNum').show();
//                        vag.getComponent('nvag').show();
//                        vag.getComponent('prim').hide();
//                        vag.getComponent('count').hide();
//                        if((kont = vag.getComponent('g18k_panel_tab').getComponent(0))){
//                            kont.getComponent('utiN').show();
//                            kont.getComponent('kat').show();
//                            kont.getComponent('privat').show();
//                            kont.getComponent('count').hide();
////                            if(ownerCt.mode == 'g18g_'){
////                                gruzy = kont.getComponent('g18g_panel_tab');
////                                gruzy.hide();
////                                kont.getComponent('g18g_label').hide();
////                            }
//                        }
//                        ownerCt.ownerCt.getComponent('g18g_').hide();
//                        break;
//                    case 3:
//                        ownerCt.getComponent('platform').hide();
//                        ownerCt.getComponent('docNum').hide();
//                        vag.getComponent('nvag').hide();
//                        vag.getComponent('prim').show();
//                        vag.getComponent('count').show();
//                        if((kont = vag.getComponent('g18k_panel_tab').getComponent(0))){
//                            kont.getComponent('utiN').hide();
//                            kont.getComponent('kat').hide();
//                            kont.getComponent('privat').hide();
//                            kont.getComponent('count').show();
////                            if(ownerCt.mode == 'g18g_'){
////                                gruzy = kont.getComponent('g18g_panel_tab');
////                                gruzy.show();
////                                kont.getComponent('g18g_label').show();
////                            }
//                        }
//                        ownerCt.ownerCt.getComponent('g18g_').show();
//                        break;
//                    case 4:
//                        ownerCt.getComponent('platform').hide();
//                        ownerCt.getComponent('docNum').hide();
//                        vag.getComponent('nvag').hide();
//                        vag.getComponent('prim').show();
//                        vag.getComponent('count').show();
//                        if((kont = vag.getComponent('g18k_panel_tab').getComponent(0))){
//                            kont.getComponent('utiN').hide();
//                            kont.getComponent('kat').hide();
//                            kont.getComponent('privat').hide();
//                            kont.getComponent('count').show();
////                            if(ownerCt.mode == 'g18g_'){
////                                gruzy = kont.getComponent('g18g_panel_tab');
////                                gruzy.hide();
////                                kont.getComponent('g18g_label').hide();
////                            }
//                        }
//                        ownerCt.ownerCt.getComponent('g18g_').hide();
//                        break;
//                }
//            }
//        }
//    },
    selectPlatG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('dor').setValue(data['dorR']);
        this.getComponent('plat').setValue(data['platR']);
        this.getComponent('prim').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
        if(this.getComponent('kplat2')) {
            this.getComponent('kplat2').setValue(data['kplat2']);
        }
        view.up('window').close();
    },
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
        /*
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
        }*/
    }
});