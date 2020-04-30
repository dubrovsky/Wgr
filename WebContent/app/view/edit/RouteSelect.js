/**
 * Created by Odmin on 13.11.2019.
 */
Ext.define('TK.view.edit.RouteSelect', {
    extend: 'Ext.window.Window',
    xtype: 'routeselect',
    alias: 'widget.routeselect',

    requires: [
        'TK.view.components.SearchFieldLocalTree',
        'TK.view.ved.MenuPart'
    ],
    title: this.title,

    itemId:'routeSelWin',
    width: 350,
    height: 500,
    layout: {
        type: 'fit',
        align: 'stretch',
        padding: 5
    },
    modal:true,
    selection:[],
    initComponent: function () {
        this.items = [
            {
                layout: 'anchor',
                itemId:'routeTree',
                xtype: 'menupart',
                selModel: {
                    selectedRecs:new Ext.util.HashMap(),
                    mode: 'SINGLE',
                    renderer: function(value, metaData, record) {

                        var baseCSSPrefix = Ext.baseCSSPrefix;

                        // восстанавливает выделение записей в компоненте
                        if(record.store.ownerTree.getSelectionModel().selectedRecs.get(record.data['id']))
                            record.store.ownerTree.getSelectionModel().select(record,true,true);

                        metaData.tdCls = baseCSSPrefix + 'grid-cell-special ' + baseCSSPrefix + 'grid-cell-row-checker';
                        return record.get('parentId') === 'root' ? '' : '<div class="' + baseCSSPrefix + 'grid-row-checker"></div>';
                    },
                    listeners: {
                        // сохраняем выбранный объект
                        selectionchange: function(me, selected, eOpts)
                        {
                            for(var i=0;i<selected.length;i++)
                            {
                                 if(!me.selectedRecs.get(selected[i].data['id']))
                                     me.selectedRecs.add(selected[i].data['id'],selected[i]);
                            }
                        },
                        // удаляем объект ск оторого снято выделение
                        deselect:function ( me, record, index, eOpts ) {
                            me.selectedRecs.remove(record);
                        }
                    }
                }
            }
        ];
        this.dockedItems = [
            {
                xtype: 'toolbar',
                itemId:'bottomTB',
                dock: 'bottom',
                items: [
                    '-',
                    {xtype: 'button', text: this.btnChoose, border: 1,itemId:'okButton'},
                    '-',
                    {xtype: 'button', text: this.btnCancel, border: 1,itemId:'cancelButton', handler: this.onCancel}
                ]
            },
            {
                xtype: 'toolbar',
                itemId:'topTB',
                dock: 'top',
                layout:'hbox',
                items: [
                    {
                        xtype: 'searchfieldlocaltree',
                        store: Ext.getStore('MenuPart'),
                        paramName: 'text',
                        itemId: 'searchRoute',
                        flex: 1
                    },
                    '-',
                    {
                        xtype: 'radiogroup',
                        columns: 2,
                        itemId: 'copyMove',
                        flex: 2,
                        items: [
                            {xtype: 'radiofield', itemId: 'copy', boxLabel: this.labelCopy, name: 'copyMoveOpts', checked: true, inputValue: false},
                            {xtype: 'radiofield', itemId: 'move', boxLabel: this.labelMove, name: 'copyMoveOpts', inputValue: true}
                        ]
                    }
                ]
            }
        ];
        this.callParent();
        //прячем кнопку из оригинального компонента menupart
        var btn2Hide=this.items.items[0].dockedItems.items[1];
        if(btn2Hide)
            btn2Hide.hide();
    },
    /**
     * нажатие на кнопку отмена
     * @param btn
     */
    onCancel: function (btn) {
        var form = btn.up().up();
        form.close();
    }
});