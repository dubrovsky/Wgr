Ext.define('TK.view.ky.yard.AvtosOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyavtosoutyarddir',
    itemId:'kyavtosoutyarddir',

    width: 550,
    title: 'Список автомобилей по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybaseavtosoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
