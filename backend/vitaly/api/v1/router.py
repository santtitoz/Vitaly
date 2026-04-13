from rest_framework.routers import DefaultRouter
from django.urls import path
from .viewsets import HidratacaoViewSet, AlimentacaoViewSet, EstudoViewSet, SonoViewSet, TreinoViewSet
from .auth import LoginView, RegisterView

router = DefaultRouter()
router.register(r'hidratacoes', HidratacaoViewSet)
router.register(r'alimentacoes', AlimentacaoViewSet)
router.register(r'estudos', EstudoViewSet)
router.register(r'sonos', SonoViewSet)
router.register(r'treinos', TreinoViewSet)

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
] + router.urls
