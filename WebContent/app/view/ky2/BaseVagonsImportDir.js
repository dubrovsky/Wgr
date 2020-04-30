Ext.define('TK.view.ky2.BaseVagonsImportDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2basevagonsimportdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: 'Номер вагона', dataIndex: 'nvag', flex: 1},
                {text: 'Номер контейнера', dataIndex: 'nkon', flex: 1},
                {text: 'Номер накладной', dataIndex: 'smgs', flex: 1},
                {text: 'Получатель', dataIndex: 'npol', flex: 1}
            ]
        };
    },
    buildStore: function (config) {
        config.store = 'ky2.VagonsImportDir';
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: 'Выбрать', action: 'getVagonsForImport', iconCls: 'check1'}, '-',
            {xtype: 'label', itemId: 'vagContAll', text: '', margin: '0 0 0 20'},
            {xtype: 'label', itemId: 'vagContSel', text: '', margin: '0 0 0 10'}
        ];
    }
});
