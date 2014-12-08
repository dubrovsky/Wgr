Ext.define('TK.controller.docs.Invoice', {
    extend: 'Ext.app.Controller',

    views: ['invoice.List','invoice.Form'],
    stores: ['Invoices', 'InvoicesInPack'],
    models: ['Invoice', 'InvoiceGruz'],
    refs: [
        {
            ref: 'list',
            selector: 'viewport > tabpanel > invoicelist'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    /*init: function() {
        this.control({
            'docslist button[action="printInvoice"]': {
                click: this.onPrint
            }
        });
    },*/
    initEvents: function(form){
        form.down('button[action=copyEpd]').on('click',this.onCopyEpd,this);
        form.getComponent('nsel_notd').getComponent('invoice.nsel').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('nsel_notd').getComponent('invoice.nsel').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNsel, form);
        }, this);
        form.getComponent('nsel_notd').getComponent('invoice.notd').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('nsel_notd').getComponent('invoice.notd').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNotd, form);
        }, this);
        form.getComponent('nbuy_npol').getComponent('invoice.nbuy').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('nbuy_npol').getComponent('invoice.nbuy').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNbuy, form);
        }, this);
        form.getComponent('nbuy_npol').getComponent('invoice.npol').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('nbuy_npol').getComponent('invoice.npol').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNpol, form);
        }, this);
        form.getComponent('postavka').getComponent('invoice.postavka').onTriggerClick = Ext.bind(function(){
            var deliv = this.getController('Nsi').nsiDeliv(form.getComponent('postavka').getComponent('invoice.postavka').getValue()).getComponent(0);
            deliv.on('itemdblclick', this.selectDeliv, form);
        }, this);
        form.getComponent('cux').getComponent('invoice.cux').onTriggerClick = Ext.bind(function(){
            var cux = this.getController('Nsi').nsiCurrency(form.getComponent('cux').getComponent('invoice.cux').getValue()).getComponent(0);
            cux.on('itemdblclick', this.selectCurrency, form);
        }, this);
        form.getComponent('gruz').down('gridcolumn[dataIndex=tnved]').editor.onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiTnved().getComponent(0);
            nsiGrid.on('itemdblclick', this.selectTnved, form.getComponent('gruz'));
        }, this);
        form.getComponent('gruz').down('gridcolumn[dataIndex=nzyp]').editor.onTriggerClick = Ext.bind(function(){
            var upak = this.getController('Nsi').nsiUpak().getComponent(0);
            upak.on('itemdblclick', this.selectUpak, form.getComponent('gruz'));
        }, this);
    },
    /*onPrint: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var data = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
            this.getController('Docs').doPrint(doc, data);
        }
    },*/
    selectOtprNsel: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('nsel_notd').getComponent('invoice.nsel').setValue(data['g1r']);
        this.getComponent('adres_s_o').getComponent('invoice.adres_s').setValue(data['g19r']);
        view.up('window').close();
    },
    selectOtprNotd: function(view, record, item, index) {
        var data = record.data,
	        adress = this.getComponent('adres_s_o').getComponent('adres_s_o1');
        this.getComponent('nsel_notd').getComponent('invoice.notd').setValue(data['g1r']);
	    adress.getComponent('invoice.adres_o').setValue(data['g19r']);
	    adress.getComponent('invoice.country_o').setValue(data['g_1_5k']);
	    adress.getComponent('invoice.city_o').setValue(data['g18r_1']);
        view.up('window').close();
    },
    selectOtprNbuy: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('nbuy_npol').getComponent('invoice.nbuy').setValue(data['g1r']);
        this.getComponent('adres_b_p').getComponent('invoice.adres_b').setValue(data['g19r']);
        view.up('window').close();
    },
    selectOtprNpol: function(view, record, item, index) {
        var data = record.data,
	        adress = this.getComponent('adres_b_p').getComponent('adres_b_p1');
        this.getComponent('nbuy_npol').getComponent('invoice.npol').setValue(data['g1r']);
	    adress.getComponent('invoice.adres_p').setValue(data['g19r']);
	    adress.getComponent('invoice.country_p').setValue(data['g_1_5k']);
        adress.getComponent('invoice.city_p').setValue(data['g18r_1']);
        view.up('window').close();
    },
    selectCurrency: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('cux').getComponent('invoice.cux').setValue(data['abv3']);
        view.up('window').close();
    },
    selectDeliv: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('postavka').getComponent('invoice.postavka').setValue(data['kod']);
        view.up('window').close();
    },
    selectTnved: function(view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('tnved', data.kod);
        rec.set('nzgr', data.naim);
//        this.doLayout();
        view.up('window').close();
    },
    selectUpak: function(view, record, item, index) {
        var data = record.data;
        var rec = this.selModel.getLastSelected();
        rec.set('nzyp', data['name']);
        rec.set('kypk', data['kod']);
//        this.doLayout();
        view.up('window').close();
    },
    onCopyEpd: function(btn){
        var epd = this.getCenter().child('epd'),
            smgs,
            smgsForm,
            epdForm;

        if(epd && epd.hasListener('activate')) {
            Ext.MessageBox.show({
                title: this.titleEpd,
                msg: this.msgEpd,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
        else if(epd){
            epdForm = epd.getForm();
            smgs = btn.up('invoice');
            smgsForm = smgs.getForm();
            smgsForm.findField('invoice.notd').setValue(epdForm.findField('smgs.g1r').getValue());
            smgsForm.findField('invoice.adres_o').setValue(epdForm.findField('smgs.g19r').getValue());
            smgsForm.findField('invoice.npol').setValue(epdForm.findField('smgs.g4r').getValue());
            smgsForm.findField('invoice.adres_p').setValue(epdForm.findField('smgs.g49r').getValue());
            smgsForm.findField('invoice.utiN').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').getValue());
        }
    }
});