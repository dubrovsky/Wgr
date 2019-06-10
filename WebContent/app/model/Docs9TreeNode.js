Ext.define('TK.model.Docs9TreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},
        'code',
        'text1',
        'text2',    
        'ncas',
        'ndoc',
        {name: 'ncopy', type: 'int', useNull: true},
        {name: 'fieldNum', type: 'string', defaultValue: 9},
        /*{name: 'dat', type: 'date', useNull: true, dateFormat: 'd.m.y'*//*, convert: function(v){
            if (!v) {
                return null;
            }
            if (v instanceof Date) {
                return v;
            }
            return Ext.Date.parse(v, /!*Ext.util.Format.dateFormat*!/'d.m.y');
        }},*/
        'dat',

        'who',
        // tree node fields
        'iconCls',
        {name: 'text', type: 'string', convert: function(v, rec){
            return v ? v : '...';
        }},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean'}
    ],

    config: {
        contObj: undefined,
        vagObj: undefined
        /*,
        vagIndx: undefined,
        contIndx: undefined*/
    }
});