Ext.define('TK.view.ky2.poezd.zayav.Filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2poezdzayavfilter',
    autoShow: true,
    modal: true,
    y: 0,
    title: this.title,
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'datefield',
                        name: 'startDate',
                        altFormats: 'd.m.y',
                        fieldLabel: this.labelFateFrom
                    },
                    {
                        xtype: 'textfield',
                        name: 'noZayav',
                        itemId: 'noZayav',
                        fieldLabel: this.labelNOrder
                    },
                    {
                        xtype: 'textfield',
                        name: 'sname',
                        fieldLabel: this.labelClient
                    },
                    {
                        xtype: 'textfield',
                        name: 'npprm',
                        fieldLabel: this.labelNTraint
                    }
                ],
                buttons: [
                    {
                        text: this.btnFilter,
                        formBind: true,
                        disabled: true,
                        action: 'applyFilter'
                    },
                    {
                        text: this.btnClear,
                        action: 'clearFilter',
                        handler: function (btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: this.btnClose,
                        scope: this,
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
