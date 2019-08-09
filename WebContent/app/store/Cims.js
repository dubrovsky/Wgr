Ext.define('TK.store.Cims', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.Cim'
    ],

    model: 'TK.model.Cim',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'Smgs_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        actionMethods: {
                                    create : 'POST',
                                    read   : 'POST',
                                    update : 'POST',
                                    destroy: 'POST'
                                },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});