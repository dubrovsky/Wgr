Ext.define('TK.view.smgs2.Flags', {
    extend: 'Ext.window.Window',
    alias: 'widget.smgs2flags',
    autoShow: true,
    modal: true,
    width: 200,
    height: 200,
    y: 300,
    layout: 'fit',
    itemId: 'smgsflagsForm',
    title: "Установка флага",
    initComponent: function () {
        this.items = {
            xtype: 'form',
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            labelWidth: 40,
            items: [
                {xtype: 'hidden', name:'hid', itemId:'smgs2Hid'},
                {xtype: 'hidden', name:'name', itemId:'docTypeName'},
                {
                    xtype: 'radiogroup',
                    // defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        labelWidth: 15,
                        labelSeparator: '',
                        name: 'userFlag'
                    },
                    vertical: true,
                    allowBlank: false,
                    columns: 1,
                    items: [
                        {
                            boxLabel: ' Распечатан',
                            inputValue: '3',
                            fieldLabel: '<img src="./resources/images/flag-3.png" width="16" height="16">'
                        }, {
                            boxLabel: ' Нехватка документов',
                            inputValue: '2',
                            fieldLabel: '<img src="./resources/images/flag-2.png" width="16" height="16">'
                        }, {
                            boxLabel: ' Есть заявка',
                            inputValue: '1',
                            fieldLabel: '<img src="./resources/images/flag-1.png" width="16" height="16">'
                        }, {
                            boxLabel: ' Заявка закрыта',
                            inputValue: '4',
                            fieldLabel: '<img src="./resources/images/flag-4.png" width="16" height="16">'
                        }, {
                            boxLabel: 'Очистить',
                            inputValue: '0',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;'
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
    initFlags: function(flag, hid, grid, docType){
        var form = this.down('form');
        form.down('radiogroup').setValue({'smgs.userFlag': flag});
        form.down('#smgs2Hid').setValue(hid);
        form.down('#docTypeName').setValue(docType);
        form.grid4Refresh = grid;
    }

});
