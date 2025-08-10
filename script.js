// ---------------------
// Precarrega produtos uma única vez (se ainda não existir no localStorage)
// ---------------------
if (!localStorage.getItem("produtos")) {
    let produtosIniciais = [
    { "nome": "Água 1,5 litros", "preco": 6.00 },
    { "nome": "Agua sem gás 500ml", "preco": 4.00 },
    { "nome": "Água com gás 500ml", "preco": 5.00 },
    { "nome": "Coca sem açúcar 220ml", "preco": 6.00 },
    { "nome": "Coca sem açúcar 350ml", "preco": 8.00 },
    { "nome": "Coca tradicional 220ml", "preco": 6.00 },
    { "nome": "Coca tradicional 350ml", "preco": 8.00 },
    { "nome": "Fanta 220ml", "preco": 6.00 },
    { "nome": "Fanta 350 ml", "preco": 8.00 },
    { "nome": "Guaraná Zero 220ml", "preco": 6.00 },
    { "nome": "Guaraná Zero 350ml", "preco": 8.00 },
    { "nome": "Guaraná Tradicional 220ml", "preco": 6.00 },
    { "nome": "Guaraná Tradicional 350ml", "preco": 8.00 },
    { "nome": "H2OH 500ml", "preco": 8.00 },
    { "nome": "Life Mix Uva/Cramb", "preco": 8.00 },
    { "nome": "Mate Leão Tradicional", "preco": 9.00 },
    { "nome": "Mate Leão Limão", "preco": 9.00 },
    { "nome": "Mate Leão Pessego", "preco": 9.00 },
    { "nome": "Mate Leão pequeno", "preco": 7.50 },
    { "nome": "Schweppes 220ml", "preco": 6.00 },
    { "nome": "Schweppes 350ml", "preco": 8.00 },
    { "nome": "Sprite 350 ml", "preco": 8.00 },
    { "nome": "Suco Dell Valle Maracujá", "preco": 8.00 },
    { "nome": "Suco Del Valle Morango", "preco": 8.00 },
    { "nome": "Suco Del Valle Uva", "preco": 8.00 },
    { "nome": "Suco Maguari Maracujá", "preco": 8.00 },
    { "nome": "Suco Su Fresh Maracujá", "preco": 8.00 },
    { "nome": "YoPro 15g", "preco": 13.00 },
    { "nome": "Café Cappuccino da casa", "preco": 8.00 },
    { "nome": "Café Pilão expresso", "preco": 7.00 },
    { "nome": "Café Pilão decaf", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Alpino", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Alpino Black", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Au Lat", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Cappuccino", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Kit Kat", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Kopenhagen", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Moça", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Mocha Canela", "preco": 7.00 },
    { "nome": "Café Dolce Gusto Nescau", "preco": 7.00 },
    { "nome": "Chá Twining", "preco": 8.00 },
    { "nome": "Bolo simples", "preco": 7.00 },
    { "nome": "Bolo recheado", "preco": 8.00 },
    { "nome": "Brigadeiro Chocolate", "preco": 6.00 },
    { "nome": "Brigadeiro Creme Broule", "preco": 6.00 },
    { "nome": "Brigadeiro Cereja", "preco": 6.00 },
    { "nome": "Brigadeiro Bem casado", "preco": 6.00 },
    { "nome": "Brigadeiro Uva", "preco": 6.00 },
    { "nome": "Brigadeiro Colorido", "preco": 6.00 },
    { "nome": "Suspiro", "preco": 6.00 },
    { "nome": "Barra de Cereal", "preco": 5.00 },
    { "nome": "Queijadinha", "preco": 6.00 },
    { "nome": "Laranjinha carmelizada", "preco": 3.50 },
    { "nome": "Pão de Batata", "preco": 3.00 },
    { "nome": "Pão de Batata combo com 3", "preco": 8.00 },
    { "nome": "Pão de Queijo", "preco": 6.00 },
    { "nome": "Quiche", "preco": 7.50 },
    { "nome": "Saco de pão de Queijo", "preco": 90.00 }
  ];
  // Ordena em ordem alfabética ignorando acentos e maiúsculas/minúsculas
  produtosIniciais.sort((a, b) =>
    a.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").localeCompare(
      b.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      "pt",
      { sensitivity: "base" }
    )
  );

  localStorage.setItem("produtos", JSON.stringify(produtosIniciais));
}

