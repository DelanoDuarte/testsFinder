from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from location.models import Geolocation, LocationDTO

from location.serializers import LocationSerializer


# Create your views here.
class Location(APIView):
    def post(self, request: Request):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            location: Geolocation
            location = Geolocation.find_by_latitude_and_longitude(LocationDTO(**serializer.data))
            return Response(location.json())
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
