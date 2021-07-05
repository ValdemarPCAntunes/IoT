### Pré-requisitos

Dispositivo IoT ligado e disponível no site TheThingsNetwork
Desktop Docker
NodeJs
Windows Terminal (Opcional)
Ubuntu (Ou um ambiente Linux equivalente)

### Instalação

Após fazer clone do repositório, deverá ser seguido o conjunto de instruções presentes na diretoria _consumer\_server_.
Uma vez feito isto, pode-se executar na diretoria do projeto, o comando `docker-compose up` que irá construir, criar ou recriar e começar cada serviço definido no ficheiro `docker-compose.yml`. Dentro deste ficheiro pode-se efetuar as configurações de criação dos serviços nele explícito, as configurações mais vulneráveis a alterações serão as propriedades `port`, presente em cada serviço, que define o porto  de escuta do serviço em questão.
Uma vez lançado a execução dos serviços, é necessário importar o `flow` de execução para o serviço `Node-Red` de modo a possibilitar a execução da aplicação em geral.
Para aceder ao serviço `Node-Red` é necessário criar uma janela utilizando o `Windows Terminal` e correr os seguintes comandos:
. `ubuntu` (ou outro ambiente Linux equivalente);
. `docker container ls`;
. `docker exec -t -i [containerId] /bin/bash` --- Onde `containerId` corresponde ao valor da coluna `Container Id` presente na linha do serviço `nodered/node-red:latest`;
Após este conjunto de instruções, encontramo-nos perante a diretoria onde o ficheiro `movimentData.csv` será criado e populado ao longo da vida do serviço.
Para importar o fluxo de execução para o serviço `Node-Red`, deverá aceder ao _URL_ http://localhost:[porto do serviço]/, por omissão de alterações será o porto 1026. De seguida, ao carregar no botão no canto superior direto e selecionar `import` onde deverá ser selecionado o `flow` presente no ficheiro `node-red-flow.json`.
De seguida, é preciso efetuar 4 alterações:
. Instalar os módulos `node-red-contrib-web-worldmap`, `node-red-node-ui-table`, `node-red-dashboard` e `node-red-node-sqlite`;
. Alterar o `host` dentro dos nós `post to orion`, este está disponível no serviço `Orion` que é possível aceder com o mesmo conjunto de instruções usados para aceder ao serviço `Node-Red`, adicionando no final o comando `ip addr show` e colocar o _IP_ de `inet` sem a máscara (i.e 172.17.0.5/16 retirar o IP 172.17.0.5).
. Alterar a conexão no nó `mqtt` inicial estabelecer a comunicação entre `TheThingsNetwork` e o serviço `Node-Red`, isto é possível ao clicar no nó e de seguida navegar para a configuração do `mqtt broker` e configurar devidamente, nomeadamete nas abas `Connection` e `Security`.
. Criar a base de dados utilizando o nó `Create`
Com isto, a configuração do serviço `Node-Red` deverá estar completa.
Posto isto, a subscrição pelas aplicações consumidoras é feita através do pedido http `POST` para o URL `http://localhost:1026/v2/subscriptions` e este deve apresentar o seguinte formato: 
{
	"description": "Trip readings",
	"subject": {
		"entities": [{
			"idPattern": "WaterQualityObserved:QoW-Shark:Trip:1*",
			"type": "WaterQualityObserved"
		}]
	},
	"notification": {"http": {"url":"http://[IP do serviço cliente]:8081/tripReading"}},
	"expires": "2021-10-01T11:00:00.00Z",
	"throttling": 5
}
Para concluir, falta apenas efetuar leituras com o dispositivo QoW-Shark!