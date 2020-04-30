Ext.define('TK.view.messanger.Messanger', {
    extend: 'Ext.window.Window',
    alias: 'widget.messanger',
    autoShow: true,
    modal: false,
    maximizable: true,
    width: 450,
    height: 400,
    constrain: true,
    title: this.title,
    layout: 'border',
    initComponent: function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function (config) {
        this.buildItems(config);
        this.buildBottomToolbar(config);
    },

    buildItems: function (config) {
        config.items = [{
            layout: 'border',
            region: 'center',
            items: [{
                region: 'center',
                xtype: 'container',
                autoScroll: true,
                itemId: 'messages',
                style: {
                    backgroundColor: 'white'
                },
                items: {
                    xtype: 'dataview',
                    store: 'messanger.MessageStore',
                    tpl: [
                        '<tpl for=".">',
                        '<div class="message-question">',
                        '<div class="mess-klients"> <span class="mess-nam-klient">{NAM_KLIENT}</span><span class="mess-delimiter"> &raquo; </span><span class="mess-to-nam-klients">{TO_NAM_KLIENTS}</span> </div>',
                        '<div class="mess-dattr">{DATTR}</div>',
                        '<div class="mess-content">{CONTENT}</div>',
                        '</div>',
                        '</tpl>'
                    ],
                    itemSelector: 'div.message-question',
                    emptyText: 'No data available'
                }
            }, {
                xtype: 'form',
                region: 'south',
                split: true,
                bodyPadding: 5,
                border: false,
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: this.labelMsg,
                    name: 'message',
                    labelWidth: 70,
                    anchor: '100% 100%',
                    allowBlank: false
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'На почту',
                            name: 'toEmail',
                            itemId: 'toEmail',
                            inputValue: '1'
                        },
                        {xtype: 'component', flex: 1},
                        {
                            text: 'Отправить',
                            action: 'sendMessage',
                            formBind: true,
                            disabled: true
                        }
                    ]
                }]
            }]
        }, {
            title: 'Пользователи',
            region: 'west',
            xtype: 'treepanel',
            rootVisible: false,
            useArrows: true,
            width: 120,
            collapsible: true,
            collapsed: true,
            split: true,
            itemId: 'usersPanel',
            bodyPadding: 5,
            store: 'messanger.MessageUserStore',
            autoScroll: true
        }];
    },

    buildBottomToolbar: function (config) {
        config.buttons = [{
            text: this.btnRefresh,
            scope: this,
            iconCls: 'restore',
            action: 'reload'
        }, {
            text: this.btnClose,
            scope: this,
            iconCls: 'exit',
            action: 'close'
        }];
    }
});