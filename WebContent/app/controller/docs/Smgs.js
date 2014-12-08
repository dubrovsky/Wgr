Ext.define('TK.controller.docs.Smgs', {
    extend: 'Ext.app.Controller',
   /* mixins: [
//        'TK.controller.exchange.ListStatus',
        'TK.controller.exchange.LockChecker'
    ],*/

    views: ['smgs.List', 'smgs.Form'],
    stores: ['Smgses'],
    models: ['Smgs','SmgsPlat','SmgsOtpr','SmgsPlomb'],
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
            selector: 'viewport > tabpanel > smgslist'
        }
    ],
    init: function() {
        this.control({
            'smgslist': {
                select: this.onRowclick
            }
        });
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);

        form.down('button[action=copyEpd]').on('click',this.onCopyEpd,this);
        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        form.getComponent('smgs.g102r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g102r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG102r, form);
        }, this);
        form.down('detailtabpanel[itemId=g7_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('text').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('text').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectStaG7, tab);
                    }, this);
                }
            },
            this
        );

        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g691').on('change', function(g691){
            form.getComponent('smgs.g171').setValue(g691.getValue());
        });
        form.getComponent('smgs.g692').on('change', function(g692){
            form.getComponent('smgs.g17').setValue(g692.getValue());
        });

        Ext.each(form.query('textfield'), function(item, index) {
            item.on('focus', Ext.bind(this.onDivBlur, form));
        }, this);
        form.getComponent('disp.g27g').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g27g'));
                },
                scope:this
            }
        });
        form.getComponent('disp.g27v').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.g27v'));
                },
                scope:this
            }
        });

        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        }, this);
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG5, form);
        }, this);

        form.down('detailtabpanel[itemId=g27v_panel_tab]').on(
            'add',
            function(vags, vag, inx){
                if(vags.isXType('detailtabpanel',true) && vag.getComponent('g27k_panel_tab')) {
                    vag.getComponent('g27k_panel_tab').on('add',function(kons, kon, inx){
                        if(kons.isXType('detailtabpanel',true) && kon.getComponent('g27g_panel_tab')) {
                            kon.getComponent('g27g_panel_tab').on('add',function(gruzs, gruz, inx){
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
        );

        form.down('detailtabpanel[itemId=g23_panel_tab_9]').on(
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

        form.down('detailtabpanel[itemId=g4_panel_tab_722]').on(
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
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162r').setValue(data['staName']);
        this.getComponent('smgs.g691').setValue(data['managno']);
        if(this.getComponent('smgs.g171')){
            this.getComponent('smgs.g171').setValue(data['managno']);
        }
        if(this.getComponent('smgs.g17')){
            this.getComponent('smgs.g17').setValue(data['staNo']);
        }
        this.getComponent('smgs.g692').setValue(data['staNo']);
        view.up('window').close();
    },
    selectStaG102r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent("smgs.g101r").setValue(data['staName']);
        this.getComponent("smgs.g_10_3r").setValue(data['mnamerus']);
        this.getComponent("smgs.g102r").setValue(data['roadname'] + " ж.д.");
        this.getComponent("smgs.g12").setValue(data['managno']);
        this.getComponent("smgs.g121").setValue(data['staNo']);
        view.up('window').close();
    },
    selectStaG7: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('text').setValue(data.staNo);
        this.getComponent('text2').setValue(data.staName);
        view.up('window').close();
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g15_1').setValue(data['abc2']);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data['naim']);
        view.up('window').close();
    },
    selectCountriesG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['abc2']);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data['naim']);
        view.up('window').close();
    },
  /*  selectDocG23: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('ncas').setValue(data['nsiFNcas']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        this.getComponent('text2').setValue(data['nsiFDsc3']);
        view.up('window').close();
    },*/
    selectOtprG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g15_1').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        this.getComponent('smgs.g2_1').setValue(data['g2']);
        this.getComponent('code_p1').getComponent('smgs.g2').setValue(data['g3']);
        this.getComponent('code_p1').getComponent('smgs.g_2inn').setValue(data['g_2inn']);
        view.up('window').close();
    },
    selectOtprG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r_1').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        this.getComponent('smgs.g5_1').setValue(data['g2']);
        this.getComponent('code_p5').getComponent('smgs.g5').setValue(data['g3']);
        this.getComponent('code_p5').getComponent('smgs.g_5inn').setValue(data['g_2inn']);
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
    },
    onCopyEpd: function(btn){
        var epd = this.getCenter().child('epd'),
            smgs,
            smgsForm,
            epdForm;

        if(epd && epd.hasListener('activate')) {
            Ext.MessageBox.show({
                title: this.titleEpd,
                msg: this.msgEpd,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
        else if(epd){
            epdForm = epd.getForm();
            smgs = btn.up('smgs');
            smgsForm = smgs.getForm();
            smgsForm.findField('smgs.g1r').setValue(epdForm.findField('smgs.g1r').getValue());
            smgsForm.findField('smgs.g19r').setValue(epdForm.findField('smgs.g19r').getValue());
            smgs.getComponent('g1_panel').setDisplayedField();
            smgs.getComponent('g1_panel').copyValues2Buf();
            smgsForm.findField('smgs.g4r').setValue(epdForm.findField('smgs.g4r').getValue());
            smgsForm.findField('smgs.g49r').setValue(epdForm.findField('smgs.g49r').getValue());
            smgs.getComponent('g5_panel').setDisplayedField();
            smgs.getComponent('g5_panel').copyValues2Buf();
            smgsForm.findField('smgs.g162r').setValue(epdForm.findField('smgs.g162r').getValue());
            smgsForm.findField('smgs.g692').setValue(epdForm.findField('smgs.g692').getValue());
            var vags = smgs.getComponent('g27v_panel').getComponent('g27v_panel_tab');
            var vag = vags.items.first() || vags.addTab(); // cur or new vag
            var konts = vag.getComponent('g27k_panel_tab'); // konts in vag
            var kon = konts.items.first() || konts.addTab(); // cur or new kon
            kon.getComponent('utiN').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').getValue());
            kon.getComponent('vid').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid').getValue());
            smgs.getComponent('g27v_panel').setDisplayedField();
            smgs.getComponent('g27v_panel').copyValues2Buf();
        }
    },
    onRowclick: function(rowModel, model, index){
        this.getCenter().suspendLayouts();
        var grid = Ext.ComponentQuery.query('docslist')[0];
        grid.fireEvent("smgsListStatusChanged", grid);

        this.getCenter().resumeLayouts();
    },
	onDivBlur: function(){
        var comp = this.getComponent('disp.g27g');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
        comp = this.getComponent('disp.g27v');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
    }
});