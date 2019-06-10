/**
 * Cimsmgs_g1_detailpanel панель для ввода игформации в поле G1 отправитель для Cimsmgs
 */
Ext.define('TK.view.edit.Cimsmgs_g1_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',

    xtype:'cimsmgs_g1_detailpanel',

    requires: [
        'TK.Utils',
        'TK.view.edit.DetailPanel'
    ],
    x:500, y:50, width:750,
    itemId:'g1_panel',
    initComponent: function() {

        var config = {};
        Ext.apply(this, config);

        this.title=this.labelSender;

        // this.getComponent('name').getComponent('smgs.g1').fieldLabel=this.labelName;
        // this.getComponent('name').getComponent('smgs.g1r').fieldLabel=this.labelNameRu;
        //
        // this.getComponent('code').getComponent('smgs.g2_E').fieldLabel=this.labelSenderCod;
        //
        // this.getComponent('code_1').getComponent('smgs.g_1_5k').fieldLabel=this.labelCountryCode;
        // this.getComponent('code_1').getComponent('smgs.g17_1').fieldLabel=this.labelZip;
        //
        // this.getComponent('strn').getComponent('smgs.g16_1').fieldLabel=this.labelCountry;
        // this.getComponent('strn').getComponent('smgs.g16r').fieldLabel=this.labelCountryRu;
        //
        // this.getComponent('city').getComponent('smgs.g18_1').fieldLabel=this.labelCity;
        // this.getComponent('city').getComponent('smgs.g18r_1').fieldLabel=this.labelCityRu;
        //
        // this.getComponent('address').getComponent('smgs.g19_1').fieldLabel=this.labelAdress;
        // this.getComponent('address').getComponent('smgs.g19r').fieldLabel=this.labelAdressRu;
        //
        // this.getComponent('dop').getComponent('smgs.g1_dop_info').fieldLabel=this.labelOptInfo;
        this.items =[
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'name',
                defaults:{labelAlign : 'top'},
                items: [
                    {xtype:'textarea', fieldLabel:this.labelName, name:'smgs.g1', itemId:'smgs.g1', maxLength:512,flex: 11,height:100},
                    {   xtype: 'fieldcontainer',
                        height:100,
                        flex: 1,
                        layout: {type: 'vbox', pack: 'center'},
                        items: [
                            {xtype: 'button', text: '<--', handler: this.tr_name_ru, maxHeight:20,  margins: '2 2 2 2'},
                            {xtype: 'button', text: '-->', handler: this.tr_name_en, maxHeight:20,  margins: '2 2 2 2'}
                        ]
                    },
                    {xtype:'textarea', fieldLabel:this.labelNameRu, name:"smgs.g1r", itemId:"smgs.g1r", maxLength:512,flex: 10,height:100},
                    {xtype: 'button', text: '...', action: 'otpr', maxHeight:20,margins: '23 0 0 3',flex:1}
                ]
            },

            {xtype: 'hidden', name: 'smgs.g15_1', itemId:'smgs.g15_1', maxLength:3},

            // код отправителя
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'code',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel: this.labelSenderCod,xtype: 'textfield',  name: 'smgs.g2_E',itemId: 'smgs.g2_E', maxLength: 10,flex: 20}
                ]
            },

            // код страны+ индекс
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'code_1',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:this.labelCountryCode,xtype: 'textfield', name: 'smgs.g_1_5k', itemId:'smgs.g_1_5k', maxLength:3,flex: 10},
                    {xtype: 'label',width:35},
                    {fieldLabel:this.labelZip,xtype: 'textfield', name: 'smgs.g17_1', itemId:'smgs.g17_1', maxLength:10,flex: 10}
                ]
            },
            // название страны
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'strn',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel: this.labelCountry,xtype: 'textfield', name: 'smgs.g16_1', itemId:'smgs.g16_1', maxLength:32, flex: 11},
                    {xtype: 'label',width:35},
                    {fieldLabel: this.labelCountryRu,xtype: 'textfield',name: 'smgs.g16r', itemId:'smgs.g16r', maxLength:32, flex: 10},
                    {xtype: 'button', text: '...', action: 'country', maxHeight:20, margins: '23 0 0 3',flex:1}
                ]
            },
            // название города
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'city',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:this.labelCity,xtype: 'textfield', name: 'smgs.g18_1', itemId:'smgs.g18_1', maxLength:32, flex: 10} ,
                    {xtype: 'label',width:35},
                    {fieldLabel:this.labelCityRu,xtype: 'textfield', name: 'smgs.g18r_1', itemId:'smgs.g18r_1', maxLength:32, flex: 10}
                ]
            },
            // адрес
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'address',
                defaults:{labelAlign : 'top'},
                items: [
                    {xtype:'textarea', fieldLabel:this.labelAdress, name: 'smgs.g19_1', itemId:'smgs.g19_1', maxLength:128, flex: 10,height:100},
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
                    {xtype:'textarea', fieldLabel:this.labelAdressRu, name: 'smgs.g19r', itemId:'smgs.g19r', maxLength:250, flex: 10,height:100}
                ]
            },
            // VAT
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'vat',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:'VAT', name: 'smgs.g110',xtype: 'textfield', itemId:'smgs.g110', maxLength:16, flex: 20}
                ]
            },
            // дополнительная информация
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'dop',
                defaults:{labelAlign : 'top'},
                items: [
                    { fieldLabel: this.labelOptInfo, xtype: 'textarea', name: 'smgs.g1_dop_info', itemId: 'smgs.g1_dop_info', maxLength: 512, flex: 20 }
                ]
            }

        ];
            this.callParent(arguments);
    },
    tr_name_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g1_panel > #name')[0];
        var value = container.getComponent('smgs.g1r').getValue();
        var field_to = container.getComponent('smgs.g1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_name_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g1_panel > #name')[0];
        var value = container.getComponent('smgs.g1').getValue();
        var field_to=container.getComponent('smgs.g1r');
        TK.Utils.set_translit(value,field_to,'en');
    },
    tr_adr_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g1_panel > #address')[0];
        var value = container.getComponent('smgs.g19r').getValue();
        var field_to = container.getComponent('smgs.g19_1');
        TK.Utils.set_translit(value,field_to,'ru');

        container =Ext.ComponentQuery.query('#g1_panel > #city')[0];
        value = container.getComponent('smgs.g18r_1').getValue();
        field_to = container.getComponent('smgs.g18_1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_adr_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g1_panel > #address')[0];
        var value = container.getComponent('smgs.g19_1').getValue();
        var field_to=container.getComponent('smgs.g19r');
        TK.Utils.set_translit(value,field_to,'en');

        container =Ext.ComponentQuery.query('#g1_panel > #city')[0];
        value = container.getComponent('smgs.g18_1').getValue();
        field_to = container.getComponent('smgs.g18r_1');
        TK.Utils.set_translit(value,field_to,'en');
    },

    // имя
    //отображет склейку полей для графы 1
    setDisplayedField: function () {
        var field,container;
        var container = this.getComponent('code').getComponent('smgs.g2_E');

        // var field_g17_1=this.getComponent('code_1').getComponent('smgs.g17_1');
        // var field_g16_1=this.getComponent('strn').getComponent('smgs.g16_1');
        // var field_g18r_1=this.getComponent('city').getComponent('smgs.g18r_1');
        // var field_g18_1=this.getComponent('city').getComponent('smgs.g18_1');

        if (container) {
            field = container.getValue();
            if (field) {
                this.up('cimsmgs') ? this.up('cimsmgs').getComponent('smgs.g2').setValue(field):this.up('avisocimsmgs').getComponent('smgs.g2').setValue(field);
            }
            else
            {
                if(!this.hidden)
                {
                    this.up('cimsmgs') ? this.up('cimsmgs').getComponent('smgs.g2').setValue(''):this.up('avisocimsmgs').getComponent('smgs.g2').setValue('');
                }
            }
        }
        var row1 = '', row2 = '', row3 = '', result = '',_g1='',_g1r='',
        g = this.ownerCt.getComponent('disp.g1');
// формирование не ру части
        // 1 row
        // наименование
        container = this.getComponent('name');
        field = container.getComponent('smgs.g1');
        row1 += field.getValue() ? field.getValue(): '';

        //2 row
        // адресс
        container = this.getComponent('address');
        field = container.getComponent('smgs.g19_1');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город
        container = this.getComponent('city');
        field = container.getComponent('smgs.g18_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна
        container = this.getComponent('strn');
        field = container.getComponent('smgs.g16_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //индекс
        container = this.getComponent('code_1');
        field = container.getComponent('smgs.g17_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        container = this.getComponent('vat');
        field = container.getComponent('smgs.g110');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }

        // result non ru
        _g1 = row1 ? row1 : '';
        if (row2) {
            _g1 += _g1 ? '\n' : '';
            _g1 += row2;
        }

        // формирование  ру части
        row1='';
        row2='';
        // 1 row
        // наименование ру
        container = this.getComponent('name');
        field = container.getComponent('smgs.g1r');
        row1 += field.getValue() ? field.getValue(): '';

        //2 row
        // адресс ру
        container = this.getComponent('address');
        field = container.getComponent('smgs.g19r');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город ру
        container = this.getComponent('city');
        field = container.getComponent('smgs.g18r_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна, ру
        container = this.getComponent('strn');
        field = container.getComponent('smgs.g16r');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //индекс
        container = this.getComponent('code_1');
        field = container.getComponent('smgs.g17_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        container = this.getComponent('vat');
        field = container.getComponent('smgs.g110');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // 3 row
        // доп. инфо
        container = this.getComponent('dop');
        field = container.getComponent('smgs.g1_dop_info');
        if (field.getValue()) {
            row3 = field.getValue();
        }

        // result  ru
        _g1r = row1 ? row1 : '';
        if (row2) {
            _g1r += _g1r ? '\n' : '';
            _g1r += row2;
        }
        if (row3) {
            _g1r += _g1r ? '\n' : '';
            _g1r += row3;
        }

        g.setValue((_g1 ? _g1+'\n': '') + _g1r);


        // // наименование
        // var _g1a = (this.getComponent('name').getComponent('smgs.g1').getValue() ? this.getComponent('name').getComponent('smgs.g1').getValue(): '');
        // // адресс +город
        // var _g1b = (this.getComponent('address').getComponent('smgs.g19_1').getValue() ? this.getComponent('address').getComponent('smgs.g19_1').getValue() : '') +
        //     (this.getComponent('city').getComponent('smgs.g18_1').getValue() ? ', ' + this.getComponent('city').getComponent('smgs.g18_1').getValue() : '');
        // //страна+индекс+vat
        // var _g1c = (this.getComponent('strn').getComponent('smgs.g16_1').getValue() ?', '+ this.getComponent('strn').getComponent('smgs.g16_1').getValue() : '') +
        //     (this.getComponent('code_1').getComponent('smgs.g17_1').getValue() ? ', ' + this.getComponent('code_1').getComponent('smgs.g17_1').getValue() : '')+
        //     (this.getComponent('vat').getComponent('smgs.g110').getValue() ? ', VAT:' + this.getComponent('vat').getComponent('smgs.g110').getValue() : '');
        //
        // var _g1 = (_g1a ? _g1a+'\n': '')  + _g1b + _g1c;

        // var _g1ra = (this.getComponent('name').getComponent('smgs.g1r').getValue() ? this.getComponent('name').getComponent('smgs.g1r').getValue() +'\n': '');
        // var _g1rb = (this.getComponent('address').getComponent('smgs.g19r').getValue() ? this.getComponent('address').getComponent('smgs.g19r').getValue() : '') +
        //     (this.getComponent('city').getComponent('smgs.g18r_1').getValue() ? ' ' + this.getComponent('city').getComponent('smgs.g18r_1').getValue() : '');
        // container = this.getComponent('strn');
        // var _g1rc = (container.getComponent('smgs.g16r').getValue() ?' '+ container.getComponent('smgs.g16r').getValue() : '') +
        //     (this.getComponent('code_1').getComponent('smgs.g17_1').getValue() ? ' ' + this.getComponent('code_1').getComponent('smgs.g17_1').getValue() : '')+
        //     (this.getComponent('vat').getComponent('smgs.g110').getValue() ? ' VAT:' + this.getComponent('vat').getComponent('smgs.g110').getValue() : '');
        // var _g1r = _g1ra  + _g1rb  + _g1rc;
    },
    copyValues2MainFlds: function () {
        for (var prop in this.bufData) {
            if (this.getComponent('smgs.' + prop)) {
                this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
            }
        }
        this.getComponent('strn').getComponent('smgs.g16_1').setValue(this.bufData.g16_1);
        this.getComponent('strn').getComponent('smgs.g16r').setValue(this.bufData.g16r);
    },
    copyValues2Buf: function () {
        this.bufData = {};
        this.items.each(function (item, index, length) {
            if (item.items) {
                item.items.each(function (itm, index, length) {
                    if (itm.itemId) {
                        this.bufData[itm.itemId.split('.')[1]] = itm.getValue();
                    }
                }, this);
            } else {
                this.bufData[item.itemId.split('.')[1]] = item.getValue();
            }
        }, this);
    },
    initBuf: function () {
        this.bufData = {};
        var data = this.ownerCt.dataObj, arr;
        this.items.each(function (item, index, length) {
            if (item.items) {
                item.items.each(function (itm, index, length) {
                    if (itm.itemId) {
                        arr = itm.itemId.split('.');
                        this.bufData[arr[1]] = data[arr[1]];
                    }
                }, this);
            } else {
                arr = item.itemId.split('.');
                this.bufData[arr[1]] = data[arr[1]];
            }
        }, this);
    }
});