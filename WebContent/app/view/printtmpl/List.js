Ext.define('TK.view.printtmpl.List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.printTemplateList',
    buildStore: function(config) {
        config.store = 'PrintTemplates';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerID, dataIndex:'hid', flex:1, maxWidth:100, minWidth:70},
                {text: this.headerDateTime, dataIndex: 'dattr', renderer: TK.Utils.renderLongStr},
                {text: this.headerName, dataIndex: 'name', flex:1, renderer: TK.Utils.renderLongStr},
                {text: this.headerDefault, dataIndex: 'defaults', renderer: this.defaultRenderer},
                {text: this.headerRoutes, dataIndex: 'routes', flex:1, renderer: this.routesRenderer},
                {text: 'С бланком?', dataIndex: 'blanks', renderer: this.blanksRenderer}
            ],
            defaults:{}
        };
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: []
        });
        if(tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
            config.dockedItems[0].items.push(
                {text: this.btnCreate,iconCls:'doc_new', action:'createTmpl'},'-'
            );
        }
        config.dockedItems[0].items.push(
            {text: this.btnCopy,iconCls:'copy', action:'copyTmpl'},'-',
            {text: this.btnEdit,iconCls:'edit', action:'editTmpl'},'-',
            {text: 'Привязать к маршруту',iconCls:'bind', action:'bindTmplToRoutes',itemId:'bindRoutes'},'-'
        );
        if(tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
            config.dockedItems[0].items.push(
                {text: 'Бланки',iconCls:'download', action:'editBlanks'},'-'
            );
        }
        if(tkUser.hasPriv('CIM_PRINT_TEMPLATES_USER')){
            config.dockedItems[0].items.push(
                {text: 'Привязать к бланку',iconCls:'bind1', action:'bindBlanks'},'-'
            );
        }
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnDelete,iconCls:'del',itemId:'del', action:'delTmpl'},
                {xtype: 'tbseparator', itemId:'del1'}
            );
        }
    },
    routesRenderer: function (value) {
        return value.replace(/,/g, '<br/>');
    },
    blanksRenderer: function (value) {
        return value ? "ДА" : '';
    },
    defaultRenderer: function (value, metaData) {
        if (value) {
            metaData.style = 'color:red;';
            value = 'ДА';
        } else {
            metaData.style = 'color:green;';
            value = 'НЕТ';
        }
        return value;
    },
    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true
        };
    }
});