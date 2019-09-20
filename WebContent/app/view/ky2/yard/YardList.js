Ext.define('TK.view.ky2.yard.YardList', {
    extend: 'TK.view.ky2.BaseList',
    alias: 'widget.ky2yardlist',

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
                {text: 'Тара', dataIndex: 'konts', width: 100, renderer: this.renderTara},
                {text: 'Брутто', dataIndex: 'konts', width: 100, renderer: this.renderBrutto},
                {text: 'Грузо подъемность', dataIndex: 'konts', width: 100, renderer: this.renderGruzPod},
                {text: 'Типоразмер', dataIndex: 'konts', width: 100, renderer: this.renderTiporazm},
                {text: '№ поезда по прибыт.', dataIndex: 'konts', width: 100, renderer: this.renderPoezdNum},
                {text: 'Дата прибыт.', dataIndex: 'konts', width: 100, renderer: this.renderKontDprb},
                {text: 'Клиент', dataIndex: 'konts', width: 200, renderer: this.renderGruzotpr}
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
            store: config.store,
            displayInfo: true
        };
    },

    buildTopToolbar: function (config) {
        config.tbar = [
            {text: this.btnCreate, iconCls: 'doc_new', action: 'create'}, '-',
            {text: this.btnEdit, iconCls: 'edit', action: 'edit'}, '-',
            {text: this.btnEditKont, iconCls: 'edit', action: 'editKont'}, '-'
        ];

        if (tkUser.hasPriv('CIM_DELETE')) {
            config.tbar.push({text: this.btnDelete, iconCls: 'del', action: 'delete'}, '-');
        }
        config.tbar.push({text: 'Фильтр', iconCls: 'filter', action: 'filterKontYard'}, '-');
        config.tbar.push({text: 'Сектора', iconCls: 'edit', action: 'getYardSectors'}, '-');
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
            gruzotpr += kont.gruzotpr ?  kont.gruzotpr + ' ' : '';
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
                });
            }
        });
        return nppr;
    },
    renderKontDprb: function (value, meta) {
        var dprb = '';
        Ext.Array.each(value, function (kont) {
            dprb += kont.dprb ?  kont.dprb + ' ' : '';
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
