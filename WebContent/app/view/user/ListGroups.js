Ext.define('TK.view.user.ListGroups', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlistgroups',

    requires: [
        'Ext.toolbar.Separator'
    ],

    enableColumnResize: false,
    columnLines: true,
//    forceFit: true,
    initComponent: function() {
        this.buildSelModel();
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
    },
    buildSelModel:function(config) {
        this.selType = 'checkboxmodel';
        this.selModel = {mode: (this.ownerBtn && (this.ownerBtn.action === 'groups' || this.ownerBtn.action === 'getUserGroups')) ? 'MULTI' : 'SINGLE'};
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {text: this.btnSelect, iconCls:'check1', action:'check'},'-',
                {text: this.btnAdd, iconCls:'add1', action:'add'},'-',
                {text: this.btnEdit, iconCls:'edit1', action:'edit'},'-'
            ]
        },{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {text: this.btnRefresh, iconCls:'refresh', action:'refresh'},'-',
                {text: this.btnClose, iconCls:'close1', action:'close'},'-'
            ]
        }];
    },
    buildStore: function(config) {
        config.store = 'UsersGroups';
    },
    buildColums:function(config) {
        config.columns = [
//            Ext.create('Ext.grid.RowNumberer'),
            {text: this.headerName, dataIndex: 'usrGr.name', sortable:true, hideable:false, menuDisabled:true, draggable:false, groupable:false},
            {text: this.headerDescr, dataIndex: 'usrGr.descr', flex:1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
        ];
    },
    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    }
});