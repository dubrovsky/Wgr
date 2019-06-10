Ext.define('TK.view.ky.poezd.into.vagon.List', {
    extend: 'TK.view.ky.poezd.BaseVagonList',
    alias:'widget.kyvagonintolist',
    itemId:'kyvagonlist',

    buildStore: function (config) {
        config.store = 'ky.VagonsInto';
    }
});
