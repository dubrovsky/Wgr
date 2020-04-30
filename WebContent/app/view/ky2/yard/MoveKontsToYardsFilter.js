Ext.define('TK.view.ky2.yard.MoveKontsToYardsFilter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2movekontstoyardsfilter',
    autoShow: true,
    modal: true,
    y: 0,
    width: 500,
    title: "Фильтр",
    layout: 'fit',
    config: {
        targetNode: undefined,
        dropHandlers: undefined
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                bodyPadding: 5,
                maxHeight: 300,
                // autoScroll: true,
                enableColumnHide: false,
                enableColumnMove: false,
                sortableColumns: false,
                plugins: new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 1
                }),
                store: new Ext.data.Store({
                    autoDestroy: true,
                    model: 'TK.model.ky2.PoezdBindTreeNode'
                }),
                columns: [{
                    header: 'Контейнер',
                    dataIndex: 'nkon',
                    width: 250
                }, {
                    header: 'X',
                    dataIndex: 'x',
                    width: 100,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        triggerAction: 'all',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        store: new Ext.data.Store({
                            autoDestroy: true,
                            fields: ['name', 'value']
                        }),
                        listeners: {
                            render: function (combo) {
                                var grid = combo.up('grid');
                                grid.fireEvent("comboxrender", combo, grid);
                            },
                            change: function (combo) {
                                var grid = combo.up('grid');
                                grid.fireEvent("comboxchange", combo, grid, this);
                            }
                        }
                    })
                }, {
                    header: 'H',
                    dataIndex: 'h',
                    width: 100,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        triggerAction: 'all',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        store: new Ext.data.Store({
                            autoDestroy: true,
                            fields: ['name', 'value']
                        }),
                        listeners: {
                            change: function (combo) {
                                var grid = combo.up('grid');
                                grid.fireEvent("combohchange", combo, grid, this);
                            },
                            focus: function (combo) {
                                var grid = combo.up('grid');
                                grid.fireEvent("combohfocus", combo, grid, this);
                            }
                        }
                    })
                }],
                buttons: [
                    {
                        text: "Переместить",
                        action: 'moveToYards'
                    },
                    {
                        text: "Закрыть",
                        scope: this,
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
