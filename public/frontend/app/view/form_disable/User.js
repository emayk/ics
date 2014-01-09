 Ext.define('App.view.form.User', {
           extend: 'Ext.form.field.Text',
           onRender: function(){
              this.callParent(arguments);
              // insert our Info Text element
              Ext.core.DomHelper.append(this.getEl(), '<div>' + this.
      				infoText + '</div>');
          },
          title: this.infoText

      }, function(){
          // console.log('Form User define!');
});