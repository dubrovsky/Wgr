Ext.define('TK.store.UsersPrivs', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.UserPriv'
    ],

    model: 'TK.model.UserPriv',
	proxy: {
		type: 'ajax',
		url: 'User_listPriv.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'name'
        },
        actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});