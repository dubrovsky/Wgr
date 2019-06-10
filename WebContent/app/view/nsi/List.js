Ext.define('TK.view.nsi.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.nsilist',
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'Ext.ux.form.SearchField',
        'TK.Utils'
    ],
    y:1,
    modal:true,
    layout: 'fit',
    autoShow: true,
    maximizable:true,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildTitle(config);
        this.buildItems(config);
        this.buildStore(config);
        this.buildColModel(config);
        this.gridListeners(config);
        this.buildGridDockedItems(config);
        this.buildDockedItems(config);
        this.buildSelModel(config);
    },
    buildTitle: function(config){},
    buildStoreModel: function(){},
    buildUrlPrefix: function(){},
    buildExtraParams: function(){return {};},
    buildStore: function(config) {
        config.items.store = Ext.create('Ext.data.Store', {
//            autoLoad: true,
            pageSize: 10,
            fields:this.buildStoreModel(),
            proxy: {
                type: 'ajax',
                url: this.buildUrlPrefix() + '_view.do',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'total'
                },
                extraParams: this.buildExtraParams(),
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
            }
        });
    },
    buildSelModel:function(config) {},
    buildColModel: function(config) {},
    gridListeners: function(config) {},
    buildItems: function(config) {
    	config.items = {
            xtype: 'grid',
            enableColumnHide:false,
            enableColumnMove:false,
            sortableColumns:false,
            columnLines: true,
//            forceFit: true,
            autoHeight:true,
            viewConfig: {
                stripeRows: true,
                singleSelect:true
            }
        };

    },
    buildGridDockedItems: function(config) {
         config.items.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: {
                xtype: 'searchfield',
                store: config.items.store,
                value: this.search
            }
        },{
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: config.items.store,
            displayInfo: true
        }]
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: ['->',
            '-', {
                text: this.btnClose,
                handler: function(btn) {
                    btn.up('window').close();
                }
            }]
        }];
    },
    listeners:{
        show: function(win){
            var search = win.down('searchfield');
            if(search.getValue()) {
                search.onTrigger2Click();
            } else {
                win.getComponent(0).store.load();
            }
        }
    }
});