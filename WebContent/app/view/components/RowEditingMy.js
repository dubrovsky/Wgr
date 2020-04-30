/**
 * Created by Odmin on 01.08.2019.
 */
Ext.define('TK.view.components.RowEditingMy', {
    extend: 'Ext.grid.plugin.RowEditing',
    completeEdit: function() {
        var me = this;
        var form = me.editor;
        form.updateRecord(me.context.record);
        me.editor.hide();
        me.fireEvent('edit', me, me.context);
        return true;
    }
});