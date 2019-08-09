/**
 * Created by Odmin on 12.07.2019.
 */
Ext.define('TK.view.components.g19plombsmgs2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.g19plombsmgs2',
    xtype: 'g19plombsmgs2',

    requires: [
        'TK.Utils',
        'TK.store.tables.Plombs'
    ],
    layout: 'fit',
    border: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                itemId: 'g19grid',
                columnLines: true,
                border: false,
                store: Ext.create('TK.store.tables.Plombs'),
                features: [{
                    ftype: 'summary',
                    dock: 'bottom'
                }],
                columns:[
                    {text: '!Кол-во', dataIndex: 'kpl', width:57,height:2,sortable: false, summaryType: 'sum',renderer:TK.Utils.renderNonZeroStr },
                    {text: '!Пломбы', dataIndex: 'znak', width:186,height:2,sortable: false,
                        summaryRenderer: function() {
                            return this.up('g19plombsmgs2').totalCount;
                        }}
                ]
            }
        ];
        this.callParent(arguments);
    }
});