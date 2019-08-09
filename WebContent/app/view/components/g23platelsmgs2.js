/**
 * Created by Odmin on 17.07.2019.
 */
Ext.define('TK.view.components.g23platelsmgs2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.g23platelsmgs2',
    xtype: 'g23platelsmgs2',

    requires: [
        'TK.store.tables.G23platelStore'
    ],
    layout: 'fit',
    border: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                itemId: 'g23grid',
                columnLines: true,
                border: false,
                store: Ext.create('TK.store.tables.G23platelStore'),
                columns:[
                    {text: '!текст', dataIndex: 'text',height:2,sortable: false,tdCls: 'wrap',flex: 1}

                ]
            }
        ];
        this.callParent(arguments);
    }
});