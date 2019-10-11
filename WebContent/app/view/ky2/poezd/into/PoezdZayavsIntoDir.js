Ext.define('TK.view.ky2.poezd.into.PoezdZayavsIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdzayavsintodir',
    itemId: 'ky2poezdzayavsintodir',

    width: 550,
    maxHeight: 700,
    autoScroll: true,
    title: 'Список заявок по прибытию',

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdzayavsdir',
            buildStore: function (config) {
                config.store = 'ky2.PoezdZayavsDir';
            }
        }];
    }
});