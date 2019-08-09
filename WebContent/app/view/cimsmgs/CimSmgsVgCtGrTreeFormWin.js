Ext.define('TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin', {
    extend: 'TK.view.edit.VgCtGrTreeFormWin',
    alias: 'widget.cimsmgsVgCtGrTreeformWin',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Hidden',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger',
        'Ext.tree.plugin.TreeViewDragDrop',
        'TK.Validators'
    ],

    buildTreePanelViewConfig: function () {
        return {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                allowCopy: true
            },
            getRowClass: function(record, rowIndex, rowParams, store){
                switch(record.get('who')){
                    case 'cont':
                        return TK.Validators.kontNum(record.get('utiN')) !== true ? 'red' : '';
                    case 'vag':
                        return TK.Validators.vagNum(record.get('nvag')) !== true ? 'red' : '';
                    default:
                        return '';
                }
            }
        }
    },

    buildTabPanelItems: function(){
        var hideSMGS2=!!(this.xtype === 'smgs2VgCtGrTreeformWin' || 'avisosmgs2VgCtGrTreeformWin');
        return [{
            title: this.titleVag,
            itemId: 'vag',
            items: [
                {xtype:'textfield', fieldLabel:this.labelWagonNum, name:"nvag", maxLength:160, width:150, validator: TK.Validators.vagNum},
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    fieldLabel: this.labelWagonsGiven,
                    name:'vagOtm',
                    store: [['П', 'Перевозчиком'], ['О', 'Отправителем']]
                },
                {xtype:'numberfield', fieldLabel:this.labelWagonsTonnage, name:"grPod", maxLength:5, width:100, minValue:0, decimalPrecision:2},
                {xtype:'numberfield', fieldLabel:this.labelWagonsTara, name:"taraVag", maxLength:5, width:100, minValue:0, decimalPrecision:2},
                {xtype:'numberfield', fieldLabel:this.labelWagonsAxes, name:"kolOs", maxLength:2, width:100, allowDecimals:false, minValue:0},
                {xtype:'textfield', fieldLabel:this.labelWagonsOwner, name:"klientName", maxLength:124, width:100},
                {xtype:'textfield', fieldLabel:this.labelWagonsKind, name:"rod", maxLength:20, width:100},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: this.titleCont,
            itemId: 'cont',
            items: [
                {xtype: hideSMGS2?'hidden':'textfield', fieldLabel:this.labelNotes, name:"notes", maxLength:80, width:100},
                {xtype:'textfield', fieldLabel:this.labelContNum, name:"utiN", maxLength:16, width:100, validator: TK.Validators.kontNum},
                {xtype:'numberfield', fieldLabel:this.labelSize, name:"sizeFoot", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:hideSMGS2?'hidden':'numberfield', fieldLabel:this.labelSizeMm, name:"sizeMm", maxLength:12, width:100, allowDecimals:false, minValue:0},
                {xtype:'numberfield', fieldLabel:this.labelTaraCont, name:"taraKont", maxLength:5, width:100, allowDecimals:false, minValue:0},
                {xtype:'textfield', fieldLabel:this.labelContSize, name:"utiType", maxLength:16, width:100},
                {xtype:'numberfield', fieldLabel:this.labelMaxLoad, name:"grpod", maxLength:9, width:100, minValue:0, decimalPrecision:3},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: this.titleCargo,
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
                {xtype:hideSMGS2?'hidden':'trigger', fieldLabel:this.labelPackForeign, name:"upakForeign", maxLength:50, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                // {xtype:'textfield', fieldLabel:this.labelPackForeign, name:"upakForeign", maxLength:50, width:100},
                // {xtype:'textfield', fieldLabel:this.labelPack, name:"upak", maxLength:50, width:100},
                {xtype:'trigger', fieldLabel:this.labelPack, name:"upak", maxLength:50, triggerCls:'dir', width:100,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                {xtype:'numberfield', fieldLabel:this.labelMesta, name:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                {xtype:'hidden', name:"ohr"},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: this.titleDanCargo,
            itemId: 'danGryz',
            defaults: {
                labelWidth: 130,
                anchor: '100%'
            },
            items: [
                {xtype:'trigger', fieldLabel:this.labelNameRu, name:"carDName", maxLength:256, triggerCls:'dir', width:250,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                // {xtype:'textfield', fieldLabel:'Название(рус)', name:"carDName", maxLength:128, width:250},
                {xtype:'trigger', fieldLabel:this.labelName, name:"carDNameDe", maxLength:256, triggerCls:'dir', width:250,
                    onTriggerClick: function(e){
                        this.fireEvent("ontriggerclick", this, e);
                    }
                },
                // {xtype:'textfield', fieldLabel:'Название', name:"carDNameDe", maxLength:128, width:250},
                {xtype:'textfield', fieldLabel:this.labelCode, name:"codDanger", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelOON, name:"numOon", maxLength:32, width:250},
                // {xtype:'textfield', fieldLabel:'ООН', name:"numOonDe", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelClass, name:"clazz", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelZnak, name:"dangSign", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelGrUpak, name:"groupPack", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelAvKart, name:"emergenC", maxLength:32, width:250},
                {xtype:'textfield', fieldLabel:this.labelStamp, name:"stampDName", maxLength:128, width:250},
                {xtype:'textarea', fieldLabel:this.labelDopInf, name:"dopInfo", maxLength:64, width:250},


                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        }];
    },
    buildTopToolbarItems: function() {
        return [{
            xtype: 'textfield',
            itemId: 'searchField',
            enableKeyEvents: true
        }, {
            text: this.btnSearch,
            action: 'search'
        },
            '-', {
                text: this.btnExpandAll,
                action: 'expandAll',
                iconCls: 'minus'
            }, '-', {
                text: this.btnCollapseAll,
                action: 'collapseAll',
                iconCls: 'plus'
            }, '-',
            // загрузка XLS файлов вагонов/контейнеров
            {text: this.btnImportXLSvag, itemId: 'uploadVagsSmgs2',action:'uploadVagsXLS', iconCls:'excel'},
            {text: this.btnImportXLSCont, itemId: 'uploadContsSmgs2',action:'uploadContsXLS', iconCls:'excel'}
            // {
            //     text: 'спрятать вагоны',
            //     action: 'hideVag',
            //     iconCls: 'plus'
            // }, '-',{
            //     text: 'показать вагоны',
            //     action: 'showVag',
            //     iconCls: 'plus'
            // }
            ];
    }
});
