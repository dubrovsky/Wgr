/**
 * Created by Odmin on 27.11.2018.
 */
Ext.define('TK.store.AvisoCims', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.AvisoCim'
    ],

    model: 'TK.model.AvisoCim',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'Smgs_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});