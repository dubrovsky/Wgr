Ext.define('TK.store.UsersGroups', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.UserGroup'
    ],

    model: 'TK.model.UserGroup',
//    autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'User_listGr.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'name'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});