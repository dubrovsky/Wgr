Ext.define('TK.view.ky2.avto.into.AvtoZayavsIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2avtozayavsintodir',
    itemId:'ky2avtozayavsintodir',

    width: 550,
    title: 'Список заявок на выгрузку',

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2baseavtozayavsdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});