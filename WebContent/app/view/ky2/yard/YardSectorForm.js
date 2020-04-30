Ext.define('TK.view.ky2.yard.YardSectorForm', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2yardsectorform',

    requires: [
        'TK.view.ky2.AbstractForm'
    ],


    required: '<span style="color:red;font-weight:bold">*</span>',
    width: 500,

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2abstractform',
            buildItems: function (config) {
                config.items = [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: this.lblName,
                        allowBlank: false,
                        afterLabelTextTpl: this.required
                    },
                    {
                        xtype: 'textarea',
                        name: 'descr',
                        fieldLabel: this.lblDescription
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.lblUsrGroups,
                        layout: 'hbox',
                        itemId: 'group',
                        afterLabelTextTpl: this.required,
                        items: [
                            {xtype: 'textarea', name: "usr.groupsIds", flex: 1, readOnly: true, allowBlank: false},
                            {xtype: 'button', text: '...', action: 'getUserGroups', margins: '0 0 0 5'}
                        ]
                    }
                ]
            },
            buildBottomToolbar: function (config) {
                config.buttons = this.buildButtons();
            }
        }];
    }
});