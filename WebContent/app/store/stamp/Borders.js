/**
 * Created by Odmin on 12.02.2020.
 */
Ext.define('TK.store.stamp.Borders', {
    extend: 'Ext.data.ArrayStore',

    requires: [
        'TK.model.stamp.PrintDataStampBorder'
    ],

    model: 'TK.model.stamp.PrintDataStampBorder',
    sorters: [ {
        property: 'hid',
        direction: 'ASC'
    }]
});