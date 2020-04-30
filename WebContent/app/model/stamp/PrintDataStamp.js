/**
 * Created by Odmin on 07.02.2020.
 */
Ext.define('TK.model.stamp.PrintDataStamp', {
    extend: 'Ext.data.Model',

    requires: [],


    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull: true},
        {name:'trans', type:'string', useNull: false},
        {name:'un', type:'string', useNull: false},
        {name:'altered', type:'date', useNull: false},
        {name:'dattr', type:'date', useNull: false},
        {name:'descr', type:'string'},
        {name:'codePer', type:'string'},
        {name:'llx', type:'float', useNull: false},
        {name:'lly', type:'float', useNull: false},
        {name:'urx', type:'float', useNull: false},
        {name:'ury', type:'float', useNull: false},
        'borders','pics','texts'
    ]
    // ,
    // hasMany:[
    //     {model:'TK.model.stamp.PrintDataStampBorder', name:'borders', foreignKey:'hidStamp', primaryKey:'hid', associationKey:'borders'},
    //     {model:'TK.model.stamp.PrintDataStampPicture', name:'pics', foreignKey:'hidStamp', primaryKey:'hid', associationKey:'borders'},
    //     {model:'TK.model.stamp.PrintDataStampText', name:'texts', foreignKey:'hidStamp', primaryKey:'hid', associationKey:'borders'}
    // ]
});