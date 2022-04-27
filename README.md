

# Node Microservices

> Monorepo de exemplo de abrodagem para microserviços utulizando mensageria.

O repositório possui 3 projetos, e mostra uma abordagem simples para trabalho com microserviços utilizando mensageria (RabbiMQ).
Temos um projeto core, com as classes utilizados pelos microserviços e dois serviços seperados. Onde um registra um pedido (store) e o outro processa gerando faturas (invoice).

---


## :hammer_and_wrench: Technologies

Este projeto utilizou as seguintes tecnologias:

* NodeJs;
* Typescript;
* RabbitMQ;

## :triangular_ruler: Arquitetura

![Arch](./docs/arch.png)

---

## :floppy_disk: Instalacão

Para executar o projeto deve-se ter instalado o Docker e DockerCompose.

Linux

```sh
./init.sh
```

## :left_right_arrow: Endpoints

### /api/orders

Porta 3040

Criar um pedido:
Método **POST**.

Request - dados do pedido
```javascript
{
    "items": [
        {
            "product": "Leite Longa Vida 1lt",
            "quantity": 10
        }
    ]
}
```
Response 201 - Sucesso

Buscar Pedidos
Método **GET**
Request - dados do pedido
```javascript
[
    {
        "items": [
            {
                "product": "Leite Longa Vida 1lt",
                "quantity": 10
            }
        ],
        "id": "bce46ab3-5800-4a57-90ac-a4dbf2219ed5"
    }
]
```


### api/invoices

Porta 3030

Buscar faturas (invoice)
Método **GET**.

Response
```javascript
{
    "invoices": [
        {
            "orderCode": "bce46ab3-5800-4a57-90ac-a4dbf2219ed5",
            "dtCreated": "2022-04-27T18:23:03.415Z",
            "items": [
                {
                    "product": "Leite Longa Vida 1lt",
                    "quantity": 10
                }
            ],
            "total": 19.9
        }
    ]
}
```

[version-image]: https://img.shields.io/badge/Version-1.0.0-brightgreen?style=for-the-badge&logo=appveyor
[Backend-image]: https://img.shields.io/badge/Backend-Java%208-important?style=for-the-badge
[Backend-url]: https://img.shields.io/badge/Backend-Java%208-important?style=for-the-badge