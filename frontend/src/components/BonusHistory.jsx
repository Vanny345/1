import React, { useEffect, useState } from 'react';
import { bonusService } from '../services/bonusService';
import { notificationService } from '../services/notificationService';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { FaTrophy, FaStar, FaCalendar, FaDollarSign } from 'react-icons/fa';

const BonusHistory = () => {
  const { user } = useAuthStore();
  const [bonusData, setBonusData] = useState(null);
  const [topCleanerStatus, setTopCleanerStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eligibilityCheck, setEligibilityCheck] = useState(null);

  useEffect(() => {
    loadBonusData();
  }, [user?.id]);

  const loadBonusData = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Carregar histórico de bônus
      const historyData = await bonusService.getBonusHistory(user.id);
      setBonusData(historyData);

      // Verificar status TOP CLEANER
      const topCleanerData = await bonusService.getTopCleanerStatus(user.id);
      setTopCleanerStatus(topCleanerData);

      // Verificar elegibilidade para novo bônus
      const eligibilityData = await bonusService.checkBonusEligibility(user.id);
      setEligibilityCheck(eligibilityData);
    } catch (error) {
      console.error('Erro ao carregar dados de bônus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimBonus = async () => {
    if (!eligibilityCheck?.eligible) {
      toast.warning('Você ainda não é elegível para um bônus');
      return;
    }

    try {
      const result = await bonusService.processBonus(user.id);
      
      if (result.success) {
        toast.success(`Bônus de R$ ${result.amount} transferido com sucesso!`);
        
        // Enviar notificação
        notificationService.notifyBonusUnlocked();
        
        // Se alcançou TOP CLEANER
        if (topCleanerStatus?.isTopCleaner) {
          notificationService.notifyTopCleanerStatus();
        }
        
        // Recarregar dados
        loadBonusData();
      } else {
        toast.error('Erro ao processar bônus');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao processar bônus');
    }
  };

  if (isLoading) {
    return (
      <div className=\"flex items-center justify-center p-8\">
        <p className=\"text-gray-400\">Carregando dados de bônus...</p>
      </div>
    );
  }

  return (
    <div className=\"space-y-6\">
      {/* Eligibilidade para Bônus */}\n      {eligibilityCheck?.eligible && (
        <div className=\"bg-gradient-to-r from-yellow-900 to-orange-900 rounded-lg p-6 border border-yellow-700\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <h3 className=\"text-lg font-bold text-yellow-200 mb-2\">🎉 Novo Bônus Disponível!</h3>\n              <p className=\"text-gray-300 mb-2\">\n                Você tem {eligibilityCheck.consecutiveFiveStars} avaliações 5 estrelas\n              </p>\n              <p className=\"text-xl font-bold text-yellow-300\">\n                Ganhe R$ {eligibilityCheck.bonusAmount} agora!\n              </p>\n            </div>\n            <button\n              onClick={handleClaimBonus}\n              className=\"px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition\"\n            >\n              Receber Bônus\n            </button>\n          </div>\n        </div>\n      )}\n\n      {/* Status TOP CLEANER */}\n      {topCleanerStatus?.isTopCleaner && (\n        <div className=\"bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-6 border border-purple-700\">\n          <div className=\"flex items-center gap-4\">\n            <FaTrophy className=\"text-5xl text-yellow-300\" />\n            <div>\n              <h3 className=\"text-lg font-bold text-purple-200 mb-2\">👑 TOP CLEANER</h3>\n              <p className=\"text-gray-300 mb-1\">\n                Parabéns! Você é um TOP CLEANER até {new Date(topCleanerStatus.topCleanerUntil).toLocaleDateString('pt-BR')}\n              </p>\n              <p className=\"text-sm text-gray-400\">\n                Receba bônus exclusivos e aumente sua visibilidade na plataforma\n              </p>\n              <p className=\"text-yellow-300 font-semibold mt-2\">\n                Total ganho em bônus: R$ {topCleanerStatus.totalBonusEarned.toFixed(2)}\n              </p>\n            </div>\n          </div>\n        </div>\n      )}\n\n      {/* Histórico de Bônus */}\n      <div className=\"bg-gray-800 rounded-lg border border-gray-700 overflow-hidden\">\n        <div className=\"p-4 border-b border-gray-700\">\n          <h3 className=\"text-lg font-bold flex items-center gap-2\">\n            <FaTrophy className=\"text-yellow-500\" />\n            Histórico de Bônus\n          </h3>\n        </div>\n\n        <div className=\"divide-y divide-gray-700\">\n          {bonusData?.bonuses && bonusData.bonuses.length > 0 ? (\n            bonusData.bonuses.map((bonus) => (\n              <div key={bonus.id} className=\"p-4 hover:bg-gray-700 transition\">\n                <div className=\"flex items-center justify-between\">\n                  <div className=\"flex items-center gap-4\">\n                    <div className=\"flex-shrink-0\">\n                      {bonus.status === 'completed' ? (\n                        <FaDollarSign className=\"text-2xl text-green-500\" />\n                      ) : (\n                        <FaDollarSign className=\"text-2xl text-gray-500\" />\n                      )}\n                    </div>\n                    <div>\n                      <p className=\"font-semibold text-white\">{bonus.reason}</p>\n                      <p className=\"text-sm text-gray-400 flex items-center gap-1 mt-1\">\n                        <FaCalendar className=\"text-xs\" />\n                        {new Date(bonus.date).toLocaleDateString('pt-BR')}\n                      </p>\n                    </div>\n                  </div>\n                  <div className=\"text-right\">\n                    <p className=\"text-xl font-bold text-green-400\">R$ {bonus.amount.toFixed(2)}</p>\n                    <p className={`text-xs font-semibold mt-1 ${\n                      bonus.status === 'completed'\n                        ? 'text-green-300'\n                        : bonus.status === 'pending'\n                        ? 'text-yellow-300'\n                        : 'text-red-300'\n                    }`}>\n                      {bonus.status === 'completed'\n                        ? '✅ Concluído'\n                        : bonus.status === 'pending'\n                        ? '⏳ Pendente'\n                        : '❌ Cancelado'}\n                    </p>\n                  </div>\n                </div>\n              </div>\n            ))\n          ) : (\n            <div className=\"p-8 text-center text-gray-400\">\n              <FaStar className=\"text-4xl mx-auto mb-2 opacity-50\" />\n              <p>Nenhum bônus ainda. Comece a receber 5 estrelas!</p>\n            </div>\n          )}\n        </div>\n      </div>\n\n      {/* Resumo de Ganhos */}\n      {bonusData && (\n        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n          <div className=\"bg-gray-800 rounded-lg p-4 border border-gray-700\">\n            <p className=\"text-gray-400 text-sm\">Total em Bônus</p>\n            <p className=\"text-3xl font-bold text-green-400 mt-2\">\n              R$ {bonusData.totalBonusEarned?.toFixed(2) || '0.00'}\n            </p>\n          </div>\n          <div className=\"bg-gray-800 rounded-lg p-4 border border-gray-700\">\n            <p className=\"text-gray-400 text-sm\">Avaliações 5 Estrelas</p>\n            <p className=\"text-3xl font-bold text-yellow-400 mt-2\">\n              {eligibilityCheck?.consecutiveFiveStars || 0} / 10\n            </p>\n          </div>\n          <div className=\"bg-gray-800 rounded-lg p-4 border border-gray-700\">\n            <p className=\"text-gray-400 text-sm\">Próximo Bônus</p>\n            <p className=\"text-3xl font-bold text-blue-400 mt-2\">\n              R$ {(eligibilityCheck?.bonusAmount || 100).toFixed(2)}\n            </p>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default BonusHistory;
