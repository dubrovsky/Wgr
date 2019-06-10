Ext.define('TK.view.ky.avto.out.kont.KontsYardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontsyardavtooutdir',
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
