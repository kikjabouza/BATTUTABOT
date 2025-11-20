import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, User, LogIn, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


// ✅ Configuration de l'API
const API_BASE_URL = 'http://localhost:8000';

// ✅ Définition des types
interface ApiQuestion {
  id: number;
  texte_question: string;
  type_question: string;
  options_question: string | null;
  ordre_affichage: number;
  type_utilisateur: string;
}

interface CurrentUser {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  role: string;
}

type QuestionOption = {
  value: string;
  label: string;
};

interface QuestionData {
  id: number;
  question: string;
  type: "radio" | "text";
  options?: QuestionOption[];
  placeholder?: string;
}

// ✅ Utilitaires pour le localStorage
const storage = {
  getTempUserId: (): string | null => {
    return localStorage.getItem('temp_user_id');
  },
  removeTempUserId: (): void => {
    localStorage.removeItem('temp_user_id');
  },
  hasTempUserId: (): boolean => {
    return !!localStorage.getItem('temp_user_id');
  },
  saveTempResponses: (responses: Record<number, string>): void => {
    localStorage.setItem('temp_questionnaire_responses', JSON.stringify(responses));
  },
  getTempResponses: (): Record<number, string> => {
    const saved = localStorage.getItem('temp_questionnaire_responses');
    return saved ? JSON.parse(saved) : {};
  },
  clearTempResponses: (): void => {
    localStorage.removeItem('temp_questionnaire_responses');
  }
};

