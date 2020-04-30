/**
 * Smgs2_g4_detailpanel панель для ввода игформации в поле G4 получатель для smgs2
 */
Ext.define('TK.view.edit.Smgs2_g4_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',
    xtype: 'smgs2_g4_detailpanel',


    x: 400, y: 100, width: 400, height: 470,
    itemId: 'g4_panel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    initComponent: function () {

        var config = {};
        Ext.apply(this, config);
        this.callParent(arguments);

        this.title = this.labelReceiver;

        this.getComponent('naim').getComponent('smgs.g1r_1').fieldLabel = this.labelName;
        this.getComponent('strn').fieldLabel = this.labelCountry;
        this.getComponent('smgs.g5_E').fieldLabel = this.labelReceiverCod;
        this.getComponent('smgs.g47_1').fieldLabel = this.labelZip;
        this.getComponent('smgs.g18r_1_1').fieldLabel = this.labelCity;
        this.getComponent('smgs.g19r_1').fieldLabel = this.labelAdress;
        this.getComponent('smgs.g4_dop_info').fieldLabel = this.labelOptInfo;
    },
    items: [
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelName,
            layout: 'hbox',
            itemId: 'naim',
            items: [
                {xtype: 'textarea', name: "smgs.g4r", itemId: "smgs.g1r_1", maxLength: 512, flex: 1},
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    items: [
                        {xtype: 'button', text: '...', action: 'poluch', margins: '0 0 0 5'},
                        {xtype: 'button', text: 'Translit', action: 'trlitg4', margins: '5 0 0 5'}
                    ]
                }
            ]
        },
        // код получателя
        {fieldLabel: this.labelReceiverCod, name: 'smgs.g5_E', itemId: 'smgs.g5_E', maxLength: 10},
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelCountry,
            layout: 'hbox',
            itemId: 'strn',
            items: [
                {xtype: 'textfield', name: 'smgs.g45_1', itemId: 'smgs.g_1_5k_1', maxLength: 3, width: 50},
                {xtype: 'trigger',name: "smgs.g46r",itemId: "smgs.g16r_1",maxLength: 550,triggerCls: 'dir', flex: 1, margins: '0 0 0 5'}
            ]
        },
        {fieldLabel: this.labelCity, name: 'smgs.g48r', itemId: 'smgs.g18r_1_1', maxLength: 32},
        {fieldLabel: this.labelAdress, xtype: 'textarea', name: 'smgs.g49r', itemId: 'smgs.g19r_1', maxLength: 250},
        //{fieldLabel:'Код ТГНЛ', name:'smgs.g5_1', itemId:'smgs.g5_1', maxLength:32},
        //индекс
        {fieldLabel: this.labelZip, name: 'smgs.g47_1', itemId: 'smgs.g47_1', maxLength: 10},
        {fieldLabel: this.labelOptInfo,xtype: 'textarea',name: 'smgs.g4_dop_info', itemId: 'smgs.g4_dop_info', maxLength: 512 },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Код ОКПО',
            layout: 'hbox',
            itemId: 'code_p5',
            items: [
                {xtype: 'textfield', name: 'smgs.g5', itemId: 'smgs.g5', maxLength: 32, flex: 7},
                {xtype: 'label', text: 'Код ИИН:', flex: 6, margins: '0 0 0 10'},
                {xtype: 'textfield', name: 'smgs.g_5inn', itemId: 'smgs.g_5inn', maxLength: 32, flex: 8,margins: '0 0 0 5'}
            ]
        }

    ],
    setDisplayedField: function () {

        var container,
            field,
            row1 = '', row2 = '', row3 = '',
            result = '';
        // установка в форме отображения коды получателя
        container = this.getComponent('smgs.g5_E');

        if (container) {
            field = container.getValue();
            if (field) {
                this.up('smgs2') ? this.up('smgs2').getComponent('smgs.g5_').setValue(field):this.up('aviso2').getComponent('smgs.g5_').setValue(field);
            }
            else
            {
                if(!this.hidden)
                {
                    this.up('smgs2') ? this.up('smgs2').getComponent('smgs.g5_').setValue(''):this.up('aviso2').getComponent('smgs.g5_').setValue('');
                }
            }
        }

        // 1 row
        // наименование
        container = this.getComponent('naim');
        field = container.getComponent('smgs.g1r_1');
        row1 += field.getValue() ? field.getValue() : '';

        /*container = this;
         field = container.getComponent('smgs.g5_1');
         if (field.getValue()) {
         row1 += row1 ? ' ' : '';
         row1 += 'ТГНЛ ' + field.getValue();
         }
         row1 += row1 ? ';' : '';*/

        // 2 row
        // адресс
        container = this;
        field = container.getComponent('smgs.g19r_1');
        if (field.getValue()) {
            row2 += field.getValue();
        }
        // город
        container = this;
        field = container.getComponent('smgs.g18r_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна
        container = this.getComponent('strn');
        field = container.getComponent('smgs.g16r_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // индекс
        container = this;
        field = container.getComponent('smgs.g47_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //ОКПО
        container = this.getComponent('code_p5');
        field = container.getComponent('smgs.g5');
        if (field.getValue()) {
            row2 += row1 ? ', ' : '';
            row2 += 'ОКПО ' + field.getValue();
        }

        // ИНН
        container = this.getComponent('code_p5');
        field = container.getComponent('smgs.g_5inn');
        if (field.getValue()){
            row2 += row1 ? ', ' : '';
            row2 += field.getValue() ? 'ИИН ' + field.getValue() : '';
        }
        // container = this.getComponent('strn');
        // field = container.getComponent('smgs.g_1_5k_1');
        // row3 += field.getValue() ? field.getValue() : '';

        // 3 row
        // доп. инфо
        container = this;
        field = container.getComponent('smgs.g4_dop_info');
        if (field.getValue()) {
            row3= field.getValue();
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


        this.ownerCt.getComponent('disp.g4').setValue(result);
    },
    copyValues2MainFlds: function () {
        this.getComponent('smgs.g18r_1_1').setValue(this.bufData.g48r);
        this.getComponent('smgs.g19r_1').setValue(this.bufData.g49r);
        this.getComponent('naim').getComponent('smgs.g1r_1').setValue(this.bufData.g4r);
        this.getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(this.bufData.g45_1);
        this.getComponent('strn').getComponent('smgs.g16r_1').setValue(this.bufData.g46r);
    },
    copyValues2Buf: function () {
        this.bufData = {};
        this.items.each(function (item, index, length) {
            if (item.items) {
                item.items.each(function (itm, index, length) {
                    if (itm.itemId) {
                        this.bufData[itm.name.split('.')[1]] = itm.getValue();
                    }
                }, this);
            } else {
                this.bufData[item.name.split('.')[1]] = item.getValue();
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
                        arr = itm.name.split('.');
                        this.bufData[arr[1]] = data[arr[1]];
                    }
                }, this);
            } else {
                arr = item.name.split('.');
                this.bufData[arr[1]] = data[arr[1]];
            }
        }, this);
    },
    onClose:function () {
        if(this.g4_dop_infoBack)
            this.getComponent('smgs.g4_dop_info').setValue(this.g4_dop_infoBack);
        this.callParent(arguments);
    }
});