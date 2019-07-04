Ext.define('TK.view.ky2.BasePoezdsDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias:'widget.ky2basepoezdsdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Поезд', dataIndex:'nppr', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky2.PoezdsDir';
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
            {text: 'Выбрать', action:'getPoesdAndPoezdForBind', iconCls:'check1'}, '-'
        ];
    }
});
