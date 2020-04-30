/**
 * Smgs2_g1_detailpanel панель для ввода игформации в поле G1 отправитель для smgs2
 */
Ext.define('TK.view.edit.Smgs2_g1_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',
    xtype: 'smgs2_g1_detailpanel',

    requires: [
        'TK.view.edit.DetailPanel'
    ],

    x: 400, y: 100, width: 400, height: 470,
    itemId: 'g1_panel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    title: this.labelSender,
    // локализация
    initComponent: function () {

        var config = {};
        Ext.apply(this, config);
        this.callParent(arguments);

        this.title = this.labelSender;

        this.getComponent('naim').getComponent('smgs.g1r').fieldLabel = this.labelName;
        this.getComponent('strn').fieldLabel = this.labelCountry;
        this.getComponent('smgs.g17_1').fieldLabel = this.labelZip;
        this.getComponent('smgs.g2_E').fieldLabel = this.labelSenderCod;
        this.getComponent('smgs.g18r_1').fieldLabel = this.labelCity;
        this.getComponent('smgs.g19r').fieldLabel = this.labelAdress;
        this.getComponent('smgs.g1_dop_info').fieldLabel = this.labelOptInfo;
    },
    items: [
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelName,
            layout: 'hbox',
            itemId: 'naim',
            items: [
                {xtype: 'textarea', name: "smgs.g1r", itemId: "smgs.g1r", maxLength: 512, flex: 1},
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    items: [
                        {xtype: 'button', text: '...', action: 'otpr', margins: '0 0 0 5'},
                        {xtype: 'button', text: 'Translit', action: 'trlitg1', margins: '5 0 0 5'}
                    ]
                }
            ]
        },
        // код отправителя
        {fieldLabel: this.labelSenderCod, itemId: 'smgs.g2_E', name: 'smgs.g2_E', maxLength: 10},

        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelCountry,
            layout: 'hbox',
            itemId: 'strn',
            items: [
                {xtype: 'textfield', name: 'smgs.g15_1', itemId: 'smgs.g15_1', maxLength: 3, width: 50},
                {xtype: 'trigger', name: "smgs.g16r", itemId: "smgs.g16r", maxLength: 550, triggerCls: 'dir',flex: 1, margins: '0 0 0 5' }
            ]
        },
        // город
        {fieldLabel: this.labelCity, name: 'smgs.g18r_1', itemId: 'smgs.g18r_1', maxLength: 32},
        // адресс
        {fieldLabel: this.labelAdress, xtype: 'textarea', name: 'smgs.g19r', itemId: 'smgs.g19r', maxLength: 250},

        //индекс
        {fieldLabel: this.labelZip, name: 'smgs.g17_1', itemId: 'smgs.g17_1', maxLength: 10},
        // доп. инфо
        {
            fieldLabel: this.labelOptInfo,
            xtype: 'textarea',
            name: 'smgs.g1_dop_info',
            itemId: 'smgs.g1_dop_info',
            maxLength: 512
        },

        //{fieldLabel:'Код ТГНЛ', name:'smgs.g2_1', itemId:'smgs.g2_1', maxLength:32},
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Код ОКПО',
            layout: 'hbox',
            itemId: 'code_p1',
            items: [
                {xtype: 'textfield', name: 'smgs.g2', itemId: 'smgs.g2', maxLength: 32, flex: 7},
                {xtype: 'label', text: 'Код ИИН:', flex: 6, margins: '0 0 0 10'},
                {
                    xtype: 'textfield',
                    name: 'smgs.g_2inn',
                    itemId: 'smgs.g_2inn',
                    maxLength: 32,
                    flex: 8,
                    margins: '0 0 0 5'
                }
            ]
        }
    ],
    setDisplayedField: function () {
        var container,
            field,
            row1 = '', row2 = '', row3 = '',
            result = '';

        //установка кода отправителя
        container = this.getComponent('smgs.g2_E');
        if (container) {
            field = container.getValue();
            if (field) {
                // this.up('smgs2').getComponent('smgs.g2_').setValue(field);
                this.up('smgs2') ? this.up('smgs2').getComponent('smgs.g2_').setValue(field):this.up('aviso2').getComponent('smgs.g2_').setValue(field);
            }
            else
            {
                if(!this.hidden)
                    this.up('smgs2') ? this.up('smgs2').getComponent('smgs.g2_').setValue(''):this.up('aviso2').getComponent('smgs.g2_').setValue('');
            }

        }

        // 1 row
        // наименование ру
        container = this.getComponent('naim');
        field = container.getComponent('smgs.g1r');
        row1 += field.getValue() ? field.getValue(): '';

        // container = this;
        /*field = container.getComponent('smgs.g2_1');
         if (field.getValue()) {
         row1 += row1 ? ' ' : '';
         row1 += 'ТГНЛ ' + field.getValue();
         }
         row1 += row1 ? ';' : '';*/

        // 2 row
        // адресс
        container = this;
        field = container.getComponent('smgs.g19r');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город
        container = this;
        field = container.getComponent('smgs.g18r_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна
        container = this.getComponent('strn');
        field = container.getComponent('smgs.g16r');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // индекс
        container = this;
        field = container.getComponent('smgs.g17_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }

        //ОКПО
        container = this.getComponent('code_p1');
        field = container.getComponent('smgs.g2');
        if (field.getValue()) {
            row2 += row1 ? ', ' : '';
            row2 += 'ОКПО ' + field.getValue();
        }
        // ИНН
        container = this.getComponent('code_p1');
        field = container.getComponent('smgs.g_2inn');
        if (field.getValue()) {
            row2 += row1 ? ', ' : '';
            row2 += field.getValue() ? 'ИИН ' + field.getValue() : '';
        }
        // 3 row
        // container = this.getComponent('strn');
        // field = container.getComponent('smgs.g15_1');
        // row3 += field.getValue() ? field.getValue() : '';


        // 3 row
        // доп. инфо
        container = this;
        field = container.getComponent('smgs.g1_dop_info');
        if (field.getValue()) {
            row3 = field.getValue();
        }

        // result
        result = row1 ? row1 : '';
        if (row2) {
            result += result ? '\n' : '';
            result += row2;
        }

        if (row3) {
            result += result ? '\n' : '';
            result += row3;
        }

        this.ownerCt.getComponent('disp.g1').setValue(result);
//                    this.ownerCt.getComponent('smgs.g2_').setValue(this.getComponent('code_p1').getComponent('smgs.g2').getValue());
    },
    copyValues2MainFlds: function () {
        for (var prop in this.bufData) {
            if (this.getComponent('smgs.' + prop)) {
                this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
            }
        }
        this.getComponent('naim').getComponent('smgs.g1r').setValue(this.bufData.g1r);
        this.getComponent('strn').getComponent('smgs.g15_1').setValue(this.bufData.g15_1);
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
    },
    onClose:function () {
        if(this.g1_dop_infoBack)
            this.getComponent('smgs.g1_dop_info').setValue(this.g1_dop_infoBack);
        this.callParent(arguments);
    }
});