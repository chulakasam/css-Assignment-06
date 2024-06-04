import { Customer, Items } from "../DB/Db.js";
import { customer } from "../model/Customer-Model.js";
import { item } from "../model/item-model.js";


var recordIndex = -1;



// Utility function to validate customer form inputs
function validateCustomerForm(id, name, address, tel, date) {
    if (!id || !name || !address || !tel || !date) {
        alert("All fields are required.");
        return false;
    }
    if (!/^\d{10}$/.test(tel)) {
        alert("Invalid telephone number. It should be 10 digits.");
        return false;
    }
    return true;
}

// Utility function to check for unique customer ID
function isCustomerIdUnique(id) {
    return !Customer.some(customer => customer.cus_id === id);
}

// Utility function to validate item form inputs
function validateItemForm(code, name, desc, qty, price) {
    if (!code || !name || !desc || !qty || !price) {
        alert("All fields are required.");
        return false;
    }
    if (!/^\d+$/.test(qty) || qty <= 0) {
        alert("Quantity should be a positive number.");
        return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(price) || price <= 0) {
        alert("Price should be a positive number with up to two decimal places.");
        return false;
    }
    return true;
}

// Utility function to check for unique item code
function isItemCodeUnique(code) {
    return !Items.some(item => item.item_code === code);
}

// Initialization and event handlers for UI elements
$('#s11,#d5,#h1').css({ display: 'block' });

$('#home-manage').on('click', () => {
    $('#s11,#d5,#h1').css({ display: 'block' });
    $('#s1,#s2,#s3,#cus-load-form').css({ display: 'none' });
    $('#s4,#s5,#s6,#Item-load-form').css({ display: 'none' });
    $('#s7,#s8,#s9,#s10,#place-order-section').css({ display: 'none' });
});

$('#s1,#s2,#s3,#cus-load-form').css({ display: 'none' });
$('#s4,#s5,#s6,#Item-load-form').css({ display: 'none' });
$('#s7,#s8,#s9,#s10,#place-order-section').css({ display: 'none' });

$('#customer-manage').on('click', () => {
    $('#s1,#s2,#s3,#cus-load-form').css({ display: 'block' });
    $('#s4,#s5,#s6,#Item-load-form').css({ display: 'none' });
    $('#s7,#s8,#s9,#s10,#place-order-section').css({ display: 'none' });
    $('#s11,#d5,#h1').css({ display: 'none' });
});

$('#item-manage').on('click', () => {
    $('#s4,#s5,#s6,#Item-load-form').css({ display: 'block' });
    $('#s1,#s2,#s3,#cus-load-form').css({ display: 'none' });
    $('#s7,#s8,#s9,#s10,#place-order-section').css({ display: 'none' });
    $('#s11,#d5,#h1').css({ display: 'none' });
});

$('#placeOrder-manage').on('click', () => {
    $('#s7,#s8,#s9,#s10,#place-order-section').css({ display: 'block' });
    $('#s1,#s2,#s3,#cus-load-form').css({ display: 'none' });
    $('#s4,#s5,#s6,#Item-load-form').css({ display: 'none' });
    $('#s11,#d5,#h1').css({ display: 'none' });
});

// CRUD Section (Customer)
$('#save-cus').on('click', () => {
    var id = $('#Nic').val();
    var name = $('#cusName').val();
    var address = $('#Address').val();
    var tel = $('#Tel').val();
    var date = $('#Date').val();

    if (validateCustomerForm(id, name, address, tel, date)) {
        if (isCustomerIdUnique(id)) {
            let customer1 = new customer(id, name, address, tel, date);
            Customer.push(customer1);
            console.log(customer1);
            loadCustomerTable();
        } else {
            alert("Customer ID must be unique.");
        }
    }
});

