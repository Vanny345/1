import React, { useEffect, useState } from 'react';
import { cleanerService, bookingService } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cleaners = () => {
  const navigate = useNavigate();
  const [cleaners, setCleaners] = useState([]);
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    address: '',
    city: 'Porto Alegre',
    serviceType: 'standard',
    notes: ''
  });

  const regions = ['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Metropolitana'];

  useEffect(() => {
    fetchCleaners();
  }, [region]);

  const fetchCleaners = async () => {
    setIsLoading(true);
    try {
      const { data } = await cleanerService.getCleaners(region);
      setCleaners(data.cleaners);
    } catch (error) {
      toast.error('Erro ao carregar faxineiras');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      // Aqui você faria o agendamento de verdade
      toast.success('Agendamento realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao criar agendamento');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Encontrar Faxineira</h1>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Filtrar por Região</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Todas as regiões</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center">Carregando...</div>
        ) : cleaners.length === 0 ? (
          <div className="text-center text-gray-600">Nenhuma faxineira disponível nessa região</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaners.map((cleaner) => (
              <div key={cleaner.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {cleaner.photo && (
                  <img src={cleaner.photo} alt={cleaner.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{cleaner.name}</h3>
                  <div className="flex items-center gap-2 my-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700">{cleaner.averageRating.toFixed(1)}</span>
                    <span className="text-gray-600 text-sm">({cleaner.reviewCount} avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Região: {cleaner.region}</p>
                  {cleaner.bio && (
                    <p className="text-sm text-gray-600 mb-4">{cleaner.bio}</p>
                  )}
                  <button
                    onClick={() => setSelectedCleaner(cleaner)}
                    className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCleaner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Agendar com {selectedCleaner.name}</h2>
              
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Início</label>
                    <input
                      type="time"
                      value={bookingForm.startTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fim</label>
                    <input
                      type="time"
                      value={bookingForm.endTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Serviço</label>
                  <select
                    value={bookingForm.serviceType}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="standard">Limpeza Padrão</option>
                    <option value="deep">Limpeza Profunda</option>
                    <option value="eco">Limpeza Ecológica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Informações adicionais..."
                    rows="3"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
                  >
                    Confirmar Agendamento
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCleaner(null)}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cleaners;
