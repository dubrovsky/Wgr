Ext.define('TK.view.ky.yard.kont.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruzinyardform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'
            }
        ];
    }
});
