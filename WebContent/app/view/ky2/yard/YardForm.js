Ext.define('TK.view.ky2.yard.YardForm', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias:'widget.ky2yardform',

    buildItems: function(config) {
        var owner = this;
        config.items = [{
            xtype: 'ky2abstractform',
            buildItems: function(config) {
                config.items = [
                    {
                        xtype: 'numberfield',
                        name : 'x',
                        fieldLabel: /*owner.labelX*/'Позиция',
                        minValue: 0,
                        allowDecimals: false,
                        afterLabelTextTpl: this.required,
                        allowBlank: false
                    },
                    {
                        xtype: 'numberfield',
                        name : 'y',
                        fieldLabel: /*owner.labelY*/'Ряд',
                        minValue: 0,
                        allowDecimals: false,
                        afterLabelTextTpl: this.required,
                        allowBlank: false
                    },
                    {
                        xtype: 'numberfield',
                        name : 'z',
                        fieldLabel: /*owner.labelZ*/'Ярус',
                        minValue: 0,
                        allowDecimals: false,
                        afterLabelTextTpl: this.required,
                        allowBlank: false
                    }
                    ,
                    {
                        xtype: 'fieldcontainer',
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {top: 0, right: 10, bottom: 0, left: 0}
                        },
                        fieldLabel: owner.labelSector,
                        afterLabelTextTpl: this.required,
                        items: [
                            {
                                xtype: 'combo',
                                itemId:'kontsectors',
                                store: 'ky2.YardSectors',
                                displayField: 'name',
                                valueField:'hid',
                                typeAhead: false,
                                forceSelection: true,
                                hideLabel: true,
                                // hideTrigger:true,
                                // minChars:2,
                                allowBlank: false,
                                name: 'sector.hid',

                                listConfig: {
                                    loadingText: owner.msgSearch,
                                    emptyText: owner.msgNothingFound
                                }
                            }/*,
                            {
                                xtype: 'button',
                                action:'nsiYardSector',
                                text: '...'
                            }*/
                        ]
                    }

                    ,
                    {
                        xtype: 'textarea',
                        name : 'notes',
                        fieldLabel: owner.labelNotes
                    }
                ]
            },
            buildBottomToolbar: function(config){
                config.buttons = this.buildButtons();
            }
        }];
    }
});
