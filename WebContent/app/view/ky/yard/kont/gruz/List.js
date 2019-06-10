Ext.define('TK.view.ky.yard.kont.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruzinyardlist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsInYard';
    }
});
