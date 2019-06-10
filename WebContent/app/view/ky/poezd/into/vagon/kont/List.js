Ext.define('TK.view.ky.poezd.into.vagon.kont.List', {
    extend: 'TK.view.ky.BaseKontIntoList',
    alias:'widget.kykontinpoezdintolist',
    itemId:'kykontlist',

    /*buildColumns:function (config) {
        this.callParent(arguments);

        config.columns.items.push({
            text: 'Авто, отправление',
            dataIndex: 'avtoOut.no_avto',
            width: 130
        });
    },

    buildTopToolbar: function(config) {
        this.callParent(arguments);
        if (tkUser.hasPriv('CIM_SAVE')) {

            config.tbar.push({
                xtype: 'buttongroup',
                columns: 2,
                title: 'На авто, отправление',
                items: [
                    {text: 'Разместить', action: 'avtoOutDirForKont', iconCls: 'bind'},
                    {text: 'Убрать', action: 'unbindKontInAvtoOut', iconCls: 'delete1'}
                ]
            });
        }
    },*/

    buildStore: function (config) {
        config.store = 'ky.KontsInPoezdInto';
    }
});
