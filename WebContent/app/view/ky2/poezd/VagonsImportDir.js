Ext.define('TK.view.ky2.poezd.VagonsImportDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2vagonsimportdir',
    itemId: 'ky2vagonsimportdir',

    width: 600,
    height: 700,
    layout: 'fit',
    title: 'Список вагонов для импорта',

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basevagonsimportdir',
            selModel: {mode: 'SIMPLE'}
        }];
    }
});