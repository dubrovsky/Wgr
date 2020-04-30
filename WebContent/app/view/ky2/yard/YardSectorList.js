Ext.define('TK.view.ky2.yard.YardSectorList', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2yardsectorlist',

    requires: [
        'TK.Utils',
        'TK.view.ky2.AbstractList'
    ],


    title: this.title,
    width: 700,
    maxHeight: 600,
    autoScroll: true,

    buildItems: function(config) {
        config.items = [{
            xtype: 'ky2abstractlist',
            buildColumns: function (config) {
                config.columns = {
                    items: [
                        {text: this.columnLblName, dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr},
                        {text: this.columnLblDescription, dataIndex: 'descr', flex: 1, renderer: TK.Utils.renderLongStr},
                        {text: this.columnLblGroups, dataIndex: 'groups', flex: 1, renderer: TK.Utils.renderLongStr}
                    ]
                };
            },
            buildStore: function (config) {
                config.store = 'ky2.YardSectors';
            },
            buildTopToolbar: function (config) {
                config.tbar = [
                    {text: this.btnCreate, iconCls: 'doc_new', action: 'create'}, '-',
                    {text: this.btnEdit, iconCls: 'edit', action: 'edit'}, '-'
                ];

                if (tkUser.hasPriv('CIM_DELETE')) {
                    config.tbar.push({text: this.btnDelete, iconCls: 'del', action: 'delete'}, '-');
                }
            }
        }];
    }
});
