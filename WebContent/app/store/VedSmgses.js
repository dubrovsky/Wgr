Ext.define('TK.store.VedSmgses', {
	extend: 'Ext.data.Store',
    requires: [
        'TK.Utils',
        'TK.model.VedVag'
    ],
    // storeId: 'VedSmgses',

    model: 'TK.model.VedVag',
	proxy: {
		type: 'ajax',
		url: 'Smgs_vags.do',
        reader: {
            type: 'json',
            root: 'rows'
            // idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
	}
});