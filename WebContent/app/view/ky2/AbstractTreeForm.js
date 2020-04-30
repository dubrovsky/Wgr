Ext.define('TK.view.ky2.AbstractTreeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ky2treeform',

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
            store: this.buildTreePanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreePanelViewConfig(),
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: this.buildTreePanelTopToolbarItems()
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: this.buildTreePanelBottomToolbarItems()
            }]
        }].concat(this.buildMainPanel());

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: this.buildTopToolbarItems()
        }, {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                hidden: true
            },
            items: this.buildToolbarItems()
        }];
        this.callParent(arguments);
    },

    buildToolbarItems: function () {
        return this.buildTreeToolbarItems().concat({
            text: this.btnDelete,
            action: 'del',
            iconCls: 'del'
        }, {
            xtype: 'tbfill',  // ->
            hidden: false
        }, {
            tooltip: this.btnEditPoezd,
            iconCls: 'edit',
            itemId: 'editPoezd',
            action: 'editPoezd'
        }, {
            tooltip: this.tooltipEditOrder,
            iconCls: 'edit',
            itemId: 'editZajav',
            action: 'editZajav'
        }, {
            tooltip: this.ttipEditTruck,
            iconCls: 'edit',
            itemId: 'editAvto',
            action: 'editAvto'
        }, {
            tooltip: this.tooltipEditOrder,
            iconCls: 'edit',
            itemId: 'editAvtoZayav',
            action: 'editAvtoZayav'
        }, {
            tooltip: this.ttipByTruckDeparture,
            iconCls: 'truck',
            itemId: 'showAvtosOutDir4PoezdIntoBind',
            action: 'showAvtosOutDir4PoezdIntoBind'
        }, {
            tooltip: this.ttipByTruckArrival,
            iconCls: 'truck',
            itemId: 'showAvtosIntoDir4PoezdOutBind',
            action: 'showAvtosIntoDir4PoezdOutBind'
        }, {
            tooltip: this.ttipByTrainDeparture,
            iconCls: 'train2',
            itemId: 'showPoezdsOutDir4PoezdIntoBind',
            action: 'showPoezdsOutDir4PoezdIntoBind'
        }, {
            tooltip: this.ttipByTrainArrival,
            iconCls: 'train2',
            itemId: 'showPoezdsIntoDir4PoezdOutBind',
            action: 'showPoezdsIntoDir4PoezdOutBind'
        }, {
            tooltip: this.ttipByTruckDeparture,
            iconCls: 'truck',
            itemId: 'showAvtosOutDir4AvtoIntoBind',
            action: 'showAvtosOutDir4AvtoIntoBind'
        }, {
            tooltip: this.ttipByTruckArrival,
            iconCls: 'truck',
            itemId: 'showAvtosIntoDir4AvtoOutBind',
            action: 'showAvtosIntoDir4AvtoOutBind'
        }, {
            tooltip: this.ttipByTrainDeparture,
            iconCls: 'train2',
            itemId: 'showPoezdOutDir4AvtoIntoBind',
            action: 'showPoezdOutDir4AvtoIntoBind'
        }, {
            tooltip: this.ttipByTrainArrival,
            iconCls: 'train2',
            itemId: 'showPoezdIntoDir4AvtoOutBind',
            action: 'showPoezdIntoDir4AvtoOutBind'
        }, {
            tooltip: this.ttipOnCYard,
            iconCls: 'cont',
            itemId: 'showPoezd4YardOutBind',
            action: 'showPoezd4YardOutBind'
        }, {
            tooltip: this.ttipOnCYard,
            iconCls: 'cont',
            itemId: 'showAvto4YardOutBind',
            action: 'showAvto4YardOutBind'
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
            hidden: false,
            action: 'close'
        });
    },

    buildTopToolbarItems: function () {
        return [/*{
            xtype: 'textfield',
            itemId: 'searchField',
            enableKeyEvents: true
        }, {
            text: this.btnSearch,
            action: 'search'
        },
        '-', {
            text: this.btnExpandAll,
            action: 'expandAll',
            iconCls: 'minus'
        }, '-', {
            text: this.btnCollapseAll,
            action: 'collapseAll',
            iconCls: 'plus'
        }, '-'*/];
    },

    buildMainPanel: function () {
        return [];
    },

    buildTreePanelStore: function () {
    },

    buildTreePanelViewConfig: function () {
        return {};
    },

    buildTreeToolbarItems: function () {
        return [];
    },

    buildTreePanelTopToolbarItems: function () {
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
            }, '-'
        ].concat(this.buildTreePanelTopToolbarItemsExpandCollapse());
    },

    buildTreePanelTopToolbarItemsExpandCollapse: function () {
        return [];
    },
    buildTreePanelBottomToolbarItems: function () {
        return [];
    }
});
