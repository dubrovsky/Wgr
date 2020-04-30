Ext.define('TK.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',

    requires: [
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'Ext.ux.form.SearchField',
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],

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
        Ext.getStore('Users').clearFilter(true);
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            layout: 'column',
            items: [
                {xtype: 'searchfield', store: Ext.getStore('Users')},'-',
                {text: this.btnCreate, iconCls:'user_add', action:'add'},'-',
                {text: this.btnEdit, iconCls:'user_edit', action:'edit'},'-',
                {text: this.btnCopy, iconCls:'user_edit2', action:'copy'},'-',
                {text: this.btnGrFilter, itemId:'grFilter', iconCls:'filter', action:'grFilter'},'-',
                {text: this.btnResetGrFilter, iconCls:'filter', action:'grFilterReset'},'-'
            ]
        },{
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200, 1000] })],
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
            {text: this.headerUn, dataIndex: 'usr.un',flex:1},
            {text: this.headerName, dataIndex: 'usr.namKlient', flex:2, renderer: TK.Utils.renderLongStr},
            {text: this.headerGroup, dataIndex: 'usr.group.name',flex:1},
            {text: this.headerGroups, dataIndex: 'usr.groupsIds',renderer: this.privRenderer,flex:1},
            {text: this.headerPrivileg, dataIndex: 'usr.privilegsIds', width:150,renderer: this.privRenderer,flex:1},
            {text: this.headerLocked, dataIndex: 'usr.locked', renderer: this.admRenderer,flex:1},
            {text: this.headerSu, dataIndex: 'usr.su', renderer: this.admRenderer},
            {text: this.headerEmail, dataIndex: 'usr.email',flex:1},
            {text: this.headerLang, dataIndex: 'usr.lng', flex:1}
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
                value = this.textYes;
            } else {
                metaData.style = 'color:green;';
                value = this.textNo;
            }
        } else {
            if (!value) {
                metaData.style = 'color:red;';
                value = this.textNo;
            } else {
                metaData.style = 'color:green;';
                value = this.textYes;
            }
        }
        return value;
    }
});