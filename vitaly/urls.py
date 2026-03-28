from django.urls import path
from . import views

urlpatterns = [

    # HIDRATAÇÃO
    path('hidratacao/', views.listar_hidratacao, name='listar_hidratacao'),
    path('hidratacao/criar/', views.criar_hidratacao, name='criar_hidratacao'),
    path('hidratacao/editar/<int:id>/', views.editar_hidratacao, name='editar_hidratacao'),
    path('hidratacao/deletar/<int:id>/', views.deletar_hidratacao, name='deletar_hidratacao'),

    # ALIMENTAÇÃO
    path('alimentacao/', views.listar_alimentacao, name='listar_alimentacao'),
    path('alimentacao/criar/', views.criar_alimentacao, name='criar_alimentacao'),
    path('alimentacao/editar/<int:id>/', views.editar_alimentacao, name='editar_alimentacao'),
    path('alimentacao/deletar/<int:id>/', views.deletar_alimentacao, name='deletar_alimentacao'),

    # ESTUDO
    path('estudo/', views.listar_estudo, name='listar_estudo'),
    path('estudo/criar/', views.criar_estudo, name='criar_estudo'),
    path('estudo/editar/<int:id>/', views.editar_estudo, name='editar_estudo'),
    path('estudo/deletar/<int:id>/', views.deletar_estudo, name='deletar_estudo'),

    # SONO
    path('sono/', views.listar_sono, name='listar_sono'),
    path('sono/criar/', views.criar_sono, name='criar_sono'),
    path('sono/editar/<int:id>/', views.editar_sono, name='editar_sono'),
    path('sono/deletar/<int:id>/', views.deletar_sono, name='deletar_sono'),

    # TREINO
    path('treino/', views.listar_treino, name='listar_treino'),
    path('treino/criar/', views.criar_treino, name='criar_treino'),
    path('treino/editar/<int:id>/', views.editar_treino, name='editar_treino'),
    path('treino/deletar/<int:id>/', views.deletar_treino, name='deletar_treino'),
]