Ext.define('TK.view.ky.yard.KontsInAvtoIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsinavtointoyarddir',
    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsinavtointodirforyard',
                selModel: {mode: 'SINGLE'}
            }
        ];
    }
});
