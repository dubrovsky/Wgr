Ext.define('TK.model.NsiDir', {
    extend: 'Ext.data.Model',

    fields: [
        'name','descr',
        {name:'zipped', type:'boolean'},
        {name:'hid', type:'int'}
    ]
});