Ext.define('TK.view.ky.poezd.BasePoezdList', {
    extend:'TK.view.ky.BaseList',
    alias:'widget.kybasepoezdlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
                {
                    text:this.headerCreation,
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
                {text:this.headerPoezdNum, dataIndex:'nppr', flex:1},
                {text:this.headerKoleya, dataIndex:'koleya', width:70}
            ]
        };

    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            displayInfo: true
        };
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);

        config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterPoezd'},'-');
        config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    }
});
