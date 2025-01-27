from django.shortcuts import render
from django.http import JsonResponse
from .models import Text
import json
from django.http import HttpResponse
from django.urls import reverse
from django.templatetags.static import static
def index(request):
    return render(request, 'index.html')

def test(request):
    return render(request, 'test.html')


def generate_bookmarklet(request):
    # URL до статичного файлу bookMarklet.js
    script_url = request.build_absolute_uri(static('js/bookMarklet.js'))

    # Генерація букмарклету
    bookmarklet_code = f"javascript:(function(){{var script=document.createElement('script');script.src='{script_url}';document.body.appendChild(script);}})();"

    return HttpResponse(bookmarklet_code, content_type="text/plain")

import random

def random_text(request):
    texts = Text.objects.all()  # Отримуємо всі тексти з бази даних
    if texts:
        random_text = random.choice(texts)  # Вибираємо випадковий текст
    else:
        random_text = None  # Якщо текстів немає, встановлюємо None
    return render(request, 'your_template.html', {'text': random_text})

























