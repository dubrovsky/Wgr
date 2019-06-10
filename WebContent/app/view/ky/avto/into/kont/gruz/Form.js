Ext.define('TK.view.ky.avto.into.kont.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruzinavtointoform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'
            }
        ];
    }
});
