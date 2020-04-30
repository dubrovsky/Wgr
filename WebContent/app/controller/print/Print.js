Ext.define('TK.controller.print.Print', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.form.CheckboxGroup',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Toolbar',
        'Ext.window.Window',
        'TK.Utils'
    ],

    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        }
    ],
    init: function() {
        this.control({
            'docslist button[action="print"]': {
                click: this.onPrint1
            },
            'docslist button[action="print"] menuitem[action="print"]': {
                click: this.onPrint1
            },
            'docslist button[action="printAviso"]': {
                click: this.onPrepPrintAviso
            },
            'docslist button[action="print"] menuitem[action="printView"]': {
                click: this.onPrintOnListView
            },
            'docslist button[action="print"] menuitem[action="selectPrintTmpl"]': {
                printWithTempl: this.onPrintWithTempl
            },
            'docslist button[action="print"] menuitem[action="groupPrintTmpl"]': {
                click: this.onGroupPrintTmpl
            },
            'smgsselectform': {
                doGroupPrintTmpl: this.onDoGroupPrintTmpl
            },
            'docslist button[action="printInvoice"]': {
                click: this.onPrintInvoice
            },
            'docsform button[action="printView"]': {
                click: this.onPrintOnFormView
            },
            'vedlist button[action="print"] menuitem[action="print_A4_vag"]': {
                click: this.onVedPrint
            },

            'vedlist button[action="print"] menuitem[action="print_A3_vag"]': {
                click: this.onVedPrint
            },
            'vedlist button[action="print"] menuitem[action="print_A4_per"]': {
                click: this.onVedPrint
            },
            'vedlist button[action="print"] menuitem[action="print_A3_per"]': {
                click: this.onVedPrint
            }
        });
    },
