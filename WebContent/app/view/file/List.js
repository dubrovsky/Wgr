Ext.define('TK.view.file.List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.filelist',
    itemId:'fileList',

    buildStore: function(config) {
        config.store = 'FileInfs';
    },
    buildColumns: function(config) {
    	config.columns = [
            {text: this.headerID, dataIndex: 'hid', width: 45,  groupable:false},
            {text: this.headerCreation, dataIndex: 'dattr', width: 150,  groupable:false},
            {text: this.headerUser, dataIndex: 'un', renderer: this.rendererUn, width: 80},
            {text: 'Сообщения', dataIndex: 'messCount', width: 80, renderer: TK.Utils.renderMessCount},
            {text: 'Фл.', dataIndex: 'userFlag', width: 32, renderer: TK.Utils.rendererUserFlag},
            {text: 'Att', dataIndex: 'newDoc', width: 28, renderer: this.rendererNewDoc},

            {text: this.headerNumOtpr, dataIndex: 'numOtpr', width: 100, groupable:false},
            {text: this.headerNumCont, dataIndex: 'numCont', width: 100, groupable:false},
            {text: this.headerDateOtpr, dataIndex: 'dateOtpr', width: 100,  groupable:false},
            {text: this.headerVagNum, dataIndex: 'numWag', flex:1, renderer: TK.Utils.renderLongStr},
            {text: this.headerNPoezd, dataIndex: 'npoezd', width: 85, renderer: TK.Utils.renderLongStr}

            // {text: this.headerDescr, dataIndex: 'nkon', flex: 1, groupable:false}
        ];
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-',
                {text: 'Messenger', iconCls: 'doc_new', itemId: 'messanger', action: 'showMessanger'}, '-'
            ]
        });
        if (tkUser.hasPriv('CIM_DOC2DOC')) {
            config.dockedItems[0].items.push({
                text: this.btnPlusDocs, iconCls: 'copy', action: 'doc2doc',
                arrowAlign: 'bottom',
                menu: [
                    {text: "+ графические копии", action: 'uploadGrafCopies', iconCls: 'copy'}
                ]
            }, '-');
        }
        config.dockedItems[0].items.push({
            text: 'Messenger',
            iconCls: 'doc_new',
            itemId: 'messanger',
            action: 'showMessanger'
        }, '-');


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
    },
    rendererNewDoc: function (value) {
        return (value && value === 2) ? '<img src="./resources/images/doc_new.png" width="16" height="16">' : '';
    }

});