Ext.define('TK.view.ky2.BasePoezdsOutDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias:'widget.ky2basepoezdsoutdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Поезд', dataIndex:'nppr', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky2.PoezdsOutDir';
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
            {text: 'Выбрать', action:'getPoesdIntoAndPoezdOutForBind', iconCls:'check1'}, '-'
        ];
    }
});
