/**
 * Created by Odmin on 06.02.2019.
 */
Ext.define('TK.view.edit.UploadPogruzListFormWin', {
    extend: 'TK.view.edit.UploadFormWin',
    alias: 'widget.uploadPogruzListFormWin',

    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger'
    ],

    buildFormItems: function () {
        var items = this.callParent(arguments);
        items.splice(0, 0,
            {xtype: 'textfield', name: "hid_cs", text: '43553', allowBlank: true},
            {xtype: 'textfield', name: "name", text: '', allowBlank: true},
            {xtype: 'textfield', name: "query", text: '', allowBlank: true},
            {xtype: 'textfield', name: "query1", text: '', allowBlank: true}
        );
        return items;
    }
});