// предпросмотр печати
    onPrintOnFormView: function(btn){
        var form = btn.up('form').getForm(),
            hid = form.findField('smgs.hid').getValue();

        if(!hid){
            Ext.Msg.show({title: 'Предупреждение', msg: 'Сохраните документ', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING});
            return;
        }

        var doc = tkUser.docs.getByKey(form.findField('search.docType').getValue()),
            params = {
                docId: form.findField('smgs.docType1').getValue(),
                isView: true,
                routeId: form.findField('smgs.route.hid').getValue(),
                'search.type': form.findField('smgs.type').getValue(),
                task: form.findField('search.docType').getValue()
            };
        params[doc.prefix + '.hid'] = hid;
        params['query'] = hid;
        this.doPrint1(doc, params);
    },

    onPrintWithTempl: function(grid, templHid){
       this.preparePrint(grid, {isView: false, templHid: templHid})
    },

    onPrintOnListView: function(btn){
        this.preparePrint(btn.up('grid'), {isView: true})
    },
    onGroupPrintTmpl:function(btn)
    {
        var opts={},doc;
        doc=tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
        opts['mode']='groupPrintTmpl';
        opts['task']=doc['name'];
        this.getController('Doc2Doc').uploadPogruzListTrain(btn,opts);
    },
    onDoGroupPrintTmpl:function(params)
    {
        doc=tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
        params['docId']=doc['hid'];
        this.doPrint1(doc, params);
    },

    onVedPrint: function(btn){
        var list = btn.up('grid');
        var actionParams = btn.action.split('_');
        if(TK.Utils.isRowSelected(list)) {
            var datas = list.getSelectionModel().getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
                params = {};
            params['pageSize'] = actionParams[1];
            params['doc.name'] = actionParams[2];
            params[doc.prefix+'.hid'] = datas['hid'] || datas[doc.prefix+'.hid'];
            window.open('Pdf.do?' + Ext.Object.toQueryString(params),'_blank','');
        }
    },
    /**
     * Инициализируем печать шаблона
     * @param btn кнопка вызова
     */
    onPrepPrintAviso:function(btn)
    {
        this.preparePrint(btn.up('grid'), {isView: false},true);
    },

    onPrint1: function(btn){
        this.preparePrint(btn.up('grid'), {isView: false});
    },

    /**
     * подготовка к печати докуентоа
     * @param list таблица записей документов
     * @param args преднастройки
     * @param isAviso признак шаблона.
     */
    preparePrint: function(list, args,isAviso){
        // var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {

            Ext.Msg.show({title:this.printTitle, msg: this.printMsg+'('+list.selModel.getSelection().length+')', buttons: Ext.Msg.YESNO,
                closable: false, icon: Ext.Msg.QUESTION, scope: this,
                fn: function(buttonId) {
                    //print confirmation
                    if(buttonId === 'yes')
                    {
                        var hids=[],datas = list.getSelectionModel().getLastSelected().data,
                            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
                            params = {};

                        Ext.Array.each(list.getSelectionModel().getSelection(),function (item) {
                            hids.push(item.data.hid);
                        });

                        params['docId'] = doc['hid'];
                        params['routeId'] = datas['routeId'] || datas[doc.prefix+'.route.hid'];
                        params['search.type'] = datas['type'] || datas[doc.prefix+'.type'];
                        params[doc.prefix+'.hid'] = datas['hid'] || datas[doc.prefix+'.hid'];
                        params['task'] = doc['name'];
                        params['query'] = hids.join(',');
                        Ext.apply(params, args);
                        if(isAviso) //печатаем шаблон
                        {
                            this.doPrintAviso(doc, params)
                        }
                        else {
                            this.doPrint1(doc, params);
                        }
                    }
                }
            });
        }
    },
    /**
     * заменяем параметры шаблона на параметры соответствующего докуента и печатаем шаблон
     * @param doc документ
     * @param datas параметры
     */
    doPrintAviso:function(doc, datas)
    {
        switch (datas['search.type']) {
            case '11':{ // шаблона СМГС2
                datas['search.type']='12';
                datas['task']='smgs2';
                datas['docId']='7';
            }break;
            case '14':{ // шаблон CIM
                datas['search.type']='7';
                datas['task']='cim';
                datas['docId']='21';
            }break;
            case '10':{ // шаблон CIMSMGS
                datas['search.type']='1';
                datas['task']='cimsmgs';
                datas['docId']='4';
            }break;
        }
        Ext.Ajax.request({
            url: 'PrintTemplates_printWinParams.do',
            params: {
                'doc.hid': datas['docId'],
                'route.hid': datas['routeId'],
                templHid: datas['templHid']
            },
            scope: this,
            success: function(response, options) {
                var me = this,
                    winParams = Ext.decode(response.responseText),
                    pagesArr = winParams['pages'],
                    nBlanks = winParams['nBlanks'],
                    pdfParams = {};
                if (!datas['isView']) {
                    pdfParams['status'] = 17;
                }
                pdfParams[doc.prefix + '.hid'] = datas[doc.prefix + '.hid'];
                pdfParams['task'] = datas['task'];
                if (datas['search.type']) {
                    pdfParams['search.type'] = datas['search.type'];
                }
                pdfParams['doc.hid'] = datas['docId'];
                pdfParams['route.hid'] = datas['routeId'];
                pdfParams['isView'] = datas['isView'];
                pdfParams['templHid'] = datas['templHid'];
                pdfParams['query'] = datas['query'];
                pdfParams['print.useBlanks'] = true;
                pdfParams['print.pageOpts'] = '1';
                window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
            }
        });

    },
