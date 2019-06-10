Ext.define('TK.view.ky.avto.into.kont.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombinavtointolist',
    itemId:'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsInAvtoInto';
    }
});
