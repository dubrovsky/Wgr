Ext.define('TK.view.ky2.poezd.into.PoezdZayavForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdzayavintoform',
    title: 'Заявка на поезд, ввоз',

    closable: false,
    layout: 'fit',
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'ky2basepoezdzayavform',
        itemId: 'ky2poezdzayavform',
        buildItems: function (config) {
            TK.view.ky2.poezd.BasePoezdZayavForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
        },
        buildTopToolbar: function (config) {
            TK.view.ky2.poezd.BasePoezdZayavForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
                {
                    text: '+Вагон/Контейнер/Груз',
                    iconCls: 'edit',
                    action: 'editVgCtGr'
                }
            );
        }
    }]
});
