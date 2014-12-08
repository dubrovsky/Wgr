Ext.define('TK.view.file.List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.filelist',

    buildStore: function(config) {
        config.store = 'FileInfs';
    },
    buildColumns: function(config) {
    	config.columns = [
            {text: this.headerID, dataIndex: 'hid', width: 45, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerCreation, dataIndex: 'dattr', width: 150, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerDescr, dataIndex: 'nkon', flex: 1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
        ];
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter'},'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'
            ]
        });
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }
    }
});