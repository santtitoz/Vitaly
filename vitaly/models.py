from django.db import models
from django.contrib.auth.models  import User

#hidratacao
class Hidratacao(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    quantidade_ml = models.IntegerField()
    meta_ml = models.IntegerField()

#alimentacao
class Alimentacao(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    quantidade_refeicoes = models.IntegerField()
    horarios = models.CharField(max_length=200)
    classificacao = models.CharField(max_length= 50)

#estudus 
class Estudo(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    horas_estudo = models.FloatField()
    produtividade = models.IntegerField()

#sono
class Sono (models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    hora_dormir = models.TimeField()
    hora_acordar = models.TimeField()
    quantidade = models.IntegerField()

#treino
class Treino(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    quantidade_planejada = models.IntegerField
    quantidade_realizada = models.IntegerField
    status = models.CharField(max_length=50)