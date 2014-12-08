Ext.define('TK.view.stat.List', {
	extend         :'TK.view.DocsList',
	alias          :'widget.statlist',
	buildStore     :function (config) {
        config.store = 'Stats';
	},
	buildColumns   :function (config) {
		config.columns = {
			items   :[
				{text:this.headerID, dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
				{text:this.headerProject, dataIndex:'project', width:80, renderer:TK.Utils.renderLongStr},
				{text:this.headerRoute, dataIndex:'route', width:80, renderer:TK.Utils.renderLongStr},
				{text:this.headerDoc, dataIndex:'doc', width:80, renderer:TK.Utils.renderLongStr},
				{
					text   :this.headerCreation,
					columns:[
						{
							text     :this.headerDateTime,
							dataIndex:'altered',
							renderer :TK.Utils.renderLongStr,
							width    :90
						},
						{
							text     :this.headerUser,
							dataIndex:'un',
							renderer :this.rendererUn,
							width    :85
						}
					]
				},
//				{text:this.headerVagNum, dataIndex:'vags', width:95, renderer:TK.Utils.renderLongStr},
				{text:this.headerContNum, dataIndex:'konts', width:95, renderer:TK.Utils.renderLongStr},
				{text:this.headerSenderName, dataIndex:'g1', flex:1, renderer:TK.Utils.renderLongStr},
				{text:this.headerReceiverName, dataIndex:'g4', flex:1, renderer:TK.Utils.renderLongStr}
			],
			defaults:{}
		};
	},
	buildTopToolbar:function (config) {
		config.dockedItems = new Array({
			dock  :'top',
			xtype :'toolbar',
			itemId:'top',
			items :[
				{text:this.btnStat, iconCls:'filter', action:'filter', itemId:'global'},
				'-'
			]
		});
	},
    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true
        };
    }
});
