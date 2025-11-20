// src/utils/storage.ts
export const storage = {
  // Stocker l'ID utilisateur temporaire
  setTempUserId: (userId: string): void => {
    localStorage.setItem('temp_user_id', userId);
  },
  
  // Récupérer l'ID utilisateur temporaire
  getTempUserId: (): string | null => {
    return localStorage.getItem('temp_user_id');
  },
  
  // Supprimer l'ID utilisateur temporaire (après connexion)
  removeTempUserId: (): void => {
    localStorage.removeItem('temp_user_id');
  },
  
  // Vérifier si un ID temporaire existe
  hasTempUserId: (): boolean => {
    return !!localStorage.getItem('temp_user_id');
  }
};