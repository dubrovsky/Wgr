Ext.define('TK.view.edit.UploadGrafCopiesPart2Win', {
    extend: 'TK.view.edit.UploadFormWin',
    alias: 'widget.uploadGrafCopiesFormPart2Win',

    requires: [
        'TK.store.tables.UploadGraf',
        'Ext.grid.plugin.CellEditing'
    ],
    title: 'Графические копии документов',
    buildFormItems: function() {
        var items = [];
        items.splice(0, 0,
            {
                xtype: 'grid',
                itemId: 'uploadGraf',
                columnLines: true,
                // border: false,
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    pluginId: 'cellplugin'
                }],
                store: Ext.create('TK.store.tables.UploadGraf'),
                columns: [
                    {text: 'Файл', dataIndex: 'fileName', flex: 2},
                    {text: 'Контейнер', dataIndex: 'nkon', flex: 1, editor:{xtype: 'textfield', maxLength: 15}}
                ]
            },
            {xtype: 'hidden', name: "hid_cs", allowBlank: false}
        );
        return items;
    }
});