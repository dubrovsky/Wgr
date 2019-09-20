Ext.define('TK.view.ky2.avto.into.AvtoList', {
    extend:'TK.view.ky2.avto.BaseAvtoList',
    alias:'widget.ky2avtointolist',
    itemId:'ky2avtolist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.splice(3, 0,
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
            {text: '+ Авто по отправлению', iconCls:'truck', action:'createAvtoOutFromInto'},'-',
            {tooltip: this.btnToAvto, iconCls:'truck', action:'showAvtosOutDir4AvtoIntoBind'},'-',
            {tooltip: this.btnToPoezd, iconCls:'train2', action:'getAvtoAndPoezdForBind'},'-',
            {tooltip: this.btnToYard, iconCls:'cont', action:'getAvtoAndYardForBind'},'-'
        );
    }
});
