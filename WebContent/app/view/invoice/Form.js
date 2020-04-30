Ext.define('TK.view.invoice.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.invoice',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.data.Errors',
        'Ext.data.Model',
        'Ext.form.FieldContainer',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Hidden',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Trigger',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Separator',
        'TK.model.InvoiceGruz',
        'TK.view.edit.DetailGrid',
        'TK.view.edit.DetailPanel'
    ],
    bodyStyle: 'font-size:12px; background-color: #FFFFFF;',
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    bodyPadding: 5,
    wrongTnveds:[],
    present6Tnveds:[],
    buildItems:function(config) {
        config.items = [
            {
                xtype: 'fieldcontainer',
                layout: 'column',
                items: [
                    {xtype:'hidden', name:'isAdditional',value:true, submitValue:false},
                    {xtype:'combo', fieldLabel:this.labelType,  name:'invoice.docType', itemId:"invoice.docType", maxLength:100,
                        typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true, margin: '0 5 0 0',
                        store: [this.lableCombo1, this.lableCombo2, this.lableCombo3, this.lableCombo4, this.lableCombo5], value: this.lableCombo1},
                    {xtype:'textfield', fieldLabel:'№', name:'invoice.invoice', itemId:'invoice.invoice', maxLength:20, margin: '0 5 0 0'},
                    {xtype:'datefield', fieldLabel:this.labelDate, name:'invoice.dat_inv', itemId:'invoice.dat_inv', maxLength:10},
                    {xtype:'button', text: this.btnShowDetails, iconCls:'report', border:3,style: { borderStyle: 'solid'}, scope: this, handler: this.onShowdetails, margin: '0 0 0 20'}
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {xtype:'textfield', fieldLabel:this.labelOtprNum, name:'invoice.notpr', itemId:'invoice.notpr', maxLength:50, margin: '0 5 0 0'},
                    {xtype:'textfield', fieldLabel:this.labelWagonNum, name:'invoice.nvag', itemId:'invoice.nvag', maxLength:18, margin: '0 5 0 0'},
                    {xtype:'textfield', fieldLabel:this.labelContNum, name:'invoice.utiN', itemId:'invoice.utiN', maxLength:16}
                ]
            },
            {
                xtype:'detailpanel',
                title:this.deatailTitle,
                itemId:'invoiceDetails',
                items:[

                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {xtype:'textfield', fieldLabel:this.labelContractNum,name:'invoice.n_dog', itemId:'invoice.n_dog', maxLength:10, margin: '0 5 0 0'},
                            {xtype:'datefield',  fieldLabel:this.labelContractDate,name: 'invoice.dat_dog', itemId:'invoice.dat_dog', maxLength:10}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {flex: 1},
                        itemId:'nsel_notd',
                        items: [
                            {xtype:'trigger', fieldLabel:this.labelSellerName,name:"invoice.nsel", itemId:'invoice.nsel',triggerCls:'dir', maxLength:100, margin: '0 5 0 0'},
                            {xtype:'trigger',  fieldLabel:this.labelSenderName,name:"invoice.notd", itemId:'invoice.notd',triggerCls:'dir', maxLength:250}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {flex: 1},
                        itemId:'adres_s_o',
                        items: [
                            {xtype:'textarea',  fieldLabel:this.labelSellerAdress, name: 'invoice.adres_s', itemId:'invoice.adres_s', maxLength:200, margin: '0 5 0 0'},
                            {
                                layout: {
                                    type: 'vbox',
                                    align:'stretch'
                                },
                                border:false,
                                itemId:'adres_s_o1',
                                items:[
                                    {xtype:'trigger',  fieldLabel:this.labelSenderCountry, name: 'invoice.country_o', itemId:'invoice.country_o',triggerCls:'dir', maxLength:2},
                                    {xtype:'textfield',  fieldLabel:this.labelSenderZip, name: 'invoice.zip_o', itemId:'invoice.zip_o', maxLength:10},
                                    {xtype:'textfield',  fieldLabel:this.labelSenderCity, name: 'invoice.city_o', itemId:'invoice.city_o', maxLength:50},
                                    {xtype:'textfield',  fieldLabel:this.labelSenderAdress, name: 'invoice.adres_o', itemId:'invoice.adres_o', maxLength:250}
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {flex: 1},
                        itemId:'nbuy_npol',
                        items: [
                            {xtype:'trigger',  fieldLabel:this.labelBuyerName, name:"invoice.nbuy", itemId:"invoice.nbuy",triggerCls:'dir', maxLength:100, margin: '0 5 0 0'},
                            {xtype:'trigger', fieldLabel:this.labelReceiverName, name:"invoice.npol", itemId:"invoice.npol", triggerCls:'dir', maxLength:250}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {flex: 1},
                        itemId:'adres_b_p',
                        items: [
                            {xtype:'textarea',  fieldLabel:this.labelBuyerAdress, name: 'invoice.adres_b', itemId:'invoice.adres_b', maxLength:200, margin: '0 5 0 0'},
                            {
                                layout: {
                                    type: 'vbox',
                                    align:'stretch'
                                },
                                itemId:'adres_b_p1',
                                border:false,
                                items:[
                                    {xtype:'textfield',  fieldLabel:this.labelReceiverCountry, name: 'invoice.country_p', itemId:'invoice.country_p', maxLength:2},
                                    {xtype:'textfield',  fieldLabel:this.labelReceiverZip, name: 'invoice.zip_p', itemId:'invoice.zip_p', maxLength:10},
                                    {xtype:'textfield',  fieldLabel:this.labelReceiverCity, name: 'invoice.city_p', itemId:'invoice.city_p', maxLength:50},
                                    {xtype:'textfield',  fieldLabel:this.labelReceiverAdress, name: 'invoice.adres_p', itemId:'invoice.adres_p', maxLength:250}
                                ]
                            }
//                    {xtype:'textarea',  fieldLabel:this.labelReceiverAdress, name: 'invoice.adres_p', itemId:'invoice.adres_p', maxLength:200}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId:'postavka',
                        items: [
                            {xtype:'trigger',  fieldLabel:this.labelDeliveryCode, name:'invoice.postavka', itemId:'invoice.postavka', maxLength:100, triggerCls:'dir',margin: '0 5 0 0'},
                            {xtype:'textfield',  fieldLabel:this.labelDeliveryPlace,name:'invoice.postavkaPunkt', itemId:'invoice.postavkaPunkt', maxLength:250,flex: 1}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        itemId:'cux',
                        items: [
                            {xtype:'trigger', fieldLabel:this.labelCurrency,name: 'invoice.cux', itemId:'invoice.cux', maxLength:150, triggerCls:'dir', editable:false, margin: '0 5 0 0'},
                            {xtype:'textarea', fieldLabel:this.labelNote,name: 'invoice.prim', itemId:'invoice.prim', maxLength:250,flex: 1}
                        ]
                    }
                ],
                buildDockedItems: function(config) {
                    config.dockedItems = [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        items: ['->',
                            '-',{
                                text: this.btnClose,
                                handler:this.onClose,
                                scope:this
                            }]
                    }];
                },
            },
            {
                xtype:'detailgrid',
                enableColumnHide:true,
                enableColumnMove:true,
                sortableColumns:true,
                flex:2,
                title:this.labelCargo,
                itemId:'gruz',
                doc:'invoice',
                coll:'invoiceGruzs',
                features: [{
                    ftype: 'summary'
                }],
                buildStore: function(config) {
                    config.store = new Ext.data.ArrayStore({
                        autoDestroy: true,
                        model: 'TK.model.InvoiceGruz'
                    });
                },
                buildColModel: function(config) {
                    config.columns = {
                        items:[
                            {xtype: 'rownumberer', minWidth: 36},
                            {text: this.headerCodeTNVED, dataIndex: 'tnved', width:75, editor:{xtype:'trigger',maxLength:12,triggerCls:'dir'},
                                renderer: function(value,metaData)
                                {
                                    var val6=value.substring(0,Math.min(value.length,6));
                                    if(this.up('invoice').present6Tnveds.indexOf(val6)!==-1&&value.length>6)
                                    {
                                        return '<span style="color:' + '#b59e00' + ';">' + value + '</span>';
                                    }

                                    if(this.up('invoice').wrongTnveds.indexOf(value)!==-1)
                                    {
                                        return '<span style="color:' + '#b50013' + ';">' + value + '</span>';
                                    }
                                    return value;
                                }

                            },
                            {text: this.headerGoodsDescr, dataIndex: 'nzgr', flex: 1,minWidth:200,editor:{xtype:'textarea', maxLength:2500,border: 1 },
                                renderer: TK.Utils.renderLongStr, summaryType: 'count', summaryRenderer: function() {return this.headerTotal;}},
                            {text: this.headerGoodsDescrEn, dataIndex: 'nzgrEn', flex: 1,minWidth:200,editor:{xtype:'textarea', maxLength:2500,border: 1},
                                renderer: TK.Utils.renderLongStr},
//                            {text: this.headerPackage, dataIndex: 'nzyp', width:70, editor:{xtype:'trigger', maxLength:30,triggerCls:'dir'}},
                            {
                                text:this.headerPack,
                                columns: [
                                    {text: this.headerPackVid, dataIndex: 'nzyp', editor:{xtype:'trigger', maxLength:30, triggerCls:'dir'}},
                                    {text: this.headerPackKod, dataIndex: 'kypk', editor:{xtype:'textfield', maxLength:5}}
                                ]
                            },
                            {text: this.headerPackNum, dataIndex: 'kolm', width:70, summaryType: 'sum', summaryRenderer: this.sumRenderer, editor:{xtype:'numberfield', maxLength:10, decimalPrecision:0, minValue: 0}},
                            {text: this.headerBrutto, dataIndex: 'mbrt', width:70,  summaryType: 'sum', summaryRenderer: this.sumRenderer, editor:{xtype:'numberfield', maxLength:13, decimalPrecision:3, minValue: 0}},
                            {text: this.headerNetto, dataIndex: 'mnet', width:70,  summaryType: 'sum', summaryRenderer: this.sumRenderer, editor:{xtype:'numberfield', maxLength:13, decimalPrecision:3, minValue: 0}},
                            {text: this.headerQuantity, dataIndex: 'kole', width:70,  editor:{xtype:'numberfield', maxLength:17, minValue: 0, decimalPrecision:6}},
                            {text: this.headerProdUnit, dataIndex: 'eizm', width:70, editor:{xtype:'textfield', maxLength:10, minValue: 0}},
                            {text: this.headerProdPrice, dataIndex: 'cost', width:70,  editor:{xtype:'numberfield', maxLength:17, minValue: 0, decimalPrecision:6}},
                            {text: this.headerTotalValue, dataIndex: 'itogo', width:95,  summaryType: 'sum', summaryRenderer: this.sumRenderer,editor:{xtype:'numberfield', maxLength:20, minValue:0}},
                            {text: this.headerType, dataIndex: 'type', width:70, editor:{xtype:'combobox', maxLength:50, store: ['Груз','Доп.расходы','Другое'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true}}
                        ],
                        defaults:{}
                    };
                },
                sumRenderer: function(value, summaryData, dataIndex){
                    return value ? parseFloat(value.toFixed(3)) : value;
                },
                newRecord: function(){
                    return Ext.create('TK.model.InvoiceGruz', {
                        tnved: '',nzgr: '',nzgrEn: '',nzyp: '',kypk:'',kolm: '',mbrt: '',mnet: '',kole: '',eizm:'',cost: '',itogo: '',type: 'Груз',hid:''
                    });
                },
                copyValues2MainFlds:function(){
                    var coll = this.bufData, rows = [];
                    for(var index in coll){
                        var row = [];
                        row.push(coll[index].tnved ? coll[index].tnved : '');
                        row.push(coll[index].nzgr ? coll[index].nzgr : '');
                        row.push(coll[index].nzgrEn ? coll[index].nzgrEn : '');
                        row.push(coll[index].nzyp ? coll[index].nzyp : '');
                        row.push(coll[index].kypk ? coll[index].kypk : '');
                        row.push(coll[index].kolm);
                        row.push(coll[index].mbrt);
                        row.push(coll[index].mnet);
                        row.push(coll[index].kole);
                        row.push(coll[index].eizm ? coll[index].eizm : '');
                        row.push(coll[index].cost);
                        row.push(coll[index].itogo);
                        row.push(coll[index].type);
                        row.push(coll[index].hid);
                        rows.push(row);
                    }
                    this.store.loadData(rows);
	            },
                initBuf:function(){
					this.bufData = this.ownerCt.dataObj[this.coll] || {};
				},
                buildConstValues:function(){},
                onEdit: function(editor, e){
                    console.log('onEdit');
                    if(e.field == 'kole' || e.field == 'cost'){
                        var data = e.record.data,
                            val1 = parseFloat(data.kole),
                            val2 = parseFloat(data.cost);
                        if(val1 && val2){
                            data.itogo = (val1 * val2).toFixed(2);
                        } else {
                            data.itogo = null;
                        }
                    }
                    e.grid.getView().refresh();
                },
                buildDockedItems: function(config) {
                    config.dockedItems = [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        items: [
                            {text: this.btnAdd, iconCls:'add1', scope: this, handler: this.onAddRecord},
                            '-',
                            {text: this.btnDelete, iconCls:'delete1', scope: this, handler: this.onDelRecord},
                            '-',
                            {text: this.btnCopy, iconCls:'copy', scope: this, handler: this.onCopyRecord},
                            '-',
                            {text: this.btnCheckTnved, iconCls:'filter_check', scope: this, action:'checkCodes'},
                            '-',
                            {text: this.btnImportXlsCargo, iconCls:'excel',scope: this, action:'uploadInvoiceXlsCargo'}
                        ]
                    }];
                    if(tkUser.hasPriv('INVOICE_TRANSLATE')) {
                        config.dockedItems[0].items.push(
                            '-',
                            {text: this.btnTranslate, iconCls: 'translate', scope: this, action: 'translateInvCargo'}
                        )
                    }
                },
                onCopyRecord: function(btn) {
                    var sel = this.selModel.getLastSelected();
                    if (sel) {
                        var rec = sel.copy(); // clone the record
                        Ext.data.Model.id(rec);
                        this.store.insert(this.store.data.length, rec);
                    }
                },
                /**
                 * Настройка высоты окна редактирования
                 * @param editor окно редактирования
                 * @param e контекст
                 */
                beforeEdit:function(editor, e){
                    var h=Ext.fly(e.row).getHeight();
                    if(e.column.getEditor().xtype==='textarea') {
                        e.column.getEditor().height = h + 100;
                    }
                }
            },
            {xtype:'hidden', name:'invoice.hid', itemId:'invoice.hid'},
            {xtype:'hidden', name:'invoice.route.hid', itemId:'invoice.route.hid'},
            {xtype:'hidden', name:'invoice.packDoc.hid', itemId:'invoice.packDoc.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'invoice.docType1', itemId:'invoice.docType1', value:2},
            {xtype:'hidden', name:'invoice.status', itemId:'invoice.status'}
        ];
    },
    /**
     * Отобжаем/прячем панель с детальной информацией об инвойсе
     * @param btn кнопка вызова
     */
    onShowdetails:function (btn) {
        var panel=Ext.ComponentQuery.query('invoice #invoiceDetails')[0];

        if(panel.isVisible())
        {
            panel.hide();
            btn.setText(this.btnShowDetails);
            panel.ownerCt.maskPanel(false);
        }
        else
        {
            panel.show();
            btn.setText(this.btnHideDetails);
            panel.ownerCt.maskPanel(true);
        }
    },
    buildDockedItems: function(config) {
        this.callParent(arguments);
        config.dockedItems[0].items.push('-',{text: this.btnCopyEpd,iconCls:'copy',itemId: 'copyEpd', action:'copyEpd'});
    },
    initServiceFields: function(data, initGrids){
    	this.getForm().setValues(data);
        if(initGrids){
            this.getComponent('gruz').initServiceFields(data);
        }
    },
    initBuffers: function(){
    	this.getComponent('gruz').initBuf();
    },
    initCollections: function(){
    	this.getComponent('gruz').copyValues2MainFlds();
    },
    initDisplayedFields:function(){},
    prepareGridData4Save:function(){
        return this.getComponent('gruz').prepareData();
    },
    validateGridsData:function(){
        var store = this.getComponent('gruz').getStore(),
            errors = new Ext.data.Errors();
        store.each(function(record){
            errors.addAll(record.validate().getRange());
        }, this);
        return errors;
    },
    isGridDataValid:function(){
        return this.validateGridsData().isValid();
    }
});
