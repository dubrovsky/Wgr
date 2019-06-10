Ext.define('TK.view.ky.poezd.out.vagon.kont.KontsAllDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsallforoutdir',
    width: 650,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsalldirforout',
                selModel: {mode: 'SINGLE'},
                buildColumns: function (config) {
                    TK.view.ky.BaseKontsAllDir.prototype.buildColumns.apply(this, arguments);
                    config.columns.items.push({
                        text:'Авто', dataIndex:'avtoInto.no_avto', flex:1
                    },
                    {
                        text: 'Контейнерная площадка',
                        columns: [
                            {text: 'Сектор', dataIndex: 'ky_sector', width: 80},
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
                    });
                }
            }
        ];
    }
});
