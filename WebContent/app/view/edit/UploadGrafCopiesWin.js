Ext.define('TK.view.edit.UploadGrafCopiesWin', {
    extend: 'TK.view.edit.UploadFormWin',
    alias: 'widget.uploadGrafCopiesFormWin',

    requires: [
    ],
    title: 'Графические копии документов',
    buildFormItems: function() {
        var items = [];
        items.splice(0, 0,
            {xtype: 'textfield', fieldLabel: 'Номер поезда', name: "poezdNum", itemId: 'poezdNum', maxLength: 240},
            {
                xtype: 'filesfield', fieldLabel: this.labelFile, name: 'fileUpload', itemId: 'uploadField', allowBlank: false, buttonText: this.labelUpload, listeners: {
                    afterrender: function (cmp) {
                        cmp.fileInputEl.dom.setAttribute('multiple', '1');
                    }
                }
            },
            {
                xtype: 'fieldcontainer',
                defaultType: 'checkboxfield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {boxLabel: 'не учитывать существующие СМГС',  name: 'type', inputValue: '1', itemId: 'grafTypeNew'}
                ]
            },

            {xtype: 'hidden', name: "search.routeId", allowBlank: false},
            {xtype: 'hidden', name: "search.docType", allowBlank: false}
        );
        return items;
    }
});