Ext.define('TK.view.ky2.avto.out.PoezdZayavList', {
    extend:'TK.view.ky2.avto.BasePoezdZayavList',
    alias:'widget.ky2poezdzayavoutlist',
    itemId:'ky2poezdzayavoutlist',

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
