Ext.define('TK.view.ky.avto.out.kont.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombinavtooutlist',
    itemId:'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsInAvtoOut';
    }
});
