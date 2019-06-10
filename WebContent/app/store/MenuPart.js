Ext.define('TK.store.MenuPart', {
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: 'Project_listPart.do',
        timeout: 150000
    }
    ,root: {}
});