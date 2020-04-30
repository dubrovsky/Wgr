Ext.define('TK.view.ky2.poezd.into.PoezdList', {
    extend:'TK.view.ky2.poezd.BasePoezdList',
    alias:'widget.ky2poezdintolist',

    requires: [],

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
        config.tbar.splice(2, 0,
            {text: this.btnCreateFromOrder, iconCls: 'train', action: 'getZajavIntoForPoezdInto'}, '-'
        );

        config.tbar.splice(10, 0,
            {tooltip: this.btnOnTrack, iconCls: 'truck', action: 'getPoesdAndAvtoForBind'}, '-',
            {tooltip: this.btnToPoezdOut, iconCls: 'train2', action: 'showPoezdsOutDir4PoezdIntoBind'}, '-',
            {tooltip: this.btnToYard, iconCls: 'cont', action: 'getPoesdAndYardForBind', itemId: 'yard'}, '-',
            {text: this.btnAddTrain, iconCls: 'train', action: 'getPoezdIntoForPoezdOut'}, '-',
            // {text: this.btnReport, iconCls: 'export2Xls', action: 'showReportParams'}, '-',
            {
                xtype: 'splitbutton', text: this.btnReports, iconCls: 'excel', action: 'reports',
                menu: [
                    {text: this.btnReport, iconCls: 'export2Xls', action: 'showReportParams'}, '-',
                    {text: this.btnUniversalMap, iconCls: 'export2Xls', action: 'xlsexport'}

                ]
            }
        );
    }
});
