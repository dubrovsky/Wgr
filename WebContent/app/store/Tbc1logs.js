Ext.define('TK.store.Tbc1logs', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.Tbc1log'
    ],

    model: 'TK.model.Tbc1log',
    proxy: {
        type: 'ajax',
        url: 'secure/Tdg_showTextMsg1.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});