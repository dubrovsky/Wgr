Ext.define('TK.view.user.FormGroups', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usergroups',
    defaultType: 'textfield',
    bodyStyle: 'padding:5px 8px;',
    defaults: {allowBlank: false,anchor: '100%', msgTarget: 'under'},
    initComponent: function() {
        this.buildVTypes();
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },
    buildVTypes:function(){
    	Ext.apply(Ext.form.VTypes, {
            nameGr: Ext.bind(TK.app.getController('User').nameGrCheck, TK.app.getController('User')),
//            nameGr: this.nameGrCheck,
            nameGrText: this.vTypeLabelGr,
            nameGrMask: /[a-z0-9_]/i
        });
    },
    buildItems:function(config) {
    	config.items = [
            {fieldLabel: this.labelName, name: 'usrGr.name', maxLength: 64, vtype: 'nameGr'},
            {fieldLabel: this.labelDescr,name: 'usrGr.descr', allowBlank: true, maxLength: 200}
        ];
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {text: this.btnSave, action:'save'},'-',
                {text: this.btnClose, action:'close'},'-'
            ]
        }];
    }
});