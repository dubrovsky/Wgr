Ext.define('TK.view.ky2.BasePoezdsImportDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2basepoezdsimportdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: 'Поезд', dataIndex: 'n_poezd', flex: 1},
                {text: 'Дата', dataIndex: 'dattr', flex: 1, renderer: TK.Utils.renderLongStr},
                {text: 'Ведомость', dataIndex: 'ved_nomer', flex: 1},
                {text: 'Станция', dataIndex: 'sto_f', flex: 2, renderer: TK.Utils.renderLongStr},
                {text: 'Кол. ваг.', dataIndex: 'count_nvag', flex: 1}
            ]
        };
    },
    buildStore: function (config) {
        config.store = 'ky2.PoezdsImportDir';
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: 'Выбрать', action: 'getPoesdsForImport', iconCls: 'check1'}, '-'
        ];
    }
});
