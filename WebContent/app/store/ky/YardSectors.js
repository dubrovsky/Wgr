Ext.define('TK.store.ky.YardSectors', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.YardSector',
    pageSize: 10,
    currentPage: 1,
    proxy: {
        type: 'ajax',
        url: 'ky/secure/YardSector_list.do',
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