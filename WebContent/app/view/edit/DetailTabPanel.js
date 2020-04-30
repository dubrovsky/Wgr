Ext.define('TK.view.edit.DetailTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.detailtabpanel',
    activeTab:0,
	tabItems:[],
	tabCollectionName:'',
	hasParentCollection:false,
	deferredRender:false,
	initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
	buildConfig:function(config) {
        this.buildDockedItems(config);
        this.buildDefaults(config);
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: ['->',
             '-',{
                text: this.btnAdd,
                itemId: 'add',
                iconCls:'add1',
                scope: this,
                handler: this.onAddTab
            },'-',{
                text: this.btnDelete,
                itemId: 'del',
                iconCls:'delete1',
                scope: this,
                handler: this.onDelTab
            }]
        }];
    },
    buildDefaults:function(config) {
    	config.defaults = {
    		bodyStyle:'padding:5',
    		autoHeight:true
    	};
    },
    buildTabTitle:function() {
		this.items.each(
		    function(item, index,length){
		      	item.setTitle(new String(++index));
		    }
		);
	},
	buildConstValues:function() {
		this.items.each(
		    function(item, index,length){
		      	item.getComponent('sort').setValue(index);
		    }
		);
	},
    buildTabItemName:function(item, index, itemId) {
		if(!this.hasParentCollection){  // konts in vags
			item.name = (this.prefix || 'smgs')  + '.' + this.tabCollectionName + '[' + index + '].' + itemId;
		}
		else {
			item.name = this.name.split('.').slice(0,-1).join('.') + '.' + this.tabCollectionName + '[' + index + '].' + itemId;
		}
	},
	buildNewTabItemNames:function(items) {
        for(var i = 0; i < items.length; i++){
            if(items[i].items){  // fieldcontainers
                this.buildNewTabItemNames(items[i].items);
            } else {
                this.buildTabItemName(items[i], this.items.length, items[i].itemId);
            }
        }
	},
	rebuildAllTabItemsNames:function() {
		this.items.each(function(tab, index){ // tabs
			tab.items.each(function(field, inx){ // tab
                this.buildTabItemName(field, index, field.itemId);
                field.el.dom.name = field.name;
                if(field.isXType('detailtabpanel')){ // can be when konts in vags
                    this.rebuildAllTabItemsNames.call(field);
                } else if(field.isXType('fieldcontainer')){  // fieldcontainers
                    field.items.each(function(f, ix){
                        this.buildTabItemName(f, index, f.itemId);
                        f.el.dom.name = f.name;
                    }, this);
                }
//                if(field.items){ // can be when konts in vags
//                    this.rebuildAllTabItemsNames.call(field);
//                }
			}, this);
		}, this);
	},
    addTab:function() {
        this.buildNewTabItemNames(this.tabItems);
		var newTab = this.insert(this.items.indexOf(this.getActiveTab())+1, {
		    layout:'anchor',
            defaults: {anchor:'99%'},
            bodyPadding: 5,
		    items: this.tabItems
		});
		this.buildConstValues();
		this.buildTabTitle();
		this.setActiveTab(newTab);
		return newTab;
	},
    onAddTab:function() {
		return this.addTab();
	},
    delTab:function() {
		var tab = this.getActiveTab();
		if(tab){
	     	tab = this.remove(tab, true);
	     	this.buildConstValues();
		    this.buildTabTitle();
		    this.rebuildAllTabItemsNames();
	   	}
	   	return tab;
	},
    onDelTab:function() {
		this.delTab();
	}
})