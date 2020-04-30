Ext.define('TK.view.ky.avto.into.kont.PoezdsOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kypoezdsoutavtointodir',

    requires: [
        'TK.view.ky.BasePoezdsOutDir'
    ],

    itemId:'kypoezdsoutavtointodir',

    width: 550,
    title: 'Список поездов и вагонов по отправлению',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasepoezdsoutdir',
            selModel: {mode: 'SINGLE'}
        }];
    }
});
