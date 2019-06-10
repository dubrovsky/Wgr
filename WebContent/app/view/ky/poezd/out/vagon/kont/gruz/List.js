Ext.define('TK.view.ky.poezd.out.vagon.kont.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruzinpoezdoutlist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsInPoezdOut';
    }
});
