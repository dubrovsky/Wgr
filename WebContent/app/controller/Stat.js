Ext.define('TK.controller.Stat', {
	extend           :'Ext.app.Controller',

	views            :['stat.List', 'stat.Form'],
	stores           :['Stats'],
	models           :['Stat'],
	initEvents       :function (form) {
		if(form.getComponent('route')){
			form.getComponent('route').onTriggerClick = Ext.bind(function () {
				var nsiGrid = this.getController('Nsi').nsiRoutes(form.getComponent('route').getValue(),form.getComponent('project').getValue()).getComponent(0);
				nsiGrid.on('itemdblclick', this.selectRoute, form);
			}, this);
		}
		if(form.getComponent('project')){
			form.getComponent('project').onTriggerClick = Ext.bind(function () {
				var nsiGrid = this.getController('Nsi').nsiProjects(form.getComponent('project').getValue()).getComponent(0);
				nsiGrid.on('itemdblclick', this.selectProject, form);
			}, this);
		}
		form.getComponent('g16r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiCountries(form.getComponent('g16r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectCountriesG1, form);
		}, this);
		form.getComponent('g46r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiCountries(form.getComponent('g46r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectCountriesG5, form);
		}, this);
		form.getComponent('pogrStn').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('pogrStn').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectStaG7, form);
		}, this);
		form.getComponent('g162r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('g162r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectStaG162, form);
		}, this);
		form.getComponent('g101r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('g101r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectStaG101, form);
		}, this);
		form.getComponent('g1r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('g1r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectOtprG1, form);
		}, this);
		form.getComponent('g4r').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('g4r').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectOtprG4, form);
		}, this);
		form.getComponent('nzgr').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiGng(form.getComponent('nzgr').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectGng, form);
		}, this);
		form.getComponent('plat').onTriggerClick = Ext.bind(function () {
			var nsiGrid = this.getController('Nsi').nsiPlat(form.getComponent('plat').getValue()).getComponent(0);
			nsiGrid.on('itemdblclick', this.selectPlatG4, form);
		}, this);
	},
	selectCountriesG1:function (view, record, item, index) {
		var data = record.data;
//        this.getComponent('g1_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
		this.getComponent('g16r').setValue(data['naim']);
		view.up('window').close();
	},
	selectCountriesG5:function (view, record, item, index) {
		var data = record.data;
//        this.getComponent('g5_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
		this.getComponent('g46r').setValue(data['naim']);
		view.up('window').close();
	},
	selectStaG7      :function (view, record, item, index) {
		var data = record.data;
//        this.getComponent('text').setValue(data.staNo);
		this.getComponent('pogrStn').setValue(data.staName);
		view.up('window').close();
	},
	selectStaG162    :function (view, record, item, index) {
		var data = record.data;
		//        this.getComponent('text').setValue(data.staNo);
		this.getComponent('g162r').setValue(data.staName);
		view.up('window').close();
	},
	selectStaG101    :function (view, record, item, index) {
		var data = record.data;
		//        this.getComponent('text').setValue(data.staNo);
		this.getComponent('g101r').setValue(data.staName);
		view.up('window').close();
	},
	selectOtprG1     :function (view, record, item, index) {
		var data = record.data;
		this.getComponent('g1r').setValue(data['g1r']);
		view.up('window').close();
	},
	selectOtprG4     :function (view, record, item, index) {
		var data = record.data;
		this.getComponent('g4r').setValue(data['g1r']);
		view.up('window').close();
	},
	selectGng        :function (view, record, item, index) {
		var data = record.data;
//        this.getComponent('kgvn').setValue(data.code);
		this.getComponent('nzgr').setValue(data.name);
		view.up('window').close();
	},
	selectPlatG4     :function (view, record, item, index) {
		var data = record.data;
		this.getComponent('plat').setValue(data['platR']);
		view.up('window').close();
	},
	selectRoute     :function (view, record, item, index) {
		var data = record.data;
		this.getComponent('route').setValue(data['name']);
//		this.getComponent('project').setValue(data['project']);
		view.up('window').close();
	},
	selectProject:function (view, record, item, index) {
		var data = record.data;
		this.getComponent('project').setValue(data['name']);
		view.up('window').close();
	}
});
