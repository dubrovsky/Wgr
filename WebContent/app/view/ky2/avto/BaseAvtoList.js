Ext.define('TK.view.ky2.avto.BaseAvtoList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2baseavtolist',

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
                {text:this.headerAvtoNum, dataIndex:'no_avto', flex:1},
                {text:this.headerAvtoTrail, dataIndex:'no_trail', width:100},
                {text:this.headerDep, dataIndex:'departure', width:200},
                {text:this.headerDest, dataIndex:'destination', width:200}
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
            {text: '+Контейнер/Груз', iconCls:'edit', action:'editCtGr'},'-'/*,
            {text: '+Разместить на поезд', iconCls:'bind', action:'editVgCtGr'},'-'*/
        );
        // config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterPoezd'},'-');
        // config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    }
});
