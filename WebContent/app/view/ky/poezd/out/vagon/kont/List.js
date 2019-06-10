Ext.define('TK.view.ky.poezd.out.vagon.kont.List', {
    extend: 'TK.view.ky.BaseKontOutList',
    alias:'widget.kykontinpoezdoutlist',
    itemId:'kykontlist',

    buildStore: function (config) {
        config.store = 'ky.KontsInPoezdOut';
    }
});
