Ext.define('TK.view.ky.avto.out.kont.KontsInAvtoIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsavtointoforavtooutdir',
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
