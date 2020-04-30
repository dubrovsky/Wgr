Ext.define('TK.view.ky.avto.into.kont.YardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardforavtointodir',

    requires: [
        'TK.view.ky.BaseYardDir'
    ],


    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
