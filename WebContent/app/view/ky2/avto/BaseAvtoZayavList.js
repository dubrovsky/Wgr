Ext.define('TK.view.ky2.avto.BaseAvtoZayavList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2basezayavavtolist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],

    title: this.title,

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerOrderNum, dataIndex: 'no_zayav', flex: 1, maxWidth: 150},
                {text: this.headerAvtoNum, dataIndex: 'no_avto', flex: 1, maxWidth: 100},
                {text: this.headerTrailerNum, dataIndex: 'no_trail', flex: 1, maxWidth: 100},
                {text: this.headerDriver, dataIndex: 'driver_fio', flex: 1, maxWidth: 200},
                // {text: 'Клиент', dataIndex:'client', flex:1, maxWidth:100, renderer: this.renderClient},
                {text: this.headerClient, dataIndex: 'client_sname', flex: 1, maxWidth: 100},
                // {text: 'Номер контейнера', dataIndex: 'konts', flex:1, maxWidth: 150, renderer: this.renderNkon},
                {text: this.headerContainerNum, dataIndex: 'kont_s', flex: 1, maxWidth: 150},
                {
                    text: this.headerOrderType,
                    dataIndex: 'direction',
                    flex: 1,
                    maxWidth: 100,
                    renderer: this.rendererDirection
                },
                // {text:this.headerAvtoTrail, dataIndex:'no_trail', flex:1, maxWidth:100},
                // {text:this.headerDriverFam, dataIndex:'driver_fio', flex:1, maxWidth:200},
                // {text:this.headerKontCount, dataIndex:'kontCount', flex:1, maxWidth:100},
                // {text:this.headerDep, dataIndex:'departure', width:200},
                // {text:this.headerDest, dataIndex:'destination', width:200},
                {
                    text: this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 105
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
                        renderer: this.rendererUn,
                        width: 100
                    }]
                },
                {text: 'ID', dataIndex: 'hid', flex: 1, maxWidth: 100, minWidth: 70},
                {
                    text: 'Сообщения',
                    dataIndex: 'messCount',
                    flex: 1,
                    maxWidth: 100,
                    minWidth: 70,
                    renderer: TK.Utils.renderMessCount
                }
            ]
        };

    },

    buildView: function (config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect: true,
            emptyText: this.noData,
            getRowClass: function (record) {
                if (record.get('isZayavDone') == 1) {
                    return 'executed';
                } else if (record.get('repeatNkon') == 1) {
                    return 'repeatNkon';
                }

                /*
                                if (record.get('kontCount') !== 0 && record.get('kontCount') === record.get('kontCountDone')) {
                                    return 'executed';
                                } else {
                                    // return 'repeatNkon';
                                    var found = false;
                                    this.getStore().each(function (storeRecord) {
                                            if (record !== storeRecord) {
                                                var konts1 = record.get('konts');
                                                var konts2 = storeRecord.get('konts');
                                                for (var p=0; p<konts1.length; p++)
                                                    for (var q=0; q<konts2.length; q++) {
                                                        if (konts1[p]['nkon'] === konts2[q]['nkon']) {
                                                            found = true;
                                                            return false;
                                                        }
                                                    }
                                            }
                                        },
                                        this);
                                    if (found)
                                        return 'repeatNkon';
                                }
                */
            }
        };
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtoZayavsBase';
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200, 1000] })],
            displayInfo: true
        };
        config.bbar.store = 'ky2.AvtoZayavsBase';

    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(3, 0,
            {text: this.btnVgCt, iconCls: 'edit', action: 'editCtGr'}, '-',
            {text: this.btnDocs, iconCls: 'bind', action: 'attach'}, '-'
        );
        config.tbar.splice(0, 0,
            {tooltip: this.btnFilter, iconCls: 'filter', action: 'filterAvtoZayav'}, '-'
        );

        // config.tbar.unshift({text: 'Фильтр', iconCls:'filter', action:'filterPoezd'},'-');
        // config.tbar.push('->', '-', {text: 'Поиск контейнера', iconCls:'search', action:'searchKont'});
    },

    rendererDirection: function (val) {
        return (val === 1) ? this.txtUnload : this.txtLoad;
    }

    /*
        renderClient: function(val) {
            return val.sname;
        },

        renderNkon: function (value) {
            var nkon = '';
            Ext.Array.each(value, function (kont) {
                nkon += kont.nkon + ' ';
            });
            return nkon;
        }
    */


});
