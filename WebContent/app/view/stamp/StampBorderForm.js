/**
 * Форма редактирования/добавления границы штампа
 */
Ext.define('TK.view.stamp.StampBorderForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.stampborderform',
    requires: [],

    title: this.title,
    width: 400,
    // modal: true,
    layout: 'fit',
    editIdx:-1,
    initComponent: function () {
        this.items = [
            {
                xtype:'form',
                itemId:'dataform',
                layout: 'anchor',
                bodyPadding: 5,
                defaults:{anchor:'100%', labelAlign: 'top'},

                items: [
                    {xtype:'hidden', name:'hid'},
                    {xtype:'hidden', name:'hidStamp'},
                    {xtype: 'numberfield',fieldLabel: this.lblBorderThick, name: 'border',itemId: 'border',allowDecimals: false, maxValue: 9, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrllx, name: 'rllx',itemId: 'rllx', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrlly, name: 'rlly',itemId: 'rlly', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrurx, name: 'rurx',itemId: 'rurx', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrury, name: 'rury',itemId: 'rury', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelRadius, name: 'radius',itemId: 'radius',allowDecimals: false, maxValue: 99, minValue: 0, allowBlank: false},
                    {xtype:'textfield',fieldLabel: this.labelColor, name:'color',itemId: 'color',allowBlank: true, maxLength: 6},
                    {
                        xtype: 'colorpicker',name:'colorPicker',itemId: 'colorPicker',value:'',
                        listeners: {
                            select: function(picker, selColor) {
                                Ext.ComponentQuery.query("stampborderform #dataform #color")[0].setValue(selColor);
                            },
                            afterrender:function (picker) {
                                var val=Ext.ComponentQuery.query("stampborderform #dataform #color")[0].getValue();
                                if( val&&(picker.colors.indexOf(val)!==-1))
                                    this.select(val);
                            }
                        }
                    }
                ],
                dockedItems : [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            '-', {xtype: 'button', text: this.btnSave, border: 1, action:'saveBorder',formBind: true, disabled: true},
                            '-', {xtype: 'button', text: this.btnExit, border: 1, handler: this.onCancel}
                        ]
                    }
                ],
            },
        ];

        this.callParent();
    },
    onCancel: function (btn) {
        btn.up('window').destroy();
    }
});
