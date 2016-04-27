Ext.define('TK.view.cimsmgs.CimSmgsPlombsTreeFormWin', {
    extend: 'TK.view.edit.PlombsTreeFormWin',
    alias: 'widget.cimsmgsPlombsTreeformWin',

    title: 'Пломбы',

    buildFormItems: function(){
        return [
            {xtype:'textfield', fieldLabel:this.labelZnak, name:"znak", maxLength:128, width:200},
            {xtype:'numberfield', fieldLabel:this.labelTotal, name:"kpl", maxLength:3, width:55, allowDecimals:false, minValue:0},
            {xtype:'hidden', name:"type"},
            {xtype:'hidden', name:"sort"},
            {xtype:'hidden', name:"hid"}
        ];
    },

    buildTreePanelStore: function () {
        return 'PlombsTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: '+ Пломба',
            action: 'add',
            iconCls: 'doc_new'
        }];
    }
});
