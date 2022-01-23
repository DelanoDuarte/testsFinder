from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from place.serializers import (CreatePlaceSerializer, DecrementTestSerializer,
                               PlaceAddressGeolocationSerializer, PlaceListSerializer)
from place.service import PlaceService

from .models import Place


# Create your views here.
class PlaceList(APIView):
    def get(self, request: Request):
        stores = Place.objects.all()
        serializer = PlaceListSerializer(stores, many=True)
        return Response(serializer.data)

    def post(self, request: Request):
        data = JSONParser().parse(request)
        serializer = CreatePlaceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PlacePaginatedList(ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceListSerializer
    pagination_class = LimitOffsetPagination


class PlacesNearbyList(APIView):
    def post(self, request: Request):
        data = JSONParser().parse(request)
        locationSerializer = PlaceAddressGeolocationSerializer(data=data)
        if locationSerializer.is_valid():
            places = Place.find_nearby_places(**locationSerializer.data)
            serializer = PlaceListSerializer(places, many=True)
            return Response(serializer.data)
        return Response(locationSerializer.errors, status=400)


class DecrementTestFromPlace(APIView):
    def post(self, request: Request, id: int):
        serializer = DecrementTestSerializer(data=request.data)
        if serializer.is_valid():
            service = PlaceService()
            place = service.decrement_test(id, **serializer.data)
            pSerializer = DecrementTestSerializer(place, many=False)
            return Response(pSerializer.data)
        return Response(serializer.errors, status=400)
