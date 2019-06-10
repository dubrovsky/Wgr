/**
 * контроллер шаблона формы Smgs2
 */
Ext.define('TK.controller.docs.Aviso2', {
    extend: 'Ext.app.Controller',
    views: [
        'aviso2.AvisoSmgs2List',
        'aviso2.AvisoSmgs2Form',
        'aviso2.AvisoSmgs2VgCtGrTreeFormWin',
        'aviso2.AvisoSmgs2Docs9TreeFormWin',
        'aviso2.AvisoSmgs2PlombsTreeFormWin'
    ],
    stores: ['Avisos2'],
    models: [
        'Aviso2',
        'SmgsKon2'
    ],
    refs: [{
        ref: 'list',
        selector: 'viewport > tabpanel > aviso2list'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > aviso2'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > aviso2 > field[name="disp.g7v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > aviso2 > field[name="disp.g7k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > aviso2 > field[name="disp.g7g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > aviso2 > field[name="disp.g24"]'
    }],
    init: function() {
        this.control({
            'aviso2list':{
                select: this.onRowclick
            },
            'aviso2 button[action=changeVgCtGr]': {
                click: this.onSmgs2VgCtGrWinShow
            },
            'aviso2 button[action=changeDocs9]': {
                click: this.onCimDocs9WinShow
            },
            'aviso2 button[action=changePlombs]': {
                click: this.onCimPlombsWinShow
            },
            'aviso2 > detailpanel#g22_panel': {
                saveDetailPanelClick: this.onSavePerevozDetailPanelClick
            },
            'aviso2': {
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

        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);

        // нажатие кнопки выбора отправителя
        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );
        // нажатие кнопки выбора страны отправителя
        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectCountriesG1, form);
        }, this);
        // нажатие кнопки выбора страны получателя
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectCountriesG4, form);
        }, this);

        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectStaG162, form);
        }, this);
        form.getComponent('smgs.g101r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectStaG101r, form);
        }, this);

        form.down('detailtabpanel[itemId=g6_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('text').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('text').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectStaG6, tab);
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
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectStaG22StBeg, tab);
                    }, this);
                    tab.getComponent('stEnd').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('stEnd').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectStaG22StEnd, tab);
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

        Ext.each(form.query('textfield'), function(item, index) {
            item.on('focus', Ext.bind(this.onDivBlur, form));
        }, this);

       /* Ext.each(form.query('textfield'), function(item, index) {
            item.on('focus', Ext.bind(this.onDivBlur, form));
        }, this);*/
        /*form.getComponent('disp.g15g').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g15g'));
                },
                scope:this
            }
        });*/

        /*form.down('detailtabpanel[itemId=g15g_panel_tab]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiGng(tab.getComponent('kgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectGng, tab);
                    }, this);
                    tab.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiEtsng(tab.getComponent('ekgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectEtsng, tab);
                    }, this);
                }
            },
            this
        );*/
    },

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
    onRowclick: function(rowModel, record, index){
        var bar = this.getList().getDockedComponent('top'),
            data = this.getList().selModel.getLastSelected().data,
            status = data.status;

        this.getCenter().suspendLayouts();

        if(bar.getComponent('aviso2smgs')){
            if(status === '' || status === '4'){
                bar.getComponent('aviso2smgs').enable();
            } else {
                bar.getComponent('aviso2smgs').disable();
            }
        }
        if(bar.getComponent('aviso2smgsAppend')){
            if(status === '' || status === '4'){
                bar.getComponent('aviso2smgsAppend').enable();
            } else {
                bar.getComponent('aviso2smgsAppend').disable();
            }
        }
        if(bar.getComponent('export2Excel')){
            if(status === '' || status === '4' || status === '7'){
                bar.getComponent('export2Excel').enable();
            } else {
                bar.getComponent('export2Excel').disable();
            }
        }
        if(bar.getComponent('del')){
            if(status === '7'){
                bar.getComponent('del').disable();
            } else {
                bar.getComponent('del').enable();
            }
        }

        this.getCenter().resumeLayouts();
    },
    onSavePerevozDetailPanelClick: function(perevozPanel){
        var vagPanelTab = perevozPanel.getComponent('g22_panel_tab'),
            perevozchik = perevozPanel.up('aviso2').down('displayfield[itemId="smgs.perevozchik"]');

        perevozchik.setValue('');
        vagPanelTab.items.each(function (perevozTab, ind, length) {
            perevozchik.setValue(perevozTab.getComponent('namPer').getValue());
            return false;
        });
    },
    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },
    onSmgs2VgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'avisosmgs2VgCtGrTreeformWin', btn.up('docsform'));
    },
    onCimDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'avisosmgs2Docs9TreeformWin', btn.up('docsform'));
    },
    onCimPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'avisosmgs2PlombsTreeformWin', btn.up('docsform'));
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
});