Ext.define('TK.view.ky.KontSearchList', {
    extend: 'Ext.window.Window',
    alias:'widget.kykontsearchlist',
    title: 'Поиск контейнера',
    autoShow: true,
    maxHeight: 500,
    width: 1050,
    autoScroll: true,
    y:0,
    modal: true,
    layout: 'anchor',
    initComponent: function() {
        this.items = [{
            xtype: 'kykontintooutlist'
        }];

        this.buttons = [{
            text: 'Закрыть',
            scope: this,
            handler: function(btn) {
                btn.up('window').close();
            }
        }];

        this.callParent(arguments);
    }
});
