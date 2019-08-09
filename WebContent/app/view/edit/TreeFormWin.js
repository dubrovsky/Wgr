Ext.define('TK.view.edit.TreeFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.treeFormWin',

    requires: [
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill',
        'Ext.tree.Panel'
    ],

    y: 0,
    width: 700,
    height: 600,
    modal: true,
    config: {
        ownerDoc: undefined
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults: {
        autoScroll: true
    },
    initComponent:function () {
        this.items = [{
            xtype: 'treepanel',
            store: this.buildTreePanelStore(),
            rootVisible: false,
            flex: 1,
            viewConfig: this.buildTreePanelViewConfig()
        }].concat(this.buildMainPanel());

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            // ui: 'footer',
            /*defaults: {
                hidden: true
            },*/
            items: this.buildTopToolbarItems()
            /*,
            items: [{
                text: 'Docked to the top'
            }]*/
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                hidden: true
            },
            items: this.buildToolbarItems()
        }];
        this.callParent(arguments);
    },

    buildToolbarItems: function() {
        return this.
            buildTreeToolbarItems().
            concat({
                text: this.btnDel,
                action: 'del',
                iconCls: 'del'
            },{
                xtype: 'tbfill',  // ->
                hidden: false
            },{
                text: this.btnSave,
                iconCls: 'save',
                action: 'save'
            }, {
                text: this.btnClose,
                iconCls: 'exit',
                hidden: false,
                handler: this.close.bind(this)
            });
    },

    buildTopToolbarItems: function() {
        return [{
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
        }, '-'];
    },

    buildMainPanel: function(){
        return [];
    },
    
    buildTreePanelStore: function(){},

    buildTreePanelViewConfig: function(){
        return {};
    },

    buildTreeToolbarItems: function() {
        return [];
    }
});
