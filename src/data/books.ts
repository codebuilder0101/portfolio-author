export type Area = "direito" | "filosofia" | "ficcao";

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  area: Area;
  year: number;
  description: string;
  amazonUrl: string;
}

export const AREA_LABELS: Record<Area, string> = {
  direito: "Direito",
  filosofia: "Filosofia",
  ficcao: "Ficção",
};

const AMAZON = "https://www.amazon.com.br/s?k=J+G+Brasio";

export const BOOKS: Book[] = [
  // Direito (8)
  { id: "d1", title: "Hermenêutica do Silêncio", subtitle: "Ensaios sobre interpretação constitucional", area: "direito", year: 2014, description: "Investigação dos limites do texto jurídico e do papel do não-dito na construção do sentido legal.", amazonUrl: AMAZON },
  { id: "d2", title: "O Direito como Linguagem", area: "direito", year: 2015, description: "Releitura da norma a partir das contribuições da filosofia analítica e da teoria do discurso.", amazonUrl: AMAZON },
  { id: "d3", title: "Curso de Teoria Geral do Estado", area: "direito", year: 2016, description: "Manual conciso que percorre a formação do Estado moderno e seus dilemas contemporâneos.", amazonUrl: AMAZON },
  { id: "d4", title: "Razão Pública e Decisão Judicial", area: "direito", year: 2017, description: "Diálogo entre o pensamento de Rawls, Habermas e a prática do constitucionalismo brasileiro.", amazonUrl: AMAZON },
  { id: "d5", title: "A Ordem do Contrato", area: "direito", year: 2018, description: "Sobre autonomia da vontade, justiça contratual e a função social do direito privado.", amazonUrl: AMAZON },
  { id: "d6", title: "Estudos de Direito Processual", area: "direito", year: 2019, description: "Coletânea de artigos sobre os princípios estruturantes do processo civil contemporâneo.", amazonUrl: AMAZON },
  { id: "d7", title: "Justiça e Forma", area: "direito", year: 2021, description: "Ensaio sobre o formalismo jurídico e os caminhos da hermenêutica brasileira.", amazonUrl: AMAZON },
  { id: "d8", title: "O Tempo da Lei", area: "direito", year: 2023, description: "Reflexão sobre temporalidade, vigência e a duração das instituições jurídicas.", amazonUrl: AMAZON },

  // Filosofia (11)
  { id: "f1", title: "Somismo: ensaios iniciais", area: "filosofia", year: 2016, description: "Primeira exposição sistemática do conceito de Somismo, fio condutor do pensamento do autor.", amazonUrl: AMAZON },
  { id: "f2", title: "O Eu e a Soma", area: "filosofia", year: 2017, description: "Sobre subjetividade, identidade e a unidade do sujeito na filosofia contemporânea.", amazonUrl: AMAZON },
  { id: "f3", title: "A Linguagem do Mundo", area: "filosofia", year: 2017, description: "Travessia entre Wittgenstein, Heidegger e a tradição hermenêutica.", amazonUrl: AMAZON },
  { id: "f4", title: "Tratado da Pequena Razão", area: "filosofia", year: 2018, description: "Defesa de uma racionalidade modesta, atenta às particularidades da experiência.", amazonUrl: AMAZON },
  { id: "f5", title: "Somismo II: a forma do todo", area: "filosofia", year: 2019, description: "Continuação e aprofundamento do programa filosófico iniciado em Somismo: ensaios iniciais.", amazonUrl: AMAZON },
  { id: "f6", title: "Notas sobre a Existência", area: "filosofia", year: 2019, description: "Fragmentos filosóficos no espírito de Pascal e Cioran, em prosa precisa e contida.", amazonUrl: AMAZON },
  { id: "f7", title: "Ética sem Sistema", area: "filosofia", year: 2020, description: "Pensar a vida boa sem reduzi-la a um conjunto fechado de regras.", amazonUrl: AMAZON },
  { id: "f8", title: "Filosofia do Comum", area: "filosofia", year: 2021, description: "Sobre o que partilhamos: língua, instituições, território, memória.", amazonUrl: AMAZON },
  { id: "f9", title: "Somismo III: variações", area: "filosofia", year: 2022, description: "Terceira parte do tríptico — variações temáticas em torno do conceito central.", amazonUrl: AMAZON },
  { id: "f10", title: "A Verdade Lenta", area: "filosofia", year: 2023, description: "Sobre o tempo do pensamento contra a urgência do mundo administrado.", amazonUrl: AMAZON },
  { id: "f11", title: "Sete Diálogos", area: "filosofia", year: 2024, description: "Diálogos filosóficos no estilo clássico, sobre amizade, justiça, morte e silêncio.", amazonUrl: AMAZON },

  // Ficção (6)
  { id: "x1", title: "A Casa de Inverno", area: "ficcao", year: 2017, description: "Romance breve sobre o retorno a uma casa de família no interior de Minas Gerais.", amazonUrl: AMAZON },
  { id: "x2", title: "O Cartógrafo", area: "ficcao", year: 2019, description: "A vida secreta de um homem que passou trinta anos desenhando mapas de cidades que nunca existiram.", amazonUrl: AMAZON },
  { id: "x3", title: "Contos do Litoral", area: "ficcao", year: 2020, description: "Doze contos passados em pequenas cidades de praia ao norte do país.", amazonUrl: AMAZON },
  { id: "x4", title: "A Hora Branca", area: "ficcao", year: 2022, description: "Novela sobre uma tradutora que perde a capacidade de distinguir suas palavras das alheias.", amazonUrl: AMAZON },
  { id: "x5", title: "O Visitante", area: "ficcao", year: 2023, description: "Um juiz aposentado recebe, todas as noites, a visita de um desconhecido que não fala.", amazonUrl: AMAZON },
  { id: "x6", title: "Pequeno Livro das Coisas", area: "ficcao", year: 2024, description: "Coletânea de prosa breve à maneira de Ramos Rosa e Bernardo Soares.", amazonUrl: AMAZON },
];
