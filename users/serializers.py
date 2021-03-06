from users.models import User
from rest_framework import serializers

class SupervisorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['jurisdiction', 'last_name', 'first_name']

class SupervisorSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_name', 'first_name']

class SubmitSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    supervisor = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'supervisor']
