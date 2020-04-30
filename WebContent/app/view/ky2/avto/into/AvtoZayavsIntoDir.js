Ext.define('TK.view.ky2.avto.into.AvtoZayavsIntoDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2avtozayavsintodir',

    requires: [
        'TK.view.ky2.BaseAvtoZayavsDir'
    ],

    itemId:'ky2avtozayavsintodir',

    width: 550,
    title: this.title,

    buildItems: function (config) {
        config.items = [ {
            xtype: 'ky2baseavtozayavsdir',
            selModel: {mode: 'SINGLE'}
        } ];
    }
});