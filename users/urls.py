from django.urls import path
from users.views import Submit, SupervisorList

urlpatterns = [
    path('supervisors', SupervisorList.as_view()),
    path('submit', Submit.as_view()),
]
