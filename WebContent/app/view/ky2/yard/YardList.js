Ext.define('TK.view.ky2.yard.YardList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2yardlist',

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerSector, dataIndex: 'sector.name', width: 100},
                {
                    text: this.headerXYZ,
                    columns: [{
                        text: 'Позиция',
                        dataIndex: 'x',
                        width: 70
                    }, {
                        text: 'Ряд',
                        dataIndex: 'y',
                        width: 60
                    }, {
                        text: 'Ярус',
                        dataIndex: 'z',
                        width: 60
                    }]
                },
                {text: this.headerNKont, dataIndex: 'konts', width: 200, renderer: this.renderNkon}
                // {text:'Размещение на площадке', dataIndex:'kont.dyard', width:110, renderer: TK.Utils.renderLongStr}
            ]
        };

    },

    buildStore: function (config) {
        config.store = 'ky2.Yards';
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },

    buildTopToolbar: function (config) {
        config.tbar = [
            {text: this.btnCreate, iconCls: 'doc_new', action: 'create'}, '-',
            {text: this.btnEdit, iconCls: 'edit', action: 'edit'}, '-',
            {text: this.btnEditKont, iconCls: 'edit', action: 'editKont'}, '-'
        ];

        if (tkUser.hasPriv('CIM_DELETE')) {
            config.tbar.push({text: this.btnDelete, iconCls: 'del', action: 'delete'}, '-');
        }
        config.tbar.push({text: 'Фильтр', iconCls: 'filter', action: 'filterKontYard'}, '-');
        // config.tbar.push({text: 'Сектора', iconCls: 'edit', action: 'getYardSectors'}, '-');
    },

    renderNkon: function (value, meta) {
        var nkon = '';
        Ext.Array.each(value, function (kont) {
            nkon += kont.nkon + ' ';
        });
        return nkon;
    }
});
