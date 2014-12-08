Ext.define('TK.controller.docs.Avisocimsmgs', {
    extend: 'Ext.app.Controller',
    views: ['avisocimsmgs.List', 'avisocimsmgs.Form'],
    stores: ['Avisocimsmgss'],
    models: ['Avisocimsmgs','SmgsKon'],
    refs: [
        {
            ref: 'list',
            selector: 'viewport > tabpanel > avisocimsmgslist'
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
            'viewport > tabpanel > avisocimsmgslist': {
                select: this.onRowclick
             }
        });
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function (item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);


        form.down('triggerfield[name=smgs.g1r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('triggerfield[name=smgs.g1r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
        }, this);
        form.down('triggerfield[name=smgs.g4r]').onTriggerClick = Ext.bind(function () {
            var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('triggerfield[name=smgs.g4r]').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
        }, this);

        form.down('detailtabpanel[itemId=g7_panel_tab_7]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG7().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        /*form.down('detailtabpanel[itemId=g9_panel_tab_9]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG9().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );*/
        form.down('detailtabpanel[itemId=g13_panel_tab_13]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG13().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g13_panel_tab_136]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('ndoc').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiSta(tab.getComponent('ndoc').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc136, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g7_panel_tab_722]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    tab.getComponent('plat').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('plat').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                        nsiGrid.on('itemdblclick', this.selectPlatG7_22, tab);
                    }, this);
                }
            },
            this
        );

        form.down('detailtabpanel[itemId=g20g_panel_tab]').on(
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

        /*form.down('detailtabpanel[itemId=g19v_panel_tab]').on(
            'add',
            function (vags, vag, inx) {
                if (vags.isXType('detailtabpanel', true) && vag.getComponent('g19k_panel_tab')) {
                    vag.getComponent('g19k_panel_tab').on('add', function (kons, kon, inx) {
                        if (kons.isXType('detailtabpanel', true) && kon.getComponent('g19g_panel_tab')) {
                            kon.getComponent('g19g_panel_tab').on('add', function (gruzs, gruz, inx) {
                                if (gruzs.isXType('detailtabpanel', true)) {
                                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function () {
                                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
                                        nsiGrid.on('itemdblclick', this.selectGng, gruz);
                                    }, this);
                                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function () {
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
    onChangeData:function(btn){
        var panel = this.getComponent(btn.itemId + 'panel'),
            tabpanels = panel.query('detailtabpanel');

        for(var i = 0; i < tabpanels.length; i++){
            if(tabpanels[i].items.getCount() == 0){
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    },
   /* onChangeData:function (btn, ev) {
        var panel, tabpanels;
        if (btn.itemId.indexOf('g19') == -1) {
            panel = this.getComponent(btn.itemId + 'panel');
        }
        else {
            panel = this.getComponent('g19v_panel');
//    		panel.onChangeData(btn);
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);
        }
        tabpanels = panel.query('detailtabpanel');
        for (var i = 0; i < tabpanels.length; i++) {
            if (tabpanels[i].items.getCount() == 0) {  // add tab by default if noone exists
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    },*/
    selectOtprG1:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g1').setValue(data['g1']);
        this.getComponent('smgs.g1r').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g11_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g12_1').setValue(data['g12']);
//        this.getComponent('smgs.g13').setValue(data['g13']);
        this.getComponent('smgs.g15_1').setValue(data['g15_1']);
        this.getComponent('smgs.g16_1').setValue(data['g16_1']);
        this.getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('smgs.g17_1').setValue(data['g17_1']);
        this.getComponent('smgs.g18_1').setValue(data['g18_1']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        this.getComponent('smgs.g110').setValue(data['g110']);
        this.ownerCt.getComponent('smgs.g2').setValue(data['g2']);
        this.ownerCt.getComponent('smgs.g3').setValue(data['g3']);
        view.up('window').close();
    },
    selectOtprG4:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g1_1').setValue(data['g1']);
        this.getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g41_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g42_1').setValue(data['g12']);
//        this.getComponent('smgs.g13').setValue(data['g13']);
        this.getComponent('smgs.g15_1_1').setValue(data['g15_1']);
        this.getComponent('smgs.g16_1_1').setValue(data['g16_1']);
        this.getComponent('smgs.g16r_1').setValue(data['g16r']);
        this.getComponent('smgs.g17_1_1').setValue(data['g17_1']);
        this.getComponent('smgs.g18_1_1').setValue(data['g18_1']);
        this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('smgs.g19r_1').setValue(data['g19r']);
        this.getComponent('smgs.g110_1').setValue(data['g110']);
        this.ownerCt.getComponent('smgs.g5').setValue(data['g2']);
        this.ownerCt.getComponent('smgs.g6').setValue(data['g3']);
        view.up('window').close();
    },
    /*nsiOtpr:function (query) {
        var me = this;
        return Ext.widget('nsieditlist', {
            title:this.titleOtpr,
            width:1000, height:700,
            search:query,
            buildStoreModel:function () {
                return 'TK.model.CimSmgsOtpr';
            },
            buildUrlPrefix:function () {
                return 'NsiSmgsG1';
            },
            buildColModel:function (config) {
                config.items.columns = {
                    items:[
                        {xtype:'actioncolumn', width:55,
                            items:[
                                {icon:'./resources/images/save.gif', tooltip:'Сохранить', action:'save', handler:me.getController('Nsi').onSaveRecord},
                                {icon:'./resources/images/delete.png', tooltip:'Удалить', action:'del', handler:me.getController('Nsi').onDelRecord}
                            ]
                        },
                        {text:me.headerOtprName, dataIndex:'g1', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprName1, dataIndex:'g1r', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprEmail, dataIndex:'g11', editor:{xtype:'textfield', maxLength:80}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprPhone, dataIndex:'g12', editor:{xtype:'textfield', maxLength:60}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprStrCode, dataIndex:'g15_1', editor:{xtype:'textfield'}},
                        {text:me.headerOtprStr, dataIndex:'g16_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprStr1, dataIndex:'g16r', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprZip, dataIndex:'g17_1', editor:{xtype:'textfield', maxLength:10}},
                        {text:me.headerOtprCity, dataIndex:'g18_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprCity1, dataIndex:'g18r_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress, dataIndex:'g19_1', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress1, dataIndex:'g19r', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprVat, dataIndex:'g110', editor:{xtype:'textfield', maxLength:16}},
                        {text:me.headerOtprSendCode, dataIndex:'g2', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprClCode, dataIndex:'g3', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr}
                    ],
                    defaults:{sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                };
            },
            newRecord:function () {
                return Ext.create('TK.model.CimSmgsOtpr', {hid:'', g1:'', g1r:'', g11:'', g12:'', g13:'', g15_1:'', g16_1:'', g16r:'', g17_1:'', g18_1:'', g18r_1:'', g19_1:'', g19r:'', g110:'', g2:'', g3:''});
            }
        });
    },*/
    selectDoc:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('code').setValue(data['nsiFNn']);
        this.getComponent('text').setValue(data['nsiFDesc']);
        view.up('window').close();
    },
    selectDoc136:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ndoc').setValue(data['staNo']);
        this.getComponent('text').setValue(data['staName']);
        this.getComponent('text2').setValue(data['staNameEn']);
        this.getComponent('text3').setValue(data['staNameCh']);
        view.up('window').close();
    },
    selectPlatG7_22:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('dorR').setValue(data['dorR']);
        this.getComponent('platR').setValue(data['platR']);
        this.getComponent('primR').setValue(data['primR']);
        this.getComponent('kplat').setValue(data['kplat']);
        this.getComponent('kplat1').setValue(data['kplat1']);
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

    }

});