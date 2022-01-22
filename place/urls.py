from django.urls import path

from . import views

urlpatterns = [
    path("", view=views.PlaceList.as_view()),
    path("page", view=views.PlacePaginatedList.as_view()),
    path("nearby", view=views.PlacesNearbyList.as_view()),
    path("<int:id>/decrement/test", view=views.DecrementTestFromPlace.as_view())
]
