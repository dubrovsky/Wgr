/**
 * Created by Odmin on 12.02.2020.
 */
Ext.define('TK.store.stamp.Pictures', {
    extend: 'Ext.data.ArrayStore',

    requires: [
        'TK.model.stamp.PrintDataStampPicture'
    ],
    model: 'TK.model.stamp.PrintDataStampPicture',
    sorters: [ {
        property: 'hid',
        direction: 'ASC'
    }]
});