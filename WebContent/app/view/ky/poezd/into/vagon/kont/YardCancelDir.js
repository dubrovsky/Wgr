Ext.define('TK.view.ky.poezd.into.vagon.kont.YardCancelDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardcancelforpoezdintodir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
