Ext.define('TK.view.ky.poezd.into.ListForPoezd', {
    extend: 'TK.view.ky.poezd.BaseListForPoezd',
    alias:'widget.kylistforpoezdinto',

    buildItems: function (config) {
        this.callParent(arguments);

        config.items[0].columns.push({
            text: 'Поезд, отправление',
            columns: [
                {
                    text: 'Поезд',
                    dataIndex: 'npprOut',
                    width: 100
                },
                {
                    text: 'Вагон',
                    dataIndex: 'nvagOut',
                    width: 100
                }
            ]
        },{
            text: 'Авто, отправление',
            dataIndex: 'avtoOut',
            width: 130
        });
    }
});