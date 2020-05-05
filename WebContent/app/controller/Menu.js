Ext.define('TK.controller.Menu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.tab.Panel',
        'TK.Utils',
        'TK.VTypes',
        'TK.view.ky.avto.into.List',
        'TK.view.ky.avto.out.List',
        'TK.view.ky.poezd.into.List',
        'TK.view.ky.poezd.out.List',
        'TK.view.ky.reports.Report1',
        'TK.view.ky.reports.Report2',
        'TK.view.ky.reports.Report3',
        'TK.view.ky.reports.Report4',
        'TK.view.ky.reports.Report5',
        'TK.view.ky.reports.Report6',
        'TK.view.ky2.avto.BaseAvtoZayavList',
        'TK.view.ky2.avto.into.AvtoList',
        'TK.view.ky2.avto.out.AvtoList',
        'TK.view.ky2.client.ClientList',
        'TK.view.ky2.poezd.into.PoezdList',
        'TK.view.ky2.poezd.into.PoezdZayavList',
        'TK.view.ky2.poezd.out.PoezdList',
        'TK.view.ky2.poezd.out.PoezdZayavList',
        'TK.view.ky2.poezd.zayav.PoezdZayavList',
        'TK.view.ky2.yard.YardList',
        'TK.view.logs.List',
        'TK.view.nsi.ListDir',
        'TK.view.printtmpl.List',
        'TK.view.project.List',
        'TK.view.stamp.StampList',
        'TK.view.stat.List',
        'TK.view.user.List',
        'TK.view.user.ListGroups',
        'TK.view.ved.List'
    ],

    views: ['MenuTree'],
    stores: ['MenuItems'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'viewport',
            selector: 'viewport'
        }

    ],

    init: function () {

//        this.control({
//            'viewport > menutree':{
//                load:this.onRender,
//                itemclick:this.onItemclick,
//                itemdblclick:this.onItemdblclick
//            }
//        });
    },
    onRender: function (store) {
        var viewport = this.getViewport(),
            usrHeader,
            me = this;


        Ext.Ajax.request({
            url: 'User_userProvfile.do',
            scope: this.getMenutree(),
            method: 'POST',
            success: function (response) {

                var root = this.getRootNode(),
                    data = Ext.decode(response.responseText);
                tkUser = Ext.widget('userprofile', {
                    un: data['un'],
                    group: data['group'],
                    privs: data['priv'],
                    docs: data['docs'],
                    lang: data['lang']
                });
                menutree = me.getMenutree();
                gridConfig = data['gridConfig'];
                if (tkUser.hasPriv('CIM_USR_ADMIN')) {
                    root.appendChild({text: 'Users', iconCls: 'users', leaf: true, id: 'user'});
                    root.appendChild({text: 'Groups', iconCls: 'users', leaf: true, id: 'userGroups'});
                }
                if (tkUser.hasPriv('CIM_PROJECT_ADMIN')) {
                    root.appendChild({text: 'Projects', iconCls: 'route2', leaf: true, id: 'project'});
                }
                if (tkUser.hasPriv('CIM_LOGS')) {
                    root.appendChild({text: 'Logs', iconCls: 'logs', leaf: true, id: 'log'});
                }
                if (tkUser.hasPriv('CIM_STAT')) {
                    root.appendChild({text: 'Statistics', iconCls: 'report', leaf: true, id: 'stat'});
                }
                // print template
                if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN') || tkUser.hasPriv('CIM_PRINT_TEMPLATES_USER')) {
                    root.appendChild({
                        text: this.btnPrnTmpl ? this.btnPrnTmpl : 'Print templates', iconCls: 'print1', id: 'print',
                        children: [
                            {text: this.smgs ? this.smgs : 'SMGS', leaf: true, id: 'smgsPrnTmpl_1', iconCls: 'print'},
                            {
                                text: this.smgs2 ? this.smgs2 : 'SMGS2',
                                leaf: true,
                                id: 'smgsPrnTmpl_7',
                                iconCls: 'print'
                            },
                            {
                                text: this.doplist ? this.doplist : 'doplist',
                                leaf: true,
                                id: 'smgsPrnTmpl_11',
                                iconCls: 'print'
                            },
                            /* {text:"ГУ-29к", leaf:true, id:'gu29kPrnTmpl_10', iconCls:'print'},
                             {text:"ГУ-27в", leaf:true, id:'gu27vPrnTmpl_25', iconCls:'print'},*/
                            {
                                text: this.cimsmgs ? this.cimsmgs : 'CIM/SMGS',
                                leaf: true,
                                id: 'cimsmgsPrnTmpl_4',
                                iconCls: 'print'
                            },
                            {text: this.cim ? this.cim : 'CIM', leaf: true, id: 'cimPrnTmpl_21', iconCls: 'print'},
                            {text: this.cmr ? this.cmr : 'CMR', leaf: true, id: 'cmrPrnTmpl_23', iconCls: 'print'},
                            {text: this.stamps ? this.stamps : 'stamps', leaf: true, id: 'stamps', iconCls: 'print'}
                            // {text: this.invoice ? this.invoice : 'invoice', leaf: true, id: 'invoicePrnTmpl_2', iconCls: 'print'}
                            /*,
                            {text:"Словацкая накладная", leaf:true, id:'cmrPrnTmpl_6', iconCls:'print'}*/
                        ]
                    });
                }
                /* if (tkUser.hasPriv('CIM_KONT_YARD')) {
                     root.appendChild({text:menutree.btnKontYards, iconCls:'cont', id:'konts_yards',
                         children:[
                             {text:menutree.btnKontYard, leaf:true, id:'kont_yard2', iconCls:'cont1'}
                             /!*{text:menutree.btnKontReports, id:'kont_reports', iconCls:'logs',
                                 children:[
                                     {text:menutree.kyreport1, leaf:true, id:'kyreport1', iconCls:'logs' },
                                     {text:menutree.kyreport2, leaf:true, id:'kyreport2', iconCls:'logs' },
                                     {text:menutree.kyreport3, leaf:true, id:'kyreport3', iconCls:'logs' },
                                     {text:menutree.kyreport4, leaf:true, id:'kyreport4', iconCls:'logs' },
                                     {text:menutree.kyreport5, leaf:true, id:'kyreport5', iconCls:'logs' },
                                     {text:menutree.kyreport6, leaf:true, id:'kyreport6', iconCls:'logs' }
                                 ]
                             }*!/
                         ]
                     });
                 }*/
                root.appendChild({text: 'Handbooks', iconCls: 'nsimanager', leaf: true, id: 'nsimanager'});
                root.appendChild({
                    text: 'User guide', iconCls: 'instr', id: 'instr',
                    children: [
                        {text: "1.Регистрация и авторизация в Портале", leaf: true, id: 'instr1', iconCls: 'paragr'},
                        {text: "2.Меню Портала", leaf: true, id: 'instr2', iconCls: 'paragr'}/*,
                        {text:"3.Ввод и просмотр грузосопроводительной документации в Портале", leaf:true, id:'instr3', iconCls:'paragr' },
                        {text:"4.Работа с Инструкциями для формирования накладных", leaf:true, id:'instr4', iconCls:'paragr' },
                        {text:"5.Формирование накладных СМГС", leaf:true, id:'instr5', iconCls:'paragr' },
                        {text:"6.Формирование накладных ЦИМ", leaf:true, id:'instr6', iconCls:'paragr' },
                        {text:"7.Формирование накладных CMR", leaf:true, id:'instr7', iconCls:'paragr' },
                        {text:"8.Формирование накладных ГУ-29к(27в)", leaf:true, id:'instr8', iconCls:'paragr' },
                        {text:"9.Формирование коммерческих документов", leaf:true, id:'instr9', iconCls:'paragr' },
                        {text:"10.Обмен с ТБЦ", leaf:true, id:'instr10', iconCls:'paragr' },
                        {text:"11.Обмен с БЧ", leaf:true, id:'instr11', iconCls:'paragr' },
                        {text:"12.Настройка печати", leaf:true, id:'instr12', iconCls:'paragr' },
                        {text:"13.Обмен с ФТС", leaf:true, id:'instr13', iconCls:'paragr' },
                        {text:"14.Выгрузка/загрузка в/из файл(а)", leaf:true, id:'instr14', iconCls:'paragr'},
                        {text:"15.Обмен с Порталом БТЛЦ", leaf:true, id:'instr15', iconCls:'paragr' },
                        {text:"16.Обмен с УПК ТДГ", leaf:true, id:'instr16', iconCls:'paragr' }*/
                    ]
                });
                if (tkUser.hasPriv('CIM_INFTKBREST')) {
                    root.appendChild({text: 'Информация ТК Брест', iconCls: 'info', leaf: true, id: 'info'});
                }

                root.appendChild({text: 'Password change', leaf: true, iconCls: 'change', id: 'changepw'});
                root.appendChild({text: 'Exit', leaf: true, iconCls: 'logout', id: 'exit'});


                usrHeader = viewport.getComponent(0)/*.getComponent(1)*/;
                if (Ext.isIE6 || Ext.isIE7 /*Ext.isGecko*/) {
                    usrHeader.getComponent(0).el.update('Внимание! Обновите Internet Explorer до версии 8 или выше или отключите режим совместимости (по клавише F12)');
                    Ext.Msg.show({
                        title: 'Внимание!',
                        msg: 'Возможны ошибки в работе портала в данной версии браузера Internet Explorer. Обновите браузер до версии 8 или выше или отключите режим совместимости с предыдущими версиями (по клавише F12)!',
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }
                usrHeader.getComponent(1).el.update(viewport.headerUser + data['un'] + '(' + data['group'] + ')' + (data['fio'] ? ' - ' + data['fio'] : ''));
//                header.getComponent(1).el.update(viewport.headerUser + data['un'] + '(' + data['group'] + ')' + (data['fio'] ? ' - ' + data['fio'] : ''));

                TK.VTypes.init();

                // menu localisation
                // language defining
                if(tkUser['lang'])
                {
                    Ext.get("langProp").setHTML(tkUser['lang']);
                    var langCombo=Ext.ComponentQuery.query('viewport #localeCombo #langCombo')[0];
                    if(langCombo)
                        langCombo.setValue(tkUser['lang']);
                }

                var cur_lang = 'ru', read_lang;
                read_lang =Ext.get("langProp").getHTML()?Ext.get("langProp").getHTML(): Ext.urlDecode(window.location.search.substring(1)).lang;
                if (typeof read_lang !== 'undefined')
                    cur_lang =read_lang;
                me.clearLoadingElems();
                translate(this, cur_lang);

            },
            failure: function (response) {
                me.clearLoadingElems();
                TK.Utils.makeErrMsg(response, me.errorMsg);
            }
        });
    },
    clearLoadingElems: function () {
        Ext.get("loading").remove();
        Ext.get("langProp").remove();
    },
//    onItemdblclick:function(view, record){
//        this.getMenutree().un('itemclick', this.onItemclick, this);
//        this.onItemclick(view, record);
//        this.getMenutree().on(
//            {itemclick: {fn: this.onItemclick, scope: this, delay: 350}}
//        );
//    },
    /* Обработчик передосновноым обработчиком щелчка по основному дереву меню
     * @param view
     * @param td
     * @param cellIndex
     * @param record запись дерева
     * @returns {boolean}
     */
    onBeforecellclick: function (view, td, cellIndex, record) {
        // если есть закладки и выбранный элемент дерева является оконечным
        if (this.getCenter().getTabBar().activeTab && record.data['leaf']) {
            var isDirty = false, tab, tXtype, form;
            // проверяем есть ли документы в закладках с несохраненными измеенниями
            for (var n = 0; n < this.getCenter().items.length; n++) {
                // получаем тип документа в  закладке
                tab = this.getCenter().items.getAt(n);
                if (tab.form) {
                    form = tab.getForm();
                    if (form.isDirty()) {
                        isDirty = true;
                        break;
                    }
                    // проверяем объекты на изменение
                    if (tab.dataObj && tab.dataObj.back) {
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsCarLists'], tab.dataObj.back['cimSmgsCarLists'])) {
                            isDirty = true;
                            break;
                        }
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsDocses7'], tab.dataObj.back['cimSmgsDocses7'])) {
                            isDirty = true;
                            break;
                        }
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsDocses13'], tab.dataObj.back['cimSmgsDocses13'])) {
                            isDirty = true;
                            break;
                        }
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsDocses136'], tab.dataObj.back['cimSmgsDocses136'])) {
                            isDirty = true;
                            break;
                        }
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsPerevoz'], tab.dataObj.back['cimSmgsPerevoz'])) {
                            isDirty = true;
                            break;
                        }
                        if (!TK.Utils.deepEquals(tab.dataObj['cimSmgsPlatels'], tab.dataObj.back['cimSmgsPlatels'])) {
                            isDirty = true;
                            break;
                        }
                    }
                }
            }
            // для отладки выводит грязные поля в консоль
            // var total=0;
            // if(form) {
            //     console.log('doc:'+tab.xtype);
            //     for (var i = 0; i < form.getFields().items.length; i++) {
            //         if (form.getFields().items[i].isDirty()) {
            //             console.log(form.getFields().items[i]);
            //             total++;
            //         }
            //     }
            //     console.log('total:'+total);
            // }
            tab = this.getCenter().items.getAt(0);
            tXtype = tab.xtype;
            //проверяем тип документов
            if ((tXtype === 'smgs2' || tXtype === 'aviso2' || tXtype === 'cim' || tXtype === 'avisocim' || tXtype === 'cimsmgs' || tXtype === 'avisocimsmgs' || tXtype === 'ved') && isDirty) {
                Ext.Msg.show({
                    title: this.warning, msg: this.warnMsg, buttons: Ext.Msg.YESNO,
                    closable: false, icon: Ext.Msg.QUESTION, scope: this,
                    fn: function (buttonId) {
                        if (buttonId === 'yes') {
                            //выбираем пукт в меню
                            this.getMenutree().getSelectionModel().select(record);
                            //запускаем событие нажатия
                            this.onItemclick(view, record);
                        }
                    }
                });
                // отменяем событие нажатия
                return false;
            }
        }
    },
    onItemclick: function (view, record, item, index, e, eOpts, extraParams) {
        var ids = record.data['id'].split('_'),
            doc = ids[3] || record.data['id'],
            routeId = ids[2],
            center = this.getCenter(),
            viewport = this.getViewport(),
            menu = this.getMenutree(),
            reloadStore = true, // reload store with currentset of params in the same Route - saved cur page number in page toolbar
            prevRouteId = menu.lastSelectedLeaf ? menu.lastSelectedLeaf.data['id'].split('_')[2] : undefined,
            prevDoc = menu.lastSelectedLeaf ? menu.lastSelectedLeaf.data['id'].split('_')[3] : undefined,
            grid, gridParams = {}, menuDocItemChanged = false;

        if (record.childNodes.length === 0) { // leaf
            menu.lastSelectedLeaf = record;
            reloadStore = routeId && prevRouteId && (routeId === prevRouteId) ? true : false; // same Route
            var sameDoc = doc && prevDoc && (doc === prevDoc) ? true : false;
            if (!sameDoc || !reloadStore) {
                menuDocItemChanged = true;
               // this.fireEvent('menuDocItemChanged', record);
            }
        }

        switch (doc) {
            case 'cimsmgs':
                grid = Ext.widget('cimsmgslist', {/*title:'Журнал CIM/SMGS',*/ inPack: false});
                //очищаем параметры фильтрации списка документов
                if (grid.getStore().proxy.extraParams)
                    grid.getStore().proxy.extraParams = [];
                gridParams = {
                    'search.routeId': routeId, 'search.type': 1, 'task': 'list',
                    docName: doc,
                    tableName: 'CIM_SMGS'
                };
//                grid.initGrid({'search.routeId':routeId, 'search.type':1, 'task':'list'});
                break;
            case 'smgs':
                grid = Ext.widget('smgslist', {/*title:'Журнал SMGS',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 2, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':2, 'task':'list'});
                break;
            case 'smgs2':
                grid = Ext.widget('smgs2list', {inPack: false});
                //очищаем параметры фильтрации списка документов
                if (grid.getStore().proxy.extraParams)
                    grid.getStore().proxy.extraParams = [];

                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 12,
                    'task': 'list',
                    docName: doc,
                    tableName: 'CIM_SMGS'
                };
                break;
            case 'aviso':
            case 'aviso1':
                grid = Ext.widget('avisolist', {/*title:'Журнал Инструкций',*/ inPack: false});
                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 3,
                    'search.docId': tkUser.docs.get(doc)['hid'],
                    'task': 'list'
                };
//                grid.initGrid({'search.routeId':routeId, 'search.type':3, 'task':'list'});
                break;
            // шаблон SMGS2
            case 'aviso2':
                grid = Ext.widget('aviso2list', {inPack: false});
                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 11,
                    'search.docId': tkUser.docs.get(doc)['hid'],
                    'task': 'list',
                    'docName': doc,
                    'tableName': 'CIM_SMGS'
                };
                break;
            case 'avisogu29k':
            case 'avisogu29k1':
                grid = Ext.widget('avisogu29klist', {/*title:'Журнал Инструкций ГУ',*/ inPack: false});
                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 6,
                    'search.docId': tkUser.docs.get(doc)['hid'],
                    'task': 'list'
                };
