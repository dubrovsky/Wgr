Ext.define('TK.view.ky.avto.out.kont.KontsInPoezdIntoDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontspoezdintoforavtooutdir',
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
