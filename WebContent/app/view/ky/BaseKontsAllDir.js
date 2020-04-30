Ext.define('TK.view.ky.BaseKontsAllDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontsalldir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Контейнер', dataIndex:'nkon', flex:1},
                {text:'Поезд', dataIndex:'poezdInto.nppr', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.KontsAllDir';
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
            {text: this.btnFilter, iconCls:'filter', action:'filterKontsAll'},'-'
        ];
    }
});
