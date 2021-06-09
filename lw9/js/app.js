function ajax(url, callbackGood, callbackError) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200){
        callbackGood(JSON.parse(this.responseText));
      }
      else{
        callbackError();
      }
    }
  };
  xhr.send(null);
}

function getBackButton(onclick){
  return "<button onclick='" + onclick + "'>Назад</button><br>";
}

function setContent(content){
  document.querySelector(".content").innerHTML = content;
}

function loadProductReviewsById(productId) {
  ajax('/products/' + productId + '/reviews', function (reviews) {
    var content = getBackButton("loadProductById(" + productId + ")");
    for (review of reviews){
      content += "<div>";
      content += review.name + ": " + review.message;
      content += "<hr>";
      content += "</div>";
    }
    setContent(content);
  }, function(){
    setContent("Прилетели пришельцы украли отзывы...");
  });
}

function loadProductById(productId) {
  ajax('/products/' + productId, function (product) {
    var content = getBackButton("loadProducts()");
    content += "<b>" + product.name + "</b>";
    content += " <i>" + product.price + " рублей</i>";
    content += " <u>" + product.weight + " грамм</u>";
    content += "<br>Описание";
    content += product.description;
    content += "<br>";
    content += "<button onclick='loadProductReviewsById(" + product.id + ")'>Отзывы</button>";
    setContent(content);
  }, function(){
    setContent("Прилетели пришельцы украли описание продукта...");
  });
}

function loadProducts(){
  ajax('/products/', function (products) {
    var content = "";
    for (var product of products){
      content += "<div>";
      content += "<b>" + product.name + "</b>";
      content += " <i>" + product.price + " рублей</i>";
      content += " <u>" + product.weight + " грамм</u>";
      content += " <button onclick='loadProductById(" + product.id + ")'>Подробнее</button>";
      content += "</div>";
    }
    setContent(content);
  }, function(){
    setContent("Прилетели пришельцы украли все продукты...");
  });
}

loadProducts();