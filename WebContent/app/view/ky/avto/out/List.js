Ext.define('TK.view.ky.avto.out.List', {
    extend:'TK.view.ky.avto.BaseAvtoList',
    alias:'widget.kyavtooutlist',

    requires: [],

    itemId:'kyavtolist',
    title:'Список автомобилей по отправлению',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:'Отправление', dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        );

    },

    buildStore: function (config) {
        config.store = 'ky.AvtosOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky.AvtosOut';
    }
});
