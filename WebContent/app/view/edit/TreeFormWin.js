Ext.define('TK.view.edit.TreeFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.treeFormWin',
    y: 0,
    width: 600,
    height: 500,
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
            store: this.buildTreePanelStore,
            rootVisible: false,
            flex: 1
        }].concat(this.buildMainPanel());

        this.dockedItems = [{
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

    buildMainPanel: function(){
        return [];
    },
    
    buildTreePanelStore: function(){},

    buildTreeToolbarItems: function() {
        return [];
    }
});
