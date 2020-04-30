Ext.define('TK.view.user.ListPrivs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlistprivs',

    requires: [
        'TK.Utils'
    ],

    enableColumnHide:false,
    enableColumnMove:false,
//    enableColumnResize:false,
    sortableColumns:false,
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
        this.selModel = {mode: 'SIMPLE'};
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {xtype: 'searchfield', store: Ext.getStore('UsersPrivs')},'-',
                {text: this.btnSelect, iconCls:'check1', action:'check'},'-'
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
        config.store = 'UsersPrivs';
        Ext.getStore('UsersPrivs').clearFilter(true);
    },
    buildColums:function(config) {
        config.columns = [
            {text: this.headerName, dataIndex: 'usrPriv.name', flex:2},
            {text: this.headerDescr, dataIndex: 'usrPriv.descr', flex:3 , renderer: TK.Utils.renderLongStr}
        ];
    },
    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    }
});