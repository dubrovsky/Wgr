Ext.define('TK.view.ky.kontnotransp.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruznotransplist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsNoTrasp';
    }
});
