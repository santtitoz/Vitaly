from django.contrib import admin
from .models import Hidratacao, Alimentacao, Estudo, Sono, Treino

# Registro simples (aparecem apenas os nomes dos objetos)
admin.site.register(Hidratacao)
admin.site.register(Alimentacao)
admin.site.register(Estudo)
admin.site.register(Sono)

# Registro customizado para o Treino (exemplo de como deixar a lista mais bonita)
@admin.register(Treino)
class TreinoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'data_registro', 'quantidade_planejada', 'quantidade_realizada', 'status')
    list_filter = ('status', 'data_registro')