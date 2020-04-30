/**
 * Created by Odmin on 12.02.2020.
 */
Ext.define('TK.store.stamp.Texts', {
    extend: 'Ext.data.ArrayStore',

    requires: [
        'TK.model.stamp.PrintDataStampText'
    ],

    model: 'TK.model.stamp.PrintDataStampText',
    sorters: [ {
        property: 'hid',
        direction: 'ASC'
    }]
});