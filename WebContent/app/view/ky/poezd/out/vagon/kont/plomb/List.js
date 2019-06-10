Ext.define('TK.view.ky.poezd.out.vagon.kont.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombinpoezdoutlist',
    itemId:'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsInPoezdOut';
    }
});
