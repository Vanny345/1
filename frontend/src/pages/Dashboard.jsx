import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { bookingService, userService } from '../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          bookingService.getUserBookings(user.id),
          userService.getProfile()
        ]);
        setBookings(bookingsRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        toast.error('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-500">Leidy Cleaner</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{profile?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Bem-vindo, {profile?.name}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Meus Agendamentos</h3>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <p className="text-gray-600">Você ainda não tem agendamentos.</p>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{booking.cleaner.name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.date).toLocaleDateString('pt-BR')} às {booking.startTime}
                        </p>
                        <p className="text-sm text-gray-600">{booking.address}</p>
                        <p className="text-sm font-medium text-gray-800 mt-2">
                          R$ {booking.estimatedPrice.toFixed(2)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status === 'completed' ? 'Concluído' : booking.status === 'cancelled' ? 'Cancelado' : 'Confirmado'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Meu Perfil</h3>
            <div className="bg-white p-4 rounded-lg shadow space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{profile?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-semibold text-gray-800">{profile?.phone || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Endereço</p>
                <p className="font-semibold text-gray-800">{profile?.address || 'Não informado'}</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 mt-4"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/cleaners')}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 font-semibold"
          >
            Agendar Limpeza
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
