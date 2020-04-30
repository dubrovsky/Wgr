Ext.define('TK.store.ky2.AvtoZayavsFilter', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.ky2.AvtoZayavBase'
    ],

    model: 'TK.model.ky2.AvtoZayavBase',
    // autoLoad: false
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/AvtoZayav.do',
        idParam: 'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        // extraParams:{
        //     action:'list'
        // },

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