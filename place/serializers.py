from rest_framework import serializers
from .models import Place, PlaceAddress


class PlaceAddressSerializer(serializers.ModelSerializer):

    mainStreet = serializers.CharField(max_length=2048, required=True)
    additionalStreet = serializers.CharField(max_length=2048)
    streetNumber = serializers.IntegerField(required=False)
    zip = serializers.IntegerField(required=True)
    city = serializers.CharField(max_length=128, required=True)
    country = serializers.CharField(max_length=128, required=True)

    class Meta:
        model = PlaceAddress
        fields = (
            "mainStreet",
            "additionalStreet",
            "streetNumber",
            "zip",
            "city",
            "country",
        )


class PlaceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ("id", "name", "description", "phone", "email", "website")


class CreatePlaceSerializer(serializers.ModelSerializer):

    address = PlaceAddressSerializer()

    class Meta:
        model = Place
        fields = ("id", "name", "description", "phone", "email", "website", "address")

    def create(self, validated_data):
        address_data = validated_data.pop("address")
        if address_data:
            address = PlaceAddress.objects.create(**address_data)
            return Place.objects.create(address=address, **validated_data)
        return Place.objects.create(**validated_data)
