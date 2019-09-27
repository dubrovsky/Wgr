Ext.define('TK.view.ky2.poezd.out.PoezdZayavForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdzayavoutform',
    title: 'Авто, отправление',

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

        initFieldsWithDefaultsValues: function () {
        },

        buildTopToolbar: function (config) {
            TK.view.ky2.poezd.BasePoezdZayavForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
                {
                    text: '+Контейнер/Груз',
                    iconCls: 'edit',
                    action: 'editCtGr'
                }
            );

        }
    }]
});
