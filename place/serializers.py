from rest_framework import serializers
from .models import Place, PlaceAddress


class PlaceAddressListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceAddress
        fields = (
            "id",
            "address",
            "district",
            "zone",
            "zip",
            "city",
            "country",
            "latitude",
            "longitude",
        )


class PlaceAddressSerializer(serializers.ModelSerializer):

    address = serializers.CharField(max_length=2048, required=True)
    district = serializers.CharField(max_length=2048)
    zone = serializers.CharField(required=False)
    zip = serializers.CharField(required=True)
    city = serializers.CharField(max_length=128, required=True)
    country = serializers.CharField(max_length=128, required=True)

    lat = serializers.DecimalField(
        max_digits=50, decimal_places=30, required=True, source="latitude"
    )
    lng = serializers.DecimalField(
        max_digits=50, decimal_places=30, required=True, source="longitude"
    )

    class Meta:
        model = PlaceAddress
        fields = ("address", "district", "zone", "zip", "city", "country", "lat", "lng")


class PlaceAddressGeolocationSerializer(serializers.Serializer):
    latitude = serializers.CharField(required=True)
    longitude = serializers.CharField(required=True)


class PlaceListSerializer(serializers.ModelSerializer):

    address = PlaceAddressListSerializer()

    class Meta:
        model = Place
        fields = (
            "id",
            "name",
            "description",
            "phone",
            "email",
            "website",
            "address",
            "amount_tests",
            "last_update",
        )


class CreatePlaceSerializer(serializers.ModelSerializer):

    address = PlaceAddressSerializer()
    description = serializers.CharField(required=False)
    website = serializers.CharField(required=False)

    amount_tests = serializers.IntegerField(required=True)

    class Meta:
        model = Place
        fields = (
            "id",
            "name",
            "description",
            "phone",
            "email",
            "website",
            "address",
            "amount_tests",
        )

    def create(self, validated_data):
        address_data = validated_data.pop("address")
        if address_data:
            address = PlaceAddress.objects.create(**address_data)
            return Place.objects.create(address=address, **validated_data)
        return Place.objects.create(**validated_data)


class DecrementTestSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField()
    amount = serializers.IntegerField(required=True, min_value=1, source="amount_tests")

    class Meta:
        model = Place
        fields = ("id", "name", "amount")