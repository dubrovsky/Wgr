Ext.define('TK.view.ky.nsi.vagon.uzky.List', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsivagonuzkylist',
    itemId:'kynsivagonlist',

    width: 800,
    title: 'Справочник узких вагонов',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasensilist',
            buildColumns: function (config) {
                config.columns = {
                    items:[
                        {text:'Номер вагона', dataIndex:'nvaguf', flex:2},
                        {text:'Код принадлежности', dataIndex:'kodownvag', flex:1},
                        {text:'Подъемная сила', dataIndex:'grpodvag', flex:1/*, renderer:TK.Utils.renderLongStr*/},
                        {text:'Масса тары', dataIndex:'mnetvag', flex:1},
                        {text:'Наим. собств.', dataIndex:'sobs', flex:3},
                        {text:'План. рем.', dataIndex:'dPlanrem', flex:1},
                        {text:'Тип', dataIndex:'typevag', flex:1},
                        {text:'Длина', dataIndex:'dlvag', flex:1},
                        {text:'Грузоподъемность', dataIndex:'grpodvag', flex:1}
                    ]
                };
            },
            buildStore:function (config) {
                config.store = 'ky.NsiVagsUzky';
            }
        }];
    }
});