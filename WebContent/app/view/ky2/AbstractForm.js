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
            },{
                text:this.btnSaveExit,
                formBind: true,
                disabled: true,
                iconCls:'save_close',
                action:'saveExit'
            });
        }

        buttons.push({
            text:this.btnClose,
            iconCls:'close1',
            action:'close'
        }
        ,'-'
        ,{
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
