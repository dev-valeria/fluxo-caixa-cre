  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    document.getElementById("btn-baixar-pdf").addEventListener("click", () => {
      const vendas = JSON.parse(localStorage.getItem("vendas") || "[]");

      // Agrupar por produto
      const agrupado = {};
      vendas.forEach(v => {
        if (!agrupado[v.produto]) {
          agrupado[v.produto] = { quantidade: 0, total: 0, unitario: v.valor };
        }
        agrupado[v.produto].quantidade++;
        agrupado[v.produto].total += v.valor;
      });

      // Aba 1: Detalhamento
      const detalhes = [["Produto", "Quantidade", "Valor Unitário (R$)", "Valor Total (R$)"]];
      for (let prod in agrupado) {
        const info = agrupado[prod];
        detalhes.push([prod, info.quantidade, info.unitario.toFixed(2), info.total.toFixed(2)]);
      }

      // Aba 2: Totais por forma de pagamento
      const totais = {};
      vendas.forEach(v => {
        if (!totais[v.forma]) totais[v.forma] = 0;
        totais[v.forma] += v.valor;
      });

      const resumo = [["Forma de Pagamento", "Valor Total (R$)"]];
      for (let forma in totais) {
        resumo.push([forma, totais[forma].toFixed(2)]);
      }

      const totalGeral = vendas.reduce((s, v) => s + v.valor, 0);
      resumo.push(["Total Geral", totalGeral.toFixed(2)]);

      // Gerar planilha
      const wb = XLSX.utils.book_new();
      const ws1 = XLSX.utils.aoa_to_sheet(detalhes);
      const ws2 = XLSX.utils.aoa_to_sheet(resumo);
      XLSX.utils.book_append_sheet(wb, ws1, "Detalhamento");
      XLSX.utils.book_append_sheet(wb, ws2, "Totais");

      // Download
      XLSX.writeFile(wb, "Relatorio_Cafe.xlsx");
    });
