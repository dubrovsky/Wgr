/**
 * Таблица для отображения списков грузов графа 15 СМГС
 */
Ext.define('TK.view.components.g15gruzsmgs2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.g15gruzsmgs2',
    xtype: 'g15gruzsmgs2',

    requires: [
        'TK.Utils',
        'TK.store.tables.CtGrNodes'
    ],

    layout: 'fit',
    border: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                itemId: 'g15grid',
                columnLines: true,
                border: false,
                store: Ext.create('TK.store.tables.CtGrNodes'),
                columns:[
                    {text: '!Наименование груза', dataIndex: 'nzgr', width:555,height:2,sortable: false,tdCls: 'wrap'},
                    {text: '!Род упаковки', dataIndex: 'rod', width:117,height:2,sortable: false},
                    {text: '!Количество мест', dataIndex: 'places',  width:117,height:2,sortable: false,renderer:TK.Utils.renderNonZeroStr},
                    {text: '!Масса', dataIndex: 'massa', width:100,height:2,sortable: false,renderer:TK.Utils.renderNonZeroStr}
                ]
            }
        ];
        this.callParent(arguments);
    }
});
