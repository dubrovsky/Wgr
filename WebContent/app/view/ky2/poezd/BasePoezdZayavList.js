Ext.define('TK.view.ky2.poezd.BasePoezdZayavList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2basepoezdzayavlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'Номер заявки', dataIndex:'noZayav', flex:1, maxWidth:200},
                {text:'Тип заявки', dataIndex:'direction', flex:1, maxWidth:100, renderer: this.rendererDirection},
                {text: 'Количество вагонов', dataIndex:'vagCount', flex:1, maxWidth:100},
                {text: 'Количество контейеров', dataIndex:'kontCount', flex:1, maxWidth:100},

                {
                    text:'Создание',
                    columns: [{
                        text: 'Дата и время',
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 100
                    }, {
                        text: 'Пользователь',
                        dataIndex: 'un',
                        renderer: this.rendererUn,
                        width: 100
                    }]
                },
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:70}
            ]
        };

    },

    buildView: function (config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect:true,
            emptyText: 'Нет данных',
            getRowClass: function(record) {
                if (record.get('kontCount') !== 0 && record.get('kontCount') === record.get('kontCountDone')) {
                    return "executed";
                }
            }
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
        config.tbar.splice(4, 0,
            {text: '+Вагон/Контейнер/Груз', iconCls:'edit', action:'editVgCtGr'},'-'
        );
    },
    rendererDirection: function(val) {
        return (val === 1) ? 'Выгрузка' : 'Погрузка';
    }
});
