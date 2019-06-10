Ext.define('TK.view.ky.avto.out.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontinavtooutform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontoutform',
            itemId:'kykontform',
            buildItems: function(config) {
                TK.view.ky.BaseKontOutForm.prototype.buildItems.apply(this, arguments);
                var nvagField = TK.Utils.findFieldBy('nkon', config.items);
                nvagField.vTypes.push('kontInAvtoUnique');
            }
        },{
            xtype:'kyplombinavtooutlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruzinavtooutlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }
});
