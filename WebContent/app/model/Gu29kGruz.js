Ext.define('TK.model.Gu29kGruz', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name: 'places', type: 'int'},
        'upak',
        'ekgvn',
        'enzgr',
        'kgvn',
        'nzgr',
        {name: 'sort', type: 'int'},
        'hid'
    ]
});
