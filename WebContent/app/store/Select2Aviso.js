/**
 * Created by Odmin on 24.07.2019.
 */
Ext.define('TK.store.Select2Aviso', {
    extend: 'Ext.data.Store',

    fields: [{name:'num',type:'number'},'text','nGraph','isSelected'],
    autoLoad: true,
    data : [],
    sorters: [{
        property: 'num',
        direction: 'asc'
    }],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});