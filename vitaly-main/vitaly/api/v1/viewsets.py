from rest_framework import viewsets
from django.contrib.auth.models import User
from vitaly.models import Hidratacao, Alimentacao, Estudo, Sono, Treino, Perfil
from .serializers import Alimentacaoserializer, Hidratacaoserializer, Estudoserializer, PerfilSerializer, Sonoserializer, Treinoserializer , UserSerializer

class HidratacaoViewSet(viewsets.ModelViewSet):
    queryset = Hidratacao.objects.all()
    serializer_class = Hidratacaoserializer

class AlimentacaoViewSet(viewsets.ModelViewSet):
    queryset = Alimentacao.objects.all()
    serializer_class = Alimentacaoserializer

class EstudoViewSet(viewsets.ModelViewSet):
    queryset = Estudo.objects.all()
    serializer_class = Estudoserializer

class SonoViewSet(viewsets.ModelViewSet):
    queryset = Sono.objects.all()
    serializer_class = Sonoserializer

class TreinoViewSet(viewsets.ModelViewSet):
    queryset = Treino.objects.all()
    serializer_class = Treinoserializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer