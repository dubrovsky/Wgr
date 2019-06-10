Ext.define('TK.view.ky.nsi.avto.List', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsiavtolist',
    itemId:'kynsiavtolist',

    width: 800,
    title: 'Справочник авто',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasensilist',
            buildColumns: function (config) {
                config.columns = {
                    items:[
                        {text:'Номер авто', dataIndex:'noAvto', flex:1},
                        {text:'Тип', dataIndex:'typeAvto', flex:1},
                        {text:'Номер прицепа', dataIndex:'noTrail', flex:1},
                        {text:'Собственник', dataIndex:'ownCargo', flex:2, renderer:TK.Utils.renderLongStr}
                    ]
                };
            },
            buildStore:function (config) {
                config.store = 'ky.NsiAvtos';
            }
        }];
    }
});