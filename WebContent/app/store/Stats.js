Ext.define('TK.store.Stats', {
	extend: 'Ext.data.Store',
    model: 'TK.model.Stat',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'Report_stat.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});