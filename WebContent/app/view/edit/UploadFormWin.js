Ext.define('TK.view.edit.UploadFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.uploadFormWin',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.layout.container.Anchor',
        'Ext.toolbar.Fill'
    ],

    y: 0,
    width: 500,
   // height: 600,
    modal: true,

    layout: 'anchor',
    
    initComponent:function () {
        this.items = [{
            xtype: 'form',
            title: this.titleUpload,
            defaults: {anchor: '100%'},
            bodyPadding: 5,
            items: this.buildFormItems()
        }];

        this.dockedItems = [/*{
            xtype: 'toolbar',
            dock: 'top',
            items: this.buildTopToolbarItems()
        },*/ {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: this.buildBottomToolbarItems()
        }];

        this.callParent(arguments);
    },

    buildTopToolbarItems: function() {
        return [];
    },

    buildBottomToolbarItems: function() {
        return [{
            xtype: 'tbfill'
        },{
            text: this.btnSave,
            iconCls: 'save',
            action: 'upload'
        }, {
            text: this.btnClose,
            iconCls: 'exit',
            handler: this.close.bind(this)
        }];
    },

    buildFormItems: function() {
        return [
            {xtype:'filefield', fieldLabel: this.labelFile, name: 'upload', allowBlank: false, buttonText: this.labelUpload}
        ];
    }
});
