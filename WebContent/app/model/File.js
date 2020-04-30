Ext.define('TK.model.File', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'hid', type:'int'},
        'fileName','contentType',
        {name:'length', type:'int'},
        {name:'userFlag', type:'int', useNull: true},
        {name:'newDoc', type:'boolean'},
        'altered', 'un'
    ]
});