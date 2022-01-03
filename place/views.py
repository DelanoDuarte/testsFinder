from django.http.response import JsonResponse
from django.shortcuts import render

from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from place.serializers import CreatePlaceSerializer, PlaceListSerializer
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
