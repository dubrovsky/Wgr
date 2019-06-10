Ext.define('TK.view.ky.poezd.into.vagon.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontinpoezdintoform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontintoform',
            itemId:'kykontform',
            buildItems: function(config) {
                TK.view.ky.BaseKontIntoForm.prototype.buildItems.apply(this, arguments);
                var nvagField = TK.Utils.findFieldBy('nkon', config.items);
                nvagField.vTypes.push('kontInPoezdUnique');
            }
        },{
            xtype:'kyplombinpoezdintolist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruzinpoezdintolist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }
});
