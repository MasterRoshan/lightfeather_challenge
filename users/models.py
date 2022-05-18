#from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class User(models.Model):

    first_name = models.CharField(null=True, blank=True, max_length=255)
    last_name = models.CharField(null=True, blank=True, max_length=255)
    phone = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    jurisdiction = models.CharField(null=True, blank=True, max_length=1)
    id_number = models.UUIDField(null=True, blank=True)
    supervisor = models.ForeignKey('users.User', null=True, on_delete=models.SET_NULL)