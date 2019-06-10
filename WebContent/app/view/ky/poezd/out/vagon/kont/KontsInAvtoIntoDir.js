Ext.define('TK.view.ky.poezd.out.vagon.kont.KontsInAvtoIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsavtointoforoutdir',
    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsinavtointodirforout',
                selModel: {mode: 'SINGLE'}
            }
        ];
    }
});
