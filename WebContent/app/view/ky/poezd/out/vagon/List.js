Ext.define('TK.view.ky.poezd.out.vagon.List', {
    extend: 'TK.view.ky.poezd.BaseVagonList',
    alias:'widget.kyvagonoutlist',
    itemId:'kyvagonlist',

    buildStore: function (config) {
        config.store = 'ky.VagonsOut';
    }
});
