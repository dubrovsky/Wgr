Ext.define('TK.view.ky.poezd.into.List', {
    extend:'TK.view.ky.poezd.BasePoezdList',
    alias:'widget.kypoezdintolist',
    itemId:'kypoezdlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:this.headerDateIn, dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky.PoezdsInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky.PoezdsInto';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);

        config.tbar.splice(config.tbar.length - 3, 0, {text: 'Создать поезд по отправлению', iconCls:'train', action:'createPoezdOutFromInto'},'-');
    }
});
