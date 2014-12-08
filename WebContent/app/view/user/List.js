Ext.define('TK.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    enableColumnHide:false,
    enableColumnMove:false,
//    enableColumnResize:false,
    sortableColumns:false,
    columnLines: true,
//    requires: ['Ext.ux.form.SearchField'],
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
        this.buildDockedItems(config);
//        this.buildBottomToolbar(config);
    },
    buildStore: function(config) {
        config.store = 'Users';
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {xtype: 'searchfield', store: Ext.getStore('Users')},'-',
                {text: this.btnCreate, iconCls:'user_add', action:'add'},'-',
                {text: this.btnEdit, iconCls:'user_edit', action:'edit'},'-'
            ]
        },{
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        }

        /*,{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {text: this.btnRefresh, iconCls:'refresh', action:'refresh'},'-'
//                {text: 'Закрыть', iconCls:'close1', action:'close'},'-'
            ]
        }*/];
    },
    buildColums:function(config) {
        config.columns = [
            {xtype: 'rownumberer'},
            {text: this.headerUn, dataIndex: 'usr.un'},
            {text: this.headerName, dataIndex: 'usr.namKlient', flex:1, renderer: TK.Utils.renderLongStr},
            {text: this.headerGroup, dataIndex: 'usr.group.name'},
            {text: this.headerGroups, dataIndex: 'usr.groupsIds',renderer: this.privRenderer},
            {text: this.headerPrivileg, dataIndex: 'usr.privilegsIds', width:150,renderer: this.privRenderer},
            {text: this.headerLocked, dataIndex: 'usr.locked', renderer: this.admRenderer},
            {text: this.headerSu, dataIndex: 'usr.su', renderer: this.admRenderer},
            {text: this.headerEmail, dataIndex: 'usr.email', width:120}
        ];
    },
    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    },
//    buildBottomToolbar: function(config) {
//        config.dockedItems.push({
//            dock: 'bottom',
//            xtype: 'pagingtoolbar',
//            store: config.store,
//            displayInfo: true
//        });
//    },
    privRenderer: function (value, metaData, record, rowIndex, colIndex, store) {
        return value.replace(/,/g, '<br/>');
    },
    admRenderer: function (value, metaData, record, rowIndex, colIndex, store) {
        if (colIndex == 6) { //usr.locked
            if (value) {
                metaData.style = 'color:red;';
                value = 'да';
            } else {
                metaData.style = 'color:green;';
                value = 'нет';
            }
        } else {
            if (!value) {
                metaData.style = 'color:red;';
                value = 'нет';
            } else {
                metaData.style = 'color:green;';
                value = 'да';
            }
        }
        return value;
    }
});