/* =========================================================
   BARBA BRAVA — Catálogo central (fonte única de verdade)
   Importado por: index, produto, catalogo, checkout.
   Campos derivados da taxonomia em ARQUITETURA-INFORMACAO.md §3.
   ========================================================= */

const PRODUCTS = [
  {
    id: 1,
    nome: 'Creme Clássico Lavanda',
    slug: 'classico-lavanda',
    desc: 'Suave e aromático. Óleo de lavanda + aloe vera para uma barba hidratada e sem irritação.',
    descLonga:
      'O nosso ponto de partida e até hoje um dos favoritos. O óleo essencial de lavanda acalma a pele enquanto o aloe vera devolve a hidratação perdida na lâmina. O resultado é um barbear suave, sem ardência, com um aroma floral discreto que não compete com o seu perfume.',
    preco: 42.90,
    gradient: 'linear-gradient(145deg, #4a3a5e, #7c6b8a)',
    cor: '#7c6b8a',
    colecao: 'Essenciais',
    familiaOlfativa: 'Floral',
    tipoPele: 'Pele sensível',
    intensidade: 'Suave',
    ingredientes: ['Óleo essencial de lavanda', 'Aloe vera', 'Base vegetal sem parabenos'],
    volumeMl: 100,
    tags: ['aroma-suave', 'sem-parabenos', 'artesanal'],
  },
  {
    id: 2,
    nome: 'Creme Intenso Carvão Ativado',
    slug: 'intenso-carvao-ativado',
    desc: 'Purificante e detox. Carvão ativado + argila negra para pele profundamente limpa.',
    descLonga:
      'Para quem tem pele oleosa ou mista e sente a barba pesada ao fim do dia. O carvão ativado e a argila negra absorvem o excesso de oleosidade e impurezas, deixando a pele respirando. Detox de verdade a cada barbear, com deslizamento firme e acabamento matte.',
    preco: 54.90,
    gradient: 'linear-gradient(145deg, #1a1a1a, #3a3a38)',
    cor: '#3a3a38',
    colecao: 'Intermediários',
    familiaOlfativa: 'Neutro / Detox',
    tipoPele: 'Pele oleosa / mista',
    intensidade: 'Marcante',
    ingredientes: ['Carvão ativado', 'Argila negra', 'Base vegetal sem sulfatos'],
    volumeMl: 100,
    tags: ['sem-sulfatos', 'sem-parabenos', 'artesanal'],
  },
  {
    id: 3,
    nome: 'Creme Premium Sândalo & Cedro',
    slug: 'premium-sandalo-cedro',
    desc: 'O favorito dos barbeiros. Manteiga de karité + óleos de sândalo e cedro. Aroma marcante.',
    descLonga:
      'O creme que mais sai nas barbearias parceiras. A manteiga de karité nutre a fundo as peles mais secas, enquanto os óleos de sândalo e cedro entregam um aroma amadeirado, quente e inconfundível. Deslizamento de luxo e um pós-barba que dura o dia inteiro na lembrança.',
    preco: 67.90,
    gradient: 'linear-gradient(145deg, #5c3d22, #8b6343)',
    cor: '#8b6343',
    colecao: 'Premium / Gold',
    familiaOlfativa: 'Amadeirado',
    tipoPele: 'Pele seca',
    intensidade: 'Marcante',
    ingredientes: ['Manteiga de karité', 'Óleo de sândalo', 'Óleo de cedro'],
    volumeMl: 100,
    tags: ['favorito-dos-barbeiros', 'aroma-marcante', 'sem-parabenos', 'artesanal'],
  },
  {
    id: 4,
    nome: 'Creme Fresh Hortelã & Eucalipto',
    slug: 'fresh-hortela-eucalipto',
    desc: 'Sensação refrescante imediata. Ideal para quem barbeia pela manhã e quer acordar de vez.',
    descLonga:
      'O despertador da sua rotina matinal. Hortelã e eucalipto criam uma sensação gelada e revigorante no instante em que tocam a pele, abrindo os poros e acordando o rosto. Para quem barbeia cedo e quer começar o dia com energia — refrescante sem ressecar.',
    preco: 48.90,
    gradient: 'linear-gradient(145deg, #1e4a34, #2d6b4a)',
    cor: '#2d6b4a',
    colecao: 'Essenciais',
    familiaOlfativa: 'Herbal / Fresco',
    tipoPele: 'Despertar matinal',
    intensidade: 'Suave',
    ingredientes: ['Óleo de hortelã', 'Óleo de eucalipto', 'Base vegetal sem parabenos'],
    volumeMl: 100,
    tags: ['aroma-suave', 'sem-parabenos', 'artesanal'],
  },
  {
    id: 5,
    nome: 'Creme Artesanal Âmbar & Baunilha',
    slug: 'artesanal-ambar-baunilha',
    desc: 'Quente, envolvente e sofisticado. Notas de âmbar e baunilha com pós-barba incrivelmente macio.',
    descLonga:
      'A nossa fórmula mais sensorial. Notas quentes de âmbar e baunilha envolvem o barbear num aroma adocicado e sofisticado, daqueles que chamam atenção. O acabamento deixa a pele e a barba incrivelmente macias — um pós-barba que parece tratamento.',
    preco: 59.90,
    gradient: 'linear-gradient(145deg, #7a4a10, #c97020)',
    cor: '#c97020',
    colecao: 'Intermediários',
    familiaOlfativa: 'Oriental / Gourmand',
    tipoPele: 'Todos os tipos',
    intensidade: 'Marcante',
    ingredientes: ['Âmbar', 'Baunilha', 'Base vegetal sem parabenos'],
    volumeMl: 100,
    tags: ['aroma-marcante', 'sem-parabenos', 'artesanal'],
  },
  {
    id: 6,
    nome: 'Creme Gold Argão & Aloe',
    slug: 'gold-argao-aloe',
    desc: 'Nossa fórmula mais nobre. Óleo de argão marroquino + aloe vera para barbas exigentes.',
    descLonga:
      'O topo da linha Barba Brava. Óleo de argão marroquino — o "ouro líquido" — combinado com aloe vera para nutrir as barbas mais exigentes e as peles mais secas. Toque sedoso, brilho saudável e um aroma amadeirado suave. Para quem não abre mão do melhor.',
    preco: 79.90,
    gradient: 'linear-gradient(145deg, #6b5200, #c49628)',
    cor: '#c49628',
    colecao: 'Premium / Gold',
    familiaOlfativa: 'Amadeirado',
    tipoPele: 'Pele seca',
    intensidade: 'Suave',
    ingredientes: ['Óleo de argão marroquino', 'Aloe vera', 'Base vegetal sem parabenos'],
    volumeMl: 100,
    tags: ['formula-nobre', 'sem-parabenos', 'artesanal'],
  },
];

/* ---- Helpers de catálogo ---- */
function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

/* Expor em window para uso sem módulos (script clássico). */
window.PRODUCTS = PRODUCTS;
window.getProductBySlug = getProductBySlug;
window.getProductById = getProductById;
