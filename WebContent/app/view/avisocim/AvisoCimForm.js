/**
 * Created by Odmin on 27.11.2018.
 */
Ext.define('TK.view.avisocim.AvisoCimForm', {
    extend:'TK.view.DocsForm',
    alias:'widget.avisocim',
    requires: [
        'Ext.button.Button',
        'Ext.form.FieldContainer',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.Hidden',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'TK.view.cim.CimFormPanel'
    ],
    buildItems:function(config) {

        config.items = [{xtype:'cimpanel'}]

    },

    initServiceFields: function(data, initGrids, dataObj){
        this.getForm().setValues(data);
        if(dataObj){
            this.dataObj = dataObj;
        }
        this.getComponent('cimformpanel').getComponent('lab_num').show();
        this.getComponent('cimformpanel').getComponent('lab_dat').show();
        this.getComponent('cimformpanel').getComponent('smgs.aviso_num').show();
        this.getComponent('cimformpanel').getComponent('smgs.aviso_dat').show();
        this.getComponent('cimformpanel').getComponent('lab_cod').show();
        this.getComponent('cimformpanel').getComponent('smgs.aviso_cod_dat').show();
        this.getComponent('cimformpanel').getComponent('lab_vsego').show();
        this.getComponent('cimformpanel').getComponent('smgs.amount').show();
        // this.getComponent('cimformpanel').getComponent('lab_wag_n').show();
        // this.getComponent('cimformpanel').getComponent('smgs.npoezd').show();
        this.getComponent('cimformpanel').getComponent('lab_tpl_name').show();
        this.getComponent('cimformpanel').getComponent('smgs.profile').show();
        this.getComponent('cimformpanel').getComponent('smgs.type').setValue('14');
        this.getComponent('cimformpanel').getComponent('smgs.docType1').setValue('29');
        this.getComponent('cimformpanel').getComponent('search.docType').setValue('avisocim');
    },
    initBuffers: function(){
        this.getComponent('cimformpanel').getComponent('g1_panel').initBuf();
        this.getComponent('cimformpanel').getComponent('g4_panel').initBuf();
        this.getComponent('cimformpanel').getComponent('g7_panel').initBuf();
        // this.getComponent('g9_panel').initBuf();
        this.getComponent('cimformpanel').getComponent('g13_panel').initBuf();
        // this.getComponent('g18v_panel').initBuf();

    },
    initCollections: function(){

        this.getComponent('cimformpanel').getComponent('g7_panel').copyValues2MainFlds();
        // this.getComponent('g9_panel').copyValues2MainFlds();
        this.getComponent('cimformpanel').getComponent('g13_panel').copyValues2MainFlds();
        // this.getComponent('g18v_panel').copyValues2MainFlds();

    },
    initDisplayedFields:function(){
        this.getComponent('cimformpanel').getComponent('g1_panel').setDisplayedField();
        this.getComponent('cimformpanel').getComponent('g4_panel').setDisplayedField();
        this.getComponent('cimformpanel').getComponent('g7_panel').setDisplayedField();
        this.getComponent('cimformpanel').getComponent('g9_panel').setDisplayedField();
        this.getComponent('cimformpanel').getComponent('g13_panel').setDisplayedField();
        // this.getComponent('g18v_panel').setDisplayedField();
        this.getComponent('cimformpanel').fireEvent('onChangeVgCtGrDisplField', this);
        this.getComponent('cimformpanel').fireEvent('onChangeDocs9DisplField', this);

        // this.getComponent('cimformpanel').getComponent('smgs.type').setValue(14);
    }
});