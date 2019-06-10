/**
 *  Cimsmgs_g1_detailpanel панель для ввода игформации в поле G4 получатель для Cimsmgs
 */
Ext.define('TK.view.edit.Cimsmgs_g4_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',

    xtype:'cimsmgs_g4_detailpanel',

    requires: [
        'TK.Utils',
        'TK.view.edit.DetailPanel'
    ],
    x:500, y:250, width:750,
    itemId:'g4_panel',
    title:this.labelReceiver,
    initComponent: function() {

        var config = {};
        Ext.apply(this, config);

        this.title=this.labelReceiver;

        // this.getComponent('name_4').getComponent('smgs.g1_1').fieldLabel=this.labelName;
        // this.getComponent('name_4').getComponent('smgs.g1r_1').fieldLabel=this.labelNameRu;
        //
        // this.getComponent('code_4').getComponent('smgs.g5_E').fieldLabel=this.labelReceiverCod;
        //
        // this.getComponent('code_1_4').getComponent('smgs.g15_1_1').fieldLabel=this.labelCountryCode;
        // this.getComponent('code_1_4').getComponent('smgs.g17_1_1').fieldLabel=this.labelZip;
        //
        // this.getComponent('strn_4').getComponent('smgs.g16_1_1').fieldLabel=this.labelCountry;
        // this.getComponent('strn_4').getComponent('smgs.g16r_1').fieldLabel=this.labelCountryRu;
        //
        // this.getComponent('city_4').getComponent('smgs.g18_1_1').fieldLabel=this.labelCity;
        // this.getComponent('city_4').getComponent('smgs.g18r_1').fieldLabel=this.labelCityRu;
        //
        // this.getComponent('address_4').getComponent('smgs.g19_1').fieldLabel=this.labelAdress;
        // this.getComponent('address_4').getComponent('smgs.g19r_1').fieldLabel=this.labelAdressRu;
        //
        // this.getComponent('dop_4').getComponent('smgs.g4_dop_info').fieldLabel=this.labelOptInfo;

        this.items=[
            {
                // название
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'name_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {xtype:'textarea', fieldLabel:this.labelName, name:'smgs.g4', itemId:'smgs.g1_1', maxLength:512,flex: 11,height:100},
                    {   xtype: 'fieldcontainer',
                        height:100,
                        flex: 1,
                        layout: {type: 'vbox', pack: 'center'},
                        items: [
                            {xtype: 'button', text: '<--', handler: this.tr_name_ru, maxHeight:20,  margins: '2 2 2 2'},
                            {xtype: 'button', text: '-->', handler: this.tr_name_en, maxHeight:20,  margins: '2 2 2 2'}
                        ]
                    },
                    {xtype:'textarea', fieldLabel:this.labelNameRu, name:"smgs.g4r", itemId:"smgs.g1r_1", maxLength:512,flex: 10,height:100},
                    {xtype: 'button', text: '...', action: 'poluch', maxHeight:20, margins: '23 0 0 3',flex: 1}
                ]
            },
            // код получателя
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'code_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel: this.labelReceiverCod,  name: 'smgs.g5_E',xtype: 'textfield',itemId: 'smgs.g5_E', maxLength: 10,flex: 20}
                ]
            },
            // код страны+индекс
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'code_1_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:this.labelCountryCode, name: 'smgs.g45_1',xtype: 'textfield', itemId:'smgs.g15_1_1', maxLength:3,flex: 10},
                    {xtype: 'label',width:35},
                    {fieldLabel:this.labelZip, name: 'smgs.g47_1', itemId:'smgs.g17_1_1',xtype: 'textfield', maxLength:10,flex: 10}
                ]
            },
            // название страны
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'strn_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:this.labelCountry, name: 'smgs.g46_1', itemId:'smgs.g16_1_1',xtype: 'textfield', maxLength:32,flex: 11},
                    {xtype: 'label',width:35},
                    {fieldLabel:this.labelCountryRu, name: 'smgs.g46r', itemId:'smgs.g16r_1',xtype: 'textfield', maxLength:32,flex: 10},
                    {xtype: 'button', text: '...', action: 'country_4', maxHeight:20, margins: '23 0 0 3',flex: 1}
                ]
            },
            // название города
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'city_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:this.labelCity, name: 'smgs.g48_1', itemId:'smgs.g18_1_1',xtype: 'textfield', maxLength:32,flex: 10},
                    {xtype: 'label',width:35},
                    {fieldLabel:this.labelCityRu, name: 'smgs.g48r', itemId:'smgs.g18r_1',xtype: 'textfield', maxLength:32,flex: 10}
                ]
            },
            // адрес
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'address_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {xtype:'textarea', fieldLabel:this.labelAdress, name: 'smgs.g49', itemId:'smgs.g19_1', maxLength:128,flex: 10,height:100},
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
                    {xtype:'textarea', fieldLabel:this.labelAdressRu, name: 'smgs.g49r', itemId:'smgs.g19r_1', maxLength:250,flex: 10,height:100}
                ]
            },
            // VAT
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'vat_4',
                defaults:{labelAlign : 'top'},
                items: [
                    {fieldLabel:'VAT', name: 'smgs.g410', itemId:'smgs.g110_1',xtype: 'textfield', maxLength:16,flex: 20}
                ]

            },
            // дополнительная информация
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                itemId: 'dop_4',
                defaults:{labelAlign : 'top'},
                items: [
                    { fieldLabel: this.labelOptInfo, xtype: 'textarea', name: 'smgs.g4_dop_info', itemId: 'smgs.g4_dop_info', maxLength: 512,flex: 20}
                ]
            }

        ];
        this.callParent(arguments);
    },

    tr_name_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g4_panel > #name_4')[0];
        var value = container.getComponent('smgs.g1r_1').getValue();
        var field_to = container.getComponent('smgs.g1_1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_name_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g4_panel > #name_4')[0];
        var value = container.getComponent('smgs.g1_1').getValue();
        var field_to=container.getComponent('smgs.g1r_1');
        TK.Utils.set_translit(value,field_to,'en');
    },
    tr_adr_ru:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g4_panel > #address_4')[0];
        var value = container.getComponent('smgs.g19r_1').getValue();
        var field_to = container.getComponent('smgs.g19_1');
        TK.Utils.set_translit(value,field_to,'ru');

        container =Ext.ComponentQuery.query('#g4_panel > #city_4')[0];
        value = container.getComponent('smgs.g18r_1').getValue();
        field_to = container.getComponent('smgs.g18_1_1');
        TK.Utils.set_translit(value,field_to,'ru');
    },
    tr_adr_en:function(btn)
    {
        var container =Ext.ComponentQuery.query('#g4_panel > #address_4')[0];
        var value = container.getComponent('smgs.g19_1').getValue();
        var field_to=container.getComponent('smgs.g19r_1');
        TK.Utils.set_translit(value,field_to,'en');

        container =Ext.ComponentQuery.query('#g4_panel > #city_4')[0];
        value = container.getComponent('smgs.g18_1_1').getValue();
        field_to = container.getComponent('smgs.g18r_1');
        TK.Utils.set_translit(value,field_to,'en');
    },

    //отображет склейку полей для графы 4
    setDisplayedField:function () {
        var container = this.getComponent('code_4').getComponent('smgs.g5_E');
        if (container) {
            field = container.getValue();
            if (field) {
                this.up('cimsmgs') ? this.up('cimsmgs').getComponent('smgs.g5').setValue(field):this.up('avisocimsmgs').getComponent('smgs.g5').setValue(field);

                // this.up('cimsmgs').getComponent('smgs.g5').setValue(field);
            }
            else
            {
                if(!this.hidden)
                {
                    this.up('cimsmgs') ? this.up('cimsmgs').getComponent('smgs.g5').setValue(''):this.up('avisocimsmgs').getComponent('smgs.g5').setValue('');
                }
            }
        }
        var row1 = '', row2 = '', row3 = '', result = '',_g4='',_g4r='',
         g = this.ownerCt.getComponent('disp.g4');
// формирование не ру инфо
        // 1 row
        // наименование
        container = this.getComponent('name_4');
        field = container.getComponent('smgs.g1_1');
        row1 += field.getValue() ? field.getValue(): '';
        //2 row
        // адресс
        container = this.getComponent('address_4');
        field = container.getComponent('smgs.g19_1');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город
        container = this.getComponent('city_4');
        field = container.getComponent('smgs.g18_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна
        container = this.getComponent('strn_4');
        field = container.getComponent('smgs.g16_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //индекс
        container = this.getComponent('code_1_4');
        field = container.getComponent('smgs.g17_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        container = this.getComponent('vat_4');
        field = container.getComponent('smgs.g110_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // result non ru
        _g4 = row1 ? row1 : '';
        if (row2) {
            _g4 += _g4 ? '\n' : '';
            _g4 += row2;
        }
        // формирование  ру части
        row1='';
        row2='';
        // 1 row
        // наименование ру
        container = this.getComponent('name_4');
        field = container.getComponent('smgs.g1r_1');
        row1 += field.getValue() ? field.getValue(): '';
        //2 row
        // адресс ру
        container = this.getComponent('address_4');
        field = container.getComponent('smgs.g19r_1');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город ру
        container = this.getComponent('city_4');
        field = container.getComponent('smgs.g18r_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна, ру
        container = this.getComponent('strn_4');
        field = container.getComponent('smgs.g16r_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //индекс
        container = this.getComponent('code_1_4');
        field = container.getComponent('smgs.g17_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        container = this.getComponent('vat_4');
        field = container.getComponent('smgs.g110_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // 3 row
        // доп. инфо
        container = this.getComponent('dop_4');
        field = container.getComponent('smgs.g4_dop_info');
        if (field.getValue()) {
            row3 = field.getValue();
        }
        _g4r = row1 ? row1 : '';
        if (row2) {
            _g4r += _g4r ? '\n' : '';
            _g4r += row2;
        }
        if (row3) {
            _g4r += _g4r ? '\n' : '';
            _g4r += row3;
        }
        g.setValue((_g4 ? _g4+'\n': '') + _g4r);
//         var _g4a = (this.getComponent('name_4').getComponent('smgs.g1_1').getValue() ? this.getComponent('name_4').getComponent('smgs.g1_1').getValue() +'\n': '');
//
//         var _g4b = (this.getComponent('address_4').getComponent('smgs.g19_1').getValue() ? this.getComponent('address_4').getComponent('smgs.g19_1').getValue() : '') +
//             (this.getComponent('city_4').getComponent('smgs.g18_1_1').getValue() ? ' ' + this.getComponent('city_4').getComponent('smgs.g18_1_1').getValue() : '');
//
//         var _g4c = (this.getComponent('strn_4').getComponent('smgs.g16_1_1').getValue() ?' '+ this.getComponent('strn_4').getComponent('smgs.g16_1_1').getValue() : '') +
//             (this.getComponent('code_1_4').getComponent('smgs.g17_1_1').getValue() ? ' ' + this.getComponent('code_1_4').getComponent('smgs.g17_1_1').getValue() : '') +
//             (this.getComponent('vat_4').getComponent('smgs.g110_1').getValue() ? ' VAT:' + this.getComponent('vat_4').getComponent('smgs.g110_1').getValue() : '');
//         var _g4 = _g4a + _g4b  + _g4c ;
//         // формирование  ру инфо
//         var _g4ra = (this.getComponent('name_4').getComponent('smgs.g1r_1').getValue() ? this.getComponent('name_4').getComponent('smgs.g1r_1').getValue() +'\n': '');
//
//         var _g4rb = (this.getComponent('address_4').getComponent('smgs.g19r_1').getValue() ? this.getComponent('address_4').getComponent('smgs.g19r_1').getValue() : '') +
//             (this.getComponent('city_4').getComponent('smgs.g18r_1').getValue() ? ' ' + this.getComponent('city_4').getComponent('smgs.g18r_1').getValue() : '');
//
//         var _g4rc = (this.getComponent('strn_4').getComponent('smgs.g16r_1').getValue() ?' '+ this.getComponent('strn_4').getComponent('smgs.g16r_1').getValue(): '') +
//             (this.getComponent('code_1_4').getComponent('smgs.g17_1_1').getValue() ? ' ' + this.getComponent('code_1_4').getComponent('smgs.g17_1_1').getValue() : '') +
//             (this.getComponent('vat_4').getComponent('smgs.g110_1').getValue() ? ' VAT:' + this.getComponent('vat_4').getComponent('smgs.g110_1').getValue() : '');
//
//         var _g4di=this.getComponent('dop_4').getComponent('smgs.g4_dop_info').getValue()?'\n'+this.getComponent('dop_4').getComponent('smgs.g4_dop_info').getValue():'';
//         var _g4r = _g4ra + _g4rb  + _g4rc+_g4di;
        // result  ru

    },
    copyValues2MainFlds:function () {
        for (var prop in this.bufData) {
            if (this.getComponent('smgs.' + prop)) {
                this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
            }
        }
    },
    copyValues2Buf:function () {
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
    initBuf:function () {
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