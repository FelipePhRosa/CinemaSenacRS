import React, { useState, useEffect } from 'react';

export default function AdicionaDiretor() {
  const [directors, setDirectors] = useState([]);
  const [id, setId] = useState('');
  const [nameDiretor, setNameDiretor] = useState('');
  const [ageDiretor, setAgeDiretor] = useState('');
  const [nationality, setNationality] = useState('');
  const [creatingDirector, setCreatingDirector] = useState(true);
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

  const insereDados = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nameDiretor: nameDiretor,
          ageDiretor: ageDiretor,
          nationality: nationality
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar diretor");
      }

      console.log("Diretor adicionado com sucesso");
      setNameDiretor('');
      setAgeDiretor('');
      setNationality('');
      carregaDados();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    carregaDados();
  }, []);

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className="w-[500px] bg-white p-6 rounded-2xl shadow-lg">
        <form onSubmit={insereDados} className='flex flex-col space-y-4'>
          <h2 className="text-2xl font-bold text-center mb-4">Cadastro de Diretores</h2>
          
          <div className="flex flex-col">
            <label htmlFor="nameDiretor" className="mb-2">Nome do Diretor:</label>
            <input
              type="text"
              id="nameDiretor"
              value={nameDiretor}
              onChange={(e) => setNameDiretor(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="ageDiretor" className="mb-2">Idade:</label>
            <input
              type="number"
              id="ageDiretor"
              value={ageDiretor}
              onChange={(e) => setAgeDiretor(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
              min="18"
              max="120"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nationality" className="mb-2">Nacionalidade:</label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Adicionar Diretor
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Diretores Cadastrados</h3>
          <div className="space-y-2">
            {directors.map((item) => (
              <div key={item.id_diretor} className="bg-gray-100 p-3 rounded-lg">
                <p><strong>ID:</strong>{item.id_diretor}</p>
                <p><strong>Nome:</strong> {item.nameDiretor}</p>
                <p><strong>Idade:</strong> {item.ageDiretor}</p>
                <p><strong>Nacionalidade:</strong> {item.nationality}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


