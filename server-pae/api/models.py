from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class UserManager(BaseUserManager):
	def create_user(self, unique_identifier, password, confirm_password):
		if confirm_password != password:
			raise ValueError("Passwords do not match")

		user = self.model(unique_identifier=unique_identifier)
		user.set_password(password)
		user.save(using=self.db)

		return user 
	
	def create_superuser(self, unique_identifier, password):
		user = self.create_user(unique_identifier , password, password)

		user.is_superuser = True
		user.is_staff = True
		user.save(using=self.db)

		return user

class User(AbstractBaseUser, PermissionsMixin):
	unique_identifier = models.CharField(max_length=20, primary_key=True)
	is_superuser = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_tutor = models.BooleanField(default=False)
	is_tutee = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'unique_identifier'


class Tutor(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	email = models.EmailField(max_length=255, unique=True)
	name = models.CharField(max_length=255)
	registration_number = models.TextField(max_length=9, primary_key=True)
	completed_hours = models.IntegerField(default=0)

	@property
	def schedules(self):
		return self.schedule_set.all()

class Tutee(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	email = models.EmailField(max_length=255, unique=True)
	name = models.CharField(max_length=255)
	registration_number = models.TextField(max_length=9, primary_key=True)

class Subject(models.Model):
	code = models.TextField(max_length=9, primary_key=True)
	name = models.CharField(max_length=255, null=False)
	semester = models.PositiveSmallIntegerField(null=False)

class Schedule(models.Model):
	# PERIOD_CHOICES = [1, 2, 3]
	# DAY_WEEK_CHOICES = [1, 2, 3, 4, 5]
	# HOUR_CHOICES = [x for x in range(7, 18)]  #[7, 17]
	tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
	period = models.PositiveSmallIntegerField(null=False)
	day_week = models.PositiveSmallIntegerField(null=False)
	hour = models.PositiveSmallIntegerField(null=False)
