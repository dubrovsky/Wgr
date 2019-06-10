Ext.define('TK.model.ky.ListForPoezd', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'numpp', type: 'int', useNull: true},
        {name:'nvag', type: 'string'},
        {name:'nkon', type: 'string'},
        {name:'poruz', type: 'string'},
        'npprInto','npprOut','nvagInto','nvagOut','avtoInto','avtoOut','kySector','kyX','kyY','kyZ'
    ]
});
