from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Hidratacao, Alimentacao, Estudo, Sono, Treino


# HIDRATAÇÃO 

@login_required
def criar_hidratacao(request):
    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')
        meta = request.POST.get('meta')

        Hidratacao.objects.create(
            usuario=request.user,
            data_registro=request.POST.get('data'),
            quantidade_ml=int(quantidade) if quantidade else 0,
            meta_ml=int(meta) if meta else 0
        )
        return redirect('listar_hidratacao')

    return render(request, 'hidratacao/criar.html')


@login_required
def listar_hidratacao(request):
    dados = Hidratacao.objects.filter(usuario=request.user)
    return render(request, 'hidratacao/listar.html', {'dados': dados})


@login_required
def editar_hidratacao(request, id):
    item = get_object_or_404(Hidratacao, id=id, usuario=request.user)

    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')
        meta = request.POST.get('meta')

        item.quantidade_ml = int(quantidade) if quantidade else 0
        item.meta_ml = int(meta) if meta else 0
        item.save()
        return redirect('listar_hidratacao')

    return render(request, 'hidratacao/editar.html', {'item': item})


@login_required
def deletar_hidratacao(request, id):
    item = get_object_or_404(Hidratacao, id=id, usuario=request.user)
    item.delete()
    return redirect('listar_hidratacao')


#  ALIMENTAÇÃO 

@login_required
def criar_alimentacao(request):
    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')

        Alimentacao.objects.create(
            usuario=request.user,
            data_registro=request.POST.get('data'),
            quantidade_refeicoes=int(quantidade) if quantidade else 0,
            horarios=request.POST.get('horarios'),
            classificacao=request.POST.get('classificacao'),
        )
        return redirect('listar_alimentacao')

    return render(request, 'alimentacao/criar.html')


@login_required
def listar_alimentacao(request):
    dados = Alimentacao.objects.filter(usuario=request.user)
    return render(request, 'alimentacao/listar.html', {'dados': dados})


@login_required
def editar_alimentacao(request, id):
    item = get_object_or_404(Alimentacao, id=id, usuario=request.user)

    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')

        item.quantidade_refeicoes = int(quantidade) if quantidade else 0
        item.horarios = request.POST.get('horarios')
        item.classificacao = request.POST.get('classificacao')
        item.save()
        return redirect('listar_alimentacao')

    return render(request, 'alimentacao/editar.html', {'item': item})


@login_required
def deletar_alimentacao(request, id):
    item = get_object_or_404(Alimentacao, id=id, usuario=request.user)
    item.delete()
    return redirect('listar_alimentacao')


# ESTUDO 

@login_required
def criar_estudo(request):
    if request.method == 'POST':
        horas = request.POST.get('horas')
        produtividade = request.POST.get('produtividade')

        Estudo.objects.create(
            usuario=request.user,
            data_registro=request.POST.get('data'),
            horas_estudo=float(horas) if horas else 0,
            produtividade=int(produtividade) if produtividade else 0,
        )
        return redirect('listar_estudo')

    return render(request, 'estudo/criar.html')


@login_required
def listar_estudo(request):
    dados = Estudo.objects.filter(usuario=request.user)
    return render(request, 'estudo/listar.html', {'dados': dados})


@login_required
def editar_estudo(request, id):
    item = get_object_or_404(Estudo, id=id, usuario=request.user)

    if request.method == 'POST':
        horas = request.POST.get('horas')
        produtividade = request.POST.get('produtividade')

        item.horas_estudo = float(horas) if horas else 0
        item.produtividade = int(produtividade) if produtividade else 0
        item.save()
        return redirect('listar_estudo')

    return render(request, 'estudo/editar.html', {'item': item})


@login_required
def deletar_estudo(request, id):
    item = get_object_or_404(Estudo, id=id, usuario=request.user)
    item.delete()
    return redirect('listar_estudo')


# SONO 

@login_required
def criar_sono(request):
    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')

        Sono.objects.create(
            usuario=request.user,
            data_registro=request.POST.get('data'),
            hora_dormir=request.POST.get('dormi'),
            hora_acordar=request.POST.get('acordar'),
            quantidade=int(quantidade) if quantidade else 0,
        )
        return redirect('listar_sono')

    return render(request, 'sono/criar.html')


@login_required
def listar_sono(request):
    dados = Sono.objects.filter(usuario=request.user)
    return render(request, 'sono/listar.html', {'dados': dados})


@login_required
def editar_sono(request, id):
    item = get_object_or_404(Sono, id=id, usuario=request.user)

    if request.method == 'POST':
        quantidade = request.POST.get('quantidade')

        item.hora_dormir = request.POST.get('dormi')
        item.hora_acordar = request.POST.get('acordar')
        item.quantidade = int(quantidade) if quantidade else 0
        item.save()
        return redirect('listar_sono')

    return render(request, 'sono/editar.html', {'item': item})


@login_required
def deletar_sono(request, id):
    item = get_object_or_404(Sono, id=id, usuario=request.user)
    item.delete()
    return redirect('listar_sono')


# TREINO 

@login_required
def criar_treino(request):
    if request.method == 'POST':
        planejada = request.POST.get('planejada')
        realizada = request.POST.get('realizada')
        status = request.POST.get('status')

        Treino.objects.create(
            usuario=request.user,
            data_registro=request.POST.get('data'),
            quantidade_planejada=int(planejada) if planejada else 0,
            quantidade_realizada=int(realizada) if realizada else 0,
            status=status,
        )
        return redirect('listar_treino')

    return render(request, 'treino/criar.html')


@login_required
def listar_treino(request):
    dados = Treino.objects.filter(usuario=request.user)
    return render(request, 'treino/listar.html', {'dados': dados})


@login_required
def editar_treino(request, id):
    item = get_object_or_404(Treino, id=id, usuario=request.user)

    if request.method == 'POST':
        planejada = request.POST.get('planejada')
        realizada = request.POST.get('realizada')

        item.quantidade_planejada = int(planejada) if planejada else 0
        item.quantidade_realizada = int(realizada) if realizada else 0
        item.status = request.POST.get('status')
        item.save()
        return redirect('listar_treino')

    return render(request, 'treino/editar.html', {'item': item})


@login_required
def deletar_treino(request, id):
    item = get_object_or_404(Treino, id=id, usuario=request.user)
    item.delete()
    return redirect('listar_treino')