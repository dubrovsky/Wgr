Ext.define('TK.view.ky.poezd.into.vagon.kont.PoezdsOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kypoezdsoutpoezdintodir',

    requires: [
        'TK.view.ky.BasePoezdsOutDir'
    ],

    itemId:'kypoezdsoutpoezdintodir',

    width: 550,
    title: 'Список поездов и вагонов по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybasepoezdsoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
