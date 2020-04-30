/**
 * Форма редактирования/добавления изображения штампа
 */
Ext.define('TK.view.stamp.StampPictureForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.stamppictureform',

    title: this.title,
    width: 720,
    // modal: true,
    layout: 'hbox',
    editIdx:-1,
    initComponent: function () {
        this.items = [
            {
                xtype:'form',
                itemId:'dataform',
                flex:2,
                layout: 'anchor',
              //  disableOnHide: false,
                bodyPadding: 5,
                defaults:{anchor:'100%', labelAlign: 'top'},

                items: [
                    {xtype:'hidden', name:'hid'},
                    {xtype:'hidden', name:'hidStamp'},
                    {xtype:'textfield', name:'pict', itemId:'pict',hidden: true, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrllx, name: 'rllx',itemId: 'rllx', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrlly, name: 'rlly',itemId: 'rlly', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrurx, name: 'rurx',itemId: 'rurx', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'numberfield',fieldLabel: this.labelrury, name: 'rury',itemId: 'rury', maxValue: 999999, minValue: 0, allowBlank: false},
                    {xtype: 'textarea', name: 'descr',itemId: 'descr', fieldLabel: this.labelDescr, maxLength: 100,minHeight :200},
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelImgFile,
                        layout: 'hbox',
                        itemId: 'picFile',
                        items: [
                            {xtype: 'textfield', name: 'fname',itemId: 'fname',readOnly: true},
                            {xtype:'button', text:'...', action:'selFile',margins: '0 0 0 5'}
                        ]
                    },
                ],
                dockedItems : [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            '-', {xtype: 'button', text: this.btnSave, border: 1, action:'savePic',formBind: true, disabled: true},
                            '-', {xtype: 'button', text: this.btnExit, border: 1, handler: this.onCancel}
                        ]
                    }
                ],
            },
            {
                xtype:'panel',
                flex:1,
                layout: 'fit',
                items:[
                    {
                        xtype: 'image',itemId:'preview',flex:1,
                        listeners: {
                            afterrender:function (imagevwr) {
                                var pic=Ext.ComponentQuery.query("stamppictureform #dataform #pict")[0].getValue();
                                if( pic) {
                                    imagevwr.setSrc('data:image/jpeg;base64,' + pic);
                                    imagevwr.updateLayout();
                                }
                            }
                        }
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
