Ext.define('TK.view.ky.yard.KontsInPoezdIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsinpoezdintoyarddir',

    requires: [
        'TK.view.ky.BaseKontsInPoezdIntoDirForYard'
    ],

    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsinpoezdintodirforyard',
                selModel: {mode: 'SINGLE'}
            }
        ];
    }
});
