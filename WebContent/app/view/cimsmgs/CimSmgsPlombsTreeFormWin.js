Ext.define('TK.view.cimsmgs.CimSmgsPlombsTreeFormWin', {
    extend: 'TK.view.edit.PlombsTreeFormWin',
    alias: 'widget.cimsmgsPlombsTreeformWin',

    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.Number'
    ],

    // title: 'Пломбы',

    buildFormItems: function(){
        return [
            {xtype:'textfield', fieldLabel:this.labelZnak, name:"znak", maxLength:128, width:200},
            {xtype:'numberfield', fieldLabel:this.labelTotal, name:"kpl", maxLength:3, width:55, allowDecimals:false, minValue:0},
            {xtype:'hidden', name:"type"},
            {xtype:'hidden', name:"sort"},
            {xtype:'hidden', name:"hid"},
            {xtype:'hidden', name:"id"}
        ];
    },

    buildTreePanelStore: function () {
        return 'PlombsTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: this.btnPlombText,
            action: 'add',
            iconCls: 'doc_new'
        }];
    }
});
