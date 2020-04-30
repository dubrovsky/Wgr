Ext.define('TK.view.ky2.poezd.into.PoezdsOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2poezdsout4poezdintodir',

    requires: [
        'TK.view.ky2.BasePoezdsDir'
    ],

    itemId:'ky2poezdsout4poezdintodir',

    width: 550,
    title: 'Список поездов по отправлению',

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2basepoezdsdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});