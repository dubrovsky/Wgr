Ext.define('TK.view.ky.BaseList', {
    extend: 'TK.view.ky.AbstractList',
    alias:'widget.kybaselist',

    buildTopToolbar: function (config) {
        this.callParent(arguments);

        config.tbar.push({text: this.btnEdit, iconCls:'edit', action:'edit'},'-');

        if(tkUser.hasPriv('CIM_DELETE')){
            config.tbar.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'delete'},{xtype: 'tbseparator', itemId:'del1'});
        }

    }
});
