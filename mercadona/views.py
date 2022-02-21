import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.shortcuts import render
import joblib
import numpy as np
from werkzeug import Response
from django.core import serializers


def homePage(request):

    return render(request, 'index.html')


def obtener(request):
    canal = int(request.GET.get('canal'))
    region = int(request.GET.get('region'))
    # Carga del modelo.
    frozen = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_frozen.pkl")
    milk = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_milk.pkl")
    deter = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_deter.pkl")
    fresh = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_fresh.pkl")
    grocery = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_grocery.pkl")
    delicassen = joblib.load(
        r"C:\Users\wilov\Favorites\nuevovirtual\mercadona\static\modelo\modelo_entrenado_delicassen.pkl")

    result_frozen = frozen.predict([[region, canal]])
    result_milk = milk.predict([[region, canal]])
    result_deter = deter.predict([[region, canal]])
    result_grocery = grocery.predict([[region, canal]])
    result_delicassen = delicassen.predict([[region, canal]])
    result_fresh = fresh.predict([[region, canal]])

    arreglo = [{result_frozen[0]: result_milk[0],
                result_deter[0]: result_grocery[0],
                result_delicassen[0]: result_fresh[0]
                }]
    return HttpResponse(arreglo)
