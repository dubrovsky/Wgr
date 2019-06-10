Ext.define('TK.view.ky.avto.into.kont.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruzinavtointolist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsInAvtoInto';
    }
});
