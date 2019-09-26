Ext.define('TK.view.ky2.poezd.BasePoezdIntoForPoezdOut', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2basepoezdintoforpoezdout',

    selType: 'checkboxmodel',
    selModel: {mode: 'MULTI'},

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: '№ Вагона', dataIndex: 'nvag', flex: 1}
            ]
        };
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: 'Выбрать', action: 'createPoezdOutFromPoezdInto', iconCls: 'check1'}, '-'
        ];
    }
});
