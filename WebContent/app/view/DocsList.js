Ext.define('TK.view.DocsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.docslist',

    requires: [
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'TK.view.components.PagingSizeChangerPlugin'
    ],

//    requires: ['Ext.ux.CheckColumn'],
    closable: false,
    autoScroll: true,
    columnLines: true,
    enableColumnHide:false,
    enableColumnMove:false,
//    enableColumnResize:false,
    sortableColumns:false,
//    forceFit: true,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildStore(config);
        this.buildColumns(config);
        this.buildView(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },
    buildView: function(config) {

        var controller = TK.app.getController('Docs'),
            menuItem = controller.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, controller.docsInRoute(menuItem)),
            menuItems = [];
        docsInPack.each(function(item){
            menuItems.push({text: item['descr'], handler: controller.onEdit, scope: controller, focusedItem:item['name'], iconCls:'invoice'});
        });
        this.contextMenu = Ext.create('Ext.menu.Menu', {
            items: menuItems
        });
        config.selModel={mode:'MULTI'},
    	config.viewConfig = {
            stripeRows: true/*,
//            enableTextSelection: true,
            *//*
            singleSelect:true*//*
            listeners: {
                itemcontextmenu: this.buildContextMenu,
                scope:this
            }*/
        };
    },
    buildContextMenu: function(view, rec, node, index, e) {
        e.stopEvent();
        this.contextMenu.showAt(e.getXY());
        return false;
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            defaults:{iconAlign:'top', arrowAlign:'bottom'},
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {text: this.btnPrint, iconCls:'pdf_blank_off', action:'print'},'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'
                /*{text: 'Удалить',iconCls:'del',itemId:'del', action:'del'},'-',
                {text: 'Обмен с ТБЦ',iconCls:'iftmin',itemId: 'tbc', action:'tbc'},'-'*/
            ]
        });
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }
        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }
    },
    buildBottomToolbar: function(config) {
        config.dockedItems.push({
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200 ] })],
            store: config.store,
            displayInfo: true
        });
    },
    initGrid: function(params) {
	    Ext.apply(this.getStore().getProxy().extraParams, params);
//	    this.store.proxy.extraParams = params;
    },
    rendererID: function(val, meta, rec) {
        return val;
        /*switch(rec.data.ready)
        {
            case 1:
            case 2:
            case 3:
                return '<div>'+val+'<img src="./resources/images/locked.gif" width="16" height="16"></div>';
            case 4:
                return '<div>'+val+'<img src="./resources/images/ready.gif" width="14" height="14"></div>';
            default:
                return val;
        }*/
    },
	rendererUn: function(val, meta, rec){
		return '<div class="view_tbc" onclick="TK.app.getController(\'Docs\').unText(\'' + rec.data.un + '\')">' + val + '</div>';
	},
	rendererPrint: function(val, meta, rec) {
        meta.style = 'white-space:normal;';
        if (rec.data['print']) {
            return '<span class="printed">' + val + '</span>';
        } else {
	        return val;
        }
    },
	rendererLocked: function(val, meta, rec) {
        if (rec.data['locked']) {
            return '<span class="locked">' + val + '</span>';
        } else {
	        return val;
        }
    }
//    rendererID: function(val, meta, rec) {
//        	return (rec.data.ready ? '<div class="ux-cell-value">' + val  + '<div class="ux-cell-actions" style="width: 20px;"><div class="ux-cell-action locked"></div></div></div>' : val);
//        }
});