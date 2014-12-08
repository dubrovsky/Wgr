Ext.define('TK.store.Files', {
	extend: 'Ext.data.Store',
    model: 'TK.model.File',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'File_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});