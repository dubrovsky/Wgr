Ext.define('TK.model.ky2.VagonImportDir', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nvag', type: 'string'},
        {name: 'nkon', type: 'string'},
        {name: 'smgs', type: 'string'},
        {name: 'npol', type: 'string'},
        {name: 'cnkon', type: 'int'}
    ],
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Poezd.do',
        idParam: 'hid',
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