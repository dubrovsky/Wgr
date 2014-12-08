Ext.define('TK.store.UsersPrivs', {
	extend: 'Ext.data.Store',
    model: 'TK.model.UserPriv',
	proxy: {
		type: 'ajax',
		url: 'User_listPriv.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'name'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});