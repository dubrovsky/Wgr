Ext.define('TK.view.ky2.avto.DotpQuestionAvto', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2avtodotpquestion',
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
                        xtype: 'datefield',
                        name: 'dopt',
                        labelWidth: 140,
                        altFormats: 'd.m.y',
                        fieldLabel: this.lblDeartureTime,
                        value: new Date()
                    }, {
                        fieldLabel: 'Время отправления',
                        labelWidth: 140,
                        name: 'dotpTime',
                        xtype: 'timefield',
                        format: 'H:i',
                        value: new Date()
                    }
                ],
                buttons: [
                    {
                        text: this.txtYes,
                        formBind: true,
                        disabled: true,
                        action: 'applyDotp'
                    },{
                        text: this.txtNo,
                        scope: this,
                        action: 'cancelDotp'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
