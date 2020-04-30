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
    // enableColumnHide:false,
    enableColumnMove:true,
//    enableColumnResize:false,
    sortableColumns:false,
    sealedColumns:true,
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
            plugins : [Ext.create('TK.view.components.PagingSizeChangerPlugin', {options : [ 20, 50, 100, 200, 1000] })],
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
    },
//    rendererID: function(val, meta, rec) {
//        	return (rec.data.ready ? '<div class="ux-cell-value">' + val  + '<div class="ux-cell-actions" style="width: 20px;"><div class="ux-cell-action locked"></div></div></div>' : val);
//        }
    listeners:{
        //добавляем обработчик для применения действий после рендеринга компонента
        afterrender: function(c) {
            this.afterrenderFn(c);
        }
    },
    /**
     * добавляем кнопки сохранения/очистки настроек во все компоненты потомки имеюие itemId
     * @param c компонент
     */
    afterrenderFn: function (c) {
        if(c.itemId) {
            var menu = c.headerCt.getMenu();

            if(menu.items.length>0&&menu.items.items[0].menu) {
                //добавляем кнопку сохранение настроек столбцов таблицы
                // сохранить настройки
                menu.items.items[0].menu.add({
                    text: this.saveGridSettings,
                    icon: './images/save.gif',
                    action: 'saveGridConfig'
                });
                // удалить настройки и использовать настройки по умолчанию
                menu.items.items[0].menu.add({
                    text: this.clearGridSettings,
                    icon: './images/clear-16.gif',
                    action: 'clearGridConfig'
                });
            }
            // применяем настройки столбцов к столбцам, если настройки существуют
            if (c.itemId &&gridConfig&& gridConfig[c.itemId]) {
                var config = gridConfig[c.itemId];
                for (var i = 0; i < c.columns.length; i++) {
                    if (config[c.columns[i].dataIndex]) {
                        if (config[c.columns[i].dataIndex].hidden === "true")
                            c.columns[i].toHide=true; // устанавливаем значение, если нужно спрятать колонку
                        if (config[c.columns[i].dataIndex].width) {
                            c.columns[i].setWidth(parseInt(config[c.columns[i].dataIndex].width));
                        }
                        c.columns[i].sort=parseInt(config[c.columns[i].dataIndex].sort);
                    }
                }

                // устанавливаем сохраненный порядок столбцов
                //ищем максимальный номер по порядку
                var gridColumns=c.down('headercontainer').getVisibleGridColumns(),maxSort=0;
                for( i=0;i<gridColumns.length;i++)
                {
                    if(gridColumns[i].sort>maxSort)
                        maxSort=gridColumns[i].sort;
                }
                // пересортируем столбцы
                for(n=0;n<=maxSort;n++) {
                    var sort=0,prevSort=-1;
                    for (i = 0; i < gridColumns.length; i++) {
                        // ищем нужный столбец по порядку
                        if(gridColumns[i].sort===n) {
                            c.headerCt.moveHeader(sort, gridColumns[i].sort);
                            gridColumns=c.down('headercontainer').getVisibleGridColumns();
                            break;
                        }
                        if(gridColumns[i].sort!==prevSort) {
                            // sort указывает на текущий порядковый номер столбца при интарации через массив столбцов
                            sort++;
                            prevSort=gridColumns[i].sort;
                        }
                    }
                }
                // прячем столбцы, которые спрятаны в настройках пользователя
                for (var i = 0; i < c.columns.length; i++) {
                    if(c.columns[i].toHide===true)
                        c.columns[i].hide();
                }

            }
        }
    }

});
