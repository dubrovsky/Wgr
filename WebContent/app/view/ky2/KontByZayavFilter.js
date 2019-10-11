Ext.define('TK.view.ky2.KontByZayavFilter', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.kontbyzayavfilter',
    trigger2Cls: 'x-form-clear-trigger',

    margin: '0 0 0 20',
    fieldLabel: 'Заявка',
    labelWidth: 35,
    queryMode: 'local',
    valueField: 'hid',
    typeAhead: false,
    editable: false,
    name: 'zayav',



    initComponent: function () {
        this.addEvents('clearFilter');
        this.callParent(arguments);
    },

    onTriggerClick: function (e) {
        if (Ext.get(e.target).hasCls('x-trigger-index-1')) {
            this.fireEvent('clearFilter', this);
            return;
        }

        this.callParent();
    }
});