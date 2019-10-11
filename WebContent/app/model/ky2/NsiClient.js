Ext.define('TK.model.ky2.NsiClient', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: ['hid','clNo','freeDays', 'noDog', 'dateDog', 'fname', 'sname',
        {name : 'usr.groupsIds', mapping: 'groups'}
        ]
});