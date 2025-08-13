<!-- # Programming Challenge -->

## Documentação

- **Necessário ter NodeJs 22 ou superior**

---

### Inicialização da Aplicação

#### Instalação de dependências

##### Variáveis de ambiente

1. Vá até a pasta raiz do projeto e renomeie o arquivo **.env.example** (**ele já está com o valor padrão de desenvolvimento para cada variável**)

##### Inicialização da Aplicação e Banco de dados **(Ambiente "Dockerizado")**

1. Clone o repositório.
1. Utilizando um terminal ou inteface gráfica navegue até a **pasta raiz** do repositório
1. Já na pasta raiz, para executar e subir as instâncias dos banco de dados e da api você precisa executar o comando `docker compose up -d`
1. agora basta abrir o navegador e ir até o endereço http://localhost:3333/docs (**Porta em que o Swagger está escutando**)

#### V1.0.0

Esta é a versão contendo apenas o **Encurtador de URL**. Nesta versão é possível apenas encurtar uma url original ou acessar uma url encurtada para ser redirecionado para o site original.

#### V2.0.0

Esta versão contém o encurtador e uma pequena sessão simples de login, logout e registro do usuário.

#### V3.0.0

Esta é a versão com mudanças mais robustas no sistema. Ela intrega a sessão do usuário com a possibilidade de encurtar, listar, editar e excluir URLs no sistema (Usuários só podem editar/excluir suas próprias URLs, assim como apenas usuários logados tem acesso a lista de URL por eles criadas).

#### V4.0.0

Esta versão contém os mesmos recursos que as versões anteriores. Porém, com a pequena funcionalidade extrar de contrar quantos acessos determinada URL obteve.

#### Decisões de Projeto

O desafio era bem amplo no leque de opções, optei por obter alguns diferenciais e ferramentas que considero importante durante o desenvolvimento de um projeto. Dentre essas ferramentas optei por inserir:

- **Swagger**: Para um ter uma interface e interagir com mais facilidade com a applicação. Podendo realizar tester diretamente nela;
- **Docker/Docker-compose**: Como o desafio exigia a construção de um banco relacional, optei por subir um container Docker para simplificar essa parte e poder derrubar e subir o banco sem preocupações;
- **Jest**: Para ter mais uma camada de confiabilidade no que eu estava desenvolvendo, e garantir que ao longo do desenvolvimento eu não quebrasse algo que já estava funcionando, realizei a implementação de alguns testes unitários;
- **Husky**: Para garantir qualidade durante a intregação do software(volterei neste tópico na seção de **Desafios Enfrentados**). Realizando checagem de escrita com **Eslint** antes de cada commit e também a execução dos testes unitários ante sde subir para o repositório remoto;
- **GitHub Actions**: Como mais uma camada de garantia de qualidade de código, implementei também a CI do github para verificar a saúde do código;

#### Desafios encontrados durante o Projeto

- **Tempo** - Gostei muito de me dedicar e passar essas noites em claro desenvolvendo este desafio. Porém, eu deixei muito a desejar no gerenciamento de tempo, gastei muitas horas em detalher mínimos para tentar deixar o projeto a minha cara já de início. Isso acarretou em: pouco tempo para atigir todos os tópicos em que me comprometi entregar. Isso é visível quando analisamos tanto o **Husky** quanto o **GitHub Action** do projeto (e os horários do commit). O projeto está sim finalizado e executando com maestria, porém alguns erros de tipagem que não tive tempo de corrigir até o final do horário estipulado do desafio

#### Considerações finais

Fico muito grato de participar deste desafio, sinto que foi muito proveitoso o tempo que me debrucei no computador para ler, entender, montar estratégias e corrigir os erros. Dito isso, muito obrigado e que tenha sido uma avaliação tão proveitosa para você quanto foi implemetá-la para mim 😎😉
