Ext.define('TK.view.ky.poezd.out.ListForPoezd', {
    extend: 'TK.view.ky.poezd.BaseListForPoezd',
    alias:'widget.kylistforpoezdout',

    buildItems: function (config) {
        this.callParent(arguments);

        config.items[0].columns.splice(3, 0, {
            text: 'Поезд, прибытие',
            columns: [
                {
                    text: 'Поезд',
                    dataIndex: 'npprInto',
                    width: 100
                },
                {
                    text: 'Вагон',
                    dataIndex: 'nvagInto',
                    width: 100
                }
            ]
        },{
            text: 'Авто, прибытие',
            dataIndex: 'avtoInto',
            width: 130
        });
    }
});