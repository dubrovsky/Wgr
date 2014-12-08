Ext.define('TK.controller.docs.Cmr', {
    extend: 'Ext.app.Controller',

    views: ['cmr.List', 'cmr.Form'],
    stores: ['Cmrs'],
    models: ['Cmr','SmgsPlat','SmgsOtpr'],
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
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);

//        form.getComponent('smgs.g102r').onTriggerClick = Ext.bind(function(){
//            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g102r').getValue()).getComponent(0);
//            nsiGrid.on('itemdblclick', this.selectStaG102r, form);
//        }, this);
//
//        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
//        form.getComponent('smgs.g24N').on('blur', this.getController('Nsi').onG24);
//        form.getComponent('smgs.g24T').on('blur', this.getController('Nsi').onG24);

        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        }, this);
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG5, form);
        }, this);

        /*form.down('detailtabpanel[itemId=g27v_panel_tab]').on(
            'add',
            function(vags, vag, inx){
                if(vags.isXType('detailtabpanel',true) && vag.getComponent('g27k_panel_tab')) {
                    vag.getComponent('g27k_panel_tab').on('add',function(kons, kon, inx){
                        if(kons.isXType('detailtabpanel',true) && kon.getComponent('g27g_panel_tab')) {
                            kon.getComponent('g27g_panel_tab').on('add',function(gruzs, gruz, inx){
                                if(gruzs.isXType('detailtabpanel',true)) {
                                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
                                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectGng, gruz);
                                    }, this);
                                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
                                        var nsiGrid = this.getController('Nsi').nsiEtsng(gruz.getComponent('ekgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectEtsng, gruz);
                                    }, this);
                                }
                            }, this);
                        }
                    }, this);
                }
            },
            this
        );*/

        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG5, form.getComponent('g5_panel'));
            },
            this
        );
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162r').setValue(data.staName);
        this.getComponent('smgs.g691').setValue(data.managno);
        this.getComponent('smgs.g692').setValue(data.staNo);
        view.up('window').close();
    },
    selectStaG102r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent("smgs.g101r").setValue(data.staName);
        this.getComponent("smgs.g_10_3r").setValue(data.mnamerus);
        this.getComponent("smgs.g102r").setValue(data.roadname + " ж.д.");
        this.getComponent("smgs.g12").setValue(data.managno);
        this.getComponent("smgs.g121").setValue(data.staNo);
        view.up('window').close();
    },
    selectStaG7: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('text').setValue(data.staNo.trim());
        this.getComponent('text2').setValue(data.staName.trim());
        view.up('window').close();
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data.naim);
        view.up('window').close();
    },
    selectCountriesG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data.naim);
        view.up('window').close();
    },
    selectOtprG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        view.up('window').close();
    },
    selectOtprG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r_1').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        view.up('window').close();
    },
    onChangeData:function(btn){
    	var panel, tabpanels;
    	if(btn.itemId.indexOf('g27') == -1){
    	  	panel = this.getComponent(btn.itemId + 'panel');
    	}
    	else {
    		panel = this.getComponent('g27v_panel');
//    		panel.onChangeData(btn);
            panel.mode = btn.itemId;
	        panel.changeCmpVisibility(btn.itemId);
    	}

        tabpanels = panel.query('detailtabpanel');
        for(var i = 0; i < tabpanels.length; i++){
            if(tabpanels[i].items.getCount() == 0){
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
    	this.maskPanel(true);
    }

});