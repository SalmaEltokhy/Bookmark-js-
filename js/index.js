var bookmarkNameInput=document.getElementById('bookmarkName');
var bookmarkURLInput=document.getElementById('bookmarkURL');
var closeBtn=document.getElementById('closeBtn');
var msgId=document.getElementById('msagInp');


var productList={};

if(localStorage.getItem('productcontainer')!==null){
productList=JSON.parse(localStorage.getItem('productcontainer'))
displayData();
}

function addProduct(){
    if(validationInput(bookmarkNameInput)&&
    validationInput(bookmarkURLInput)
        ==true){
        var product={
            name :bookmarkNameInput.value,
            website: bookmarkURLInput.value,
        }
        productList.push(product);
        localStorage.setItem('productcontainer' , JSON.stringify(productList));
        displayData();
        clearForm();
        console.log(productList)
    }
    else{
        msgId.classList.remove('d-none')
    }
}

function clearForm(){
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
    bookmarkNameInput.classList.remove('is-valid')
    bookmarkURLInput.classList.remove('is-valid')

}

function displayData()
{
    var cartona="";
    for( var i=1; i<productList.length  ;i++  )
        {
        cartona+=`
        <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>
            <button class="btn btn-visit" onclick="redirectME('${productList[i].website}')">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit   
            </button>
        </td>
        <td>
            <button class="btn btn-delet pe-2" onclick="deletItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
          </td>
    </tr>
        `
    };
    document.getElementById('tableContent').innerHTML=cartona;
}
function deletItem(indexItem){
    productList.splice(indexItem    ,  1)
    localStorage.setItem('productcontainer' , JSON.stringify(productList));
    displayData();
    console.log(productList)

}
function redirectME(url){
    window.location=url;
    // localStorage.setItem('productcontainer' , JSON.stringify(productList));
    // displayData();

}
function validationInput(element){
    var text= element.value;
    var regex={
        bookmarkName: /^\w{3,}(\s+\w+)*$/,
        bookmarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    }
  
    if(regex[element.id].test(text) == true){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
return true;
    }
    else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        return false;
    }
}

function closeButton(){
    msgId.classList.add('d-none')
}