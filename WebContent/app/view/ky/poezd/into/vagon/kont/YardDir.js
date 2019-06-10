Ext.define('TK.view.ky.poezd.into.vagon.kont.YardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardforpoezdintodir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'
        }];
    }
});
