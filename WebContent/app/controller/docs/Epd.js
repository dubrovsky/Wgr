Ext.define('TK.controller.docs.Epd', {
    extend: 'Ext.app.Controller',

    views: ['epd.List', 'epd.Form'],
    stores: ['Epdes'],
    models: ['Epd'],

    initEvents: function(form){
        form.getComponent('smgs.g1r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g1r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
            /*nsiGrid.down('button[action=add]').on('click', this.getController('Nsi').onAddRecord);
            gridAction.items[0].handler = this.getController('Nsi').onSaveRecord;
            gridAction.items[1].handler = this.getController('Nsi').onDelRecord;
            nsiGrid.down('gridcolumn[dataIndex=g16r]').editor.onTriggerClick = Ext.bind(function(){
                var nsiGrid1 = this.getController('Nsi').nsiCountries().getComponent(0);
                nsiGrid1.on('itemdblclick', this.getController('Nsi').selectCountriesNsiOtpr, nsiGrid);
            }, this);*/
            nsiGrid.on('itemdblclick', this.selectG1, form);
        }, this);
        form.getComponent('smgs.g4r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g4r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
            /*nsiGrid.down('button[action=add]').on('click', this.getController('Nsi').onAddRecord);
            gridAction.items[0].handler = this.getController('Nsi').onSaveRecord;
            gridAction.items[1].handler = this.getController('Nsi').onDelRecord;
            nsiGrid.down('gridcolumn[dataIndex=g16r]').editor.onTriggerClick = Ext.bind(function(){
                var nsiGrid1 = this.getController('Nsi').nsiCountries().getComponent(0);
                nsiGrid1.on('itemdblclick', this.getController('Nsi').selectCountriesNsiOtpr, nsiGrid);
            }, this);*/
            nsiGrid.on('itemdblclick', this.selectG4, form);
        }, this);

        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
    },
    selectG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g1r').setValue(data['g1r']);
        this.getComponent('smgs.g19r').setValue(data['g19r']);
        view.up('window').close();
    },
    selectG4: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g4r').setValue(data['g1r']);
        this.getComponent('smgs.g49r').setValue(data['g19r']);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162r').setValue(data.staName);
        this.getComponent('smgs.g692').setValue(data.staNo);
        view.up('window').close();
    }
});