//                grid.initGrid({'search.routeId':routeId, 'search.type':6, 'task':'list'});
                break;
            // шаблон CIMSMGS
            case 'avisocimsmgs':
                grid = Ext.widget('avisocimsmgslist', {inPack: false});
                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 10,
                    'search.docId': tkUser.docs.get(doc)['hid'],
                    'task': 'list',
                    'docName': doc,
                    'tableName': 'CIM_SMGS'
                };
                break;
            case 'gu29k':
                grid = Ext.widget('gu29klist', {/*title:'Журнал ГУ',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 4, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':4, 'task':'list'});
                break;
            case 'gu27v':
                grid = Ext.widget('gu27vlist', {/*title:'Журнал ГУ',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 8, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':8, 'task':'list'});
                break;
            case 'epd':
                grid = Ext.widget('epdlist', {/*title:'Журнал ЭПД',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 0, 'task': 'list', 'search.groupAlias': 'all'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':0, 'task':'list', 'search.groupAlias':'all'});
                break;
            case 'invoicelist':
                grid = Ext.widget('invoicelist', {/*title:'Журнал Инвойсов',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': -1, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':-1, 'task':'list'});
                break;
            // CIM
            case 'cim':
                grid = Ext.widget('cimlist', {/*title:'Журнал ЦИМ',*/ inPack: false});
                //очищаем параметры фильтрации списка документов
                if (grid.getStore().proxy.extraParams)
                    grid.getStore().proxy.extraParams = [];

                gridParams = {'search.routeId': routeId, 'search.type': 7, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':7, 'task':'list'});
                break;
            // шаблон CIM
            case 'avisocim':
                grid = Ext.widget('avisocimlist', {/*title:'Журнал ЦИМ',*/ inPack: false});
                gridParams = {
                    'search.routeId': routeId,
                    'search.type': 14,
                    'search.docId': tkUser.docs.get(doc)['hid'],
                    'task': 'list'
                };
//                grid.initGrid({'search.routeId':routeId, 'search.type':7, 'task':'list'});
                break;
            case 'cmr':
                grid = Ext.widget('cmrlist', {/*title:'Журнал CMR',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 5, 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':5, 'task':'list'});
                break;
            case 'slovnakl':
                grid = Ext.widget('slovnakllist', {inPack: false});
                gridParams = {'search.routeId': routeId, 'search.type': 9, 'task': 'list'};
                break;
            case 'filesmgs':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'filesmgs', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filesmgs', 'task':'list'});
                break;
            case 'filegu29k':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'filegu29k', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filegu29k', 'task':'list'});
                break;
            case 'fileinvoice':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'fileinvoice', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileinvoice', 'task':'list'});
                break;
            case 'fileaviso':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'fileaviso', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileaviso', 'task':'list'});
                break;
            case 'fileavisogu29k':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'fileavisogu29k', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileavisogu29k', 'task':'list'});
                break;
            case 'filecimsmgs':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack: false});
                gridParams = {'search.routeId': routeId, 'search.docType': 'filecimsmgs', 'task': 'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filecimsmgs', 'task':'list'});
                break;
            case 'files':
                grid = Ext.widget('filelist', {/*title:'Журнал Прочих документов',*/ inPack: false});
                if (extraParams)
                    gridParams = extraParams;
                else {
                    grid.getStore().getProxy().extraParams = {};
                    gridParams = {'search.routeId': routeId, 'search.docType': 'files', 'task': 'list'};
                }
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'files', 'task':'list'});
                break;

            case 'poezdin':
                gridParams = {action: 'list', direction: 1, routeId: routeId, docName: doc, tableName: 'KY_POEZD'};
                grid = Ext.widget('kypoezdintolist');
                break;

            case 'poezd2innar':
                gridParams = {
                    action: 'list',
                    direction: 1,
                    routeId: routeId,
                    koleya: 2,
                    docName: doc,
                    tableName: 'KY_POEZD'
                };
                grid = Ext.widget('ky2poezdintolist');
                break;

            case 'poezd2outnar':
                gridParams = {
                    action: 'list',
                    direction: 2,
                    routeId: routeId,
                    koleya: 2,
                    docName: doc,
                    tableName: 'KY_POEZD'
                };
                grid = Ext.widget('ky2poezdoutlist');
                break;

            case 'poezd2inwide':
                gridParams = {
                    action: 'list',
                    direction: 1,
                    routeId: routeId,
                    koleya: 1,
                    docName: doc,
                    tableName: 'KY_POEZD'
                };
                grid = Ext.widget('ky2poezdintolist');
                break;

            case 'poezd2outwide':
                gridParams = {
                    action: 'list',
                    direction: 2,
                    routeId: routeId,
                    koleya: 1,
                    docName: doc,
                    tableName: 'KY_POEZD'
                };
                grid = Ext.widget('ky2poezdoutlist');
                break;

            case 'poezdout':
                gridParams = {action: 'list', direction: 2, routeId: routeId, docName: doc, tableName: 'KY_POEZD'};
                grid = Ext.widget('kypoezdoutlist');
                break;

            case 'avtoin':
                gridParams = {action: 'list', direction: 1, routeId: routeId, docName: doc, tableName: 'KY_AVTO'};
                grid = Ext.widget('kyavtointolist');
                break;
            case 'avtoout':
                gridParams = {action: 'list', direction: 2, routeId: routeId, docName: doc, tableName: 'KY_AVTO'};
                grid = Ext.widget('kyavtooutlist');
                break;
            case 'avto2in':
                gridParams = {action: 'list', direction: 1, routeId: routeId, docName: doc, tableName: 'KY_AVTO'};
                grid = Ext.widget('ky2avtointolist');
                // this.setGridTopTbLayout(grid,'column');
                break;
            case 'avto2out':
                gridParams = {action: 'list', direction: 2, routeId: routeId, docName: doc, tableName: 'KY_AVTO'};
                grid = Ext.widget('ky2avtooutlist');
                // this.setGridTopTbLayout(grid,'column');
                break;
            case 'avtoZayav2':
                gridParams = {action: 'list', routeId: routeId, docName: doc, tableName: 'KY_ZAYAV_AVTO'};
                grid = Ext.widget('ky2basezayavavtolist');
                // this.setGridTopTbLayout(grid,'column');
                break;
            case 'poezdZayav2in':
                gridParams = {action: 'list', direction: 1, routeId: routeId, docName: doc, tableName: 'KY_ZAYAV'};
                grid = Ext.widget('ky2poezdzayavintolist');
                // this.setGridTopTbLayout(grid,'column');
                break;
            case 'poezdZayav2out':
                gridParams = {action: 'list', direction: 2, routeId: routeId, docName: doc, tableName: 'KY_ZAYAV'};
                grid = Ext.widget('ky2poezdzayavoutlist');
                // this.setGridTopTbLayout(grid,'column');
                break;

            case 'poezdZayav2':
                gridParams = {action: 'list', routeId: routeId, docName: doc, tableName: 'KY_ZAYAV'};
                grid = Ext.widget('ky2poezdzayavlist');
                // this.setGridTopTbLayout(grid,'column');
                break;

            case 'client2':
                gridParams = {action: 'list', routeId: routeId};
                grid = Ext.widget('ky2clientlist');
                // this.setGridTopTbLayout(grid,'column');
                break;

            /*case 'kont_yard':
                grid = Ext.widget('kyyardlist');
                gridParams = {action:'list'};
                break;*/

            case 'kontyard2':
                grid = Ext.widget('ky2yardlist');
                gridParams = {action: 'list', routeId: routeId, docName: doc, tableName: 'KY_YARD'};
                // this.setGridTopTbLayout(grid,'column');
                break;

            case 'kyreport1':
                grid = Ext.widget('kyreport1');
                return;
            case 'kyreport2':
                grid = Ext.widget('kyreport2');
                return;
            case 'kyreport3':
                grid = Ext.widget('kyreport3');
                return;
            case 'kyreport4':
                grid = Ext.widget('kyreport4');
                return;
            case 'kyreport5':
                grid = Ext.widget('kyreport5');
                return;
            case 'kyreport6':
                grid = Ext.widget('kyreport6');
                return;

            case 'ved':
                grid = {xtype: 'vedlist'};
                // grid = Ext.widget('vedlist', {/*title:'Журнал вагонной/передаточной ведомости',*/ inPack:false});
                gridParams = {'search.type': 11, 'task': 'list'};
                reloadStore = false;
                break;
            case 'project':/*, title:'Список проектов'*/
                grid = {xtype: 'projectlist'/*, title:'Список проектов'*/};
                break;
            case 'log':
                grid = {xtype: 'logslist'/*, title:'Логи портала'*/};
                break;
            case 'stat':
                grid = Ext.widget('statlist');
                gridParams = {'task': 'list'};
