Ext.define('TK.view.ky.BaseKontsInAvtoIntoDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontsinavtointodir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Контейнер', dataIndex:'nkon', flex:1},
                {text:'Авто', dataIndex:'avtoInto.no_avto', flex:1}

            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.KontsInAvtoIntoDir';
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
            {text: 'Фильтр', iconCls:'filter', action:'filterKontsAvtoInto'},'-'

        ];
    }
});
