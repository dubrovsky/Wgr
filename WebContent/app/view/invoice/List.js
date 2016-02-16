Ext.define('TK.view.invoice.List', {
    extend:'TK.view.DocsList',
    alias:'widget.invoicelist',

    buildStore:function (config) {
        if(this.inPack){
            config.store = 'InvoicesInPack';
//            this.view.bindStore('InvoicesInPack');
        } else {
            config.store = 'Invoices';
//            this.view.bindStore('Invoices');
        }
//        config.store = 'Invoices';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerID, dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
                {
                    text:this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 90
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
	                    renderer: this.rendererUn,
                        width: 85
                    }]
                },
                {text:'№', dataIndex:'invoice', flex:1, renderer:TK.Utils.renderLongStr},
                {text:this.headerSenderName, dataIndex:'notd', flex:3, renderer:TK.Utils.renderLongStr},
                {text:this.headerReceiverName, dataIndex:'npol', flex:3, renderer:TK.Utils.renderLongStr}
            ],
            defaults:{}
        };
    },
    buildTopToolbar:function (config) {
//        this.callParent(arguments);
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local'},'-',
                {text: this.btnPrint, iconCls:'pdf_blank_off', action:'printInvoice'},'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {xtype:'splitbutton', text: this.btnCopy, iconCls:'copy', action:'copy',
                    menu: [
                        {text: this.btnCopy, action:'copy', iconCls:'copy'},
                        {text: 'Копия, выбрать...', action:'showCopySelectedWin', iconCls:'copySelected'}
                    ]
                },'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'

            ]
        });

        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }

        /*var items = config.dockedItems[0].items;
        for(var i = 0; i < items.length; i++){
            if(items[i].action && items[i].action == 'print'){
                items[i].action = 'printInvoice';
                break;
            }
        }*/

        config.dockedItems[0].items.push({text:this.btnHistory, iconCls:'history', action:'history'}, '-');

    },
    buildView: function(config) {
        if(this.inPack){
            config.viewConfig = {
                stripeRows: true
            };
        } else {
            this.callParent(arguments);
        }
    }
});