/**
 * Created by Odmin on 24.07.2019.
 * Окно выбора элементов документа для создания на его основе шаблона
 */
Ext.define('TK.view.edit.SelectCopy2AvisoElements', {
    extend: 'Ext.window.Window',

    requires: [
        'TK.store.Select2Aviso',
        'TK.view.components.CheckColumn'
    ],

    title: this.title,
    height: 450,
    width: 500,
    layout: 'fit',
    modal: true,
    initComponent: function () {

        this.items = [
            {
                xtype: 'grid',
                itemId:'sel2avisoGrid',
                columnLines: true,
                store: Ext.create('TK.store.Select2Aviso'),
                viewConfig: {
                    stripeRows: true,
                    singleSelect: true,
                    enableTextSelection: true,
                    markDirty: false
                },
                columns: {
                    items: [
                        {dataIndex: 'num', hidden: true},
                        {text: this.headtext, dataIndex: 'text', flex: 10},
                        {text: this.headngraph, dataIndex: 'nGraph', flex: 2},
                        {xtype: 'checkallcheckcolumn', dataIndex: 'isSelected', flex: 1}
                    ],
                    defaults: {
                        menuDisabled: true,
                        sortable: false
                    }
                }
            },
            this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '-',
                        {xtype: 'button', text: this.btnOk ? this.btnOk : this.choose, border: 1, handler: this.onOk},
                        '-',
                        {xtype: 'button', text: this.btnCancel ? this.btnCancel : this.cancel, border: 1, handler: this.onCancel}
                    ]
                }
            ]
        ], this.callParent();
    },
    onCancel: function (btn) {
        var form = this.up().up();
        form.close();
    },
    onOk: function (btn) {
        var unSel = [],store=this.up().up().getComponent('sel2avisoGrid').getStore(),form = this.up().up(),selCount=0;

        for(var i=0; i<store.getCount(); i++)
        {
            var rec=store.getAt(i);
            if (!rec.data['isSelected'])
            {
                unSel.push(rec.data['num']);
            }
            else
                selCount++;
        }
        if (selCount> 0) {
            form.controller.onCopy2Aviso(form.btn,unSel);
            form.close();
        }
    }
});