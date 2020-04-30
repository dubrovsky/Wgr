Ext.define('TK.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'usr.un', mapping:'un'},
        {name:'usr.group.name', mapping:'group'},
        {name:'usr.groupsIds', mapping:'groupsIds'},
        {name:'usr.locked', mapping:'locked',type: 'boolean'},
        {name:'usr.su', mapping:'su',type: 'boolean'},
        {name:'usr.privilegsIds', mapping:'privilegsIds'},
        {name:'usr.email', mapping:'email'},
        {name:'usr.namKlient', mapping:'namKlient'},
        {name:'usr.lng',mapping:'lng'}
    ]
});