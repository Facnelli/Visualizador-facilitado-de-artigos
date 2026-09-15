export type ArticleBlock = {
  id: string;
  kind: "heading" | "paragraph" | "list" | "quote" | "figure" | "table";
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  rows?: string[][];
};

export type Article = {
  id: string;
  title: string;
  originalTitle?: string;
  authors: string;
  year: number;
  journal: string;
  doi: string;
  license: string;
  readingMinutes: number;
  note: string;
  category: string;
  railLabel: string;
  viewer: "blocks" | "pdf";
  blocks?: ArticleBlock[];
  sourceUrl?: string;
  pageCount?: number;
};

const abdiArticle = {
  id: "abdi-amrit-2021",
  title: "Uma revisão dos métodos de previsão de tempo de viagem e de chegada em redes rodoviárias",
  originalTitle: "A review of travel and arrival-time prediction methods on road networks: classification, challenges and opportunities",
  authors: "Asad Abdi e Chintan Amrit",
  year: 2021,
  journal: "PeerJ Computer Science, 7:e689",
  doi: "https://doi.org/10.7717/peerj-cs.689",
  license: "CC BY 4.0",
  readingMinutes: 42,
  category: "Revisão sistemática",
  railLabel: "Abdi & Amrit",
  viewer: "blocks",
  note: "Edição traduzida e adaptada para leitura. O texto corrido foi reorganizado em blocos curtos; as extensas tabelas de inventário foram condensadas, preservando os resultados e comparações centrais. Figuras permanecem no idioma original.",
  blocks: [
    { id: "resumo", kind: "heading", text: "Resumo" },
    { id: "resumo-1", kind: "paragraph", text: "O transporte desempenha um papel central na economia atual. Por isso, os Sistemas Inteligentes de Transporte (ITS) têm recebido atenção crescente da comunidade científica. As revisões anteriores costumavam tratar apenas da previsão do tempo de viagem e não abrangiam os estudos mais recentes. Este trabalho examina, em conjunto, pesquisas sobre previsão do tempo de chegada e de viagem em redes rodoviárias, com base em artigos publicados recentemente." },
    { id: "resumo-2", kind: "paragraph", text: "O estudo oferece uma revisão ampla da literatura, propõe uma taxonomia dos métodos existentes e identifica desafios e limitações. Também reúne métricas de avaliação, fatores que influenciam as previsões, fontes de dados e conceitos essenciais. Após um processo rigoroso de seleção e análise, os autores apresentam uma visão integrada das questões ainda abertas e de oportunidades viáveis para pesquisas futuras." },
    { id: "palavras-chave", kind: "quote", text: "Palavras-chave: sistemas inteligentes de transporte; previsão do tempo de viagem; previsão do tempo de chegada; características espaço-temporais." },

    { id: "introducao", kind: "heading", text: "Introdução" },
    { id: "introducao-1", kind: "paragraph", text: "O transporte traz benefícios como distribuição de cargas, acesso a serviços e melhoria da qualidade de vida, mas também cria desafios: consumo de combustível, congestionamentos, emissões de carbono e custos econômicos e ambientais. Sistemas de transporte eficientes e sustentáveis ajudam empresas, planejadores e formuladores de políticas a escolher soluções melhores para esses problemas." },
    { id: "introducao-2", kind: "paragraph", text: "O avanço da tecnologia da informação e a disponibilidade de grandes conjuntos de dados de mobilidade ampliaram a capacidade de modelar o transporte. Entre as aplicações estão a previsão do tempo de chegada (ATP) e a previsão do tempo de viagem (TTP). Os ITS também beneficiam passageiros, ao reduzir incerteza e espera, e operadores, ao elevar confiabilidade, competitividade e qualidade do serviço." },
    { id: "introducao-3", kind: "paragraph", text: "Apesar dos avanços, permanecem problemas técnicos e conceituais. A grande variedade de aplicações torna necessário organizar o estado da arte, identificar deficiências e comparar métodos. Esta revisão sistemática foi concebida para oferecer uma visão holística de modelos de ATP e TTP em redes rodoviárias, cobrindo métodos, fatores de influência, fontes de dados, métricas, limitações e oportunidades futuras." },
    { id: "contribuicoes", kind: "list", text: "Principais contribuições da revisão", items: ["Trata simultaneamente de previsão de chegada e de viagem, em vez de restringir-se a apenas uma delas.", "Abrange trabalhos publicados entre 2010 e 2021 e inclui técnicas históricas, estatísticas, de aprendizado de máquina e híbridas.", "Compara fontes de dados, fatores explicativos, métricas de avaliação, vantagens e limitações.", "Organiza informação útil tanto para pesquisadores quanto para quem desenvolve aplicações de transporte."] },

    { id: "metodologia", kind: "heading", text: "Metodologia da revisão" },
    { id: "metodologia-1", kind: "paragraph", text: "Os autores empregaram uma revisão sistemática da literatura, seguindo as diretrizes PRISMA. Uma revisão desse tipo usa processos definidos para localizar, selecionar e interpretar estudos capazes de responder a perguntas de pesquisa, revelar lacunas e sustentar conclusões." },
    { id: "perguntas", kind: "list", text: "Perguntas de pesquisa", items: ["Quais técnicas são usadas para modelar a previsão de tempo de viagem e de chegada em vias rodoviárias?", "Quais desafios estão associados às técnicas existentes?", "Como analisar métricas, fontes de dados e fatores envolvidos nesses problemas?", "Quais oportunidades podem orientar trabalhos futuros?"] },
    { id: "busca", kind: "paragraph", text: "A busca consultou IEEE Xplore, Google Scholar, ACM Digital Library, ScienceDirect, Springer, SAGE e Web of Science. Os termos combinaram expressões equivalentes a tempo de viagem, tempo de chegada, previsão, estimativa, método, técnica e algoritmo. Operadores booleanos AND e OR foram usados para ampliar sinônimos e relacionar os conceitos." },
    { id: "criterios", kind: "list", text: "Critérios de seleção", items: ["Inclusão: artigos revisados por pares de 2010 a 2021; texto completo disponível; presença de técnica de ATP ou TTP; resposta a pelo menos uma pergunta da revisão.", "Exclusão: editoriais, resumos e materiais não publicados; textos sem versão em inglês; duplicatas; trabalhos sem detalhes suficientes sobre arquitetura, métodos ou aplicação.", "A triagem considerou título, resumo e conclusão antes da leitura e extração detalhada."] },
    { id: "figura-prisma", kind: "figure", src: "/article-assets/abdi-figure-000.png", alt: "Fluxograma PRISMA do processo de seleção", caption: "Figura 1. Processo de busca, triagem, elegibilidade e inclusão adotado pelos autores." },
    { id: "selecao", kind: "paragraph", text: "A busca inicial recuperou 188 registros. Após remover duplicatas e aplicar os critérios de inclusão e exclusão, 115 artigos foram incluídos na revisão. Para cada estudo, os autores registraram técnica empregada, fonte de dados, fatores considerados e métricas de avaliação." },
    { id: "figura-visao", kind: "figure", src: "/article-assets/abdi-figure-001.png", alt: "Visão geral da revisão sobre ATP e TTP", caption: "Figura 2. Visão geral: abordagens, dados, fatores, métricas e direções futuras." },

    { id: "analise", kind: "heading", text: "Análise e discussão" },
    { id: "analise-1", kind: "paragraph", text: "Os métodos encontrados foram organizados em três famílias principais: abordagens baseadas em dados históricos, abordagens estatísticas e abordagens de aprendizado de máquina. Em algumas situações, métodos híbridos combinam técnicas de famílias diferentes para aproveitar vantagens complementares ou reduzir limitações individuais." },
    { id: "taxonomia", kind: "heading", text: "Taxonomia dos métodos" },
    { id: "historicos", kind: "paragraph", text: "Métodos baseados em dados históricos estimam um período futuro a partir de viagens anteriores observadas no mesmo horário ou em condições semelhantes. São simples, rápidos e baratos, e podem separar os dados por dia da semana, mês ou outra característica. As variantes mais comuns usam o tempo médio de viagem ou a velocidade média histórica. Seu principal problema é depender da estabilidade do trânsito: acidentes, obras e congestionamentos inesperados reduzem bastante a precisão." },
    { id: "regressao", kind: "paragraph", text: "Métodos de regressão explicam uma variável dependente, como tempo de chegada, por meio de variáveis independentes, como distância, interseções, congestionamento e tempo de parada. Ao contrário de uma média histórica simples, a regressão consegue incorporar mudanças nas condições, mas seu desempenho depende da escolha correta das variáveis e das relações entre elas. Relações fortemente não lineares são difíceis de representar com regressão linear." },
    { id: "kalman", kind: "paragraph", text: "O filtro de Kalman é um método recursivo que atualiza continuamente a estimativa de um estado a partir de medições possivelmente ruidosas ou incertas. Ele alterna duas etapas: previsão, em que projeta o estado e sua incerteza; e correção, em que incorpora uma nova medição. Sua forma é simples, exige pouca computação e se adapta bem a aplicações em tempo real, navegação e séries temporais." },
    { id: "ml", kind: "paragraph", text: "No aprendizado de máquina, o sistema extrai padrões relevantes de grandes conjuntos de dados e lida com relações complexas. Métodos supervisionados aprendem com exemplos rotulados; não supervisionados procuram estrutura em dados sem rótulos; e semissupervisionados combinam os dois tipos. Entre as técnicas encontradas estão SVM, árvores de decisão, K-NN, florestas aleatórias, redes neurais artificiais, CNN, RNN, GRU e LSTM." },
    { id: "deep", kind: "paragraph", text: "O aprendizado profundo ganhou espaço porque modelos rasos podem ser insuficientes diante de grandes volumes e da complexidade dos dados de tráfego. Redes profundas têm várias camadas ocultas e conseguem modelar relações não lineares. Entretanto, um modelo treinado em uma região pode não funcionar bem em outra, pois geometria viária, controle de tráfego e padrões locais mudam." },
    { id: "figura-ia", kind: "figure", src: "/article-assets/abdi-figure-002.png", alt: "Relação entre inteligência artificial, aprendizado de máquina e aprendizado profundo", caption: "Figura 3. Subconjuntos da inteligência artificial e estrutura simplificada de uma rede neural profunda." },
    { id: "hibridos", kind: "paragraph", text: "Métodos híbridos combinam duas ou mais abordagens. Exemplos incluem SVM com filtro de Kalman, filtro de Kalman com K-NN e CNN com LSTM. A motivação é lidar melhor com incerteza e reunir recursos adequados a diferentes aspectos do problema: redes recorrentes capturam sequências temporais, enquanto outros modelos representam relações espaciais, agrupamentos ou atualizações em tempo real." },

    { id: "resultados-ttp", kind: "heading", text: "Resultados para previsão do tempo de viagem" },
    { id: "ttp-1", kind: "paragraph", text: "Entre os artigos sobre TTP, 64% utilizaram aprendizado de máquina, 32% métodos estatísticos e 4% dados históricos. A predominância do aprendizado de máquina foi atribuída à capacidade de processar dados multidimensionais, descobrir padrões difíceis de perceber manualmente, operar em ambientes dinâmicos e produzir previsões em tempo real." },
    { id: "figura-ttp", kind: "figure", src: "/article-assets/abdi-figure-003.png", alt: "Distribuição das famílias de técnicas para TTP", caption: "Figura 4. Distribuição das abordagens de previsão do tempo de viagem." },
    { id: "ttp-2", kind: "paragraph", text: "A rede neural artificial foi a técnica individual mais frequente, com 19%. CNN, LSTM e regressão linear apareceram com 6% cada; K-NN e filtro de Kalman, com 5% cada. A preferência por redes neurais decorre de sua capacidade de representar relações complexas e não lineares sem limitar o número de variáveis de entrada." },
    { id: "figura-ttp-metodos", kind: "figure", src: "/article-assets/abdi-figure-004.png", alt: "Técnicas mais usadas para TTP", caption: "Figura 5. Frequência das técnicas mais usadas em TTP." },

    { id: "resultados-atp", kind: "heading", text: "Resultados para previsão do tempo de chegada" },
    { id: "atp-1", kind: "paragraph", text: "Para ATP, a revisão reporta 56% de métodos de aprendizado de máquina, 42% de métodos estatísticos e 2% de métodos históricos. Entre as técnicas individuais, regressão linear e redes neurais artificiais aparecem com 14% cada; SVM com 12%; filtro de Kalman com 11%; e LSTM com 5%. Combinações como algoritmo genético com SVM também foram recorrentes." },
    { id: "figura-atp", kind: "figure", src: "/article-assets/abdi-figure-005.png", alt: "Distribuição das famílias de técnicas para ATP", caption: "Figura 6. Distribuição das abordagens de previsão do tempo de chegada." },
    { id: "figura-atp-metodos", kind: "figure", src: "/article-assets/abdi-figure-006.png", alt: "Técnicas mais usadas para ATP", caption: "Figura 7. Frequência das técnicas mais usadas em ATP." },

    { id: "forcas", kind: "heading", text: "Pontos fortes e limitações" },
    { id: "comparacao", kind: "table", text: "Comparação das famílias", rows: [["Família", "Vantagens", "Limitações"], ["Dados históricos", "Implementação simples, rapidez e baixo custo computacional.", "Baixa precisão quando o padrão atual difere do histórico."], ["Paramétrica", "Interpretação mais direta; regressão e séries temporais são rápidas; Kalman adapta parâmetros em tempo real.", "Exige definir a forma matemática e sofre com relações complexas, não lineares e variáveis correlacionadas."], ["Não paramétrica / ML", "Captura padrões não lineares, ruído e alta dimensionalidade; tende a obter previsões robustas.", "Requer muitos dados, treinamento e hardware; pode funcionar como caixa-preta e transferir-se mal entre locais."], ["Híbrida", "Combina qualidades complementares e pode reagir melhor a situações imprevistas.", "Projeto e ajuste são mais complexos; exige compreender bem cada componente."]] },
    { id: "escolha", kind: "paragraph", text: "Não existe um método universalmente superior. Se custo computacional baixo e simplicidade forem prioritários, técnicas históricas ou paramétricas podem ser adequadas. Se a precisão for mais importante, houver muitos dados e o custo de treinamento for aceitável, modelos não paramétricos podem ser melhores. O contexto de uso, a qualidade dos dados e a estabilidade do tráfego devem orientar a escolha." },

    { id: "fatores", kind: "heading", text: "Fatores que influenciam ATP e TTP" },
    { id: "fatores-intro", kind: "paragraph", text: "A qualidade da previsão depende não apenas do algoritmo, mas também das variáveis disponíveis. Os autores agrupam os fatores em cinco categorias: temporais, informações de tráfego, espaciais, aumentados e informações personalizadas." },
    { id: "fatores-lista", kind: "list", text: "Cinco grupos de fatores", items: ["Espaciais: tipo e geometria da via, comprimento, largura, número de faixas, interseções, travessias, estacionamentos, passagens ferroviárias, obras, paradas e conversões.", "Temporais: horário de partida, duração do percurso, hora do dia, pico ou fora de pico, dia da semana, feriados, estações e tempo de parada.", "Tráfego: velocidade, fluxo, volume, densidade, ocupação, congestionamentos, acidentes, semáforos e filas.", "Aumentados: clima, políticas públicas, temperatura, mapas, condições da via e aderência ao horário programado.", "Personalizados: estilo, experiência e preferências do motorista, que podem produzir tempos diferentes no mesmo trecho."] },
    { id: "tempo-parada", kind: "paragraph", text: "Em transporte público, o tempo de parada depende do número de passageiros embarcando e desembarcando, da quantidade de portas, do sistema de cobrança, da lotação, do veículo, do horário, do clima e do comportamento dos usuários. A demanda de passageiros costuma ser o fator dominante. Já o atraso corresponde à diferença entre o horário programado e o horário efetivo." },
    { id: "figura-fatores", kind: "figure", src: "/article-assets/abdi-figure-007.png", alt: "Distribuição das categorias de fatores", caption: "Figura 8. Fatores temporais representam 47% dos usos, informações de tráfego 26%, fatores espaciais 20%, fatores aumentados 6% e informações personalizadas 1%." },
    { id: "fatores-combinados", kind: "paragraph", text: "Os fatores temporais são os mais utilizados. Tempo de viagem, horário de partida, tempo de parada, paradas de ônibus, dia e horário, distância, velocidade, clima e congestionamento aparecem com maior frequência. Combinações espaço-temporais e entre tempo e tráfego são comuns; a informação personalizada quase não é combinada com outras categorias, o que sugere uma lacuna de pesquisa." },
    { id: "figura-fatores-frequencia", kind: "figure", src: "/article-assets/abdi-figure-008.png", alt: "Frequência dos fatores de ATP e TTP", caption: "Figura 9. Frequência dos fatores específicos empregados nos modelos analisados." },

    { id: "dados", kind: "heading", text: "Sistemas de coleta de dados" },
    { id: "dados-1", kind: "paragraph", text: "Tecnologias como APC, AVL e AVI permitem extrair dados de tráfego de várias fontes e formatos. Os sistemas de coleta dividem-se em sensores fixos, que medem o tráfego em um ponto da via, e detectores ponto a ponto ou móveis, que acompanham um veículo entre posições." },
    { id: "dados-lista", kind: "list", text: "Principais fontes", items: ["Sensores fixos: laços indutivos, câmeras, micro-ondas, infravermelho, radar e RTMS medem volume, velocidade, ocupação, faixa e tipo de veículo.", "GPS e AVL: fornecem identificação, latitude, longitude, horário, direção e velocidade; o AVL combina localização em tempo real com transmissão a uma central.", "APC: sensores nas portas contam embarques e desembarques e registram horários, paradas, distância e duração entre pontos.", "AVI: identifica veículos por RFID, reconhecimento automático de placas, Bluetooth ou Wi-Fi; também é usado em pedágios e controle de acesso.", "DSRC e ETC: unidades à margem da rodovia comunicam-se com veículos para identificação e cobrança eletrônica.", "Câmeras e AVC: registram placas, fluxo, velocidade, faixa, classe e tipo do veículo."] },
    { id: "dados-2", kind: "paragraph", text: "A revisão encontrou forte concentração em GPS, laços sensores, pedágio eletrônico, AVL e AVI. Fontes como APC, ANPR, ATC, VDS, RTMS, DSRC, radares de micro-ondas e câmeras foram menos exploradas. Essa distribuição indica espaço para estudos que integrem fontes heterogêneas." },
    { id: "figura-dados", kind: "figure", src: "/article-assets/abdi-figure-009.png", alt: "Distribuição das fontes de dados", caption: "Figura 10. Distribuição dos artigos por sistema de coleta; GPS é a fonte mais frequente." },

    { id: "avaliacao", kind: "heading", text: "Como os modelos são avaliados" },
    { id: "avaliacao-1", kind: "paragraph", text: "Comparar métodos é difícil quando os estudos usam conjuntos de dados e restrições diferentes. Uma avaliação completa deveria considerar precisão, validade, robustez e capacidade de adaptação. Entretanto, a maioria dos trabalhos mede principalmente o erro médio. Uma única média pode esconder falhas em horários ou condições de tráfego específicos; por isso, os autores recomendam calcular erros também por período e por situação." },
    { id: "metricas", kind: "table", text: "Métricas mais citadas", rows: [["Métrica", "Interpretação"], ["MAE", "Média do valor absoluto dos erros; fácil de interpretar na unidade original."], ["RMSE", "Raiz da média dos erros quadráticos; penaliza mais fortemente erros grandes."], ["MAPE", "Média do erro percentual absoluto; facilita comparação relativa, mas é sensível a valores reais próximos de zero."], ["MSE", "Média dos erros ao quadrado; enfatiza discrepâncias maiores."], ["APE / MARE", "Versões percentual absoluta e relativa absoluta do erro."], ["MBE", "Erro médio com sinal; ajuda a identificar viés sistemático de super ou subestimação."]] },
    { id: "avaliacao-2", kind: "paragraph", text: "MAPE foi usada em 41% das ocorrências, RMSE em 28%, MAE em 13%, MSE em 13%, MARE em 3% e APE em 2%. As combinações mais comuns foram MAE + MAPE, MAE + RMSE + MAPE e RMSE + MAPE. Usar métricas complementares ajuda a enxergar simultaneamente magnitude, sensibilidade a grandes erros e desempenho relativo." },
    { id: "figura-metricas", kind: "figure", src: "/article-assets/abdi-figure-010.png", alt: "Distribuição das métricas de avaliação", caption: "Figura 11. Frequência das principais métricas de avaliação." },

    { id: "limitacoes", kind: "heading", text: "Limitações da revisão" },
    { id: "limitacoes-1", kind: "paragraph", text: "Os resultados estão limitados aos artigos recuperados nas bases selecionadas; livros, capítulos e teses não foram incluídos. Além disso, embora os fatores tenham sido classificados em cinco grupos, a revisão não determina experimentalmente qual grupo é mais eficaz para cada problema. Diferenças entre conjuntos de dados também impedem afirmar, de forma geral, qual método tem melhor desempenho." },

    { id: "implicacoes", kind: "heading", text: "Implicações" },
    { id: "implicacoes-1", kind: "paragraph", text: "O conhecimento organizado sobre ATP e TTP pode apoiar projetistas e desenvolvedores de ITS na escolha de métodos, dados, fatores e métricas. A revisão funciona como um mapa do campo: mostra o que já foi testado, onde há concentração de esforços e quais combinações ainda foram pouco estudadas." },

    { id: "conclusao", kind: "heading", text: "Conclusão" },
    { id: "conclusao-1", kind: "paragraph", text: "Após quatro fases de busca, 115 trabalhos foram selecionados. Os métodos foram classificados em históricos, estatísticos, de aprendizado de máquina e híbridos. O estudo também reuniu fontes de dados, fatores de influência, vantagens, limitações e métricas. Para TTP, predominou aprendizado de máquina com 64%; para ATP, os autores também apontam predominância de aprendizado de máquina, com 56%. Fatores temporais foram os mais usados, seguidos por informações de tráfego e fatores espaciais." },
    { id: "futuro", kind: "list", text: "Direções para trabalhos futuros", items: ["Ampliar o uso de modelos de IA, como ANN, CNN e LSTM, quando houver dados e infraestrutura adequados.", "Criar métodos híbridos que respondam melhor a situações imprevistas.", "Realizar comparações controladas entre métodos e testar o efeito de diferentes grupos de fatores.", "Usar relatos de trânsito de redes sociais como fonte aumentada, com critérios de qualidade.", "Detectar rapidamente congestionamentos não recorrentes e adaptar a previsão a mudanças inesperadas.", "Integrar múltiplas fontes de dados, pois uma fonte isolada raramente descreve todo o estado do tráfego.", "Combinar informação espacial, temporal, meteorológica, viária e comportamental.", "Investigar previsões personalizadas, reconhecendo que motoristas distintos produzem tempos diferentes no mesmo trajeto."] },
    { id: "declaracoes", kind: "paragraph", text: "O trabalho foi financiado pela NWO no projeto 439.16.120 (Complexity Methods for Predictive Synchromodality). Os financiadores não participaram do desenho, coleta, análise, decisão de publicação ou redação. Chintan Amrit era editor acadêmico da PeerJ; os autores declararam não haver outros conflitos de interesse." },
    { id: "citacao", kind: "quote", text: "Referência: ABDI, Asad; AMRIT, Chintan. A review of travel and arrival-time prediction methods on road networks: classification, challenges and opportunities. PeerJ Computer Science, v. 7, e689, 2021. DOI: 10.7717/peerj-cs.689." }
  ] satisfies ArticleBlock[],
} satisfies Article;

