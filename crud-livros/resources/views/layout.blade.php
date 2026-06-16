<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Livros</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
</head>

<body>

<nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <div class="d-flex justify-content-between w-100">

            <span class="navbar-brand">
                📚 Sistema de Livros
            </span>

            <button
                class="btn btn-outline-light"
                onclick="toggleTheme()"
            >
                🌙
            </button>

        </div>
    </div>
</nav>

<div class="container mt-4">
    @yield('content')
</div>

<script>

function toggleTheme()
{
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');

    localStorage.setItem(
        'darkmode',
        document.body.classList.contains('bg-dark')
    );
}

if(localStorage.getItem('darkmode') === 'true')
{
    document.body.classList.add('bg-dark');
    document.body.classList.add('text-white');
}

</script>
</body>
</html>