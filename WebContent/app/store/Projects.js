Ext.define('TK.store.Projects', {
	extend: 'Ext.data.Store',
    model: 'TK.model.Project',
    pageSize: 20,
	proxy: {
		type: 'ajax',
		url: 'Project_listProjects.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});