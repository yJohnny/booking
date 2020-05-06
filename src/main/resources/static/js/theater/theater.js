$(function() {

    // Initialize Theater modal
    const theaterModal = new Modal($('#theaterModal'), $('#submitTheater'));

    let editButton;
    let id;
    let isEdit = false;
    let isFilled = false;

    const name = $('#NameField');
    const rows = $('#RowsField');
    const columns = $('#ColumnsField');
    const is3d = $('#is3D');
    const isDolby = $('#isDolby');

    function verifyInput() {
        isFilled=true;
        if(name.val()==""){
            isFilled=false;
        }
        if(rows.val()=="" || rows.val()<=0){
            isFilled=false;
        }
        if(columns.val()=="" || columns.val()<=0){
            isFilled=false;
        }
        return isFilled;
    }


    $('#theaterTable').on('click', '.btn-edit', function () {

        id = $(this).attr('data-theaterid');
        editButton = $(this);

        const name = editButton.parent().siblings('td')[0].innerHTML;
        const rowsNumber = editButton.parent().siblings('td')[1].innerHTML;
        const columnsNumber = editButton.parent().siblings('td')[2].innerHTML;
        const can3D = editButton.parent().siblings('td')[3].innerHTML;
        const dolby = editButton.parent().siblings('td')[4].innerHTML;

        //Populate the modal fields with current info

        $("#NameField").val(name);
        $("#RowsField").val(rowsNumber);
        $("#ColumnsField").val(columnsNumber);
        $("#is3D").prop("checked", can3D === "true");
        $("#isDolby").prop("checked", dolby === "true");

        isEdit = true;

        // Adjust modal and display it
        theaterModal.showModal(isEdit, 'Edit Theater', 'Save');

    });

    $('#addButton').on('click', function(){

        isEdit=false;
        name.val('');
        rows.val('');
        columns.val('');
        $("#is3D").prop("checked", false);
        $("#isDolby").prop("checked", false);

        // Adjust modal and display it
        theaterModal.showModal(isEdit, 'Add Theater', 'Add Theater');

    });

    //This determines whether the button pressed is add or edit
    $('html body').off('click').on('click', '#submitTheater', function (e) {


        if(verifyInput()) {

            // Disable submit button
            theaterModal.disableButton();

            if (isEdit) {

                edit();

                isEdit = false;

            } else {

                add(e);

                isEdit = false;

            }

        } else {
            alert("Please fill the empty fields and make sure they're filled correctly");
        }

        function edit() {
            let theaterToEdit = {
                'id': id,
                'cinemaId': 1,
                'name': $('#NameField').val(),
                'rowsNumber': $('#RowsField').val(),
                'columnsNumber': $('#ColumnsField').val(),
                'can3d': $('#is3D').is(':checked'),
                'dolby': $('#isDolby').is(':checked')
            };

            // Send the newly entered info
            $.ajax({

                type: 'PUT',
                url: `/api/theaters/${id}`,
                data: JSON.stringify(theaterToEdit),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    editButton.parent().siblings('td')[0].innerHTML = theaterToEdit.name;
                    editButton.parent().siblings('td')[1].innerHTML = theaterToEdit.rowsNumber;
                    editButton.parent().siblings('td')[2].innerHTML = theaterToEdit.columnsNumber;
                    editButton.parent().siblings('td')[3].innerHTML = theaterToEdit.can3d;
                    editButton.parent().siblings('td')[4].innerHTML = theaterToEdit.dolby;

                    editButton.closest('tr').css('background', 'gold');
                    editButton.closest('tr').fadeOut(300, function () {
                        $(this).fadeIn(300);
                        $(this).css('background', 'white');
                        setTimeout(function () {
                            $('#theaterModal').modal('hide');
                        }, 100);
                        isEdit=false;
                    });
                }
        });
        }

        function add(e) {

            e.preventDefault();
            let theater = {
                "cinemaId": 1,
                "name": name.val(),
                "rowsNumber": rows.val(),
                "columnsNumber": columns.val(),
                "can3d": is3d.is(':checked'),
                "dolby": isDolby.is(':checked')
            };


            $.ajax({
                type: "POST",
                url: "/api/theaters",
                dataType: "json",
                data: JSON.stringify(theater),
                contentType: "application/json; charset=utf-8"
            })
                .done(function (theaterId) {

                    let newRow = `<tr class="d-flex">
                                    <td class="col-2">${theater.name}</td>
                                    <td class="col-2">${theater.rowsNumber}</td> 
                                    <td class="col-2">${theater.columnsNumber}</td>
                                    <td class="col-2">${theater.can3d}</td>
                                    <td class="col-2">${theater.dolby}</td>
                                    <td class="col-1">
                                        <button
                                               id = "editButton"
                                               class="btn btn-outline-dark btn-edit"
                                               data-toggle="modal"
                                               data-target="#theaterModal"
                                               data-theaterid=${theaterId}>
                                                <span class="fas fa-edit"></span>
                                        </button>
                                    </td>
                                    <td class="col-1">
                                        <button data-theaterid=${theaterId} data-theatername=${theater.name}" class="btn btn-outline-dark btn-delete">
                                            <span class="fas fa-trash"></span>
                                        </button>
                                    </td>
                                 </tr>`;

                    //appends the latest movie to the table
                    $('#theaterTable tbody').append(newRow);

                    setTimeout(function () {
                        $('#theaterModal').modal('hide');
                    }, 100);

                    //Scroll to bottom of container
                    $('#table-container').scrollTop($('#table-container')[0].scrollHeight);


                });
        }
    });


});