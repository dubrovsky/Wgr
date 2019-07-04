Ext.define('TK.view.ky2.poezd.out.PoezdsIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2poezdsinto4poezdoutdir',
    itemId:'ky2poezdsinto4poezdoutdir',

    width: 550,
    title: 'Список поездов по прибытию',

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2basepoezdsdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});