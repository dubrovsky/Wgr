Ext.define('TK.view.ky.avto.into.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontinavtointoform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontintoform',
            itemId:'kykontform',
            buildItems: function(config) {
                TK.view.ky.BaseKontIntoForm.prototype.buildItems.apply(this, arguments);
                var nvagField = TK.Utils.findFieldBy('nkon', config.items);
                nvagField.vTypes.push('kontInAvtoUnique');
            }
        },{
            xtype:'kyplombinavtointolist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruzinavtointolist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }
});
