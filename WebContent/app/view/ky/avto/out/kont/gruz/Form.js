Ext.define('TK.view.ky.avto.out.kont.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruzinavtooutform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'
            }
        ];
    }
});
