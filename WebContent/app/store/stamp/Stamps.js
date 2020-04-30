/**
 * Created by Odmin on 07.02.2020.
 */
Ext.define('TK.store.stamp.Stamps', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.stamp.PrintDataStamp'
    ],

    model: 'TK.model.stamp.PrintDataStamp',
    pageSize: 20,
    actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
    proxy: {
        type: 'ajax',
       url: 'PrintStamp_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    },
    sorters: [ {
        property: 'hid',
        direction: 'ASC'
    }]
});