Ext.define('TK.view.ky2.BaseList', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2baselist',

    buildTopToolbar: function (config) {
        this.callParent(arguments);

        config.tbar.push({text: this.btnCreate, iconCls: 'doc_new', action: 'create'}, '-');
        config.tbar.push({text: this.btnEdit, iconCls: 'edit', action: 'edit'}, '-');

        if (tkUser.hasPriv('CIM_DELETE')) {
            config.tbar.push({
                tooltip: this.btnDelete,
                iconCls: 'del',
                itemId: 'del',
                action: 'delete'
            }, {xtype: 'tbseparator', itemId: 'del1'});
        }
        config.tbar.push({tooltip: 'Messenger', iconCls: 'doc_new', itemId: 'messanger', action: 'showMessanger'}, '-');
    }
});
