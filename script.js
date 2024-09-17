let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catogry = document.getElementById("catogry");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let btn = document.getElementById("deletall");
let search = document.getElementById("search");


let mood="craet";
let tmp;


// get total


function get_total(){
   
    if (price.value != "") {
        let totalValue =  (+price.value + +taxes.value + +ads.value) - +discound.value;
        total.innerHTML =  totalValue; 
        total.style.background="green";

      } 
    else{
        total.innerHTML = " .. ";
        total.style.background="red";

    }
}








let data_product;

if (localStorage.product!=null){
    data_product=JSON.parse(localStorage.product);
}
else{
    data_product=[];
}

// Create element
function creat() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discound: discound.value,
        total: total.innerHTML,
        count: count.value,
        catogry: catogry.value.toLowerCase()    
    };
if (mood=="craet"){
    if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
            data_product.push(newpro);
        }
    } else {
        data_product.push(newpro);
    }
}
else {
data_product[tmp]=newpro;
mood="craet";
submit.innerHTML="create";
submit.style.background="#5bc0de";
count.style.display="inline";



}
   
    localStorage.setItem("product", JSON.stringify(data_product));
    clear();
    showdata();
}

// Clear data
function clear() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discound.value = "";
    total.innerHTML = "";
    count.value = "";
    catogry.value = "";

    
}

// Show data
function showdata() {
    get_total();
    let tablee = "";
    for (let i = 0; i < data_product.length; i++) {
        tablee += `
            <tr>
                <td>${i}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].taxes}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discound}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].catogry}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = tablee;
    btn.innerHTML="Delete ALL "+ "("+ data_product.length + ")";

    if (data_product.length > 0) {
        btn.style.display = "inline"; 
    } else {
        btn.style.display = "none"; 
    }
}

showdata();
// Delete data
function deleteData(index) {
    
    data_product.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(data_product)); 
    showdata(); 
}
// Delete all


function deletall() {
    localStorage.clear(); 
    data_product.splice(0); 
    showdata();  // Update the display
}




// function deletall() {
//     localStorage.clear();
//     data_product = [];
//     tbody.innerHTML = "";
//     btn.style.display = "none";
// }





// update Data

function updateData(index) {
    
    title.value = data_product[index].title;
    price.value = data_product[index].price;
    taxes.value = data_product[index].taxes; 
    ads.value = data_product[index].ads;     
    discound.value = data_product[index].discound;
   count.style.display="none";
    catogry.value = data_product[index].catogry;
    get_total();   // == total.innerHTML = data_product[index].total;
   
    submit.innerHTML="Update";
    submit.style.background="red";
    tmp=index;
    mood="update";
    scroll(
        {
            top:0,
            behavior:"smooth"
        }
    )

}




// search


let searchmood="title";

function seearch(id){
if (id=="btn1"){
    searchmood="title";      
    
    

}
else{
    searchmood="catogry";
   
   
}

search.placeholder="search by " +searchmood;
search.focus();
search.style.background=("black");
search.value="";
showdata();

}



function search2(value) {

    let tablee="";


    for (let i = 0; i < data_product.length; i++) {
    if (searchmood === "title") {
      
       
          if (data_product[i].title.includes(value.toLowerCase())) {
            tablee += `
            <tr>
                <td>${i}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].taxes}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discound}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].catogry}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
          }
        
    }
          else {
           
       
                if (data_product[i].catogry.includes(value.toLowerCase())) {
                  tablee += `
                  <tr>
                      <td>${i}</td>
                      <td>${data_product[i].title}</td>
                      <td>${data_product[i].price}</td>
                      <td>${data_product[i].taxes}</td>
                      <td>${data_product[i].ads}</td>
                      <td>${data_product[i].discound}</td>
                      <td>${data_product[i].total}</td>
                      <td>${data_product[i].count}</td>
                      <td>${data_product[i].catogry}</td>
                      <td><button onclick="updateData(${i})">Update</button></td>
                      <td><button onclick="deleteData(${i})">Delete</button></td>
                  </tr>
              `;
                }
             
          }

        }
          tbody.innerHTML = tablee;
      
          
      }
   
