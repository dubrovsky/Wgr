Ext.define('TK.view.edit.UploadDoc9FormWin', {
    extend: 'TK.view.edit.UploadFormWin',
    alias: 'widget.uploadDoc9FormWin',

    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger'
    ],

    buildFormItems: function() {
        var items = this.callParent(arguments);
        items.splice(0, 0,
            {xtype:'trigger', fieldLabel: this.labelCustomsCode, name:"cimSmgsDoc.ncas", maxLength:6, triggerCls:'dir',
                onTriggerClick: function(e){
                    this.fireEvent("ontriggerclick", this, e);
                }},
            {xtype:'textarea', fieldLabel: this.labelTextRu, name:"cimSmgsDoc.text", maxLength:500},
            {xtype:'textarea', fieldLabel: this.labelText, name:"cimSmgsDoc.text2", maxLength:240},
            {xtype:'hidden', name:"hid_cs", allowBlank: false}
        );
        return items;
    }
});