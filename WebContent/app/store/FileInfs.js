Ext.define('TK.store.FileInfs', {
	extend: 'Ext.data.Store',
    model: 'TK.model.FileInf',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'File_listInf.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});