from rest_framework import viewsets
from django.contrib.auth.models import User
from vitaly.models import Hidratacao, Alimentacao, Estudo, Sono, Treino, Perfil
from rest_framework.permissions import IsAuthenticated
from .serializers import Alimentacaoserializer, Hidratacaoserializer, Estudoserializer, PerfilSerializer, Sonoserializer, Treinoserializer , UserSerializer

class HidratacaoViewSet(viewsets.ModelViewSet):
    queryset = Hidratacao.objects.all()
    serializer_class = Hidratacaoserializer
    permission_classes = [IsAuthenticated]

class AlimentacaoViewSet(viewsets.ModelViewSet):
    queryset = Alimentacao.objects.all()
    serializer_class = Alimentacaoserializer
    permission_classes = [IsAuthenticated]

class EstudoViewSet(viewsets.ModelViewSet):
    queryset = Estudo.objects.all()
    serializer_class = Estudoserializer
    permission_classes = [IsAuthenticated]

class SonoViewSet(viewsets.ModelViewSet):
    queryset = Sono.objects.all()
    serializer_class = Sonoserializer
    permission_classes = [IsAuthenticated]

class TreinoViewSet(viewsets.ModelViewSet):
    queryset = Treino.objects.all()
    serializer_class = Treinoserializer
    permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

class AuditoriaViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        periodo = request.GET.get("periodo", "dia")

        hoje = timezone.now()

        if periodo == "dia":
            logs = LogAtividade.objects.filter(
                usuario=user,
                inicio__date=hoje.date()
            )

        elif periodo == "semana":
            inicio_semana = hoje - timezone.timedelta(days=7)
            logs = LogAtividade.objects.filter(
                usuario=user,
                inicio__gte=inicio_semana
            )

        elif periodo == "mes":
            logs = LogAtividade.objects.filter(
                usuario=user,
                inicio__month=hoje.month
            )

        else:
            logs = LogAtividade.objects.filter(usuario=user)

        logs = logs.annotate(
            duracao=ExpressionWrapper(
                F('fim') - F('inicio'),
                output_field=DurationField()
            )
        )

        resumo = logs.values('tipo').annotate(
            total=Sum('duracao')
        )

        return Response(resumo)