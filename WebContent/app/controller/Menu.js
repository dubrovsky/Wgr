Ext.define('TK.controller.Menu', {
    extend:'Ext.app.Controller',
    requires:[
        'TK.User', 'TK.Utils', 'TK.view.Viewport'
    ],

    views:['MenuTree'],
    stores:['MenuItems'],
    refs:[
        {
            ref:'center',
            selector:'viewport > tabpanel'
        },
        {
            ref:'menutree',
            selector:'viewport > menutree'
        },
        {
            ref:'viewport',
            selector:'viewport'
        }

    ],

    init:function () {
//        this.control({
//            'viewport > menutree':{
//                load:this.onRender,
//                itemclick:this.onItemclick,
//                itemdblclick:this.onItemdblclick
//            }
//        });
    },
    onRender:function (store) {
        var viewport = this.getViewport(),
            usrHeader,
            me = this;
        Ext.Ajax.request({
            url:'User_userProvfile.do',
            scope:this.getMenutree(),
            method:'POST',
            success:function (response) {
                var root = this.getRootNode(),
                    data = Ext.decode(response.responseText);

                tkUser = Ext.widget('userprofile', {un:data['un'], group:data['group'], privs:data['priv'], docs:data['docs']});
                if (tkUser.hasPriv('CIM_USR_ADMIN')) {
                    root.appendChild({text:this.treeUsers, iconCls:'users', leaf:true, id:'user'});
                }
                if (tkUser.hasPriv('CIM_PROJECT_ADMIN')) {
                    root.appendChild({text:this.treeProjects, iconCls:'route2', leaf:true, id:'project'});
                }
                if (tkUser.hasPriv('CIM_LOGS')) {
                    root.appendChild({text:this.treeLogs, iconCls:'logs', leaf:true, id:'log'});
                }
                if (tkUser.hasPriv('CIM_STAT')) {
                    root.appendChild({text:this.btnStat, iconCls:'report', leaf:true, id:'stat'});
                }
                if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN') || tkUser.hasPriv('CIM_PRINT_TEMPLATES_USER')) {
                    root.appendChild({text:this.btnPrnTmpl, iconCls:'print1', id:'print',
                        children:[
                            {text:"СМГС", leaf:true, id:'smgsPrnTmpl_1', iconCls:'print'},
                            {text:"СМГС2", leaf:true, id:'smgsPrnTmpl_7', iconCls:'print'},
                            {text:"Доп.лист", leaf:true, id:'smgsPrnTmpl_11', iconCls:'print'},
                           /* {text:"ГУ-29к", leaf:true, id:'gu29kPrnTmpl_10', iconCls:'print'},
                            {text:"ГУ-27в", leaf:true, id:'gu27vPrnTmpl_25', iconCls:'print'},*/
                            {text:"ЦИМ/СМГС", leaf:true, id:'cimsmgsPrnTmpl_4', iconCls:'print'},
                            {text:"CIM", leaf:true, id:'cimPrnTmpl_21', iconCls:'print'},
                            {text:"CMR", leaf:true, id:'cmrPrnTmpl_23', iconCls:'print'}/*,
                            {text:"Словацкая накладная", leaf:true, id:'cmrPrnTmpl_6', iconCls:'print'}*/
                        ]
                    });
                }
                root.appendChild({text:this.treeDirs, iconCls:'nsimanager', leaf:true, id:'nsimanager'});
                root.appendChild({text:this.treeInstr, iconCls:'instr', id:'instr',
                    children:[
                        {text:"1.Регистрация и авторизация в Портале", leaf:true, id:'instr1', iconCls:'paragr' },
                        {text:"2.Меню Портала", leaf:true, id:'instr2', iconCls:'paragr' }/*,
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
                    ]});
                if (tkUser.hasPriv('CIM_INFTKBREST')) {
                    root.appendChild({text:'Информация ТК Брест', iconCls:'info', leaf:true, id:'info'});
                }
                root.appendChild({text:this.treeExit, leaf:true, iconCls:'logout', id:'exit'});


                usrHeader = viewport.getComponent(0)/*.getComponent(1)*/;
                if (Ext.isIE6 || Ext.isIE7 /*Ext.isGecko*/) {
                    usrHeader.getComponent(0).el.update('Внимание! Обновите Internet Explorer до версии 8 или выше или отключите режим совместимости (по клавише F12)');
                    Ext.Msg.show({
                        title:'Внимание!',
                        msg:'Возможны ошибки в работе портала в данной версии браузера Internet Explorer. Обновите браузер до версии 8 или выше или отключите режим совместимости с предыдущими версиями (по клавише F12)!',
                        icon:Ext.Msg.WARNING,
                        buttons:Ext.Msg.OK
                    });
                }
                usrHeader.getComponent(1).el.update(viewport.headerUser + data['un'] + '(' + data['group'] + ')' + (data['fio'] ? ' - ' + data['fio'] : ''));
//                header.getComponent(1).el.update(viewport.headerUser + data['un'] + '(' + data['group'] + ')' + (data['fio'] ? ' - ' + data['fio'] : ''));
                me.clearLoadingElems();
            },
            failure:function (response) {
                me.clearLoadingElems();
                TK.Utils.makeErrMsg(response, me.errorMsg);
            }
        });
    },
    clearLoadingElems: function(){
        Ext.get("loading").remove();
        Ext.get("langProp").remove();
    },
//    onItemdblclick:function(view, record){
//        console.log('onItemdblclick');
//        this.getMenutree().un('itemclick', this.onItemclick, this);
//        this.onItemclick(view, record);
//        this.getMenutree().on(
//            {itemclick: {fn: this.onItemclick, scope: this, delay: 350}}
//        );
//    },
    onItemclick:function (view, record) {
        var ids = record.data['id'].split('_'),
            doc = ids[3] || record.data['id'],
            routeId = ids[2],
            center = this.getCenter(),
            viewport = this.getViewport(),
            menu = this.getMenutree(),
            reloadStore = true, // reload store with currentset of params in the same Route - saved cur page number in page toolbar
            prevRouteId = menu.lastSelectedLeaf ? menu.lastSelectedLeaf.data['id'].split('_')[2] : undefined,
            grid, gridParams = {};

        if (record.childNodes.length == 0) { // leaf
            menu.lastSelectedLeaf = record;
            reloadStore = routeId && prevRouteId && (routeId == prevRouteId) ? true : false;
        }

        switch (doc) {
            case 'cimsmgs':
                grid = Ext.widget('cimsmgslist', {/*title:'Журнал CIM/SMGS',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':1, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':1, 'task':'list'});
                break;
            case 'smgs':
                grid = Ext.widget('smgslist', {/*title:'Журнал SMGS',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':2, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':2, 'task':'list'});
                break;
            case 'smgs2':
                grid = Ext.widget('smgs2list', {inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':12, 'task':'list'};
                break;
            case 'aviso':
            case 'aviso1':
                grid = Ext.widget('avisolist', {/*title:'Журнал Инструкций',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':3, 'search.docId':tkUser.docs.get(doc)['hid'], 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':3, 'task':'list'});
                break;
            case 'aviso2':
                grid = Ext.widget('aviso2list', {inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':11, 'search.docId':tkUser.docs.get(doc)['hid'], 'task':'list'};
                break;
            case 'avisogu29k':
            case 'avisogu29k1':
                grid = Ext.widget('avisogu29klist', {/*title:'Журнал Инструкций ГУ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':6, 'search.docId':tkUser.docs.get(doc)['hid'], 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':6, 'task':'list'});
                break;
            case 'avisocimsmgs':
                grid = Ext.widget('avisocimsmgslist', {inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':10, 'search.docId':tkUser.docs.get(doc)['hid'], 'task':'list'};
                break;
            case 'gu29k':
                grid = Ext.widget('gu29klist', {/*title:'Журнал ГУ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':4, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':4, 'task':'list'});
                break;
            case 'gu27v':
                grid = Ext.widget('gu27vlist', {/*title:'Журнал ГУ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':8, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':8, 'task':'list'});
                break;
            case 'epd':
                grid = Ext.widget('epdlist', {/*title:'Журнал ЭПД',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':0, 'task':'list', 'search.groupAlias':'all'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':0, 'task':'list', 'search.groupAlias':'all'});
                break;
            case 'invoicelist':
                grid = Ext.widget('invoicelist', {/*title:'Журнал Инвойсов',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':-1, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':-1, 'task':'list'});
                break;
            case 'cim':
                grid = Ext.widget('cimlist', {/*title:'Журнал ЦИМ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':7, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':7, 'task':'list'});
                break;
            case 'cmr':
                grid = Ext.widget('cmrlist', {/*title:'Журнал CMR',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':5, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':5, 'task':'list'});
                break;
            case 'slovnakl':
                grid = Ext.widget('slovnakllist', {inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':9, 'task':'list'};
                break;
            case 'filesmgs':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'filesmgs', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filesmgs', 'task':'list'});
                break;
            case 'filegu29k':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'filegu29k', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filegu29k', 'task':'list'});
                break;
            case 'fileinvoice':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'fileinvoice', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileinvoice', 'task':'list'});
                break;
            case 'fileaviso':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'fileaviso', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileaviso', 'task':'list'});
                break;
            case 'fileavisogu29k':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'fileavisogu29k', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'fileavisogu29k', 'task':'list'});
                break;
            case 'filecimsmgs':
                grid = Ext.widget('filelist', {/*title:'Журнал Графики',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'filecimsmgs', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'filecimsmgs', 'task':'list'});
                break;
            case 'files':
                grid = Ext.widget('filelist', {/*title:'Журнал Прочих документов',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.docType':'files', 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.docType':'files', 'task':'list'});
                break;
            case 'project':
                grid = {xtype:'projectlist'/*, title:'Список проектов'*/};
                break;
            case 'log':
                grid = {xtype:'logslist'/*, title:'Логи портала'*/};
                break;
            case 'stat':
                grid = Ext.widget('statlist');
                gridParams = {'task':'list'};
//                grid.initGrid({'task':'list'});
                break;
            case 'user':
                grid = {xtype:'userlist'/*, title:'Список пользователей'*/};
                break;
            case 'nsimanager':
                grid = {xtype:'nsilistdir'/*, title:'Список справочников'*/};
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
                gridParams = {'search.docType':doc.split('_')[1]};
//                grid.initGrid({'search.docType':doc.split('_')[1]});
                break;
            case 'info':
                window.open('http://trcont.by/tkportal', '_blank');
                return;
            case 'exit':
//                location.href = 'j_spring_security_logout';
                location.href = 'Locale.do';
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
                    region:'center',
                    xtype:'tabpanel',
                    margins:'5 5 5 0',
                    defaults:{autoScroll:true},
                    items:grid
                });
            } else {   //* replace docs list with another list
                center.remove(center.getComponent(0));
                center.add(grid);
            }
        } else {
            center.add(grid);
        }

        grid = center.getComponent(0);

        if(reloadStore){
            Ext.apply(grid.getStore().getProxy().extraParams, gridParams);
            grid.getStore().reload();
        } else {// new Route
            Ext.data.StoreManager.each(function(store){
                store.getProxy().extraParams = {};
                store.currentPage = 1;
            });
            grid.getStore().getProxy().extraParams = gridParams;
            grid.getStore().load();
        }
    }
});