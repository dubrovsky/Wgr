Ext.define('TK.view.epd.List', {
    extend:'TK.view.DocsList',
    alias:'widget.epdlist',

    buildStore:function (config) {
        config.store = 'Epdes';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text: this.headerID, dataIndex: 'hid', flex:1, maxWidth:100, minWidth:70},
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
                {text:this.headerContNum, dataIndex:'konts', width:85},
                {text:this.headerSenderName, dataIndex:'g1', flex:1, width:200, renderer:TK.Utils.renderLongStr},
                {text:this.headerReceiverName, dataIndex:'g4', flex:1, width:200, renderer:TK.Utils.renderLongStr}

            ],
            defaults:{}
        };
    },

    buildTopToolbar:function (config) {
        config.dockedItems = new Array({
            dock:'top',
            xtype:'toolbar',
            itemId:'top',
            items:[
                {text:this.btnStat, iconCls:'filter', action:'filter'},'-',
                {text:this.btnCreate, iconCls:'doc_new', action:'create'},'-',
                //{text:this.btnCopy, iconCls:'copy', action:'copy'},'-',
                {xtype:'splitbutton', text: this.btnCopy, iconCls:'copy', action:'copy',
                    menu: [
                        {text: this.btnCopy, action:'copy', iconCls:'copy'},
                        {text: 'Копия, выбрать...', action:'showCopySelectedWin', iconCls:'copySelected'}
                    ]
                },'-',
                {text:this.btnEdit, iconCls:'edit', action:'edit'},'-'
            ]
        });
        if (tkUser.hasPriv('CIM_DELETE')) {
            config.dockedItems[0].items.push({text:this.btnDelete, iconCls:'del', itemId:'del', action:'del'}, {xtype:'tbseparator', itemId:'del1'});
        }
    }
});