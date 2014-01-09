Ext.define('App.view.master.legalitas.AddButton',{
    extend: 'Ext.Button',
    alias: 'widget.addButtonLegalitas',
    text : 'Add row',
    iconCls : 'icon-add',
    listeners : {
        click : function(){
         var grid = Ext.getCmp('legalitasList'); // get the grid
         // var record = grid.getSelectionModel().getSelected(); //get selected row

        //before add a row, let's try to get the selected row data
        alert(record.get('name'));
        // It will show storeField data from the selected store

        // prepare new row
        var newRecord = new Legality.recordType({
            newRecordId : Ext.id()
        });

        // get selected row index to tell where we need to put in
        var rowIndex = grid.store.indexOf(record);

        // Now add a new row!
        grid.store.insert(rowIndex,newRecord);

        }//click function
    }
});