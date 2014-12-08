Ext.define('TK.view.MenuTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.menutree',
    collapsible: true,
    split: true,
//    animCollapse: true,
	margins: '5 0 5 5',
//    title: TK.Locale.MenuTree.Title,
    rootVisible:false,
    root:{},
    viewConfig: {toggleOnDblClick: false},
    store: 'MenuItems',
    initComponent:function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function (config) {
        this.buildEventsListeners(config);
    },
    buildEventsListeners:function () {
        var controller = TK.app.getController('Menu');
        this.on({
            load: controller.onRender,
            itemclick: {fn: controller.onItemclick, scope: controller, buffer: 250},
//            itemdblclick: controller.onItemdblclick,
            scope: controller
        });
    }
});