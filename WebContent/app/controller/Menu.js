Ext.define('TK.controller.Menu', {
    extend:'Ext.app.Controller',
    requires: [
        'Ext.tab.Panel',
        'TK.Utils',
        'TK.view.logs.List',
        'TK.view.nsi.ListDir',
        'TK.view.printtmpl.List',
        'TK.view.project.List',
        'TK.view.stat.List',
        'TK.view.user.List',
        'TK.view.user.ListGroups',
        'TK.view.ved.List'
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
                    menutree = me.getMenutree();

                if (tkUser.hasPriv('CIM_USR_ADMIN')) {
                    root.appendChild({text:'Users', iconCls:'users', leaf:true, id:'user'});
                    root.appendChild({text:'Groups', iconCls:'users', leaf:true, id:'userGroups'});
                }
                if (tkUser.hasPriv('CIM_PROJECT_ADMIN')) {
                    root.appendChild({text:'Projects', iconCls:'route2', leaf:true, id:'project'});
                }
                if (tkUser.hasPriv('CIM_LOGS')) {
                    root.appendChild({text:'Logs', iconCls:'logs', leaf:true, id:'log'});
                }
                if (tkUser.hasPriv('CIM_STAT')) {
                    root.appendChild({text:'Statistics', iconCls:'report', leaf:true, id:'stat'});
                }
                // print template
                if (tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN') || tkUser.hasPriv('CIM_PRINT_TEMPLATES_USER')) {
                    root.appendChild({text:this.btnPrnTmpl?this.btnPrnTmpl:'Print templates', iconCls:'print1', id:'print',
                        children:[
                            {text:this.smgs?this.smgs:'SMGS', leaf:true, id:'smgsPrnTmpl_1', iconCls:'print'},
                            {text:this.smgs2?this.smgs2:'SMGS2', leaf:true, id:'smgsPrnTmpl_7', iconCls:'print'},
                            {text:this.doplist?this.doplist:'btnDopList', leaf:true, id:'smgsPrnTmpl_11', iconCls:'print'},
                           /* {text:"ГУ-29к", leaf:true, id:'gu29kPrnTmpl_10', iconCls:'print'},
                            {text:"ГУ-27в", leaf:true, id:'gu27vPrnTmpl_25', iconCls:'print'},*/
                            {text:this.cimsmgs?this.cimsmgs:'CIM/SMGS', leaf:true, id:'cimsmgsPrnTmpl_4', iconCls:'print'},
                            {text:this.cim?this.cim:'CIM', leaf:true, id:'cimPrnTmpl_21', iconCls:'print'},
                            {text:this.cmr?this.cmr:'CMR', leaf:true, id:'cmrPrnTmpl_23', iconCls:'print'}/*,
                            {text:"Словацкая накладная", leaf:true, id:'cmrPrnTmpl_6', iconCls:'print'}*/
                        ]
                    });
                }
                if (tkUser.hasPriv('CIM_KONT_YARD')) {
                    root.appendChild({text:menutree.btnKontYards, iconCls:'cont', id:'konts_yards',
                        children:[
                            {text:menutree.btnKontYard, leaf:true, id:'kont_yard2', iconCls:'cont1'}
                            /*{text:menutree.btnKontReports, id:'kont_reports', iconCls:'logs',
                                children:[
                                    {text:menutree.kyreport1, leaf:true, id:'kyreport1', iconCls:'logs' },
                                    {text:menutree.kyreport2, leaf:true, id:'kyreport2', iconCls:'logs' },
                                    {text:menutree.kyreport3, leaf:true, id:'kyreport3', iconCls:'logs' },
                                    {text:menutree.kyreport4, leaf:true, id:'kyreport4', iconCls:'logs' },
                                    {text:menutree.kyreport5, leaf:true, id:'kyreport5', iconCls:'logs' },
                                    {text:menutree.kyreport6, leaf:true, id:'kyreport6', iconCls:'logs' }
                                ]
                            }*/
                        ]
                    });
                }
                root.appendChild({text:'Handbooks', iconCls:'nsimanager', leaf:true, id:'nsimanager'});
                root.appendChild({text:'User guide', iconCls:'instr', id:'instr',
                    children:[
                        {text:"1.Регистрация и авторизация в Портале", leaf:true, id:'instr1', iconCls:'paragr' },
                        {text:"2.Меню Портала", leaf:true, id:'instr2', iconCls:'paragr' }
                    ]});
                if (tkUser.hasPriv('CIM_INFTKBREST')) {
                    root.appendChild({text:'Информация ТК Брест', iconCls:'info', leaf:true, id:'info'});
                }

                root.appendChild({text:'Password change', leaf:true, iconCls:'change', id:'changepw'});
                root.appendChild({text:'Exit', leaf:true, iconCls:'logout', id:'exit'});


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
                TK.VTypes.init();

                // menu localisation
                // language defining
                var cur_lang='ru', read_lang;
                read_lang=Ext.urlDecode(window.location.search.substring(1)).lang;
                if(typeof read_lang !=='undefined')
                    cur_lang=Ext.urlDecode(window.location.search.substring(1)).lang;

                translate(this,cur_lang);

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

        if (record.childNodes.length === 0) { // leaf
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
                // шаблон SMGS2
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
            // шаблон CIMSMGS
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
            // CIM
            case 'cim':
                grid = Ext.widget('cimlist', {/*title:'Журнал ЦИМ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':7, 'task':'list'};
//                grid.initGrid({'search.routeId':routeId, 'search.type':7, 'task':'list'});
                break;
                // шаблон CIM
            case 'avisocim':
                grid = Ext.widget('avisocimlist', {/*title:'Журнал ЦИМ',*/ inPack:false});
                gridParams = {'search.routeId':routeId, 'search.type':14, 'search.docId':tkUser.docs.get(doc)['hid'], 'task':'list'};
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

            case 'poezdin':
                gridParams = {action:'list', direction:1, routeId:routeId};
                grid = Ext.widget('kypoezdintolist');
                break;

            case 'poezd2in':
                gridParams = {action:'list', direction:1, routeId:routeId};
                grid = Ext.widget('ky2poezdintolist');
                break;

            case 'poezd2out':
                gridParams = {action:'list', direction:2, routeId:routeId};
                grid = Ext.widget('ky2poezdoutlist');
                break;

            case 'poezdout':
                gridParams = {action:'list', direction:2, routeId:routeId};
                grid = Ext.widget('kypoezdoutlist');
                break;

            case 'avtoin':
                gridParams = {action:'list', direction:1, routeId:routeId};
                grid = Ext.widget('kyavtointolist');
                break;
            case 'avtoout':
                gridParams = {action:'list', direction:2, routeId:routeId};
                grid = Ext.widget('kyavtooutlist');
                break;

            /*case 'kont_yard':
                grid = Ext.widget('kyyardlist');
                gridParams = {action:'list'};
                break;*/

            case 'kont_yard2':
                grid = Ext.widget('ky2yardlist');
                gridParams = {action:'list'};
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
                grid = {xtype:'vedlist'};
                // grid = Ext.widget('vedlist', {/*title:'Журнал вагонной/передаточной ведомости',*/ inPack:false});
                gridParams = {'search.type':11, 'task':'list'};
                reloadStore = false;
                break;
            case 'project':/*, title:'Список проектов'*/
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
                grid = {xtype:'userlist'};
                break;
            case 'userGroups':
                grid = {xtype:'userlistgroups'};
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

        grid = center.setActiveTab(0) || center.getComponent(0);

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

/**
 * translate tree menu localisation
 * @param me menu pointer
 * @param cur_lang current language
 */
function translate (me,cur_lang) {
    var root = me.getRootNode();
    var langs= {
        en: {
            user   :'Users',userGroups  :'Groups', project:'Projects',log :'Logs',stat :'Statistics',
            print  :"Print templates",nsimanager:'Handbooks',instr   :'User guide',changepw:'Password change',
            treeExit    :'Exit', epd:'EPD', smgs:'SMGS', invoicelist :'Invoice',  aviso	 :'Templates SMGS for CKP',
            cimsmgs	    :'CIM/SMGS', aviso1	    :'Templates SMGS for agents', slovnakl    :'Slovak waybill', smgs2 :'SMGS2',
            aviso2	    :'Templates SMGS2', gu29k:'GU-29k',  doplist:'Extra sheet', filesmgs    :'Graphics SMGS',
            filegu29k   :'Graphics GU', fileaviso   :'Graphics Templates SMGS', fileinvoice :'Graphics Invoice',
            filecimsmgs :'Graphics CIM/SMGS',  avisogu29k  :'Templates GU for CKP', cim :'CIM', avisocim    :'Templates CIM',
            files       :'Other documents', cmr :'CMR', fileavisogu29k:'Graphics Templates GU', gu27v  :'GU-27v',
            avisogu29k1 :'Templates GU for agents', avisocimsmgs:'Templates CIM/SMGS',  ved :'Wagon and transfer list', exit:'Exit',
            poezdin: 'Trains, in', poezdout: 'Trains, out', avtoin: 'Avto, in', avtoout: 'Avto, out'},

        ru : {user   :'Пользователи', userGroups  :'Группы',project:'Проекты', log    :'Логи', stat     :"Статистика",
            print  :"Шаблоны печати",nsimanager    :'Справочники',instr   :'Инструкция', changepw:'Смена пароля',
            treeExit    :'Выход', epd:'ЭПД',  smgs	    :'СМГС', invoicelist :'Инвойсы', aviso	    :'Инструкция СМГС для ЦКП',
            cimsmgs	    :'ЦИМ/СМГС', aviso1:'Инструкция СМГС для агентов', slovnakl:'Словацкая накладная',  smgs2:'СМГС2',
            aviso2	    :'Инструкция СМГС2', gu29k	    :'ГУ-29К', doplist 	:'Дополнительный лист',filesmgs    :'Графика СМГС',
            filegu29k   :'Графика ГУ', fileaviso   :'Графика Инструкция СМГС', fileinvoice :'Графика Инвойс',
            filecimsmgs :'Графика ЦИМ/СМГС',  avisogu29k  :'Инструкция ГУ для ЦКП', cim :'CIM', avisocim    :'Инструкция CIM',
            files       :'Прочие документы',cmr         :'CMR', fileavisogu29k:'Графика Инструкция ГУ',  gu27v:'ГУ-27в',
            avisogu29k1 :'Инструкция ГУ для агентов', avisocimsmgs:'Инструкция ЦИМ/СМГС', ved :'Вагонная/передаточная ведомость',exit:'Выход',
            poezdin: 'Поезда, прибытие',poezd2in: 'Поезда2, прибытие',poezd2out: 'Поезда2, отправление', poezdout: 'Поезда, отправление', avtoin: 'Авто, прибытие', avtoout: 'Авто, отправление'
        },

        de : {user   :'Die Benutzer',userGroups  :'Groups',project:'Die Projekte',log    :'Logs', stat     :"Statistik",
            print  :"Druckvorlagen",nsimanager    :'Directorys',instr   :'Anweisung',changepw:'Password change',
            treeExit    :'Escape',epd:'EPD', smgs	    :'SMGS',invoicelist :'Invoice', aviso	    :'Templates SMGS for CKP',
            cimsmgs	    :'CIM/SMGS',aviso1	    :'Templates SMGS for agents',slovnakl    :'Slovak waybill',smgs2	    :'SMGS2',
            aviso2	    :'Templates SMGS2',gu29k	    :'GU-29k',doplist	    :'Extra sheet',filesmgs    :'Graphics SMGS',
            filegu29k   :'Graphics GU',fileaviso   :'Graphics Templates SMGS', fileinvoice :'Graphics Invoice',
            filecimsmgs :'Graphics ЦИМ/СМГС',avisogu29k  :'Инструкция GU for CKP', cim:'CIM', avisocim    :'Templates CIM',
            files       :'Other documents', cmr:'CMR',fileavisogu29k:'Graphics Templates GU', gu27v:'GU-27v',
            avisogu29k1 :'Templates GU for agents', avisocimsmgs:'Templates CIM/SMGS', ved :'Wagon and transfer list',exit:'Exit',
            poezdin: 'Trains, in', poezdout: 'Trains, out', avtoin: 'Avto, in', avtoout: 'Avto, out'},

        zh_CN : {user   :'使用人',userGroups  :'Groups',project:'草案', log    :'日志文件', stat     :"统计",
            print  :"Print templates",nsimanager    :'手册',instr   :'细则',changepw:'Password change',
            treeExit    :'出口',epd         :'EPD', smgs	    :'SMGS',invoicelist :'Invoice', aviso	    :'Templates SMGS for CKP',
            cimsmgs	    :'CIM/SMGS', aviso1	    :'Templates SMGS for agents',slovnakl    :'Slovak waybill', smgs2	    :'SMGS2',
            aviso2	    :'Templates SMGS2', gu29k	    :'GU-29k',doplist	    :'Extra sheet', filesmgs    :'Graphics SMGS',
            filegu29k   :'Graphics GU',fileaviso   :'Graphics Templates SMGS', fileinvoice :'Graphics Invoice',
            filecimsmgs :'Graphics ЦИМ/СМГС',avisogu29k  :'Templates GU for CKP',cim:'CIM', avisocim    :'Templates CIM',
            files       :'Other documents',cmr         :'CMR',fileavisogu29k:'Graphics Templates GU', gu27v       :'GU-27v',
            avisogu29k1 :'Templates GU for agents', avisocimsmgs:'Templates CIM/SMGS',  ved:'Wagon and transfer list',exit:'出口',
            poezdin: 'Trains, in', poezdout: 'Trains, out', avtoin: 'Avto, in', avtoout: 'Avto, out'}
    };

    // documents localisation
    // tree walkthrough and localisation
    if(root.childNodes)
    {
        for(var nod=0;nod<root.childNodes.length;nod++)
        {
            var s_nod=root.childNodes[nod].raw.children;
            if(s_nod)
            {
                for(var cld=0;cld<s_nod.length;cld++)
                {
                    var l_nod=s_nod[cld].children;
                    if(l_nod)
                    {
                        for(var leaf=0;leaf<l_nod.length;leaf++)
                        {
                            var c = root.findChild("text",l_nod[leaf].text,true);
                            var text=langs[cur_lang][l_nod[leaf].text];
                            if(text){
                                c.set('text', text);
                                c.commit();
                            }
                        }
                    }
                }
            }
            // if(langs[cur_lang][root.childNodes[nod].get('id')])
            var text_tr=langs[cur_lang][root.childNodes[nod].get('id')];
            if(text_tr)
                root.childNodes[nod].set('text',text_tr);
            root.childNodes[nod].commit();
        }
    }
}
