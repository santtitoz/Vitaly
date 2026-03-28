from rest_framework import viewsets
from vitaly.models import Hidratacao, Alimentacao, Estudo, Sono, Treino
from .serializers import Alimentacaoserializer, Hidratacaoserializer, Estudoserializer, Sonoserializer, Treinoserializer

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