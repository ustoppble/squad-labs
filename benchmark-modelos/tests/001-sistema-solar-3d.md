# Teste 001 — sistema-solar-3d
rubric_version: v1

## Prompt (verbatim)
# Teste 001 — Sistema solar 3D navegável

Crie um único arquivo HTML com um sistema solar 3D interativo. O Sol no centro e os 8 planetas orbitando em velocidades realistas, cada um com cor e tamanho proporcionais. Eu quero poder voar pela cena com o mouse e o teclado (WASD), dar zoom, e clicar em um planeta pra ver o nome e dados dele. Use Three.js. Estrelas no fundo. Não referencie nenhum outro arquivo.

## Rubrica v1 (binária pass/fail — 10 critérios)
| ID | Critério verificável (pass/fail) | Como testar |
|----|----------------------------------|-------------|
| C1 | Renderiza sem erro no console | abrir HTML no browser, ler console — zero erro vermelho |
| C2 | Cena 3D aparece: Sol no centro visível | olhar a tela, confirmar esfera central (Sol) |
| C3 | 8 planetas presentes na cena | contar corpos orbitando além do Sol = 8 |
| C4 | Planetas orbitam (animação em movimento) | observar 5s — planetas mudam de posição ao redor do Sol |
| C5 | Tamanhos/cores distintos entre planetas | inspeção visual — raios e cores variam, não todos iguais |
| C6 | WASD movimenta a câmera pela cena | pressionar W/A/S/D — ponto de vista se desloca |
| C7 | Mouse controla orientação/olhar da câmera | mover mouse (drag ou look) — direção da câmera muda |
| C8 | Zoom funciona | scroll do mouse — aproxima/afasta a cena |
| C9 | Clicar num planeta mostra nome e dados | clicar num planeta — aparece nome + dados (raycast/painel) |
| C10 | Estrelas de fundo + sem arquivo externo próprio | ver estrelas no fundo; conferir HTML não referencia arquivo local próprio (Three.js via CDN OK) |
