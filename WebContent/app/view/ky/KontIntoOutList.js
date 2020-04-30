Ext.define('TK.view.ky.KontIntoOutList', {
    extend: 'Ext.grid.Panel',
    alias:'widget.kykontintooutlist',

    enableColumnHide:false,
    enableColumnMove:false,
    enableColumnResize:true,
    sortableColumns:false,

    initComponent:function (config) {
        this.viewConfig = {
            stripeRows: true,
            singleSelect:true,
            emptyText: 'Нет данных'
        };

        this.store = 'kontsInAvtoPoezdYardIntoOut';

        this.columns = [{
            text:'Номер контейнера',
            dataIndex:'nkon',
            flex:1
        }, {
            text: 'Порожний?',
            dataIndex: 'poruz',
            width: 75,
            renderer: this.poruzRenderer
        }, {
            text: 'Контейнерная площадка',
            columns: [
                {text: 'Сектор', dataIndex: 'ky_sector', width:70},
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
                            width: 50
                        },
                        {
                            text: 'Ярус',
                            dataIndex: 'ky_z',
                            width: 50
                        }
                    ]
                }
            ]
        },{
            text: 'Поезд, прибытие',
            columns: [
                {
                    text: 'Поезд',
                    dataIndex: 'poezdInto.nppr',
                    width: 100
                },
                {
                    text: 'Вагон',
                    dataIndex: 'vagonInto.nvag',
                    width: 100
                }
            ]
        },{
            text: 'Поезд, отправление',
            columns: [
                {
                    text: 'Поезд',
                    dataIndex: 'poezdOut.nppr',
                    width: 100
                },
                {
                    text: 'Вагон',
                    dataIndex: 'vagonOut.nvag',
                    width: 100
                }
            ]
        }, {
            text: 'Авто',
            columns: [
                {
                    text: '!Прибытие',
                    dataIndex: 'avtoInto.no_avto',
                    width: 100
                },
                {
                    text: '!Отправление',
                    dataIndex: 'avtoOut.no_avto',
                    width: 100
                }
            ]
        }];

        this.callParent(arguments);
    },
    poruzRenderer: function(value){
       return value ? 'ДА' : 'НЕТ';
    }
});
