Ext.define('TK.view.ky.kontnotransp.List', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kykontnotransplist',
    itemId: 'kykontlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'ID', dataIndex:'hid', flex:1, maxWidth:100, minWidth:50},
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
                {text:this.headerKontNum, dataIndex:'nkon', flex:1}
            ]
        };
    },

    buildStore:function (config) {
        config.store = 'ky.KontsNoTransp';
    },

    buildBottomToolbar: function(config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },

    buildTopToolbar: function(config) {
        config.tbar = [];

        var kont = {
            xtype: 'buttongroup',
            columns: 3,
            title:'Контейнер',
            items:[
                {text: 'Фильтр', iconCls:'filter', action:'filterKontsNoTransp'},
                {text: this.btnCreate, iconCls:'doc_new', action:'create'},
                {text: this.btnEdit, iconCls:'edit', action:'edit'}
            ]
        };

        if(tkUser.hasPriv('CIM_DELETE')){
            kont.columns = 4;
            kont.items.push({text: this.btnDelete,iconCls:'del', action:'delete'});
        }

        config.tbar.push(kont);

        config.tbar.push({
            xtype: 'buttongroup',
            columns: 3,
            title:'Разместить НА',
            items:[
                {text: 'Контейнерную площадку', action:'yardPlacesForKontList', iconCls:'bind'},
                {text: 'Поезд, отправление', action:'poezdOutDirForKont', iconCls:'bind'},
                {text: 'Авто, отправление', action:'avtoOutDirForKont', iconCls:'bind'}
            ]
        });

    }

});
