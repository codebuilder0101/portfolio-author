export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: "Direito" | "Filosofia" | "Ficção" | "Ensaios";
  date: string; // ISO
  readingTime: string;
  content: string; // markdown-ish plain paragraphs separated by blank lines
}

export const POSTS: Post[] = [
  {
    slug: "somismo-uma-introducao",
    title: "Somismo: uma introdução",
    excerpt: "Por que o pensamento contemporâneo precisa recuperar a ideia de soma — e o que isso tem a ver com o sujeito, a linguagem e o comum.",
    category: "Filosofia",
    date: "2026-04-12",
    readingTime: "9 min",
    content: `Há um equívoco difundido segundo o qual pensar é, antes de tudo, separar. Distinguir, recortar, isolar variáveis. A modernidade filosófica fez disso o seu método, e a ciência herdou o gesto como pressuposto inquestionado.

O que chamo de Somismo é a hipótese contrária: a de que o pensamento, quando é fiel ao seu objeto, é sobretudo um trabalho de soma. Somar, aqui, não significa acumular nem confundir. Significa reconhecer que aquilo que se apresenta separado, na experiência, vem já amalgamado em formas, instituições, linguagens.

Os capítulos que se seguirão neste blog procuram desdobrar essa intuição em três frentes: o sujeito, a linguagem e o comum. Cada uma delas exige um vocabulário próprio e, talvez, paciência de quem lê.

Começo, portanto, pelo princípio: o que somamos quando dizemos eu?`,
  },
  {
    slug: "a-norma-e-o-silencio",
    title: "A norma e o silêncio",
    excerpt: "Notas sobre o que a lei não diz — e por que o intérprete não pode preencher esse vazio como se ele fosse seu.",
    category: "Direito",
    date: "2026-03-28",
    readingTime: "7 min",
    content: `Toda norma jurídica carrega, junto com o que prescreve, um campo de silêncio. Esse silêncio não é falta: é constitutivo. É o que permite que a regra funcione em casos que o legislador não previu — e, ao mesmo tempo, o que abre o espaço para o arbítrio do intérprete.

A grande tarefa da hermenêutica contemporânea, a meu ver, é distinguir esses dois usos do silêncio. Um deles é legítimo: o juiz lê o caso à luz do sistema. O outro é uma usurpação: o juiz substitui o sistema por suas preferências.

Os textos clássicos de hermenêutica jurídica brasileira raramente enfrentam essa distinção de modo direto. As páginas seguintes tentam fazê-lo.`,
  },
  {
    slug: "sobre-escrever-romances-curtos",
    title: "Sobre escrever romances curtos",
    excerpt: "Uma defesa, em parte autobiográfica, da forma breve em prosa — entre Clarice, Bernhard e os portugueses.",
    category: "Ficção",
    date: "2026-03-09",
    readingTime: "6 min",
    content: `Há um certo desconforto, no mercado editorial brasileiro, com romances de menos de duzentas páginas. Considera-se que o leitor merece mais, ou que o esforço editorial não compensa. Discordo, como leitor antes de discordar como autor.

Os livros que mais me marcaram raramente passam de cento e oitenta páginas. Penso em A Hora da Estrela, em O Náufrago de Bernhard, em quase tudo de Vergílio Ferreira. A brevidade, nesses casos, não é falta: é uma decisão de forma.

Escrever um romance curto exige eliminar tudo o que não pertence ao centro do livro. Não é menos trabalho — é, talvez, mais.`,
  },
  {
    slug: "leitura-lenta-em-tempos-rapidos",
    title: "Leitura lenta em tempos rápidos",
    excerpt: "Por que ainda vale a pena passar três horas com vinte páginas de um livro difícil.",
    category: "Ensaios",
    date: "2026-02-14",
    readingTime: "5 min",
    content: `A produtividade tornou-se o critério oculto de toda atividade intelectual. Lemos para resumir, anotar, citar — quase nunca para deixar que o texto trabalhe em nós.

Há uma forma antiga de leitura que talvez precisemos resgatar. Lê-se devagar, releem-se parágrafos, permite-se que a página resista. O ganho não é mensurável, mas é real.

Este blog é, antes de mais nada, uma defesa dessa forma de ler — e de escrever.`,
  },
  {
    slug: "notas-sobre-bernardo-soares",
    title: "Notas sobre Bernardo Soares",
    excerpt: "Uma leitura tardia do Livro do Desassossego e a tentação do fragmento.",
    category: "Filosofia",
    date: "2026-01-22",
    readingTime: "8 min",
    content: `Cheguei tarde ao Livro do Desassossego. Tinha vinte e oito anos, e por anos resisti à reputação que o cercava. Hoje, releio-o com a frequência com que outros releem a Bíblia.

Soares é o caso raro de um pensador que renunciou ao sistema sem renunciar ao rigor. Cada fragmento é uma pequena arquitetura, e o conjunto não soma — nem precisa somar — um edifício.

A tentação do fragmento, para quem escreve, é grande. Mas a forma só se justifica quando o pensamento se recusa a outra coisa.`,
  },
];
