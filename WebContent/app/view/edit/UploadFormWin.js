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
        return [
            {
                text: this.downloadTpl,
                itemId:'downloadTpl',
                iconCls: 'excel',
                action: 'downloadTpl',
                hidden:true
            },
            {
            xtype: 'tbfill'
        },{
            text: this.btnSave,
            itemId:'savebtn',
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
            {xtype:'filefield', fieldLabel: this.labelFile, name: 'upload',itemId:'uploadField', allowBlank: false, buttonText: this.labelUpload},
            {xtype: 'hidden', name: "name",itemId:'uploadName', text: '', allowBlank: true},
            {xtype: 'hidden', name: "hid",itemId:'hid', text: '', allowBlank: true},
            {xtype: 'hidden', name: "query",itemId:'query', text: '', allowBlank: true}
        ];
    }
});
