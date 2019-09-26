Ext.define('TK.view.ky2.poezd.into.PoezdIntoForPoezdOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdintoforpoezdoutdir',
    itemId: 'ky2poezdintoforpoezdoutdir',

    width: 400,
    maxHeight: 700,
    autoScroll: true,
    title: 'Список вагонов для поезда по отправлению',

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdintoforpoezdout',
            buildStore: function (config) {
                config.store = 'ky2.PoezdIntoForPoezdOutDir';
            }
        }];
    }
});