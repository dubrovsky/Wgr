Ext.define('TK.view.ky.avto.out.kont.YardCancelDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardcancelforavtooutdir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
