Ext.define('TK.view.ky2.avto.into.AvtoList', {
    extend:'TK.view.ky2.avto.BaseAvtoList',
    alias:'widget.ky2avtointolist',
    itemId:'ky2avtolist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:this.headerDateIn, dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtosInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtosInto';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(8, 0,
            {text: '+ На авто по отпр.', iconCls:'bind', action:'showAvtosOutDir4AvtoIntoBind'},'-',
            {text: '+ На поезд по отпр.', iconCls:'bind', action:'showPoezdsOutDir4PoezdIntoBind'},'-',
            {text: '+ На конт. площадку', iconCls:'bind', action:'getPoesdAndYardForBind'},'-'
        );
    }
});
