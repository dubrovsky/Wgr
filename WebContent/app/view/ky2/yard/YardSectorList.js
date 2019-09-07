Ext.define('TK.view.ky2.yard.YardSectorList', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2yardsectorlist',

    title: 'Сектора',
    width: 700,

    buildItems: function(config) {
        config.items = [{
            xtype: 'ky2abstractlist',
            buildColumns: function (config) {
                config.columns = {
                    items: [
                        {text: 'Наименование', dataIndex: 'name', flex: 1, renderer: TK.Utils.renderLongStr},
                        {text: 'Описание', dataIndex: 'descr', flex: 1, renderer: TK.Utils.renderLongStr},
                        {text: 'Группы', dataIndex: 'groups', flex: 1, renderer: TK.Utils.renderLongStr}
                    ]
                };
            },
            buildStore: function (config) {
                config.store = 'ky2.YardSectors';
            },
            buildTopToolbar: function (config) {
                config.tbar = [
                    {text: 'Создать', iconCls: 'doc_new', action: 'create'}, '-',
                    {text: "Редактировать", iconCls: 'edit', action: 'edit'}, '-'
                ];

                if (tkUser.hasPriv('CIM_DELETE')) {
                    config.tbar.push({text: "Удалить", iconCls: 'del', action: 'delete'}, '-');
                }
            }
        }];
    }
});
