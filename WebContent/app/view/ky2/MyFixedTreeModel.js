Ext.define('TK.view.ky2.MyFixedTreeModel', {
    extend: 'Ext.selection.TreeModel',

    mode: 'MULTI',

    selectRange : function(startRow, endRow, keepExisting) {
        var me = this,
            store = me.store,
            selected = me.selected.items,
            result, i, len, toSelect, toDeselect, idx, rec;

        if (me.isLocked()){
            return;
        }

        result = me.normalizeRowRange(startRow, endRow);
        startRow = result[0];
        endRow = result[1];

        depth0 = store.getAt(startRow).data.depth;
        toSelect = [];
        for (i = startRow; i <= endRow; i++){
            if (!me.isSelected(store.getAt(i)) && depth0 == store.getAt(i).data.depth) {
                toSelect.push(store.getAt(i));
            }
        }

        if (!keepExisting) {
            // prevent selectionchange from firing
            toDeselect = [];
            me.suspendChanges();

            for (i = 0, len = selected.length; i < len; ++i) {
                rec = selected[i];
                idx = store.indexOf(rec);
                if (idx < startRow || idx > endRow) {
                    toDeselect.push(rec);
                }
            }

            for (i = 0, len = toDeselect.length; i < len; ++i) {
                me.doDeselect(toDeselect[i]);
            }
            me.resumeChanges();
        }

        if (toSelect.length) {
            me.doMultiSelect(toSelect, true);
        } else {
            me.maybeFireSelectionChange(toDeselect.length > 0);
        }
    }

});
