/**
 * Created by Odmin on 14.11.2019.
 */
Ext.define('TK.view.components.SearchFieldLocalTree', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchfieldlocaltree',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch: false,
    paramName: 'query',

    initComponent: function () {
        var me = this;
        me.enableKeyEvents = true;
        me.callParent(arguments);
        me.on('keyup', function (f, e) {
            me.onTrigger2Click();
        });

        // We're going to use filtering
        me.store.remoteFilter = true;

        // Set up the proxy to encode the filter in the simplest way as a name/value pair

        // If the Store has not been *configured* with a filterParam property, then use our filter parameter name
        if (!me.store.proxy.hasOwnProperty('filterParam')) {
            me.store.proxy.filterParam = me.paramName;
        }
        me.store.proxy.encodeFilters = function (filters) {
            return filters[0].value;
        }
    },

    afterRender: function () {
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click: function () {
        var me = this;

        if (me.hasSearch) {
            me.setValue('');
            me.store.clearFilter();
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.store.remoteFilter = true;
            me.updateLayout();
        }
    },

    onTrigger2Click: function () {

        var me = this,
            value = me.getValue();
        me.store.remoteFilter = false;

        me.store.filter({
            id: me.paramName,
            property: me.paramName,
            value: value,
            anyMatch: true,
            filterFn:this.filterFn
        });
        me.hasSearch = true;
    },
    filterFn : function(node) {
        var children = node.childNodes,
            v = new RegExp(this.value, 'i'),
            len = children && children.length,
            visible = v.test(node.get('text')),
            i;

        // If the current node does NOT match the search condition
        // specified by the user...
        if (!visible) {

            // Check to see if any of the child nodes of this node
            // match the search condition.  If they do then we will
            // mark the current node as visible as well.
            for (i = 0; i < len; i++) {
                if (children[i].isLeaf()) {
                    {
                        visible = children[i].get('visible');
                    }
                } else {
                    visible = this.filterFn(children[i]);
                }
                if (visible) {
                    if(!node.isExpanded())
                        node.expand();
                    break;
                }
            }

        } else { // Current node matches the search condition...

            // Force all of its child nodes to be visible as well so
            // that the user is able to select an example to display.
            for (i = 0; i < len; i++) {
                children[i].set('visible', true);
            }
            if(!node.isExpanded())
                node.expand();
        }
        return visible;
    }

});