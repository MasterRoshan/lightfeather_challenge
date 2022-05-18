from users.serializers import SubmitSerializer, SupervisorListSerializer, SupervisorSelectSerializer
from users.models import User
from rest_framework import generics
import logging
logger = logging.getLogger(__name__)

class SupervisorList(generics.ListAPIView):
    queryset = User.objects.filter(jurisdiction__regex=r'\D').order_by('jurisdiction', 'last_name', 'first_name')
    serializer_class = SupervisorListSerializer

class SupervisorSelect(generics.ListAPIView):
    queryset = User.objects.filter(jurisdiction__isnull=False)
    serializer_class = SupervisorSelectSerializer

class Submit(generics.CreateAPIView):
    serializer_class = SubmitSerializer
    def perform_create(self, serializer):
        data = serializer.validated_data
        logger.info(f"\n\nSubmitted Data\n"
            f"**************\n\n"
            f"first_name: {data['first_name']}\n"
            f"last_name: {data['last_name']}\n"
            f"email: {data['email']}\n"
            f"phone: {data['phone']}\n"
            f"supervisor name: {data['supervisor'].first_name} {data['supervisor'].last_name}\n"
            f"supervisor id: {data['supervisor'].id}\n\n")
        serializer.save()
