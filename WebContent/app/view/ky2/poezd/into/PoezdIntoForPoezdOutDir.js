Ext.define('TK.view.ky2.poezd.into.PoezdIntoForPoezdOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdintoforpoezdoutdir',

    requires: [
        'TK.view.ky2.poezd.BasePoezdIntoForPoezdOut'
    ],

    config: {
        isYardTreepanel: undefined
    },

    itemId: 'ky2poezdintoforpoezdoutdir',

    width: 400,
    maxHeight: 700,
    autoScroll: true,
    title: this.title,

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdintoforpoezdout',
            buildStore: function (config) {
                config.store = 'ky2.PoezdIntoForPoezdOutDir';
            }
        }];
    }
});