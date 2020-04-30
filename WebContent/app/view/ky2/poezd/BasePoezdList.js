Ext.define('TK.view.ky2.poezd.BasePoezdList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2basepoezdlist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerPoezdNumM, dataIndex: 'npprm', width: 150},
                {text: this.headerPoezdNum, dataIndex: 'nppr', width: 150},
                {text: this.headerVagCount, dataIndex: 'vagCount', flex: 1, maxWidth: 100},
                {text: this.headerKontCount, dataIndex: 'kontCount', flex: 1, maxWidth: 100},
                {
                    text: this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 100
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
                        renderer: this.rendererUn,
                        width: 100
                    }]
                },
                {text: 'ID', dataIndex: 'hid', flex: 1, maxWidth: 100, minWidth: 70},
                {
                    text: 'Сообщения',
                    dataIndex: 'messCount',
                    flex: 1,
                    maxWidth: 100,
                    minWidth: 70,
                    renderer: TK.Utils.renderMessCount
                }
                // ,{text:this.headerKoleya, dataIndex:'koleya', width:70},
                // {text:this.freeSpace, flex:3}
            ]
        };

    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            plugins: [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options: [20, 50, 100, 200, 1000]})],
            displayInfo: true
        };
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        /*config.tbar.splice(6, 0,
            {   xtype: 'splitbutton', text: 'Отчеты', iconCls: 'excel', action: 'reports',
                menu: [
                    {text: 'Отчет', iconCls:'export2Xls', action:'showReportParams'}, '-',
                    {text: 'Карта перегруза 1', iconCls:'export2Xls', action:'kartaPrzeladunkowa'},
                    {text: 'Карта перегруза 2', iconCls:'export2Xls', action:'kartaPrzeladunkowa02'}
                ]
            },
            '-'
        );   */
        config.tbar.splice(0, 0,
            {tooltip: this.btnFilter, iconCls: 'filter', action: 'filterPoezd'}, '-'
        );
        config.tbar.splice(6, 0,
            {text: this.btnVgCtGr, iconCls: 'edit', action: 'editVgCtGr'}, '-'
        );
    }
});
