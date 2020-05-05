/**
 * контроллера формы шаблонв  cimsmgs
 */
Ext.define('TK.controller.docs.Avisocimsmgs', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.column.Action'
    ],

    views: [
        'avisocimsmgs.AvisoCimSmgsList',
        'avisocimsmgs.AvisoCimSmgsForm',
        'avisocimsmgs.AvisoCimSmgsVgCtGrTreeFormWin',
        'avisocimsmgs.AvisoCimSmgsDocs9TreeFormWin',
        'avisocimsmgs.AvisoCimSmgsPlombsTreeFormWin'
    ],
    stores: ['Avisocimsmgss'],
    models: [
        'Avisocimsmgs',
        'SmgsKon'
    ],
    refs: [{
        ref: 'list',
        selector: 'viewport > tabpanel > avisocimsmgslist'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'avisocimsmgs',
        selector:'viewport > tabpanel > avisocimsmgs'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > avisocimsmgs'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > avisocimsmgs > field[name="disp.g19v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > avisocimsmgs > field[name="disp.g19k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > avisocimsmgs > field[name="disp.g19g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > avisocimsmgs > field[name="disp.g9"]'
    }],
    init:function () {
        this.control({
            'avisocimsmgslist':{
                select: this.onRowclick,
                /*itemclick: function (view, record) {
                    this.fireEvent('updateMessanger', view, record);
                },*/
                cellclick: function (view, td, cellIndex, record) {
                    var dataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
                    if (dataIndex === 'messCount') {
                        this.fireEvent('showOrUpdateMessanger', view, record);
                    }
                }
            },
            'avisocimsmgs button[action=changeVgCtGr]': {
                click: this.onCimSmgsVgCtGrWinShow
            },
            'avisocimsmgs button[action=changeDocs9]': {
                click: this.onCimSmgsDocs9WinShow
            },
            'avisocimsmgs button[action=changePlombs]': {
                click: this.onCimSmgsPlombsWinShow
            },
            'avisocimsmgs': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            },
            'avisocimsmgs trigger[itemId="smgs.g101"]': {
                onTriggerClick: this.showNsiStaG10
            },
            'avisocimsmgs trigger[itemId="smgs.g101r"]': {
                onTriggerClick: this.showNsiStaG10
            },
            'avisocimsmgs trigger[itemId="smgs.g162"]': {
                onTriggerClick: this.showNsiStaG16
            },
            'avisocimsmgs trigger[itemId="smgs.g162r"]': {
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
        // form.down('triggerfield[name=smgs.g1r]').onTriggerClick = Ext.bind(function () {
        //     var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //     nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('g1_panel'));
        // }, this);
        // form.down('triggerfield[name=smgs.g4r]').onTriggerClick = Ext.bind(function () {
        //     var nsiGrid = this.nsiOtpr(form.down('triggerfield[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
        //     nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('g4_panel'));
        // }, this);
        // нажатие кнопки выбора страны отправителя
        form.down('button[action=country]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16r]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.getController('docs.Cimsmgs').selectCountriesG1, form);
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=country_4]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g46r]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.getController('docs.Cimsmgs').selectCountriesG4, form);
            },
            this
        );

        // нажатие кнопки выбора отправителя
        form.down('button[action=otpr]').on('click',
            function(btn){
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textarea[name=smgs.g1r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Cimsmgs').selectOtprG1, form.getComponent('g1_panel'));
            },
            this
        );
        // нажатие кнопки выбора получателя
        form.down('button[action=poluch]').on('click',
            function(btn){
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textarea[name=smgs.g4r]').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.getController('docs.Cimsmgs').selectOtprG4, form.getComponent('g4_panel'));
            },
            this
        );
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
        if (btn.itemId.indexOf('g19') == -1) {
            panel = this.getComponent(btn.itemId + 'panel');
        }
        // установка кода отправителя
        if(btn.itemId.indexOf('g1') != -1){
            var value=this.getComponent('smgs.g2').getValue();
            this.getComponent('g1_panel').getComponent('code').getComponent('smgs.g2_E').setValue(value);
        }
        // установка кода получателя
        if(btn.itemId.indexOf('g4') != -1){
            var value=this.getComponent('smgs.g5').getValue();
            this.getComponent('g4_panel').getComponent('code_4').getComponent('smgs.g5_E').setValue(value);
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
//     selectOtprG1:function (view, record, item, index) {
//         var data = record.data;
//         this.getComponent('smgs.g1').setValue(data['g1']);
//         this.getComponent('smgs.g1r').setValue(data['g1r']);
//         this.ownerCt.getComponent('smgs.g11_1').setValue(data['g11']);
//         this.ownerCt.getComponent('smgs.g12_1').setValue(data['g12']);
// //        this.getComponent('smgs.g13').setValue(data['g13']);
//         this.getComponent('smgs.g15_1').setValue(data['g15_1']);
//         this.getComponent('smgs.g16_1').setValue(data['g16_1']);
//         this.getComponent('smgs.g16r').setValue(data['g16r']);
//         this.getComponent('smgs.g17_1').setValue(data['g17_1']);
//         this.getComponent('smgs.g18_1').setValue(data['g18_1']);
//         this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
//         this.getComponent('smgs.g19_1').setValue(data['g19_1']);
//         this.getComponent('smgs.g19r').setValue(data['g19r']);
//         this.getComponent('smgs.g110').setValue(data['g110']);
//         this.ownerCt.getComponent('smgs.g2').setValue(data['g2']);
//         this.ownerCt.getComponent('smgs.g3').setValue(data['g3']);
//         view.up('window').close();
//     },
//     selectOtprG4:function (view, record, item, index) {
//         var data = record.data;
//         this.getComponent('smgs.g1_1').setValue(data['g1']);
//         this.getComponent('smgs.g1r_1').setValue(data['g1r']);
//         this.ownerCt.getComponent('smgs.g41_1').setValue(data['g11']);
//         this.ownerCt.getComponent('smgs.g42_1').setValue(data['g12']);
// //        this.getComponent('smgs.g13').setValue(data['g13']);
//         this.getComponent('smgs.g15_1_1').setValue(data['g15_1']);
//         this.getComponent('smgs.g16_1_1').setValue(data['g16_1']);
//         this.getComponent('smgs.g16r_1').setValue(data['g16r']);
//         this.getComponent('smgs.g17_1_1').setValue(data['g17_1']);
//         this.getComponent('smgs.g18_1_1').setValue(data['g18_1']);
//         this.getComponent('smgs.g18r_1').setValue(data['g18r_1']);
//         this.getComponent('smgs.g19_1').setValue(data['g19_1']);
//         this.getComponent('smgs.g19r_1').setValue(data['g19r']);
//         this.getComponent('smgs.g110_1').setValue(data['g110']);
//         this.ownerCt.getComponent('smgs.g5').setValue(data['g2']);
//         this.ownerCt.getComponent('smgs.g6').setValue(data['g3']);
//         view.up('window').close();
//     },
//     nsiOtpr:function (query) {
//         var me = this;
//         return Ext.widget('nsieditlist', {
//             title:this.titleOtpr,
//             width:1000, height:700,
//             search:query,
//             buildStoreModel:function () {
//                 return 'TK.model.CimSmgsOtpr';
//             },
//             buildUrlPrefix:function () {
//                 return 'NsiSmgsG1';
//             },
//             buildColModel:function (config) {
//                 config.items.columns = {
//                     items:[
//                         {xtype:'actioncolumn', width:55,
//                             items:[
//                                 {icon:'./resources/images/save.gif', tooltip:'Сохранить', action:'save', handler:me.getController('Nsi').onSaveRecord},
//                                 {icon:'./resources/images/delete.png', tooltip:'Удалить', action:'del', handler:me.getController('Nsi').onDelRecord}
//                             ]
//                         },
//                         {text:me.headerOtprName, dataIndex:'g1', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprName1, dataIndex:'g1r', editor:{xtype:'textarea', maxLength:512}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprEmail, dataIndex:'g11', editor:{xtype:'textfield', maxLength:80}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprPhone, dataIndex:'g12', editor:{xtype:'textfield', maxLength:60}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprStrCode, dataIndex:'g15_1', editor:{xtype:'textfield'}},
//                         {text:me.headerOtprStr, dataIndex:'g16_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprStr1, dataIndex:'g16r', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprZip, dataIndex:'g17_1', editor:{xtype:'textfield', maxLength:10}},
//                         {text:me.headerOtprCity, dataIndex:'g18_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprCity1, dataIndex:'g18r_1', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprAdress, dataIndex:'g19_1', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprAdress1, dataIndex:'g19r', editor:{xtype:'textarea', maxLength:128}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprVat, dataIndex:'g110', editor:{xtype:'textfield', maxLength:16}},
//                         {text:me.headerOtprSendCode, dataIndex:'g2', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr},
//                         {text:me.headerOtprClCode, dataIndex:'g3', editor:{xtype:'textfield', maxLength:32}, renderer:TK.Utils.renderLongStr}
//                     ],
//                     defaults:{sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
//                 };
//             },
//             newRecord:function () {
//                 return Ext.create('TK.model.CimSmgsOtpr', {hid:'', g1:'', g1r:'', g11:'', g12:'', g13:'', g15_1:'', g16_1:'', g16r:'', g17_1:'', g18_1:'', g18r_1:'', g19_1:'', g19r:'', g110:'', g2:'', g3:''});
//             }
//         });
//     },
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
    onCimSmgsVgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'avisoCimsmgsVgCtGrTreeformWin', btn.up('docsform'));
    },

    onCimSmgsDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'avisoCimsmgsDocs9TreeformWin', btn.up('docsform'));
    },

    onCimSmgsPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'avisoCimsmgsPlombsTreeformWin', btn.up('docsform'));
    },

    setDisplayedVgCtGrFields: function(docForm){
        this.fireEvent('displayedVgCtGrFields', this, docForm);
    },

    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },

    setDisplayedDocs9Fields: function(docForm){
        this.fireEvent('displayedDocs9Fields', this, docForm);
    },

    setG2012DataObj: function(docForm){
        this.fireEvent('savePlombsToDataObj', this, docForm);
    },

    setDisplayedPlombsFields: function(docForm){
        this.fireEvent('displayedPlombsFields', this, docForm);
        // this.getAvisocimsmgs().getComponent('smgs.g2012').setValue(this.getAvisocimsmgs().dataObj['g2012']);
    },

    showNsiStaG10: function(field){
        var nsiGrid = this.getController('Nsi').nsiSta(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectStaG10, field.up('avisocimsmgs'));
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
        nsiGrid.on('itemdblclick', this.selectStaG16, field.up('avisocimsmgs'));
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
    }

});