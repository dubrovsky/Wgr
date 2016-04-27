Ext.define('TK.view.cimsmgs.CimSmgsDocs9TreeFormWin', {
    extend: 'TK.view.edit.Docs9TreeFormWin',
    alias: 'widget.cimsmgsDocs9TreeformWin',

    title: 'Документы, приложенные отправителем',

    buildFormItems: function(){
        return [
            {xtype:'trigger', fieldLabel:this.labelCustomsCode, name:"ncas", maxLength:6, triggerCls:'dir', width:100,
                onTriggerClick: function(e){
                    this.fireEvent("ontriggerclick", this, e);
            }},
            {xtype:'textarea', fieldLabel:this.labelTextRu, name:"text1", maxLength:500, width:200},
            {xtype:'textarea', fieldLabel:this.labelText, name:"text2", maxLength:240, width:200},
            {xtype:'textfield', fieldLabel:this.labelDocNum, name:"ndoc", maxLength:56, width:200},
            {xtype:'datefield', fieldLabel:this.labelDate, name:"dat", width:80},
            {xtype:'numberfield', fieldLabel:this.labelTotal, name:"ncopy", maxLength:10, width:200, allowDecimals:false, minValue:0},
            {xtype:'hidden', name:"code"},
            {xtype:'hidden', name:"fieldNum", value:'9'},
            {xtype:'hidden', name:"sort"},
            {xtype:'hidden', name:"hid"}
        ];
    },

    buildTreePanelStore: function () {
        return 'Docs9TreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: '+ Документ',
            action: 'add',
            iconCls: 'doc_new'
        }];
    }
});
