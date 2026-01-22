"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse


class APIRootView(APIView):
    def get(self, request, format=None):
        # Get CODESPACE_NAME from environment, default to localhost
        codespace_name = os.getenv('CODESPACE_NAME')
        if codespace_name:
            scheme = 'https'
            host = f'{codespace_name}-8000.app.github.dev'
        else:
            scheme = request.scheme
            host = request.get_host()
        
        base_url = f'{scheme}://{host}/api'
        
        return Response({
            'users': f'{base_url}/users/',
            'teams': f'{base_url}/teams/',
            'activities': f'{base_url}/activities/',
            'leaderboard': f'{base_url}/leaderboard/',
            'workouts': f'{base_url}/workouts/',
        })


urlpatterns = [
    path('', APIRootView.as_view(), name='api_root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
