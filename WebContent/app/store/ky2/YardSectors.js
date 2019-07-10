Ext.define('TK.store.ky2.YardSectors', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.YardSector',
    pageSize: 10,
    currentPage: 1,
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/YardSector_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function (proxy, response, operation) {
            TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
        }}
    }
});