Ext.define('TK.model.messanger.MessageModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'HID', type:'int'},
        {name:'PACK_DOC_HID', type:'int'},
        {name:'DOC_HID', type:'int'},
        'DOC_NAME',
        'CONTENT',
        'DATTR',
        'UN',
        'NAM_KLIENT',
        'TO_NAM_KLIENTS'
    ]
});