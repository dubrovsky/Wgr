Ext.define('TK.store.ky2.InterchangeKont', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'abbr', type: 'string'},
        {name: 'name', type: 'string'}
    ],
    data: [{
        "abbr": "BT",
        "name": "ZGIĘCIE / BENT"
    }, {
        "abbr": "L",
        "name": "POLUZOWANIE / LOOSE"
    }, {
        "abbr": "M",
        "name": "BRAK / MISSING"
    }, {
        "abbr": "BR",
        "name": "ZŁAMANIE / BROKEN"
    }, {
        "abbr": "C",
        "name": "PRZECIECIE / CUT"
    }, {
        "abbr": "H",
        "name": "OTWÓR / HOLE"
    }, {
        "abbr": "CR",
        "name": "PĘKNIECIE / CRACKED"
    }, {
        "abbr": "R",
        "name": "SKORODOWANIE / RUSTY"
    }, {
        "abbr": "B",
        "name": "RYSA / SCRATCH"
    }, {
        "abbr": "S",
        "name": "ODERWANIE / DETACHED"
    }, {
        "abbr": "PO",
        "name": "WYBRZUSZENIE / PUSHED OUT"
    }, {
        "abbr": "D",
        "name": "WGNIECENIE / DENT"
    }]

});