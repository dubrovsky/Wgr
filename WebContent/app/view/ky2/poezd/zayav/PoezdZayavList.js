Ext.define('TK.view.ky2.poezd.zayav.PoezdZayavList', {
    extend:'TK.view.ky2.poezd.BasePoezdZayavList',
    alias:'widget.ky2poezdzayavlist',
    itemId:'ky2poezdzayavlist',

    title: this.title,

    buildColumns:function (config) {
        this.callParent(arguments);
    },

    buildStore: function (config) {
        config.store = 'ky2.PoezdZayavs';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.PoezdZayavs';
    },
    
    buildTopToolbar: function (config) {
        this.callParent(arguments);
    }
});
