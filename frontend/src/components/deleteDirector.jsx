import React, { useState, useEffect } from 'react';

export default function DeletarDiretor() {
  const [directors, setDirectors] = useState([]);
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const url = 'http://localhost:3000/diretores';

  const carregaDados = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDirectors(data);
    } catch (error) {
      console.error('Erro ao buscar dados de Diretores:', error);
    }
  };

  const deletarDiretor = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/deldiretores`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_diretor: id
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar diretor");
      }

      const resultado = await response.text();
      setMensagem(resultado);
      setId('');
      carregaDados(); // Recarrega a lista de diretores após a exclusão
    } catch (error) {
      console.error(error.message);
      setMensagem(error.message);
    }
  };

  

  useEffect(() => {
    carregaDados();
  }, []);

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className="w-[600px] bg-white p-6 rounded-2xl shadow-lg">
        <form onSubmit={deletarDiretor} className='flex flex-col space-y-4'>
          <h2 className="text-2xl font-bold text-center mb-4">Exclusão de Diretores</h2>
          
          <div className="flex flex-col">
            <label htmlFor="id_diretor" className="mb-2">ID do Diretor:</label>
            <input
              type="number"
              id="id_diretor"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {mensagem && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              {mensagem}
            </div>
          )}

          <button 
            type="submit" 
            className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Deletar Diretor
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Diretores Cadastrados</h3>
          <div className="max-h-[300px] overflow-y-auto">
            {directors.map((diretor) => (
              <div 
                key={diretor.id_diretor} 
                className="bg-gray-100 p-3 rounded-lg mb-2 flex justify-between items-center"
              >
                <div>
                  <p><strong>ID:</strong> {diretor.id_diretor}</p>
                  <p><strong>Nome:</strong> {diretor.nameDiretor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}