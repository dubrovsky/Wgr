Ext.define('TK.controller.docs.Aviso', {
    extend: 'Ext.app.Controller',
    views: ['aviso.List', 'aviso.Form', 'aviso.Form1'],
    stores: ['Avisos'],
    models: ['Aviso','SmgsKon'],
    refs: [
        {
            ref: 'list',
            selector: 'viewport > tabpanel > avisolist'
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
            /*'viewport > tabpanel > avisolist button[action=mkSMGS]': {
                click: this.onSmgs
            },*/
            'viewport > tabpanel > avisolist': {
                select: this.onRowclick
            }
        });
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectStaG162, form);
        }, this);
        form.getComponent('smgs.g102r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g102r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectStaG102r, form);
        }, this);
        form.down('detailtabpanel[itemId=g7_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('text').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('text').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectStaG7, tab);
                    }, this);
                }
            },
            this
        );

        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('blur', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('blur', this.getController('Nsi').onG24);

        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectCountriesG1, form);
        }, this);
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function(){
            var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectCountriesG5, form);
        }, this);

        form.down('detailtabpanel[itemId=g11_panel_tab]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiGng(tab.getComponent('kgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectGng, tab);
                    }, this);
                    tab.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiEtsng(tab.getComponent('ekgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectEtsng, tab);
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
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('platR').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectPlatG4, tab);
                    }, this);
                }
            },
            this
        );
        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Smgs').selectOtprG5, form.getComponent('g5_panel'));
            },
            this
        );
    },
    /*onSmgs: function(btn){
    	if(!TK.Utils.isRowSelected(this.getList())){
		  	return false;
		}
  		var data = this.getList().selModel.getLastSelected().data;
		this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');
        Ext.Ajax.request({
	    	url: 'Smgs_aviso2Smgs.do',
	        params: {'search.hid': data.hid,'search.type': 2, 'status':7},
	        scope: this,
	        success: function(response, options) {
                this.getCenter().getEl().unmask();
	            this.getList().store.load();
	        },
	        failure: function(response){
	            this.getCenter().getEl().unmask();
	            TK.Utils.makeErrMsg(response, this.errorMsg);
	        }
        });
	},*/
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
    selectPlatG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('dorR').setValue(data['dorR']);
        this.getComponent('platR').setValue(data['platR']);
        this.getComponent('primR').setValue(data['primR']);
            /*this.getComponent('kplat').setValue(data['kplat']);
            this.getComponent('kplat1').setValue(data['kplat1']);
            if(this.getComponent('kplat2')) {
                this.getComponent('kplat2').setValue(data['kplat2']);
            }*/
        view.up('window').close();
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
    }
});