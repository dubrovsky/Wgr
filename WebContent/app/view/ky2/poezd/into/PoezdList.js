Ext.define('TK.view.ky2.poezd.into.PoezdList', {
    extend:'TK.view.ky2.poezd.BasePoezdList',
    alias:'widget.ky2poezdintolist',
    itemId:'ky2poezdlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.splice(2, 0,
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
        config.tbar.splice(8, 0,
            {text: this.btnToPoezdOut, iconCls:'bind', action:'showPoezdsOutDir4PoezdIntoBind'},'-',
            {text: this.btnToYard, iconCls:'bind', action:'getPoesdAndYardForBind'},'-',
            {text: '+ Поезд по отправлению', iconCls:'train', action:'createPoezdOutFromInto'},'-'
        );
    }
});
