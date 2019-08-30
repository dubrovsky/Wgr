Ext.define('TK.model.ky2.PoezdImportDir', {
    extend: 'TK.model.ky2.PoezdBase',
    fields: [
        {name: 'n_poezd', type: 'string'},
        {name: 'n_packet', type: 'string'},
        {name: 'ved_nomer', type: 'string'},
        {name: 'sto_f', type: 'string'},
        {name: 'stn', type: 'string'},
        {name: 'count_nvag', type: 'int'}
    ]
});