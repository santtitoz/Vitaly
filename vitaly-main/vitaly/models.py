from django.db import models
from django.contrib.auth.models  import User

#soft delete
class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
    
    def delete(self, using=None, keep_parents=False):
        from django.utils import timezone
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
    
#perfil
class Perfil(SoftDeleteModel):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=100)
    idade = models.IntegerField()
    peso = models.FloatField()
    altura = models.FloatField()
    objetivo = models.CharField(max_length=200)


#auditoria
class LogAtividade(SoftDeleteModel):
    TIPO_CHOICES = [
    ("sono", "Sono"),
    ("estudo", "Estudo"),
    ("treino", "Treino"),
    ("alimentacao", "Alimentação"),
    ("hidratacao", "Hidratação"),
    ]
    
    objects = SoftDeleteManager()     
    all_objects = models.Manager()

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    inicio = models.DateTimeField()
    fim = models.DateTimeField()

    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario} - {self.tipo}"

class LogMetricas(SoftDeleteModel):
    TIPO_CHOICES = [
        ("hidratacao", "Hidratação"),
        ("alimentacao", "Alimentação"),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    valor = models.FloatField()  
    data = models.DateTimeField()

    criado_em = models.DateTimeField(auto_now_add=True)
    
#hidratacao
class Hidratacao(SoftDeleteModel):
    objects = SoftDeleteManager()  
    all_objects = models.Manager()

    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    quantidade_ml = models.IntegerField()
    meta_ml = models.IntegerField()

#alimentacao
class Alimentacao(SoftDeleteModel):
    objects = SoftDeleteManager()  
    all_objects = models.Manager()

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_registro = models.DateField()
    tipo = models.CharField(max_length=50)  
    horario = models.TimeField(null=True, blank=True)  
    quantidade_refeicoes = models.IntegerField() 

#estudus 
class Estudo(SoftDeleteModel):
    objects = SoftDeleteManager()  
    all_objects = models.Manager()

    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    inicio = models.DateTimeField(null=True, blank=True)
    fim = models.DateTimeField(null=True, blank=True)
    produtividade = models.IntegerField()

#sono
class Sono (SoftDeleteModel):
    objects = SoftDeleteManager()  
    all_objects = models.Manager()

    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    hora_dormir = models.TimeField()
    hora_acordar = models.TimeField()
    

#treino
class Treino(SoftDeleteModel):
    objects = SoftDeleteManager()  
    all_objects = models.Manager()

    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    data_registro = models.DateField()
    quantidade_planejada = models.IntegerField(null=True, blank=True)
    quantidade_realizada = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50)


