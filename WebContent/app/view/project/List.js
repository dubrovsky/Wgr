Ext.define('TK.view.project.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.projectlist',
    enableColumnResize: false,
    columnLines: true,
//    forceFit: true,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function(config) {
        this.buildStore(config);
        this.buildColums(config);
        this.buildView(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            layout: 'column',
            itemId: 'top',
            items: [
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-',
                {text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'}
            ]
        });
    },
    buildBottomToolbar: function(config) {
        config.dockedItems.push({
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        });
    },
    buildStore: function(config) {
        config.store = 'Projects';
    },
    buildColums:function(config) {
        config.columns = [
            {text: this.headerName, dataIndex: 'name', flex:1,sortable:true, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerGroups, dataIndex: 'grps', flex:1,sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false,renderer: this.listRenderer},
            {text: this.headerRoutes, dataIndex: 'rts', flex:2,sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false,renderer: this.listRenderer}
        ];
    },
    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    },
    listRenderer: function (value) {
        return value.replace(/,/g, '<br/>');
    }
});