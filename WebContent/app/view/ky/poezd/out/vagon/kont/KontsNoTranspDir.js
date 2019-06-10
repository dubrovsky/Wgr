Ext.define('TK.view.ky.poezd.out.vagon.kont.KontsNoTranspDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsnoforoutdir',
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
