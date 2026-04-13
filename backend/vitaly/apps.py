from django.apps import AppConfig

def ready(self):
    import vitaly.api.v1.services.signals
    
class VitalyConfig(AppConfig):
    name = 'vitaly'
