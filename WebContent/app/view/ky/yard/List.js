Ext.define('TK.view.ky.yard.List', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kyyardlist',

    requires: [
        'TK.Utils'
    ],


    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerSector, dataIndex:'sector.name', width:100},
                {
                    text: this.headerXYZ,
                    columns: [{
                        text: 'Позиция',
                        dataIndex: 'x',
                        width: 70
                    },{
                        text: 'Ряд',
                        dataIndex: 'y',
                        width: 60
                    },{
                        text: 'Ярус',
                        dataIndex: 'z',
                        width: 60
                    }]
                },
                {text:this.headerNKont, dataIndex:'kont.nkon', flex:1},
                {text:'Размещение на площадке', dataIndex:'kont.dyard', width:110, renderer: TK.Utils.renderLongStr}
            ]
        };

    },

    buildStore:function (config) {
        config.store = 'ky.Yards';
    },

    buildBottomToolbar: function(config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },

    buildTopToolbar: function(config) {
//        this.callParent(arguments);
        config.tbar = [];

        config.tbar.push({
            xtype: 'buttongroup',
            columns: 2,
            title:'Разместить С прибытия',
            items:[
                {text: 'Поезда', action:'kontsForYardListFromPoezdInto', iconCls:'bind'},
                {text: 'Авто', action:'kontsForYardListFromAvtoInto', iconCls:'bind'},
                //{text: 'Списка контейнеров', action:'kontsForYardListFromNoTransp', iconCls:'bind'},
                {text: 'Общего списка', action:'kontsForYardListFromAll', iconCls:'bind'}
            ]
        },{
            xtype: 'buttongroup',
            columns: 1,
            title:'Разместить НА отправление',
            width: 160,
            items:[
                {text: 'Поезд', action:'poezdOutDirForKont', iconCls:'bind'},
                {text: 'Авто', action:'avtoOutDirForKont', iconCls:'bind'}
            ]
        });

        var kont = {
            xtype: 'buttongroup',
            columns: 2,
            title:'Контейнер',
            items:[
                {text: 'Переставить', action:'kontReposition', iconCls:'change'},
                {text: 'Убрать', action:'unbindKont', iconCls:'delete1'},
                {text: this.btnCreate, iconCls:'doc_new', action:'createKont'},
                {text: this.btnEdit, iconCls:'edit', action:'editKont'}
            ]
        };

        if(tkUser.hasPriv('CIM_DELETE')){
            kont.columns += 1;
            kont.items.push({text: this.btnDelete, iconCls:'del', action:'delKont'});
        }

        config.tbar.push(kont);

        var place = {
            xtype: 'buttongroup',
            columns: 2,
            title:'Место',
            items:[
                {text: 'Фильтр', iconCls:'filter', action:'filterKontYard'},
                {text: this.btnCreate, iconCls:'doc_new', action:'create'},
                {text: this.btnEdit, iconCls:'edit', action:'edit'},
                {text: 'Графика', iconCls:'cont1', action:'grafYard'}
            ]
        };

        if(tkUser.hasPriv('CIM_DELETE')){
            place.columns += 1;
            place.items.push({text: this.btnDelete,iconCls:'del', action:'delete'});
        }

        config.tbar.push(place);
        config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});

    }

});
