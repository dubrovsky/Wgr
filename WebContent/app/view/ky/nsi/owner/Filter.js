Ext.define('TK.view.ky.nsi.owner.Filter', {
    extend: 'TK.view.ky.nsi.BaseFilter',
    alias:'widget.kynsiownerfilter',

    buildItems: function() {
        return [{
            xtype: 'textfield',
            name: 'nameown',
            fieldLabel: 'Наименование',
            maxLength: 1000
        }];
    }
});