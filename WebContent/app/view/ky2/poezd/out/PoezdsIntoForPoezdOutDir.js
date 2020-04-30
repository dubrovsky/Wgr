Ext.define('TK.view.ky2.poezd.out.PoezdsIntoForPoezdOutDir', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.ky2poezdsintoforpoezdoutdir',

    requires: [
        'TK.view.ky2.poezd.BasePoezdIntoForPoezdOut'
    ],

    itemId: 'ky2poezdsintoforpoezdoutdir',

    width: 400,
    maxHeight: 700,
    autoScroll: true,
    title: this.title,

    buildItems: function (config) {
        config.items = [{
            xtype: 'ky2basepoezdintoforpoezdout',
            buildStore: function (config) {
                config.store = 'ky2.PoezdIntoForPoezdOutDir';
            },
            buildTopToolbar: function (config) {
                TK.view.ky2.poezd.BasePoezdIntoForPoezdOut.prototype.buildTopToolbar.apply(this, arguments);
                config.tbar.push(
                    {
                        xtype: 'combo',
                        fieldLabel: this.lblTrainNum,
                        labelWidth: 80,
                        width: 180,
                        store: 'ky2.PoezdsIntoForPoezdOutDir',
                        displayField: 'npprm',
                        valueField: 'hid',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'npprm',
                        listConfig: {
                            loadingText: this.loadingTxt,
                            emptyText: this.emptyText
                        }
                    }, '-'
                );

            }
        }];
    }
});