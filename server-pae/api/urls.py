from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('tutee', views.TuteeViewSet)
router.register('tutor', views.TutorViewSet)
router.register('subject', views.SubjectViewSet)

urlpatterns = [
	path('', include(router.urls)),
	path('logintutee/', views.LoginTutee.as_view())
]