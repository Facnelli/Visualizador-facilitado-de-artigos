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
  viewer: "blocks";
  blocks: ArticleBlock[];
  sourceUrl?: string;
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
  license: "Edição de leitura — fonte UFPR",
  readingMinutes: 16,
  category: "Estudo de Curitiba",
  railLabel: "Caracas et al.",
  viewer: "blocks",
  sourceUrl: "https://acervodigital.ufpr.br/xmlui/bitstream/handle/1884/93197/3161.pdf?isAllowed=y&sequence=1",
  note: "Edição de leitura estruturada a partir do artigo em português. A redação foi adaptada para telas pequenas, preservando método, resultados numéricos, discussão e conclusões. O original permanece disponível no acervo da UFPR.",
  blocks: [
    { id: "caracas-resumo", kind: "heading", text: "Resumo" },
    { id: "caracas-resumo-1", kind: "paragraph", text: "O estudo analisa uma pesquisa de qualidade realizada com usuários do transporte coletivo de Curitiba. O objetivo é compreender quem usa o sistema, como essas pessoas se deslocam, quanto tempo gastam, quais atributos avaliam melhor ou pior e o que pode explicar a permanência no ônibus mesmo quando existe acesso ao automóvel." },
    { id: "caracas-resumo-2", kind: "paragraph", text: "Os autores tratam a percepção do passageiro como parte essencial da avaliação do transporte público. A qualidade não é reduzida à operação técnica: envolve acesso, integração, informação, confiabilidade, conforto, segurança, rapidez e disponibilidade." },

    { id: "caracas-contexto", kind: "heading", text: "Contexto e problema de pesquisa" },
    { id: "caracas-contexto-1", kind: "paragraph", text: "O transporte coletivo tem papel decisivo na mobilidade urbana porque permite deslocamentos em larga escala usando menos espaço viário por passageiro. Ao mesmo tempo, a escolha do ônibus depende da experiência percebida pelo usuário. Um sistema operacionalmente eficiente pode ainda ser rejeitado se a viagem for desconfortável, insegura ou excessivamente demorada." },
    { id: "caracas-objetivos", kind: "list", text: "Questões examinadas", items: ["Qual é o perfil socioeconômico e de deslocamento dos passageiros pesquisados?", "Quais aspectos do serviço geram satisfação e insatisfação?", "Quanto tempo diário é consumido no transporte coletivo?", "Quem são os usuários que poderiam usar automóvel, mas continuam viajando de ônibus?", "Que fatores econômicos e operacionais podem explicar essa escolha?"] },

    { id: "caracas-metodo", kind: "heading", text: "Método e amostra" },
    { id: "caracas-metodo-1", kind: "paragraph", text: "A análise utiliza dados de uma pesquisa aplicada em Curitiba em 2008. Depois do tratamento das respostas, foram considerados 1.987 questionários válidos. O instrumento reuniu informações sobre frequência de uso, motivo da viagem, quantidade de ônibus utilizados, tempo de deslocamento, acesso ao automóvel e avaliação de diferentes atributos do sistema." },
    { id: "caracas-amostra", kind: "table", text: "Retrato geral da amostra", rows: [["Indicador", "Resultado"], ["Questionários válidos", "1.987"], ["Usavam transporte público em todos os dias úteis", "64%"], ["Viagens pendulares", "78%"], ["Motivo trabalho", "53%"], ["Motivo estudo", "25%"], ["Usavam linhas com canaletas exclusivas", "59%"], ["Usuários considerados cativos", "42%"]] },

    { id: "caracas-padroes", kind: "heading", text: "Padrões de deslocamento" },
    { id: "caracas-padroes-1", kind: "paragraph", text: "O passageiro usava, em média, 2,08 ônibus em cada sentido da viagem. Metade da amostra precisava de dois ônibus para chegar ao destino, o que evidencia a importância da integração física e tarifária. A predominância de viagens por trabalho e estudo também mostra um público que depende de regularidade e previsibilidade nos horários de pico." },
    { id: "caracas-tempo", kind: "table", text: "Tempo consumido no transporte", rows: [["Grupo", "Tempo médio diário de ida e volta"], ["Amostra total", "1 hora e 36 minutos"], ["Usuários diários", "1 hora e 44 minutos"], ["Usuários diários com automóvel e habilitação", "1 hora e 45 minutos"]] },
    { id: "caracas-congestionamento", kind: "paragraph", text: "Cerca de 59% dos respondentes percebiam muito congestionamento nos trajetos. Apenas 24% aceitariam pagar uma tarifa maior em troca de melhora do serviço. Esses resultados sugerem que rapidez e confiabilidade são relevantes, mas que qualquer proposta tecnológica também precisa respeitar a sensibilidade do usuário ao custo." },

    { id: "caracas-qualidade", kind: "heading", text: "Qualidade percebida" },
    { id: "caracas-qualidade-tabela", kind: "table", text: "Atributos destacados pelos usuários", rows: [["Avaliação mais favorável", "Avaliação mais crítica"], ["Acesso ao sistema", "Segurança"], ["Integração", "Conforto"], ["Informações", "Rapidez"], ["Confiabilidade", "Disponibilidade"]] },
    { id: "caracas-qualidade-1", kind: "paragraph", text: "A combinação dos resultados é importante para o projeto: informação e confiabilidade já eram dimensões valorizadas, enquanto rapidez aparecia entre as fragilidades. Um sistema de previsão de chegada não resolve sozinho os problemas operacionais, mas pode reduzir a incerteza percebida e tornar mais transparente o tempo de espera e de viagem." },

    { id: "caracas-escolha", kind: "heading", text: "Usuários com possibilidade de usar automóvel" },
    { id: "caracas-escolha-1", kind: "paragraph", text: "Entre os usuários diários, 176 pessoas possuíam carteira de habilitação e automóvel disponível, correspondendo a cerca de 9% da amostra total. Nesse grupo, 74,2% viajavam por trabalho e 22,7% por estudo; 52,3% usavam corredores exclusivos e aproximadamente metade precisava de dois ônibus por sentido." },
    { id: "caracas-escolha-2", kind: "paragraph", text: "Dos passageiros diários com acesso ao automóvel, 63% recebiam vale-transporte ou cartão custeado pelo empregador. Os autores consideram que o incentivo financeiro, somado a dificuldades de estacionamento e congestionamento, pode ajudar a explicar a escolha pelo ônibus. O resultado alerta que preferência modal não depende apenas da qualidade percebida." },

    { id: "caracas-conclusao", kind: "heading", text: "Conclusões e uso na IC" },
    { id: "caracas-conclusao-1", kind: "paragraph", text: "O trabalho mostra que o público do transporte coletivo de Curitiba é heterogêneo: inclui usuários cativos e pessoas que dispõem de alternativa individual. A experiência de viagem resulta da combinação de tempo, custo, integração, acesso, informação, conforto e segurança. Melhorar somente um atributo não garante migração ou permanência no sistema." },
    { id: "caracas-aplicacao", kind: "list", text: "O que este artigo oferece ao projeto", items: ["Um retrato histórico de Curitiba que pode ser comparado com pesquisas recentes.", "Variáveis de público-alvo úteis para segmentar usuários: frequência, motivo, acesso ao carro, número de integrações e tempo de viagem.", "Justificativa para tratar informação e confiabilidade como requisitos do sistema de ETA.", "Evidência de que custo e tempo precisam ser considerados juntos em uma solução de baixo custo.", "Uma base para discutir usuários cativos e usuários por escolha."] },
    { id: "caracas-referencia", kind: "quote", text: "Referência: CARACAS, A. C. C.; BERNARDINIS, M. A. P.; BASTOS, J. T. Pesquisa de qualidade no transporte público de Curitiba: análises e considerações. 1º Simpósio de Transportes do Paraná, 2018. DOI: 10.5380/1stpr2018.artcomp17p173-181." }
  ] satisfies ArticleBlock[],
} satisfies Article;

