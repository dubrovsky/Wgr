Ext.define('TK.view.ky.poezd.into.vagon.kont.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombinpoezdintolist',
    itemId:'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsInPoezdInto';
    }
});
