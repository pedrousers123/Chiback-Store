const produtos = [
{
    id: 1,
    nome: "Pizza Calabresa",
    preco: 49.90,
    imagem: "img/calabresa.jpg",
    descricao: "Molho, mussarela, calabresa e orégano."
},

{
    id: 2,
    nome: "Pizza Portuguesa",
    preco: 54.90,
    imagem: "img/portuguesa.jpg",
    descricao: "Presunto, ovos, cebola e azeitonas."
},

{
    id: 3,
    nome: "Frango com Catupiry",
    preco: 56.90,
    imagem: "img/frango.jpg",
    descricao: "Frango desfiado e muito catupiry."
},

{
    id: 4,
    nome: "Marguerita",
    preco: 47.90,
    imagem: "img/marguerita.jpg",
    descricao: "Tomate, queijo e manjericão."
},

{
    id: 5,
    nome: "Quatro Queijos",
    preco: 59.90,
    imagem: "img/queijos.jpg",
    descricao: "Mussarela, parmesão, provolone e gorgonzola."
},

{
    id: 6,
    nome: "Pizza Bacon",
    preco: 58.90,
    imagem: "img/bacon.jpg",
    descricao: "Muito bacon, queijo e molho especial."
}
];

const lista = document.getElementById("listaProdutos");

produtos.forEach(produto => {

    lista.innerHTML += `
    
    <div class="col-md-4 mb-4">

        <div class="card h-100">

            <img src="${produto.imagem}" class="card-img-top">

            <div class="card-body d-flex flex-column">

                <h4 class="card-title">${produto.nome}</h4>

                <p class="card-text">${produto.descricao}</p>

                <h3 class="preco">
                    R$ ${produto.preco.toFixed(2)}
                </h3>

                <button class="btn btn-danger mt-auto"
                    onclick="adicionarCarrinho(${produto.id})">

                    <i class="bi bi-cart-plus"></i>
                    Adicionar

                </button>

            </div>

        </div>

    </div>
    `;
});

function adicionarCarrinho(id){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produto = produtos.find(p => p.id == id);

    const existe = carrinho.find(item => item.id == id);

    if(existe){

        existe.quantidade++;

    }else{

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });

    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarContador();

    const toast = new bootstrap.Toast(document.getElementById("toastCarrinho"));

    toast.show();

    console.log(carrinho);

}

function atualizarContador(){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {
        total += item.quantidade;
    });

    document.getElementById("contadorCarrinho").textContent = total;

}

atualizarContador();