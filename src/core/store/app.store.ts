import { create } from 'zustand';
import { Services, createServices } from '../services';

interface AppState {
  services: Services;
  isLoading: boolean;
  error: Error | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  services: createServices(),
  isLoading: false,
  error: null,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
}));

// Hooks utilitaires pour accéder aux services
export const useAnimalService = () => useAppStore((state) => state.services.animalService);
export const usePersonService = () => useAppStore((state) => state.services.personService);
export const useStatisticsService = () => useAppStore((state) => state.services.statisticsService);

// Hook pour gérer l'état de chargement global
export const useLoading = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setLoading = useAppStore((state) => state.setLoading);
  return { isLoading, setLoading };
};

// Hook pour gérer les erreurs globales
export const useError = () => {
  const error = useAppStore((state) => state.error);
  const setError = useAppStore((state) => state.setError);
  return { error, setError };
};
