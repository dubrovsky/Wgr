Ext.define('TK.view.ky.nsi.vagon.Filter', {
    extend: 'TK.view.ky.nsi.BaseFilter',
    alias:'widget.kynsivagonfilter',

    buildItems: function() {
       return [{
           xtype: 'textfield',
           name: 'nvag',
           fieldLabel: 'Вагон',
           maxLength: 14
       }];
    }
});
