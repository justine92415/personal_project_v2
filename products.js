const rowBody = document.querySelector(".row-body");
console.log(rowBody);

const url =
    "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/?category=raw";

axios
    .get(url)
    .then(function (res) {
        tourData = res.data.dtat.tours;

        console.log(tourData);
        console.log(Array.isArray(tourData));

        tourData.forEach((choco) => {
            rowBody.innerHTML += `<div class="col-4">
        <div class="product-card">
            <div class="product-img">
                <div class="hovershow ">
                    <p class="hovershow__name">${choco.name}</p>
                    <span class="hovershow__div"></span>
                    <p class="hovershow__price">NT.300</p>
                    <p class="hovershow__description">
                    ${choco.description}
                    </p>
                    <div class="hovershow__carts">
                        <button class="carts__btn">
                            <ion-icon class="btn__plus" name="remove-outline"></ion-icon>
                        </button>
                        <input class="carts__num" type="number" min="1" max="99" value="1">
                        <button class="carts__btn">
                            <ion-icon class="btn__minus" name="add-outline"></ion-icon>
                        </button>
                        <button class="carts__btn">
                            <ion-icon class="btn__carts" name="cart-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <img src="./assets/chocoproducts/${choco.images[0]}">
        
            </div>
        
            <div class="product-content">
                <div class="viewlink">
                    <a href="single.html">詳細介紹</a>
                </div>
                <div class="product-name">${choco.name}</div>
                <div class="product-price">NT.${choco.price}</div>
            </div>
        </div>
        </div>`;
        });
    })
    .then(function () {
        console.log("step2");
        const getBtn = document.querySelector(".carts__btn");
        console.log(getBtn);
    });
