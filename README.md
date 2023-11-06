# Fase 2: Refinamento

Q: Quais são os requisitos funcionais e não funcionais que precisa ser implementado?
Q: Vejo que por se tratar de uma transação que envolve dinheiro, precisamos de resiliencia, estão cogitando colocar algum tipo de mensageria pra suprir essa necessidade?
Q: Ainda se tratando de resiliencia, ainda no topico de transações, devemos implementar transactions do TypeORM mesmo sabendo que afetaria um pouco a performance?
Q: Em que pontos do fluxo do balcão devemos colocar as mensagens de erro? devemos considerar que o front sempre mandará as informação certar e que existem no nosso banco?
Q: Não vi a funcionalidade de remover os favoritos, deve ser criada? ou assim que a oferta for comprada por alguem ela deverá automaticamente  sumir da lista de todos os que favoritaram?

# Fase 3: Final

1- A divisão entre entidades da aplicação e do ORM poderiam ser melhor feitas onde uma se aproveitasse da outra de melhor forma.
2- Implementaria um Message Broker para não perder dados em operações críticas.
3- Utilizaria algum dos serviços da AWS como o EC2, ECS, Bean Stalk ou outro para fazer o deploy junto com uma pipeline pra deixar mais automatizado.
4- Implementaria Transactions para em caso de erro o rollback fosse possivel sem perdas.
5- Possivelmente aplicaria de melhor forma o Clean Code, Clean Arch e Hex Arch de outra forma afin de diminuir a quantidade de arquivos no projeto.
6- Devido esse teste tecnico ter sido aplicado e feito no meu horario livre, muita energia pós serviço foi aplicada então algumas incosistencias em padrões de projeto não foram aplicados como deveria, em alguma oportunidade eu faria pequenos ajustes para que ficasse melhor.
