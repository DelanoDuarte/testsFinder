from rest_framework import serializers

class LocationSerializer(serializers.Serializer):

    latitude = serializers.CharField(required=True)
    longitude = serializers.CharField(required=True)