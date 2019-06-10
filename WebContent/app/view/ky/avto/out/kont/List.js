Ext.define('TK.view.ky.avto.out.kont.List', {
    extend: 'TK.view.ky.BaseKontOutList',
    alias:'widget.kykontinavtooutlist',
    itemId:'kykontlist',

    buildStore: function (config) {
        config.store = 'ky.KontsInAvtoOut';
    }
});
