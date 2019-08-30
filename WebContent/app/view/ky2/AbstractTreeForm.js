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

    buildToolbarItems: function() {
        return this.
            buildTreeToolbarItems().
            concat({
                text: 'Удалить',
                action: 'del',
                iconCls: 'del'
            },{
                xtype: 'tbfill',  // ->
                hidden: false
            },{
                text: this.btnEditPoezd,
                hidden: false,
                iconCls:'edit',
                action:'editPoezd'
            },{
                tooltip: 'На поезд по отпр.',
                iconCls:'train2',
                itemId: 'showPoezdsOutDir4PoezdIntoBind',
                action:'showPoezdsOutDir4PoezdIntoBind'
            },{
                tooltip: 'На поезд по приб.',
                iconCls:'train2',
                itemId: 'showPoezdsIntoDir4PoezdOutBind',
                action:'showPoezdsIntoDir4PoezdOutBind'
            },{
                tooltip: 'На конт. площадку',
                iconCls:'cont',
                hidden: false,
                action:'getPoesdAndYardForBind'
            },{
                xtype: 'tbfill',  // ->
                hidden: false
            },{
                text: this.btnSave,
                iconCls: 'save',
                action: 'save'
            },{
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

    buildTopToolbarItems: function() {
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
