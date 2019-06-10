Ext.define('TK.view.user.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.user',

    requires: [
        'Ext.button.Button',
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.VTypes',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Separator'
    ],

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
    	Ext.apply(Ext.form.field.VTypes, {
            password: Ext.bind(TK.app.getController('User').passCheck, TK.app.getController('User')),
            passwordText: this.vTypeLabelPass,
            passwordMask: /[a-z0-9_-]/i,
            login:  Ext.bind(TK.app.getController('User').loginCheck, TK.app.getController('User')),
            loginText: this.vTypeLabelLogin,
            loginMask: /[a-z0-9_-]/i
        });
    },
    buildItems:function(config) {
    	config.items = [
            {fieldLabel: this.labelLogin, name: 'usr.un', maxLength: 20, id: 'loginFld', vtype: 'login'},
            {fieldLabel: this.labelPass, name: 'usr.ps', inputType: 'password', maxLength: 64, /*listeners: {'keyup': this.onKeyupPS, scope: this},*/ enableKeyEvents: true, vtype: 'alphanum'},
            {fieldLabel: this.labelPass1,name: 'ps_cnfm',inputType: 'password',initPassFld: 'usr.ps',vtype: 'password',maxLength: 64},
            {fieldLabel: this.labelFIO,name: 'usr.namKlient', allowBlank: true,maxLength: 32},
            {fieldLabel: this.labelEmail,name: 'usr.email', allowBlank: true, maxLength: 250, vtype: 'email'},
            {xtype: 'checkbox',fieldLabel: this.labelLocked,name: 'usr.locked',inputValue: true},
            {xtype: 'checkbox',fieldLabel: this.labelSu,name: 'usr.su',inputValue: true/*,handler:this.onCheckAdmin,scope:this*/},
            {
                xtype: 'fieldcontainer',
                fieldLabel: this.labelGroup,
                layout: 'hbox',
                itemId:'group',
                items: [
                    {xtype:'textfield', name:"usr.group.name", flex:1, readOnly: true, allowBlank: false},
                    {xtype:'button', text:'...', action:'group', margins: '0 0 0 5'}
                ]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: this.labelGroups,
                layout: 'hbox',
                itemId:'groups',
                items: [
                    {xtype:'textarea', name:"usr.groupsIds", flex:1, readOnly: true},
                    {xtype:'button', text:'...', action:'groups', margins: '0 0 0 5'}
                ]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: this.labelPrivs,
                layout: 'hbox',
                itemId:'privs',
                items: [
                    {xtype:'textarea', name:"usr.privilegsIds", flex:1, readOnly: true},
                    {xtype:'button', text:'...', action:'privs', margins: '0 0 0 5'}
                ]
            }
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