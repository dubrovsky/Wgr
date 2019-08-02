Ext.define('TK.view.ky2.avto.out.AvtosIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2avtosinto4avtooutdir',
    itemId:'ky2avtosinto4avtooutdir',

    width: 550,
    title: 'Список авто по прибытию',

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2baseavtosdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});