from django.contrib import admin
from django.urls import include, path
from vitaly.api.v1.router import urlpatterns as api_urlpatterns
from vitaly.views import AuditoriaView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("auditoria/", AuditoriaView.as_view()),
]