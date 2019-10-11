Ext.define('TK.view.ky2.poezd.zayav.PoezdZayavForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdzayavform',
    title: 'Заявка на поезд',

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
        }
    }]
});
