Ext.define('TK.view.ky.nsi.kont.Filter', {
    extend: 'TK.view.ky.nsi.BaseFilter',
    alias:'widget.kynsikontfilter',

    buildItems: function() {
        return [{
            xtype: 'textfield',
            name: 'nkon',
            fieldLabel: 'Контейнер',
            maxLength: 11
        }];
    }
});