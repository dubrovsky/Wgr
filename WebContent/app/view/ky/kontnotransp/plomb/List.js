Ext.define('TK.view.ky.kontnotransp.plomb.List', {
    extend: 'TK.view.ky.BasePlombList',
    alias:'widget.kyplombnotransplist',
    itemId: 'kyplomblist',

    buildStore:function (config) {
        config.store = 'ky.PlombsNoTrasp';
    }
});
