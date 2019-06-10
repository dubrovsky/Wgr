/**
 * Created by Odmin on 15.11.2018.
 */
Ext.define('TK.view.edit.Cim_g4_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',
    xtype:'cim_g4_detailpanel',

    requires: [],

    x:500, y:100, width:400, height:450,
    itemId:'g4_panel',
    title:this.labelReceiver,
    initComponent: function() {

        var config = {};
        Ext.apply(this, config);
        this.callParent(arguments);
        this.title=this.labelReceiver;
        this.getComponent('naim').fieldLabel=this.labelName;
        this.getComponent('strn').fieldLabel=this.labelCountry;
        this.getComponent('smgs.g5_E').fieldLabel=this.labelReceiverCod;
        this.getComponent('smgs.g17_1_1').fieldLabel=this.labelZip;
        this.getComponent('smgs.g48_1').fieldLabel=this.labelCity;
        this.getComponent('smgs.g49').fieldLabel=this.labelAdress;
        this.getComponent('smgs.g4_dop_info').fieldLabel=this.labelOptInfo;
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    // наименование
    items:[
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelName,
            layout: 'hbox',
            itemId:'naim',
            items: [
                {xtype:'textarea', name:"smgs.g4", itemId:"smgs.g4", maxLength:512, flex:1},
                {xtype:'button', text:'...', action:'poluch',margins: '0 0 0 5'}
            ]
        },
        // код получателя
        {xtype: 'textfield', fieldLabel: this.labelReceiverCod, name: 'smgs.g5_E',itemId: 'smgs.g5_E', maxLength: 10},
        // страна
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelCountry,
            layout: 'hbox',
            itemId:'strn',
            items: [
                {xtype:'textfield',name: 'smgs.g_4_5k', itemId:'smgs.g_4_5k', maxLength:3, width:50, flex:2},
                {xtype:'textfield', name:"smgs.g46_1", itemId:"smgs.g46_1", maxLength:32, flex:18},
                {xtype: 'button', text: '...', action: 'country_4', maxLength:32, margins: '0 0 0 5',flex: 2}
            ]
        },
        //  индекс
        {fieldLabel:this.labelZip, name: 'smgs.g47_1', itemId:'smgs.g17_1_1',xtype: 'textfield', maxLength:10},
        // город
        {fieldLabel:this.labelCity, name: 'smgs.g48_1', itemId:'smgs.g48_1', maxLength:32},
        // адрес
        {fieldLabel:this.labelAdress, xtype:'textarea', name: 'smgs.g49', itemId:'smgs.g49', maxLength:128},
        // vat
        {fieldLabel:'VAT', name: 'smgs.g410', itemId:'smgs.g110_1',xtype: 'textfield', maxLength:16},
        // доп. инфо.
        { fieldLabel: this.labelOptInfo, xtype: 'textarea', name: 'smgs.g4_dop_info', itemId: 'smgs.g4_dop_info', maxLength: 512}
    ],
    setDisplayedField:function() {
        var container,
            field,
            row1 = '', row2 = '', row3 = '',
            result = '';
        container = this.getComponent('smgs.g5_E');
        if (container) {
            field = container.getValue();
            var panel=this.up('cim')?this.up('cim').getComponent('cimformpanel'):this.up('avisocim').getComponent('cimformpanel');
            if (field) {
                // this.up('cimpanelId') ? this.up('cimpanelId').getComponent('smgs.g5').setValue(field):this.up('avisocim').getComponent('smgs.g5').setValue(field);
                if(panel)
                    panel.getComponent('smgs.g5').setValue(field);
            }
            else
            {
                if(!this.hidden)
                {
                    // this.up('cimpanelId') ? this.up('cimpanelId').getComponent('smgs.g5').setValue(''):this.up('avisocim').getComponent('smgs.g5').setValue('');
                    if(panel)
                        panel.getComponent('smgs.g5').setValue('');
                }
            }
        }
        // 1 row
        // наименование
        container = this.getComponent('naim');
        field = container.getComponent('smgs.g4');
        row1 += field.getValue() ? field.getValue(): '';
        // 2 row
        // адресс
        container = this;
        field = container.getComponent('smgs.g49');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город
        field = container.getComponent('smgs.g48_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //страна
        container = this.getComponent('strn');
        field = container.getComponent('smgs.g46_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // индекс
        container = this;
        field = container.getComponent('smgs.g17_1_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        field = container.getComponent('smgs.g110_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // 3 row
        // доп. инфо
        field = container.getComponent('smgs.g4_dop_info');
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
        this.ownerCt.getComponent('disp.g4').setValue(result);
        // var naim = '', strn = '', addr = '', nl = '\n',dop='';
        // naim = (this.getComponent('naim').getComponent('smgs.g4').getValue() ? this.getComponent('naim').getComponent('smgs.g4').getValue() +nl : '');
        // strn =(this.getComponent('strn').getComponent('smgs.g46_1').getValue() ? this.getComponent('strn').getComponent('smgs.g46_1').getValue() : '')+
        //     (this.getComponent('smgs.g17_1_1').getValue() ?' '+this.getComponent('smgs.g17_1_1').getValue() : '');
        // if(strn) strn+= ' ';
        // addr = (this.getComponent('smgs.g49').getValue() ? this.getComponent('smgs.g49').getValue() + ' ': '')+
        // (this.getComponent('smgs.g48_1').getValue() ? this.getComponent('smgs.g48_1').getValue()  : '');
        //
        //
        // dop=(this.getComponent('smgs.g110_1').getValue()?' '+ 'VAT:'+this.getComponent('smgs.g110_1').getValue():'')+
        //     (this.getComponent('smgs.g4_dop_info').getValue() ? nl+this.getComponent('smgs.g4_dop_info').getValue(): '');
        // this.ownerCt.getComponent('disp.g4').setValue(naim +addr+ strn + dop);
    },
    copyValues2MainFlds:function(){
        this.getComponent('smgs.g48_1').setValue(this.bufData.g48_1);
        this.getComponent('smgs.g49').setValue(this.bufData.g49);
//                    this.getComponent('smgs.g111_1').setValue(this.bufData.g411);
//                    this.getComponent('smgs.g17_1_1').setValue(this.bufData.g47_1);
        this.getComponent('naim').getComponent('smgs.g4').setValue(this.bufData.g4);
        this.getComponent('strn').getComponent('smgs.g_4_5k').setValue(this.bufData.g_4_5k);
        this.getComponent('strn').getComponent('smgs.g46_1').setValue(this.bufData.g46_1);
    },
    copyValues2Buf:function(){
        this.bufData = {};
        this.items.each(function(item,index,length){
            if(item.items) {
                item.items.each(function(itm,index,length){
                    if(itm.itemId){
                        this.bufData[itm.name.split('.')[1]] = itm.getValue();
                    }
                }, this);
            } else {
                this.bufData[item.name.split('.')[1]] = item.getValue();
            }
        }, this);
    },
    initBuf:function(){
        this.bufData = {};
        var data = this.ownerCt.ownerCt.dataObj, arr;
        this.items.each(function(item,index,length){
            if(item.items) {
                item.items.each(function(itm,index,length){
                    if(itm.itemId){
                        arr = itm.name.split('.');
                        this.bufData[arr[1]] = data[arr[1]];
                    }
                }, this);
            } else {
                arr = item.name.split('.');
                this.bufData[arr[1]] = data[arr[1]];
            }
        }, this);
    }
});