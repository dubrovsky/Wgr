/**
 * форма для ввода информации об отправителе/получателе
 */
Ext.define('TK.view.edit.OtpavitelEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.otpaviteledit',
    xtype:'otpaviteledit',
    requires: [
        'TK.Utils'
    ],

    itemId: 'ed_panel',
    height: 700,
    width: 500,
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
                    '-', {
                        text: this.saveBtn,
                        formBind: true,
                        scope: this,
                        action: 'save'
                    },
                    '-', {
                        text:this.closeBtn ,
                        action: 'close',
                        scope: this
                    }]
            }
        ]
    },

    buildItems: function(config) {
        var me=this;
        config.items = [
            {
                xtype:'form',
                border:false,
                itemId: 'otprForm',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                fieldDefaults: {labelWidth: 130},
                defaults: {anchor: '100%'},

                defaultType: 'textfield',
                items: [
                    // наименование нон-ру+ру
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'name',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {xtype:'textarea', fieldLabel:this.labelOtprName, name:'g1', itemId:'g1', maxLength:512,flex: 10,height:100},
                            {   xtype: 'fieldcontainer',
                                height:100,
                                flex: 1,
                                layout: {type: 'vbox', pack: 'center'},
                                items: [
                                    {xtype: 'button', text: '<--', handler: this.tr_name_ru, maxHeight:20,  margins: '2 2 2 2'},
                                    {xtype: 'button', text: '-->', handler: this.tr_name_en, maxHeight:20,  margins: '2 2 2 2'}
                                ]
                            },
                            {xtype:'textarea', fieldLabel:this.labelOtprNameRu, name:"g1r", itemId:"g1r", maxLength:512,flex: 10,height:100}
                        ]
                    },
                    {xtype: 'hidden', name: 'hid', itemId:'hid', maxLength:20},
                    {xtype: 'hidden', name: 'g15_1', itemId:'g15_1', maxLength:3},
                    //  индекс +код страны
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'code_1',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel:this.labelZip,xtype: 'textfield', name: 'g17_1', itemId:'g17_1', maxLength:10,flex: 10},
                            {xtype: 'label',width:35},
                            {fieldLabel:this.labelCountryCode,xtype: 'textfield', name: 'g_1_5k', itemId:'g_1_5k', maxLength:3,flex: 10}
                        ]
                    },
                    // название страны
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'strn',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel: this.labelCountry,xtype: 'textfield', name: 'g16_1', itemId:'g16_1', maxLength:32, flex: 11},
                            {xtype: 'label',width:35},
                            { fieldLabel: this.labelCountryRu,xtype: 'textfield',name: 'g16r', itemId:'g16r', maxLength:32, flex: 10},
                            {xtype: 'button', text: '...', action: 'country', maxHeight:20, margins: '23 0 0 2',flex: 1}
                        ]
                    },
                    // название города
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'city',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel:this.labelCity,xtype: 'textfield', name: 'g18_1', itemId:'g18_1', maxLength:32, flex: 10},
                            {xtype: 'label',width:35},
                            {fieldLabel:this.labelCityRu,xtype: 'textfield', name: 'g18r_1', itemId:'g18r_1', maxLength:32, flex: 10}
                        ]
                    },
                    // адрес
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'address',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {xtype:'textarea', fieldLabel:this.labelAdress, name: 'g19_1', itemId:'g19_1', maxLength:128, flex: 10,height:100},
                            {   xtype: 'fieldcontainer',
                                height:100,
                                layout: {
                                    type: 'vbox',
                                    pack: 'center'
                                },
                                items: [
                                    {xtype: 'button', text: '<--', handler: this.tr_adr_ru, maxHeight:20,  margins: '2 2 2 2'},
                                    {xtype: 'button', text: '-->', handler: this.tr_adr_en, maxHeight:20,  margins: '2 2 2 2'}
                                ]
                            },
                            {xtype:'textarea', fieldLabel:this.labelAdressRu, name: 'g19r', itemId:'g19r', maxLength:250, flex: 10,height:100}
                        ]
                    },
                    // код отправителя + ОКПО
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'code',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel: this.labelSenRecCode,xtype: 'textfield',  name: 'g2',itemId: 'g2', maxLength: 10,flex: 10},
                            {xtype: 'label',width:35},
                            {fieldLabel: this.labelOKPO, xtype: 'textfield', name: 'g3', itemId: 'g3', maxLength: 32, flex: 10}
                        ]
                    },

                    // код инн+vat
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'codes',
                        defaults:{labelAlign : 'top'},
                        items: [

                            {fieldLabel: this.labelNNcode,  xtype: 'textfield', name: 'g_2inn',itemId: 'g_2inn', maxLength: 32,flex: 10},
                            {xtype: 'label',width:35},
                            {fieldLabel:'VAT', name: 'g110',xtype: 'textfield', itemId:'g110', maxLength:16, flex: 10}
                        ]
                    },

                    // email
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'email',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel: me.labelEmail,xtype: 'textfield', name: 'g11', itemId: 'g11', maxLength: 80,flex: 20}
                        ]
                    },

                    //телефон факс
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'telfax',
                        defaults:{labelAlign : 'top'},
                        items: [
                            {fieldLabel: this.labelPhone,xtype: 'textfield', name: 'g12', itemId: 'g12', maxLength: 60,flex: 10},
                            {xtype: 'label',width:35},
                            {fieldLabel: this.labelFax,xtype: 'textfield', name: 'g13', itemId: 'g13', maxLength: 60,flex: 10}
                        ]
                    },
                    // дополнительная информация
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId: 'dop',
                        defaults:{labelAlign : 'top'},
                        items: [
                            { fieldLabel: this.labelDopInfo, xtype: 'textarea', name: 'dop_info', itemId: 'dop_info', maxLength: 512, flex: 20 }
                        ]
                    }
                ]
            }
        ];
    },
    tr_name_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#otprForm > #name')[0];
        var value = container.getComponent('g1r').getValue();
        var field_to = container.getComponent('g1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_name_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#otprForm > #name')[0];
        var value = container.getComponent('g1').getValue();
        var field_to=container.getComponent('g1r');
        TK.Utils.set_translit(value,field_to,'en');
    },
    tr_adr_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#otprForm > #address')[0];
        var value = container.getComponent('g19r').getValue();
        var field_to = container.getComponent('g19_1');
        TK.Utils.set_translit(value,field_to,'ru');

        container =Ext.ComponentQuery.query('#otprForm > #city')[0];
        value = container.getComponent('g18r_1').getValue();
        field_to = container.getComponent('g18_1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_adr_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#otprForm > #address')[0];
        var value = container.getComponent('g19_1').getValue();
        var field_to=container.getComponent('g19r');
        TK.Utils.set_translit(value,field_to,'en');

        container =Ext.ComponentQuery.query('#otprForm > #city')[0];
        value = container.getComponent('g18_1').getValue();
        field_to = container.getComponent('g18r_1');
        TK.Utils.set_translit(value,field_to,'en');
    },
});