// печать
    doPrint1: function(doc, datas){

        Ext.Ajax.request({
            url: 'PrintTemplates_printWinParams.do',
            params: {
                'doc.hid': datas['docId'],
                'route.hid': datas['routeId'],
                templHid: datas['templHid']
            },
            scope: this,
            success: function(response, options) {
                var me = this,
                    winParams = Ext.decode(response.responseText),
                    pagesArr = winParams['pages'],
                    nBlanks = winParams['nBlanks'],
                    pdfParams = {},
                    printCtrl=me.getController('print.Print');
                if(!datas['isView']) {
                    pdfParams['status'] = 17;
                }
                pdfParams[doc.prefix+'.hid'] = datas[doc.prefix+'.hid'];
                pdfParams['task'] = datas['task'];
                if(datas['search.type']){
                    pdfParams['search.type'] = datas['search.type'];
                }
                pdfParams['doc.hid'] = datas['docId'];
                pdfParams['route.hid'] = datas['routeId'];
                pdfParams['isView'] = datas['isView'];
                pdfParams['templHid'] = datas['templHid'];
                pdfParams['query'] = datas['query'];

                if(datas['isView'] || (pagesArr.length === 1 && nBlanks === 0)){
                    window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
                } else {
                    var formItems = [],
                        isEven = function(num) {return (num%2)==0;};
                    if(pagesArr.length > 1){
                        var checkboxItems = new Array(pagesArr.length);
                        for(var i = 0; i < pagesArr.length; i++){
                            checkboxItems.push({boxLabel: this.textPage + pagesArr[i] + (isEven(pagesArr[i]) ? this.textPageBack : ''), name: 'print.pages', inputValue: pagesArr[i]});
                        }
                        formItems.push({
                            xtype: 'checkboxgroup',
                            fieldLabel: this.textPages,
                            vertical: true,
                            columns: 1,
                            allowBlank: false,
                            cls: 'x-check-group-alt',
                            items: checkboxItems
                        });

                    }

                    if(nBlanks > 0){
                        formItems.push({
                            xtype: 'checkboxgroup',
                            vertical: true,
                            columns: 2,
                            items: [
                                //печатать с бланком
                                {xtype:'checkbox', boxLabel: printCtrl.labelBlank, name:'print.useBlanks', inputValue:true, uncheckedValue:false, checked:true},
                                // разбить на отдельные файлы и запоковать
                                {xtype:'checkbox', boxLabel: printCtrl.labelFiles, name:'print.useZip', inputValue:true, uncheckedValue:false, checked:false}
                            ]
                        });
                        //настрока печати страниц
                        formItems.push(
                            {
                                xtype: 'radiogroup',
                                columns: 1,
                                itemId: 'print.pages',
                                items: [
                                    {xtype: 'radiofield', itemId: 'print.onlyAll', boxLabel: printCtrl.printAll, name: 'print.pageOpts', checked: true, inputValue: '0'},
                                    {xtype: 'radiofield', itemId: 'print.onlyFirst', boxLabel: printCtrl.printFirst, name: 'print.pageOpts', inputValue: '1'},
                                    {xtype: 'radiofield', itemId: 'print.onlyForth', boxLabel: printCtrl.printForth, name: 'print.pageOpts', inputValue: '2'}
                                ]
                            }
                        );
                    }

                    Ext.create('Ext.window.Window',{
                        title: me.titlePrint,
                        width: 280,
                        height: 170,
                        autoShow: true,
                        modal:true,
                        items:{
                            xtype:'form',
                            height: 140,
                            bodyPadding: 5,
                            items:formItems
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: ['->','-',{
                                text: this.textPrint,
                                handler: function(btn){
                                    var panel = btn.up('window').down('form');
                                    if(panel.getForm().isValid()){

                                        Ext.apply(pdfParams, panel.getValues());
                                        window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
                                    } else {
                                        TK.Utils.failureDataMsg();
                                    }
                                }
                            }]
                        }]
                    });
                }
            },
            failure: function(response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    doPrint: function(doc, datas){    // 4 Invoices Print through JSP
        var data = {};
        data.hid = datas.hid || datas[doc.prefix+'.hid'];
        data.type = datas.type || datas[doc.prefix+'.type'];
        window.open(
            Ext.String.capitalize(doc.prefix) + '_view.do?status=17&'+
                doc.prefix+'.hid=' + data.hid + '&task=' + doc.name + (data.type ? '&search.type='+data.type : '') ,
            '_blank',''
        );
    },
    onPrint: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var data = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
            this.doPrint(doc, data);
        }
    },
    onPrintInvoice:function (btn) {
        this.onPrint(btn);
    }
});
