Ext.define('TK.view.ky.poezd.out.List', {
    extend:'TK.view.ky.poezd.BasePoezdList',
    alias:'widget.kypoezdoutlist',
    itemId:'kypoezdlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:this.headerDateIn, dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky.PoezdsOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky.PoezdsOut';
    }
});
