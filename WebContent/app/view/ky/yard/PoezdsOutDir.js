Ext.define('TK.view.ky.yard.PoezdsOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kypoezdsoutyarddir',
    itemId:'kypoezdsoutyarddir',

    width: 550,
    title: 'Список поездов и вагонов по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybasepoezdsoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
