Ext.define('TK.view.ky.poezd.out.vagon.kont.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruzinpoezdoutform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'
            }
        ];
    }
});
