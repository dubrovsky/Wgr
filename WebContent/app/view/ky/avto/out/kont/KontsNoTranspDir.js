Ext.define('TK.view.ky.avto.out.kont.KontsNoTranspDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsnoforavtooutdir',
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
