let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const lista = document.getElementById("listaCarrinho");
const totalCompra = document.getElementById("totalCompra");

function carregarCarrinho(){

    lista.innerHTML = "";

    let total = 0;

    if(carrinho.length === 0){

        lista.innerHTML = `
        <div class="alert alert-warning text-center">
            Seu carrinho está vazio.
        </div>
        `;

        totalCompra.innerHTML = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach(item=>{

        total += item.preco * item.quantidade;

        lista.innerHTML += `
        <div class="item-carrinho d-flex justify-content-between align-items-center">

            <div class="d-flex align-items-center">

                <img src="${item.imagem}"
                width="110"
                class="rounded me-3">

                <div>

                    <h4>${item.nome}</h4>

                    <p>Quantidade: ${item.quantidade}</p>

                    <h5 class="text-danger">
                    R$ ${(item.preco * item.quantidade).toFixed(2)}
                    </h5>

                </div>

            </div>

            <button
            class="btn btn-danger"
            onclick="removerProduto(${item.id})">

                <i class="bi bi-trash"></i>

            </button>

        </div>
        `;

    });

    totalCompra.innerHTML =
    `Total: <span class="text-success">R$ ${total.toFixed(2)}</span>`;

}

function removerProduto(id){

    carrinho = carrinho.filter(item=>item.id != id);

    localStorage.setItem("carrinho",JSON.stringify(carrinho));

    carregarCarrinho();

}

function finalizarCompra(){

    if(carrinho.length === 0){

        alert("O carrinho está vazio!");

        return;

    }

    const compra = {

        produtos: carrinho.map(item=>({

            Nome:item.nome,

            Quantidade:item.quantidade,

            Preco:item.preco

        })),

        valorFinal:carrinho.reduce((total,item)=>{

            return total + item.preco * item.quantidade;

        },0)

    };

    console.log(compra);

    alert("Compra realizada com sucesso!");

    localStorage.removeItem("carrinho");

    location.reload();

}

carregarCarrinho();