from rest_framework import serializers
from vitaly.models import Hidratacao,Alimentacao,Estudo,Sono,Treino
from django.contrib.auth.models import User

class Hidratacaoserializer(serializers.ModelSerializer):
    class Meta:
        model = Hidratacao
        fields = ['usuario','data_registro','quantidade_ml','meta_ml']

class Alimentacaoserializer(serializers.ModelSerializer):
    class Meta:
        model = Alimentacao
        fields = ['usuario','data_registro','quantidade_refeicoes','horarios','classificacao']

class Estudoserializer(serializers.ModelSerializer):
    class Meta:
        model = Estudo
        fields = ['usuario','data_registro','horas_estudo','produtividade']

class Sonoserializer(serializers.ModelSerializer):
    class Meta:
        model = Sono
        fields = ['usuario','data_registro','hora_dormir','hora_acordar','quantidade']  

class Treinoserializer(serializers.ModelSerializer):
    class Meta:
        model = Treino
        fields = ['usuario','data_registro','quantidade_planejada','quantidade_realizada','status'] 