const qualionibusArticle = {
  id: "qualionibus-curitiba-2025",
  title: "Pesquisa de Satisfação QualiÔnibus — Curitiba 2025",
  authors: "WRI Brasil e URBS — Urbanização de Curitiba",
  year: 2025,
  journal: "Relatório da pesquisa do sistema de ônibus municipal de Curitiba — edição 2025/2",
  doi: "https://www.urbs.curitiba.pr.gov.br/pdf/transporte/Relat%C3%B3rio%20Quali%C3%94nibus%20-%20Curitiba%202025.pdf",
  license: "Edição de leitura — fonte URBS/WRI Brasil",
  readingMinutes: 32,
  category: "Relatório de pesquisa",
  railLabel: "QualiÔnibus",
  viewer: "blocks",
  sourceUrl: "https://www.urbs.curitiba.pr.gov.br/pdf/transporte/Relat%C3%B3rio%20Quali%C3%94nibus%20-%20Curitiba%202025.pdf",
  note: "Edição de leitura estruturada do relatório em português. Os resultados, recortes e comparações centrais foram transpostos para texto e tabelas responsivas; o relatório original permanece ligado como fonte oficial.",
  blocks: [
    { id: "quali-apresentacao", kind: "heading", text: "Apresentação" },
    { id: "quali-apresentacao-1", kind: "paragraph", text: "A Pesquisa de Satisfação QualiÔnibus mede a experiência dos passageiros do transporte coletivo de Curitiba. O relatório permite identificar o perfil de quem usa o sistema, os padrões de viagem, a avaliação de diferentes atributos e os pontos que mais afetam a satisfação geral." },
    { id: "quali-leitura", kind: "paragraph", text: "Para a iniciação científica, o relatório é especialmente útil porque aproxima a tecnologia do seu público real. Ele mostra quem pode usar uma previsão de chegada, em quais horários, com quais limitações de renda e acessibilidade e quais problemas não serão resolvidos apenas por um aplicativo." },

    { id: "quali-metodo", kind: "heading", text: "Como a pesquisa foi realizada" },
    { id: "quali-metodo-1", kind: "paragraph", text: "Foram entrevistados 958 passageiros entre 15 e 26 de setembro de 2025, em dias úteis. A coleta abrangeu 106 linhas convencionais e oito linhas de BRT, distribuídas ao longo do dia, aproximadamente entre 6h e 19h29. Por isso, os resultados descrevem principalmente a experiência de usuários em deslocamentos regulares durante a semana." },
    { id: "quali-metodo-tabela", kind: "table", text: "Escopo da coleta", rows: [["Item", "Resultado"], ["Entrevistados", "958"], ["Período", "15 a 26 de setembro de 2025"], ["Linhas convencionais", "106"], ["Linhas BRT", "8"], ["Dias pesquisados", "Dias úteis"], ["Faixa horária aproximada", "6h a 19h29"]] },

    { id: "quali-perfil", kind: "heading", text: "Perfil dos passageiros" },
    { id: "quali-genero", kind: "table", text: "Gênero e raça/cor declarados", rows: [["Indicador", "Percentual"], ["Mulheres", "61,2%"], ["Homens", "38,4%"], ["Outro gênero", "0,4%"], ["Branca", "56,9%"], ["Parda", "30,5%"], ["Preta", "8,9%"]] },
    { id: "quali-idade", kind: "table", text: "Distribuição por idade", rows: [["Faixa", "Percentual"], ["Até 24 anos", "24,8%"], ["25 a 34 anos", "19,1%"], ["35 a 44 anos", "18,9%"], ["45 a 54 anos", "15,7%"], ["55 a 64 anos", "13,4%"], ["65 anos ou mais", "7,6%"]] },
    { id: "quali-escolaridade-renda", kind: "paragraph", text: "Aproximadamente 60,6% dos entrevistados tinham escolaridade até o ensino médio completo. Quase 59% pertenciam a famílias com renda de até dois salários mínimos. Esse perfil reforça que qualquer serviço digital deve funcionar bem em aparelhos simples, consumir poucos dados e oferecer informação clara, sem exigir familiaridade técnica." },
    { id: "quali-ocupacao", kind: "table", text: "Principais ocupações", rows: [["Ocupação", "Percentual"], ["Empregado do setor privado", "56,8%"], ["Estudante", "11,9%"], ["Trabalhador por conta própria", "11,3%"], ["Aposentado", "6,7%"]] },
    { id: "quali-internet", kind: "paragraph", text: "O acesso digital é amplo: 93,9% declararam usar internet diariamente ou quase todos os dias. Isso sustenta a utilidade de um serviço móvel em tempo real, mas não elimina a necessidade de alternativas acessíveis, como informação nos pontos, painéis, áudio, interfaces de alto contraste e comunicação que continue útil em conexões instáveis." },

    { id: "quali-uso", kind: "heading", text: "Como o transporte é usado" },
    { id: "quali-frequencia", kind: "paragraph", text: "O ônibus faz parte da rotina: 72,6% utilizavam o sistema em cinco ou mais dias por semana. O trabalho aparecia como motivo de viagem para 79,3% e o estudo para 19,3%. As faixas de maior uso eram de 5h a 9h, citada por 70,1%, e de 17h a 19h, citada por 30,8%." },
    { id: "quali-alternativas", kind: "table", text: "Alternativas ao ônibus", rows: [["Alternativa declarada", "Percentual"], ["Transporte por aplicativo", "38,3%"], ["Nenhuma alternativa", "25,2%"], ["Dirigir automóvel", "19,4%"], ["Ir como passageiro de automóvel", "17,6%"]] },
    { id: "quali-alternativas-1", kind: "paragraph", text: "Um quarto dos entrevistados não tinha outra opção de deslocamento. Ao mesmo tempo, o transporte por aplicativo era a alternativa mais citada. A informação de chegada precisa, portanto, atender tanto a quem depende do ônibus quanto a quem compara tempo, conveniência e incerteza antes de escolher outro modo." },

    { id: "quali-satisfacao", kind: "heading", text: "Satisfação com o sistema" },
    { id: "quali-satisfacao-1", kind: "paragraph", text: "A satisfação geral recebeu nota 7,0. Entre os grupos de atributos, atendimento foi avaliado com 7,5, integração com 7,3, acesso com 7,2 e informação com 7,0. Os resultados indicam uma avaliação global positiva, mas com diferenças relevantes entre dimensões da experiência." },
    { id: "quali-notas", kind: "table", text: "Notas destacadas no relatório", rows: [["Dimensão", "Nota"], ["Satisfação geral", "7,0"], ["Atendimento", "7,5"], ["Integração", "7,3"], ["Acesso", "7,2"], ["Informação", "7,0"], ["Ruído e poluição", "5,5"], ["Segurança pública", "4,9"]] },
    { id: "quali-seguranca", kind: "paragraph", text: "Segurança pública foi o resultado mais crítico entre os destaques, com nota 4,9. Isso delimita o alcance de uma solução tecnológica: reduzir a incerteza da espera pode diminuir exposição desnecessária no ponto, mas a segurança depende também de políticas urbanas, infraestrutura, iluminação e operação." },

    { id: "quali-brt", kind: "heading", text: "BRT e linhas convencionais" },
    { id: "quali-brt-1", kind: "paragraph", text: "A avaliação de passageiros de BRT e de linhas convencionais foi semelhante. O BRT apresentou vantagem de 0,4 ponto em confiabilidade e 0,3 ponto em disponibilidade. A diferença é pequena, mas coerente com características como segregação de parte do trajeto e maior frequência operacional." },

    { id: "quali-acesso", kind: "heading", text: "Acesso e experiência até o embarque" },
    { id: "quali-acesso-tabela", kind: "table", text: "Avaliação do acesso", rows: [["Aspecto", "Nota"], ["Chegar ao local de embarque", "7,3"], ["Distância percorrida a pé", "7,1"], ["Facilidade para embarcar e desembarcar", "7,1"], ["Informação sobre locais de embarque", "6,5"], ["Calçadas e travessias", "5,8"]] },
    { id: "quali-acessibilidade", kind: "paragraph", text: "Cinco por cento dos entrevistados declararam possuir alguma deficiência. A leitura desse resultado junto às notas de calçadas, travessias e embarque mostra que acessibilidade não deve ser tratada apenas dentro do veículo. Uma interface de ETA também precisa considerar leitores de tela, contraste, tamanho do texto e comunicação não exclusivamente visual." },

    { id: "quali-tarifa", kind: "heading", text: "Percepção da tarifa" },
    { id: "quali-tarifa-tabela", kind: "table", text: "Avaliação do valor pago", rows: [["Relação avaliada", "Nota"], ["Tarifa e distância percorrida", "6,1"], ["Tarifa e qualidade do serviço", "5,9"], ["Tarifa e renda", "5,4"], ["Valor da tarifa", "5,0"]] },
    { id: "quali-tarifa-1", kind: "paragraph", text: "As quatro avaliações de tarifa melhoraram em relação a 2024, mas o valor absoluto continuou entre os pontos de atenção. Como quase 59% das famílias estavam na faixa de até dois salários mínimos, o projeto de informação deve evitar transferir custos para o passageiro e aproveitar dados e aparelhos já disponíveis." },

    { id: "quali-publico", kind: "heading", text: "Públicos prioritários para o projeto" },
    { id: "quali-publico-lista", kind: "list", text: "Perfis que o sistema deve contemplar", items: ["Passageiro frequente que depende do ônibus para trabalhar e precisa decidir quando sair.", "Estudante que combina horários de aula, integrações e deslocamentos fora do pico.", "Usuário sem alternativa modal, para quem uma previsão incorreta pode causar perda de compromisso.", "Passageiro que compara ônibus e transporte por aplicativo.", "Pessoa idosa ou com deficiência, que pode precisar de mais tempo e informação acessível para embarcar.", "Usuário de baixa renda e aparelho simples, sensível ao consumo de dados.", "Passageiro em local inseguro, que se beneficia de reduzir espera desnecessária."] },

    { id: "quali-requisitos", kind: "heading", text: "Requisitos derivados para uma solução de ETA" },
    { id: "quali-requisitos-lista", kind: "list", text: "O que os dados sugerem", items: ["Interface móvel rápida, legível e com baixo consumo de dados.", "Previsão acompanhada de horário da última atualização e nível de confiança.", "Funcionamento especialmente confiável nos picos da manhã e do fim da tarde.", "Acessibilidade por teclado, leitor de tela, contraste e tamanho ajustável.", "Informação por linha, ponto e sentido para reduzir ambiguidades.", "Possibilidade futura de canais além do celular, como painéis, QR Code ou mensagens.", "Avaliação do sistema não apenas por erro médio, mas também por impacto na espera percebida e na confiança do usuário."] },

    { id: "quali-limites", kind: "heading", text: "Limites de interpretação" },
    { id: "quali-limites-1", kind: "paragraph", text: "A pesquisa retrata usuários presentes no sistema durante dias úteis e nas faixas pesquisadas. Ela não representa automaticamente pessoas que deixaram de usar o ônibus, viagens de madrugada ou fins de semana, nem toda a diversidade de necessidades de acessibilidade. Para definir o público-alvo do protótipo, os dados devem ser combinados com testes de uso e entrevistas específicas." },

    { id: "quali-conclusao", kind: "heading", text: "Síntese para a iniciação científica" },
    { id: "quali-conclusao-1", kind: "paragraph", text: "O passageiro típico encontrado pela pesquisa usa o ônibus intensamente, sobretudo para trabalhar, tem forte presença feminina, renda familiar concentrada nas faixas mais baixas e acesso frequente à internet. Informação já é uma dimensão relativamente bem avaliada, mas confiabilidade, segurança, acesso e custo continuam interligados à experiência." },
    { id: "quali-conclusao-2", kind: "paragraph", text: "A principal implicação é que o ETA deve ser pensado como serviço de redução de incerteza, não como simples número na tela. A previsão precisa ser compreensível, atualizada, acessível e barata para o usuário. Seu valor deve ser medido por quanto ajuda pessoas reais a planejar a saída, a integração e o tempo de espera." },
    { id: "quali-referencia", kind: "quote", text: "Referência: WRI Brasil; URBS — Urbanização de Curitiba. Pesquisa de Satisfação QualiÔnibus: Curitiba 2025. Relatório da edição 2025/2." }
  ] satisfies ArticleBlock[],
} satisfies Article;

export const articles: Article[] = [abdiArticle, caracasArticle, qualionibusArticle];
