Ext.define('TK.view.ky.BaseKontsInPoezdIntoDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontsinpoezdintodir',

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
        config.store = 'ky.KontsIntoDir';
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
            {text: 'Фильтр', iconCls:'filter', action:'filterKontsInto'},'-'
        ];
    }
});
