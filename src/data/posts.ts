export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: "Direito" | "Filosofia" | "Ficção" | "Ensaios";
  date: string; // ISO
  readingTime: string;
  content: string; // paragraphs separated by blank lines
}

export const POSTS: Post[] = [
  {
    slug: "o-que-e-o-somismo",
    title: "O que é o Somismo — e por que o nome ainda me incomoda",
    excerpt:
      "O Somismo parte de uma pergunta simples: o que sobra quando você remove tudo aquilo que foi construído para dar sentido à existência? Uma hipótese filosófica que começa pela remoção — e descobre que o que permanece é mais do que esperávamos.",
    category: "Filosofia",
    date: "2026-05-10",
    readingTime: "7 min",
    content: `Quando publiquei o primeiro ensaio com esse título, algumas pessoas me perguntaram se eu havia inventado uma palavra. Havia, sim. E continua me incomodando — não porque seja ruim, mas porque toda palavra inventada carrega o risco de parecer mais importante do que aquilo que nomeia.

O Somismo parte de uma pergunta simples: o que sobra quando você remove tudo aquilo que foi construído para dar sentido à existência? Os sistemas, as narrativas, os propósitos emprestados, as certezas herdadas, os papéis que ocupamos sem nunca termos escolhido.

Não sobra nada grandioso. Sobra existência. E talvez seja justamente esse o ponto.

Não estou propondo um novo sistema filosófico — seria uma contradição em termos. Estou sugerindo a possibilidade de viver sem a necessidade de um. Sem verdades absolutas que precisem ser defendidas. Sem controle que precise ser mantido a qualquer custo. Sem sentido obrigatório que justifique tudo o que não tem justificativa.

O que me interessa é o que permanece quando o barulho para. E descobri, ao longo de anos escrevendo sobre isso, que o que permanece é mais do que eu esperava — e menos complicado do que eu temia.

Nós só somos. Talvez seja suficiente começar por aí.`,
  },
  {
    slug: "o-cartorio-resolveu",
    title: "Quando o cartório resolve — e o tribunal nem deveria saber",
    excerpt:
      "Há uma transformação silenciosa acontecendo no sistema jurídico brasileiro. Silenciosa porque ninguém anunciou. Silenciosa porque não deu manchete. Mas real — e muito mais importante do que qualquer reforma legislativa recente.",
    category: "Direito",
    date: "2026-04-18",
    readingTime: "6 min",
    content: `Há uma transformação silenciosa acontecendo no sistema jurídico brasileiro. Silenciosa porque ninguém anunciou. Silenciosa porque não deu manchete. Mas real — e, para muitas pessoas, muito mais importante do que qualquer reforma legislativa que eu possa lembrar.

Durante décadas, uma série de atos jurídicos dependia obrigatoriamente de uma sentença judicial. Inventário de herança: processo. Divórcio consensual: processo. Usucapião: processo. Isso significava tempo, dinheiro, serventias sobrecarregadas — e uma sensação permanente de que o Estado brasileiro era uma fila da qual ninguém saía satisfeito.

Hoje, muitos desses atos podem ser realizados em cartório. Com segurança jurídica, fé pública e fiscalização — e, em geral, com muito menos custo e prazo. Inventários extrajudiciais, divórcios por escritura, adjudicações compulsórias, atas notariais, apostilamentos, reconhecimento de paternidade: tudo isso saiu dos corredores do Judiciário e foi para o balcão do cartório.

Isso não é propaganda de cartório. É uma observação sobre como o Direito funciona quando consegue se aproximar da vida real das pessoas.

Passei anos trabalhando dentro de cartório. Aprendi que o Direito serve melhor quando quase não aparece — quando funciona antes que você precise lutar por ele. A desjudicialização foi, silenciosamente, o maior avanço de acesso à justiça das últimas duas décadas no Brasil.

Se você tem uma questão jurídica pendente e ainda não foi ao cartório, vale a pergunta: precisa mesmo ir ao tribunal?`,
  },
  {
    slug: "por-que-um-advogado-escreve-ficcao",
    title: "Por que um advogado escreve ficção",
    excerpt:
      "A pergunta vem com frequência, e de formas variadas. A versão mais direta: 'Mas você é advogado. Por que escreve ficção?' Nunca soube responder de modo completamente satisfatório. Mas tentarei.",
    category: "Ficção",
    date: "2026-03-29",
    readingTime: "6 min",
    content: `A pergunta vem com frequência, e de formas variadas. A versão mais direta: "Mas você é advogado. Por que escreve ficção?" A versão mais elegante: "Como você concilia as duas coisas?" Há também a versão que mais me intriga, porque revela um pressuposto: "Em que momento você parou de ser advogado e virou escritor?"

Nunca parei. E nunca precisei.

Escrever ficção, para mim, não é uma fuga da racionalidade jurídica. É o espaço onde essa racionalidade respira — onde as perguntas que o Direito precisa responder objetivamente podem continuar abertas, porque não é da objetividade que a ficção vive.

O Direito me ensinou a observar contradições humanas com alguma frieza. A ficção me ensinou que essa frieza, sozinha, não chega a lugar nenhum.

Nos meus romances aparecem, com frequência, personagens que não conseguem escapar de escolhas que fizeram no passado. Não é acidente. É o que vejo — no cartório, na mesa de conciliação, na escritura de um divórcio que levou vinte anos para acontecer. As pessoas carregam decisões que tomaram sem entender completamente as consequências. A ficção me permite explorar esse peso de uma forma que nenhum processo judicial permite.

Escrevo ficção pelo mesmo motivo que leio ficção: porque há perguntas que só existem em forma de história.`,
  },
  {
    slug: "o-peso-que-nao-pedimos-para-ter",
    title: "O peso que não pedimos para ter",
    excerpt:
      "Existe um cansaço específico do nosso tempo. Não é o cansaço de quem trabalhou muito. É o cansaço de quem pensa em círculo — que volta sempre ao mesmo ponto de partida sem ter avançado.",
    category: "Ensaios",
    date: "2026-03-05",
    readingTime: "5 min",
    content: `Existe um cansaço específico do nosso tempo. Não é o cansaço de quem trabalhou muito. É o cansaço de quem pensa demais — mas pensa em círculo. Que volta sempre ao mesmo ponto de partida sem ter avançado.

Chamo isso de peso. E percebo que carregamos muito mais do que aquilo que a vida realmente nos pede.

Carregamos expectativas que não são nossas — herdadas de contextos que já não existem. Carregamos comparações com versões idealizadas de pessoas reais. Carregamos culpa por escolhas que foram, no momento em que foram feitas, as melhores escolhas possíveis. Carregamos respostas para perguntas que ninguém nos fez.

Não estou propondo uma solução. Não existe método para descarregar o que levou anos para acumular, e tenho profunda desconfiança por livros que prometem o contrário. Mas percebo que o primeiro movimento é simples — talvez o único realmente necessário: reconhecer o que é seu e o que não é.

Muito do que carregamos não nos pertence. Foi colocado ali por outras pessoas, por outras épocas, por sistemas que precisavam que nós pesássemos mais para funcionarem melhor.

Talvez viver seja, de fato, apenas aprender a carregar menos. Não porque a vida fique mais leve — ela não fica. Mas porque ficamos, pouco a pouco, mais honestos sobre o que vale o peso.`,
  },
  {
    slug: "schopenhauer-em-florianopolis",
    title: "Uma tarde com Schopenhauer em Florianópolis",
    excerpt:
      "O livro começou de verdade numa tarde de verão no calçadão da Beira-Mar Norte. Eu caminhava sem propósito particular e me peguei pensando no que Schopenhauer acharia daquilo tudo. Acharia péssimo, provavelmente.",
    category: "Filosofia",
    date: "2026-02-11",
    readingTime: "7 min",
    content: `O livro começou de verdade numa tarde de verão em Florianópolis, no calçadão da Beira-Mar Norte. Eu caminhava sem propósito particular — um prazer que a vida adulta cobra caro — e me peguei pensando no que Schopenhauer acharia daquilo tudo.

Acharia péssimo, provavelmente.

Schopenhauer tinha uma desconfiança profunda em relação ao otimismo fácil, ao barulho social, à ilusão de que o movimento equivale ao progresso. Numa tarde de verão brasileiro, com turistas, música ao vivo e celulares voltados para o mar, ele teria muito material de trabalho.

Mas havia algo mais interessante na ideia do encontro. Schopenhauer, tirando o pessimismo sistemático, era um observador extraordinário da natureza humana. Entendeu o desejo antes de Freud. Entendeu o sofrimento antes que sofrimento virasse conteúdo de rede social. Entendeu que boa parte do que chamamos de felicidade é apenas ausência momentânea de dor — e que isso, ao contrário do que parece, não é uma má notícia.

Se o sofrimento é estrutural — se ele não é um defeito de fabricação, mas uma condição da existência — então não precisamos nos envergonhar dele nem fugir a qualquer custo. Podemos, talvez, aprender a observá-lo com um distanciamento que não é indiferença, mas lucidez.

O livro que escrevi não é um tratado de filosofia. É um encontro improvável, numa cidade que Schopenhauer nunca visitou, com um filósofo que nunca existiu lá. E como todo encontro improvável, revelou mais sobre mim do que sobre o convidado.`,
  },
  {
    slug: "voce-nao-precisa-do-tribunal",
    title: "Você provavelmente não precisa ir ao tribunal",
    excerpt:
      "Uma das coisas que mais me surpreende, depois de décadas de prática jurídica, é a quantidade de pessoas que chegam até um advogado — ou até um tribunal — com questões que poderiam ter sido resolvidas antes, de forma mais simples, mais barata e com menos desgaste emocional.",
    category: "Direito",
    date: "2026-01-20",
    readingTime: "5 min",
    content: `Uma das coisas que mais me surpreende, depois de décadas de prática jurídica, é a quantidade de pessoas que chegam até um advogado — ou até um tribunal — com questões que poderiam ter sido resolvidas antes, de forma mais simples, mais barata e, quase sempre, com muito menos desgaste emocional.

Não digo isso para diminuir o trabalho dos colegas. Digo porque é verdade, e porque acredito que o Direito serve melhor quando funciona antes de precisar brigar.

O Brasil tem, hoje, um sistema extrajudicial robusto — e pouco conhecido pelo cidadão comum. Cartórios que resolvem inventários em semanas, não anos. Câmaras de mediação que resolvem conflitos contratuais antes que virem processos. Conciliação extrajudicial para questões de família que, se fossem ao Judiciário, arrastariam meses de audiências, de desgaste, de honorários multiplicados.

Parte do meu trabalho, hoje, é estar antes do processo. Entender o conflito antes que ele vire litígio. E, quando possível, resolver sem que precise virar.

Isso não é evitar o Direito — é usá-lo no melhor momento. O tribunal existe para os casos em que o entendimento falhou, em que os interesses são irreconciliáveis, em que a fé pública de um cartório não é suficiente. Para esses casos, o Judiciário é indispensável. Para muitos outros, chegar até ele é, simplesmente, um caminho mais longo do que o necessário.

Se você tem uma questão jurídica em aberto, vale uma pergunta simples antes de qualquer coisa: existe um caminho antes do processo?`,
  },
];
