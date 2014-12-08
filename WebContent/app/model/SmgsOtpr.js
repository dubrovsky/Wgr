Ext.define('TK.model.SmgsOtpr', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: ['hid','g1r','g_1_5k','g16r','g18r_1','g19r','g2','g3','g_2inn'],
    validations: [
        {type: 'length', field: 'g1r', max: 512},
        {type: 'length', field: 'g_1_5k', max: 3},
        {type: 'length', field: 'g16r', max: 550},
        {type: 'length', field: 'g18r_1', max: 32},
        {type: 'length', field: 'g19r', max: 128},
        {type: 'length', field: 'g2', max: 32},
        {type: 'length', field: 'g3', max: 32},
        {type: 'length', field: 'g_2inn', max: 32}
    ]
});