Ext.define('TK.view.ky2.yard.YardSectorForm', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2yardsectorform',

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
                        fieldLabel: 'Наименование',
                        allowBlank: false,
                        afterLabelTextTpl: this.required
                    },
                    {
                        xtype: 'textarea',
                        name: 'descr',
                        fieldLabel: 'Описание'
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Группы пользователей',
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