from django.urls import path

from . import views

urlpatterns = [
    path("", view=views.PlaceList.as_view()),
]
