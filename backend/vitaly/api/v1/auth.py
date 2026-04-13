from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class RegisterView(APIView):
    permission_classes = ()

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name', '')

        if not email or not password:
            return Response({"error": "Email e senha são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=email).exists():
            return Response({"error": "E-mail já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

        # Usamos email tanto para username quanto email, common paradigm
        user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            "token": token.key,
            "user": {"id": user.id, "email": user.email, "name": user.first_name}
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = ()

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email e senha são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": {"id": user.id, "email": user.email, "name": user.first_name}
            })
        else:
            return Response({"error": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
