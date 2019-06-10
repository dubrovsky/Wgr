Ext.define('TK.store.Smgses4Ved', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.Smgs'
    ],

    model: 'TK.model.Smgs',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'Smgs_list.do',
        reader: {
            type: 'json',
            root: 'rows'
            // idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});