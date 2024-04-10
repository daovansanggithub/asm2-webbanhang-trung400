// ===========================ẩn hiện trang giỏ hàng=================

const clickcart = document.querySelector(".fa-xmark");
const clickshow = document.querySelector(".fa-cart-shopping");
// hiện giỏ hàng khi click vào biểu tượng giỏ hàng thì gọi đến class và css cho right=0 ( vì ở bên css mình đã css cho .giohang là right=-100% để nó ẩn sau đó mình sử dụng js để cho nó = 0 để hiện)
clickshow.addEventListener("click", function () {
  document.querySelector(".giohang").style.right = "0";
});

// ẩn giỏ hàng
clickcart.addEventListener("click", function () {
  document.querySelector(".giohang").style.right = "-100%";
});

// =========================================thêm sản phẩm vào giỏ hàng============================
// chọn tất cả các giỏ hàng nằm ở mỗi sản phẩm
const btn_cart = document.querySelectorAll("button");

// chạy vòng lặp để lấy tất cả phần tử
btn_cart.forEach(function (button, index) {
  // tiếp đến lắng nghe sự kiện click vào nút giỏ hàng
  button.addEventListener("click", function (event) {
    // lấy phần tử giỏ hàng
    var btnItem = event.target;
    // từ phần tử giỏ hàng lấy được tất cả phần tử cha bao quanh nó từ tất cả các class trong class product (là lấy tất cả các thông tin của 1 div.product)
    var product = btnItem.closest(".product");
    // từ phần tử cha .product đi vào và lấy tất cả các thông tin ở trong 1 sản phẩm
    // lấy phần tử img và gán cho nó biến productImg
    var productImg = product.querySelector("img").src;
    // lấy phần tử tên sản phẩm
    var productName = product.querySelector("H3").innerText;
    // lấy thông tin của giá sản phẩm
    var productPrice = product.querySelector("span").innerText;

    // ================================================================
    //  ====Sau khi lấy thông tin của sản phẩm sau đó bỏ các thông tin đó vào thẻ tr được thiết kế ở html======//
    // gọi tới funcion addsp ở bên dưới
    add_sp(productPrice, productImg, productName);
    xoa();
  });
});

// tạo ra 1 table sau đó đổ các thông tin sản phẩm vào table đó (table là trang giỏ hàng)
function add_sp(productPrice, productImg, productName) {
  // tạo 1 thẻ tr ở trong phần tử giỏ hàng trong html
  var add_tr = document.createElement("tr");
  //   lấy thông tin của thẻ tr sau đổ đổ thông tin sản phẩm vào
  var tr_nd = `<tr>
  <td style="display: flex; align-items: center">
    <img style="width: 100px" src="${productImg}" alt="" />-->${productName}
  </td>
  <td>
    <p><span>${productPrice}</span><sup>$</sup></p>
  </td>
  <td
    style="
      cursor: pointer;
      border: 1px solid #000;
      padding: 5px;
      background-color: antiquewhite;
      width: 20px;
      height: 5px;
    ">
    <span class="xoa">Delete</span>
  </td>
</tr>`;
  //   từ thẻ tr đổ thông tin vào td để hiển thị thông tin vào trang giỏ hàng
  add_tr.innerHTML = tr_nd;
  //   lấy ra thẻ tbody
  var cart_tbl = document.querySelector("tbody");
  //   thêm thẻ tr vào tbody
  cart_tbl.append(add_tr);

  // gọi function tính tổng ở bên dưới
  total();
}

// ===============================tính tổng giá tiền trong giỏ hàng==================
function total() {
  // selec tr bằng cách đi từ tbody
  var cartItem = document.querySelectorAll("tbody tr");
  //   tạo ra biến sum để cộng dồn sau mỗi vòng lặp
  var sum = 0;

  //   lặp tất cả sản phẩm trong giỏ hàng
  for (var i = 0; i < cartItem.length; i++) {
    // lấy tất cả giá của sản phẩm trong giỏ hàng và ép kiểu vì giá kiểu float
    var price = parseFloat(cartItem[i].querySelector("span").innerHTML);
    // thực hiện tính tổng giá tiền
    sum = sum + price;
  }
  //   select thẻ span là thẻ chức tổng giá tiền bằng cách đi từ class total
  var tongtien = document.querySelector(".Total span");
  //   nối biến tổng vào để hiển thị tổng giá tiền
  tongtien.innerHTML = sum;
}

// =============================xóa sản phẩm trong giỏ hàng=======================
// =============================xóa sản phẩm trong giỏ hàng=======================
function xoa() {
  // select thẻ tr trong thẻ body của giỏ hàng
  var cartItem = document.querySelectorAll("tbody tr");
  // chạy vòng lặp để duyệt tất cả các phần tủ trong tbody tr
  for (var i = 0; i < cartItem.length; i++) {
    // select tất cả các phần tử có class xóa trong giỏ hàng
    var productT = document.querySelectorAll(".xoa");
    // lắng nghe sự kiện click vào nút xóa
    productT[i].addEventListener("click", function (event) {
      // từ phần tử được chọn nhảy ra ngoài để chọn nguyên phần tử cha là thẻ tr ( thẻ tr là tất cả thông tin của 1 sản phẩm đc chọn)
      var dele = event.target;
      //   nhảy ra phần từ cha để chọn thẻ tr bao quanh tất cả thông tin sản phẩm
      var itemRow = dele.parentElement.parentElement;
      // thực hiện xóa luôn thẻ tr là xóa luôn sản phẩm
      itemRow.remove();
      // sau đó gọi đến hàm tính tổng để tính lại giá tiền
      total();
    });
  }
}
