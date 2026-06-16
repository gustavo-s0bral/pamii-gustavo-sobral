@extends('layout')

@section('content')

<div class="card mb-4">

        <div class="card-body">

            <h5>Total de Livros</h5>

            <h2>{{ $totalLivros }}</h2>

        </div>

    </div>

@if(session('success'))

<div class="alert alert-success">
    {{ session('success') }}
</div>

@endif

<div class="d-flex justify-content-between mb-3">

    <h2>Lista de Livros</h2>

    <a href="/livros/create" class="btn btn-success">
        <i class="bi bi-plus-circle"></i>
        Novo Livro
    </a>

</div>

<form method="GET" action="/livros">

    <div class="input-group mb-3">

        <input
            type="text"
            name="busca"
            class="form-control"
            placeholder="Pesquisar livro"
            value="{{ $busca }}"
        >

        <button class="btn btn-primary">
            Buscar
        </button>

    </div>

</form>

<table class="table table-striped table-bordered">

    <thead class="table-dark">

        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Ações</th>
        </tr>

    </thead>

    <tbody>

        @foreach($livros as $livro)

        <tr>

            <td>{{ $livro->id }}</td>
            <td>{{ $livro->titulo }}</td>
            <td>{{ $livro->autor }}</td>
            <td>{{ $livro->ano }}</td>

            <td>

                <a
                    href="/livros/{{ $livro->id }}/edit"
                    class="btn btn-warning btn-sm"
                >
                    <i class="bi bi-pencil-square"></i>
                    Editar
                </a>

                <form
                    action="/livros/{{ $livro->id }}"
                    method="POST"
                    class="d-inline"
                >
                    @csrf
                    @method('DELETE')

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="return confirm('Deseja realmente excluir este livro?')"
                    >
                        <i class="bi bi-trash"></i>
                        Excluir
                    </button>

                </form>

            </td>

        </tr>

        @endforeach

    </tbody>

</table>

{{ $livros->links() }}

@endsection