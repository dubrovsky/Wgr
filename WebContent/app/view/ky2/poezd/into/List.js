Ext.define('TK.view.ky2.poezd.into.List', {
    extend:'TK.view.ky2.poezd.BasePoezdList',
    alias:'widget.ky2poezdintolist',
    itemId:'ky2poezdlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:this.headerDateIn, dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.PoezdsInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.PoezdsInto';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(6, 0, {text: this.btnCreateVags, iconCls:'doc_new', action:'createVags'},'-');
        config.tbar.splice(8, 0, {text: this.btnEditVags, iconCls:'edit', action:'editVags'},'-');
        // config.tbar.splice(config.tbar.length - 3, 0, {text: 'Создать поезд по отправлению', iconCls:'train', action:'createPoezdOutFromInto'},'-');
    }
});
