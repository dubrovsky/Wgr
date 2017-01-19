Ext.define('TK.view.printtmpl.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.printTemplate',
    border:false,
    bodyPadding: 5,
    title: this.title,
    requires:['TK.view.edit.DetailGrid'],
//    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
    initComponent:function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function (config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },
    buildItems:function (config) {
        config.items = [
            {xtype:'hidden', name:'prnTempl.hid', itemId:'prnTempl.hid'},
            {xtype:'hidden', name:'prnTempl.docDir.hid', itemId:'prnTempl.docDir.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'textfield', fieldLabel: this.fieldLabelName, name:'prnTempl.name', itemId:'prnTempl.name', maxLength:300, anchor:'75%'},
            {xtype:'checkbox', fieldLabel:this.fieldLabelDef, name:'prnTempl.defaults', itemId:'prnTempl.defaults', inputValue:true, hidden: true},
            {
                xtype:'container',
                anchor:'100%',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items:[
                    {xtype:'fieldset', title: this.fieldLabelPageSize, defaultType: 'numberfield', defaults: {anchor: '100%', minValue:1, maxLength:6, decimalPrecision:1, allowBlank:false}, /*anchor:'50%',*/width:260,
                        items :[
                            {fieldLabel: this.fieldLabelWidth, name: 'prnTempl.paperWidth', itemId:'prnTempl.paperWidth'},
                            {fieldLabel: this.fieldLabelHeight, name: 'prnTempl.paperHeight', itemId:'prnTempl.paperHeight'}
                        ]
                    },
                    {
                        xtype:'image',
                        src:'resources/images/printTempl.png',
                        rowspan: 2,
                        margin:'0 0 0 10',
                        border: 1,
                        style: {
                            borderColor: 'red',
                            borderStyle: 'solid'
                        }
                    },
                    {xtype:'fieldset', title: this.fieldLabelFont, defaults: {anchor: '100%'}, /*anchor:'25%',*/  width:260,
                        items :[
                            {xtype:'combobox',fieldLabel: this.fieldLabelFontName, name: 'prnTempl.fontFamily',itemId:'prnTempl.fontFamily', maxLength:30, allowBlank:false, typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true,queryMode:'local',
                                store:[
                                    ['arial','Arial'],
                                    ['courier new','Courier New'],
                                    ['times new roman','Times New Roman']
                                ]
                            },
                            {xtype:'numberfield',fieldLabel: this.fieldLabelFontSize, name: 'prnTempl.fontSize', itemId:'prnTempl.fontSize', minValue:6, maxValue:20, maxLength:2, decimalPrecision:0, allowBlank:false},
                            {xtype:'numberfield',fieldLabel: this.fieldLabelFontSpace, name: 'prnTempl.leading', itemId:'prnTempl.leading', minValue:1, maxValue:20, maxLength:2, decimalPrecision:0, allowBlank:false}
                        ]
                    }

                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin:'10 0 7 0',
                defaults:{labelWidth: 175},
                items: [
                    {xtype:'checkbox', fieldLabel:this.fieldLabelSyncXY, name:'prnTempl.sync', itemId:'prnTempl.sync', inputValue:true, margin:'0 20 0 0'},
                    {xtype: 'numberfield', fieldLabel:this.fieldLabelMoveHor, width:230, margin:'0 5 0 0', submitValue:false, name:'hShift'},
                    {xtype: 'button', text:'Ok', margin:'0 20 0 0', action:'hShift'},
                    {xtype: 'numberfield', fieldLabel:this.fieldLabelMoveVert, width:230, margin:'0 5 0 0', submitValue:false, name:'vShift'},
                    {xtype: 'button', text:'Ok', action:'vShift'}
                ]
            },
            {
                xtype:'detailgrid',
                itemId:'prnTemplData',
                doc:'prnTempl',
                coll:'printDatas',
                title:this.titleData,
                height:700,
                buildColModel:function (config) {
                    config.columns = [
                        {xtype:'rownumberer'},
//                        {text:'Колонка', dataIndex:'name', width:80, editor:{xtype:'textfield', maxLength:20, allowBlank:false}},
                        {text:this.titleDesc, dataIndex:'descr', flex:1, editor:{xtype:'textfield', maxLength:300}, renderer: TK.Utils.renderLongStr},
                        {
                            text:this.titleCoordLeft,
                            columns:[
                                {text:'X1', dataIndex:'llx', width:70, editor:{xtype:'numberfield', maxLength:5, minValue:0, allowBlank:false, decimalPrecision:0, allowDecimals:false, listeners: {change: function(f, nVal, oVal){this.up('printTemplate').fireEvent('x_y_change', f, nVal, oVal);}} }},
                                {text:'Y1', dataIndex:'lly', width:70, editor:{xtype:'numberfield', maxLength:5, minValue:0, allowBlank:false, decimalPrecision:0, allowDecimals:false, listeners: {change: function(f, nVal, oVal){this.up('printTemplate').fireEvent('x_y_change', f, nVal, oVal);}} }}
                            ]
                        },
                        {
                            text:this.titleCoordRight,
                            columns:[
                                {text:'X2', dataIndex:'urx', width:70, editor:{xtype:'numberfield', maxLength:5, minValue:0, allowBlank:false, decimalPrecision:0, allowDecimals:false, listeners: {change: function(f, nVal, oVal){this.up('printTemplate').fireEvent('x_y_change', f, nVal, oVal);}} }},
                                {text:'Y2', dataIndex:'ury', width:70, editor:{xtype:'numberfield', maxLength:5, minValue:0, allowBlank:false, decimalPrecision:0, allowDecimals:false, listeners: {change: function(f, nVal, oVal){this.up('printTemplate').fireEvent('x_y_change', f, nVal, oVal);}} }}
                            ]
                        },
                        {
                            text:this.titleColumnFont,
                            columns:[
                                {text: this.titleColumnFontName, dataIndex: 'fontFamily', width:89,
                                    editor:{xtype:'combobox', maxLength:30, typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true, queryMode:'local',
                                        store:[
                                            ['','---'],
                                            ['arial','Arial'],
                                            ['courier new','Courier New'],
                                            ['times new roman','Times New Roman']
                                        ]
                                    },
                                    renderer: function(value) {
                                        switch(value){
                                            case 'arial':
                                                return 'Arial';
                                            case 'courier new':
                                                return 'Courier New';
                                            case 'times new roman':
                                                return 'Times New Roman';
                                            default :
                                                return '';
                                        }
                                    }
                                },
                                {text:this.titleColumnFontSize, dataIndex:'fontSize', width:65, editor:{xtype:'numberfield', maxLength:2, minValue:6, maxValue:20, decimalPrecision:0}},
                                {text:this.titleColumnFontBold, xtype: 'checkcolumn', dataIndex:'bold', width:70},
                                {text:this.titleColumnFontUpper, xtype: 'checkcolumn', dataIndex:'uppercase', width:80},
                                {text:this.titleColumnFontSpace, dataIndex: 'leading', width:87, editor:{xtype:'numberfield', maxLength:2, minValue:1, maxValue:20, decimalPrecision:0}}
                            ]
                        },
//                        {text: 'Таблица?', dataIndex: 'grps', width:60,editor:{xtype:'trigger',triggerCls:'dir',editable:false}/*, renderer: this.onRenderGroups*/},
                        {text:this.titleRotate, dataIndex:'rotate', width:60, editor:{xtype:'numberfield', maxLength:3, minValue:-360, maxValue:360, decimalPrecision:0}},
                        {text:this.titleBorder, xtype: 'checkcolumn', dataIndex:'border', width:65},
                        {text:this.titleStroke, xtype: 'checkcolumn', dataIndex:'underline', width:65},
                        {text:this.titlePage, dataIndex:'page', width:60, editor:{xtype:'numberfield', maxLength:2, minValue:1, maxValue:10, decimalPrecision:0}},
                        {text:this.titlePrint, xtype: 'checkcolumn', dataIndex:'print', width:65},
                        {text:this.titleTable, /*dataIndex:'tableColumns',*/ width:65, renderer: function(val, meta, record){
                            var count = record.table().count();
                            return count == 0 ? '' : count;
                        }},
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [{
                                icon: './resources/images/table.png',
                                tooltip: 'Table',
                                handler: function(view, rowIndex, colIndex) {
                                    var grid = view.ownerCt;
                                    grid.fireEvent('needTable', grid, grid.getStore().getAt(rowIndex));
                                }
                            }]
                        },
                        {text:this.titlePhrases, width:65, renderer: function(val, meta, record){
                            var count = record.phrases().count();
                            return count == 0 ? '' : count;
                        }},
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [{
                                icon: './resources/images/table.png',
                                tooltip: 'Table',
                                handler: function(view, rowIndex, colIndex) {
                                    var grid = view.ownerCt;
                                    grid.fireEvent('needPhrases', grid, grid.getStore().getAt(rowIndex));
                                }
                            }]
                        }
                    ];

                    if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
                        config.columns.splice(1, 0, {text:this.titleColumn, dataIndex:'name', width:80, editor:{xtype:'textfield', maxLength:20, allowBlank:false}});
                    }
                },
                buildDockedItems: function(config) {
                    if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
                        config.dockedItems = [{
                            dock: 'bottom',
                            xtype: 'toolbar',
                            items: [{
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
                                },'-']
                        }];
                    }
                },
                newRecord:function () {
                    return Ext.create('TK.model.PrintData');
                },
                copyValues2MainFlds:function(){
                    var prnTmpls = Ext.getStore('PrintTemplate'),
                        prnTmpl = prnTmpls.first() || prnTmpls.add(Ext.create('TK.model.PrintTemplate'))[0];
                    this.reconfigure(prnTmpl.printData());
                },
                prepareData: function() {
                    var data = {}, doc = this.doc, coll = this.coll;
                    this.store.each(function(rec, ind, len){
                        rec.fields.each(function(field, i, l){
                            data[doc+'.'+coll+'['+ind+'].'+field.name] = rec.data[field.name];
                        });
                        if(rec.table().count() > 0){
                            rec.table().each(function(rec, indx, len){
                                rec.fields.each(function(field, i, l){
                                    data[doc + '.' + coll + '[' + ind + '].printDataTables[' + indx + '].' + field.name] = rec.data[field.name];
                                });
                            },this);
                        }
                        if(rec.phrases().count() > 0){
                            rec.phrases().each(function(rec, indx, len){
                                rec.fields.each(function(field, i, l){
                                    data[doc + '.' + coll + '[' + ind + '].printDataPhrases[' + indx + '].' + field.name] = rec.data[field.name];
                                });
                            },this);
                        }
                    }, this);
                    return data;
                }
            }
        ]
    },
    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                xtype:'toolbar',
                dock:'bottom',
                items:['->']
            }
        ];
        if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN') || (tkUser.hasPriv('CIM_PRINT_TEMPLATES_USER') && !this.defaults)) {
            config.dockedItems[0].items.push(
                '-', {
                    text:this.btnSave,
                    iconCls:'save',
                    action:'saveTmpl',
                    itemId:'save'
                }, '-', {
                    text:this.btnSaveExit,
                    iconCls:'save_close',
                    action:'saveExitTmpl',
                    itemId:'save_close'
                }
            );
        }
        config.dockedItems[0].items.push(
            '-', {
                text:this.btnClose,
                iconCls:'close1',
                action:'close'
            }
        );
    },
    initServiceFields: function(data, initGrids){
        this.getForm().setValues(data);
        if(initGrids && data['prnData_hids']){
            var hids = data['prnData_hids'].split(','),
                prnDataStore = this.getComponent('prnTemplData').getStore();
            for (var i = 0; i < hids.length; i++) {
                prnDataStore.getAt(i).set('hid',hids[i]);
            }
        }
    },
    initCollections: function(){
//        this.getComponent('routes').copyValues2MainFlds();
        this.getComponent('prnTemplData').copyValues2MainFlds();
    },
    initForm: function(){
        this.suspendLayouts();
        var store = Ext.getStore('PrintTemplate').first(),
            task = this.getForm().findField('task').getValue();

        if(task != 'create' && store){
            this.getForm().setValues({
                'prnTempl.name' : store.get('name'),
                'prnTempl.defaults' : store.get('defaults'),
                'prnTempl.sync' : store.get('sync'),
                'prnTempl.paperWidth' : store.get('paperWidth'),
                'prnTempl.paperHeight' : store.get('paperHeight'),
                'prnTempl.fontSize' : store.get('fontSize'),
                'prnTempl.bold' : store.get('bold'),
                'prnTempl.uppercase' : store.get('uppercase'),
                'prnTempl.fontFamily' : store.get('fontFamily'),
                'prnTempl.leading' : store.get('leading')
            });
            this.initCollections();
        }

        this.resumeLayouts(true);
    },

    prepareGridData4Save:function(){
        var data = {};
        Ext.apply(data, this.getComponent('prnTemplData').prepareData());
//        Ext.apply(data, this.getComponent('routes').prepareData());
        return  data;
    },
    validateGridsData:function(){
        var store = this.getComponent('prnTemplData').getStore(),
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