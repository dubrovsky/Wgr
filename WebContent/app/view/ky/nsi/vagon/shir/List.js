Ext.define('TK.view.ky.nsi.vagon.shir.List', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsivagonshirlist',
    itemId:'kynsivagonlist',

    width: 800,
    title: 'Справочник широких вагонов',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasensilist',
            buildColumns: function (config) {
                config.columns = {
                    items:[
                        {text:'Номер вагона', dataIndex:'nvag', flex:1},
                        {text:'Код принадлежности', dataIndex:'owntypen', flex:1},
                        {text:'Подъемная сила', dataIndex:'gp', flex:1/*, renderer:TK.Utils.renderLongStr*/},
                        {text:'Масса тары', dataIndex:'tara', flex:1},
                        {text:'ОКПО', dataIndex:'okpo_own', flex:1},
                        {text:'Наим. собств.', dataIndex:'nown', flex:2},
                        {text:'План. рем.', dataIndex:'datePlanrem', flex:1},
                        {text:'Тип', dataIndex:'typeNo', flex:1},
                        {text:'Длина', dataIndex:'dlvag', flex:1},
                        {text:'Модель', dataIndex:'modelvag', flex:1}
                    ]
                };
            },
            buildStore:function (config) {
                config.store = 'ky.NsiVagsShir';
            }
        }];
    }
});