//                grid.initGrid({'task':'list'});
                break;
            case 'user':
                grid = {xtype: 'userlist'};
                break;
            case 'userGroups':
                grid = {xtype: 'userlistgroups'};
                break;
            case 'nsimanager':
                grid = {xtype: 'nsilistdir'/*, title:'Список справочников'*/};
                break;
            case 'instr1':
            case 'instr2':
            case 'instr3':
            case 'instr4':
            case 'instr5':
            case 'instr6':
            case 'instr7':
            case 'instr8':
            case 'instr9':
            case 'instr10':
            case 'instr11':
            case 'instr12':
            case 'instr13':
            case 'instr14':
            case 'instr15':
            case 'instr16':
                window.open('Report_instruction.do?search.kod=' + doc, '_self');
                return;
            case 'smgsPrnTmpl_1':
            case 'smgsPrnTmpl_7':
            case 'smgsPrnTmpl_11':
            case 'gu29kPrnTmpl_10':
            case 'gu27vPrnTmpl_25':
            case 'cimsmgsPrnTmpl_4':
            case 'cimPrnTmpl_21':
            case 'cmrPrnTmpl_23':
            case 'cmrPrnTmpl_6':
//                this.getController('PrintTemplates');
                grid = Ext.widget('printTemplateList');
                gridParams = {'search.docType': doc.split('_')[1]};
