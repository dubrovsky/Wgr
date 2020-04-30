Ext.define('TK.view.ky2.poezd.into.PoezdZayavsIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdzayavsintodir',

    requires: [
        'TK.view.ky2.BasePoezdZayavsDir'
    ],

    itemId: 'ky2poezdzayavsintodir',

    width: 550,
    maxHeight: 700,
    autoScroll: true,
    title: this.title,
    config: {
        caller: undefined
    },

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdzayavsdir',
            buildStore: function (config) {
                config.store = 'ky2.PoezdZayavsDir';
            }
        }];
    }
});