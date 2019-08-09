/**
 * Created by Odmin on 16.07.2019.
 */
Ext.define('TK.view.components.g15contsmgs2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.g15contsmgs2',
    xtype: 'g15contsmgs2',

    requires: [
        'TK.Utils',
        'TK.store.tables.CtNodes'
    ],
    layout: 'fit',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                itemId: 'g15Kgrid',
                columnLines: true,
                border: false,
                cls:'grid-13px-height',
                store: Ext.create('TK.store.tables.CtNodes'),
                columns:[
                    {text: '!Н контейнера', dataIndex: 'utiN', width:156,height:1,sortable: false},
                    {text: '!Размер', dataIndex: 'sizeFoot', width:90,height:1,sortable: false},
                    {text: '!Тара, вес', dataIndex: 'taraKont',  width:100,height:1,sortable: false,renderer:TK.Utils.renderNonZeroStr},
                    {text: '!Типоразмер', dataIndex: 'utiType', width:90,height:1,sortable: false},
                    {text: '!Макс.гр', dataIndex: 'grpod', width:100,height:1,sortable: false,renderer:TK.Utils.renderNonZeroStr}
                ]
            }
        ];
        this.callParent(arguments);
    }
});
