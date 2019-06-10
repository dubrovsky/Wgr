Ext.define('TK.view.ky.nsi.avto.Filter', {
    extend: 'TK.view.ky.nsi.BaseFilter',
    alias:'widget.kynsiavtofilter',

    buildItems: function() {
        return [{
            xtype: 'textfield',
            name: 'noAvto',
            fieldLabel: 'Авто',
            maxLength: 20
        }];
    }
});