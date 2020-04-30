Ext.define('TK.view.ky2.poezd.BasePoezdZayavList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2basepoezdzayavlist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],


    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerOrderNum, dataIndex: 'noZayav', flex: 1, maxWidth: 200},
                {text: this.headerTrainNum, dataIndex: 'npprm', flex: 1, maxWidth: 100},
                {text: this.headerClient, dataIndex: 'gruzotpr', flex: 1, maxWidth: 100},
                {
                    text: this.headerOrderType,
                    dataIndex: 'direction',
                    flex: 1,
                    maxWidth: 100,
                    renderer: this.rendererDirection
                },
                {text: this.headerWagonQuantity, dataIndex: 'vagCount', flex: 1, maxWidth: 100},
                {text: this.headerContainerQuantity, dataIndex: 'kontCount', flex: 1, maxWidth: 100},

                {
                    text: this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 105
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
            ]
        };

    },

    buildView: function (config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect: true,
            emptyText: this.noData,
            getRowClass: function (record) {
                if (record.get('kontCount') !== 0 && record.get('kontCount') === record.get('kontCountDone')) {
                    return "executed";
                }
            }
        };
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200, 1000] })],
            displayInfo: true
        };
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(0, 0,
            {tooltip: this.btnFilter, iconCls: 'filter', action: 'filterPoezdZayav'}, '-'
        );
        config.tbar.splice(6, 0,
            {text: this.btnVgCtGr, iconCls: 'edit', action: 'editVgCtGr'}, '-'
        );
    },
    rendererDirection: function (val) {
        return (val === 1) ? 'Выгрузка' : 'Погрузка';
    }
});
