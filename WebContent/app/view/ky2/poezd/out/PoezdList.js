Ext.define('TK.view.ky2.poezd.out.PoezdList', {
    extend: 'TK.view.ky2.poezd.BasePoezdList',
    alias: 'widget.ky2poezdoutlist',
    itemId: 'ky2poezdlist',

    buildColumns: function (config) {
        this.callParent(arguments);
        config.columns.items.splice(2, 0,
            {text: this.headerDateOut, dataIndex: 'dotp', width: 100, renderer: TK.Utils.renderLongStr},
            {text: 'Окончание погрузки', dataIndex: 'dpogr', width: 100, renderer: TK.Utils.renderLongStr}
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
            {tooltip: this.btnFromCar, iconCls: 'truck', action: 'getPoesdAndAvtoForBind'}, '-',
            {tooltip: this.btnFromPoezdInto, iconCls: 'train2', action: 'showPoezdsIntoDir4PoezdOutBind'}, '-',
            {tooltip: this.btnFromYard, iconCls: 'cont', action: 'getPoesdAndYardForBind'}, '-',
            {text: this.btnFromTrainByArr, iconCls: 'train', action: 'getPoezdsIntoForPoezdOut'}, '-'
            // {
            //     xtype: 'splitbutton', text: this.btnReports, iconCls: 'excel', action: 'reports',
            //     menu: [
            //         {text: this.btnReport, iconCls: 'export2Xls', action: 'showReportParams'}, '-',
            //         {text: 'DBO', iconCls:'export2Xls', action:'kartaPrzeladunkowa'},
            //         {text: 'RTSB', iconCls:'export2Xls', action:'kartaPrzeladunkowa02'},
            //         {text: this.btnWide, iconCls:'export2Xls', action:'kartaPrzeladunkowa03'},
            //         {text: 'Schenker, ATG', iconCls:'export2Xls', action:'kartaPrzeladunkowa04'},
            //         {text: this.btnUniversalMap, iconCls: 'export2Xls', action: 'xlsexport'},
            //         {text: 'R27', iconCls: 'export2Xls', action: 'r27'},
            //         {text: 'R27 (бланк)', iconCls: 'export2Xls', action: 'r27Blank'}
            //
            //     ]
            // },
            // '-'
        );
        var splitbutton = Ext.create('Ext.button.Split', {
            text: this.btnReports, iconCls: 'excel', action: 'reports',
            menu: [
                {text: this.btnReport, iconCls: 'export2Xls', action: 'showReportParams'}, '-',
                {text: 'DBO', iconCls:'export2Xls', action:'kartaPrzeladunkowa'},
                {text: 'RTSB', iconCls:'export2Xls', action:'kartaPrzeladunkowa02'},
                {text: this.btnWide, iconCls:'export2Xls', action:'kartaPrzeladunkowa03'},
                {text: 'Schenker, ATG', iconCls:'export2Xls', action:'kartaPrzeladunkowa04'},
                {text: this.btnUniversalMap, iconCls: 'export2Xls', action: 'xlsexport'}
            ]
        });

        if (tkUser.hasPriv('KY_R27')) {
            splitbutton.menu.add(
                {text: 'R27', iconCls: 'export2Xls', action:'R27'},
                {text: 'R27 (бланк)', iconCls: 'export2Xls', action: 'R27BLANK'}
            );
        }
        config.tbar.splice(16, 0, splitbutton, '-');

    }
});
