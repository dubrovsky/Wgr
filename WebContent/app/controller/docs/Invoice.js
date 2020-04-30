Ext.define('TK.controller.docs.Invoice', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils'
    ],


    views: ['invoice.List','invoice.Form'],
    stores: ['Invoices', 'InvoicesInPack'],
    models: ['Invoice', 'InvoiceGruz'],
    refs: [
        {
            ref: 'list',
            selector: 'viewport > tabpanel > invoicelist'
        },
        {
            ref: 'form',
            selector: 'viewport > tabpanel > invoice'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },{
            ref: 'langCombo',
            selector: 'viewport #localeCombo #langCombo'
        }
    ],
    init: function() {
        this.control(
            {
                'invoice button[action="checkCodes"]': {
                    click: this.onCheckCodes
                },
                'invoice button[action="translateInvCargo"]': {
                    click: this.onTranslateInvCargo
                },
                'invoicelist button[action="specExport"]': {
                    click: this.onSpecExport
                },
                'invoicelist button[action="importInvoiceXls"]': {
                    click: this.onInportImvoiceXls
                },
                '#invoiceSpecsXls button[action="downloadInvoiceSpecs"]': {
                    click: this.onDownloadInvoiceSpecs
                }
            }
        );
    },
    initEvents: function(form){
        form.down('button[action=copyEpd]').on('click',this.onCopyEpd,this);
        form.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.nsel').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.nsel').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNsel, form);
        }, this);
        form.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.notd').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.notd').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNotd, form);
        }, this);
        form.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.nbuy').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.nbuy').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNbuy, form);
        }, this);
        form.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.npol').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.npol').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectOtprNpol, form);
        }, this);
        form.getComponent('invoiceDetails').getComponent('postavka').getComponent('invoice.postavka').onTriggerClick = Ext.bind(function(){
            var deliv = this.getController('Nsi').nsiDeliv(form.getComponent('invoiceDetails').getComponent('postavka').getComponent('invoice.postavka').getValue()).getComponent(0);
            deliv.on('itemdblclick', this.selectDeliv, form);
        }, this);
        form.getComponent('invoiceDetails').getComponent('cux').getComponent('invoice.cux').onTriggerClick = Ext.bind(function(){
            var cux = this.getController('Nsi').nsiCurrency(form.getComponent('invoiceDetails').getComponent('cux').getComponent('invoice.cux').getValue()).getComponent(0);
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

        // нажатие кнопки выбора страны отправителя
        form.getComponent('invoiceDetails').getComponent('adres_s_o').getComponent('adres_s_o1').getComponent('invoice.country_o').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiCountries(form.getComponent('invoiceDetails').getComponent('adres_s_o').getComponent('adres_s_o1').getComponent('invoice.country_o').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectCountry, form);
        }, this);
    },
    selectOtprNsel: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.nsel').setValue(data['g1r']);
        this.getComponent('invoiceDetails').getComponent('adres_s_o').getComponent('invoice.adres_s').setValue(data['g19r']);
        view.up('window').close();
    },
    selectOtprNotd: function(view, record, item, index) {
        var data = record.data,
	        adress = this.getComponent('invoiceDetails').getComponent('adres_s_o').getComponent('adres_s_o1');
        this.getComponent('invoiceDetails').getComponent('nsel_notd').getComponent('invoice.notd').setValue(data['g1r']);
	    adress.getComponent('invoice.adres_o').setValue(data['g19r']);
	    adress.getComponent('invoice.country_o').setValue(data['g_1_5k']);
	    adress.getComponent('invoice.city_o').setValue(data['g18r_1']);
        view.up('window').close();
    },
    selectOtprNbuy: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.nbuy').setValue(data['g1r']);
        this.getComponent('invoiceDetails').getComponent('adres_b_p').getComponent('invoice.adres_b').setValue(data['g19r']);
        view.up('window').close();
    },
    selectOtprNpol: function(view, record, item, index) {
        var data = record.data,
	        adress = this.getComponent('invoiceDetails').getComponent('adres_b_p').getComponent('adres_b_p1');
        this.getComponent('invoiceDetails').getComponent('nbuy_npol').getComponent('invoice.npol').setValue(data['g1r']);
	    adress.getComponent('invoice.adres_p').setValue(data['g19r']);
	    adress.getComponent('invoice.country_p').setValue(data['g_1_5k']);
        adress.getComponent('invoice.city_p').setValue(data['g18r_1']);
        view.up('window').close();
    },
    selectCountry:function(view, record)
    {
        var data = record.data,
            country = this.getComponent('invoiceDetails').getComponent('adres_s_o').getComponent('adres_s_o1');
        country.getComponent('invoice.country_o').setValue(data['abc2']);
        view.up('window').close();
    },
    selectCurrency: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('invoiceDetails').getComponent('cux').getComponent('invoice.cux').setValue(data['abv3']);
        view.up('window').close();
    },
    selectDeliv: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('invoiceDetails').getComponent('postavka').getComponent('invoice.postavka').setValue(data['kod']);
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
        var lang = Ext.ComponentQuery.query('viewport #localeCombo #langCombo')[0].getValue(),
            data = record.data, 
            rec = this.selModel.getLastSelected();
        
        switch(lang) {
            case 'de':
                rec.set('nzyp', data['nameDe']);
                break;
            default:
                rec.set('nzyp', data['name']);
        }
        
        rec.set('kypk', data['kod']);
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
    },
    /**
     * Проверяем коды ТНВЕД на наличие
     * @param btn кнопка вызова
     */
    onCheckCodes:function (btn) {
        var invoiceForm=btn.up('invoice'),
            gruzlist=invoiceForm.down('#gruz'),
            gruzStore=gruzlist.getStore(),
            tnveds=[],initObj,me=this

        gruzStore.each(function(record) {
            tnveds.push(record.data['tnved']);
        });
        if(tnveds.length>0)
        {
            responseHandler=function (response,invoiceFrm) {
            // получаем спсиок ТНВЕД, которые отсутствуют в базе
                if(response.responseText)
                {
                    var respObj=Ext.decode(response.responseText),
                        tnevds=respObj['absent'].replace(/\s/g, '').split(","),
                        presnt6=respObj['presnt6'].replace(/\s/g, '').split(",");

                    invoiceFrm.wrongTnveds=tnevds;
                    invoiceFrm.present6Tnveds=presnt6;
                    invoiceFrm.down('#gruz').getView().refresh();
                }
                else {
                    invoiceFrm=Ext.ComponentQuery.query('invoice')[0];
                    invoiceFrm.wrongTnveds=[];
                    invoiceFrm.down('#gruz').getView().refresh();
                }

                return 'Ok';
            },
            initObj={query:tnveds.join(",")} ;
            TK.Utils.makeAjaxRequest('Nsi_checkTNVEDs_view.do', initObj, responseHandler,invoiceForm);
        }
    },
    onSpecExport:function (btn) {
        console.log('onCpecEхport');
        Ext.create('Ext.window.Window',{
            title: this.titlePrint,
            itemId:'invoiceSpecsXls',
            width: 220,
            height: 270,
            autoShow: true,
            modal:true,
            layout:'fit',
            items:{
                xtype:'form',
                height: 140,
                bodyPadding: 5,
                items:
                    [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            fieldLabel:this.lblCodes,
                            labelAlign:'top',
                            layout:'vbox',
                            itemId: 'print.tnveds',
                            items: [
                                {xtype: 'radiofield', boxLabel: this.lblCodes6, name: 'tnvedDigits', checked: true, inputValue: 'true'},
                                {xtype: 'radiofield', boxLabel: this.lblCodes10, name: 'tnvedDigits', inputValue: 'false'}
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel:this.lblOptions,
                            labelAlign:'top',
                            columns: 1,
                            layout:'vbox',
                            itemId: 'print.options',
                            items: [
                                {xtype: 'radiofield', boxLabel: this.lblTnvedNzgr, name: 'codeNameOpts', checked: true, inputValue: 'true'},
                                {xtype: 'radiofield', boxLabel: this.lblTnved, name: 'codeNameOpts', inputValue: 'false'}
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            vertical: true,
                            columns: 2,
                            itemId: 'print.withPrice',
                            items: [
                                //печатать с бланком
                                {xtype:'checkbox', boxLabel: this.lblWithCost, name:'usePrice', inputValue:true, uncheckedValue:false, checked:false, width: 200},
                            ]
                        }
                    ],
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->','-',{
                    text: this.btnPrint,
                    action:'downloadInvoiceSpecs',
                }]
            }]
        });
        console.log('onCpecEхport');
    },
    /**
     * Инициализация скачивания Спецификации Инвойса
     * @param btn кнопка вызова
     */
    onDownloadInvoiceSpecs:function (btn) {
        var hid,form,
            doc= this.getMenutree().lastSelectedLeaf.id.split('_')[3],
            route=this.getMenutree().lastSelectedLeaf.id.split('_')[2],
            cimsmgsForm,packHid,cimsmgsHid,smgs2Form,smgs2hid,cimHidForm,cimHid,query,query1=[];

        if(doc!=='invoicelist') {
            var cimsmgs=Ext.ComponentQuery.query('viewport > tabpanel >cimsmgs')[0];
            // проверяем есть ли закладка cimsmgs
            if(cimsmgs) {
                cimsmgsForm =cimsmgs.getForm();
                packHid = cimsmgsForm.findField('smgs.packDoc.hid').value;
                cimsmgsHid = cimsmgsForm.findField('smgs.hid').value;
            }
            // проверяем есть ли закладка smgs2
            var smgs2=Ext.ComponentQuery.query('viewport > tabpanel >smgs2')[0];
            if(smgs2) {
                smgs2Form = smgs2.getForm();
                packHid = smgs2Form.findField('smgs.packDoc.hid').value;
                smgs2hid = smgs2Form.findField('smgs.hid').value;
            }
            // проверяем есть ли закладка cim
            var cim=Ext.ComponentQuery.query('viewport > tabpanel >cim')[0];
            if(cim) {
                cimHidForm = cim.getForm();
                packHid = cimHidForm.findField('smgs.packDoc.hid').value;
                cimHid = cimHidForm.findField('smgs.hid').value;
            }
        }
        query=
            btn.up('window').down('form').getForm().findField('tnvedDigits').getValue()+','+
            btn.up('window').down('form').getForm().findField('codeNameOpts').getValue()+','+
            btn.up('window').down('form').getForm().findField('usePrice').getValue();

            // проверяем сколько у нас документов в ЕПД и устанавливаем hid и форму, если документ один в пакете
        if(cimsmgsHid&&!smgs2hid&&!cimHid) {
            hid = cimsmgsHid;
            form=cimsmgsForm;
        }
        if(smgs2hid&&!cimsmgsHid&&!cimHid) {
            hid = smgs2hid;
            form=smgs2Form;
        }
        if(cimHid&&!smgs2hid&&!cimsmgsHid) {
            hid = cimsmgsHid;
            form=cimsmgsForm;
        }
            // если основной документ Инвойс формирует список hid инвойсов

        var grid=this.getList();
        grid.getStore().each(function (record, id) {
                query1.push(record.get('hid'));
        });

        if(hid||doc==='invoicelist')
        {
            var url='Doc2Doc_downloadExcel.do?' +
                    '&search.packId=' + packHid +
                    '&search.type=' + (form?form.findField('smgs.type').getValue():'-1')+
                    '&search.docId=' + (form?form.findField('smgs.docType1').getValue():'2') +
                    '&token=1' +
                    '&query='+query+
                    '&query1='+query1.join(",")+
                    '&groupBy='+ 14 +
                    '&search.routeId=' + route;
            window.open(url,'_self','');
            this.getController('Utils').runProgressBar4LongOperation();
        }
        else
        {
            Ext.MessageBox.show({
                    title: this.msgTitleWarn,
                    msg: this.msgTxtSeveralDocs,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
            });
        }
    },
    onTranslateInvCargo:function (btn) {
        console.log('onTranslateInvCargo');
        var invoiceForm=btn.up('invoice'),
            gruzlist=invoiceForm.down('#gruz'),
            gruzStore=gruzlist.getStore(),
            trObject=[],initObj={},

            responseHandler = function (response) {
            var translates=Ext.decode(response.responseText);

                gruzStore.each(function(record) {
                    if(!record.data['nzgr']||record.data['nzgr'].length===0)
                    {
                        for(var i=0;i<translates.length;i++)
                        {
                            if(translates[i]['naimEn']===record.data['nzgrEn'])
                            {
                                record.data['nzgr']=translates[i]['naim'];
                                break;
                            }
                        }
                    }

                });
                gruzlist.getView().refresh();
                return 'Ok';
            };

        gruzStore.each(function(record) {
            var obj={

                'naimEn':record.data['nzgrEn'],
                'kod':record.data['tnved']
            };
            trObject.push(obj);
        });
        initObj.jsonData = Ext.encode(trObject);
        //отправляем запрос на сервер для перевода
        TK.Utils.makeAjaxRequest('Invoice_translateCargo.do', initObj, responseHandler, gruzlist);
    },
    onInportImvoiceXls:function (btn) {
        console.log('onImportImvoiceXls');
        this.getController('Doc2Doc').onUploadXLSfile(btn);
    }
});