//                grid.initGrid({'search.docType':doc.split('_')[1]});
                break;
            case 'stamps': // штампы
                console.log('stamps');
                grid = Ext.widget('stampList');
              //  gridParams = {'search.docType': doc.split('_')[1]};
                break;
            case 'info':
                window.open('http://trcont.by/tkportal', '_blank');
                return;
            case 'changepw':
                location.href = 'ChangePw.do';
                return;
            case 'exit':
//                location.href = 'j_spring_security_logout';
                location.href = 'Locale.do?logout';
                return;
            default:
                /*if(ids[0] == 'nsimanager' && ids.length > 1)
                 {
                 grid = this.getController('Nsimanager').nsiCountries().getComponent(0);
                 // grid = {xtype:'userlist', title:'Список пользователей'};
                 break;
                 }*/
                record.isExpanded() ? record.collapse() : record.expand();
                return;
        }

        if(menuDocItemChanged) {
            this.fireEvent('menuDocItemChanged', record, gridParams);
        }

//        if (center.getComponent(0)) {
        /*for (var i = 0; i < this.getCenter().items.getCount(); i++) {
         var comp = this.getCenter().getComponent(i);
         if (comp.isXType('form') && comp.hasListener('activate')) {
         comp.un('activate', this.getController('Docs').onActivateForm, this.getController('Docs'));
         }
         else if (comp.isXType('grid') && comp.hasListener('activate')) {
         comp.un('activate', this.getController('Docs').onActivateList, this.getController('Docs'));
         }
         else if (comp.isXType('panel') && comp.hasListener('activate')) {
         comp.un('activate', this.getController('Docs').onActivatePanel, this.getController('Docs'));
         }
         }*/
