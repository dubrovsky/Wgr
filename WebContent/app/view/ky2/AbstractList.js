Ext.define('TK.view.ky2.AbstractList', {
    extend: 'Ext.grid.Panel',
    alias:'widget.ky2abstractlist',

    enableColumnHide:false,
    enableColumnMove:false,
    enableColumnResize:true,
    sortableColumns:false,

    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
        this.setToolBarColumnLayout();
    },
    buildConfig:function(config) {
        this.buildStore(config);
        this.buildColumns(config);
        this.buildView(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },

    setToolBarColumnLayout:function () {
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            layout: 'column'
        });
        Ext.each(this.dockedItems.items, function (dItem) {
            if (dItem.xtype === 'toolbar' && dItem.dock === 'top') {
                toolbar.layout.owner = dItem.layout.owner;
                dItem.layout = toolbar.layout;
            }
        });
    },

    buildStore:function (config) {},
    buildColumns:function (config) {},
    buildBottomToolbar: function(config) { },

    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect:true,
            emptyText: this.noData,
            autoScroll: true
        };
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            // {text: this.btnCreate, iconCls:'doc_new', action:'create'},'-'
        ];

    }
});
