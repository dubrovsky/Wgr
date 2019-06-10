Ext.define('TK.store.ky.YardsDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.YardBase',
    remoteFilter: true,
    pageSize: 20
});