import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    cpf: '',
    age: '',
    region: ''
  });
  const [photo, setPhoto] = useState(null);
  const { registerUser, registerCleaner, isLoading } = useAuthStore();

  const regions = ['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Metropolitana'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Para MVP, usar URL de foto pública
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Senhas não conferem');
      return;
    }

    try {
      if (userType === 'user') {
        await registerUser(formData.email, formData.password, formData.name, formData.phone);
      } else {
        await registerCleaner({
          ...formData,
          dateOfBirth: new Date(`${formData.age}-01-01`),
          photo: photo || 'https://via.placeholder.com/200'
        });
      }
      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8">
          <h1 className="text-3xl font-bold text-white text-center">Leidy Cleaner</h1>
          <p className="text-purple-100 text-center mt-2">Cadastro</p>
        </div>

        <div className="p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setUserType('user')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                userType === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Cliente
            </button>
            <button
              onClick={() => setUserType('cleaner')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                userType === 'cleaner'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Faxineira
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2" /> Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2" /> Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+55 51 99999-9999"
              />
            </div>

            {userType === 'cleaner' && (
              <>
                {/* CPF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="123.456.789-00"
                  />
                </div>

                {/* Idade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="80"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>

                {/* Região */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Região</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma região</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Foto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {photo ? (
                          <>
                            <img src={photo} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
                            <p className="text-xs text-purple-600 mt-2">Clique para mudar</p>
                          </>
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs text-purple-600">Clique para enviar foto</p>
                          </>
                        )}
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaLock className="inline mr-2" /> Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Já tem conta?{' '}
            <Link to="/login" className="text-purple-500 font-semibold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
