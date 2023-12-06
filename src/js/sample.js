$(document).ready(function () {

    const elementBody = $("div#widhtBody").width();
    var options = {
        url: site_url + "jexcel/get_data",
        tableOverflow: true,
        allowInsertColumn: false,
        allowManualInsertColumn: false,
        allowInsertRow: false,
        allowManualInsertRow: false,
        allowRenameColumn: false,
        allowDeleteColumn: false,
        allowDeleteRow: false,
        columnDrag: false,
        rowDrag: false,
        columnResize: false,
        rowResize: false,
        minSpareRows: 0,
        wordWrap: true,
        tableWidth: elementBody + "px",
        tableHeight: "550px",
        columnSorting: true,
        freezeColumns: 3,
        csvHeaders: true,
        // filters: true,
        // search: true,
        // pagination: 20,
        columns: [
            { type: 'text', title:'Nama', width:200, name:'name1' },
            { type: 'text', title:'No Passport', width:120, name:'no_passport1', readOnly: true },
            { type: 'dropdown', title:'Gender', name:'gender1', width:100, source:[ "Male", "Female"] },
            { type: 'calendar', title:'Tanggal Lahir', name:'tgl_lahir1', width:150, options: { format: 'YYYY-MM-DD' }, readOnly: true },
            { type: 'hidden', title:'ID', width:50, name:'id1' }

        ],
        onload: loadedTbl,
        onchange: changedData,
    };

    var myJexcel = $('div#MySpreadsheet').jexcel(options);

    function changedData(instance, cell, x, y, value) {
        var cellName    =  jexcel.getColumnNameFromId([x,y]);
        let cellVal      =  myJexcel.getValue(cellName);

        let cellIdName   = jexcel.getColumnNameFromId([4,y]);
        let cellValIdDB    = myJexcel.getValue(cellIdName);

        console.log(cellName + ' ' + cellVal + ' ' +cellValIdDB);


        $.ajax({
            method: 'POST',
            url: site_url + "jexcel/update_data",
            cache: false,
            data: {
                s_name: cellVal,
                s_id : cellValIdDB
            },
        })
        .done(function (result) {
            console.log('Berhasil');
        })
        .fail(function (res) {
            alert('Error Response !');
            console.log('responseText', res.responseText);
        });
    }

    function loadedTbl() {
        let cellUpload = $('#MySpreadsheet table > thead').children().find("[data-x=1]");
        let cellBarcode = $('#MySpreadsheet table > thead').children().find("[data-x=3]");
        $(cellUpload).css({ 'color': 'red' });
        $(cellBarcode).css({ 'color': 'red' });
    }

});