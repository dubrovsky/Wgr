Ext.define('TK.view.ky.poezd.into.vagon.kont.AvtosOutDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyavtosoutpoezdintodir',
    itemId:'kyavtosoutpoezdintodir',

    width: 550,
    title: 'Список автомобилей по отправлению',


    buildItems: function (config) {
        config.items = [ {
            xtype: 'kybaseavtosoutdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});
