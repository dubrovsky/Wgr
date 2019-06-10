Ext.define('TK.view.ky.BaseKontIntoList', {
    extend: 'TK.view.ky.BaseKontList',
    alias:'widget.kybasekontintolist',

    buildColumns:function (config) {
        this.callParent(arguments);

        config.columns.items.push({
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
            text: 'Авто, отправление',
            dataIndex: 'avtoOut.no_avto',
            width: 130
        });
    },

    buildTopToolbar: function(config) {
        config.tbar = [];

        var kont = {
            xtype: 'buttongroup',
            columns: 2,
            title:'Контейнер',
            items:[
                {text: this.btnCreate, iconCls:'doc_new', action:'create'},
                {text: this.btnEdit, iconCls:'edit', action:'edit'}
            ]
        };

        if(tkUser.hasPriv('CIM_DELETE')){
            kont.columns += 1;
            kont.items.push({text: this.btnDelete,iconCls:'del', action:'delete'});
        }

        config.tbar.push(kont);

        if (tkUser.hasPriv('CIM_SAVE')) {
            config.tbar.push({
                xtype: 'buttongroup',
                columns: 2,
                title: 'На контейнерной площадке',
                items: [
                    {text: 'Разместить', action: 'yardPlacesForKontList', iconCls: 'bind'},
                    {text: 'Убрать', action: 'unbindYard', iconCls: 'delete1'}
                ]
            }, {
                xtype: 'buttongroup',
                columns: 2,
                title: 'На поезд, отправление',
                items: [
                    {text: 'Разместить', action: 'poezdOutDirForKont', iconCls: 'bind'},
                    {text: 'Убрать', action: 'unbindKontInPoezdOut', iconCls: 'delete1'}
                ]
            }, {
                xtype: 'buttongroup',
                columns: 2,
                title: 'На авто, отправление',
                items: [
                    {text: 'Разместить', action: 'avtoOutDirForKont', iconCls: 'bind'},
                    {text: 'Убрать', action: 'unbindKontInAvtoOut', iconCls: 'delete1'}
                ]
            });
        }

    }
});
