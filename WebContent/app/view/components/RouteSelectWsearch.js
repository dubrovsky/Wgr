/**
 * Created by Odmin on 19.11.2019.
 */
Ext.define('TK.view.components.RouteSelectWsearch', {
    extend: 'TK.view.MenuTree',
    xtype:'routeselectwsearch',
    alias: 'widget.routeselectwsearch',

    requires: [
        'TK.view.components.SearchFieldLocalTree'
    ],

    collapsible: false,
    selectionModel:'MULTI',

    margins: '0 0 0 0',
    title: this.title,

    store: 'MenuPart',
    selType:     'checkboxmodel',
    autoScroll: true,
    selModel: {
        mode : this.selectionModel,
        checkOnly: true,
        renderer: function(value, metaData, record) {
            var baseCSSPrefix = Ext.baseCSSPrefix;
            metaData.tdCls = baseCSSPrefix + 'grid-cell-special ' + baseCSSPrefix + 'grid-cell-row-checker';
            return record.get('parentId') === 'root' ? '' : '<div class="' + baseCSSPrefix + 'grid-row-checker"></div>';
        }
    },

    buildConfig:function (config) {
        this.buildTopToolbar(config);
    },

    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'topTB',
            items: [
                {xtype: 'searchfieldlocaltree', store: Ext.getStore('MenuPart'), paramName: 'text', itemId: 'searchRoute', flex: 1}
            ]
        });
    }
});