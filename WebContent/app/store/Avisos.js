Ext.define('TK.store.Avisos', {
	extend: 'Ext.data.Store',
    model: 'TK.model.Aviso',
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