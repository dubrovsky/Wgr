Ext.define('TK.view.ky.BaseYardDir', {
    extend: 'TK.view.ky.BaseList',
    alias: 'widget.kybaseyarddir',

    selType: 'checkboxmodel',
    selModel: {mode: 'SINGLE'},
    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: 'Сектор', dataIndex: 'sector.name', flex: 1},
                {
                    text: 'Координаты',
                    columns: [
                        {
                            text: 'Позиция',
                            dataIndex: 'x',
                            width: 70
                        },
                        {
                            text: 'Ряд',
                            dataIndex: 'y',
                            width: 60
                        },
                        {
                            text: '!!!Ярус',
                            dataIndex: 'z',
                            width: 60
                        }
                    ]
                }
            ]
        };
    },
    buildStore: function (config) {
        config.store = 'ky.YardsDir';
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },
    buildTopToolbar: function(config) {
        config.tbar = [
            {text: 'Фильтр', iconCls:'filter', action:'filterYardDir'},'-',
            {
                xtype: 'buttongroup',
                columns: 4,
                title:'Дата постановки',
                items:[
                    {
                        fieldLabel:'Дата',
                        name : 'dyardDate',
                        itemId: 'dyardDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        labelWidth: 30,
                        width: 120,
                        value: new Date()
                    },{
                        fieldLabel:'Время',
                        name : 'dyardTime',
                        itemId: 'dyardTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        labelWidth: 40,
                        width: 110,
                        value: new Date()
                    },
                    {text: 'Сохранить', action:'yardPlaceForKontSave', iconCls:'save'}
                ]
            }

        ];
    }
});
