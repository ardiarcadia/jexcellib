$(document).ready(function () {

    const elementBody = $("div#widhtBody").width();
    var options = {
        // url: site_url + "jexcel/get_data",
        minDimensions: [5,1],
        tableOverflow: true,
        allowInsertColumn: false,
        allowManualInsertColumn: false,
        // allowInsertRow: false,
        // allowManualInsertRow: false,
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
            { type: 'text', title:'Nama', width:200 },
            { type: 'text', title:'No Passport', width:120 },
            { type: 'dropdown', title:'Gender', width:100, source:[ "Male", "Female"] },
            { type: 'calendar', title:'Tanggal Lahir', width:150, options: { format: 'YYYY-MM-DD' }},
            { type: 'html', title:'Validasi', width:200 }

        ],
        // onload: loadedTbl,
        // onchange: changedData,
        onpaste: pasteData,
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

    function pasteData(){
        let result = JSON.stringify($('div#MySpreadsheet').jexcel('getData'));
        console.log(result);

        $.ajax({
            method: 'POST',
            url: site_url + "jexcel/ambil_data",
            cache: false,
            data: {
                dataExcel: result
            },
        })
        .done(function (result) {
            var obj = jQuery.parseJSON(result);
            // console.log(obj.dataFeedback);
            if (obj.dataValid) {
                document.getElementById('MySpreadsheet').jexcel.setData(obj.dataFeedback);
            }else{
                document.getElementById('MySpreadsheet').jexcel.setData(obj.dataFeedback);
            }
        })
        .fail(function (res) {
            loading_hide();
            alert('Error Response !');
            console.log('responseText', res.responseText);
        });
    }

});