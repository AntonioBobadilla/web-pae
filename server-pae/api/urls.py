from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('tutee', views.TuteeViewSet)

urlpatterns = [
	path('', include(router.urls))
]