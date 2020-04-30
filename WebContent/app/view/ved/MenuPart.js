Ext.define('TK.view.ved.MenuPart', {
    extend: 'TK.view.MenuTree',
    alias: 'widget.menupart',
    collapsible: false,
    // split: true,
	margins: '0 0 0 0',
    title: this.title,
    // rootVisible:false,
    // root:{},
    // viewConfig: {toggleOnDblClick: false},
    store: 'MenuPart',
    selType:     'checkboxmodel',
    autoScroll: true,
    selModel: {
        mode : 'MULTI',
        checkOnly: true,
        renderer: function(value, metaData, record) {
            var baseCSSPrefix = Ext.baseCSSPrefix;
            metaData.tdCls = baseCSSPrefix + 'grid-cell-special ' + baseCSSPrefix + 'grid-cell-row-checker';
            return record.get('parentId') === 'root' ? '' : '<div class="' + baseCSSPrefix + 'grid-row-checker"></div>';
        }
    },
    // initComponent:function () {
    //     var config = {};
    //     // this.buildConfig(config);
    //     Ext.apply(this, config);
    //     this.callParent(arguments);
    // }
    buildConfig:function (config) {
        // this.buildEventsListeners(config);
        this.buildTopToolbar(config);
    },

    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            defaults:{iconAlign:'left', style: {width: '70%'}},
            items: [
                {text: this.btnView, iconCls:'view', action:'load', itemId:'local'}
            ]
        });
    }

    // buildEventsListeners:function () {
//         var controller = TK.app.getController('Menu');
//         this.on({
//             load: controller.onRender,
//             itemclick: {fn: controller.onItemclick, scope: controller, buffer: 250},
// //            itemdblclick: controller.onItemdblclick,
//             scope: controller
//         });
//     }
});