/**
 * Created by Odmin on 15.02.2019.
 * stores tran number by date interval ang smgs quantity that fits them.
 */
Ext.define('TK.store.PeregruzPoezdSelectStore', {
    extend: 'Ext.data.Store',
    alias: 'store.poezdselectstore',
    requires: [
        'TK.Utils'
    ],

    fields: ['npoezd', 'count', 'isSelected'],
    autoLoad: false,
    pageSize: 1000,
    proxy: {
        type: 'ajax',
        url: 'Smgs_cimsmgsDate.do',
        extraParams: {'search.date1': null, 'search.date2': null},
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'npoezd'
        },
        actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }

});




