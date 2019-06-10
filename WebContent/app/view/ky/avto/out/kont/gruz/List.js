Ext.define('TK.view.ky.avto.out.kont.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruzinavtooutlist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsInAvtoOut';
    }
});
