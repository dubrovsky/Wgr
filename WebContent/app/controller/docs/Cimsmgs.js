/**
 * контроллер формы cimsmgs
 */
Ext.define('TK.controller.docs.Cimsmgs', {
    extend:'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils'
    ],

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.column.Action',
        'TK.Utils',
        'TK.view.ved.List'
    ],

    views:[
        'cimsmgs.CimSmgsList',
        'cimsmgs.CimSmgsForm',
        'cimsmgs.CimSmgsVgCtGrTreeFormWin',
        'cimsmgs.CimSmgsDocs9TreeFormWin',
        'cimsmgs.CimSmgsPlombsTreeFormWin'
    ],
    stores:[
        'CimSmgses'
    ],
    models:[
        'CimSmgs',
        'CimSmgsOtpr'
    ],
    refs:[{
        ref:'list',
        selector:'viewport > tabpanel > cimsmgslist'
    }, {
        ref:'menutree',
        selector:'viewport > menutree'
    }, {
        ref:'center',
        selector:'viewport > tabpanel'
    }, {
        ref:'cimsmgs',
        selector:'viewport > tabpanel > cimsmgs'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > cimsmgs'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > cimsmgs > field[name="disp.g19v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > cimsmgs > field[name="disp.g19k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > cimsmgs > field[name="disp.g19g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > cimsmgs > field[name="disp.g9"]'
    }],
    init:function () {
        this.control({
            'cimsmgslist':{
                select: this.onRowclick,
                celldblclick: this.onCellDblClick
            },
            'cimsmgs button[action=changeVgCtGr]': {
                click: this.onCimSmgsVgCtGrWinShow
            },
            'cimsmgs button[action=changeDocs9]': {
                click: this.onCimSmgsDocs9WinShow
            },
            'cimsmgs button[action=changePlombs]': {
                click: this.onCimSmgsPlombsWinShow
            },
            'cimsmgs': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            },
            'cimsmgs trigger[itemId="smgs.g101"]': {
                onTriggerClick: this.showNsiStaG10
            },
            'cimsmgs trigger[itemId="smgs.g101r"]': {
                onTriggerClick: this.showNsiStaG10
            },
            'cimsmgs trigger[itemId="smgs.g162"]': {
                onTriggerClick: this.showNsiStaG16
            },
            'cimsmgs trigger[itemId="smgs.g162r"]': {
                onTriggerClick: this.showNsiStaG16
            }
        });
    },
    initEvents:function (form) {
        Ext.each(form.query('button[action=change]'), function (item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);


        //!!!!!!!!!!!!!!!!!!!!!
        // form.down('triggerfield[name=smgs.g1r]').onTriggerClick = Ext.bind(function () {
        //     var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //     nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
        // }, this);
        //
        // нажатие кнопки выбора отправителя
        form.down('button[action=otpr]').on('click',
            function(btn){
                var nsiGrid = this.nsiOtpr(form.down('textarea[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
            },this);
        // нажатие кнопки выбора страны получателя
        form.down('button[action=poluch]').on('click',
            function(btn){
                var nsiGrid = this.nsiOtpr(form.down('textarea[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );

        // form.down('triggerfield[name=smgs.g4r]').onTriggerClick = Ext.bind(function () {
        //     var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //     nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
        // }, this);
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
        // нажатие кнопки выбора страны отправителя
        form.down('button[action=country]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16r]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=country_4]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g46r]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
            },
            this
        );

        /*form.down('detailtabpanel[itemId=g9_panel_tab_9]').on(
            'add',
            function (tabpanel, tab, inx) {
                if (tabpanel.isXType('detailtabpanel', true)) {
                    /!*tab.getComponent('code').onTriggerClick = Ext.bind(function () {
                        var nsiGrid = this.getController('Nsi').nsiDocG9().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);*!/
                    tab.getComponent('ncas').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
                        nsiGrid.on('itemdblclick', this.getController('Nsi').selectDocG23, tab);
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
    // запись данных данных о выбранной стране для графы 1 отправителя
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16_1').setValue(data['anaim']);
        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data['krnaim']);
        view.up('window').close();
    },
    // запись данных данных о выбранной стране для графы 4 получателя
    selectCountriesG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('g4_panel').getComponent('strn_4').getComponent('smgs.g16_1_1').setValue(data['anaim']);
        this.getComponent('g4_panel').getComponent('strn_4').getComponent('smgs.g16r_1').setValue(data['krnaim']);
        view.up('window').close();
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
    onChangeData:function (btn, ev) {
        var panel, tabpanels;
        if (btn.itemId.indexOf('g19') === -1) {
            panel = this.getComponent(btn.itemId + 'panel');
        }
        // установка кода отправителя
        if(btn.itemId.indexOf('g1') !== -1){

            var value=this.getComponent('smgs.g2').getValue();
            this.getComponent('g1_panel').getComponent('code').getComponent('smgs.g2_E').setValue(value);
            // сохранение оригиналов наименования.
            this.getComponent('g1_panel').backG1=this.getComponent('g1_panel').getComponent('name').getComponent('smgs.g1').getValue();
            this.getComponent('g1_panel').backG1R=this.getComponent('g1_panel').getComponent('name').getComponent('smgs.g1r').getValue();
        }
        // установка кода получателя
        if(btn.itemId.indexOf('g4') !== -1){
            var value=this.getComponent('smgs.g5').getValue();
            this.getComponent('g4_panel').getComponent('code_4').getComponent('smgs.g5_E').setValue(value);
            // сохранение оригиналов наименования.
            this.getComponent('g4_panel').backG4=this.getComponent('g4_panel').getComponent('name_4').getComponent('smgs.g1_1').getValue();
            this.getComponent('g4_panel').backG4R=this.getComponent('g4_panel').getComponent('name_4').getComponent('smgs.g1r_1').getValue();
        }
        /*else {
            panel = this.getComponent('g19v_panel');
//    		panel.onChangeData(btn);
            panel.mode = btn.itemId;
            panel.changeCmpVisibility(btn.itemId);
        }*/
        tabpanels = panel.query('detailtabpanel');
        for (var i = 0; i < tabpanels.length; i++) {
            if (tabpanels[i].items.getCount() === 0) {  // add tab by default if noone exists
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
        this.maskPanel(true);
    },
    // заполнение полей выбранной записью отправителя
    selectOtprG1:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('name').getComponent('smgs.g1').setValue(data['g1']);
        this.getComponent('name').getComponent('smgs.g1r').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g11_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g12_1').setValue(data['g12']);
        this.ownerCt.getComponent('smgs.g13_1').setValue(data['g13']);
        this.getComponent('code_1').getComponent('smgs.g_1_5k').setValue(data['g_1_5k']);
        this.getComponent('code_1').getComponent('smgs.g17_1').setValue(data['g17_1']);
        this.getComponent('smgs.g15_1').setValue(data['g15_1']);
        this.getComponent('strn').getComponent('smgs.g16_1').setValue(data['g16_1']);
        this.getComponent('strn').getComponent('smgs.g16r').setValue(data['g16r']);
        this.getComponent('city').getComponent('smgs.g18_1').setValue(data['g18_1']);
        this.getComponent('city').getComponent('smgs.g18r_1').setValue(data['g18r_1']);
        this.getComponent('address').getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('address').getComponent('smgs.g19r').setValue(data['g19r']);
        this.getComponent('vat').getComponent('smgs.g110').setValue(data['g110']);
        this.getComponent('code').getComponent('smgs.g2_E').setValue(data['g2']);
        // this.ownerCt.getComponent('smgs.g2').setValue(data['g2']);
        // this.ownerCt.getComponent('smgs.g3').setValue(data['g3']);
        this.getComponent('dop').getComponent('smgs.g1_dop_info').setValue(data['dop_info']);
        view.up('window').close();
    },
    // заполнение полей выбранной записью получателя
    selectOtprG4:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('name_4').getComponent('smgs.g1_1').setValue(data['g1']);
        this.getComponent('name_4').getComponent('smgs.g1r_1').setValue(data['g1r']);
        this.ownerCt.getComponent('smgs.g41_1').setValue(data['g11']);
        this.ownerCt.getComponent('smgs.g42_1').setValue(data['g12']);
//        this.getComponent('smgs.g13').setValue(data['g13']);
        this.getComponent('code_1_4').getComponent('smgs.g15_1_1').setValue(data['g15_1']);
        this.getComponent('code_1_4').getComponent('smgs.g17_1_1').setValue(data['g17_1']);

        this.getComponent('strn_4').getComponent('smgs.g16_1_1').setValue(data['g16_1']);
        this.getComponent('strn_4').getComponent('smgs.g16r_1').setValue(data['g16r']);

        this.getComponent('city_4').getComponent('smgs.g18_1_1').setValue(data['g18_1']);
        this.getComponent('city_4').getComponent('smgs.g18r_1').setValue(data['g18r_1']);

        this.getComponent('address_4').getComponent('smgs.g19_1').setValue(data['g19_1']);
        this.getComponent('address_4').getComponent('smgs.g19r_1').setValue(data['g19r']);

        this.getComponent('vat_4').getComponent('smgs.g110_1').setValue(data['g110']);
        this.getComponent('dop_4').getComponent('smgs.g4_dop_info').setValue(data['dop_info']);
        this.getComponent('code_4').getComponent('smgs.g5_E').setValue(data['g2']);

        this.ownerCt.getComponent('smgs.g43_1').setValue(data['g13']);
        // this.ownerCt.getComponent('smgs.g5').setValue(data['g2']);
        this.ownerCt.getComponent('smgs.g6').setValue(data['g3']);

        view.up('window').close();
    },
    // отображение таблицы выбора отправителеля/получателя
    nsiOtpr:function (query) {
        var me = this;
        return Ext.widget('nsieditlist', {
            title:this.titleOtpr,
            itemId: 'otprGrid',
            width:1000, height:700,
            editPrivileg:'CIM_DIR',
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
                                 // {icon:'./resources/images/edit.png', tooltip:'Сохранить', action:'save', handler:me.getController('Nsi').onSaveRecord},
                                {icon:'./resources/images/edit.png', tooltip:me.tooltipEdit, action:'edit', handler:me.getController('Nsi').onEditRecord},
                                {icon:'./resources/images/delete.png', tooltip:me.tooltipDel, action:'del', handler:me.getController('Nsi').onDelRecord}
                            ]
                        },
                        { dataIndex:'hid', editable: false,hidden: true},
                        {text:me.headerOtprName, dataIndex:'g1', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprName1, dataIndex:'g1r', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerCountryCode, dataIndex:'g_1_5k', editable: false},
                        {text:me.headerOtprStrCode, dataIndex:'g15_1', editable: false},
                        {text:me.headerOtprEmail, dataIndex:'g11', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprPhone, dataIndex:'g12', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprFax, dataIndex:'g13', editable: false, renderer:TK.Utils.renderLongStr},
                        // {text:me.headerOtprStrCode, dataIndex:'g15_1', editor:{xtype:'textfield'}},
                        {text:me.headerOtprStr, dataIndex:'g16_1', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprStr1, dataIndex:'g16r', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprZip, dataIndex:'g17_1', editable: false},
                        {text:me.headerOtprCity, dataIndex:'g18_1', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprCity1, dataIndex:'g18r_1', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress, dataIndex:'g19_1',editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprAdress1, dataIndex:'g19r', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprVat, dataIndex:'g110', editable: false},
                        {text:me.headerOtprSendCode, dataIndex:'g2', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerOtprClCode, dataIndex:'g3', editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerDopInfo, dataIndex:'dop_info',editable: false, renderer:TK.Utils.renderLongStr},
                        {text:me.headerINN, dataIndex:'g_2inn',  editable: false}
                    ],
                    defaults:{sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                };
            }
            // newRecord:function () {
            //     return Ext.create('TK.model.CimSmgsOtpr', {hid:'', g1:'', g1r:'',g_1_5k:'',g15_1:'', g11:'', g12:'', g13:'', g16_1:'', g16r:'', g17_1:'', g18_1:'', g18r_1:'', g19_1:'', g19r:'', g110:'', g2:'', g3:'',g_2inn:'',dop_info:''});
            // }
        });
    },

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
    onRowclick:function (rowModel, model, index) {
        this.getCenter().suspendLayouts();

        var grid = Ext.ComponentQuery.query('docslist')[0];
        grid.fireEvent("cimSmgsListStatusChanged", grid);

        /*this.ftsStatusCheck();
        var delBtn = this.getList().getDockedComponent('top').getComponent('del');
        if(delBtn) {
            this.isStatusLocked('', model.get('status'), model.get('fts'), model.get('btlc'), model.get('tdgFts')) ?
                delBtn.disable() :
                delBtn.enable();
        }*/

        this.getCenter().resumeLayouts();
    },
    onCimSmgsVgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'cimsmgsVgCtGrTreeformWin', btn.up('docsform'));
    },

    onCimSmgsDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'cimsmgsDocs9TreeformWin', btn.up('docsform'));
    },

    onCimSmgsPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'cimsmgsPlombsTreeformWin', btn.up('docsform'));
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

    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },

    setG2012DataObj: function(docForm){
        this.fireEvent('savePlombsToDataObj', this, docForm);
    },

    showNsiStaG10: function(field){
        var nsiGrid = this.getController('Nsi').nsiSta(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectStaG10, field.up('cimsmgs'));
    },

    selectStaG10: function(view, record, item, index) {
        var data = record.data,
            form = this.getForm();

        form.findField('smgs.g101r').setValue(data.staName);
        form.findField('smgs.g101').setValue(data.staNameEn);

        // form.findField('smgs.g102').setValue(data.);
        form.findField('smgs.g102r').setValue(data.mnamerus);
        form.findField('smgs.g12').setValue(data.managno);
        form.findField('smgs.g121').setValue(data.staNo);

        view.up('window').close();
    },

    showNsiStaG16: function(field){
        var nsiGrid = this.getController('Nsi').nsiSta(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectStaG16, field.up('cimsmgs'));
    },

    selectStaG16: function(view, record, item, index) {
        var data = record.data,
            form = this.getForm();

        form.findField('smgs.g162r').setValue(data.staName);
        form.findField('smgs.g162').setValue(data.staNameEn);

        // form.findField('smgs.g163').setValue(data.);
        form.findField('smgs.g163r').setValue(data.mnamerus);
        form.findField('smgs.g171').setValue(data.managno);
        form.findField('smgs.g17').setValue(data.staNo);

        view.up('window').close();
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

});
