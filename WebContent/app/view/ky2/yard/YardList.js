Ext.define('TK.view.ky2.yard.YardList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2yardlist',

    requires: [
        'TK.Utils',
        'TK.view.components.PagingSizeChangerPlugin'
    ],
    multiSelect: true,

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerSector, dataIndex: 'sector.name', width: 100},
                /*{
                    text: this.headerXYZ,
                    columns: [{
                        text: 'Позиция',
                        dataIndex: 'x',
                        width: 70
                    }, {
                        text: 'Ряд',
                        dataIndex: 'y',
                        width: 60
                    }, {
                        text: 'Ярус',
                        dataIndex: 'z',
                        width: 60
                    }]
                },*/
                {text: this.headerNKont, dataIndex: 'konts', width: 200, renderer: this.renderNkon},
                {text: this.headerTara, dataIndex: 'konts', width: 100, renderer: this.renderTara},
                {text: this.headerBrutto, dataIndex: 'konts', width: 100, renderer: this.renderBrutto},
                {text: this.headerMaxLoad, dataIndex: 'konts', width: 100, renderer: this.renderGruzPod},
                {text: this.headerContSize, dataIndex: 'konts', width: 100, renderer: this.renderTiporazm},
                {text: this.headerTrNum, dataIndex: 'konts', width: 100, renderer: this.renderPoezdNum},
                {text: this.headerArrDate, dataIndex: 'konts', width: 100, renderer: this.renderKontDprb},
                {text: this.headerClient, dataIndex: 'konts', width: 200, renderer: this.renderGruzotpr},
                {
                    text: 'Сообщения',
                    dataIndex: 'messCount',
                    flex: 1,
                    maxWidth: 100,
                    minWidth: 70,
                    renderer: TK.Utils.renderMessCount
                }
                // {text:'Размещение на площадке', dataIndex:'kont.dyard', width:110, renderer: TK.Utils.renderLongStr}
            ]
        };

    },

    buildStore: function (config) {
        config.store = 'ky2.Yards';
    },

    buildBottomToolbar: function (config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200, 1000] })],
            store: config.store,
            displayInfo: true
        };
    },

    buildTopToolbar: function (config) {
        config.tbar = [
            {
                xtype: 'splitbutton', text: 'Место', iconCls: 'edit', action: 'yard',
                menu: [
                    {text: this.btnCreate, iconCls: 'doc_new', action: 'create'}, '-'
                    // ,{text: this.btnEdit, iconCls: 'edit', action: 'edit'}, '-'
                ]
            }, '-',
            {text: this.btnSectors, iconCls: 'edit', action: 'getYardSectors'}, '-',
            {
                xtype: 'splitbutton', text: this.btnKont, iconCls: 'edit', action: 'kont',
                menu: [
                    {text: this.btnCreateKont, iconCls: 'doc_new', action: 'createKont'}, '-',
                    {text: this.btnEditKont, iconCls: 'edit', action: 'editKont'}, '-'
                ]
            }, '-'
        ];
        if (tkUser.hasPriv('CIM_DELETE')) {
            config.tbar[4].menu.push({text: this.btnDelClient, iconCls: 'del', action: 'deleteKont'}, '-');
        }
        config.tbar.push({text: this.btnSwitchClient, iconCls: 'change_u', action: 'changeClient'}, '-');
        config.tbar.push({tooltip: 'На контейнерной', iconCls: 'cont', action: 'getYardAndYardForBind'}, '-');
        config.tbar.push({text: this.btnFilter, iconCls: 'filter', action: 'filterKontYard'}, '-');
        config.tbar.push({text: this.btnClearFilter, iconCls: 'clear', action: 'clearFilter'}, '-');
        config.tbar.push(
            {
                xtype: 'splitbutton', text: this.btnActions, iconCls: 'excel', action: 'xls',
                menu: [
                    {text: this.btnXLSsearch, iconCls: 'excel', action: 'xlsfilter'}, '-',
                    {text: this.btnXLSexport, iconCls: 'excel', action: 'xlsexport'}, '-',
                    {text: 'XLS (stan)', iconCls: 'excel', action: 'xlsstan'}, '-',
                    {text: this.btnXLSrefresh, iconCls: 'excel', action: 'xlsupdate'}
                ]
            }, '-'
        );
        config.tbar.push({text: 'Messenger', iconCls: 'doc_new', itemId: 'messanger', action: 'showMessanger'}, '-');

    },

    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true,
            singleSelect:true,
            emptyText: this.noData,
            autoScroll: true,
            getRowClass: function (record) {
                if (record.get('konts')['0']['sameKont']) {
                    return 'repeatNkon';
                }
            }
        };
    },

    renderNkon: function (value, meta) {
        var nkon = '';
        Ext.Array.each(value, function (kont) {
            nkon += kont.nkon + ' ';
        });
        return nkon;
    },
    renderGruzotpr: function (value, meta) {
        var gruzotpr = '';
        Ext.Array.each(value, function (kont) {
            gruzotpr += kont.gruzotpr ? kont.gruzotpr + ' ' : '';
        });
        return gruzotpr;
    },
    renderTara: function (value, meta) {
        var massa_tar = '';
        Ext.Array.each(value, function (kont) {
            massa_tar += kont.massa_tar ? kont.massa_tar + ' ' : '';
        });
        return massa_tar;
    },
    renderBrutto: function (value, meta) {
        var massa_brutto_all = '';
        Ext.Array.each(value, function (kont) {
            massa_brutto_all += kont.massa_brutto_all ? kont.massa_brutto_all + ' ' : '';
        });
        return massa_brutto_all;
    },
    renderGruzPod: function (value, meta) {
        var pod_sila = '';
        Ext.Array.each(value, function (kont) {
            pod_sila += kont.pod_sila ? kont.pod_sila + ' ' : '';
        });
        return pod_sila;
    },
    renderTiporazm: function (value, meta) {
        var vid = '';
        Ext.Array.each(value, function (kont) {
            vid += kont.vid ? kont.vid + ' ' : '';
        });
        return vid;
    },
    renderPoezdNum: function (value, meta) {
        var nppr = '';
        Ext.Array.each(value, function (kont) {
            if (kont['history']) {
                Ext.Array.each(kont['history'], function (history) {
                    if (history['poezd']) {
                        nppr += history['poezd']['npprm'] ? history['poezd']['npprm'] + ' ' : '';
                        return false;
                    }
                    if (history['avto']) {
                        nppr += 'AUTO';
                        return false;
                    }
                });
            }
        });
        return nppr;
    },
    renderKontDprb: function (value, meta) {
        var dprb = '';
        Ext.Array.each(value, function (kont) {
            dprb += kont.dprb ? kont.dprb + ' ' : '';
        });
        return dprb;
    },
    renderPoezdDprb: function (value, meta) {
        var dprb = '';
        Ext.Array.each(value, function (kont) {
            if (kont['history']) {
                Ext.Array.each(kont['history'], function (history) {
                    if (history['poezd']) {
                        dprb += history['poezd']['dprb'] ? history['poezd']['dprb'] + ' ' : '';
                        return false;
                    }
                });
            }
        });
        return dprb;
    }
});
