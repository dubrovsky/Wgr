/**
 * Created by Odmin on 29.01.2020.
 */
Ext.define('TK.model.ky2.TrainFilterModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'hid',     type: 'int' },
        { name: 'npprm',      type: 'string' },
        { name: 'sname',      type: 'string' }
    ],
    idProperty:'hid'
});