Ext.define('TK.view.ky.poezd.out.vagon.kont.KontsYardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontsyardoutdir',
    itemId:'kykontsyardoutdir',

    width: 550,
    title: 'Список контейнеров с контейнерной площадки',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybasekontsyarddir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