//	        Ext.suspendLayouts();
        /*viewport.remove(center);
         viewport.add({
         region: 'center',
         xtype: 'tabpanel',
         margins: '5 5 5 0',
         defaults: {autoScroll: true},
         items: grid
         });*/
//	        this.getCenter().removeAll(true);
//	        Ext.resumeLayouts(false);
//        }

        if (center.getComponent(0)) {
            if (center.items.length > 1) {    // remove tabs with docs
                viewport.remove(center);
                center = viewport.add({
                    region: 'center',
                    xtype: 'tabpanel',
                    margins: '5 5 5 0',
                    defaults: {autoScroll: true},
                    items: grid
                });
            } else {   //* replace docs list with another list
                center.remove(center.getComponent(0));
                center.add(grid);
            }
        } else {
            center.add(grid);
        }

        grid = center.setActiveTab(0) || center.getComponent(0);

        if (reloadStore) {
            Ext.apply(grid.getStore().getProxy().extraParams, gridParams);
            grid.getStore().reload();
        } else {// new Route
            Ext.data.StoreManager.each(function (store) {
                store.getProxy().extraParams = {};
                store.currentPage = 1;
            });
            grid.getStore().getProxy().extraParams = gridParams;
            grid.getStore().load();
        }
    }
    /**
     * Устанавливает расположение объектор в Top Toolbar панели
     * @param grid панель
     * @param layout настройка расположения объяктов
     */
    // setGridTopTbLayout:function(grid,layout)
    // {
        // if(grid.dockedItems)
        // for(var n=0;n<grid.dockedItems.items.length;n++)
        // {
        //     if(grid.dockedItems.items[n].xtype==='toolbar'&&grid.dockedItems.items[n].dock==='top')
        //     {
        //         grid.dockedItems.items[n].layout= layout;
        //         return;
        //     }
        // }
