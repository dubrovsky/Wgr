Ext.define('TK.view.ky2.avto.into.AvtosOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2avtosout4avtointodir',
    itemId:'ky2avtosout4avtointodir',

    width: 550,
    title: 'Список авто по отправлению',

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2baseavtosdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});