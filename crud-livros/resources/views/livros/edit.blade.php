@extends('layout')

@section('content')

<div class="card">

    <div class="card-header">
        <h3>Editar Livro</h3>
    </div>

    <div class="card-body">

        <form
            action="/livros/{{ $livro->id }}"
            method="POST"
        >

            @csrf
            @method('PUT')

            <div class="mb-3">

                <label>Título</label>

                <input
                    type="text"
                    name="titulo"
                    value="{{ $livro->titulo }}"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

                <label>Autor</label>

                <input
                    type="text"
                    name="autor"
                    value="{{ $livro->autor }}"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

                <label>Ano</label>

                <input
                    type="number"
                    name="ano"
                    value="{{ $livro->ano }}"
                    class="form-control"
                >

            </div>

            <button
                class="btn btn-primary"
            >
                Atualizar
            </button>

            <a
                href="/livros"
                class="btn btn-secondary"
            >
                Voltar
            </a>

        </form>

    </div>

</div>

@endsection