Ext.define('TK.view.gu29k.List', {
    extend:'TK.view.DocsList',
    alias:'widget.gu29klist',

    buildStore:function (config) {
        config.store = 'Gu29ks';
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
                {text:this.headerGu29k, dataIndex:'numClaim', width:80, renderer: this.rendererPrint},
                {text:this.headerAvisoNum, dataIndex:'aviso', width:70},
                {text:this.headerVagNum, dataIndex:'vags', width:95, renderer:TK.Utils.renderLongStr},
                {text:this.headerContNum, dataIndex:'konts', width:95, renderer:TK.Utils.renderLongStr},
//                {text:'Дата трансп.', dataIndex:'g281', width:60},
                {text:this.headerSenderName, dataIndex:'g1', flex:1, width:200, renderer:TK.Utils.renderLongStr},
                {text:this.headerReceiverName, dataIndex:'g4', flex:1, width:200, renderer:TK.Utils.renderLongStr}

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
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnPrint, action:'print', iconCls:'pdf_blank_off'},
                        {text: this.btnBindPrint, action:'bindPrintTmpl', iconCls:'bind'}
                    ]
                },'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'

            ]
        });

        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }
//        config.dockedItems[0].items.push({text: this.btnBindPrint,iconCls:'bind', action:'bindPrintTmpl'},'-');
        config.dockedItems[0].items.push({text: this.btnHistory,iconCls:'history',action:'history'},'-');

    }
});