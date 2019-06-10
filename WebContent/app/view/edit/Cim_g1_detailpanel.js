/**
 * Created by Odmin on 15.11.2018.
 */
Ext.define('TK.view.edit.Cim_g1_detailpanel', {
    extend: 'TK.view.edit.DetailPanel',

    xtype:'cim_g1_detailpanel',

    requires: [
        'TK.view.edit.DetailPanel'
    ],

    x:500, y:100, width:400, height:450,
    itemId:'g1_panel',
    title:this.labelSender,
    initComponent: function() {

        var config = {};
        Ext.apply(this, config);
        this.callParent(arguments);
        this.title=this.labelSender;
        this.getComponent('naim').fieldLabel=this.labelName;
        this.getComponent('strn').fieldLabel=this.labelCountry;
        this.getComponent('smgs.g2_E').fieldLabel=this.labelSenderCod;
        this.getComponent('smgs.g17_1').fieldLabel=this.labelZip;
        this.getComponent('smgs.g18_1').fieldLabel=this.labelCity;
        this.getComponent('smgs.g19_1').fieldLabel=this.labelAdress;
        this.getComponent('smgs.g1_dop_info').fieldLabel=this.labelOptInfo;
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    items:[
        // наименование
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelName,
            layout: 'hbox',
            itemId:'naim',
            items: [
                {xtype:'textarea', name:"smgs.g1", itemId:"smgs.g1", maxLength:512, flex:1},
                {xtype:'button', text:'...', action:'otpr',margins: '0 0 0 5'}
            ]
        },
        // код отправителя

        {xtype: 'textfield', fieldLabel: this.labelSenderCod, name: 'smgs.g2_E',itemId: 'smgs.g2_E', maxLength: 10},
        // страна
        {
            xtype: 'fieldcontainer',
            fieldLabel: this.labelCountry,
            layout: 'hbox',
            itemId:'strn',
            items: [
                {xtype:'textfield',name: 'smgs.g_1_5k', itemId:'smgs.g_1_5k', maxLength:3, width:50,flex: 2},
                {xtype:'textfield', name:"smgs.g16_1", itemId:"smgs.g16_1", maxLength:32,flex: 18},
                {xtype: 'button', text: '...', action: 'country', maxLength:32, margins: '0 0 0 5',flex: 2}
            ]
        },
        //  индекс
        {fieldLabel:this.labelZip,xtype: 'textfield', name: 'smgs.g17_1', itemId:'smgs.g17_1', maxLength:10},
        // город
        {fieldLabel:this.labelCity,xtype: 'textfield', name: 'smgs.g18_1', itemId:'smgs.g18_1', maxLength:32},
        // адрес
        {fieldLabel:this.labelAdress, xtype:'textarea', name: 'smgs.g19_1', itemId:'smgs.g19_1', maxLength:128},
        // vat
        {fieldLabel:'VAT', name: 'smgs.g110',xtype: 'textfield', itemId:'smgs.g110', maxLength:16},
        // доп. инфо.
        { fieldLabel: this.labelOptInfo, xtype: 'textarea', name: 'smgs.g1_dop_info', itemId: 'smgs.g1_dop_info', maxLength: 512}
    ],
    setDisplayedField:function() {
        var container,
            field,
            row1 = '', row2 = '', row3 = '',
            result = '';
        container = this.getComponent('smgs.g2_E');
        if (container) {
            field = container.getValue();
            var panel=this.up('cim')?this.up('cim').getComponent('cimformpanel'):this.up('avisocim').getComponent('cimformpanel');
            if (field) {
                // this.up('cim') ? this.up('cim').getComponent('smgs.g2').setValue(field):this.up('avisocim').getComponent('smgs.g2').setValue(field);
                if(panel)
                    panel.getComponent('smgs.g2').setValue(field);

            }
            else
            {
                if(!this.hidden)
                {
                    //this.up('cim') ? this.up('cim').getComponent('smgs.g2').setValue(''):this.up('avisocim').getComponent('smgs.g2').setValue('');
                    if(panel)
                        panel.getComponent('smgs.g2').setValue('');
                }
            }
        }
        // 1 row
        // наименование
        container = this.getComponent('naim');
        field = container.getComponent('smgs.g1');
        row1 += field.getValue() ? field.getValue(): '';
        // 2 row
        // адресс
        container = this;
        field = container.getComponent('smgs.g19_1');
        if (field.getValue()) {
            row2 = field.getValue();
        }
        // город
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
        // индекс
        container = this;
        field = container.getComponent('smgs.g17_1');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        //VAT
        field = container.getComponent('smgs.g110');
        if (field.getValue()) {
            row2 += row2 ? ', ' : '';
            row2 += field.getValue();
        }
        // 3 row
        // доп. инфо
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

        // var naim = '', strn = '', addr = '',dop = '', nl = '\n',dop='';
        // naim = (this.getComponent('naim').getComponent('smgs.g1').getValue() ? this.getComponent('naim').getComponent('smgs.g1').getValue() +nl : '');
        // strn =(this.getComponent('strn').getComponent('smgs.g16_1').getValue() ? this.getComponent('strn').getComponent('smgs.g16_1').getValue() + ' ': '')+
        //     (this.getComponent('smgs.g17_1').getValue() ?' '+this.getComponent('smgs.g17_1').getValue() : '');
        // if(strn) strn+= ' ';
        // addr = (this.getComponent('smgs.g19_1').getValue() ? this.getComponent('smgs.g19_1').getValue()+' ': '')+
        //     (this.getComponent('smgs.g18_1').getValue() ? this.getComponent('smgs.g18_1').getValue()  : '');
        //
        //
        // dop=(this.getComponent('smgs.g110').getValue()?' '+ 'VAT:'+this.getComponent('smgs.g110').getValue():'')+
        //     (this.getComponent('smgs.g1_dop_info').getValue() ? nl+this.getComponent('smgs.g1_dop_info').getValue(): '');
        // this.ownerCt.getComponent('disp.g1').setValue(naim +addr+ strn + dop);
    },
    copyValues2MainFlds:function(){
        for(var prop in this.bufData){
            if(this.getComponent('smgs.' + prop)){
                this.getComponent('smgs.' + prop).setValue(this.bufData[prop]);
            }
        }
        this.getComponent('naim').getComponent('smgs.g1').setValue(this.bufData.g1);
        this.getComponent('strn').getComponent('smgs.g_1_5k').setValue(this.bufData.g_1_5k);
        this.getComponent('strn').getComponent('smgs.g16_1').setValue(this.bufData.g16_1);
    },
    copyValues2Buf:function(){
        this.bufData = {};
        this.items.each(function(item,index,length){
            if(item.items) {
                item.items.each(function(itm,index,length){
                    if(itm.itemId){
                        this.bufData[itm.itemId.split('.')[1]] = itm.getValue();
                    }
                }, this);
            } else {
                this.bufData[item.itemId.split('.')[1]] = item.getValue();
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