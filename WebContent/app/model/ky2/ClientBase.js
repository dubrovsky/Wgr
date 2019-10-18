Ext.define('TK.model.ky2.ClientBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'sectorHid', type: 'int', useNull: true},
        {name: 'kontHid', type: 'int', useNull: true},
        {name: 'poezdHid', type: 'int', useNull: true},
        {name: 'avtoHid', type: 'int', useNull: true},
        {name: 'clientHid', type: 'int', useNull: true},
        {name: 'sectorName', type: 'string', useNull: true},
        {name: 'location', type: 'string', useNull: true},
        {name: 'nkon', type: 'string', useNull: true},
        {name: 'massa_tar', type: 'int', useNull: true},
        {name: 'massa_brutto', type: 'int', useNull: true},
        {name: 'massa_brutto_all', type: 'int', useNull: true},
        {name: 'pod_sila', type: 'int', useNull: true},
        {name: 'vid', type: 'string', useNull: true},
        {name: 'npprm', type: 'string', useNull: true},
        {name: 'nppr', type: 'string', useNull: true},
        {name: 'dprb', type: 'string', useNull: true},
        {name: 'clientName', type: 'string', useNull: true},
        {name: 'kyDays', type: 'int', useNull: true}
    ],

    idProperty: 'hid',

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Client.do',
        // idParam: 'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }
});