// ---------------------
// Salva hora de início do turno se não existir
// ---------------------
if (!localStorage.getItem("horaLogin")) {
  const agora = new Date();
  localStorage.setItem("horaLogin", agora.toISOString());
}

// ---------------------
// Produtos
// ---------------------
let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

const renderProdutos = () => {
  const ulExibir = document.getElementById("lista-produtos");
  const ulGerenciar = document.getElementById("lista-gerenciar");
  ulExibir.innerHTML = ""; // Limpa

  const tabela = document.createElement("table");
tabela.className = "tabela-produtos";
tabela.innerHTML = `
  <thead>
    <tr>
      <th>Produto</th>
      <th>Preço</th>
    </tr>
  </thead>
  <tbody>
    ${produtos.map((p, i) => `
      <tr class="${i % 2 === 0 ? "linha-par" : "linha-impar"}">
        <td>${p.nome}</td>
        <td>R$${parseFloat(p.preco).toFixed(2)}</td>
      </tr>
    `).join("")}
  </tbody>
`;

const wrapper = document.createElement("div");
wrapper.className = "tabela-produtos-wrapper";
wrapper.appendChild(tabela);
ulExibir.appendChild(wrapper);
// Parte da lista de gerenciamento (em formato de tabela)
ulGerenciar.innerHTML = ""; // Limpa

// Criar tabela
const tabelaGerenciar = document.createElement("table");
tabelaGerenciar.className = "tabela-produtos-gerenciar";
tabelaGerenciar.innerHTML = `
  <thead>
    <tr>
      <th>Produto</th>
      <th>Preço</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    ${produtos.map((p, index) => `
      <tr>
        <td>${p.nome}</td>
        <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
        <td class="icones-acao">
          <button onclick="editarProduto(${index})" title="Editar" class="btn-icon">✏️</button>
          <button onclick="excluirProduto(${index})" title="Excluir" class="btn-icon">🗑️</button>
        </td>
      </tr>
    `).join("")}
  </tbody>
`;

// Adiciona tabela no painel
ulGerenciar.appendChild(tabelaGerenciar);

  // Atualiza datalist
  const datalist = document.getElementById("lista-produto");
  if (datalist) {
    datalist.innerHTML = "";
    produtos.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.nome;
      datalist.appendChild(opt);
    });
  }
};

document.getElementById("form-produto").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome-produto").value.trim();
  const preco = parseFloat(document.getElementById("preco-produto").value);
  const indexExistente = produtos.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());

  const novoProduto = { nome, preco };

  if (indexExistente !== -1) {
    produtos[indexExistente] = novoProduto;
    showMsg("Produto atualizado!", "mensagem-produto");
  } else {
    produtos.push(novoProduto);
    showMsg("Produto adicionado!", "mensagem-produto");
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  document.getElementById("form-produto").reset();
  renderProdutos();
});

function editarProduto(index) {
  const p = produtos[index];
  document.getElementById("nome-produto").value = p.nome;
  document.getElementById("preco-produto").value = p.preco;
  document.getElementById("form-produto").scrollIntoView({ behavior: 'smooth' });
}


function excluirProduto(index) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderProdutos();
  }
}

// ---------------------
// Registro de venda
// ---------------------
document.getElementById("venda-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const produto = document.getElementById("produto").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
const valorUnitario = produtos.find(p => p.nome.toLowerCase() === produto.toLowerCase())?.preco || 0;
const valor = quantidade * valorUnitario;
  const forma = document.getElementById("forma").value;
  const data = new Date().toLocaleString();

  const venda = { data, produto, valor, forma, quantidade, valorUnitario };
  let vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
  vendas.push(venda);
  localStorage.setItem("vendas", JSON.stringify(vendas));

  showMsg("✅ Venda registrada!", "mensagem-sucesso");
  document.getElementById("venda-form").reset();
});