function loadCustomerTable() {
    $('#cus-details').empty();
    Customer.forEach((item) => {
        var record = `
            <tr>
                <td class="cus-id">${item.cus_id}</td>
                <td class="cus-name">${item.cus_name}</td>
                <td class="cus-address">${item.cus_address}</td>
                <td class="cus-tel">${item.cus_tel}</td>
                <td class="cus-date">${item.cus_date}</td>
            </tr>`;
        $('#cus-details').append(record);
    });
}

$('#cus-details').on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    var id = $(this).find(".cus-id").text();
    var name = $(this).find(".cus-name").text();
    var address = $(this).find(".cus-address").text();
    var tel = $(this).find(".cus-tel").text();
    var date = $(this).find(".cus-date").text();

    $('#CID').val(id);
    $('#Cname').val(name);
    $('#Caddress').val(address);
    $('#Ctel').val(tel);
    $('#Reg-date').val(date);
});

$("#cus-Delete").on('click', () => {
    if (recordIndex > -1) {
        Customer.splice(recordIndex, 1);
        loadCustomerTable();
        recordIndex = -1; // Reset the selected record index
    }
});

$('#cus-update').on('click', () => {
    let val1 = $('#CID').val();
    let val2 = $('#Cname').val();
    let val3 = $('#Caddress').val();
    let val4 = $('#Ctel').val();
    let val5 = $('#Reg-date').val();

    if (validateCustomerForm(val1, val2, val3, val4, val5)) {
        let customerObj = Customer[recordIndex];
        customerObj.cus_id = val1;
        customerObj.cus_name = val2;
        customerObj.cus_address = val3;
        customerObj.cus_tel = val4;
        customerObj.cus_date = val5;

        loadCustomerTable();
        recordIndex = -1; // Reset the selected record index
    }
});

// CRUD Section (Item)
$('#save-item').on('click', () => {
    var code = $('#ICode1').val();
    var Iname = $('#ItemName1').val();
    var desc = $('#description1').val();
    var qty = $('#qty1').val();
    var price = $('#price1').val();

    if (validateItemForm(code, Iname, desc, qty, price)) {
        if (isItemCodeUnique(code)) {
            let item1 = new item(code, Iname, desc, qty, price);
            Items.push(item1);
            loadItemTable();
        } else {
            alert("Item code must be unique.");
        }
    }
});

function loadItemTable() {
    $('#item-details').empty();
    Items.forEach((item) => {
        var record = `
            <tr>
                <td class="I-code">${item.item_code}</td>
                <td class="I-name">${item.item_name}</td>
                <td class="I-desc">${item.item_desc}</td>
                <td class="I-qty">${item.item_qty}</td>
                <td class="I-price">${item.item_price}</td>
            </tr>`;
        $('#item-details').append(record);
    });
}

$('#item-details').on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    var code = $(this).find(".I-code").text();
    var name = $(this).find(".I-name").text();
    var desc = $(this).find(".I-desc").text();
    var qty = $(this).find(".I-qty").text();
    var price = $(this).find(".I-price").text();

    $('#Item-code').val(code);
    $('#Item-name').val(name);
    $('#Item-desc').val(desc);
    $('#Item-qty').val(qty);
    $('#Item-unitprice').val(price);
});

$("#Item-Delete").on('click', () => {
    if (recordIndex > -1) {
        Items.splice(recordIndex, 1);
        loadItemTable();
        recordIndex = -1; // Reset the selected record index
    }
});

$('#Item-update').on('click', () => {
    let val1 = $('#Item-code').val();
    let val2 = $('#Item-name').val();
    let val3 = $('#Item-desc').val();
    let val4 = $('#Item-qty').val();
    let val5 = $('#Item-unitprice').val();

    if (validateItemForm(val1, val2, val3, val4, val5)) {
        let itemObj = Items[recordIndex];
        itemObj.item_code = val1;
        itemObj.item_name = val2;
        itemObj.item_desc = val3;
        itemObj.item_qty = val4;
        itemObj.item_price = val5;

        loadItemTable();
        recordIndex = -1; // Reset the selected record index
    }
});
