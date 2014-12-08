Ext.define('TK.store.PrnTmplRouteItems', {
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: 'Project_listPrnTmpl.do'
    },
    autoLoad: false,
    root: {
        expanded: true,
        children : []
    }
});
