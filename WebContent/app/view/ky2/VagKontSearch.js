Ext.define('TK.view.ky2.VagKontSearch', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.vagkontsearch',
    triggerCls: 'x-form-search-trigger', // the default
    trigger2Cls: 'x-form-clear-trigger',
    emptyText:this.emptyText,
    width: 170,
    minChars: 2,
    enableKeyEvents: true,
    timeout: null,
    cls: 'leftSearch',

    listeners: {
        change: function (field) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout((function () {
                    this.onTriggerClick();
                }.bind(this)), 1000);
        }
    },
    // override onTriggerClick
    onTriggerClick: function () {
        var tree = this.up('panel'),
            rootNode = tree.getRootNode(),
            me = this,
            firstFocused = false;
        if (this.getValue().length >= this.minChars ) {
            rootNode.cascadeBy(function(){
                if ((this.get('who') === 'vag' || this.get('who') === 'cont') && this.get('text').indexOf(me.getValue().toUpperCase()) !== -1) {
                    this.set('cls', 'yardReturnNkon');
                    var parentNode = this.parentNode;
                    if (parentNode.get('who') === 'vag') {
                        if (!parentNode.isExpanded())
                            parentNode.expand();
                        if (!parentNode.parentNode.isExpanded())
                            parentNode.parentNode.expand();
                    } else if (parentNode.get('who') === 'yard') {
                        if (!parentNode.parentNode.isExpanded())
                            parentNode.parentNode.expand();
                    } else if (parentNode.get('who') === 'avto') {
                        if (!parentNode.isExpanded())
                            parentNode.expand();
                    } else if (parentNode.get('who') === 'poezd') {
                        if (!parentNode.isExpanded())
                            parentNode.expand();
                    }
                    if (!firstFocused) {
                        tree.getView().focusNode(this);
                        firstFocused = true;
                    }
                    me.focus();
                }
                else if (this.get('cls') !== 'hideTreeNode')
                    this.set('cls', '');

            });
        }
    },
    onTrigger2Click: function () {
        var rootNode = this.up('panel').getRootNode();
        this.reset();
        rootNode.cascadeBy(function () {
            if (this.get('cls') === 'yardReturnNkon')
                this.set('cls', '');
        });
    }
});
