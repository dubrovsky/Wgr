Ext.define('TK.view.ky.nsi.owner.List', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsiownerlist',

    requires: [
        'TK.Utils',
        'TK.view.ky.nsi.BaseList'
    ],

    itemId:'kynsiownerlist',

    width: 800,
    title: 'Справочник собственников',


    buildItems: function (config) {
        config.items = [{
            xtype: 'kybasensilist',
            itemId:'kybasensiownerlist',
            buildColumns: function (config) {
                config.columns = {
                    items:[
                        {text:'Наименование', dataIndex:'nameown', flex:2, renderer:TK.Utils.renderLongStr},
                        {text:'Адрес', dataIndex:'adress', flex:1},
                        {text:'Прмечание', dataIndex:'prim', flex:1}/*,
                        {text:'Контейнер?', dataIndex:'ownkont', flex:1},
                        {text:'Вагон?', dataIndex:'ownvag', flex:1},
                        {text:'Авто?', dataIndex:'ownauto', flex:1}*/
                    ]
                };
            },
            buildStore:function (config) {
                config.store = 'ky.NsiOwners';
            }/*,
            buildTopToolbar: function(config) {
                TK.view.ky.nsi.BaseList.prototype.buildTopToolbar.apply(this, arguments);
                config.tbar.splice(0,0,{text: 'Выбрать', iconCls:'check1', action:'getOwner'},'-');
            }*/
        }];
    }
});