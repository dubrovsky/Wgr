Ext.define('TK.view.ved.List', {
    // extend:'TK.view.DocsList',
    extend: 'Ext.grid.Panel',
    alias:'widget.vedlist',

    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],
    enableColumnResize: false,
    columnLines: true,

    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function(config) {
        this.buildStore(config);
        this.buildColumns(config);
        this.buildView(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },

    buildStore:function (config) {
        config.store = 'Veds';
    },

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerID, dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
                {
                    text:this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'dattr',
                        renderer: TK.Utils.renderLongStr,
                        width: 90
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
	                    renderer: this.rendererUn,
                        width: 85
                    }]
                },
                {text:this.headerVagVedNum, dataIndex:'num', flex:1, width:120, renderer: TK.Utils.renderLongStr},
                {text:this.headerPerVedNum, dataIndex:'pervednum', flex:1, width:350, renderer: TK.Utils.renderLongStr},
                {text:this.headerTraneNum, dataIndex:'train', flex:1, width:200, renderer:TK.Utils.renderLongStr},
                {text:this.headerTraneName, dataIndex:'trainname', flex:1, width:300, renderer:TK.Utils.renderLongStr},
                {text:this.headerVagCount, dataIndex:'vagcount', flex:1, width:50, renderer:TK.Utils.renderLongStr}

            ],
            defaults:{}
        };
    },

    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    },

    buildTopToolbar:function (config) {
//        this.callParent(arguments);
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            layout: 'column',
            itemId: 'top',
            items: [
                // {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local', forDeleted: true, forPresent: true},
                // {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnA4VagPrint, action:'print_A4_vag', iconCls:'pdf_blank_off'},
                        {text: this.btnA3VagPrint, action:'print_A3_vag', iconCls:'pdf_blank_off'},
                        {text: this.btnA4PerPrint, action:'print_A4_per', iconCls:'pdf_blank_off'},
                        {text: this.btnA3PerPrint, action:'print_A3_per', iconCls:'pdf_blank_off'}
                    ]
                },'-',
                {text: this.btnCreate, iconCls:'doc_new', action:'create'},'-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                // {xtype:'splitbutton', text: this.btnCopy, iconCls:'copy', action:'copy',
                //     menu: [
                //         {text: this.btnCopy, action:'copy', iconCls:'copy'},
                //         {text: 'Копия, выбрать...', action:'showCopySelectedWin', iconCls:'copySelected'}
                //     ]
                // },'-',
                {text: this.btnEdit, iconCls:'edit', action:'edit'}

            ]
        });

        // if(tkUser.hasPriv('_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'delete'},{xtype: 'tbseparator', itemId:'del1'});
        // }
        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }
//        config.dockedItems[0].items.push({text: this.btnBindPrint,iconCls:'bind', action:'bindPrintTmpl'},'-');
//         config.dockedItems[0].items.push({text: this.btnHistory,iconCls:'history',action:'history'},'-');

    },
    buildBottomToolbar: function(config) {
    }

});