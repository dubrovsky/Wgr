Ext.define('TK.Files', {
    extend: 'Ext.form.field.File',
    alias: 'widget.filesfield',

    onFileChange: function (button, e, value) {
        this.duringFileSelect = true;
        var names = '',
            files = e.target.files;
        if (files.length < 6) {
            Ext.Object.each(files, function (file, value) {
                names += value.name + '   ';
            })
        }
        else if (files.length >= 6)
            names = 'Выбрано файлов - ' + files.length;
        Ext.form.field.File.superclass.setValue.call(this, names);
        delete this.duringFileSelect;
    },

    reset : function(){
        this.callParent();
        this.fileInputEl.dom.setAttribute('multiple', '1');
    }

});


