Ext.define('TK.view.ky.AbstractList', {
    extend: 'Ext.grid.Panel',
    alias:'widget.kyabstractlist',

    enableColumnHide:false,
    enableColumnMove:false,
    enableColumnResize:true,
    sortableColumns:false,

    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function(config) {
        this.buildStore(config);
        this.buildColumns(config);
        this.buildView(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },

    buildStore:function (config) {},
    buildColumns:function (config) {},
    buildBottomToolbar: function(config) { },

    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect:true,
            emptyText: 'Нет данных'
        };
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: this.btnCreate, iconCls:'doc_new', action:'create'},'-'
        ];

    }
});
