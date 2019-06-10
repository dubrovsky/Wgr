Ext.define('TK.view.ky.BaseKontOutList', {
    extend: 'TK.view.ky.BaseKontList',
    alias:'widget.kybasekontoutlist',

    buildColumns:function (config) {
        this.callParent(arguments);

        config.columns.items.push({
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
        }, {
            text: 'Авто, прибытие',
            dataIndex: 'avtoInto.no_avto',
            width: 130
        },{
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
        });

    },

    buildTopToolbar: function(config) {
        config.tbar = [];

        var kont = {
            xtype: 'buttongroup',
            columns: 2,
            title:'Контейнер',
            itemId: 'kont',
            items:[
                {text: this.btnCreate, iconCls:'doc_new', action:'create'},
                {text: this.btnEdit, iconCls:'edit', action:'edit'}
            ]
        };

        if (tkUser.hasPriv('CIM_SAVE')) {
            kont.columns += 1;
            kont.items.push({text: 'Убрать', action:'unbindKont', iconCls:'delete1'});
        }

        if(tkUser.hasPriv('CIM_DELETE')){
            kont.columns += 1;
            kont.items.push({text: this.btnDelete, iconCls:'del', action:'delete'});
        }

        config.tbar.push(kont);

        if (tkUser.hasPriv('CIM_SAVE')) {

            config.tbar.push({
                xtype: 'buttongroup',
                columns: 4,
                title: 'Разместить с',
                itemId: 'operations',
                items: [
                    {text: 'Поезда, прибытие', action: 'kontsInPoezdIntoDir', iconCls: 'bind'},
                    {text: 'Авто, прибытие', action: 'kontsInAvtoIntoDir', iconCls: 'bind'},
                    {text: 'Контейнерной площадки', action: 'kontsInYardDir', iconCls: 'bind'},
                    {text: 'Общего списка', action: 'kontsInAllDir', iconCls: 'bind'}
                ]
            });
        }

    }
});