const QuiseRegistration = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [hasTempUser, setHasTempUser] = useState<boolean>(false);

  // ✅ Vérifier s'il y a un utilisateur temporaire et charger les réponses sauvegardées
  useEffect(() => {
    const tempUserId = storage.getTempUserId();
    if (tempUserId) {
      console.log('👤 Utilisateur temporaire détecté:', tempUserId);
      setHasTempUser(true);
      
      // Charger les réponses sauvegardées si elles existent
      const savedResponses = storage.getTempResponses();
      if (Object.keys(savedResponses).length > 0) {
        console.log('📝 Réponses temporaires chargées:', savedResponses);
        setAnswers(savedResponses);
      }
      
      // Simuler un utilisateur temporaire
      const tempUser: CurrentUser = {
        id: parseInt(tempUserId),
        email: "utilisateur_temporaire@example.com",
        prenom: "Utilisateur",
        nom: "Temporaire",
        role: "ROLE_TOURISTE"
      };
      setCurrentUser(tempUser);
      setIsLoading(false);
    } else {
      // Pas d'utilisateur temporaire, vérifier l'authentification
      checkAuthentication();
    }
  }, []);

  // ✅ Vérifier et traiter les données de profil temporaires après connexion
  useEffect(() => {
    const tempProfileData = localStorage.getItem('temp_profile_data');
    if (tempProfileData && currentUser && !hasTempUser) {
      console.log('🔄 Traitement des données de profil temporaires après connexion...');
      
      const createProfileFromTempData = async () => {
        try {
          const profileData = JSON.parse(tempProfileData);
          
          const response = await fetch(`${API_BASE_URL}/api/choisir-profil`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(profileData),
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              console.log('✅ Profil créé avec succès après connexion');
              localStorage.removeItem('temp_profile_data');
            }
          }
        } catch (error) {
          console.log('❌ Erreur création profil différée:', error);
        }
      };
      
      createProfileFromTempData();
    }
  }, [currentUser, hasTempUser]);

  // ✅ Vérifier l'authentification de l'utilisateur
  const checkAuthentication = async (): Promise<void> => {
    try {
      console.log('🔐 Vérification de l\'authentification...');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.success && userData.user) {
          setCurrentUser(userData.user);
          console.log('✅ Utilisateur connecté:', userData.user);
        }
      } else {
        console.warn('⚠️ Utilisateur non connecté');
        setError('Vous devez être connecté pour compléter le questionnaire');
      }
    } catch (err) {
      console.error('❌ Erreur vérification auth:', err);
      setError('Impossible de vérifier votre authentification');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Charger les questions depuis l'API Symfony
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('🔄 Chargement des questions...');
        
        const response = await fetch(`${API_BASE_URL}/api/questionnaire/questions/Touriste`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log('📡 Statut des questions:', response.status);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.questions) {
          console.log('✅ Questions chargées:', data.questions.length);
          
          const formattedQuestions: QuestionData[] = data.questions.map((q: ApiQuestion) => {
            let type: "radio" | "text" = "text";
            let options: { value: string; label: string }[] | undefined;
            
            if (q.type_question === 'radio' || q.type_question === 'select' || q.type_question === 'checkbox') {
              type = "radio";
              
              if (q.options_question) {
                try {
                  const optionsArray = JSON.parse(q.options_question) as unknown[];
                  
                  options = optionsArray.map((opt) => {
                    if (typeof opt === 'object' && opt !== null && 'texte' in opt && 'valeur' in opt) {
                      const o = opt as { texte?: string; valeur?: string };
                      if (o.texte && o.valeur) {
                        return {
                          value: o.valeur,
                          label: o.texte
                        };
                      }
                    }
                    if (typeof opt === 'string') {
                      return {
                        value: opt.toLowerCase().replace(/\s+/g, '_'),
                        label: opt
                      };
                    }
                    return {
                      value: 'option_' + Math.random().toString(36).slice(2, 8),
                      label: 'Option ' + Math.random().toString(36).slice(2, 8)
                    };
                  });
                  
                } catch (e) {
                  console.error('❌ Erreur parsing options:', e);
                  options = [
                    { value: "option_1", label: "Option 1" },
                    { value: "option_2", label: "Option 2" },
                    { value: "option_3", label: "Option 3" }
                  ];
                }
              } else {
                options = [
                  { value: "option_1", label: "Option 1" },
                  { value: "option_2", label: "Option 2" },
                  { value: "option_3", label: "Option 3" }
                ];
              }
            }
            
            if (q.type_question === 'number' || q.type_question === 'text') {
              type = "text";
            }
            
            return {
              id: q.id,
              question: q.texte_question,
              type: type,
              options: options,
              placeholder: q.type_question === 'number' ? "Entrez un nombre..." : "Votre réponse..."
            };
          });
          
          setQuestions(formattedQuestions);
        } else {
          throw new Error(data.message || 'Format de réponse invalide');
        }
      } catch (err) {
        console.error('❌ Erreur chargement questions:', err);
        setError(err instanceof Error ? err.message : 'Impossible de charger les questions. Veuillez réessayer.');
      }
    };

    if (currentUser || hasTempUser) {
      fetchQuestions();
    }
  }, [currentUser, hasTempUser]);

  // ✅ Sauvegarder les réponses
  const handleAnswer = (value: string): void => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // ✅ Sauvegarder automatiquement dans le localStorage pour les utilisateurs temporaires
    if (hasTempUser) {
      storage.saveTempResponses(newAnswers);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // ✅ Sauvegarde temporaire + redirection pour utilisateurs non connectés
  const handleTempSaveAndRedirect = (): void => {
    storage.saveTempResponses(answers);
    console.log('💾 Réponses sauvegardées temporairement:', answers);
    
    // Rediriger vers le login
    window.location.href = '/login?message=questionnaire_pending&redirect=quise-registration';
  };

  // ✅ Sauvegarder les réponses pour utilisateur connecté
  const saveResponsesForAuthenticatedUser = async (): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      setError("");

      const reponsesData = Object.entries(answers).map(([questionId, reponse]) => ({
        questionId: parseInt(questionId),
        reponse: reponse
      }));

      console.log('💾 Sauvegarde pour utilisateur connecté:', currentUser?.id);

      const response = await fetch(`${API_BASE_URL}/api/questionnaire/reponses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          reponses: reponsesData
        }),
      });

      console.log('📡 Statut sauvegarde:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur détaillée:', errorData);
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Réponse sauvegarde:', data);

      return data.success === true;
        
    } catch (err) {
      console.error('❌ Erreur sauvegarde:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde. Veuillez réessayer.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async (): Promise<void> => {
    if (hasTempUser) {
      // Mode temporaire : sauvegarder localement et rediriger vers login
      handleTempSaveAndRedirect();
    } else {
      // Mode connecté : sauvegarder sur le serveur
      const success = await saveResponsesForAuthenticatedUser();
      if (success) {
        // Nettoyer le localStorage si existait
        storage.removeTempUserId();
        storage.clearTempResponses();
        window.location.href = '/dashboard';
      }
    }
  };

  const handleEditAnswers = (): void => {
    setIsComplete(false);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const currentProgress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const answeredQuestionsCount = Object.keys(answers).length;

  // ✅ Écran de chargement
  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
          <Card className="p-12 max-w-2xl w-full shadow-elegant bg-gradient-card text-center space-y-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground text-lg">
              Chargement des questions...
            </p>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Afficher un indicateur si utilisateur temporaire
  if (hasTempUser) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-transparent">
          {/* Bannière utilisateur temporaire */}
          <div className="bg-blue-500 text-white py-3 px-4 text-center">
            <div className="container mx-auto flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                Mode prévisualisation - Vos réponses seront sauvegardées et associées à votre compte après connexion
              </span>
            </div>
          </div>

          {/* Contenu principal */}
          {renderQuestionnaireContent()}
        </div>
      </>
    );
  }

  // ✅ Rendu normal pour utilisateur connecté
  return renderQuestionnaireContent();

  // ✅ Fonction de rendu du contenu du questionnaire
  function renderQuestionnaireContent() {
    if (error && !isComplete && !hasTempUser) {
      return (
        <>
          <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
            <Card className="p-12 max-w-2xl w-full shadow-elegant bg-gradient-card text-center space-y-6">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Erreur d'authentification</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-primary text-primary-foreground w-full"
                >
                  Se connecter
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                >
                  Réessayer
                </Button>
              </div>
            </Card>
          </div>
          <Footer />
        </>
      );
    }

    // ✅ ÉCRAN DE RÉSUMÉ ET CONFIRMATION
    if (isComplete) {
      return (
        <>
          <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
            <Card className="p-8 max-w-4xl w-full shadow-elegant bg-gradient-card">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elegant mb-4">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Questionnaire Terminé !
                </h2>
                <p className="text-muted-foreground text-lg">
                  Vous avez répondu à {answeredQuestionsCount} sur {totalQuestions} questions
                </p>
                {hasTempUser && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700">
                      <User className="w-4 h-4" />
                      <p className="text-sm">
                        <strong>Prochaine étape :</strong> Connectez-vous pour associer ces réponses à votre compte
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Récapitulatif des réponses */}
              <div className="bg-muted rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-foreground text-xl mb-6 text-center">
                  Récapitulatif de vos réponses
                </h3>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                          Q{index + 1}
                        </span>
                        <h4 className="font-medium text-foreground flex-1">
                          {question.question}
                        </h4>
                      </div>
                      <div className="ml-8">
                        {answers[question.id] ? (
                          <p className="text-muted-foreground bg-card px-3 py-2 rounded border">
                            {answers[question.id]}
                          </p>
                        ) : (
                          <p className="text-orange-500 bg-orange-50 px-3 py-2 rounded border">
                            Non répondu
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleEditAnswers}
                  variant="outline"
                  className="flex-1 py-6 border-border hover:bg-muted"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="mr-2 w-5 h-5" />
                  Modifier mes réponses
                </Button>
                
                <Button 
                  onClick={handleConfirm}
                  disabled={isSubmitting || answeredQuestionsCount === 0}
                  className="flex-1 bg-primary text-primary-foreground py-6 hover:opacity-90 shadow-elegant"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {hasTempUser ? "Redirection..." : "Sauvegarde en cours..."}
                    </>
                  ) : (
                    <>
                      {hasTempUser ? (
                        <>
                          <LogIn className="mr-2 w-5 h-5" />
                          Se connecter pour sauvegarder
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Confirmer et terminer
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {answeredQuestionsCount === 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-600 text-sm">
                    ⚠️ Vous n'avez répondu à aucune question. Veuillez modifier vos réponses avant de confirmer.
                  </p>
                </div>
              )}
            </Card>
          </div>
          <Footer />
        </>
      );
    }

    if (!currentQuestion) {
      return (
        <>
          <Navigation />
          <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
            <Card className="p-12 max-w-2xl w-full shadow-elegant bg-gradient-card text-center">
              <p className="text-muted-foreground">Aucune question disponible.</p>
            </Card>
          </div>
          <Footer />
        </>
      );
    }

    // ✅ ÉCRAN DES QUESTIONS
    return (
      <>
        <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
          <div className="max-w-2xl w-full space-y-6 py-20">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
                <span>{Math.round(currentProgress)}%</span>
              </div>
              <Progress value={currentProgress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="p-8 shadow-card bg-gradient-card">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentQuestion.question}
                </h2>

                {currentQuestion.type === "radio" && currentQuestion.options && (
                  <RadioGroup 
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option: QuestionOption) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer bg-card group"
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label 
                          htmlFor={option.value} 
                          className="flex-1 cursor-pointer text-foreground font-medium group-hover:text-primary transition-colors"
                        >
                          {option.label}
                        </Label>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === "text" && (
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder={currentQuestion.placeholder}
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                      }
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' && answers[currentQuestion.id]) {
                          handleAnswer(answers[currentQuestion.id]);
                        }
                      }}
                      className="py-6 text-lg border-border"
                    />
                    <Button 
                      onClick={() => handleAnswer(answers[currentQuestion.id] || "")}
                      disabled={!answers[currentQuestion.id]}
                      className="w-full bg-primary text-primary-foreground py-6 hover:opacity-90 shadow-elegant"
                    >
                      {isLastQuestion ? "Voir le résumé" : "Suivant"}
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Bouton pour passer directement au résumé */}
                {!isLastQuestion && (
                  <div className="pt-4">
                    <Button 
                      onClick={() => setIsComplete(true)}
                      variant="outline"
                      className="w-full border-border text-muted-foreground"
                    >
                      Passer au résumé
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Navigation */}
            {currentQuestionIndex > 0 && (
              <Button 
                onClick={handleBack}
                variant="outline"
                className="w-full border-border hover:bg-muted"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Question précédente
              </Button>
            )}
          </div>
        </div>   
        <Footer />
      </>
    );
  }
};

export default QuiseRegistration;