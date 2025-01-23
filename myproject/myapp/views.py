from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def test(request):
    text = request.GET.get('text', '')  # Отримуємо текст із параметра URL
    return render(request, 'test.html', {'text': text})
