Ext.define('TK.view.ky.yard.kont.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombinyardlist',
    itemId:'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsInYard';
    }
});
