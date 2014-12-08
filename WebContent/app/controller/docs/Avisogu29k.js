Ext.define('TK.controller.docs.Avisogu29k', {
    extend:'Ext.app.Controller',

    views:['avisogu29k.List', 'avisogu29k.Form', 'avisogu29k.Form1'],
    stores:['AvisoGu29ks'],
    models:['AvisoGu29k', 'SmgsKon'],
    refs:[
        {
            ref:'list',
            selector:'viewport > tabpanel > avisogu29klist'
        },
        {
            ref:'menutree',
            selector:'viewport > menutree'
        },
        {
            ref:'center',
            selector:'viewport > tabpanel'
        }
    ],
    init:function () {
        this.control({
            /*'viewport > tabpanel > avisogu29klist button[action=mkGU]':{
                click:this.onGu29k
            },*/
            'viewport > tabpanel > avisogu29klist':{
                select: this.onRowclick
            }
        });
    },
    initEvents:function (form) {
        Ext.each(form.query('button[action=change]'), function (item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);

        Ext.each(form.query('button[action=click]'), function (item, index) {
            if (item.itemId == 'button_gu29_stn') {
                item.on('click', Ext.bind(function () {
                    var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent("panel_gu29").getComponent('panel_gu29_stn').getComponent('smgs.g101r').getValue()).getComponent(0);
                    nsiGrid.on('itemdblclick', this.selectStn, form);
                }, this));
            }
            else if (item.itemId == 'button_gu29_sto') {
                item.on('click', Ext.bind(function () {
                    var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent("panel_gu29").getComponent('panel_gu29_sto').getComponent('smgs.g162r').getValue()).getComponent(0);
                    nsiGrid.on('itemdblclick', this.selectSto, form);
                }, this));
            }
        }, this);

        form.down('triggerfield[name=smgs.g16r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g16r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
        }, this);
        form.down('triggerfield[name=smgs.g46r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.getController('Nsi').nsiCountries(form.down('triggerfield[name=smgs.g46r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountriesG5, form);
        }, this);

        form.down('detailtabpanel[itemId=g11_panel_tab]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('kgvn').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiGng(tab.getComponent('kgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectGng, tab);
                    }, this);
                    tab.getComponent('ekgvn').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiEtsng(tab.getComponent('ekgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectEtsng, tab);
                    }, this);
                }
            },
            this
        );

        form.down('detailtabpanel[itemId=g4_panel_tab_722]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('platR').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('platR').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                        nsiGrid.on('itemdblclick', this.selectPlatG4, tab);
                    }, this);
                }
            },
            this
        );
        form.down('button[action=otpr]').on(
            'click',
            function (btn) {
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        form.down('button[action=poluch]').on(
            'click',
            function (btn) {
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.down('textfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG5, form.getComponent('g5_panel'));
            },
            this
        );
    },
    selectStn:function (view, record, item, index) {
        var data = record.data,
            fldContainer = this.getComponent("panel_gu29").getComponent("panel_gu29_stn");
        fldContainer.getComponent("smgs.g101r").setValue(data['staName']);
        fldContainer.getComponent("smgs.g_10_3r").setValue(data['mnamerus']);
        fldContainer.getComponent("smgs.g102r").setValue(data['roadname'] ? data['roadname'] + " ж.д." : '');
        fldContainer.getComponent("smgs.g12").setValue(data['managno']);
        fldContainer.getComponent("smgs.g121").setValue(data['staNo']);
        view.up('window').close();
    },
    selectSto:function (view, record, item, index) {
        var data = record.data,
            fldContainer = this.getComponent("panel_gu29").getComponent("panel_gu29_sto");
        fldContainer.getComponent('smgs.g162r').setValue(data['staName']);
        fldContainer.getComponent("smgs.g_16_33r").setValue(data['mnamerus']);
        fldContainer.getComponent('smgs.g163r').setValue(data['roadname'] ? data['roadname'] + " ж.д." : '');
        fldContainer.getComponent('smgs.g691').setValue(data['managno']);
        fldContainer.getComponent('smgs.g692').setValue(data['staNo']);
        view.up('window').close();
    },
    /*onGu29k:function (btn) {
        if (!TK.Utils.isRowSelected(this.getList())) {
            return false;
        }
        var data = this.getList().selModel.getLastSelected().data;
        this.getCenter().getEl().mask(this.maskMsg, 'x-mask-loading');
        Ext.Ajax.request({
            url:'Smgs_aviso2Smgs.do',
            params:{'search.hid':data.hid, 'search.type':4, 'status':7},
            scope:this,
            success:function (response, options) {
                this.getCenter().getEl().unmask();
                this.getList().store.load();
            },
            failure:function (response) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },*/
    onRowclick:function (rowModel, record, index) {
        var bar = this.getList().getDockedComponent('top'),
            data = this.getList().selModel.getLastSelected().data,
//            ready = data.ready,
            status = data.status;
        if (bar.getComponent('aviso2smgs')) {
            if (status && status == '4') {
                bar.getComponent('aviso2smgs').enable();
            } else {
                bar.getComponent('aviso2smgs').disable();
            }
        }
        if(bar.getComponent('export2Excel')){
            if(status && (status == '4' || status == '7')){
                bar.getComponent('export2Excel').enable();
            } else {
                bar.getComponent('export2Excel').disable();
            }
        }
        if (bar.getComponent('del')) {
            if (status && status == '7') {
                bar.getComponent('del').disable();
            } else {
                bar.getComponent('del').enable();
            }
        }

    },
    selectPlatG4:function (view, record, item, index) {
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
    selectOtprG1:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        this.getComponent('smgs.g2_1').setValue(data['g2']);
        this.getComponent('code_p1').getComponent('smgs.g2').setValue(data['g3']);
//    this.getComponent('code_p1').getComponent('smgs.g_2inn').setValue(data['g_2inn']);
        view.up('window').close();
    },
    selectOtprG5:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('naim').getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['g_1_5k']);
        this.getComponent('strn').getComponent('smgs.g16r_1').setValue(data['g16r']);
        this.getComponent('smgs.g18r_1_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        this.getComponent('smgs.g5_1').setValue(data['g2']);
        this.getComponent('code_p5').getComponent('smgs.g5').setValue(data['g3']);
//    this.getComponent('code_p5').getComponent('smgs.g_5inn').setValue(data['g_2inn']);
        view.up('window').close();
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data['abc2']);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data['naim']);
        view.up('window').close();
    },
    selectCountriesG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data['abc2']);
        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data['naim']);
        view.up('window').close();
    },
    onChangeData:function (btn) {
        var panel, tabpanels;
//    	if(btn.itemId.indexOf('g27') == -1){
        panel = this.getComponent(btn.itemId + 'panel');
//    	}

        tabpanels = panel.query('detailtabpanel');
        for (var i = 0; i < tabpanels.length; i++) {
            if (tabpanels[i].items.getCount() == 0) {
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    }

});