const caracasArticle = {
  id: "caracas-bernardinis-bastos-2018",
  title: "Pesquisa de qualidade no transporte público de Curitiba: análises e considerações",
  authors: "A. C. C. Caracas, M. A. P. Bernardinis e J. T. Bastos",
  year: 2018,
  journal: "1º Simpósio de Transportes do Paraná — UFPR",
  doi: "https://doi.org/10.5380/1stpr2018.artcomp17p173-181",
  license: "Documento integral na fonte UFPR",
  readingMinutes: 18,
  category: "Estudo de Curitiba",
  railLabel: "Caracas et al.",
  viewer: "pdf",
  pageCount: 9,
  sourceUrl: "https://acervodigital.ufpr.br/xmlui/bitstream/handle/1884/93197/3161.pdf?isAllowed=y&sequence=1",
  note: "Artigo integral, em português, exibido diretamente a partir do acervo oficial da UFPR. Use a navegação do leitor para salvar em qual página parou.",
} satisfies Article;

const qualionibusArticle = {
  id: "qualionibus-curitiba-2025",
  title: "Pesquisa de Satisfação QualiÔnibus — Curitiba 2025",
  authors: "WRI Brasil e URBS — Urbanização de Curitiba",
  year: 2025,
  journal: "Relatório da pesquisa do sistema de ônibus municipal de Curitiba — edição 2025/2",
  doi: "https://www.urbs.curitiba.pr.gov.br/pdf/transporte/Relat%C3%B3rio%20Quali%C3%94nibus%20-%20Curitiba%202025.pdf",
  license: "Documento integral na fonte URBS",
  readingMinutes: 55,
  category: "Relatório de pesquisa",
  railLabel: "QualiÔnibus",
  viewer: "pdf",
  pageCount: 67,
  sourceUrl: "https://www.urbs.curitiba.pr.gov.br/pdf/transporte/Relat%C3%B3rio%20Quali%C3%94nibus%20-%20Curitiba%202025.pdf",
  note: "Relatório integral, em português, exibido diretamente a partir da fonte oficial da URBS. Tabelas, gráficos e páginas permanecem no formato original.",
} satisfies Article;

export const articles: Article[] = [abdiArticle, caracasArticle, qualionibusArticle];
