Ext.define('TK.view.ky.BasePlombList', {
    extend: 'TK.view.ky.BaseEditableList',
    alias:'widget.kybaseplomblist',

    buildColumns:function (config) {
        this.callParent(arguments);

        config.columns.items.splice(0, 0,
            {text:this.headerPlombKpl, dataIndex:'kpl', flex:1, editor:{xtype: 'numberfield', allowBlank: false, minValue: 1, maxValue: 999, decimalPrecision: 0}},
            {text:this.headerPlombZnak, dataIndex:'znak', flex:4, editor:{xtype: 'textfield', allowBlank: false, maxLength: 128}}
        );

    }
});
