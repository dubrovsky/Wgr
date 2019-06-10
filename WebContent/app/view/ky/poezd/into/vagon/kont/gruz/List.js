Ext.define('TK.view.ky.poezd.into.vagon.kont.gruz.List', {
    extend: 'TK.view.ky.BaseGruzList',
    alias:'widget.kygruzinpoezdintolist',
    itemId:'kygruzlist',

    buildStore:function (config) {
        config.store = 'ky.GruzsInPoezdInto';
    }
});
