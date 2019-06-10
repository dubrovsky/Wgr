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

            {text: this.headerNumOtpr, dataIndex: 'numOtpr', width: 100, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerNumCont, dataIndex: 'numCont', width: 100, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerDateOtpr, dataIndex: 'dateOtpr', width: 100, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},

            {text: this.headerDescr, dataIndex: 'nkon', flex: 1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
        ];
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'
            ]
        });
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }
        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }
    }
});