Ext.define('TK.view.ky.avto.into.kont.AvtosOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyavtosoutavtointodir',
    itemId:'kyavtosoutavtointodir',

    width: 550,
    title: 'Список автомобилей по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybaseavtosoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
