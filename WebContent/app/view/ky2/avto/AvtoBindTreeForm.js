Ext.define('TK.view.ky2.avto.AvtoBindTreeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ky2avtobindtreeform',

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
            rootVisible: true,
            flex: 1,
            viewConfig: this.buildTreeLeftPanelViewConfig(),
            tools: this.buildTreeLeftPanelTools()
        }, {
            xtype: 'treepanel',
            id: 'treepanelRight',
            store: this.buildTreeRightPanelStore(),
            rootVisible: true,
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
    },

    buildTreeLeftPanelTools: function() {
        var me = this;
        return [{
            tooltip: 'Перенести все',
            type: 'd-arrow-r',
            itemId: 'moveAll',
            margin: '0 10 0 0',
            handler: function () {
                me.fireEvent('onMoveAll', me);
            }
        }, {
            tooltip: 'Перенести',
            type: 's-arrow-r',
            action: 'moveOne',
            margin: '0 10 0 0',
            handler: function () {
                me.fireEvent('onMove', me);
            }
        }, {
            xtype: 'component',
            flex: 4
        }]
    }
});
