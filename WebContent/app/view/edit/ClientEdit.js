/**
 * Created by lan
 */
Ext.define('TK.view.edit.ClientEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.clientedit',

    requires: [],

    title: this.title,
    height: 320,
    width: 400,
    modal: true,
    layout: 'fit',
    required: '<span style="color:red;font-weight:bold">*</span>',
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    buildConfig: function(config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },

    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->',
                    '-',
                    {text: this.btnSave, formBind: true, scope: this, action: 'save'},
                    '-',
                    {text:this.btnCancel ,action: 'close',scope: this}
                    ]
            }
        ]
    },

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'form',
                border: false,
                itemId: 'clientForm',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                fieldDefaults: {labelWidth: 130},
                defaults: {anchor: '100%'},

                defaultType: 'textfield',
                items: [
                    {xtype: 'hidden', name: 'hid'},
                    {fieldLabel: 'Номер договора', xtype: 'textfield', name: 'noDog', maxLength: 100},
                    {fieldLabel: 'Дата договора', xtype: 'datefield', name: 'dateDog', altFormats: 'd.m.y', format: 'd.m.y'},
                    {fieldLabel: 'Наименование полное', xtype: 'textfield', name: 'fname', maxLength: 255},
                    {fieldLabel: 'Наименование краткое', xtype: 'textfield', name: 'sname', maxLength: 50, allowBlank: false, afterLabelTextTpl: this.required},
                    {fieldLabel: 'Код клиента', xtype: 'textfield', name: 'clNo', maxLength: 6},
                    {fieldLabel: 'Дней без оплаты', xtype: 'numberfield', name: 'freeDays',  maxLength:5},
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Группы пользователей',
                        layout: 'hbox',
                        itemId: 'group',
                        afterLabelTextTpl: this.required,
                        items: [
                            {xtype: 'textarea', name: "usr.groupsIds", flex: 1, readOnly: true, allowBlank: true},
                            {xtype: 'button', text: '...', action: 'getUserGroups', margins: '0 0 0 5'}
                        ]
                    }

                ]
            }

        ]
    }
});
