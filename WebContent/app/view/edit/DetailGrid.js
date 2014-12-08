Ext.define('TK.view.edit.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailgrid',

//    enableColumnResize: false,
    enableColumnHide:false,
    enableColumnMove:false,
    sortableColumns:false,
    columnLines: true,
//    frame:true,
    doc:'', coll:'',bufData:'',
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildStore(config);
        this.buildColModel(config);
        this.buildView(config);
        this.buildDockedItems(config);
        this.buildPlugins(config);
    },
    buildStore: function(config) {},
    buildColModel: function(config) {},
    buildView: function(config) {
    	config.viewConfig = {
            stripeRows: true,
            singleSelect:true
        };
    },
    buildDockedItems: function(config) {
    	config.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                text: this.btnAdd,
                iconCls:'add1',
                scope: this,
                handler: this.onAddRecord
            },
            '-',{
                text: this.btnDelete,
                iconCls:'delete1',
                scope: this,
                handler: this.onDelRecord
            },'-']
        }];
    },
    buildPlugins: function(config) {
    	config.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                listeners: {
                    edit: this.onEdit/*function(editor, e){
                        e.grid.getView().refresh();
                    }*/
                }
            })
        ];
    },
    onEdit: function(editor, e){},
    newRecord: function() {},
    onAddRecord: function(btn){
        var r = this.newRecord(),
            rowEditing = this.plugins[0],
            selectedRec = btn.up('grid').selModel.getSelection()[0],
            ind = selectedRec ? this.getStore().indexOf(selectedRec) + 1 : this.store.getCount();
        rowEditing.cancelEdit();
        this.store.insert(ind, r);
        this.buildConstValues();
        rowEditing.startEditByPosition({row: ind, column: 0});
    },
    onDelRecord: function(btn) {
        var sel = this.selModel.getLastSelected();
        if (sel) {
            this.store.remove(sel);
            if(this.store.getCount() > 0) {
                this.selModel.select(0);
            }
            this.buildConstValues();
//            this.getView().refresh();
        }
    },
    prepareData: function() {
        var data = {}, doc = this.doc, coll = this.coll;
        this.store.each(function(rec, ind, len){
            rec.fields.each(function(field, i, l){
                data[doc+'.'+coll+'['+ind+'].'+field.name] = rec.data[field.name];
            });
        }, this);
        return data;
    },
    initServiceFields: function(data) {
        var doc = this.doc, coll = this.coll;
        this.store.each(function(rec, ind, len){
            rec.fields.each(function(field, i, l){
                var f = doc+"."+coll+"["+ind+"]."+field.name;
                if(data[f])
                    rec.data[field.name] = data[f];
            });
        }, this);
    },
    initBuf:function(){},
    copyValues2MainFlds:function(){},
    buildConstValues:function() {
        this.store.each(function(rec, ind, len){
            rec.data['sort'] = ind;
        }, this);
	}
});