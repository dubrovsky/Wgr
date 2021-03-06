Ext.define('TK.view.ky2.avto.into.AvtoZayavList', {
    extend:'TK.view.ky2.avto.BaseAvtoZayavList',
    alias:'widget.ky2avtozayavintolist',
    itemId:'ky2avtozayavlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        // config.columns.items.splice(3, 0,
        //     {text:this.headerDateIn, dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        // );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtoZayavsInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtoZayavsInto';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        // config.tbar.splice(8, 0,
        //     {text: '+ Авто по отправлению', iconCls:'truck', action:'createAvtoOutFromInto'},'-',
        //     {text: 'Копия', iconCls:'copy', action:'copyAvtoIntoToInto'},'-',
        //     {tooltip: this.btnToAvto, iconCls:'truck', action:'showAvtosOutDir4AvtoIntoBind'},'-',
        //     {tooltip: this.btnToPoezd, iconCls:'train2', action:'getAvtoAndPoezdForBind'},'-',
        //     {tooltip: this.btnToYard, iconCls:'cont', action:'getAvtoAndYardForBind'},'-',
        //     {
        //         xtype: 'splitbutton', text: 'Печать', iconCls: 'upload', action: 'print',
        //         menu: [
        //             {text: 'PZ', iconCls: 'excel', action: 'pz'}, '-'
        //         ]
        //     }
        // );
    }
});
