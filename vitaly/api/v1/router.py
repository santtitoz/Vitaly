from rest_framework.routers import DefaultRouter
from .viewsets import HidratacaoViewSet, AlimentacaoViewSet, EstudoViewSet, SonoViewSet, TreinoViewSet

router = DefaultRouter()
router.register(r'hidratacoes', HidratacaoViewSet)
router.register(r'alimentacoes', AlimentacaoViewSet)
router.register(r'estudos', EstudoViewSet)
router.register(r'sonos', SonoViewSet)
router.register(r'treinos', TreinoViewSet)
urlpatterns = router.urls
