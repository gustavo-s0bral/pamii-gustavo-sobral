@extends('layout')

@section('content')

<div class="card">

    <div class="card-header">
        <h3>Cadastrar Livro</h3>
    </div>

    <div class="card-body">

        <form action="/livros" method="POST">

            @csrf

            <div class="mb-3">

                <label>Título</label>

                <input
                    type="text"
                    name="titulo"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

                <label>Autor</label>

                <input
                    type="text"
                    name="autor"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

                <label>Ano</label>

                <input
                    type="number"
                    name="ano"
                    class="form-control"
                >

            </div>

            <button
                type="submit"
                class="btn btn-success"
            >
                Salvar
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