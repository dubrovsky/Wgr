Ext.define('TK.view.nsi.EditList', {
    extend: 'TK.view.nsi.List',
    alias: 'widget.nsieditlist',

    requires: [],

    prefix: 'nsi',
    defaultFocus: 'add1',
    editPrivileg: '',
    buildStore: function (config) {
        config.items.store = Ext.create('Ext.data.Store', {
//            autoLoad: true,
            pageSize: 50,
            model: this.buildStoreModel(),
            proxy: {
                type: 'ajax',
                url: this.buildUrlPrefix() + '_list.do',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'total'
                },
                extraParams: this.buildExtraParams(),
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                listeners: {
                    exception: function (proxy, response, operation) {
                        TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
                    }
                }
            }
        });
    },
    buildGridDockedItems: function (config) {
        config.items.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: this.btnAdd,
                    iconCls: 'add1',
                    action: 'add',
                    handler: TK.app.getController('Nsi').onAddRecord
                },
                {
                    xtype: 'searchfield',
                    itemId: 'add1',
                    store: config.items.store,
                    value: this.search
                }
            ]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: config.items.store,
            displayInfo: true
        }];
    },
    buildItems: function (config) {
        config.items = {
            xtype: 'grid',
            enableColumnHide: false,
            enableColumnMove: false,
            sortableColumns: false,
            columnLines: true,
            viewConfig: {
                stripeRows: true,
                singleSelect: true
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1,
//                    triggerEvent: 'cellfocus',
//                    initCancelTriggers: function() {
//                        var me = this, view = me.view;
//                        me.mun(view, 'cellclick', me.startEditByPosition, me);
//                        me.mon(view, 'cellclick', me.startEditByPosition, me, {buffer:250}); // to init celldblclick
//                        me.mon(view, 'celldblclick', Ext.emptyFn, me);
//                    },
                    listeners: {
                        beforeedit: this.onBeforeEdit,
                        scope: this
                    }
                })
            ],
            listeners: {
                beforerender: function (grid) {
                    var cellEditing = grid.plugins[0];
                    cellEditing.mun(cellEditing.view, 'cellclick', cellEditing.onCellClick, cellEditing);
                    cellEditing.mon(cellEditing.view, 'cellclick', cellEditing.onCellClick, cellEditing, {buffer: 250}); // to init celldblclick
                    cellEditing.mon(cellEditing.view, 'celldblclick', Ext.emptyFn, cellEditing);
                },
                scope: this
            }
        };
    },
    newRecord: function () {
    },
    onBeforeEdit: function (editor, props) {
        if (!tkUser.hasPriv(this.editPrivileg)) {
            return false;
        }
    },
    prepareData: function (rec) {
        var data = {};
        for (var prop in rec.data) {
            data[this.prefix + '.' + prop] = rec.data[prop];
        }
        return data;
    },
    listeners: {
        show: function (win) {
            var actioncolumn = win.down('actioncolumn'),
                button = win.down('button[action=add]'),
                search = win.down('searchfield');
            if (!tkUser.hasPriv(this.editPrivileg)) {
                actioncolumn.hide();
                button.hide();
                button.ownerCt.getComponent('add1').hide();
                // button.ownerCt.getComponent('edit1').hide();
                // button.ownerCt.getComponent('delete1').hide();
            }

            if (search.getValue()) {

                search.onTrigger2Click();
            } else {
                win.getComponent(0).store.load();
            }
        }
    }
});