# Teste 002 — site-apple
rubric_version: v1

## Prompt (verbatim)
# Teste 002 — UX: Recriar o site da Apple

Crie um único arquivo HTML que recrie a página inicial da Apple (apple.com). Navbar fixa no topo com o menu da Apple (logo, produtos, busca, sacola). Hero de produto em destaque: imagem grande centralizada, título grande, subtítulo e dois links ("Saiba mais ›" e "Comprar ›"). Abaixo, um grid de seções de produto alternando fundo claro e escuro, cada uma com título, subtítulo e CTAs centralizados. Tipografia, pesos e espaçamento fiéis à Apple (San Francisco / -apple-system), responsivo desktop e mobile, animações sutis no hover e ao rolar. Pode usar gradientes ou SVG como placeholder das imagens de produto. Não referencie nenhum outro arquivo.

## Rubrica v1 (binária pass/fail — 10 critérios)
| ID | Critério verificável (pass/fail) | Como testar |
|----|----------------------------------|-------------|
| C1 | Renderiza sem erro no console | abrir HTML, ler console — zero erro |
| C2 | Navbar fixa no topo | rolar a página — navbar permanece fixa no topo |
| C3 | Navbar tem logo, produtos, busca, sacola | inspeção visual — 4 elementos do menu presentes |
| C4 | Hero com imagem/placeholder grande centralizado + título grande | ver seção hero — visual grande centralizado + título destacado |
| C5 | Hero tem subtítulo e dois links "Saiba mais ›" e "Comprar ›" | conferir os dois links com esse texto |
| C6 | Grid de seções alternando fundo claro/escuro | rolar abaixo do hero — seções alternam bg claro e escuro |
| C7 | Cada seção com título, subtítulo e CTAs centralizados | inspecionar seções — todos esses elementos centralizados |
| C8 | Fonte San Francisco / -apple-system aplicada | inspecionar CSS — font-family usa -apple-system/SF |
| C9 | Responsivo desktop e mobile | redimensionar/DevTools mobile — layout adapta sem quebrar |
| C10 | Animações sutis no hover e ao rolar + sem arquivo externo próprio | passar mouse em CTAs e rolar — transições visíveis; HTML não referencia arquivo local próprio |
