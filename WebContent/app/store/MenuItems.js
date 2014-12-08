Ext.define('TK.store.MenuItems', {
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: 'Project_list.do',
        timeout: 150000
    }
    ,root: {}
});