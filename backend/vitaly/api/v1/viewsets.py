from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from vitaly.models import Hidratacao, Alimentacao, Estudo, Sono, Treino
from .serializers import Alimentacaoserializer, Hidratacaoserializer, Estudoserializer, Sonoserializer, Treinoserializer


class BaseUserViewSet(viewsets.ModelViewSet):
    """Base ViewSet that filters by authenticated user and auto-assigns usuario on create."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class HidratacaoViewSet(BaseUserViewSet):
    queryset = Hidratacao.objects.all()
    serializer_class = Hidratacaoserializer


class AlimentacaoViewSet(BaseUserViewSet):
    queryset = Alimentacao.objects.all()
    serializer_class = Alimentacaoserializer


class EstudoViewSet(BaseUserViewSet):
    queryset = Estudo.objects.all()
    serializer_class = Estudoserializer


class SonoViewSet(BaseUserViewSet):
    queryset = Sono.objects.all()
    serializer_class = Sonoserializer


class TreinoViewSet(BaseUserViewSet):
    queryset = Treino.objects.all()
    serializer_class = Treinoserializer