Ext.define('TK.view.ky2.poezd.PoezdsImportDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdsimportdir',

    requires: [
        'TK.view.ky2.BasePoezdsImportDir'
    ],

    itemId: 'ky2poezdsimportdir',

    width: 600,
    height: 700,
    layout: 'fit',
    title: this.title,

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdsimportdir',
            selModel: {mode: 'SINGLE'}
        }];
    }
});