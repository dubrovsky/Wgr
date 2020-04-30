Ext.define('TK.view.ky.avto.into.List', {
    extend:'TK.view.ky.avto.BaseAvtoList',
    alias:'widget.kyavtointolist',

    requires: [
        'TK.Utils'
    ],

    itemId:'kyavtolist',
    title:'Список автомобилей по прибытию',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.push(
            {text:'Прибытие', dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky.AvtosInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky.AvtosInto';
    }
});
