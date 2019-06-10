Ext.define('TK.view.printtmpl.TableForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.printDataTable',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.grid.column.RowNumberer',
        'Ext.layout.container.Anchor',
        'Ext.toolbar.Separator',
        'TK.Utils',
        'TK.model.PrintDataTable',
        'TK.view.edit.DetailGrid'
    ],

    bodyPadding: 5,
    title: 'Настройки колонок таблицы',
    autoShow: true,
    y: 0,
    modal: true,
    width: 500,
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
            itemId:'prnTemplDataTable',
            title:'Данные',
            //height:700,
            buildColModel:function (config) {
                config.columns = [
                    {xtype:'rownumberer'},
                    {text:'Описание', dataIndex:'descr', flex:1, editor:{xtype:'textfield', maxLength:300}, renderer: TK.Utils.renderLongStr},
                    {text:'Ширина', dataIndex:'width', width:80, editor:{xtype:'numberfield', maxLength:5, minValue:0, allowBlank:false, decimalPrecision:0, allowDecimals:false}}
                ];

                /*if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
                    config.columns.splice(1, 0, {text:'Колонка', dataIndex:'name', width:80, editor:{xtype:'textfield', maxLength:20, allowBlank:false}});
                }*/
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
                    model:'TK.model.PrintDataTable'
                });
            },
            newRecord:function () {
                return Ext.create('TK.model.PrintDataTable');
            },
            copyValues2MainFlds:function(){
                /*var prnTmpls = Ext.getStore('PrintTemplate'),
                    prnTmpl = prnTmpls.first() || prnTmpls.add(Ext.create('TK.model.PrintTemplate'))[0];
                this.reconfigure(prnTmpl.printData());*/
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