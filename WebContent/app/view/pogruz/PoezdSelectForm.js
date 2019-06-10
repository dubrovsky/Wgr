/**
 * Created by Odmin on 15.02.2019.
 * Form for selecting numbers of train for processing with map peregruz
 */
Ext.define('TK.view.pogruz.PoezdSelectForm', {
    extend: 'Ext.window.Window',
    xtype: 'poezdselectform',
    alias: 'widget.poezdselectform',

    requires: [
        'TK.store.PeregruzPoezdSelectStore',
        'TK.view.components.SearchFieldLocal',
        'TK.view.edit.UploadPogruzListFormWin',
        'TK.view.pogruz.SmgsSelectForm'
    ],

    title: this.title,
    height: 500,
    width: 600,
    layout: 'fit',
    // dateFilter: false,
    modal: true,
    y: 0,
    localStore: Ext.create('TK.store.PeregruzPoezdSelectStore'),

    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                layout: 'fit',
                items: [
                    {
                        xtype: 'grid',
                        columnLines: true,
                        store: this.localStore,
                        viewConfig: {
                            stripeRows: true,
                            singleSelect: true,
                            enableTextSelection: true
                        },

                        columns: [
                            {
                                text: this.train,
                                dataIndex: 'npoezd',
                                sortable: true,
                                flex: 3
                            },
                            {
                                text: this.count,
                                dataIndex: 'count',
                                sortable: false,
                                flex: 3
                            },
                            {
                                xtype: 'checkcolumn',
                                flex: 1,
                                dataIndex: 'isSelected'
                            }
                        ],
                        listeners: {
                            // grid double click processing
                            itemdblclick: function (grid, record) {
                                var win = Ext.create('TK.view.pogruz.SmgsSelectForm');
                                win.title = win.title + ' ' + record.data['npoezd'];
                                win.localStore.proxy.extraParams['search.date1'] = grid.store.proxy.extraParams['search.date1'];
                                win.localStore.proxy.extraParams['search.date2'] = grid.store.proxy.extraParams['search.date2'];
                                win.localStore.proxy.extraParams['search.npoezd'] = record.data['npoezd'];
                                win.localStore.proxy.extraParams['search.routeId'] = grid.store.proxy.extraParams['search.routeId'];
                                win.localStore.proxy.extraParams['search.type'] = grid.store.proxy.extraParams['search.type'];


                                console.log(grid.store.proxy.extraParams['search.routeId']);
                                console.log(grid.store.proxy.extraParams['search.type']);
                                win.localStore.load();
                                win.show();
                            }
                        }
                    }
                ]
            },
            this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'poezdSeltopTBar',
                    items: [
                        {
                            xtype: 'searchfieldlocal',
                            store: this.localStore,
                            paramName: 'npoezd',
                            itemId: 'searchDate'
                        },
                        '-', '-',
                        {
                            xtype: 'datefield',
                            fieldLabel: this.lableDate,
                            name: 'search.date1',
                            itemId: 'date1',
                            value: Ext.Date.subtract(new Date(), Ext.Date.MONTH, 1),
                            flex: 1
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: this.lableDate1,
                            name: 'search.date2',
                            itemId: 'date2',
                            flex: 1
                        },
                        '-', '-',
                        {
                            xtype: 'button',
                            itemId: 'buttonTrSrch',
                            text: this.btnFind,
                            handler: this.onSearch
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '-',
                        {
                            xtype: 'button',
                            text: this.btnOk,
                            border: 1,
                            handler: this.onOk

                        },
                        '-',
                        {
                            xtype: 'button',
                            text: this.btnCancel,
                            border: 1,
                            handler: this.onCancel
                        }
                    ]
                }
            ]
        ],
            this.callParent();
    },
    listeners: {
        'close': function closeWin(win) {
            var me = this;
            // enable filtering from server
            me.getComponent('poezdSeltopTBar').items.get('searchDate').onTrigger1Click();
            me.localStore.proxy.extraParams['search.date1'] = '';
            me.localStore.proxy.extraParams['search.date2'] = '';
        }
    },

    onCancel: function (btn) {
        var form = this.up().up();
        // enable filtering from server
        form.getComponent('poezdSeltopTBar').items.get('searchDate').onTrigger1Click();
        form.localStore.proxy.extraParams['search.date1'] = '';
        form.localStore.proxy.extraParams['search.date2'] = '';
        form.close();
    },
    // button search pressed
    onSearch: function (btn) {

        var me = this,
            it = me.up('panel').getComponent('poezdSeltopTBar').items;
        form = me.up().up();
        // if no date interval filtering applied
        // if (!form.dateFilter) {
        // reading  date from and date to
        var dat1 = it.get('date1').getValue();
        if (!dat1) dat1 = '';

        var dat2 = it.get('date2').getValue();
        if (!dat2) dat2 = '';

// enable filtering from server
        it.get('searchDate').onTrigger1Click();
        // writing date interval params
        me.up('panel').localStore.proxy.extraParams['search.date1'] = dat1;
        me.up('panel').localStore.proxy.extraParams['search.date2'] = dat2;
        me.up('panel').localStore.proxy.extraParams['search.routeId'] = this.up().up().routeId;
        me.up('panel').localStore.proxy.extraParams['search.type'] = this.up().up().type;

// reolading store
        me.up('panel').localStore.reload();
    },
    // precess choosen trains
    onOk: function (btn) {
        var win = Ext.widget('uploadPogruzListFormWin'),
            form = win.down('form').getForm(),
            formD = this.up().up(),

            me = this,
            it = me.up('panel').getComponent('poezdSeltopTBar').items,
            dat1 = Ext.Date.format(it.get('date1').getValue(), 'd:m:Y'),
            dat2 = Ext.Date.format(it.get('date2').getValue(), 'd:m:Y');


        var sel = [];
        // creating alist od choosen trains
        this.up('panel').localStore.each(function (record, id) {
            if (record.get('isSelected'))
                sel.push(record.get('npoezd'));
        });
        // list empty?
        if (sel.length > 0) {
            form.findField('query').setValue(sel);

            form.findField('query1').setValue(dat1 + ',' + dat2);
            form.findField('name').setValue('trainlist');

            win.show();
        }
    }


});