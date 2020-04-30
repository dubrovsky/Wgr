Ext.define('TK.model.CimSmgs', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr', 'altered', 'un', 'vagVedNum',
        'numClaim', 'vags', 'konts', 'npoezd',
        {name: 'g281'},
        'g1', 'g4', 'src',
        {name: 'hid', type: 'int'},
        'iftmin', 'status', 'fts', 'btlc', 'iftminBtlc', 'tdgFts', 'tdgFts1', 'tdgFtsHid', 'greenRail',
        {name: 'ready', type: 'int'},
        {name: 'check', type: 'boolean', defaultValue: false},
        'type', 'print', 'locked',
        {name: 'trans', type: 'string', persist: false},
        {name: 'messCount', type: 'int', persist: false},
        {name: 'newMessCount', type: 'int', persist: false},
        {name: 'packId', type: 'int'},
        {name: 'routeId', type: 'int'}, 'g1_dop_info', 'g4_dop_info', 'g16_dop_info']
});