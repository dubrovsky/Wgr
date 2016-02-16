Ext.define('TK.view.printtmpl.PhraseForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.printDataPhrase',
    bodyPadding: 5,
    title: 'Настройки отдельных фраз',
    autoShow: true,
    y: 0,
    modal: true,
    width: 800,
    maxHeight: 300,
    autoScroll: true,

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    initComponent: function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function (config) {
        this.buildItems(config);
        this.buildBottomToolbar(config);
    },

    buildItems: function (config) {
        config.items = [{
            xtype:'detailgrid',
            itemId:'prnTemplDataPhrase',
            title:'Данные',
            buildColModel:function (config) {
                config.columns = [
                    {xtype:'rownumberer'},
                    {text:'Описание', dataIndex:'descr', flex:1, editor:{xtype:'textfield', maxLength:300}, renderer: TK.Utils.renderLongStr},
                    {
                        text:'Шрифт для конкретной колонки',
                        columns:[
                            {text: 'Наименование', dataIndex: 'fontFamily', width:89,
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
                            {text:'Размер', dataIndex:'fontSize', width:65, editor:{xtype:'numberfield', maxLength:2, minValue:6, maxValue:20, decimalPrecision:0}},
                            {text:'Жирным?', xtype: 'checkcolumn', dataIndex:'bold', width:70},
                            {text:'Заглавными?', xtype: 'checkcolumn', dataIndex:'uppercase', width:80},
                            {text:'Межстрочный интервал', dataIndex: 'leading', width:87, editor:{xtype:'numberfield', maxLength:2, minValue:1, maxValue:20, decimalPrecision:0}}
                        ]
                    },
                    //{text:'Поворот', dataIndex:'rotate', width:60, editor:{xtype:'numberfield', maxLength:3, minValue:-360, maxValue:360, decimalPrecision:0}},
                    //{text:'Граница?', xtype: 'checkcolumn', dataIndex:'border', width:65},
                    {text:'Подчеркнуть?', xtype: 'checkcolumn', dataIndex:'underline', width:65}
                ];

                if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
                    config.columns.splice(1, 0, {text:'Колонка', dataIndex:'name', width:80, editor:{xtype:'textfield', maxLength:20, allowBlank:false}});
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
            buildStore:function (config) {
                config.store = new Ext.data.ArrayStore({
                    autoDestroy:true,
                    model:'TK.model.PrintDataPhrase'
                });
            },
            newRecord:function () {
                return Ext.create('TK.model.PrintDataPhrase');
            },
            copyValues2MainFlds:function(){
            }
        }]
    },

    buildBottomToolbar: function (config) {
        config.buttons = [{
            text: 'Сохранить',
            scope: this,
            iconCls:'save',
            action: 'save'
        },{
            text: 'Закрыть',
            scope: this,
            iconCls:'exit',
            handler: function (btn) {
                var win = btn.up('window');
                win.down('grid').getStore().removeAll(true);
                win.close();
            }
        }];
    }
});