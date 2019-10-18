Ext.define('TK.controller.ky2.ClientController', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.FilterUtils'],
    views: [
        'ky2.client.ClientList',
        'ky2.client.Filter'
    ],
    stores: [
        'ky2.ClientsBase'
    ],
    models: [
        'ky2.ClientBase'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'clientlist',
        selector: 'viewport > tabpanel grid'
    }],
    init: function () {
        this.control({
            'ky2clientlist button[action="filterClient"]': {
                click: this.filterClient
            },
            'ky2clientfilter button[action="applyFilterClient"]': {
                click: this.applyFilterClient
            }
        });
    },

    filterClient: function (btn) {
        var win = Ext.widget('ky2clientfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    applyFilterClient: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getClientlist().getStore());
        }
    }
});