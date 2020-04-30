Ext.define('TK.view.ky2.AbstractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2abstractwindow',
    autoShow: true,
    y: 0,
    modal: true,
    maximizable:true,

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    initComponent: function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function (config) {
        this.buildItems(config);
        this.buildBottomToolbar(config);
    },

    buildItems: function (config) {
    },

    buildBottomToolbar: function (config) {
        config.buttons = [{
            text: this.btnClose,
            scope: this,
            iconCls:'exit',
            handler: function (btn) {
                btn.up('window').close();
            }
        }];
    }
});