Ext.define('TK.view.ky.BaseKontsYardDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontsyarddir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Контейнер', dataIndex:'nkon', flex:1},
                {text: 'Сектор', dataIndex: 'ky_sector', flex: 1},
                {
                    text: 'Координаты',
                    columns: [
                        {
                            text: 'Позиция',
                            dataIndex: 'ky_x',
                            width: 70
                        },
                        {
                            text: 'Ряд',
                            dataIndex: 'ky_y',
                            width: 60
                        },
                        {
                            text: 'Ярус',
                            dataIndex: 'ky_z',
                            width: 60
                        }
                    ]
                }
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.KontsYardDir';
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
            {text: 'Фильтр', iconCls:'filter', action:'filterKontsYard'},'-',
            {
                xtype: 'buttongroup',
                columns: 4,
                title:'Дата отправления',
                items:[
                    {
                        fieldLabel:'Дата',
                        name : 'dotpDate',
                        itemId: 'dotpDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        labelWidth: 30,
                        width: 120
                    },{
                        fieldLabel:'Время',
                        name : 'dotpTime',
                        itemId: 'dotpTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        labelWidth: 40,
                        width: 110
                    },
                    {text: 'Сохранить', action:'kontsYardForPoezdSave', iconCls:'save'}
                ]
            }
        ];
    }
});
