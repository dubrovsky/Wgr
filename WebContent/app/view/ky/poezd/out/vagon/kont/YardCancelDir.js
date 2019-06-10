Ext.define('TK.view.ky.poezd.out.vagon.kont.YardCancelDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardcancelforpoezdoutdir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
