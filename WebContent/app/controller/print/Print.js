Ext.define('TK.controller.print.Print', {
    extend: 'Ext.app.Controller',

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
            'docslist button[action="printInvoice"]': {
                click: this.onPrint
            }
        });
    },

    onPrint1: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var datas = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
                params = {};

            params['docId'] = doc['hid'];
            params['routeId'] = datas['routeId'] || datas[doc.prefix+'.route.hid'];
            params['search.type'] = datas['type'] || datas[doc.prefix+'.type'];
            params[doc.prefix+'.hid'] = datas['hid'] || datas[doc.prefix+'.hid'];
            params['task'] = doc['name'];

            this.doPrint1(doc, params);
        }
    },
    doPrint1: function(doc, datas){
        Ext.Ajax.request({
            url: 'PrintTemplates_printWinParams.do',
            params: {
                'doc.hid': datas['docId'],
                'route.hid': datas['routeId']
            },
            success: function(response, options) {
                var winParams = Ext.decode(response.responseText),
                    pagesArr = winParams['pages'],
                    nBlanks = winParams['nBlanks'],
//                    data = {},
                    pdfParams = {};
//                data.hid = datas.hid || datas[doc.prefix+'.hid'];
//                data.type = datas.type || datas[doc.prefix+'.type'];
                pdfParams['status'] = 17;
                pdfParams[doc.prefix+'.hid'] = datas[doc.prefix+'.hid'];
                pdfParams['task'] = datas['task'];
                if(datas['search.type']){
                    pdfParams['search.type'] = datas['search.type'];
                }
                pdfParams['doc.hid'] = datas['docId'];
                pdfParams['route.hid'] = datas['routeId'];

                if(pagesArr.length == 1 && nBlanks == 0){
                    window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
                } else {
                    var formItems = new Array(),
                        isEven = function(num) {return (num%2)==0;};
                    if(pagesArr.length > 1){
                        var checkboxItems = new Array(pagesArr.length);
                        for(var i = 0; i < pagesArr.length; i++){
                            checkboxItems.push({boxLabel: 'Страница ' + pagesArr[i] + (isEven(pagesArr[i]) ? '(оборот)' : ''), name: 'print.pages', inputValue: pagesArr[i]});
                        }
                        formItems.push({
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Страницы на печать',
                            vertical: true,
                            columns: 1,
                            allowBlank: false,
                            cls: 'x-check-group-alt',
                            items: checkboxItems
                        });
                    }
                    if(nBlanks > 0){
                        formItems.push({xtype:'checkbox', boxLabel:'С бланком?', name:'print.useBlanks', inputValue:true, uncheckedValue:false});
                    }
                    Ext.create('Ext.window.Window',{
                        title: 'Настройка печати',
                        width: 280,
                        autoShow: true,
                        modal:true,
                        items:{
                            xtype:'form',
                            bodyPadding: 5,
                            items:formItems
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: ['->','-',{
                                text: 'Печать',
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
    }
});
