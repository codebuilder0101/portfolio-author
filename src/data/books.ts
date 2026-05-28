export type Area = "direito" | "filosofia" | "ficcao";

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  area: Area;
  year: number;
  description: string;
  amazonUrl: string;
  cover?: string;
}

export const AREA_LABELS: Record<Area, string> = {
  direito: "Direito",
  filosofia: "Filosofia",
  ficcao: "Ficção",
};

export const BOOKS: Book[] = [
  // ── Direito (8) ────────────────────────────────────────────────────────────
  {
    id: "d1",
    title: "O Que o Cartório Já Resolve Além dos Tribunais",
    area: "direito",
    year: 2025,
    description:
      "Uma leitura clara sobre o papel dos cartórios na desjudicialização: o que o cartório resolve, o que não resolve e quando o juiz continua indispensável.",
    amazonUrl:
      "https://www.amazon.com.br/Cart%C3%B3rio-Resolve-Al%C3%A9m-Tribunais-desjudicializa%C3%A7%C3%A3o-ebook/dp/B0GY9Q9L3W",
    cover: "/covers/cartorio-resolve-tribunais.jpg",
  },
  {
    id: "d2",
    title: "Direito Digital na Prática",
    area: "direito",
    year: 2025,
    description:
      "Guia prático sobre golpes digitais, fraudes no Pix, uso indevido de dados e seus direitos no mundo digital. Sem juridiquês, sem teoria inútil.",
    amazonUrl:
      "https://www.amazon.com.br/Direito-Digital-Pr%C3%A1tica-proteger-problemas-ebook/dp/B0GX2YS9PQ",
    cover: "/covers/direito-digital-pratica.jpg",
  },
  {
    id: "d3",
    title: "O Que Ninguém Te Conta Sobre Imóveis",
    area: "direito",
    year: 2024,
    description:
      "O que realmente acontece no mundo imobiliário — da compra à locação, dos contratos às armadilhas invisíveis. Para quem quer decidir melhor antes que seja tarde.",
    amazonUrl:
      "https://www.amazon.com.br/QUE-NINGU%C3%89M-CONTA-SOBRE-IM%C3%93VEIS-ebook/dp/B0FQRLJXCC",
    cover: "/covers/imoveis.jpg",
  },
  {
    id: "d4",
    title: "Do Juridiquês ao Raciocínio Jurídico",
    area: "direito",
    year: 2024,
    description:
      "Proposta de mudança de postura: sair do discurso vazio e alcançar um raciocínio jurídico consistente. Para estudantes, candidatos à OAB e jovens profissionais.",
    amazonUrl:
      "https://www.amazon.com.br/JURIDIQU%C3%8AS-RACIOC%C3%8DNIO-JUR%C3%8DDICO-Essencial-Iniciantes-ebook/dp/B0GHPV83LG",
    cover: "/covers/juridiques-raciocinio.jpg",
  },
  {
    id: "d5",
    title: "Vou Me Casar. E Agora?",
    area: "direito",
    year: 2025,
    description:
      "Guia completo do casamento — da cerimônia às questões jurídicas, do planejamento financeiro à vida depois da festa. Do sonho à realidade, de A a Z.",
    amazonUrl:
      "https://www.amazon.com.br/VOU-CASAR-AGORA-cerim%C3%B4nia-gastronomia-ebook/dp/B0GT53FW97",
    cover: "/covers/vou-me-casar.webp",
  },
  {
    id: "d6",
    title: "Não Quero Me Casar. E Agora?",
    area: "direito",
    year: 2025,
    description:
      "Quando um namoro pode virar união estável, como o patrimônio pode ser dividido e o que acontece na separação. Entenda as consequências das suas escolhas antes que seja tarde.",
    amazonUrl:
      "https://www.amazon.com.br/N%C3%A3o-Quero-casar-Agora-Direitos-ebook/dp/B0GTQWKRYP",
    cover: "/covers/nao-quero-casar.jpg",
  },
  {
    id: "d7",
    title: "Cartórios na Prática",
    area: "direito",
    year: 2023,
    description:
      "O que cada tipo de cartório realmente faz, todos os atos explicados um a um e orientação clara para evitar erros comuns. Para quem precisa e não sabe por onde começar.",
    amazonUrl:
      "https://www.amazon.com.br/Cart%C3%B3rios-Pr%C3%A1tica-cart%C3%B3rio-complica%C3%A7%C3%A3o-Direito-ebook/dp/B0DM6Z2LQJ",
    cover: "/covers/cartorios-pratica.jpg",
  },
  {
    id: "d8",
    title: "Direito Romano na Prática",
    area: "direito",
    year: 2025,
    description:
      "Uma viagem da Etrúria ao Fórum Romano até os contratos digitais, mostrando como o Direito romano ainda governa tudo ao seu redor — sem juridiquês, com profundidade.",
    amazonUrl:
      "https://www.amazon.com.br/DIREITO-ROMANO-NA-PR%C3%81TICA-todos-ebook/dp/B0GXX5V5NQ",
    cover: "/covers/direito-romano-pratica.webp",
  },

  // ── Filosofia (9) ──────────────────────────────────────────────────────────
  {
    id: "f1",
    title: "Como Viver com Menos Peso",
    area: "filosofia",
    year: 2025,
    description:
      "Uma conversa honesta sobre expectativas que aprisionam, padrões que se repetem e a busca por aprovação — inspirado no estoicismo, em linguagem acessível e humana.",
    amazonUrl:
      "https://www.amazon.com.br/Como-Viver-com-Menos-Peso-ebook/dp/B0GRVZ89KX",
    cover: "/covers/como-viver-menos-peso.jpg",
  },
  {
    id: "f2",
    title: "Com Nietzsche em Chichén Itzá",
    area: "filosofia",
    year: 2025,
    description:
      "Ficção filosófica sobre colapso, escolha e superação. Em diálogo imaginário com Nietzsche, entre o mar de Cancún e as ruínas maias, uma travessia interior.",
    amazonUrl:
      "https://www.amazon.com.br/Com-Nietzsche-Chich%C3%A9n-Itz%C3%A1-civiliza%C3%A7%C3%B5es-ebook/dp/B0GPYNCJZ5",
    cover: "/covers/nietzsche-chichen-itza.jpg",
  },
  {
    id: "f3",
    title: "Por Que Complicamos Tudo?",
    area: "filosofia",
    year: 2025,
    description:
      "Mostra os padrões que se repetem nas conversas, nas escolhas e nos conflitos — e como grande parte da complicação da vida vem do que fazemos com o que acontece.",
    amazonUrl:
      "https://www.amazon.com.br/Porque-Complicamos-Tudo-Dinheiro-expectativas-ebook/dp/B0GY9ZCQVW",
    cover: "/covers/complicamos-tudo.jpg",
  },
  {
    id: "f4",
    title: "Somismo",
    area: "filosofia",
    year: 2025,
    description:
      "O Somismo remove verdades absolutas, controle ilusório e a necessidade de sentido obrigatório — e observa o que permanece. Um ensaio filosófico direto, lúcido e sem concessões.",
    amazonUrl:
      "https://www.amazon.com.br/SOMISMO-Jo%C3%A3o-Gilberto-Camargo-Brasio-ebook/dp/B0GXR1PKS1",
    cover: "/covers/somismo.jpg",
  },
  {
    id: "f5",
    title: "Se Conselho Fosse Bom...",
    area: "filosofia",
    year: 2024,
    description:
      "Um convite a olhar com atenção para o que sempre ouvimos: frases repetidas, ideias populares, orientações que atravessaram gerações. Menos ilusão, mais consciência.",
    amazonUrl:
      "https://www.amazon.com.br/Conselho-Fosse-Bom-confundem-Filos%C3%B3ficas-ebook/dp/B0FVDY9TJX",
    cover: "/covers/se-conselho-fosse-bom.jpg",
  },
  {
    id: "f6",
    title: "Tomando um Chopp com Schopenhauer",
    area: "filosofia",
    year: 2024,
    description:
      "E se você encontrasse Schopenhauer num bar à beira-mar em Florianópolis? Um encontro improvável sobre desejo, sofrimento e as ilusões do século XXI.",
    amazonUrl:
      "https://www.amazon.com.br/Tomando-chopp-com-Schopenhauer-Filos%C3%B3ficas-ebook/dp/B0GNDP3PQQ",
    cover: "/covers/schopenhauer.jpg",
  },
  {
    id: "f7",
    title: "Em Siena com Sêneca",
    area: "filosofia",
    year: 2025,
    description:
      "Uma viagem a Siena que se transforma em algo inesperado — reflexões sobre tempo, poder e escolhas, com a presença de Sêneca e Marco Aurélio atravessando séculos.",
    amazonUrl:
      "https://www.amazon.com.br/Siena-com-S%C3%AAneca-presen%C3%A7as-m%C3%BAltiplos-ebook/dp/B0GWVR98R4",
    cover: "/covers/siena-seneca.jpg",
  },
  {
    id: "f8",
    title: "In Siena con Seneca",
    subtitle: "Italian Edition",
    area: "filosofia",
    year: 2025,
    description:
      "Un viaggio a Siena tra storia, filosofia e incontri inattesi. Con la presenza di Seneca e Marco Aurelio, un dialogo che attraversa secoli e domande ancora aperte.",
    amazonUrl:
      "https://www.amazon.com.br/Siena-Seneca-Quattro-presenze-Italian-ebook/dp/B0GWW5FFFQ",
    cover: "/covers/siena-seneca-italian.jpg",
  },
  {
    id: "f9",
    title: "Adultos 2.0",
    area: "filosofia",
    year: 2025,
    description:
      "A vida não ficou mais difícil. Você que continuou o mesmo enquanto tudo mudou. Situações que você reconhece, pensamentos que já teve — sem romantizar, sem aliviar.",
    amazonUrl:
      "https://www.amazon.com.br/ADULTOS-2-0-ficou-dif%C3%ADcil-continuou-ebook/dp/B0GYKJJ7X7",
    cover: "/covers/adultos-2-0.jpg",
  },

  // ── Ficção (6) ─────────────────────────────────────────────────────────────
  {
    id: "x1",
    title: "O Paiol",
    area: "ficcao",
    year: 2025,
    description:
      "Na Campania marcada pela guerra, Luigi e Livia descobrem um amor que parecia capaz de atravessar sobrenomes, famílias e ideologias. Um romance sobre o que o tempo não apaga.",
    amazonUrl:
      "https://www.amazon.com.br/Paiol-amor-que-tempo-resolveu-ebook/dp/B0GX2ZYNSG",
    cover: "/covers/paiol.jpg",
  },
  {
    id: "x2",
    title: "A Cratera",
    subtitle: "Quinze dias presos na selva",
    area: "ficcao",
    year: 2025,
    description:
      "No coração da Amazônia, seis sobreviventes de uma queda de avião descobrem que aquele vale isolado esconde algo muito mais antigo do que imaginavam. Thriller de sobrevivência.",
    amazonUrl:
      "https://www.amazon.com.br/Cratera-Quinze-presos-selva-observa-ebook/dp/B0GS6JLMWR",
    cover: "/covers/cratera.jpg",
  },
  {
    id: "x3",
    title: "The Crater",
    subtitle: "English Edition",
    area: "ficcao",
    year: 2025,
    description:
      "Seven survivors in a sixty-kilometer crater sealed by the Amazon canopy. Something is alive in the basin that the rest of the world declared extinct ten thousand years ago.",
    amazonUrl:
      "https://www.amazon.com.br/CRATER-English-J-Brasio-BRASIO-ebook/dp/B0GV14QFQ9",
    cover: "/covers/the-crater.jpg",
  },
  {
    id: "x4",
    title: "O Homem Que Viveu Três Séculos",
    area: "ficcao",
    year: 2025,
    description:
      "Entre lembranças familiares e reflexões filosóficas sobre o tempo, uma pergunta silenciosa: cada pessoa é apenas um indivíduo ou a continuação de muitas vidas anteriores?",
    amazonUrl:
      "https://www.amazon.com.br/Homem-Que-Viveu-Tr%C3%AAs-S%C3%A9culos-ebook/dp/B0GS744T4V",
    cover: "/covers/homem-tres-seculos.jpg",
  },
  {
    id: "x5",
    title: "A Caverna",
    area: "ficcao",
    year: 2025,
    description:
      "Em Fernando de Noronha, uma expedição científica descobre sinais de vida onde não deveria existir. Um thriller sobre poder, conhecimento e os limites do que estamos preparados para descobrir.",
    amazonUrl:
      "https://www.amazon.com.br/Caverna-toda-verdade-deve-revelada-ebook/dp/B0GXGPG4FL",
    cover: "/covers/caverna.jpg",
  },
  {
    id: "x6",
    title: "A Ilha Proibida",
    area: "ficcao",
    year: 2023,
    description:
      "Uma tempestade força o grupo a buscar abrigo na Ilha da Queimada Grande — isolada, proibida, viva. Thriller psicológico sobre controle, poder e os limites humanos.",
    amazonUrl:
      "https://www.amazon.com.br/Ilha-Proibida-para%C3%ADso-feito-visitantes-ebook/dp/B0DH1KKFNC",
    cover: "/covers/ilha-proibida.webp",
  },
];
