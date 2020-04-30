Ext.define('TK.view.ky2.client.ClientList', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2clientlist',

    requires: [
        'TK.view.components.PagingSizeChangerPlugin'
    ],


    title: this.title,
    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.headerSector, dataIndex: 'sectorName', width: 150},
                {text: this.headerPlace, dataIndex: 'location', width: 150},
                {text: this.headerContainer, dataIndex: 'nkon', width: 150},
                {text: this.headerTara, dataIndex: 'massa_tar', width: 150},
                {text: this.headerBrutto, dataIndex: 'massa_brutto', width: 150},
                {text: this.headerContainerNum, dataIndex: 'pod_sila', width: 150},
                {text: this.headerContSize, dataIndex: 'vid', width: 150},
                {text: this.headerTrainNbyArrival, dataIndex: 'npprm', width: 150},
                {text: this.hederArrDate, dataIndex: 'dprb', width: 150},
                {text: this.headerClient, dataIndex: 'clientName', width: 150},
                {text: this.headerDaysInKP, dataIndex: 'kyDays', width: 150}
            ]
        };
    },

    buildStore: function (config) {
        config.store = 'ky2.ClientsBase';
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
            {text: this.btnFilter, iconCls: 'filter', action: 'filterClient'}, '-'
        ];
    }
});