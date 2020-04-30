Ext.define('TK.model.ky2.NsiClient', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: ['hid','clNo','freeDays', 'noDog', 'cntPZ', 'cntWZ', 'dateDog', 'fname', 'sname',
        {name : 'usr.groupsIds', mapping: 'groups'}
        ]
});