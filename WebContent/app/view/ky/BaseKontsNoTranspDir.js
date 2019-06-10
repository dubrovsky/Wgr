Ext.define('TK.view.ky.BaseKontsNoTranspDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontsnotranspdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Контейнер', dataIndex:'nkon', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.KontsNoTranspDir';
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
            {text: 'Фильтр', iconCls:'filter', action:'filterKontsNoTransp'},'-',
            {text: 'Сохранить', action:'kontsNoSave', iconCls:'save'}
        ];
    }
});
