Ext.define('TK.view.ky.poezd.BaseKontList', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kybasekontlistforpoezd',

    requires: [
        'TK.view.ky.AbstractList'
    ],


    width: 500,
    maxHeight: 500,
    title: 'Список контейнеров по поезду',
    bodyPadding: 5,

    buildItems: function (config) {
        config.items = [{
            xtype: 'kyabstractlist',
            itemId: 'kontListInPoezd',
            /*buildStore:function (config) {
                config.store = 'ky.KontsInPoezdList';
            },*/
            buildColumns:function (config) {
                config.columns = {
                    items:[
                        {text:'Номер контейнера', dataIndex:'nkon', flex:1}
                    ]
                };
            },
            buildTopToolbar: function (config) {
                config.tbar = [
                    {text: 'Редактировать', iconCls:'edit', action:'edit'},'-'
                ];

            }
        }];
    }
});