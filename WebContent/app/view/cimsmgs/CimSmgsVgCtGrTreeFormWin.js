Ext.define('TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin', {
    extend: 'TK.view.edit.VgCtGrTreeFormWin',
    alias: 'widget.cimsmgsVgCtGrTreeformWin',
    buildTabPanelItems: function(){
        return [{
            title: 'Вагон',
            itemId: 'vag',
            items: [
                {xtype:'textfield', fieldLabel:this.labelWagonNum, name:"nvag", maxLength:160, width:150},
                {xtype:'numberfield', fieldLabel:this.labelWagonsTonnage, name:"grPod", maxLength:5, width:100, minValue:0, decimalPrecision:1},
                {xtype:'numberfield', fieldLabel:this.labelWagonsTara, name:"taraVag", maxLength:5, width:100, minValue:0, decimalPrecision:1},
                {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, name:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: 'Контейнер',
            itemId: 'cont',
            items: [
                {xtype:'textfield', fieldLabel:this.labelNotes, name:"notes", maxLength:80, width:100},
                {xtype:'textfield', fieldLabel:this.labelContNum, name:"utiN", maxLength:16, width:100},
                {xtype:'numberfield', fieldLabel:this.labelSize, name:"sizeFoot", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:'numberfield', fieldLabel:this.labelSizeMm, name:"sizeMm", maxLength:12, width:100, allowDecimals:false, minValue:0},
                {xtype:'numberfield', fieldLabel:this.labelTaraCont, name:"taraKont", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: 'Груз',
            itemId: 'gryz',
            items: [
                {xtype:'trigger', fieldLabel:this.labelCodeGng, name:"kgvn", maxLength:10, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'textarea', fieldLabel:this.labelNameRuGng, name:"nzgr", maxLength:4000, width:250},
                {xtype:'textarea', fieldLabel:this.labelName1, name:"nzgrEu", maxLength:4000, width:250},
                {xtype:'trigger', fieldLabel:this.labelCodeEtsng, name:"ekgvn", maxLength:10, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'textarea', fieldLabel:this.labelNameEtsng, name:"enzgr", maxLength:4000, width:250},
                {xtype:'numberfield', fieldLabel:this.labelMassa, name:'massa', maxLength:14, width:80, minValue:0, decimalPrecision:3},
                {xtype:'textfield', fieldLabel:this.labelPackForeign, name:"upakForeign", maxLength:50, width:100},
                {xtype:'textfield', fieldLabel:this.labelPack, name:"upak", maxLength:50, width:100},
                {xtype:'numberfield', fieldLabel:this.labelMesta, name:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                {xtype:'hidden', name:"ohr"},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        }];
    }
});
