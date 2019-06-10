Ext.define('TK.view.ky.poezd.BaseListForPoezd', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kybaselistforpoezd',

    width: 1000,
    maxHeight: 500,
    title: 'Список по поезду',
    bodyPadding: 5,

    buildItems: function (config) {
        config.items = [{
            xtype:'grid',
            store: Ext.create('Ext.data.ArrayStore', {
                model: 'TK.model.ky.ListForPoezd'
            }),
            columns: [
                //Ext.create('Ext.grid.RowNumberer'),
                //{text: '', width: 30, dataIndex: 'numpp'},
                {text: "Номер вагона", flex: 1, dataIndex: 'nvag'},
                {text: "Номер контейнера", flex: 1, dataIndex: 'nkon'},
                {text: "Порожний?", flex: 1, dataIndex: 'poruz',
                    renderer: function (value) {
                        return value === "true" ? "ДА" : "НЕТ";
                    }
                },{
                    text: 'Контейнерная площадка',
                    columns: [
                        {text: 'Сектор', dataIndex: 'kySector', width:70},
                        {
                            text: 'Координаты',
                            columns: [
                                {
                                    text: 'Позиция',
                                    dataIndex: 'kyX',
                                    width: 70
                                },
                                {
                                    text: 'Ряд',
                                    dataIndex: 'kyY',
                                    width: 50
                                },
                                {
                                    text: 'Ярус',
                                    dataIndex: 'kyZ',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ],
            enableColumnHide:false,
            enableColumnMove:false,
            enableColumnResize:true,
            sortableColumns:false,
            viewConfig: {
                stripeRows: true,
                singleSelect:true,
                emptyText: 'Нет данных'
            }

        },{
            xtype: 'displayfield',
            fieldLabel: 'Количество вагонов',
            labelWidth: 150,
            itemId:'vagSum'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Количество контейнеров',
            labelWidth: 150,
            itemId:'kontSum'
        }];
    }
});