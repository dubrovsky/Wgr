Ext.define('TK.view.ky.kontnotransp.YardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardnodir',

    width: 500,
    title: 'Свободные места на контейнерной площадке',

    buildItems: function (config) {
        config.items = [{
            xtype: 'kybaseyarddir'/*,

            buildTopToolbar: function(config) {
                config.tbar = [
                    {text: 'Сохранить', action:'yardPlaceForKontSave', iconCls:'save'},'-'
                ];
            }*/
        }];
    }
});
