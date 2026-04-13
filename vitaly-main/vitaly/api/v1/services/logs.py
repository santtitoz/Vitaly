from datetime import datetime, timedelta
from models import LogAtividade

def log_sono(sono):
    inicio = datetime.combine(sono.data_registro, sono.hora_dormir)
    fim = datetime.combine(sono.data_registro, sono.hora_acordar)

    if fim < inicio:
        fim += timedelta(days=1)

    LogAtividade.objects.create(
        usuario=sono.usuario,
        tipo="sono",
        inicio=inicio,
        fim=fim
    )


def log_estudo(estudo):
    if estudo.inicio and estudo.fim:
        inicio = estudo.inicio
        fim = estudo.fim
    else:
        inicio = datetime.now()
        fim = inicio + timedelta(hours=estudo.horas_estudo)

    LogAtividade.objects.create(
        usuario=estudo.usuario,
        tipo="estudo",
        inicio=inicio,
        fim=fim
    )


def log_treino(treino):
    inicio = datetime.now()
    fim = inicio + timedelta(hours=1) 

    LogAtividade.objects.create(
        usuario=treino.usuario,
        tipo="treino",
        inicio=inicio,
        fim=fim
    )

def log_alimentacao(alimentacao):
    LogAtividade.objects.create(
        usuario=alimentacao.usuario,
        tipo="alimentacao",
        inicio=datetime.combine(alimentacao.data_registro, alimentacao.horario),
        fim=datetime.combine(alimentacao.data_registro, alimentacao.horario) + timedelta(minutes=30)
    )

def log_hidratacao(hidratacao):
    LogAtividade.objects.create(
        usuario=hidratacao.usuario,
        tipo="hidratacao",
        inicio=datetime.combine(hidratacao.data_registro, datetime.min.time()),
        fim=datetime.combine(hidratacao.data_registro, datetime.min.time()) + timedelta(minutes=5)
    )
    
