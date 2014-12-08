Ext.define('TK.view.stat.Form', {
	extend          :'Ext.form.Panel',
    requires:       ['Ext.form.field.Text'],
	alias           :'widget.stat',
	labelAlign      :'top',
	bodyPadding     :5,
	border          :false,
	defaults        :{anchor:'100%', xtype:'textfield'},
	initComponent   :function () {
		var config = {};
		this.buildConfig(config);
		Ext.apply(this, config);
		this.callParent(arguments);
//		this.on("beforerender", this.onBeforerender, this);
	},
	buildConfig     :function (config) {
		this.buildItems(config);
		this.buildDockedItems(config);
	},
	buildItems      :function (config) {
		config.items = [
			{
				xtype   :'fieldset',
				title   :this.lableDate,
				defaults:{
					anchor:'100%',
					layout:{type:'hbox'}
				},
				items   :[
					{
						xtype        :'fieldcontainer',
						fieldLabel   :this.lableDate1,
						combineErrors:true,
						msgTarget    :'under',
						defaults     :{
							hideLabel:true
						},
						items        :[
							{xtype:'datefield', value:this.store.proxy.extraParams['search.date1'], name:'search.date1', width:80},
							{xtype:'timefield', value:this.store.proxy.extraParams['search.date11'], format:'H:i', increment:5, name:'search.date11', width:70}
						]
					},
					{
						xtype        :'fieldcontainer',
						fieldLabel   :this.lableDate2,
						combineErrors:false,
						defaults     :{
							hideLabel:true
						},
						items        :[
							{xtype:'datefield', value:this.store.proxy.extraParams['search.date2'], name:'search.date2', width:80},
							{xtype:'timefield', value:this.store.proxy.extraParams['search.date21'], format:'H:i', increment:5, name:'search.date21', width:70}
						]
					}
				]},
			{fieldLabel:this.lableZakazNum, value:this.store.proxy.extraParams['search.zakazNo'], name:'search.zakazNo'},
			{fieldLabel:this.lableStatus, xtype:'combo', value:this.store.proxy.extraParams['search.status'], name:'search.status', width:120, typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true, queryMode:'local',
				store  :[
					['', '---'],
					['3', 'Инстр. для согл. агентом'],
					['4', 'Инстр. согл-на агентом'],
					['6', 'Инстр. НЕсогл-на агентом'],
					['7', 'Инстр. заблокирована'],
					['17', 'Распечатана']
				]
			},
			{fieldLabel:this.lableUser, value:this.store.proxy.extraParams['search.un'], name:'search.un'},
			{fieldLabel:this.lableCountrySender, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.strnOtprGr'], name:'search.strnOtprGr', itemId:'g16r'},
			{fieldLabel:this.lableCountryRceiver, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.strnNaznGr'], name:'search.strnNaznGr', itemId:'g46r'},
			{fieldLabel:this.lableStnPogr, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.pogrStn'], name:'search.pogrStn', itemId:'pogrStn'},
			{fieldLabel:this.lableStnSender, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.stnOtpr'], name:'search.stnOtpr', itemId:'g162r'},
			{fieldLabel:this.lableStnReciver, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.stnNazn'], name:'search.stnNazn', itemId:'g101r'},
			{fieldLabel:this.lableSender, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.grzOtpr'], name:'search.grzOtpr', itemId:'g1r'},
			{fieldLabel:this.lableReceiver, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.grzPoluch'], name:'search.grzPoluch', itemId:'g4r'},
			{fieldLabel:this.lableCargoName, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.naimGrz'], name:'search.naimGrz', itemId:'nzgr'},
			{fieldLabel:this.lableContSize, value:this.store.proxy.extraParams['search.tipRazmKont'], name:'search.tipRazmKont'},
			{fieldLabel:this.lablePayer, xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.plat'], name:'search.plat', itemId:'plat'},
            {fieldLabel:'Номер контейнера', value:this.store.proxy.extraParams['search.nkon'], name:'search.nkon', itemId:'nkon'}

		];

		if (this.scope == 'global') {
			config.items.unshift(
				{fieldLabel:"Проект", xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.project'], name:'search.project', itemId:'project'},
				{fieldLabel:"Маршрут", xtype:'trigger', triggerCls:'dir', value:this.store.proxy.extraParams['search.route'], name:'search.route', itemId:'route'},
				{fieldLabel:'Документ', xtype:'combo', value:this.store.proxy.extraParams['search.type'], name:'search.type', width:120, typeAhead:true, forceSelection:true, triggerAction:'all', selectOnFocus:true, queryMode:'local',
					store:[
						['', '---'],
						['3', 'Инструкция СМГС'],
						['6', 'Инструкция ГУ'],
						['7', 'CIM'],
						['1', 'ЦИМ/СМГС'],
						['5', 'CMR'],
						['0', 'ЭПД'],
						['8', 'ГУ-27в'],
						['4', 'ГУ-29K'],
						['-1', 'Инвойсы'],
						['2', 'СМГС']
					]
				});
		}
	},
	buildDockedItems:function (config) {
		config.dockedItems = [
			{
				xtype:'toolbar',
				dock :'bottom',
				items:['->', '-', {
					text   :this.btnFind,
					handler:function (btn) {
						var form = this.up('form'),
                            fields = form.getForm().getValues();
//						Ext.apply(Ext.apply(this.store.proxy.extraParams, {'search.date1':'', 'search.date2':''}), fields);
						Ext.apply(form.store.getProxy().extraParams, fields);
                        form.store.loadPage(1);
//                        form.store.currentPage = 1;         // for paging toolbar resel PAGE attribute to 1
//						form.store.load({params:{start: 0, limit:20}});
					}
				} , '-', {
					text   :'Excel',
					handler:function (btn) {
						var form = this.up('form'),
							params = form.store.proxy.extraParams,
							urlParams = '&search.scope=' + (form.scope ? form.scope : 'local');
						if(!form.scope || form.scope == 'local'){
							urlParams += '&search.routeId=' + params['search.routeId'] + '&search.type=' + params['search.type'];
						}
						window.open('Report_viewReport1.do?' + form.getForm().getValues(true) + urlParams, '_self', '');
					}
//					,
//					disabled:(doc.name == 'invoicelist' ? true : false)
				}, '-', {
					text   :this.btnClose,
					handler:function (btn) {
						btn.up('window').close();
					}
				}, '-',{
                    text   :'Сброс',
                    handler:function (btn) {
                        btn.up('form').getForm().getFields().each(function(field){
                            field.setValue('');
                        });
//                        btn.up('form').getForm().reset();
                    }
                }]
			}
		];
	}
});