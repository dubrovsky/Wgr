Ext.define('TK.model.Ved', {
    extend: 'Ext.data.Model',
    fields: [
        'dattr','crdate','un',
        'train', 'trainname', 'num', 'pervednum', 'vagcount',
        'num', 'railoutn', 'stnoutc', 'stnoutn', 'railinn', 'stninc', 'stninn', 'carroutc', 'carroutn', 'carrinc', 'carrinn', 'vagcount',
        {name:'hid', type:'int'}
    ],
    hasMany:[
        {model:'TK.model.VedVag', name:'vags', foreignKey:'hidVed', primaryKey:'hid'}
    ]
});
