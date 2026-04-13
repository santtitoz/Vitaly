from rest_framework import serializers
from vitaly.models import Hidratacao,Alimentacao,Estudo,Sono,Treino,Perfil
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email' , 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user 

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['usuario','nome_completo','idade','peso','altura','objetivo']
        
class Hidratacaoserializer(serializers.ModelSerializer):
    class Meta:
        model = Hidratacao
        fields = ['usuario','data_registro','quantidade_ml','meta_ml']

class Alimentacaoserializer(serializers.ModelSerializer):
    class Meta:
        model = Alimentacao
        fields = ['usuario','data_registro','horario','tipo']

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

class AuditoriaSerializer(serializers.Serializer):
    tipo = serializers.CharField()
    total = serializers.DurationField()