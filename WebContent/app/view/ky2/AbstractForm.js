Ext.define('TK.view.ky2.AbstractForm', {
    extend: 'Ext.form.Panel',
    alias:'widget.ky2abstractform',
    bodyPadding: 10,
//    buttonAlign: 'left',
    required: '<span style="color:red;font-weight:bold">*</span>',

    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function(config) {
        this.buildItems(config);
        this.buildTopToolbar(config);
        this.buildBottomToolbar(config);
    },

    buildButtons: function(){
        var buttons = [];

        if (tkUser.hasPriv('CIM_SAVE')){
            buttons.push({
                text: this.btnSave,
                formBind: true,
                disabled: true,
                action: 'save',
                iconCls:'save'
            });
        }

        buttons.push(
        {
            text: this.btnCancel,
            iconCls:'delete1',
            handler: function(btn) {
                btn.up('form').getForm().reset();
            }
        });

        return buttons;
    },

    buildItems: function(config) {},

    buildTopToolbar: function(config){},

    buildBottomToolbar: function(config){},

    initFieldsWithDefaultsValues: function(){}
});
