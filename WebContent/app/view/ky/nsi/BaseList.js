Ext.define('TK.view.ky.nsi.BaseList', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasensilist',

    buildBottomToolbar: function(config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },
    buildTopToolbar: function(config) {
        this.callParent(arguments);
        config.tbar.splice(0,0,{text: 'Фильтр', iconCls:'filter', action:'filter'},'-');
    }
});
