/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

<<<<<<< Generated
=======
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({

    controllers: [
        'Ajax',
        'Menu',
        'Docs',
        'Nsi',
        'Stat',
        'Doc2Doc',

        'exchange.Viewers',
        'exchange.Senders',
        'exchange.Agreements',
//        'exchange.ListStatus',
//        'exchange.FormStatus',
        'exchange.LockChecker',

        'docs.Aviso',
        'docs.Aviso2',
        'docs.Avisocimsmgs',
        'docs.Avisogu29k',
        'docs.Cim',
        'docs.Cimsmgs',
        'docs.Cmr',
        'docs.Epd',
        'docs.File',
        'docs.Gu27v',
        'docs.Gu29k',
        'docs.Invoice',
        'docs.Slovnakl',
        'docs.Smgs',
        'docs.Smgs2',
        'docs.VgCtGrTreeDetailController',
        'docs.Docs9TreeDetailController',
        'docs.PlombsTreeDetailController',
        'docs.Ved',
        'docs.Avisocim',

        'print.PrintTemplates',
        'print.Print',

        'Logs',

        'Project',
        'User',
        'FilterUtils',
        'ky.Poezd',
        'ky.Vagon',
        'ky.Kont',
        'ky.Gruz',
        'ky.Plomb',
        'ky.Yard',
        'ky.Report',
        'ky.Avto',
        'ky.NsiVag',
        'ky.NsiKont',
        'ky.NsiAvto',
        'ky.NsiOwner',

        'ky2.PoezdController',
        'ky2.PoezdVgCtGrController',
        'ky2.BindPoezdAndPoezdController',
        'ky2.BindPoezdAndYardController',

        'ky2.AvtoController',
        'ky2.AvtoCtGrController',
        'ky2.BindAvtoAndAvtoController',
        'ky2.ReportController',

        'ky2.YardController'
    ],

    requires:[
        'Ext.layout.container.Border',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.layout.container.Absolute',
        'Ext.form.field.Hidden',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.File',
        'Ext.grid.RowNumberer',
        'Ext.grid.feature.Summary',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action',
        'Ext.layout.container.Table',
        'Ext.grid.column.CheckColumn',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.form.FieldContainer',
        'Ext.ux.form.ItemSelector',
        'Ext.form.CheckboxGroup',
        'Ext.container.ButtonGroup',
        'TK.User',
        'TK.Utils',
        'TK.VTypes'
    ],
    autoCreateViewport: true,
    name:'TK'
});
