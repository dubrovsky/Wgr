Ext.define('TK.view.ky2.client.ClientList', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2clientlist',

    title: 'Клиент',
    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: 'Сектор', dataIndex: 'sectorName', width: 150},
                {text: 'Место<br/>положения', dataIndex: 'location', width: 150},
                {text: 'Контейнер', dataIndex: 'nkon', width: 150},
                {text: 'Тара', dataIndex: 'massa_tar', width: 150},
                {text: 'Брутто', dataIndex: 'massa_brutto', width: 150},
                {text: 'Грузо<br/>подъемность', dataIndex: 'pod_sila', width: 150},
                {text: 'Типоразмер', dataIndex: 'vid', width: 150},
                {text: '№ поезда<br/>по приб', dataIndex: 'npprm', width: 150},
                {text: 'Дата<br/>приб', dataIndex: 'dprb', width: 150},
                {text: 'Клиент', dataIndex: 'clientName', width: 150},
                {text: 'Дней<br/>на КП', dataIndex: 'kyDays', width: 150}
            ]
        };
    },

    buildStore: function (config) {
        config.store = 'ky2.ClientsBase';
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
            {text: 'Фильтр', iconCls: 'filter', action: 'filterClient'}, '-'
        ];
    }
});