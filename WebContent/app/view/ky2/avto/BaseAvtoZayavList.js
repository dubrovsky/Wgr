Ext.define('TK.view.ky2.avto.BaseAvtoZayavList', {
    extend:'TK.view.ky2.BaseList',
    alias:'widget.ky2basezayavavtolist',
    title: 'Список заявок на авто',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'Номер заявки', dataIndex:'no_zayav', flex:1, maxWidth:200},
                {text:'Номер авто', dataIndex:'no_avto', flex:1, maxWidth:200},
                {text: 'Номер контейнера', dataIndex: 'konts', width: 200, renderer: this.renderNkon},
                {text:'Тип заявки', dataIndex:'direction', flex:1, maxWidth:100, renderer: this.rendererDirection},
                // {text:this.headerAvtoTrail, dataIndex:'no_trail', flex:1, maxWidth:100},
                // {text:this.headerDriverFam, dataIndex:'driver_fio', flex:1, maxWidth:200},
                // {text:this.headerKontCount, dataIndex:'kontCount', flex:1, maxWidth:100},
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

    buildStore: function (config) {
        config.store = 'ky2.AvtoZayavsBase';
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            displayInfo: true
        };
        config.bbar.store = 'ky2.AvtoZayavsBase';

    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(3, 0,
            {text: '+Контейнер/Груз', iconCls:'edit', action:'editCtGr'},'-',
            {text: 'Приложенные документы', iconCls:'bind', action:'attach'},'-'
        );
        // config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterPoezd'},'-');
        // config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    },

    rendererDirection: function(val) {
        return (val === 1) ? 'Выгрузка' : 'Погрузка';
    },

    renderNkon: function (value) {
        var nkon = '';
        Ext.Array.each(value, function (kont) {
            nkon += kont.nkon + ' ';
        });
        return nkon;
    }




});
