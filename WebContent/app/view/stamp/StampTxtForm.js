/**
 * Форма редактирования/добавления текста штампа
 */
Ext.define('TK.view.stamp.StampTxtForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.stamptxtform',

    title: this.title,
    width: 640,
    autoScroll: true,
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
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults:{xtype: 'numberfield',labelAlign: 'top',flex:1, maxValue: 999999, minValue: 0, allowBlank: false},
                        itemId: 'leftXY',
                        items: [
                            {fieldLabel: this.labelrllx, name: 'rllx',itemId: 'rllx',margins: '0 5 0 0'},
                            {fieldLabel: this.labelrlly, name: 'rlly',itemId: 'rlly'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults:{xtype: 'numberfield',labelAlign: 'top',flex:1, maxValue: 999999, minValue: 0, allowBlank: false},
                        itemId: 'rightXY',
                        items: [
                            {fieldLabel: this.labelrurx, name: 'rurx',itemId: 'rurx',margins: '0 5 0 0'},
                            {fieldLabel: this.labelrury, name: 'rury',itemId: 'rury'}
                        ]
                    },
                    {xtype:'combobox',fieldLabel: this.labelFont, name: 'fontFamily',itemId:'fontFamily', maxLength:30, allowBlank:false, typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true,queryMode:'local',
                        store:[
                            ['arial','Arial'],
                            ['courier new','Courier New'],
                            ['times new roman','Times New Roman'],
                            ['ScionW01-550RRegular','ScionW01-550RRegular']
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults:{xtype: 'numberfield', labelAlign: 'top', allowBlank: false,margins: '0 5 0 0',flex:1},
                        bodyPadding: 5,
                        itemId: 'fontParams',
                        items: [
                            {fieldLabel: this.labelFontSize, name: 'fontSize',itemId: 'fontSize', maxValue: 99, minValue: 1},
                            {fieldLabel: this.labelLeading, name: 'leading',itemId: 'leading', maxValue: 99, minValue: 0},
                            {fieldLabel: this.labelRotate, name: 'rotate',itemId: 'rotate', maxValue: 360, minValue: 0,allowDecimals: false},
                            {xtype:'textfield',fieldLabel: this.labelColor, name:'color',itemId: 'color',allowBlank: true, maxLength: 6,margins: '0 0 0 0'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                            pack:'center'
                        },
                        defaults:{xtype:'checkboxfield', labelAlign: 'top',margins: '0 10 0 0',inputValue: true,uncheckedValue: false,editable:false},
                        bodyPadding: 5,
                        itemId: 'checks',
                        items: [
                            {fieldLabel  : this.labelBold, name: 'bold'},
                            {fieldLabel  : this.labelItalic, name: 'italic'},
                            {fieldLabel  : this.labelUnderline, name: 'underline'},
                            {fieldLabel  : this.labelUppercase, name: 'uppercase'},
                            {fieldLabel  : this.labelTabular, name: 'tabular'},
                            {
                                xtype: 'colorpicker',name:'colorPicker',itemId: 'colorPicker',value:'',margins: '0 0 0 40',
                                listeners: {
                                    select: function(picker, selColor) {
                                        Ext.ComponentQuery.query("stamptxtform #dataform #color")[0].setValue(selColor);
                                    },
                                    afterrender:function (picker) {
                                        var val=Ext.ComponentQuery.query("stamptxtform #dataform #color")[0].getValue();
                                        if( val&&(picker.colors.indexOf(val)!==-1))
                                            this.select(val);
                                    }
                                }
                            }
                        ]
                    },

                    {xtype:'textfield',fieldLabel: this.labelMask, name:'mask', maxLength: 20},
                    {xtype: 'textarea', fieldLabel: this.labelName, name: 'txt', maxLength: 100,minHeight :200}
                ],
                dockedItems : [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            '-', {xtype: 'button', text: this.btnSave, border: 1, action:'saveTxt',formBind: true, disabled: true},
                            '-', {xtype: 'button', text: this.btnExit, border: 1, handler: this.onCancel}
                        ]
                    }
                ]
            }
        ];

        this.callParent();
    },
    onCancel: function (btn) {
        btn.up('window').destroy();
    }
});
