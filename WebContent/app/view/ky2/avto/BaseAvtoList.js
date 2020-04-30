Ext.define('TK.view.ky2.avto.BaseAvtoList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2baseavtolist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],


    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerAvtoNum, dataIndex: 'no_avto', flex: 1, maxWidth: 200},
                {text: this.headerAvtoTrail, dataIndex: 'no_trail', flex: 1, maxWidth: 100},
                {text: this.headerNKont, dataIndex: 'konts', width: 200, renderer: this.renderNkon},
                {text: this.headerDriverFam, dataIndex: 'driver_fio', flex: 1, maxWidth: 200},
                {text: this.headerPZWZ, dataIndex: 'docType', width: 60},
                {text: this.headerKontCount, dataIndex: 'kontCount', flex: 1, maxWidth: 100},
                // {text:this.headerDep, dataIndex:'departure', width:200},
                // {text:this.headerDest, dataIndex:'destination', width:200},
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
        config.tbar.splice(3, 0,
            {text: this.btnVgCt, iconCls: 'edit', action: 'editCtGr'}, '-',
            {tooltip: this.btnDocs, iconCls: 'bind', action: 'attach'}, '-'
        );
        config.tbar.splice(0, 0,
            {tooltip: this.btnFilter, iconCls: 'filter', action: 'filterAvto'}, '-'
        );
    },

    renderNkon: function (value) {
        var nkon = '';
        Ext.Array.each(value, function (kont) {
            nkon += kont.nkon + ' ';
        });
        return nkon;
    }

});
