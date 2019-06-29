Ext.define('TK.view.ky2.AbstractBindTreeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ky2bindtreeform',

    requires: [
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill',
        'Ext.tree.Panel'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    closable: false,
    defaults: {
        autoScroll: true
    },

    initComponent:function () {
        this.items = [{
            xtype: 'treepanel',
            id: 'treepanelLeft',
            store: this.buildTreeLeftPanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreeLeftPanelViewConfig()
        }, {
            xtype: 'treepanel',
            id: 'treepanelRight',
            store: this.buildTreeRightPanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreeRightPanelViewConfig()
        }];

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: this.buildTopToolbarItems()
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: this.buildBottomToolbarItems()
        }];
        this.callParent(arguments);
    },

    buildBottomToolbarItems: function() {
        return ['->', {
            text: 'Сохранить',
            iconCls: 'save',
            action: 'save'
        }];
    },

    buildTopToolbarItems: function() {
        return [];
    },

    buildTreeLeftPanelStore: function(){},
    buildTreeRightPanelStore: function(){},

    buildTreeLeftPanelViewConfig: function(){
        return {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                appendOnly: true
            }
        }
    },

    buildTreeRightPanelViewConfig: function(){
        return {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                appendOnly: true
            }
        }
    }
});
