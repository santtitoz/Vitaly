from django.db.models.signals import post_save
from django.dispatch import receiver
from models import Sono, Estudo, Treino
from services.logs import log_sono, log_estudo, log_treino


@receiver(post_save, sender=Sono)
def gerar_log_sono(sender, instance, created, **kwargs):
    if created:
        log_sono(instance)


@receiver(post_save, sender=Estudo)
def gerar_log_estudo(sender, instance, created, **kwargs):
    if created:
        log_estudo(instance)


@receiver(post_save, sender=Treino)
def gerar_log_treino(sender, instance, created, **kwargs):
    if created:
        log_treino(instance)