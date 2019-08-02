Ext.define('TK.view.ky2.poezd.BasePoezdList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2basepoezdlist',

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
                {text:this.headerVagCount, dataIndex:'vagCount', flex:1},
                {text:this.headerKontCount, dataIndex:'kontCount', flex:1},
                {text:this.headerKoleya, dataIndex:'koleya', width:70},
                {text:this.freeSpace, flex:3}
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
        config.tbar.splice(6, 0,
            {text: '+Вагон/Контейнер/Груз', iconCls:'edit', action:'editVgCtGr'},'-'/*,
            {text: '+Разместить на поезд', iconCls:'bind', action:'editVgCtGr'},'-'*/
        );
        // config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterPoezd'},'-');
        // config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    }
});
