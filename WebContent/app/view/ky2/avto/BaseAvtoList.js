Ext.define('TK.view.ky2.avto.BaseAvtoList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2baseavtolist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text: this.headerAvtoNum, dataIndex:'no_avto', flex:1, maxWidth:200},
                {text: this.headerAvtoTrail, dataIndex:'no_trail', flex:1, maxWidth:100},
                {text: this.headerNKont, dataIndex: 'konts', width: 200, renderer: this.renderNkon},
                {text: this.headerDriverFam, dataIndex:'driver_fio', flex:1, maxWidth:200},
                {text: this.headerKontCount, dataIndex:'kontCount', flex:1, maxWidth:100},
                // {text:this.headerDep, dataIndex:'departure', width:200},
                // {text:this.headerDest, dataIndex:'destination', width:200},
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
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:70, maxWidth:100}
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
            {text: 'Контейнер/Груз', iconCls:'edit', action:'editCtGr'},'-',
            {text: 'Приложенные документы', iconCls:'bind', action:'attach'},'-'
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
