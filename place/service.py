
from place.models import Place
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

class PlaceService():

    _channel_layer = get_channel_layer()

    def increment_test():
        pass

    def decrement_test(self, placeId: int, amount: int):
        place = Place.decrement_tests(placeId, amount)

        # send event on channel
        async_to_sync(self._channel_layer.group_send)(
            "places_nearby",
            {"type": "update.places"},
        )

        return place