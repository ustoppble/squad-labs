# Teste 003 — fisica-mouse
rubric_version: v1

## Prompt (verbatim)
# Teste 003 — Física com o mouse

Crie um único arquivo HTML com uma simulação de física interativa: várias bolinhas coloridas caindo com gravidade, que colidem entre si e com as bordas da tela de forma realista. Quando eu segurar o mouse, as bolinhas perto do cursor devem ser atraídas; quando eu clicar, elas se repelem numa explosão. Adicione um botão pra soltar 50 bolinhas novas. Tudo suave, 60fps.

## Rubrica v1 (binária pass/fail — 9 critérios)
| ID | Critério verificável (pass/fail) | Como testar |
|----|----------------------------------|-------------|
| C1 | Renderiza sem erro no console | abrir HTML, ler console — zero erro |
| C2 | Bolinhas coloridas aparecem na tela | inspeção visual — múltiplas bolinhas de cores variadas |
| C3 | Gravidade: bolinhas caem | observar — bolinhas aceleram para baixo |
| C4 | Colisão com as bordas da tela | observar — bolinhas quicam/param nas bordas, não escapam |
| C5 | Colisão entre bolinhas | observar bolinhas se encontrando — elas reagem, não se atravessam |
| C6 | Segurar mouse atrai bolinhas próximas | manter botão pressionado — bolinhas perto do cursor movem em direção a ele |
| C7 | Clicar repele em explosão | dar clique — bolinhas ao redor são empurradas para fora |
| C8 | Botão solta 50 bolinhas novas | clicar no botão — surgem 50 bolinhas adicionais |
| C9 | Animação suave ~60fps | observar/DevTools Performance — movimento fluido sem travar |