// ---------------------
// Relatório
// ---------------------
function gerarRelatorio() {
  const vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
  const totalPorForma = {};

 const segundoTrabalhador = (localStorage.getItem("segundoTrabalhador") || "").trim();

 const horaLoginSalva = localStorage.getItem("horaLogin");
  let horaLoginFormatada = "";
  if (horaLoginSalva) {
    const dataLogin = new Date(horaLoginSalva);
    horaLoginFormatada = `${dataLogin.toLocaleDateString()} - ${dataLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  vendas.forEach((v) => {
    if (!totalPorForma[v.forma]) totalPorForma[v.forma] = 0;
    totalPorForma[v.forma] += v.valor;
  });

  const agrupado = {};
  vendas.forEach(v => {
    if (!agrupado[v.produto]) {
      agrupado[v.produto] = { quantidade: 0, total: 0, unitario: v.valorUnitario };
    }
    agrupado[v.produto].quantidade += v.quantidade;
    agrupado[v.produto].total += v.valor;
  });

// Montar a tabela HTML
let rel = `<h2>📊 Relatório de Vendas</h2>`;
rel += `<p><strong>Início do turno:</strong> ${horaLoginFormatada || "—"}</p>`;

  rel += `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width:100%;">`;
  rel += `<thead>
    <tr style="background-color: #00509e;">
      <th>Produto</th>
      <th>Quantidade</th>
    </tr>
  </thead><tbody>`;

  for (const nome in agrupado) {
    const { quantidade, unitario, total } = agrupado[nome];
    rel += `<tr>
      <td>${nome || "—"}</td>
      <td>${quantidade || 0}</td>
    </tr>`;
  }

  rel += `</tbody></table>`;

  // Por forma de pagamento
 // Por forma de pagamento
rel += `<h3>Forma de Pagamento</h3>`;
rel += `<table class="tabela-pagamento">
          <thead>
            <tr>
              <th>Forma</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>`;
for (const forma in totalPorForma) {
  rel += `<tr>
            <td>${forma}</td>
            <td>R$ ${totalPorForma[forma].toFixed(2)}</td>
          </tr>`;
}
rel += `</tbody></table>`;

  // Total geral e data
  const totalGeral = vendas.reduce((sum, v) => sum + v.valor, 0);
  rel += `<p><strong>Total Geral:</strong> R$ ${totalGeral.toFixed(2)}</p>`;

  // Exibe o HTML no elemento
  document.getElementById("relatorio").innerHTML = rel;
}



// ---------------------
function showMsg(msg, elId) {
  const el = document.getElementById(elId);
  el.textContent = msg;
  setTimeout(() => (el.textContent = ""), 3000);
}

// Quando selecionar produto, preencher valor automaticamente
function atualizarValorTotal() {
  const nomeSelecionado = document.getElementById("produto").value;
  const quantidade = Number(document.getElementById("quantidade").value || 0);
  const produtoEncontrado = produtos.find(p => p.nome.toLowerCase() === nomeSelecionado.toLowerCase());

  if (produtoEncontrado) {
    const unit = Number(produtoEncontrado.preco);
    const total = unit * quantidade;

    document.getElementById("valor").value = unit.toFixed(2);
    document.getElementById("valor-total").value = total.toFixed(2);

  } else if (total === 0) {
    document.getElementById("valor-total").value = unit.toFixed(2);

  } else {
        document.getElementById("valor").value = "";

  }
  }
// Atualiza valor ao mudar o produto
document.getElementById("produto").addEventListener("input", atualizarValorTotal);

// Atualiza valor ao mudar a quantidade
document.getElementById("quantidade").addEventListener("input", atualizarValorTotal);

// Inicia lista
renderProdutos();

// Evento do botão "Atualizar Relatório"
document.getElementById("btn-gerar-relatorio").addEventListener("click", gerarRelatorio);
