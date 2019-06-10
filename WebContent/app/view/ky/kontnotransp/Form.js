Ext.define('TK.view.ky.kontnotransp.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontnotranspform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontform',
            itemId:'kykontform'
        },{
            xtype:'kyplombnotransplist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruznotransplist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }


});
