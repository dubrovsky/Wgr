Ext.define('TK.view.cim.CimList', {
    extend:'TK.view.DocsList',
    alias:'widget.cimlist',

    itemId:'cimlistMain',
    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],

//    headerCim: '',
    buildStore:function (config) {
        config.store = 'Cims';
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
                {text:this.headerCim, dataIndex:'numClaim', width:80, renderer: this.rendererPrint},
                {text:  this.headerContNum, dataIndex:'konts', width:100, renderer:TK.Utils.renderLongStr},
                {text: this.headerSenderName, dataIndex: 'g1', flex:1, renderer: TK.Utils.renderLongStr},
                {text: this.headerReceiverName, dataIndex: 'g4',  flex:1, renderer: TK.Utils.renderLongStr},
                {text: this.headerNPoezd, dataIndex: 'npoezd', width: 85, renderer: TK.Utils.renderLongStr,
                    beforeRender: function() {
                        this.getMenu().add({});
                    }}
            ],
            defaults:{}
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
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnPrint, action:'print', iconCls:'pdf_blank_off'},
                        {text: this.btnBindPrint, action:'bindPrintTmpl', iconCls:'bind'},
                        {text: this.btnSelectPrint, action:'selectPrintTmpl', iconCls:'select'}
                    ]
                },'-',
                {xtype:'splitbutton', text: this.btnCreate, iconCls:'doc_new', action:'create',
                    menu: [
                        {text: this.btnCont, action:'createCont', iconCls:'doc_new'},
                        {text: this.btnVag, action:'createVag', iconCls:'doc_new'}
                    ]
                },'-',
                // {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {xtype:'splitbutton', text: this.btnCopy, iconCls:'copy', action:'copy',
                    menu: [
                        {text: this.btnCopy, action:'copy', iconCls:'copy'},
                        {text: this.btnCopyAviso, action:'copy2aviso', iconCls:'copy'},
                        {text: this.btnCopySelect, action:'showCopySelectedWin', iconCls:'copySelected'},
                        {text: this.btnCopy2ArchSel, action:'copy2archSel', iconCls:'archive'},
                        {text: this.btnCopy2ArchTrN, action:'copy2arch', iconCls:'archive'},
                        //перенести/скопировать в другой маршрут выбранное
                        {text: this.btnCopy2RouteSel, action:'copy2routeSel', iconCls:'routes'},
                        //перенести/скопировать в другой маршрут по номеру поезда
                        {text: this.btnCopy2RouteTrN, action:'copy2route', iconCls:'routes'}
                    ]
                },'-',
                // {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'
                {xtype:'splitbutton', text: this.btnEdit, itemId:'edit', iconCls:'edit', action:'edit',
                    menu: [
                        {text: this.btnEdit, action:'edit', iconCls:'edit'},
                        {text: this.groupEdit,action:'editgroup', iconCls:'editgroup'}
                    ]
                }
            ]
        });

        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
            config.dockedItems[0].items.push({text: this.btnArchive,iconCls:'archive',itemId:'delList', action:'delList'},{xtype: 'tbseparator', itemId:'del1'});
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
        config.dockedItems[0].items.push({text:this.btnHistory, iconCls:'history', action:'history'}, '-');

    },
    // adding train search button
    listeners:{
        afterrender: function(c) {
            this.afterrenderFn(c);
        }
    },
    afterrenderFn:function (c) {
        var menu = c.headerCt.getMenu();
        var menuItem = menu.add({
            itemid:'searchTrainHeader',
            text: this.menuTrSearch,
            icon:'./images/loupe.png',
            action:'searchTrains'
        });
        menu.on('beforeshow', function() {
            var currentDataIndex = menu.activeHeader.dataIndex;
            if (currentDataIndex === 'npoezd') {
                menuItem.show();
            } else {
                menuItem.hide();
            }
        });
        this.callParent(arguments);
    }
});
