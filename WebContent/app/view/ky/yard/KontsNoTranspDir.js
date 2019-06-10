Ext.define('TK.view.ky.yard.KontsNoTranspDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsnotranspyarddir',
    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsnotranspdir',
                selModel: {mode: 'SINGLE'}
            }
        ];
    }
});
