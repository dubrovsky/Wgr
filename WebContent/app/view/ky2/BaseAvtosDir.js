Ext.define('TK.view.ky2.BaseAvtosDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias:'widget.ky2baseavtosdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text: this.headerAvtoNum, dataIndex:'no_avto', flex:1},
                {text: this.headerAvtoTrail, dataIndex:'no_trail', width:100},
                {text: this.headerDep, dataIndex:'departure', width:100},
                {text: this.headerDest, dataIndex:'destination', width:100}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky2.AvtosDir';
    },
    buildBottomToolbar: function(config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },
    buildTopToolbar: function(config) {
        config.tbar = [
            {text: this.btnSelect, action:'getAvtoAndAvtoForBind', iconCls:'check1'}, '-'
        ];
    }
});
