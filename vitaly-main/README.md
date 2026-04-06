# Vitaly

Um aplicativo Django para rastreamento de hábitos de saúde e bem-estar. Permite monitorar hidratação, alimentação, estudo, sono, treinos e perfil pessoal através de uma API REST.

## Funcionalidades

- **Perfil do Usuário**: Gerenciamento de dados pessoais (nome, idade, peso, altura, objetivo)
- **Hidratação**: Registro diário de consumo de água
- **Alimentação**: Controle de refeições e horários
- **Estudo**: Acompanhamento de horas de estudo e produtividade
- **Sono**: Registro de horários de dormir/acordar
- **Treino**: Controle de exercícios planejados vs realizados
- **API REST**: Endpoints para todas as funcionalidades com autenticação JWT

## Tecnologias Utilizadas

- **Django**: Framework web
- **Django REST Framework**: Para construção da API
- **Django REST Framework Simple JWT**: Autenticação baseada em tokens JWT
- **SQLite**: Banco de dados (padrão do Django)

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd vitaly-main
   ```

2. **Crie e ative o ambiente virtual**:
   ```bash
   python -m venv venv
   # No Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # No Windows (cmd):
   .\venv\Scripts\activate.bat
   ```

3. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute as migrações**:
   ```bash
   python manage.py migrate
   ```

5. **Crie um superusuário (opcional)**:
   ```bash
   python manage.py createsuperuser
   ```

6. **Execute o servidor**:
   ```bash
   python manage.py runserver
   ```

O aplicativo estará disponível em `http://127.0.0.1:8000/`

## Uso da API

### Autenticação

A API usa autenticação JWT. Para obter um token:

```bash
POST /api/token/
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

Use o token no header: `Authorization: Bearer <token>`

### Endpoints Principais

- `GET/POST/PUT/DELETE /api/v1/users/` - Usuários
- `GET/POST/PUT/DELETE /api/v1/perfis/` - Perfis
- `GET/POST/PUT/DELETE /api/v1/hidratacoes/` - Registros de hidratação
- `GET/POST/PUT/DELETE /api/v1/alimentacoes/` - Registros de alimentação
- `GET/POST/PUT/DELETE /api/v1/estudos/` - Registros de estudo
- `GET/POST/PUT/DELETE /api/v1/sonos/` - Registros de sono
- `GET/POST/PUT/DELETE /api/v1/treinos/` - Registros de treino

### Exemplo de Uso

1. **Criar um usuário**:
   ```bash
   POST /api/v1/users/
   {
     "username": "usuario_exemplo",
     "email": "email@exemplo.com",
     "password": "senha_segura"
   }
   ```

2. **Registrar hidratação**:
   ```bash
   POST /api/v1/hidratacoes/
   Authorization: Bearer <token>
   {
     "usuario": 1,
     "data_registro": "2024-01-01",
     "quantidade_ml": 2000,
     "meta_ml": 2500
   }
   ```

## Estrutura do Projeto

```
vitaly-main/
├── config/                 # Configurações do Django
├── vitaly/                 # App principal
│   ├── api/v1/            # API versão 1
│   │   ├── serializers.py # Serializers DRF
│   │   ├── viewsets.py    # ViewSets DRF
│   │   └── router.py      # Configuração de rotas
│   ├── migrations/        # Migrações do banco
│   ├── models.py          # Modelos de dados
│   └── views.py           # Views (se usado)
├── db.sqlite3             # Banco de dados
├── manage.py              # Script de gerenciamento Django
├── requirements.txt       # Dependências Python
└── venv/                  # Ambiente virtual (não versionado)
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.