Ext.define('TK.view.ky.BaseKontForm', {
    extend: 'TK.view.ky.AbstractForm',
    alias:'widget.kybasekontform',

    layout: {
        type: 'hbox'/*,
         align: 'stretch'*/
    },
    buildItems: function(config) {
        config.items = [{
            xtype: 'container',
            flex:1,
            layout:'anchor',
            items:[{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: '!Номер контейнера',
                items: [{
                    xtype:'textfield',
                    name: 'nkon',
                    itemId: 'nkon',
                    maxLength: 11,
                    enableKeyEvents: true,
                    allowBlank: false,
                    vTypes: [
                        'kontNum'
                    ]
                },{
                    xtype: 'button',
                    iconCls: 'check1',
                    action: 'getKont'
                },{
                    xtype: 'button',
                    text: '...',
                    action: 'nsiKont'
                }]
            },{
                xtype:'checkbox',
                name: 'poruz',
                fieldLabel: 'Порожний?',
                inputValue: true,
                uncheckedValue: false
            },{
                xtype:'numberfield',
                fieldLabel: 'Масса тары',
                decimalPrecision: 0,
                name: 'massa_tar',
                maxLength: 20
            },{
                xtype:'numberfield',
                fieldLabel: 'Подъемная сила',
                decimalPrecision: 2,
                minValue: 0,
                name: 'pod_sila',
                maxLength: 20
            },{
                xtype: 'combo',
                queryMode: 'local',
                fieldLabel: 'Футовость',
                name: 'type',
                store: ['20','30','40','40HC','45']
            },{
                xtype:'textfield',
                fieldLabel: 'Вид',
                name: 'vid',
                maxLength: 28
            }]
        },{
            xtype: 'container',
            flex:1,
            layout:'anchor',
            items:[{
                xtype:'textfield',
                fieldLabel: 'Признак собственности',
                name: 'prizn_sob',
                maxLength: 128
            },{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Собственник',
                items: [{
                    xtype:'textarea',
                    name: 'naim_sob',
                    maxLength: 128,
                    //allowBlank: false,
                    readOnly: true
                },{
                    xtype: 'button',
                    text: '...',
                    action: 'nsiOwner'
                },{
                    xtype: 'hidden',
                    name: 'owner.hid'
                }]
            },{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Клиент',
                items: [{
                    xtype:'textarea',
                    name: 'gruzotpr',
                    maxLength: 128,
                    flex:1
                },{
                    xtype: 'button',
                    text: '...',
                    itemId: 'gruzotprDir',
                    action: 'nsiOtpr'
                }]
            },{
                xtype:'textfield',
                fieldLabel: 'Пункт отправления',
                name: 'punkt_otpr',
                maxLength: 96,
                anchor: '99%'
            },{
                xtype:'textfield',
                fieldLabel: 'Пункт назначения',
                name: 'punkt_nazn',
                maxLength: 96,
                anchor: '99%'
            },{
                name : 'teh_obsl',
                xtype: 'datefield',
                fieldLabel: 'След. тех. обсл.',
                altFormats:'d.m.y'
            },{
                name : 'prim',
                xtype: 'textarea',
                fieldLabel: 'Примечание',
                maxLength: 128,
                anchor: '90%'
            }]
        }];
    },
    buildBottomToolbar: function(config){
        config.buttons = this.buildButtons();
    }
});
