Ext.define('TK.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.container.Container',
        'Ext.data.ArrayStore',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'Ext.tab.Panel',
        'Ext.util.Format',
        'TK.view.MenuTree'
    ],
    layout: 'border',
    id: 'TK.Viewport',
    alias: 'widget.tkviewport',
    defaults:{border: false},
    initComponent:function () {
        var config = {};
        this.buildConfig();
        this.buildItems(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildItems:function(config){
        config.items = [{
            region: "north",
            xtype: "container",
            height: 50,
            layout: 'hbox',
            defaults: {height: 48},
            cls: 'header-main',
            items: [{
                xtype: "container",
                //cls:'header-items-main header-logo1',
                flex: 3
            },  {
                xtype: "container",
                flex: 2,
                cls:'header-items-main',
                align: 'bottom'
            }, {
                xtype: "container",
                width: 300,
                itemId:'localeCombo',
                cls:'header-items-main',
                layout: {
                    type: 'hbox',
                    pack:'end'
                },
                items:[]
            }]
        }, {
            region: 'center',
            xtype: 'tabpanel',
            defaults: {autoScroll: true}
        }, {
            region: 'west',
            xtype: 'menutree',
            width: 200,
            autoScroll: true
        }];
    },
    buildConfig:function () {
        this.buildEventsListeners();
    },
    buildEventsListeners:function () {
        this.on({
            beforerender: this.onBeforerenderd/*,
             afterrender: function(){
             Ext.get("loading").remove();
             Ext.get("langProp").remove();
             }*/
        });
    },
    onBeforerenderd:function (viewport) {
        var params = Ext.urlDecode(window.location.search.substring(1)),
            record, url,
            doRun = function () {
                var comboCt = viewport.down('#localeCombo'),
                    combo;

                comboCt.items.add(Ext.create('Ext.Component',{html:viewport.headerLangLbl}));
                combo = comboCt.items.add(Ext.create('Ext.form.field.ComboBox', {
                    itemId: 'langCombo',
                    store:Ext.create('Ext.data.ArrayStore', {
                        fields:['code', 'language'],
                        data:[
                            ['ru', 'Русский'],
                            ['en', 'English'],
                            ['zh_CN', '中国的'],
                            ['de', 'Deutsch']
                        ]
                    }),
                    displayField: 'language',
                    valueField: 'code',
                    queryMode:'local',
//                    cls:'lang-combo',
                    width:90,
                    listeners:{
                        select:{
                            fn:function (cb, records) {
                                var record = records[0];
                                window.location.search = Ext.urlEncode({"lang":record.get("code")});
                            },
                            scope:this
                        }
                    },
                    listConfig:{
                        getInnerTpl:function () {
                            return '<div><img src="resources/images/flag_{code}.jpg" align="left">&nbsp;{language}</div>';
                        }
                    }
                }));
                record = combo.getStore().findRecord('code', params.lang, null, null, null, true);
                combo.setValue(record.data.code);

                var header = viewport.getComponent(0);
                //header.getComponent(0).el.update('<span>' + viewport.headerPortal + '</span>');
                viewport.doComponentLayout();
            };
        if (!params.lang) {
            params.lang = Ext.get("langProp").getHTML() || 'ru';
        }
        url = Ext.util.Format.format("ext/locale/ext-lang-{0}.js", params.lang);
        Ext.Loader.injectScriptElement(
            url,
            doRun,
            function () {
                Ext.Msg.alert('Failure', 'Failed to load locale file.');
                doRun();
            },
            this
        );
    }
});

/*
Ext.define('TK.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['TK.view.MenuTree'],
    layout: 'border',
    id: 'TK.Viewport',
    alias: 'widget.tkviewport',
    defaults:{border: false},
    items: [{
        region: "north",
        xtype: "container",
        layout: "hbox",
        height: 44,
        items: [{
            xtype: "container",
            id:'header-content'
        },  {
            xtype: "container",
            flex: 2,
            items:[
                {xtype:'component', cls:'browser-header', html:'&nbsp;'},
                {xtype:'component', cls:'user-header'}
            ]
        }, {
            xtype: "container",
            flex: 1,
            itemId:'localeCombo',
            layout: {
                type: 'hbox',
                pack:'end'
            },
            items:[]
        }]
    }, {
        region: 'center',
        xtype: 'tabpanel',
        defaults: {autoScroll: true}
    }, {
        region: 'west',
        xtype: 'menutree',
        width: 200,
        autoScroll: true
    }],
    initComponent:function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function (config) {
        this.buildEventsListeners(config);
    },
    buildEventsListeners:function () {
        this.on({
            beforerender: this.onBeforerenderd*/
/*,
            afterrender: function(){
                Ext.get("loading").remove();
                Ext.get("langProp").remove();
            }*//*

        });
    },
    onBeforerenderd:function (viewport) {
        var params = Ext.urlDecode(window.location.search.substring(1)),
            record, url,
            doRun = function () {
                var comboCt = viewport.down('#localeCombo'),
                    combo;

                comboCt.items.add(Ext.create('Ext.Component',{html:viewport.headerLangLbl,cls:'locale-header'}));
                combo = comboCt.items.add(Ext.create('Ext.form.field.ComboBox', {
                    store:Ext.create('Ext.data.ArrayStore', {
                        fields:['code', 'language'],
                        data:[
                            ['ru', 'Русский'],
                            ['en', 'English'],
                            ['zh_CN', '中国的']
                        ]
                    }),
                    displayField:'language',
                    queryMode:'local',
                    cls:'lang-combo',
                    width:90,
                    listeners:{
                        select:{
                            fn:function (cb, records) {
                                var record = records[0];
                                window.location.search = Ext.urlEncode({"lang":record.get("code")});
                            },
                            scope:this
                        }
                    },
                    listConfig:{
                        getInnerTpl:function () {
                            return '<div><img src="resources/images/flag_{code}.jpg" align="left">&nbsp;{language}</div>';
                        }
                    }
                }));
                record = combo.getStore().findRecord('code', params.lang, null, null, null, true);
                combo.setValue(record.data.language);

                var header = viewport.getComponent(0);
                header.getComponent(0).el.update('<strong>'+viewport.headerPortal+'</strong>');
                viewport.doComponentLayout();

            };
        if (!params.lang) {
            params.lang = Ext.get("langProp").getHTML() || 'ru';
        }
        url = Ext.util.Format.format("ext/locale/ext-lang-{0}.js", params.lang);
        Ext.Loader.injectScriptElement(
            url,
            doRun,
            function () {
                Ext.Msg.alert('Failure', 'Failed to load locale file.');
                doRun();
            },
            this
        );
    }
});*/
