Ext.define('TK.store.Users', {
	extend: 'Ext.data.Store',
    model: 'TK.model.User',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'User_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'un'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});