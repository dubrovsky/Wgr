Ext.define('TK.view.ky2.poezd.out.PoezdZayavsOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdzayavsoutdir',
    itemId: 'ky2poezdzayavsoutdir',

    width: 550,
    maxHeight: 700,
    autoScroll: true,
    title: 'Список заявок по отправлению',

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdzayavsdir',
            buildStore: function (config) {
                config.store = 'ky2.PoezdZayavsDir';
            }
        }];
    }
});