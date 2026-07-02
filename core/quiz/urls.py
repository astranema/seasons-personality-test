# idk if this one is right (line 2)
import quiz.views as views
from django.urls import path

urlpatterns = [
    path("", views.test),
    path("json", views.questionsJson),
    path("results", views.results),
]
