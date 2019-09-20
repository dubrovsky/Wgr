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

    initComponent: function () {
        this.items = [{
            xtype: 'treepanel',
            id: 'treepanelLeft',
            store: this.buildTreeLeftPanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreeLeftPanelViewConfig(),
            selModel: {
                mode: 'MULTI'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: this.buildTreeLeftPanelTopToolbarItems()
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: this.buildTreeLeftPanelBottomToolbarItems()
            }]
        }, {
            xtype: 'treepanel',
            id: 'treepanelRight',
            store: this.buildTreeRightPanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreeRightPanelViewConfig(),
            selModel: {
                mode: 'MULTI'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: this.buildTreeRightPanelTopToolbarItems()
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: this.buildTreeRightPanelBottomToolbarItems()
            }]
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

    buildBottomToolbarItems: function () {
        return [];
    },

    buildTopToolbarItems: function () {
        return [{
            xtype: 'tbfill',  // ->
            hidden: false
        }, {
            text: this.btnEditPoezd,
            iconCls: 'edit',
            action: 'editPoezd'
        }, {
            text: this.btnVgCtGr,
            iconCls: 'edit',
            action: 'editVgCtGr'
        }, {
            xtype: 'tbfill',  // ->
            hidden: false
        }, {
            text: this.btnSave,
            iconCls: 'save',
            action: 'save'
        }, {
            text: this.btnSaveExit,
            iconCls: 'save_close',
            action: 'saveExit'
        }, {
            text: this.btnClose,
            iconCls: 'close1',
            action: 'close'
        }];
    },

    buildTreeLeftPanelStore: function () {
    },
    buildTreeRightPanelStore: function () {
    },

    buildTreeLeftPanelTopToolbarItems: function () {
        return [
            {
                text: 'Спрятать вагоны',
                action: 'hideVags'
            }, '-',
            {
                text: 'Показать вагоны',
                action: 'showVags'
            }, '-',
            {
                xtype: 'vagkontsearch'
            },
            '->', '-',
            {
                text: 'Переместить >',
                action: 'moveRight'
            }
        ];
    },

    buildTreeLeftPanelBottomToolbarItems: function () {
        return [];
    },

    buildTreeRightPanelTopToolbarItems: function () {
        return [{
            text: '< Переместить',
            action: 'moveLeft'
        },
        '-',
        {
            xtype: 'vagkontsearch'
        }];
    },

    buildTreeRightPanelBottomToolbarItems: function () {
        return [];
    },

    buildTreeLeftPanelViewConfig: function () {
        return {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                appendOnly: true
            }
        }
    },

    buildTreeRightPanelViewConfig: function () {
        return {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                appendOnly: true
            }
        }
    }
});
