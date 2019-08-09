Ext.define('TK.view.edit.DetailPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailpanel',
    draggable:true,
    hidden: true,
	layout:'anchor',
//	frame:true,
	fieldDefaults: {labelWidth: 130},
    defaults: {anchor:'100%'},
    bodyPadding: 2,
    defaultType: 'textfield',
    bufData:{},
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildDockedItems(config);
        this.buildTools(config);
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: ['->',
            '-',{
                text: this.btnSave,
                scope: this,
                handler: this.onSave
            },
            '-',{
                text: this.btnClose,
		        handler:this.onClose,
		        scope:this
            }]
        }];
    },
    buildTools:function(config) {
		config.tools = [/*{
		    type:'save',
		    handler:this.onSave,
		    scope:this
		},*/
		{
		    type:'close',
		    handler:this.onClose,
		    scope:this
		}];
	},
    validatePanel:function(){return true},
    setDisplayedField:function(){},
	copyValues2MainFlds:function(){},
	copyValues2Buf:function(){},
	initBuf:function(data){},
	onChangeData:function(btn){},
    beforeSave:function() {},
    afterSave:function() {},
    onSave:function() {    // rewrite smgs gruz
        if(!this.validatePanel())
        {
            return;
        }
        this.beforeSave();
		this.copyValues2Buf();
		this.setDisplayedField();
		this.hide();
		this.ownerCt.maskPanel(false);
        this.afterSave();
        this.fireEvent('saveDetailPanelClick', this);
	},
    onClose:function() {
		this.hide();
		this.copyValues2MainFlds();
		this.ownerCt.maskPanel(false);
	}
})