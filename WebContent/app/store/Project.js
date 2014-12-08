Ext.define('TK.store.Project', {
	extend: 'Ext.data.Store',
    model: 'TK.model.Project',
//    storeId:'Project',
    proxy: {
        type: 'ajax',
        url: 'Project_view1.do',
        reader: {
            type: 'json',
            root: 'project',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});