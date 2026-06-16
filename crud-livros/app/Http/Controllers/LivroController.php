<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    public function index(Request $request)
    {
        $livros = Livro::paginate(5);

        $busca = $request->input('busca');

        $livros = Livro::where(
            'titulo',
            'like',
            '%' . $busca . '%'
        )
        ->orWhere(
            'autor',
            'like',
            '%' . $busca . '%'
        )
        ->paginate(5);

        $totalLivros = Livro::count();

        return view(
            'livros.index',
            compact(
                'livros',
                'busca',
                'totalLivros'
            )
        );

        return view(
            'livros.index',
            compact('livros', 'busca')
        );
    }

    public function create()
    {
        return view('livros.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'autor' => 'required',
            'ano' => 'required'
        ]);

        Livro::create($request->all());
        
        return redirect('/livros')
            ->with('success', 'Livro cadastrado com sucesso!');
    }

    public function edit(Livro $livro)
    {
        return view('livros.edit', compact('livro'));
    }

    public function update(Request $request, Livro $livro)
    {
        $livro->update($request->all());

        return redirect('/livros')
            ->with('success', 'Livro atualizado com sucesso!');
    }

    public function destroy(Livro $livro)
    {
        $livro->delete();

        return redirect('/livros')
            ->with('success', 'Livro removido com sucesso!');
    }
}