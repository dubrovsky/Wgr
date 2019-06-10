Ext.define('TK.view.ky.yard.YardDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kyyardinyarddir',

    width: 600,
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