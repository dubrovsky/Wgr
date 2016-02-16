Ext.define('TK.controller.docs.Aviso2', {
    extend: 'Ext.app.Controller',
    views: [
        'aviso2.List',
        'aviso2.Form'
    ],
    stores: ['Avisos2'],
    models: ['Aviso2', 'SmgsKon2'],
    refs: [
        {
            ref: 'list',
            selector: 'viewport > tabpanel > aviso2list'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > aviso2list': {
                select: this.onRowclick
            },
            'aviso2 > detailpanel#g22_panel': {
                saveDetailPanelClick: this.onSavePerevozDetailPanelClick
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
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );

        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs2').selectCountriesG1, form);
        }, this);
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
        form.getComponent('disp.g15g').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g15g'));
                },
                scope:this
            }
        });

        form.down('detailtabpanel[itemId=g15g_panel_tab]').on(
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
        );
    },

    onDivBlur: function(){
        var comp = this.getComponent('disp.g15g');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
    },
    onChangeData:function(btn){
        var panel, tabpanels;
//    	if(btn.itemId.indexOf('g27') == -1){
        panel = this.getComponent(btn.itemId + 'panel');
//    	}
        /*else {
         panel = this.getComponent('g27v_panel');
         //    		panel.onChangeData(btn);
         panel.mode = btn.itemId;
         panel.arrangeVags(panel.mode); // allow to enter gruz only in first vag and kont
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
//            ready = data.ready,
            status = data.status;
        if(bar.getComponent('aviso2smgs')){
            if(status && status == '4'){
                bar.getComponent('aviso2smgs').enable();
            } else {
                bar.getComponent('aviso2smgs').disable();
            }
        }
        if(bar.getComponent('aviso2smgsAppend')){
            if(status && status == '4'){
                bar.getComponent('aviso2smgsAppend').enable();
            } else {
                bar.getComponent('aviso2smgsAppend').disable();
            }
        }
        if(bar.getComponent('export2Excel')){
            if(status && (status == '4' || status == '7')){
                bar.getComponent('export2Excel').enable();
            } else {
                bar.getComponent('export2Excel').disable();
            }
        }
        if(bar.getComponent('del')){
            if(status && status == '7'){
                bar.getComponent('del').disable();
            } else {
                bar.getComponent('del').enable();
            }
        }

    },
    onSavePerevozDetailPanelClick: function(perevozPanel){
        var vagPanelTab = perevozPanel.getComponent('g22_panel_tab'),
            perevozchik = perevozPanel.up('aviso2').down('displayfield[itemId="smgs.perevozchik"]');

        perevozchik.setValue('');
        vagPanelTab.items.each(function (perevozTab, ind, length) {
            perevozchik.setValue(perevozTab.getComponent('namPer').getValue());
            return false;
        });
    }
});