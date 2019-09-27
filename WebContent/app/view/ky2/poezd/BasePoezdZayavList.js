Ext.define('TK.view.ky2.poezd.BasePoezdZayavList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2basepoezdzayavlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'Номер заявки', dataIndex:'noZayav', flex:1, maxWidth:200},
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
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:70}
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
        config.tbar.splice(3, 0,
            {text: '+Вагон/Контейнер/Груз', iconCls:'edit', action:'editVgCtGr'},'-'
        );
    }
});
