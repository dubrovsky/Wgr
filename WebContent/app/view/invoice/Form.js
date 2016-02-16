Ext.define('TK.view.invoice.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.invoice',
    requires: ['TK.view.edit.DetailGrid'],
    bodyStyle: 'font-size:12px; background-color: #FFFFFF;',
    layout: 'anchor',
    bodyPadding: 5,
    buildItems:function(config) {
        config.items = [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {xtype:'combo', fieldLabel:this.labelType,  name:'invoice.docType', itemId:"invoice.docType", maxLength:100,
                        typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true, margin: '0 5 0 0',
                        store: ['Инвойс','Счет-фактура','Приложение к инвойсу','Грузовая ведомость', 'Манифест'], value:'Инвойс'},
                    {xtype:'textfield', fieldLabel:'№', name:'invoice.invoice', itemId:'invoice.invoice', maxLength:20, margin: '0 5 0 0'},
                    {xtype:'datefield', fieldLabel:this.labelDate, name:'invoice.dat_inv', itemId:'invoice.dat_inv', maxLength:10}
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
			                {xtype:'textfield',  fieldLabel:this.labelSenderCountry, name: 'invoice.country_o', itemId:'invoice.country_o', maxLength:2},
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
            },
            {xtype:'detailgrid', title:this.labelCargo, itemId:'gruz', height: 200,
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
                            {xtype: 'rownumberer'},
                            {text: this.headerCodeTNVED, dataIndex: 'tnved', width:75, editor:{xtype:'trigger',maxLength:12,triggerCls:'dir'}},
                            {text: this.headerGoodsDescr, dataIndex: 'nzgr', flex: 1,minWidth:300,editor:{xtype:'textarea', maxLength:2500}, renderer: TK.Utils.renderLongStr, summaryType: 'count', summaryRenderer: function() {return this.headerTotal;}},
//                            {text: this.headerPackage, dataIndex: 'nzyp', width:70, editor:{xtype:'trigger', maxLength:30,triggerCls:'dir'}},
                            {
                                text:'Упаковка',
                                columns: [
                                    {text: "Вид", dataIndex: 'nzyp', editor:{xtype:'trigger', maxLength:30, triggerCls:'dir'}},
                                    {text: 'Код', dataIndex: 'kypk', editor:{xtype:'textfield', maxLength:5}}
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
                        tnved: '',nzgr: '',nzyp: '',kypk:'',kolm: '',mbrt: '',mnet: '',kole: '',eizm:'',cost: '',itogo: '',type: 'Груз',hid:''
                    });
                },
                copyValues2MainFlds:function(){
                    var coll = this.bufData, rows = [];
                    for(var index in coll){
                        var row = [];
                        row.push(coll[index].tnved ? coll[index].tnved : '');
                        row.push(coll[index].nzgr ? coll[index].nzgr : '');
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
                            {
                                text: this.btnAdd,
                                iconCls:'add1',
                                scope: this,
                                handler: this.onAddRecord
                            },
                            '-',{
                                text: this.btnDelete,
                                iconCls:'delete1',
                                scope: this,
                                handler: this.onDelRecord
                            },'-',{
                                text: this.btnCopy,
                                iconCls:'copy',
                                scope: this,
                                handler: this.onCopyRecord
                            },'-'
                        ]
                    }];
                },
                onCopyRecord: function(btn) {
                    var sel = this.selModel.getLastSelected();
                    if (sel) {
                        var rec = sel.copy(); // clone the record
                        Ext.data.Model.id(rec);
                        this.store.insert(this.store.data.length, rec);
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