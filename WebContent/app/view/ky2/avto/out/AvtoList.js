Ext.define('TK.view.ky2.avto.out.AvtoList', {
    extend:'TK.view.ky2.avto.BaseAvtoList',
    alias:'widget.ky2avtooutlist',
    itemId:'ky2avtolist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:this.headerDateOut, dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtosOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtosOut';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(8, 0,
            {text: '+ На авто по приб.', iconCls:'bind', action:'showAvtosIntoDir4AvtoOutBind'},'-',
            {text: '+ На поезд по приб.', iconCls:'bind', action:'showPoezdsIntoDir4PoezdOutBind'},'-',
            {text: '+ На конт. площадку', iconCls:'bind', action:'getPoesdAndYardForBind'},'-'
        );
    }
});
