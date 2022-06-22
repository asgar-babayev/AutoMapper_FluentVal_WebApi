
let myForm = document.getElementById("myForm");
let updateForm = document.getElementById("updateForm");
let img = document.getElementById("img");
let url = "http://localhost:19921/api/actor/";



myForm.addEventListener("submit", function () {
    if ($('#inp_fullName').val().trim().toLowerCase() != "" && $('#inp_imageUrl').val().trim().toLowerCase() != "") {
        const dataActor = {
            FullName: $('#inp_fullName').val(),
            ImageUrl: $('#inp_imageUrl').val()
        }
        $.ajax({
            url: `${url}create`,
            type: 'POST',
            data: JSON.stringify(dataActor),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $('#inp_fullName').val('');
                $('#inp_imageUrl').val('');
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    }
    else
        alert("Empty data cannot be sent!");
})

updateForm.addEventListener("submit", function (e) {
    const id = $('#inp_id').val();
    if (id != "") {
        if ($('#inp_fullName').val().trim().toLowerCase() != "" && $('#inp_imageUrl').val().trim().toLowerCase() != "") {
            const dataActor = {
                FullName: $('#inp_fullName').val(),
                ImageUrl: $('#inp_imageUrl').val()
            }
            console.log(dataActor.Id);
            $.ajax({
                url: `${url}update/${id}`,
                type: 'PUT',
                data: JSON.stringify(dataActor),
                dataType: 'json',
                contentType: 'application/json',
                success: function () {
                    $('#inp_fullName').val('');
                    $('#inp_imageUrl').val('');
                    location.reload();
                },
                error: function () {
                    console.log('Error in Operation');
                }
            });
        }
        else
            alert("Empty data cannot be sent!")
    }
    else
        alert("Select the line to edit.")

})

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(el => {
            document.querySelector(".tbody").innerHTML += `
                    <tr>
                        <td><img width=150 id="img" src="${el.imageUrl}" class="card-img-top" alt="..."></td>
                        <td>${el.fullName}</td>
                        <td>
                        <form class="getDataForm">
                           <button  onclick="getData(${el.id})" class="btn btn-warning update">Edit</button>
                        </form>
                        </td>
                        <td>
                        <form class="delForm">
                           <button onclick="deleteData(${el.id})"  class="btn btn-danger del">Delete</button>
                        </form>
                        </td>
                    </tr>`;
        });
    })


function deleteData(id) {
    document.querySelectorAll(".delForm").forEach(del => {
        this.addEventListener("submit", function (e) {
            e.preventDefault();
            $.ajax({
                url: `${url}delete/${id}`,
                type: 'DELETE',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json',
                success: function () {
                    location.reload();
                },
                error: function () {
                    console.log('Error in Operation');
                }
            });
        });
    })
}

function getData(id) {
    document.querySelectorAll(".getDataForm").forEach(update => {
        this.addEventListener("submit", function (e) {
            e.preventDefault();

        })
    })
    fetch(url + "" + id)
        .then(res => res.json())
        .then(data => {
            $('#inp_id').val(data.id);
            $('#inp_fullName').val(data.fullName);
            $('#inp_imageUrl').val(data.imageUrl);
            console.log(data);

        })
        .catch(error => {
            console.log(error);
        })
}