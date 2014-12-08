Ext.define('TK.controller.docs.Slovnakl', {
    extend: 'Ext.app.Controller',

    views: ['slovnakl.List', 'slovnakl.Form'],
    stores: ['Slovnakls'],
    models: ['Slovnakl'],
    refs: [
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function (item) {
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
                nsiGrid.on('itemdblclick', this.selectOtprG5, form.getComponent('g5_panel'));
            },
            this
        );
        form.down('triggerfield[name=smgs.g46_1]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46_1]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG5, form);
        }, this);
        form.getComponent('smgs.g101').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG101, form);
        }, this);
        form.down('detailtabpanel[itemId=g14_panel_tab_722]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('plat').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('plat').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectPlatG14, tab);
                    }, this);
                }
            },
            this
        );
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g11_prim').on('change', this.onPrimChange);
        form.getComponent('smgs.g23').on('change', this.onNhmChange);
    },
    onChangeData:function(btn){
        var panel, tabpanels;
        if(btn.itemId.indexOf('g11') == -1){
            panel = this.getComponent(btn.itemId + 'panel');
            tabpanels = panel.query('detailtabpanel');
            for(var i = 0; i < tabpanels.length; i++){
                if(tabpanels[i].items.getCount() == 0){
                    tabpanels[i].onAddTab();
                }
            }
        }
        else {
            panel = this.getComponent('g11_panel');
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
    selectOtprG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g4').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g46_1').setValue(data['g16r']);
        this.getComponent('smgs.g48_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g49').setValue(data['g19r']);
        view.up('window').close();
    },
    selectCountriesG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_4_5k').setValue(data['abc2']);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g46_1').setValue(data['naim']);
        view.up('window').close();
    },
    selectStaG101: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g101').setValue(data['staName']);
        this.getComponent('smgs.g121').setValue(data['staNo']);
        view.up('window').close();
    },
    selectPlatG14:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('plat').setValue(data['platR']);
        this.getComponent('prim').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
        view.up('window').close();
    },
    onPrimChange: function(field){
        field.ownerCt.getComponent('g11_panel').setDisplayedField();
    },
    onNhmChange: function(field){
        field.ownerCt.getComponent('g11_panel').setDisplayedField();
    }
});
