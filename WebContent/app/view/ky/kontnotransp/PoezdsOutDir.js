Ext.define('TK.view.ky.kontnotransp.PoezdsOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kypoezdsoutnotranspdir',
    itemId:'kypoezdsoutnotranspdir',

    width: 550,
    title: 'Список поездов и вагонов по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybasepoezdsoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
