Ext.define('TK.view.ky2.BasePoezdsImportDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2basepoezdsimportdir',

    requires: [
        'TK.Utils'
    ],


    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.columnTrain, dataIndex: 'n_poezd', flex: 1},
                {text: this.columnDate, dataIndex: 'dattr', flex: 1, renderer: TK.Utils.renderLongStr},
                {text: this.columnVed, dataIndex: 'ved_nomer', flex: 1},
                {text: this.columnVagQuantity, dataIndex: 'count_nvag', flex: 1},
                {text: this.coumnKontQuantity, dataIndex: 'count_nkon', flex: 1}
            ]
        };
    },
    buildStore: function (config) {
        config.store = 'ky2.PoezdsImportDir';
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: this.btnFilter, iconCls: 'filter', action: 'filterPPV'}, '-',
            {text: this.btnChoose, action: 'getPoesdsForImport', iconCls: 'check1'}, '-'
        ];
    }
});
