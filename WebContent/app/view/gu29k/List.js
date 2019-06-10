Ext.define('TK.view.gu29k.List', {
    extend:'TK.view.DocsList',
    alias:'widget.gu29klist',

    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],

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
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnPrint, action:'print', iconCls:'pdf_blank_off'},
                        {text: this.btnBindPrint, action:'bindPrintTmpl', iconCls:'bind'} ,
                        {text: this.btnSelectPrint, action:'selectPrintTmpl', iconCls:'select'}
                    ]
                },'-',
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
        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }
//        config.dockedItems[0].items.push({text: this.btnBindPrint,iconCls:'bind', action:'bindPrintTmpl'},'-');
        config.dockedItems[0].items.push({text: this.btnHistory,iconCls:'history',action:'history'},'-');

    }
});