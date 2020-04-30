Ext.define('TK.store.Users', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.User'
    ],

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
        actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	},

});