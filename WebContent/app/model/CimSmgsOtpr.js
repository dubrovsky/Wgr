Ext.define('TK.model.CimSmgsOtpr', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: ['hid','g1','g1r','g_1_5k','g11','g12','g13','g15_1','g16_1','g16r','g17_1','g18_1','g18r_1','g19_1','g19r','g110','g2','g3','g_2inn','dop_info'],
    validations: [
        {type: 'length', field: 'g1', max: 512},
        {type: 'length', field: 'g1r', max: 512},
        {type: 'length', field: 'g_1_5k', max: 3},
        {type: 'length', field: 'g11', max: 80},
        {type: 'length', field: 'g12', max: 60},
        {type: 'length', field: 'g13', max: 60},
        {type: 'length', field: 'g15_1', max: 3},
        {type: 'length', field: 'g16_1', max: 32},
        {type: 'length', field: 'g16r', max: 550},
        {type: 'length', field: 'g17_1', max: 10},
        {type: 'length', field: 'g18_1', max: 32},
        {type: 'length', field: 'g18r_1', max: 32},
        {type: 'length', field: 'g19_1', max: 128},
        {type: 'length', field: 'g19r', max: 128},
        {type: 'length', field: 'g110', max: 16},
        {type: 'length', field: 'g2', max: 32},
        {type: 'length', field: 'g3', max: 32},
        {type: 'length', field: 'g_2inn', max: 32},
        {type: 'length', field: 'dop_info', max: 512}
    ]
});