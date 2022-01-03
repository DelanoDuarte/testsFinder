from rest_framework import serializers

from location.models import Geolocation

class LocationSerializer(serializers.Serializer):

    latitude = serializers.CharField(required=True)
    longitude = serializers.CharField(required=True)