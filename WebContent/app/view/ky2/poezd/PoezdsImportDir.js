Ext.define('TK.view.ky2.poezd.PoezdsImportDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdsimportdir',
    itemId: 'ky2poezdsimportdir',

    width: 600,
    height: 700,
    autoScroll: true,
    title: 'Список поездов для импорта',

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdsimportdir',
            selModel: {mode: 'SINGLE'}
        }];
    }
});