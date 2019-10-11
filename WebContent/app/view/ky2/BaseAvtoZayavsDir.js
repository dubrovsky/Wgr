Ext.define('TK.view.ky2.BaseAvtoZayavsDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias:'widget.ky2baseavtozayavsdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text: this.headerZayavNum, dataIndex:'no_zayav', flex:1},
                {text: this.headerAvtoNum, dataIndex:'no_avto', flex:1},
                {text: this.headerAvtoTrail, dataIndex:'no_trail', width:100}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky2.AvtoZayavsDir';
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
            {text: this.btnSelect, action:'getAvtoZayavsForImport', iconCls:'check1'}, '-'
        ];
    }
});
