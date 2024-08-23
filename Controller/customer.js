//import {Customer} from "../DB/Db";






$('#save-cus').on('click', () => {

    var nic = $('#Nic').val();
    var name = $('#cusName').val();
    var address = $('#Address').val();
    var tel = $('#Tel').val();
    var date = $('#Date').val();

    const customerData={
        nic:nic,
        name:name,
        address:address,
        tel:tel,
        date:date
    };
    console.log(customerData);


    //create json
    const customerJson = JSON.stringify(customerData);
    console.log(customerJson);
//save the detail with AJAX
    const http = new XMLHttpRequest();
    http.onreadystatechange=()=>{
        //check state
        if(http.readyState==4){
            if(http.status==200){
                var jsonTypeResponse = JSON.stringify(http.responseText);
                console.log(jsonTypeResponse);
            }else {
                console.log("failed");
                console.log("status code"+http.status);
                console.log("ready state :"+ http.readyState);
            }
        }else {
            console.log("processing state:",http.readyState);
        }
    }

    http.open("Post","http://localhost:8080/customer/",true);
    http.setRequestHeader("Content-Type","application/json");
    http.send(customerJson);
});


$('#searchCusNic').on('click', () => {
    let search_NIC = $('#EnterNic').val();

    $.ajax({
        url: `http://localhost:8080/customer?nic=${search_NIC}`,
        type: 'GET',
        contentType: 'application/json',
        success: (data) => {
            // Handle success - Display or process the retrieved customer data
            console.log("Customer data retrieved successfully:", data);

            // Assuming you want to populate some fields with the retrieved data
            $('#CID').val(data.nic);
            $('#Cname').val(data.name);
            $('#Caddress').val(data.address);
            $('#Ctel').val(data.tel);
            $('#Reg-date').val(data.regDate);

            alert("Customer data retrieved successfully.");
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error("Error fetching customer data:", textStatus, errorThrown);
            if (jqXHR.status === 404) {
                alert("Customer not found for the provided NIC.");
            } else {
                alert("An error occurred while fetching customer data.");
            }
        }
    });
});

























































$('#cus-update').on('click', () => {
    let val1 = $('#CID').val();
    let val2 = $('#Cname').val();
    let val3 = $('#Caddress').val();
    let val4 = $('#Ctel').val();
    let val5 = $('#Reg-date').val();

    let customer = {
        customerId: val1,     // Use the correct key names
        customerName: val2,
        customerAddress: val3,
        customerTelephone: val4,
        registrationDate: val5
    };

    let customerJson = JSON.stringify(customer);
    console.log("Data to be sent:", customerJson);

    $.ajax({
        url: "http://localhost:8080/customer/",
        type: "PUT",
        data: customerJson,
        headers: { "Content-Type": "application/json" },
        success: (res) => {
            console.log("Response from server:", JSON.stringify(res));
            alert("Success");
        },
        error: (res) => {
            console.error("Error response:", res);
            alert("Update failed!!!");
        }
    });

});
