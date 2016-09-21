from django.shortcuts import *
from django.contrib.auth import *
from django.http import HttpResponse, HttpResponseRedirect

import datetime
from urllib.parse import quote


def logout_user(request):
    if request.user.is_authenticated():
        logout(request)
    return HttpResponseRedirect('/')


def signup_user(request):
    if request.user.is_authenticated():
        #they did something weird
        return HttpResponseRedirect('/')

    if request.method == "GET":
        return render(request, "authentication/signup.html", {'user': False})

    elif request.method == "POST":
        try:
            print(request.POST.get("username"))
            models.User.objects.create_user(
                request.POST.get("username"),
                None,
                request.POST.get("password")
            )
            user = authenticate(username=request.POST.get("username"), password=request.POST.get("password"))
            login(request, user)
            return HttpResponseRedirect("/")
        except Exception as inst:
            return HttpResponse("ERROR: " + str(inst))


def login_user(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            return render(request, 'authentication/login.html', {'user': False, 'error': True})
    else:
        if request.user.is_authenticated():
            return HttpResponseRedirect('/')
        return render(request, 'authentication/login.html', {'user': False})


def is_username_available(request, url):
    try:
        _ = models.User.objects.get(username__iexact=url)
        return HttpResponse('false')
    except models.User.DoesNotExist:
        return HttpResponse('true')
