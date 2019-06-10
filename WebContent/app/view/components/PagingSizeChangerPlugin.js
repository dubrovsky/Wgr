/**
 * paging toolbar plugin
 */
Ext.define('TK.view.components.PagingSizeChangerPlugin', {
  
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pagingsizechangerplugin',

    /**
     * place page option here
     */
  options: [],

  constructor: function(config) {
    Ext.apply(this, config);
    this.callParent(arguments);
  },

  init : function(pagingToolbar) {
	
	var comboStore = this.options;
	var ptStore = pagingToolbar.store;
	  
    var combo = Ext.create('Ext.form.field.ComboBox',{
      typeAhead: false,
      triggerAction: 'all',
      forceSelection: true,
      lazyRender:true,
      editable: false,

      value: ptStore.pageSize,
      width:50,
      store: comboStore,
      listeners: {
        select: function(combo, value, i){
        	ptStore.pageSize = value[0].data.field1;
        	ptStore.loadPage(1);
        }
      }
    });

    var index = pagingToolbar.items.indexOf(pagingToolbar.items.map['refresh']);
    pagingToolbar.insert(++index, this.displayText);
    pagingToolbar.insert(++index, combo);
    pagingToolbar.insert(++index,'-');
    
    //destroy combobox before destroying the paging toolbar
    pagingToolbar.on({
      beforedestroy: function(){
    	combo.destroy();
      }
    });
  }
});
