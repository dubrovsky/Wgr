/**
 * Created by Odmin on 27.11.2018.
 */
Ext.define('TK.controller.docs.Avisocim', {
    extend: 'Ext.app.Controller',

    views: ['avisocim.AvisoCimList',
            'avisocim.AvisoCimForm'
    ],

stores: ['AvisoCims'],
    models: [
        'AvisoCim',
        'SmgsKon'
    ],

    refs: [{
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'list',
        selector: 'viewport > tabpanel > avisocimlist'
    }, {
        ref:'cim',
        selector:'viewport > tabpanel > avisocim'
    }, {
        ref:'docForm',
        selector:'viewport > tabpanel > avisocim > cimpanel'
    }, {
        ref:'vagDispField',
        selector:'viewport > tabpanel > avisocim > cimpanel >field[name="disp.g18v"]'
    }, {
        ref:'kontDispField',
        selector:'viewport > tabpanel > avisocim > cimpanel >field[name="disp.g18k"]'
    }, {
        ref:'gruzDispField',
        selector:'viewport > tabpanel > avisocim > cimpanel >field[name="disp.g18g"]'
    }, {
        ref:'doc9DispField',
        selector:'viewport > tabpanel > avisocim > cimpanel >field[name="disp.g9"]'
    }],

    init: function() {
         this.control({
             'avisocimlist':{
                 select: this.onRowclick
             },
            /*'viewport > tabpanel > docsform button[action="smgs2Cim"]': {
                click: this.onSmgs2Cim
            }*/
            'avisocim button[action=changeVgCtGr]': {
                click: this.onCimVgCtGrWinShow
            },
            'avisocim button[action=changeDocs9]': {
                click: this.onCimDocs9WinShow
            },
            'avisocim button[action=changePlombs]': {
                click: this.onCimPlombsWinShow
            },
            'avisocim': {
                onChangeVgCtGrDisplField: this.setDisplayedVgCtGrFields,
                onChangeDocs9DisplField: this.setDisplayedDocs9Fields,
                onChangePlombsDisplField: this.setDisplayedPlombsFields,
                onSavePlombsToDataObj: this.setG2012DataObj
            }
         });
    },
//------------------------
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        // нажатие кнопки выбора страны отправителя
        form.down('button[action=country]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g16_1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
            },
            this
        );
        // нажатие кнопки выбора страны получателя
        form.down('button[action=country_4]').on('click',
            function(btn){
                var nsiGrid =  this.getController('Nsi').nsiCountries(form.down('textfield[name=smgs.g46_1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectCountriesG4, form);
            },
            this
        );
        form.getComponent('cimformpanel').getComponent('smgs.g24B').on('change', this.getController('Nsi').onG24B);
        form.getComponent('cimformpanel').getComponent('smgs.g24N').on('change', this.getController('Nsi').onG24);
        form.getComponent('cimformpanel').getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);

        form.down('button[action=otpr]').on(
            'click',
            function(btn){
                //был nsi
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g1]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG1, form.getComponent('cimformpanel').getComponent('g1_panel'));
            },
            this
        );
        form.down('button[action=poluch]').on(
            'click',
            function(btn){
                //был nsi
                var nsiGrid = this.getController('docs.Cimsmgs').nsiOtpr(form.down('textfield[name=smgs.g4]').getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.selectOtprG4, form.getComponent('cimformpanel').getComponent('g4_panel'));
            },
            this
        );

        form.down('detailtabpanel[itemId=g7_panel_tab_7]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG7().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );
        form.down('detailtabpanel[itemId=g7_panel_tab_722]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('plat').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiPlat(tab.getComponent('plat').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectPlatG4, tab);
                    }, this);
                }
            },
            this
        );

        //------- ОНО НАДО ВООБЩЕ???
        form.getComponent('cimformpanel').getComponent('smgs.g101').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('cimformpanel').getComponent('smgs.g101').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG102r, form);
        }, this);
        form.getComponent('cimformpanel').getComponent('smgs.g162').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('cimformpanel').getComponent('smgs.g162').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        //--------------------------------------------------------------

        form.down('detailtabpanel[itemId=g13_panel_tab_13]').on(
            'add',
            function(tabpanel, tab, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    tab.getComponent('code').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiDocG13().getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectDoc, tab);
                    }, this);
                }
            },
            this
        );

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
    onChangeData:function(btn, ev){
        Ext.app.Application.instance.getController('docs.Cim').onChangeData(btn,ev,this);
    },
    selectOtprG1: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectOtprG1(view, record, item, index,this);
    },
    selectCountriesG1: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectCountriesG1(view, record, item, index,this);
    },
    selectOtprG4: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectOtprG4(view, record, item, index,this);
    },
    selectCountriesG4: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectCountriesG4(view, record, item, index,this);
    },
    selectDocG9: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectDocG9(view, record, item, index,this);
    },

    //------------------------- ОНО НАДО?????????
    selectStaG102r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('cimformpanel').getComponent("smgs.g101").setValue(data.staName);
//        this.getComponent("smgs.g_10_3r").setValue(data.mnamerus);
        this.getComponent('cimformpanel').getComponent("smgs.g104").setValue(data.countryname);
        this.getComponent('cimformpanel').getComponent("smgs.g12").setValue(data.managno);
        this.getComponent('cimformpanel').getComponent("smgs.g121").setValue(data.staNo);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('cimformpanel').getComponent('smgs.g162').setValue(data.staName);
        this.getComponent('cimformpanel').getComponent("smgs.g164").setValue(data.countryname);
        this.getComponent('cimformpanel').getComponent('smgs.g17').setValue(data.staNo);
        this.getComponent('cimformpanel').getComponent('smgs.g171').setValue(data.managno);

        view.up('window').close();
    },
    //-----------------------------------------------------------------------------
    selectDoc: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectDoc(view, record, item, index,this);
    },
    selectPlatG4: function(view, record, item, index) {
        Ext.app.Application.instance.getController('docs.Cim').selectPlatG4(view, record, item, index,this);
    },
    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },
    onCimVgCtGrWinShow: function(btn){
        this.fireEvent('showVgCtGrWin', 'cimVgCtGrTreeformWin', btn.up('docsform'));
    },
    onCimDocs9WinShow: function(btn){
        this.fireEvent('showDocs9Win', 'cimDocs9TreeformWin', btn.up('docsform'));
    },
    onCimPlombsWinShow: function(btn){
        this.fireEvent('showPlombsWin', 'cimPlombsTreeformWin', btn.up('docsform'));
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