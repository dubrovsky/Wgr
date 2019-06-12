Ext.define('TK.view.ky2.VgCtGrTreeForm', {
    extend: 'TK.view.ky2.AbstractTreeForm',
    alias: 'widget.ky2vgctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel'
    ],

    buildMainPanel: function(){
        return [{
            xtype: 'tabpanel',
            flex: 2,
            defaults: {
                xtype: 'form',
                defaults: {
                    anchor: '100%'
                },
                hidden: true,
                bodyPadding: 5
            },
            tabBar: {
                hidden: true
            },
            items:[{
                hidden: false,
                xtype: 'component'
            }].concat(this.buildTabPanelItems())
        }];
    },

    buildTabPanelItems: function(){
        return [{
            title: 'Вагон',
            itemId: 'vag',
            items: [
                {xtype:'textfield', fieldLabel:'№ вагона', name:"nvag", maxLength:160, width:150, validator: TK.Validators.vagNum},
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    fieldLabel: 'Вагон предоставлен',
                    name:'vagOtm',
                    store: [['П', 'Перевозчиком'], ['О', 'Отправителем']]
                },
                {xtype:'numberfield', fieldLabel:'Тоннаж', name:"grPod", maxLength:5, width:100, minValue:0, decimalPrecision:2},
                {xtype:'numberfield', fieldLabel:'Тара', name:"taraVag", maxLength:5, width:100, minValue:0, decimalPrecision:2},
                {xtype:'numberfield', fieldLabel:'Оси', name:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                {xtype:'textfield', fieldLabel:'Владелец вагона', name:"klientName", maxLength:124, width:100},
                {xtype:'textfield', fieldLabel:'Род вагона', name:"rod", maxLength:20, width:100},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: 'Контейнер',
            itemId: 'cont',
            items: [
                {xtype:'textfield', fieldLabel:'Текст перед № контейнера', name:"notes", maxLength:80, width:100},
                {xtype:'textfield', fieldLabel:'№ Контейнера', name:"utiN", maxLength:16, width:100, validator: TK.Validators.kontNum},
                {xtype:'numberfield', fieldLabel:'Размер', name:"sizeFoot", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:'numberfield', fieldLabel:'Размер(мм)', name:"sizeMm", maxLength:12, width:100, allowDecimals:false, minValue:0},
                {xtype:'numberfield', fieldLabel:'Тара, вес', name:"taraKont", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:'textfield', fieldLabel:'Типоразмер', name:"utiType", maxLength:16, width:100},
                {xtype:'numberfield', fieldLabel:'Макс. грузопод.', name:"grpod", maxLength:9, width:100, minValue:0, decimalPrecision:3},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: "Груз",
            itemId: 'gryz',
            items: [
                {xtype:'trigger', fieldLabel:'Код ГНГ', name:"kgvn", maxLength:10, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'textarea', fieldLabel:'Название(рус)', name:"nzgr", maxLength:4000, width:250},
                {xtype:'textarea', fieldLabel:'Наименование EU', name:"nzgrEu", maxLength:4000, width:250},
                {xtype:'trigger', fieldLabel:'Код ЕТ СНГ', name:"ekgvn", maxLength:10, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'textarea', fieldLabel:'Название', name:"enzgr", maxLength:4000, width:250},
                {xtype:'numberfield', fieldLabel:'Масса, кг', name:'massa', maxLength:14, width:80, minValue:0, decimalPrecision:3},
                {xtype:'trigger', fieldLabel:'Упаковка', name:"upakForeign", maxLength:50, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'trigger', fieldLabel:'Упаковка(рус)', name:"upak", maxLength:50, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'numberfield', fieldLabel:'Места', name:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                {xtype:'hidden', name:"ohr"},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        }];
    },

    buildTreePanelStore: function () {
        return 'ky2.VgCtGrTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: '+ Вагон',
            action: 'addVag',
            iconCls: 'vag',
            hidden: false
        },{
            text: '+ Контейнер',
            action: 'addCont',
            iconCls: 'cont3'
        },{
            text: '+ Груз',
            action: 'addGryz',
            iconCls: 'gryz'
        }];
    }
});
