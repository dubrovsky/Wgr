Ext.define('TK.view.ky.nsi.BaseForm', {
    extend: 'TK.view.ky.AbstractForm',
    alias:'widget.kybasensiform',

    layout: {
        type: 'hbox',
        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
    },

    buildBottomToolbar: function(config){
        config.buttons = this.buildButtons();
    }
});
