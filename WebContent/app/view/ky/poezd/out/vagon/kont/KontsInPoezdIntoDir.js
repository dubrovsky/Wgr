Ext.define('TK.view.ky.poezd.out.vagon.kont.KontsInPoezdIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontspoezdintoforoutdir',
    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsinpoezdintodirforout',
                selModel: {mode: 'SINGLE'}
            }
        ];
    }
});
