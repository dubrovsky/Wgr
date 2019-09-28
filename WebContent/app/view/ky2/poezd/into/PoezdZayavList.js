Ext.define('TK.view.ky2.poezd.into.PoezdZayavList', {
    extend:'TK.view.ky2.poezd.BasePoezdZayavList',
    alias:'widget.ky2poezdzayavintolist',
    itemId:'ky2poezdzayavintolist',

    title: 'Список заявок поездов по прибытию',

    buildColumns:function (config) {
        this.callParent(arguments);
    },

    buildStore: function (config) {
        config.store = 'ky2.PoezdZayavsInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.PoezdZayavsInto';
    },
    
    buildTopToolbar: function (config) {
        this.callParent(arguments);
    }
});
