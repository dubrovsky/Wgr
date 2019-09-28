Ext.define('TK.view.ky2.poezd.out.PoezdZayavList', {
    extend:'TK.view.ky2.poezd.BasePoezdZayavList',
    alias:'widget.ky2poezdzayavoutlist',
    itemId:'ky2poezdzayavoutlist',

    title: 'Список заявок поездов по отправлению',

    buildColumns:function (config) {
        this.callParent(arguments);
    },

    buildStore: function (config) {
        config.store = 'ky2.PoezdZayavsOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.PoezdZayavsOut';
    },

    buildTopToolbar: function (config) {
        this.callParent(arguments);
    }
});
