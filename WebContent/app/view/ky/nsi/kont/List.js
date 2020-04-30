Ext.define('TK.view.ky.nsi.kont.List', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsikontlist',

    requires: [
        'TK.view.ky.nsi.BaseList'
    ],

    itemId:'kynsikontlist',

    width: 800,
    title: 'Справочник контейнеров',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasensilist',
            buildColumns: function (config) {
                config.columns = {
                    items:[
                        {text:'Номер контейнера', dataIndex:'nkont', flex:1},
                        {text:'Год постройки', dataIndex:'yearbuild', flex:1},
                        {text:'Тип', dataIndex:'type', flex:1/*, renderer:TK.Utils.renderLongStr*/},
                        {text:'Футовость', dataIndex:'sizeFoot', flex:1},
                        {text:'Масса тары', dataIndex:'massaTar', flex:1},
                        {text:'Грузоподъемность', dataIndex:'podSila', flex:1},
                        {text:'Объем', dataIndex:'vol', flex:1}
                    ]
                };
            },
            buildStore:function (config) {
                config.store = 'ky.NsiKonts';
            }
        }];
    }
});