from django.urls import path

from . import views

urlpatterns = [
    path("find", view=views.Location.as_view()),
]
