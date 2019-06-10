Ext.define('TK.view.ky.avto.into.kont.List', {
    extend: 'TK.view.ky.BaseKontIntoList',
    alias:'widget.kykontinavtointolist',
    itemId:'kykontlist',

    buildStore: function (config) {
        config.store = 'ky.KontsInAvtoInto';
    }
});
