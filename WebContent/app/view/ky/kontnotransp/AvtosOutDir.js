Ext.define('TK.view.ky.kontnotransp.AvtosOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyavtosoutnotranspdir',
    itemId:'kyavtosoutnotranspdir',

    width: 550,
    title: 'Список автомобилей по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybaseavtosoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