//     }
});

/**
 * translate tree menu localisation
 * @param me menu pointer
 * @param cur_lang current language
 */
function translate(me, cur_lang) {
    var root = me.getRootNode();
    var langs = {
        en: {
            user: 'Users',
            userGroups: 'Groups',
            project: 'Projects',
            log: 'Logs',
            stat: 'Statistics',
            print: "Print templates",
            nsimanager: 'Handbooks',
            instr: 'User guide',
            changepw: 'Password change',
            treeExit: 'Exit',
            epd: 'EPD',
            smgs: 'SMGS',
            invoicelist: 'Invoice',
            aviso: 'Templates SMGS for CKP',
            cimsmgs: 'CIM/SMGS',
            aviso1: 'Templates SMGS for agents',
            slovnakl: 'Slovak waybill',
            smgs2: 'SMGS2',
            aviso2: 'Templates SMGS2',
            gu29k: 'GU-29k',
            doplist: 'Extra sheet',
            filesmgs: 'Graphics SMGS',
            filegu29k: 'Graphics GU',
            fileaviso: 'Graphics Templates SMGS',
            fileinvoice: 'Graphics Invoice',
            filecimsmgs: 'Graphics CIM/SMGS',
            avisogu29k: 'Templates GU for CKP',
            cim: 'CIM',
            avisocim: 'Templates CIM',
            files: 'Other documents',
            cmr: 'CMR',
            fileavisogu29k: 'Graphics Templates GU',
            gu27v: 'GU-27v',
            avisogu29k1: 'Templates GU for agents',
            avisocimsmgs: 'Templates CIM/SMGS',
            ved: 'Wagon and transfer list',
            exit: 'Exit',
            poezdin: 'Trains, in',
            poezdout: 'Trains, out',
            poezd2inwide: 'Train 1520mm(arrival)',
            poezd2outwide: 'Train 1520mm(departure)',
            kontyard2: 'Container yard',
            poezd2innar: 'Train 1435mm(arrival)',
            poezd2outnar: 'Train 1435mm(departure)',
            avtoin: 'Track, in',
            avtoout: 'Track, out',
            avto2in: 'Track, arrival',
            avto2out: 'Track, departure',
            avtoZayav2: 'Track orders',
            poezdZayav2in: 'Train, unloading order',
            poezdZayav2out: 'Поезд, loading order',
            poezdZayav2: 'Train, orders',
            client2: 'Container availability',
            stamps:'Stamps'
        },

        ru: {
            user: 'Пользователи',
            userGroups: 'Группы',
            project: 'Проекты',
            log: 'Логи',
            stat: "Статистика",
            print: "Шаблоны печати",
            nsimanager: 'Справочники',
            instr: 'Инструкция',
            changepw: 'Смена пароля',
            treeExit: 'Выход',
            epd: 'ЭПД',
            smgs: 'СМГС',
            invoicelist: 'Инвойсы',
            aviso: 'Инструкция СМГС для ЦКП',
            cimsmgs: 'ЦИМ/СМГС',
            aviso1: 'Инструкция СМГС для агентов',
            slovnakl: 'Словацкая накладная',
            smgs2: 'СМГС2',
            aviso2: 'Инструкция СМГС2',
            gu29k: 'ГУ-29К',
            doplist: 'Дополнительный лист',
            filesmgs: 'Графика СМГС',
            filegu29k: 'Графика ГУ',
            fileaviso: 'Графика Инструкция СМГС',
            fileinvoice: 'Графика Инвойс',
            filecimsmgs: 'Графика ЦИМ/СМГС',
            avisogu29k: 'Инструкция ГУ для ЦКП',
            cim: 'CIM',
            avisocim: 'Инструкция CIM',
            files: 'Прочие документы',
            cmr: 'CMR',
            fileavisogu29k: 'Графика Инструкция ГУ',
            gu27v: 'ГУ-27в',
            avisogu29k1: 'Инструкция ГУ для агентов',
            avisocimsmgs: 'Инструкция ЦИМ/СМГС',
            ved: 'Вагонная/передаточная ведомость',
            exit: 'Выход',
            poezdin: 'Поезда, прибытие',
            poezdout: 'Поезда, отправление',
            poezd2inwide: 'Поезд 1520мм(прибытие)',
            poezd2outwide: 'Поезд 1520мм(отправление)',
            kontyard2: 'Контейнерная площадка',
            poezd2innar: 'Поезд 1435мм(прибытие)',
            poezd2outnar: 'Поезд 1435мм(отправление)',
            avtoin: 'Авто, прибытие',
            avtoout: 'Авто, отправление',
            avto2in: 'Авто2, прибытие',
            avto2out: 'Авто2, отправление',
            avtoZayav2: 'Заявка на авто',
            poezdZayav2in: 'Поезд, заявка на выгрузку',
            poezdZayav2out: 'Поезд, заявка на погрузку',
            poezdZayav2: 'Поезд, заявка',
            client2: 'Наличие контейнеров',
            stamps:'Штампы'
        },

        de: {
            user: 'Die Benutzer',
            userGroups: 'Groups',
            project: 'Die Projekte',
            log: 'Logs',
            stat: "Statistik",
            print: "Druckvorlagen",
            nsimanager: 'Directorys',
            instr: 'Anweisung',
            changepw: 'Password change',
            treeExit: 'Escape',
            epd: 'EPD',
            smgs: 'SMGS',
            invoicelist: 'Invoice',
            aviso: 'Templates SMGS for CKP',
            cimsmgs: 'CIM/SMGS',
            aviso1: 'Templates SMGS for agents',
            slovnakl: 'Slovak waybill',
            smgs2: 'SMGS2',
            aviso2: 'Templates SMGS2',
            gu29k: 'GU-29k',
            doplist: 'Extra sheet',
            filesmgs: 'Graphics SMGS',
            filegu29k: 'Graphics GU',
            fileaviso: 'Graphics Templates SMGS',
            fileinvoice: 'Graphics Invoice',
            filecimsmgs: 'Graphics ЦИМ/СМГС',
            avisogu29k: 'Templates GU for CKP',
            cim: 'CIM',
            avisocim: 'Templates CIM',
            files: 'Other documents',
            cmr: 'CMR',
            fileavisogu29k: 'Graphics Templates GU',
            gu27v: 'GU-27v',
            avisogu29k1: 'Templates GU for agents',
            avisocimsmgs: 'Templates CIM/SMGS',
            ved: 'Wagon and transfer list',
            exit: 'Exit',
            poezdin: 'Trains, in',
            poezdout: 'Trains, out',
            poezd2inwide: 'Train 1520mm(arrival)',
            poezd2outwide: 'Train 1520mm(departure)',
            kontyard2: 'Container yard',
            poezd2innar: 'Train 1435mm(arrival)',
            poezd2outnar: 'Train 1435mm(departure)',
            avtoin: 'Track, in',
            avtoout: 'Track, out',
            avto2in: 'Track, arrival',
            avto2out: 'Track, departure',
            avtoZayav2: 'Track orders',
            poezdZayav2in: 'Train, unloading order',
            poezdZayav2out: 'Train, loading order',
            poezdZayav2: 'Train, orders',
            client2: 'Container availability',
            stamps:'Stamps'
        },

        zh_CN: {
            user: '使用人',
            userGroups: 'Groups',
            project: '草案',
            log: '日志文件',
            stat: "统计",
            print: "Print templates",
            nsimanager: '手册',
            instr: '细则',
            changepw: 'Password change',
            treeExit: '出口',
            epd: 'EPD',
            smgs: 'SMGS',
            invoicelist: 'Invoice',
            aviso: 'Templates SMGS for CKP',
            cimsmgs: 'CIM/SMGS',
            aviso1: 'Templates SMGS for agents',
            slovnakl: 'Slovak waybill',
            smgs2: 'SMGS2',
            aviso2: 'Templates SMGS2',
            gu29k: 'GU-29k',
            doplist: 'Extra sheet',
            filesmgs: 'Graphics SMGS',
            filegu29k: 'Graphics GU',
            fileaviso: 'Graphics Templates SMGS',
            fileinvoice: 'Graphics Invoice',
            filecimsmgs: 'Graphics ЦИМ/СМГС',
            avisogu29k: 'Templates GU for CKP',
            cim: 'CIM',
            avisocim: 'Templates CIM',
            files: 'Other documents',
            cmr: 'CMR',
            fileavisogu29k: 'Graphics Templates GU',
            gu27v: 'GU-27v',
            avisogu29k1: 'Templates GU for agents',
            avisocimsmgs: 'Templates CIM/SMGS',
            ved: 'Wagon and transfer list',
            exit: '出口',
            poezdin: 'Trains, in',
            poezdout: 'Trains, out',
            poezd2inwide: 'Train 1520mm(arrival)',
            poezd2outwide: 'Train 1520mm(departure)',
            kontyard2: 'Container yard',
            poezd2innar: 'Train 1435mm(arrival)',
            poezd2outnar: 'Train 1435mm(departure)',
            avtoin: 'Track, in',
            avtoout: 'Track, out',
            avto2in: 'Track, arrival',
            avto2out: 'Track, departure',
            avtoZayav2: 'Track orders',
            poezdZayav2in: 'Train, unloading order',
            poezdZayav2out: 'Train, loading order',
            poezdZayav2: 'Train, orders',
            client2: 'Container availability',
            stamps:'Stamps'
        },

        pl: {
            user: 'Users',
            userGroups: 'Groups',
            project: 'Projects',
            log: 'Logs',
            stat: 'Statistics',
            print: "Print templates",
            nsimanager: 'Handbooks',
            instr: 'User guide',
            changepw: 'Password change',
            treeExit: 'Exit',
            epd: 'EPD',
            smgs: 'SMGS',
            invoicelist: 'Invoice',
            aviso: 'Templates SMGS for CKP',
            cimsmgs: 'CIM/SMGS',
            aviso1: 'Templates SMGS for agents',
            slovnakl: 'Slovak waybill',
            smgs2: 'SMGS2',
            aviso2: 'Templates SMGS2',
            gu29k: 'GU-29k',
            doplist: 'Extra sheet',
            filesmgs: 'Graphics SMGS',
            filegu29k: 'Graphics GU',
            fileaviso: 'Graphics Templates SMGS',
            fileinvoice: 'Graphics Invoice',
            filecimsmgs: 'Graphics CIM/SMGS',
            avisogu29k: 'Templates GU for CKP',
            cim: 'CIM',
            avisocim: 'Templates CIM',
            files: 'Other documents',
            cmr: 'CMR',
            fileavisogu29k: 'Graphics Templates GU',
            gu27v: 'GU-27v',
            avisogu29k1: 'Templates GU for agents',
            avisocimsmgs: 'Templates CIM/SMGS',
            ved: 'Wagon and transfer list',
            exit: 'Exit',
            poezdin: 'Pociągi, in',
            poezdout: 'Pociągi, out',
            poezd2inwide: 'Pociąg 1520mm(przyjazd)',
            poezd2outwide: 'Pociąg 1520mm(wyjazd)',
            kontyard2: 'Terminal kontenerowy',
            poezd2innar: 'Pociąg 1435mm(przyjazd)',
            poezd2outnar: 'Pociąg 1435mm(wyjazd)',
            avtoin: 'Samochód, in',
            avtoout: 'Samochód, out',
            avto2in: 'Samochód, przyjazd',
            avto2out: 'Samochód, wyjazd',
            avtoZayav2: 'Samochód, avizo',
            poezdZayav2in: 'Pociąg, kolejność rozładunku',
            poezdZayav2out: 'Train, loading order',
            poezdZayav2: 'Pociąg, avizo',
            client2: 'Dostępność kontenera',
            stamps:'Pieczęć'
        }
    };

    // documents localisation
    // tree walkthrough and localisation
    root.cascadeBy(function (nodeModel) {
        if(nodeModel.data.text)
        {
            var text = langs[cur_lang][nodeModel.data.text];
            if(text)
            {
                nodeModel.set('text', text);
                nodeModel.commit();
                            }
            else
            {
                var textId = langs[cur_lang][nodeModel.data.id];
                if(textId)
                {
                    nodeModel.set('text', textId);
                    nodeModel.commit();
                        }
                    }
                }
    }, this);
    // if (root.childNodes) {
    //     for (var nod = 0; nod < root.childNodes.length; nod++) {
    //         var s_nod = root.childNodes[nod].raw.children;
    //         if (s_nod) {
    //             for (var cld = 0; cld < s_nod.length; cld++) {
    //                 var l_nod = s_nod[cld].children;
    //                 if (l_nod) {
    //                     for (var leaf = 0; leaf < l_nod.length; leaf++) {
    //                         var c = root.findChild("text", l_nod[leaf].text, true);
    //                         var text = langs[cur_lang][l_nod[leaf].text];
    //                         if (text) {
    //                             c.set('text', text);
    //                             c.commit();
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         // if(langs[cur_lang][root.childNodes[nod].get('id')])
    //         var text_tr = langs[cur_lang][root.childNodes[nod].get('id')];
    //         if (text_tr)
    //             root.childNodes[nod].set('text', text_tr);
    //         root.childNodes[nod].commit();
    //     }
    // }
}
