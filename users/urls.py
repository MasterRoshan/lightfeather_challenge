from django.urls import path
from users.views import Submit, SupervisorList, SupervisorSelect

urlpatterns = [
    path('supervisors', SupervisorList.as_view()),
    path('select', SupervisorSelect.as_view()),
    path('submit', Submit.as_view()),
]
