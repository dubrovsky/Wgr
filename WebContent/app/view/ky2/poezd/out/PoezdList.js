Ext.define('TK.view.ky2.poezd.out.PoezdList', {
    extend:'TK.view.ky2.poezd.BasePoezdList',
    alias:'widget.ky2poezdoutlist',
    itemId:'ky2poezdlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.splice(2, 0,
            {text:this.headerDateOut, dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.PoezdsOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.PoezdsOut';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(8, 0,
            {text: '', iconCls:'train2', action:'showPoezdsIntoDir4PoezdOutBind'},'-',
            {text: '', iconCls:'cont', action:'getPoesdAndYardForBind'},'-'
        );
    }
});
