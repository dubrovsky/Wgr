Ext.define('TK.view.ky.poezd.into.vagon.kont.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruzinpoezdintoform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'
            }
        ];
    }
});
