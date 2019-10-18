Ext.define('TK.model.ky2.AvtoFile', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'hid', type:'int'},
        'fileName','contentType', 'uploaded',
        {name:'length', type:'int'}
    ],
    idProperty:'hid',

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/AvtoFiles.do',
        idParam:'hid',
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
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }

});