Ext.define('TK.view.ky2.AbstractBindTreeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ky2bindtreeform',

    requires: [
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill',
        'Ext.tree.Panel',
        'TK.view.ky2.MyFixedTreeModel',
        'TK.view.ky2.VagKontSearch'
    ],
    autoScroll: true,
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
            selModel: Ext.create('TK.view.ky2.MyFixedTreeModel'),
            dockedItems: [{
                xtype: 'toolbar',
                layout: 'column',
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
            selModel: Ext.create('TK.view.ky2.MyFixedTreeModel'),
            dockedItems: [{
                xtype: 'toolbar',
                layout: 'column',
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
                tooltip: this.ttipHideWags,
                action: 'hideVags',
                iconCls: 'hide'
            }, '-',
            {
                tooltip: this.ttipShowWags,
                action: 'showVags',
                iconCls: 'show'
            }, '-',
            {
                tooltip: this.ttipShow,
                action: 'expandConts',
                iconCls: 'expand'
            }, '-',
            {
                tooltip: this.ttipHide,
                action: 'collapseConts',
                iconCls: 'collapse'
            }, '-',
            {
                xtype: 'vagkontsearch'
            },
            '->', '-',
            {
                tooltip: this.labelMove,
                action: 'moveRight',
                iconCls: 's_arrow_r'

            }
        ];
    },

    buildTreeLeftPanelBottomToolbarItems: function () {
        return [];
    },

    buildTreeRightPanelTopToolbarItems: function () {
        return [
            {
                tooltip: this.labelMove,
                action: 'moveLeft',
                iconCls: 's_arrow_l'
            }, '-',
            {
                tooltip: this.ttipShow,
                action: 'expandAll',
                iconCls: 'expand'
            }, '-',
            {
                tooltip: this.ttipHide,
                action: 'collapseAll',
                iconCls: 'collapse'
            }, '-',
            {
                xtype: 'vagkontsearch'
            }].concat(this.buildTreeRightPanelTopToolbarZayavFilter());
    },

    buildTreeRightPanelTopToolbarZayavFilter: function() {
        return [];
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
