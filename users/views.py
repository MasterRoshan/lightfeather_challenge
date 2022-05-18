from users.serializers import SubmitSerializer, SupervisorListSerializer, SupervisorSelectSerializer
from users.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework import generics

class SupervisorList(generics.ListAPIView):
    queryset = User.objects.filter(jurisdiction__regex=r'\D').order_by('jurisdiction', 'last_name', 'first_name')
    serializer_class = SupervisorListSerializer

class SupervisorSelect(generics.ListAPIView):
    queryset = User.objects.filter(jurisdiction__isnull=False)
    serializer_class = SupervisorSelectSerializer

class Submit(generics.CreateAPIView):
    serializer_class = SubmitSerializer