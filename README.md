# Vitaly - API Saúde e Hábitos

Este é o projeto **Vitaly**, uma API desenvolvida em Django e Django REST Framework para o acompanhamento de hábitos saudáveis, como hidratação, alimentação, estudos, sono e treinos.

## 🗺️ Mapa de Rotas (Endpoints)

Abaixo estão os endpoints disponíveis na API:

| Endpoint | Método | Descrição |
| :--- | :--- | :--- |
| `/admin/` | `GET/POST` | Interface de administração do Django. |
| `/api/v1/hidratacoes/` | `GET/POST/PUT/DELETE` | Gerenciamento de registros de hidratação (ml, meta). |
| `/api/v1/alimentacoes/` | `GET/POST/PUT/DELETE` | Gerenciamento de registros de alimentação e horários. |
| `/api/v1/estudos/` | `GET/POST/PUT/DELETE` | Gerenciamento de registros de horas de estudo e produtividade. |
| `/api/v1/sonos/` | `GET/POST/PUT/DELETE` | Gerenciamento de registros de sono (hora de dormir/acordar). |
| `/api/v1/treinos/` | `GET/POST/PUT/DELETE` | Gerenciamento de registros de treinos e status. |

### Diagrama de Arquitetura

```mermaid
graph TD
    User((Usuário)) --> API[Vitaly API /api/v1/]
    API --> Hidratacao[Hidratação]-> Alimentacao[Alimentação]
    API --> Estudo[Estudo]
    API --> Sono[Sono]
    API --> Treino[Treino]
    API --> DjangoAdmin[D
    API -jango Admin /admin/]
    
    subgraph Modelos
        Hidratacao
        Alimentacao
        Estudo
        Sono
        Treino
    end
```

## 🛠️ Tecnologias Utilizadas

- **Python** 3.x
- **Django** 6.0 (ou compatível)
- **Django REST Framework** (DRF)
- **SQLite** (Banco de dados padrão)

## 🚀 Como Executar

1. Certifique-se de ter o Python instalado.
2. Ative o ambiente virtual (se aplicável).
3. Instale as dependências: `pip install django djangorestframework`
4. Execute as migrações: `python manage.py migrate`
5. Inicie o servidor: `python manage.py runserver`
