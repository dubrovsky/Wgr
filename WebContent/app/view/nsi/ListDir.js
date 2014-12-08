Ext.define('TK.view.nsi.ListDir', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.nsilistdir',
    requires: [
        'TK.view.nsi.List',
        'TK.view.nsi.EditList'
    ],
    closable: false,
    autoScroll: true,
    enableColumnResize: false,
    columnLines: true,
//    forceFit: true,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildTopToolbar(config);
        this.buildColumns(config);
//        this.buildBottomToolbar(config);
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnView, iconCls:'view', action:'view'},'-'
            ]
        });
        if(tkUser.hasPriv('CIM_EXPORT_DIR')){
            config.dockedItems[0].items.push({text: this.btnExportDir, iconCls:'export2Xls', action:'exportDir2Excel', itemId:'export2Excel'}, '-');
        }
	    if(tkUser.hasPriv('CIM_SYNC_DIRS')){
		    config.dockedItems[0].items.push({text: this.btnUploadDir, iconCls:'upload', action:'uploadNsi'},'-');
	    }

    },
    viewConfig: {
        stripeRows: true,
        singleSelect:true
    },
    /*dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        itemId: 'top',
        items: [
            {text: 'Просмотр', iconCls:'view', action:'view'},'-'
        ]
    }*//*,{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        store: 'NsiDirs',
        displayInfo: true
    }*//*],*/
    store: 'NsiDirs',
    buildColumns: function(config) {
        config.columns = [
//                {text: 'ID', dataIndex: 'hid', width: 45, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                {text: this.headerName, dataIndex: 'descr', flex:1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: this.rendererName1}
            ]
    },
    /*columns: [
        {text: 'ID', dataIndex: 'hid', width: 45, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
        {text: 'Наименование', dataIndex: 'descr', flex:1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: this.rendererName1}
    ],*/
    rendererName1: function(val, meta, rec) {
        switch(rec.data.name)
        {
            case 'gruzyLink':
                return '<a href="Report_viewLink.do">' + val + '</a>';
            default:
                return val;
        }
    }
});