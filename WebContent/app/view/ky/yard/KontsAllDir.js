Ext.define('TK.view.ky.yard.KontsAllDir', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kykontsallyarddir',
    width: 500,
    title: 'Разместить/Убрать контейнер',

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'kybasekontsalldirforyard',
                selModel: {mode: 'SINGLE'},
                buildColumns: function (config) {
                    TK.view.ky.BaseKontsAllDir.prototype.buildColumns.apply(this, arguments);
                    config.columns.items.push({
                        text:'Авто', dataIndex:'avtoInto.no_avto', flex:1
                    });
                }
            }
        ];
    }
});
