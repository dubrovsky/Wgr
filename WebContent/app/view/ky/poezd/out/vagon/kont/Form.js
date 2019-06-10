Ext.define('TK.view.ky.poezd.out.vagon.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontinpoezdoutform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontoutform',
            itemId:'kykontform',
            buildItems: function(config) {
                TK.view.ky.BaseKontOutForm.prototype.buildItems.apply(this, arguments);
                var nvagField = TK.Utils.findFieldBy('nkon', config.items);
                nvagField.vTypes.push('kontInPoezdUnique');
            }
        },{
            xtype:'kyplombinpoezdoutlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruzinpoezdoutlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }


});
