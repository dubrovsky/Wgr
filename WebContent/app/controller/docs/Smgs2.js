/**
 * контроллер формы Smgs2
 */
Ext.define('TK.controller.docs.Smgs2', {
    extend: 'Ext.app.Controller',

    views: [
        'smgs2.Smgs2List',
        'smgs2.Smgs2Form',
        'smgs2.Smgs2VgCtGrTreeFormWin',
        'smgs2.Smgs2Docs9TreeFormWin',
        'smgs2.Smgs2PlombsTreeFormWin'
    ],
    stores: ['Smgses'],
    models: [
        'Smgs',
        'SmgsPlat',
        'SmgsOtpr',
        'SmgsPlomb'
    ],
    refs: [{
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'smgslist',
        selector: 'viewport > tabpanel > smgs2list'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > smgs2'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > smgs2 > field[name="disp.g7v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > smgs2 > field[name="disp.g7k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > smgs2 > field[name="disp.g7g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > smgs2 > field[name="disp.g24"]'
    }],
    init: function() {
        this.control({
            /*'smgs2list': {
                select: this.onRowclick
            },*/
            /*'smgs2 > detailpanel#g7v_panel': {
                saveDetailPanelClick: this.onSaveVagonDetailPanelClick
            },*/
            'smgs2 button[action=changeVgCtGr]': {
                click: this.onSmgs2VgCtGrWinShow
            },
            'smgs2 button[action=changeDocs9]': {
                click: this.onCimDocs9WinShow
            },
            'smgs2 button[action=changePlombs]': {
                click: this.onCimPlombsWinShow
            },
            'smgs2 > detailpanel#g22_panel': {
                saveDetailPanelClick: this.onSavePerevozDetailPanelClick
            },
            'smgs2': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            },
            'smgs2list': {
                celldblclick: this.onCellDblClick
            }
        });
    },

    initEvents: function(form){

        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);

        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);

        // нажатие кнопки выбора отправителя
        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                // было 'Nsi'
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=poluch]').on(
            'click',
            function(btn){

                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );
        // нажатие кнопки выбора страны отправителя
        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        }, this);
        // нажатие кнопки выбора страны получателя
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
        }, this);

        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        form.getComponent('smgs.g101r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG101r, form);
        }, this);

        form.down('detailtabpanel[itemId=g6_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('text').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('text').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectStaG6, tab);
                    }, this);
                }
            },
            this
        );

        form.down('detailtabpanel[itemId=g22_panel_tab]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('stBeg').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('stBeg').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectStaG22StBeg, tab);
                    }, this);
                    tab.getComponent('stEnd').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('stEnd').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectStaG22StEnd, tab);
                    }, this);
                    tab.getComponent('namPer').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiCarrier(/*tab.getComponent('namPer').getValue()*/).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectCarrier, tab);
                    }, this);
                }
            },
            this
        );

        form.down('detailtabpanel[itemId=g23_panel_tab]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('platR').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('platR').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectPlatG4, tab);
                    }, this);
                }
            },
            this
        );

        /*form.down('detailtabpanel[itemId=g24_panel_tab_9]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('ncas').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectDocG23, tab);
                    }, this);
                }
            },
            this
        );
*/
        /*form.down('detailtabpanel[itemId=g7v_panel_tab]').on(
            'add',
            function(vags, vag, inx){
                if(vags.isXType('detailtabpanel',true) && vag.getComponent('g7k_panel_tab')) {
                    vag.getComponent('g7k_panel_tab').on('add',function(kons, kon, inx){
                        if(kons.isXType('detailtabpanel',true) && kon.getComponent('g7g_panel_tab')) {
                            //kon.getComponent('taraKont').on('change', this.onTaraKontChange);

                            kon.getComponent('g7g_panel_tab').on('add',function(gruzs, gruz, inx){
                                if(gruzs.isXType('detailtabpanel',true)) {
                                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
                                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.selectGng, gruz);
                                    }, this);
                                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
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

        Ext.each(form.query('textfield'), function(item, index) {
            item.on('focus', Ext.bind(this.onDivBlur, form));
        }, this);
        /*form.getComponent('disp.g7g').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g7g'));
                },
                scope:this
            }
        });
        form.getComponent('disp.g7v').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g7v'));
                },
                scope:this
            }
        });*/
    },
    /*onSaveVagonDetailPanelClick: function(vagonPanel){
        var vagPanelTab = vagonPanel.getComponent('g7v_panel_tab'),
            tara = 0,
            netto = 0;
        vagPanelTab.items.each(function (vagTab, ind, length) {

            var kontPanelTab = vagTab.getComponent('g7k_panel_tab');
            kontPanelTab.items.each(function (kontTab, ind, length) {
                var val = parseFloat(kontTab.getComponent('taraKont').getValue());
                if (!isNaN(val)){
                    tara += val;
                }

                var gruzPanelTab = kontTab.getComponent('g7g_panel_tab');
                gruzPanelTab.items.each(function (gruzTab, ind, length) {
                    var val = parseFloat(gruzTab.getComponent('massa').getValue());
                    if (!isNaN(val)){
                        netto += val;
                    }
                });
            });
        });

        var g24T = vagonPanel.ownerCt.down('numberfield[name=smgs.g24T]');
        g24T.setValue(tara);

        var g24N = vagonPanel.ownerCt.down('hiddenfield[name=smgs.g24N]');
        g24N.setValue(netto);

        var g24B = vagonPanel.ownerCt.down('numberfield[name=smgs.g24B]');
        g24B.setValue(parseFloat(netto + tara));
    },*/
    onSavePerevozDetailPanelClick: function(perevozPanel){
        var vagPanelTab = perevozPanel.getComponent('g22_panel_tab'),
            perevozchik = perevozPanel.up('smgs2').down('displayfield[itemId="smgs.perevozchik"]');

        perevozchik.setValue('');
        vagPanelTab.items.each(function (perevozTab, ind, length) {
            perevozchik.setValue(perevozTab.getComponent('namPer').getValue());
            return false;
        });
    },
    /*onTaraKontChange: function(field, newValue, oldValue){
        var val = parseFloat(newValue);
        if (isNaN(val)){
            return;
        }
        var g24T = field.up('smgs2').down('numberfield[name=smgs.g24T]');
        g24T.setValue(val);
    },*/
    onDivBlur: function(){
        var comp = this.getComponent('disp.g7g');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
        comp = this.getComponent('disp.g7v');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
    },
    onChangeData:function(btn){
        var panel, tabpanels;
        if(btn.itemId.indexOf('g7') == -1){
            panel = this.getComponent(btn.itemId + 'panel');
        }
        // установка кода отправителя
        if(btn.itemId.indexOf('g1') != -1){
            var value=this.getComponent('smgs.g2_').getValue();
            this.getComponent('g1_panel').getComponent('smgs.g2_E').setValue(value);
        }
        // установка кода получателя
        if(btn.itemId.indexOf('g4') != -1){
            var value=this.getComponent('smgs.g5_').getValue();
            this.getComponent('g4_panel').getComponent('smgs.g5_E').setValue(value);
        }
        /*else {
            panel = this.getComponent('g7v_panel');
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);
        }*/

        tabpanels = panel.query('detailtabpanel');
        for(var i = 0; i < tabpanels.length; i++){
            if(tabpanels[i].items.getCount() == 0){
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    },
    // занечение значений выбранного отправителя в форму
    selectOtprG1: function(view, record, item, index) {
        var data = record.data;
        // наименование отправителя рус
        this.getComponent('naim').getComponent('smgs.g1r').setValue(data['g1r']);
        // код страны отправителя
        this.getComponent('strn').getComponent('smgs.g15_1').setValue(data['g_1_5k']);
        //страна отправителя рус
        this.getComponent('strn').getComponent('smgs.g16r').setValue(data['g16r']);
        // город отправителя рус
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        //адрес отправителя рус
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        //индекс отправителя
        this.getComponent('smgs.g17_1').setValue(data['g17_1']);
        //доп. инфо отправителя
        this.getComponent('smgs.g1_dop_info').setValue(data['dop_info']);
        // код отправителя
        this.getComponent('smgs.g2_E').setValue(data['g2']);
        // код ОКПО отправителя
        this.getComponent('code_p1').getComponent('smgs.g2').setValue(data['g3']);
        // код ИНН отправителя
        this.getComponent('code_p1').getComponent('smgs.g_2inn').setValue(data['g_2inn']);
        view.up('window').close();
        //this.getComponent('smgs.g2_1').setValue(data['g2']);
    },
    // занечение значений выбранного получателя в форму
    selectOtprG4: function(view, record, item, index) {
        var data = record.data;
        // наименование получателя рус
        this.getComponent('naim').getComponent('smgs.g1r_1').setValue(data['g1r']);
        // код страны получателя
        this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['g_1_5k']);
        //страна получателя рус
        this.getComponent('strn').getComponent('smgs.g16r_1').setValue(data['g16r']);
        // город получателя рус
        this.getComponent('smgs.g18r_1_1').setValue(data['g18r_1']);
        //адрес получателя рус
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        //индекс получателя
        this.getComponent('smgs.g47_1').setValue(data['g17_1']);
        // код получателя
        this.getComponent('smgs.g5_E').setValue(data['g2']);
        // код ОКПО получателя
        this.getComponent('code_p5').getComponent('smgs.g5').setValue(data['g3']);
        // код ИНН получателя
        this.getComponent('code_p5').getComponent('smgs.g_5inn').setValue(data['g_2inn']);
        //доп. инфо получателя
        this.getComponent('smgs.g4_dop_info').setValue(data['dop_info']);
        view.up('window').close();
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g15_1').setValue(data['abc2']);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data['krnaim']);
        view.up('window').close();
    },
    selectCountriesG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g4_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['abc2']);
        this.getComponent('g4_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data['krnaim']);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162r').setValue(data['staName']);
        this.getComponent('smgs.g163r').setValue(data['mnamerus']);
        this.getComponent('smgs.g171').setValue(data['managno']);
        this.getComponent('smgs.g17').setValue(data['staNo']);
        /*this.getComponent('smgs.g691').setValue(data['managno']);
        if(this.getComponent('smgs.g171')){
            this.getComponent('smgs.g171').setValue(data['managno']);
        }
        if(this.getComponent('smgs.g17')){
            this.getComponent('smgs.g17').setValue(data['staNo']);
        }*/
        // this.getComponent('smgs.g692').setValue(data['staNo']);
        view.up('window').close();
    },
    selectStaG101r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent("smgs.g101r").setValue(data['staName']);
        //this.getComponent("smgs.g_10_3r").setValue(data['mnamerus']);
        this.getComponent("smgs.g102r").setValue(data['mnamerus']);
        //this.getComponent("smgs.g12").setValue(data['managno']);
        this.getComponent("smgs.g121").setValue(data['staNo']);
        this.getComponent("smgs.g12").setValue(data['managno']);
        view.up('window').close();
    },
    selectStaG6: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('text').setValue(data.staNo);
        this.getComponent('text2').setValue(data.staName);
        this.getComponent('road_s_name_r').setValue(data.mnamerus);
        view.up('window').close();
    },
    selectStaG22StBeg: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('codStBeg').setValue(data.staNo);
        this.getComponent('stBeg').setValue(data.staName);
        this.getComponent('namPer').setValue(data.mnamerus);
        view.up('window').close();
    },
    selectStaG22StEnd: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('codStEnd').setValue(data.staNo);
        this.getComponent('stEnd').setValue(data.staName);
        view.up('window').close();
    },
    selectCarrier: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('namPer').setValue(data.carrNameShort + ' ' + data.carrNo);
        view.up('window').close();
    },
    /*selectGng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('kgvn').setValue(data['code']);
        this.getComponent('nzgr').setValue(data['name']);
        //this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },
    selectEtsng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ekgvn').setValue(data.code);
        this.getComponent('enzgr').setValue(data.name);
        //this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },*/
    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },
    onSmgs2VgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'smgs2VgCtGrTreeformWin', btn.up('docsform'));
    },
    onCimDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'smgs2Docs9TreeformWin', btn.up('docsform'));
    },
    onCimPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'smgs2PlombsTreeformWin', btn.up('docsform'));
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
    },

    onCellDblClick: function(view, td, cIndex, record){
        var center = this.getCenter(),
            grid, gridParams = {},
            dataIndex = view.getGridColumns()[cIndex].dataIndex;
        if (dataIndex === 'vagVedNum') {
            var value = record.get(dataIndex);
            if (value !== '') {
                grid = {xtype:'vedlist'};
                gridParams = {'search.type':11, 'search.hid':value, 'task':'list'};
                center.remove(center.getComponent(0));
                center.add(grid);
                grid = center.setActiveTab(0) || center.getComponent(0);
                Ext.apply(grid.getStore().getProxy().extraParams, gridParams);
                grid.getStore().reload();
            }
        }
    }

    /*,
    onRowclick: function(rowModel, model, index){
        this.getCenter().suspendLayouts();
        var grid = Ext.ComponentQuery.query('docslist')[0];
        grid.fireEvent("smgsListStatusChanged", grid);

        var toolbar = this.getSmgslist().getDockedComponent('top').getComponent('signature'),
            signatureData,
            checkSignBtn;
        if(toolbar){
            signatureData = this.getSmgslist().selModel.getLastSelected().data['sign'];
            checkSignBtn = toolbar.menu.getComponent('check');

            switch(signatureData){
                case 0:
                    checkSignBtn.disable();
                    break;
                default:
                    checkSignBtn.enable();
                    break;
            }
        }
        this.getCenter().resumeLayouts();
    }*/
});