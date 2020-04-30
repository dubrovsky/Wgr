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
            {xtype: 'hidden', name: "hid_cs", text: '', allowBlank: true},
            {xtype: 'hidden', name: "query", text: '', allowBlank: true},
            {xtype: 'hidden', name: "query1", text: '', allowBlank: true},
            {xtype: 'hidden', name: "search.date1", text: '', allowBlank: true},
            {xtype: 'hidden', name: "search.date2", text: '', allowBlank: true}
        );
        return items;
    }
});
