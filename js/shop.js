var cart ={};//глобально створена кррзина
$('document').ready(function() {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods(){
    //завантажую товари на сторінку
    $.getJSON ('goods.json' , function(data) {
        //console.log(data);
        var out = '';
        for(var key in data){
            out+='<div class="single-goods">';
            out +='<h3>'+data[key]['name']+'</h3>';
            out +='<p>Cost: '+data[key]['cost']+'</p>';
            out +='<img src="'+data[key].image+'">';
            out+='<button class= "add-to-cart" data-art="'+key+'">Buy</button>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on ('click',addToCart);

    })
}
function addToCart(){
    //додаємо товар в корзину
    var articul=$(this).attr('data-art');
    if(cart[articul]!=undefined){
        cart[articul]++;
    }
    else{
        cart[articul]=1;
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    console.log(cart);
    showMiniCart();
}
function checkCart(){
    //перевіряю наявність корзини в localStorage
    if(localStorage.getItem('cart')!=null){
        cart = JSON.parce (localStorage.getItem('cart'));
    }
}
function showMiniCart(){
    //виводимо наповнення корзини
    var out =' ';
    for (var w in cart){
        out += w+ '---'+cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}
