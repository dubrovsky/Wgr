Ext.define('TK.view.ky2.InterchangeKont', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2interchangekont',
    autoShow: true,
    modal: true,
    closePanel : false,
    y: 200,
    title: this.title,
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'hidden',
                        itemId: 'hid'
                    }
                    ,{
                        xtype: 'combo',
                        itemId: 'stan',
                        fieldLabel: this.lblMalfunction,
                        labelWidth: 90,
                        width: 300,
                        store: 'ky2.InterchangeKont',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        multiSelect: true,
                        allowBlank: false
                    }
                ],
                buttons: [
                    {
                        text: this.btnChoose,
                        // formBind: true,
                        // disabled: true,
                        action: 'applyInterchangeAct'
                    },{
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
