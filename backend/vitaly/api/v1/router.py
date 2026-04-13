from rest_framework.routers import DefaultRouter
from .viewsets import HidratacaoViewSet, AlimentacaoViewSet, EstudoViewSet, PerfilViewSet, SonoViewSet, TreinoViewSet, UserViewSet, AuditoriaViewSet

router = DefaultRouter()
router.register(r'perfis', PerfilViewSet)
router.register(r'users', UserViewSet)
router.register(r'hidratacoes', HidratacaoViewSet)
router.register(r'alimentacoes', AlimentacaoViewSet)
router.register(r'estudos', EstudoViewSet)
router.register(r'sonos', SonoViewSet)
router.register(r'treinos', TreinoViewSet)
router.register(r'auditoria', AuditoriaViewSet, basename='auditoria')
urlpatterns = router.urls
