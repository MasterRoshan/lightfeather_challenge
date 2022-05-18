from django.core.management.base import BaseCommand
from users.models import User
import requests

class Command(BaseCommand):
    help = 'Imports supervisor data from remote endpoint'

    def handle(self, *args, **options):

        resp = requests.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
        for supervisor in resp.json():
            try:
                User.objects.get_or_create(id=supervisor.get('id'),
                                    phone=supervisor.get('phone'),
                                    jurisdiction=supervisor.get('jurisdiction'),
                                    id_number=supervisor.get('identificationNumber'),
                                    first_name=supervisor.get('firstName'),
                                    last_name=supervisor.get('lastName'))
            except Exception as exc:
                print(exc)
                