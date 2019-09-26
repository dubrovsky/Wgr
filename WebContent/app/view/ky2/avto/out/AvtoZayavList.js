Ext.define('TK.view.ky2.avto.out.AvtoZayavList', {
    extend:'TK.view.ky2.avto.BaseAvtoZayavList',
    alias:'widget.ky2avtozayavoutlist',
    itemId:'ky2avtozayavlist',

    buildColumns:function (config) {
        this.callParent(arguments);
        // config.columns.items.splice(3, 0,
        //     {text:this.headerDateOut, dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        // );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtoZayavsOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtoZayavsOut';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        // config.tbar.splice(8, 0,
        //     {tooltip: this.btnToAvto, iconCls:'truck', action:'showAvtosIntoDir4AvtoOutBind'},'-' ,
        //     {tooltip: this.btnToPoezd, iconCls:'train2', action:'getAvtoAndPoezdForBind'},'-',
        //     {tooltip: this.btnToYard, iconCls:'cont', action:'getAvtoAndYardForBind'},'-',
        //     {
        //         xtype: 'splitbutton', text: 'Печать', iconCls: 'upload', action: 'print',
        //         menu: [
        //             {text: 'WZ', iconCls: 'excel', action: 'wz'}, '-'
        //         ]
        //     }
        // );
    }
});
