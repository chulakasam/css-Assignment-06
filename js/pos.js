import {Customer,Items} from "../DB/Db.js";

import {customer} from "../model/Customer-Model.js";
import {item} from "../model/item-model.js";

var recordIndex;

$('#s11,#d5,#h1').css({
    display:'block'
});

$('#home-manage').on('click', ()=>{

    $('#s11,#d5,#h1').css({
        display:'block'
    });

    $('#s1,#s2,#s3,#cus-load-form').css(
        {
            display:'none'
        }
    );

    $('#s4,#s5,#s6,#Item-load-form').css(
        {
            display:'none'
        }
    );

    $('#s7,#s8,#s9,#s10').css(
        {
            display:'none'
        }
    );

})

$('#s1,#s2,#s3,#cus-load-form').css(
    {
        display:'none'
    }
);

$('#s4,#s5,#s6,#Item-load-form').css(
    {
        display:'none'
    }
);
$('#s7,#s8,#s9,#s10').css(
    {
        display:'none'
    }
);


$('#customer-manage').on('click', ()=>{
    $('#s1,#s2,#s3,#cus-load-form').css(
        {
            display:'block'
        }
    );

    $('#s4,#s5,#s6,#Item-load-form').css(
        {
            display:'none'
        }
    );

    $('#s7,#s8,#s9,#s10').css(
        {
            display:'none'
        }
    );
    $('#s11,#d5,#h1').css({
        display:'none'
    });

})
$('#item-manage').on('click', ()=>{
    $('#s4,#s5,#s6,#Item-load-form').css(
        {
            display:'block'
        }
    );
    $('#s1,#s2,#s3,#cus-load-form').css(
        {
            display:'none'
        }
    );

    $('#s7,#s8,#s9,#s10').css(
        {
            display:'none'
        }
    );
    $('#s11,#d5,#h1').css({
        display:'none'
    });
})
$('#placeOrder-manage').on('click', ()=>{
    $('#s7,#s8,#s9,#s10').css(
        {
            display:'block'
        }
    );
    $('#s1,#s2,#s3,#cus-load-form').css(
        {
            display:'none'
        }
    );

    $('#s4,#s5,#s6,#Item-load-form').css(
        {
            display:'none'
        }
    );
    $('#s11,#d5,#h1').css({
        display:'none'
    });
})
//CRUD Section(customer)------------------------------------------------------------
$('#save-cus').on('click',()=>{
    var id = $('#Nic').val();
    var name = $('#cusName').val();
    var address= $('#Address').val();
    var tel = $('#Tel').val();
    var date = $('#Date').val();

    console.log(id+name+address+tel+date);

    let customer1 = new customer(id,name,address,tel,date);
    // let cus={
    //     cus_id:id,
    //     cus_name:name,
    //     cus_address:address,
    //     cus_tel:tel,
    //     cus_date:date,
    // }
    Customer.push(customer1);
    console.log(customer1)
    loadCustomerTable();

})
function loadCustomerTable(){
    $('#cus-details').empty();
    Customer.map((item,index) => {
        var record=` <tr>
             <td class="cus-id">${item.cus_id}</td>
            <td class="cus-name">${item.cus_name}</td>
            <td class="cus-address">${item.cus_address}</td>
            <td class="cus-tel">${item.cus_tel}</td>
            <td class="cus-date">${item.cus_date}</td>
         </tr>`
        $('#cus-details').append(record);
    });
}

$('#cus-details').on('click','tr',function (){
    let index = $(this).index();
    recordIndex=index;
    var id = $(this).find(".cus-id").text();
    var name = $(this).find(".cus-name").text();
    var address = $(this).find(".cus-address").text();
    var tel = $(this).find(".cus-tel").text();
    var date = $(this).find(".cus-date").text();

    console.log(id+ " "+name+" "+address+" "+tel+" " +date);
    $('#CID').val(id);
    $('#Cname').val(name);
    $('#Caddress').val(address);
    $('#Ctel').val(tel);
    $('#Reg-date').val(date);

});

$("#cus-Delete").on('click', () => {
    Customer.splice(recordIndex, 1);
    loadCustomerTable();

});

$('#cus-update').on('click' , ()=> {

    let val1 = $('#CID').val();
    let val2 = $('#Cname').val();
    let val3 = $('#Caddress').val();
    let val4 = $('#Ctel').val();
    let val5 = $('#Reg-date').val();

    let customerObj=Customer[recordIndex];
    customerObj.cus_id=val1;
    customerObj.cus_name=val2;
    customerObj.cus_address=val3;
    customerObj.cus_tel=val4;
    customerObj.cus_date=val5;
    console.log("S1: ", customerObj);
    console.log("S2: ", Customer[recordIndex]);

    loadCustomerTable();

});

//CRUD Section(item)-----------------------------------------------------------------
$('#save-item').on('click',()=>{
    var code = $('#ICode1').val();
    var Iname = $('#ItemName1').val();
    var desc= $('#description1').val();
    var qty = $('#qty1').val();
    var price = $('#price1').val();

    console.log(code+Iname+desc+qty+price);

    let item1 = new item(code,Iname,desc,qty,price);
    // let items={
    //     item_code:code,
    //     item_name:Iname,
    //     item_desc:desc,
    //     item_qty:qty,
    //     item_price:price,
    // }
    Items.push(item1);
    loadItemTable();
})
function loadItemTable(){
    $('#item-details').empty();
    Items.map((item,index) => {
        var record=` <tr>
             <td class="I-code">${item.item_code}</td>
            <td class="I-name">${item.item_name}</td>
            <td class="I-desc">${item.item_desc}</td>
            <td class="I-qty">${item.item_qty}</td>
            <td class="I-price">${item.item_price}</td>
         </tr>`
        $('#item-details').append(record);
    });
}

$('#item-details').on('click','tr',function (){
    let index = $(this).index();
    recordIndex=index;
    var code = $(this).find(".I-code").text();
    var name = $(this).find(".I-name").text();
    var desc = $(this).find(".I-desc").text();
    var qty = $(this).find(".I-qty").text();
    var price = $(this).find(".I-price").text();

    console.log(code+ " "+name+" "+desc+" "+qty+" " +price);
    $('#Item-code').val(code);
    $('#Item-name').val(name);
    $('#Item-desc').val(desc);
    $('#Item-qty').val(qty);
    $('#Item-unitprice').val(price);
    loadItemTable();
});

$("#Item-Delete").on('click', () => {
    Items.splice(recordIndex, 1);
    loadItemTable();
});
$('#Item-update').on('click' , ()=> {

    let val1 = $('#Item-code').val();
    let val2 = $('#Item-name').val();
    let val3 = $('#Item-desc').val();
    let val4 = $('#Item-qty').val();
    let val5 = $('#Item-unitprice').val();

    let itemObj=Items[recordIndex];
    itemObj.item_code=val1;
    itemObj.item_name=val2;
    itemObj.item_desc=val3;
    itemObj.item_qty=val4;
    itemObj.item_price=val5;
    console.log("S1: ", itemObj);
    console.log("S2: ", Items[recordIndex]);

    loadItemTable();

});