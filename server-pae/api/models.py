from lib2to3.pytree import Base
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class UserManager(BaseUserManager):
	def create_user(self, registration_number, password, name):
		if not registration_number:
			raise ValueError("must have registrationNumber")

		user = self.model(registration_number=registration_number, name=name)
		user.set_password(password)
		user.save(using=self.db)

		return user 

	def create_superuser(self, registration_number, password, name):
		user = self.create_user(registration_number, password, name)

		user.is_superuser = True
		user.is_staff = True
		user.save(using=self.db)

		return user

class User(AbstractBaseUser, PermissionsMixin):
	registration_number = models.TextField(max_length=9, primary_key=True)
	name = models.CharField(max_length=255)
	is_superuser = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_tutor = models.BooleanField(default=False)
	is_tutee = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'registration_number'
	REQUIRED_FIELDS = ['name']


class Tutor(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	email = models.EmailField(max_length=255, unique=True)
	completed_hours = models.IntegerField(default=0)

class Tutee(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	email = models.EmailField(max_length=255, unique=True)

