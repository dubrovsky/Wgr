/**
 * Created by Odmin on 19.02.2019.
 * stores smgses by date interval and train number
 */
Ext.define('TK.store.PeregruzSmgsSelectStore', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils'
    ],

    fields: ['hid','g694', 'altered', 'vags','konts','g101', 'isSelected'],

    autoLoad:false,
    pageSize:1000,
    proxy: {
        type: 'ajax',
        url: 'Smgs_cimsmgsTrain.do',
        extraParams: {'search.date1': null, 'search.date2': null,'npoezd':'','search.type':null,'search.routeId':null},
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }
});