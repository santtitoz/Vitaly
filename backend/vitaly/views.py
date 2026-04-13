from django.db.models import Sum, F, ExpressionWrapper, DurationField
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LogAtividade
import rest_framework.permissions


class AuditoriaView(APIView):
    permission_classes = [rest_framework.permissions.IsAuthenticated]

    def get(self, request):
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