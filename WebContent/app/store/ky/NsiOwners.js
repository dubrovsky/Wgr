Ext.define('TK.store.ky.NsiOwners', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.NsiOwner',
    remoteFilter: true,
    pageSize: 20
});