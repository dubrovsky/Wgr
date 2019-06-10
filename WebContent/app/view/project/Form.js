Ext.define('TK.view.project.Form', {
    extend: 'Ext.form.Panel',
    alias:['widget.project'],
    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.form.field.Trigger',
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'TK.Utils',
        'TK.model.Group',
        'TK.model.Project',
        'TK.model.Route',
        'TK.view.edit.DetailGrid'
    ],
    closable: true,
	border: false,
    bodyPadding: 5,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },
    buildItems:function(config){
        config.items = [
            {xtype:'hidden', name:'project.hid', itemId:'project.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'textfield', fieldLabel:this.labelProjectName, name:'project.name', itemId:'project.name', maxLength:500, anchor:'50%'},
            {xtype:'detailgrid', title:this.labelGroups, itemId:'groups',  margin: '0 0 10 0', anchor:'50%',
                doc:'project',
                coll:'grps',
                buildColModel: function(config) {
                    config.columns = [
                        {xtype: 'rownumberer', width:25},
                        {text: this.headerName, dataIndex: 'name', flex:1, editor:{xtype:'trigger',triggerCls:'dir',editable:false}}
                    ];
                },
                newRecord: function(){
                    return Ext.create('TK.model.Group'/*,{name : '',descr:''}*/);
                },
                copyValues2MainFlds:function(){
                    var projects = Ext.getStore('Project'),
                        project = projects.first() || projects.add(Ext.create('TK.model.Project'))[0];
                    this.reconfigure(project.groups());
                },
                buildConstValues:function(){}
            },
            {xtype:'detailgrid', title:this.labelRoutes, itemId:'routes',
                doc:'project',
                coll:'rts',
                height:600,
                buildColModel: function(config) {
                    config.columns = [
                        {xtype: 'rownumberer'},
                        {text: this.headerName, dataIndex: 'name', flex:2, editor:{xtype:'textfield',maxLength:500}},
                        {text: this.headerRoutesGr, dataIndex: 'grps', flex:1,editor:{xtype:'trigger',triggerCls:'dir',editable:false}, renderer: this.onRenderGroups},
                        {text: this.headerRoutesDocs, dataIndex: 'dcs',flex:1, editor:{xtype:'trigger',triggerCls:'dir',editable:false}, renderer: this.onRenderDocs},
                        {text: this.headerRoutesCodeTbc, dataIndex: 'tbc_st_code',width:80, editor:{xtype:'textfield',maxLength:20}},
                        {text: this.headerRoutesCodeCustoms, dataIndex: 'customCode',width:80, editor:{xtype:'textfield',maxLength:20}},
                        {text: this.headerRoutesEmailMask, dataIndex: 'emailMask',width:120, editor:{xtype:'textfield',maxLength:128}}
                        // ,
                        // {text: this.headerRoutesForDeleted, dataIndex: 'forDeleted', xtype: 'checkcolumn', width: 100}
                    ];
                },
                newRecord: function(){
                    return Ext.create('TK.model.Route');
                },
                copyValues2MainFlds:function(projects){
                    var projects = Ext.getStore('Project'),
                        project = projects.first() || projects.add(Ext.create('TK.model.Project'))[0];
                    this.reconfigure(project.routes());
                },
                buildConstValues:function(){},
                onRenderGroups: function(value, meta, route){
                    var result = '';
                    route.groups().each(function(group){
                        result += group.get('name') + '<br/>';
                    });
                    return result;
                },
                onRenderDocs: function(value, meta, route){
                    var result = '';
                    route.docs().each(function(doc){
                        result += doc.get('descr') + '<br/>';
                    });
                    return result;
                },
                prepareData: function() {
                    var data = {};
                    this.store.each(function(route, ind, len){
                        data['project.rts['+ind+'].name'] = route.get('name');
                        data['project.rts['+ind+'].hid'] = route.get('hid');
                        data['project.rts['+ind+'].tbc_st_code'] = route.get('tbc_st_code');
                        data['project.rts['+ind+'].customCode'] = route.get('customCode');
                        data['project.rts['+ind+'].emailMask'] = route.get('emailMask');
                        // data['project.rts['+ind+'].forDeleted'] = route.get('forDeleted');
                        route.groups().each(function(group, ix){
                            data['project.rts['+ind+'].grps['+ix+'].name'] = group.get('name');
                        });
                        route.docs().each(function(doc, inx){
                            data['project.rts['+ind+'].dcs['+inx+'].hid'] = doc.get('hid');
                        });
                    }, this);
                    return data;
                }
            }
        ];
    },
    buildDockedItems:function(config) {
        config.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->',
                '-',{
                    text: this.btnSave,
                    iconCls: 'save',
                    action:'save'
                },'-',{
                    text: this.btnSaveExit,
                    iconCls: 'save_close',
                    action:'save_close'
                }, '-', {
                    text: this.btnClose,
                    iconCls: 'close1',
                    action:'close'
                }
            ]
        }];
    },
    failureAlert: function(form, action){
        TK.Utils.makeErrMsg(action.response, 'Error...');
        return false;
    },
    initServiceFields: function(data, initGrids){
        this.getForm().setValues(data);
        if(initGrids && data.route_hids){
            var hids = data.route_hids.split(','),
                routeStore = this.getComponent('routes').store;
            for (var i = 0; i < hids.length; i++) {
                routeStore.getAt(i).set('hid',hids[i]);
            }
        }
    },
    initForm: function(prefix){
	    this.suspendLayouts();
        var project = Ext.getStore('Project').first();

        if(project){
            this.getForm().setValues({
                'project.name' : project.get('name')
            });
        }

        this.initCollections();
	    this.resumeLayouts(true);
    },
    initCollections: function(){
        this.getComponent('routes').copyValues2MainFlds();
        this.getComponent('groups').copyValues2MainFlds();
    },
    prepareGridData4Save:function(){
        var data = {};
        Ext.apply(data, this.getComponent('groups').prepareData());
        Ext.apply(data, this.getComponent('routes').prepareData());
        return  data;
    }
});