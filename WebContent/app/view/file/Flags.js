Ext.define('TK.view.file.Flags', {
    extend: 'Ext.window.Window',
    alias: 'widget.fileflags',
    autoShow: true,
    modal: true,
    width: 350,
    y: 300,
    layout: 'fit',
    itemId: 'flagsForm',
    title: "Установка флага",
    initComponent: function () {
        this.items = {
            xtype: 'form',
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            labelWidth: 40,
            items: [
                {xtype: 'hidden', name:'files.hid', itemId:'fileHid'},
                {
                    xtype: 'radiogroup',
                    // defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    // layout: 'hbox',
                    items: [
                        {
                            boxLabel: '<img src="./resources/images/flag-1.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '1'
                        }, {
                            boxLabel: '<img src="./resources/images/flag-2.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '2'
                        }, {
                            boxLabel: '<img src="./resources/images/flag-3.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '3'
                        }, {
                            boxLabel: '<img src="./resources/images/flag-4.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '4'
                        }, {
                            boxLabel: '<img src="./resources/images/flag-5.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '5'
                        }, {
                            boxLabel: '<img src="./resources/images/flag-6.png" width="16" height="16">',
                            name: 'userFlag',
                            inputValue: '6'
                        }
                    ]
                }
            ],
            buttons: [{
                text: 'Сохранить', action: 'saveFlag'},
                {
                    text: 'Закрыть',
                    handler: function (btn) {
                        btn.up('window').close();
                }
            }]
        };

        this.callParent(arguments);
    },
    initFlags: function(flag, hid, grid){
        var form = this.down('form');
        form.down('radiogroup').setValue({userFlag: flag});
        form.down('#fileHid').setValue(hid);
        form.grid4Refresh = grid;
    }

});
