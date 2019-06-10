Ext.define('TK.view.ky.avto.into.kont.YardCancelDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardcancelforavtointodir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
