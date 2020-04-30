Ext.define('TK.view.ky.avto.BaseAvtoList', {
    extend:'TK.view.ky.BaseList',
    alias:'widget.kybaseavtolist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],


    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
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
                {text:'Номер', dataIndex:'no_avto', flex:1}/*,
                {text:'Прибытие', dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}*/
            ]
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

        config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterAvto'},'-');
        config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    }
});
