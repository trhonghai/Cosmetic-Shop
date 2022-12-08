function search(){
    
    var k = document.getElementById("searchText")
    
    if(k != null){
        k = k.value

        var items = document.querySelectorAll("div.grid__column-2-4 > a.home-product-item")
        for( var i = 0; i < items.length; i++){
            var h4 =  items[i].getElementsByTagName("h4")[0].innerText
            if(h4.indexOf(k) >= 0)
                items[i].style.outline = "2px solid #5b8cee"
        }

        setTimeout(function() {
            var items = document.querySelectorAll("div.grid__column-2-4 > a.home-product-item")
            for(var i = 0; i < items.length ; i++){
                items[i].style.outline = "none"
            }
            
        }, 5000);


    }
}



const btn = document.querySelectorAll("button.home-product-item__addCart-Label")
console.log(btn)
btn.forEach(function(button,index){
button.addEventListener("click",function(event){{
            
        var btnItem = event.target
        var product = btnItem.parentElement
        var productCover = product.parentElement
       
        var productImg = productCover.querySelector("div.home-product-item__img").style.backgroundImage.slice(4, -1).replace(/["']/g, "");
        console.log(productImg)
        var productName = productCover.querySelector("h4").innerText
        var productPrice = productCover.querySelector("span.home-product-item__price-current").innerText
        // console.log(productPrice,productImg,productName)
        addCart(productPrice,productImg,productName)
        
}})
})

function addCart(productPrice,productImg,productName){
    var addTr = document.createElement("tr")
    var cartItem = document.querySelectorAll("tbody tr")
    alert("Đã thêm sản phẩm vào giỏ hàng")
    for(var i = 0; i < cartItem.length;i++){
        var productT = document.querySelectorAll(".title")
        if(productT[i].innerHTML == productName){
            alert("Sản phẩm đã có trong giỏ hàng")
            return
        }
    }

    var trContent = `<tr>
    <td ><div class="home-product-item__img" style="background-image:url(`+productImg+`) ;"></div> <span class = "title">`+productName+`</span> </td>
    <td><span class="price" >`+productPrice+`</span></td>
    <td><input style="width:40px; outline: none; " type="number" value="1" min="0"></td>
    <td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td>
</tr>`
    addTr.innerHTML = trContent 
    var cartTable = document.querySelector("tbody")
    
    // console.log(cartTable) 
    cartTable.append(addTr)
    
    cartTotal()
    deleteCart()
    
}

/* Cart Total*/ 
function cartTotal(){
    var cartItem = document.querySelectorAll("tbody tr")
    // console.log(cartItem)
    var totalB = 0
    for(var i = 0; i < cartItem.length;i++){
        var inputValue = cartItem[i].querySelector("input").value
        
        var productPrice = cartItem[i].querySelector(".price").innerHTML.replace(/₫/g,"")
        
        totalA = inputValue*productPrice*1000

        totalB = totalB + totalA

        // totalC = totalB.toLocaleString('de-DE')

        
    }
    var cartTotalPrice = document.querySelector(".price-total span")
    cartTotalPrice.innerHTML = totalB
    
    // console.log(cartTotalPrice)

    inputChange()

}

/* Delete Cart */

function deleteCart(){
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < cartItem.length;i++){
        var productT = document.querySelectorAll(".cart-delete")
        productT[i].addEventListener("click", function(event){
            var cartDelete = event.target
            var cartItemDelete = cartDelete.parentElement.parentElement
            cartItemDelete.remove()
            cartTotal()
            // console.log(cartItemDelete)
        } )
        
    }
}

function inputChange(){
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < cartItem.length;i++){
        var inputValue = cartItem[i].querySelector("input")
        inputValue.addEventListener("change",function(){
            cartTotal()
        })
        
    }
}


function LoginValidate(frm) {
    
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	if (emailReg.test(frm.email.value) == false) {
		alert("Vui lòng nhập email!");
		frm.emailReg.focus();
		return false;

	}
	var reg = /.{8,}/;

	if (reg.test(frm.psw.value) == false) {
		alert("Vui lòng nhập password trên 8 ký tự!");
		frm.reg.focus();
		return false;
	}

	alert("Đăng nhập thành công.")

	return true;
}


function register(){
    event.preventDefault();
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var user = {
        email: email,
        password: password,
    };
    
    var json = JSON.stringify(user)
    localStorage.setItem(email,json)
    alert("Dang ky thanh cong")

}

function Login(){
    event.preventDefault();
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var user = localStorage.getItem(email)

    var data = JSON.parse(user)
    if(user == null){
        alert("Vui long nhap day du thong tin")
    }
    else if(email == data.email && password == data.password){
        alert("Dang nhap thanh cong")
        window.location.href = "TrangChu.html"
    }
    else{
        alert("Dang nhap that bai")
    }

}


function changeProductList(type,element){

    let tabs = document.getElementsByClassName('home-filter__btn')
    for( i= 0; i< tabs.length ;i++){
        tabs[i].style.background = 'white'
        tabs[i].style.color = '#333333'
    }
	element.style.background = '#9ee4f2'
    element.style.color = 'white'

    document.getElementById(type).style.display = 'block'

    switch (type) {
        case 'trend':
            document.getElementById('new').style.display = 'none'
            document.getElementById('best-sell').style.display = 'none'
            break;
    
        case 'new':
            document.getElementById('trend').style.display = 'none'
            document.getElementById('best-sell').style.display = 'none'
            break;
        case 'best-sell':
            document.getElementById('trend').style.display = 'none'
            document.getElementById('new').style.display = 'none'
            break;

    }
    
}


function contact(cont){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(cont.name.value == ""){
        alert("Vui long nhap ten cua ban!");
        cont.name.focus();
        return false
    }

    if(emailReg.test(cont.email.value)== false){
        alert("Vui long nhap email");
        cont.email.focus();
        return false;
    }
    if(cont.message.value == ""){
        alert("Vui long nhap noi dung!");
        cont.message.focus();
        return false;
    }
    alert("Gui lien he thanh cong");
    return true;
}


function onClick(type,element){
   
    let fields = document.getElementsByClassName('category__item')
    console.log(element)

    for( var i=0 ;i < fields.length; i++){
        fields[i].style.color = '#333333';
    }
    element.style.color = '#9ee4f2'

}