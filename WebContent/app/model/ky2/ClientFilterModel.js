/**
 * Created by Damned on 28.01.2020.
 */
Ext.define('TK.model.ky2.ClientFilterModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'hid',     type: 'int' },
        { name: 'sname',      type: 'string' },
    ],
    idProperty:'hid'
});
