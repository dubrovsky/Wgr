Ext.define('TK.view.ky.BaseEditableList', {
    extend: 'TK.view.ky.AbstractList',
    alias:'widget.kybaseeditablelist',

    selType: 'cellmodel',

    buildConfig:function(config) {
        this.callParent(arguments);
        this.buildPlugins(config);
    },

    buildPlugins: function(config){
        config.plugins = [{
            ptype: 'cellediting',
            clicksToEdit: 1,
            pluginId: 'cellplugin'
        }];
    },

    buildColumns:function (config) {
        config.columns = {
            items:[{
                xtype: 'actioncolumn',
                width: 50,
                items: []
            }]
        };

        if(tkUser.hasPriv('CIM_SAVE')){
            config.columns.items[0].items.splice(1, 0, {
                iconCls: 'save',
                tooltip: 'Сохранить',
                scope: this,
                handler: function(grid, rowIndex, colIndex) {
                    var plomb = grid.getStore().getAt(rowIndex);
                    this.fireEvent('save', this, plomb);
                }
            });
        }


        if(tkUser.hasPriv('CIM_DELETE')){
            config.columns.items[0].items.splice(1, 0, {
                iconCls: 'del',
                tooltip: 'Удалить',
                scope: this,
                handler: function(grid, rowIndex, colIndex) {
                    var plomb = grid.getStore().getAt(rowIndex);
                    this.fireEvent('delete', this, plomb);
                }
            });
        }


    }
});
