import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ✅ Définition des types
interface QuestionOption {
  value: string;
  label: string;
  next: string;
}

interface QuestionData {
  question: string;
  type: "radio" | "text";
  options?: QuestionOption[];
  placeholder?: string;
  next?: string;
}

interface QuestionsTree {
  [key: string]: QuestionData;
}

// ✅ Structure d'arbre de questions avec typage
const questionsTree: QuestionsTree = {
  q1: {
    question: "Quel type de voyageur êtes-vous ?",
    type: "radio",
    options: [
      { value: "aventurier", label: "Aventurier 🏔️", next: "q2a" },
      { value: "culturel", label: "Culturel 🏛️", next: "q2b" },
      { value: "detente", label: "Détente 🌴", next: "q2c" },
      { value: "famille", label: "Famille 👨‍👩‍👧‍👦", next: "q2d" }
    ]
  },
  q2a: {
    question: "Quel niveau d'aventure préférez-vous ?",
    type: "radio",
    options: [
      { value: "extreme", label: "Extrême", next: "q3" },
      { value: "modere", label: "Modéré", next: "q3" },
      { value: "leger", label: "Léger", next: "q3" }
    ]
  },
  q2b: {
    question: "Quels aspects culturels vous intéressent le plus ?",
    type: "radio",
    options: [
      { value: "histoire", label: "Histoire et architecture", next: "q3" },
      { value: "artisanat", label: "Artisanat local", next: "q3" },
      { value: "gastronomie", label: "Gastronomie", next: "q3" },
      { value: "traditions", label: "Traditions et festivals", next: "q3" }
    ]
  },
  q2c: {
    question: "Quel type de détente recherchez-vous ?",
    type: "radio",
    options: [
      { value: "plage", label: "Plage et mer", next: "q3" },
      { value: "spa", label: "Spa et bien-être", next: "q3" },
      { value: "nature", label: "Nature et calme", next: "q3" }
    ]
  },
  q2d: {
    question: "Quel âge ont vos enfants ?",
    type: "radio",
    options: [
      { value: "petits", label: "Moins de 6 ans", next: "q3" },
      { value: "moyens", label: "6-12 ans", next: "q3" },
      { value: "ados", label: "Adolescents", next: "q3" }
    ]
  },
  q3: {
    question: "Quelle est votre fourchette de budget par personne ?",
    type: "radio",
    options: [
      { value: "economique", label: "Économique (< 3000 MAD)", next: "q4" },
      { value: "moyen", label: "Moyen (3000-7000 MAD)", next: "q4" },
      { value: "premium", label: "Premium (> 7000 MAD)", next: "q4" }
    ]
  },
  q4: {
    question: "Combien de temps souhaitez-vous voyager ?",
    type: "radio",
    options: [
      { value: "court", label: "2-3 jours", next: "q5" },
      { value: "moyen", label: "4-7 jours", next: "q5" },
      { value: "long", label: "Plus d'une semaine", next: "q5" }
    ]
  },
  q5: {
    question: "Quelle est votre destination de rêve au Maroc ?",
    type: "text",
    placeholder: "Ex: Marrakech, Chefchaouen, Désert...",
    next: "complete"
  }
};

const QuiseRegistration = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]); // Pour la navigation arrière

  const totalQuestions = 5;
  const currentProgress = (Object.keys(answers).length / totalQuestions) * 100;

  const getCurrentQuestionData = (): QuestionData => {
    return questionsTree[currentQuestion];
  };

  const handleAnswer = (value: string): void => {
    const questionData = getCurrentQuestionData();
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    // Déterminer la prochaine question
    let nextQuestion = "complete";
    
    if (questionData.type === "radio" && questionData.options) {
      const selectedOption = questionData.options.find((opt: QuestionOption) => opt.value === value);
      nextQuestion = selectedOption?.next || "complete";
    } else if (questionData.type === "text") {
      nextQuestion = questionData.next || "complete";
    }

    // Sauvegarder l'historique pour le retour arrière
    setHistory([...history, currentQuestion]);

    if (nextQuestion === "complete") {
      setIsComplete(true);
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleBack = (): void => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQuestion(previousQuestion);
      
      // Retirer la réponse de la question actuelle
      const newAnswers = { ...answers };
      delete newAnswers[currentQuestion];
      setAnswers(newAnswers);
    }
  };

  const handleConfirm = (): void => {
    console.log("Inscription confirmée avec les réponses:", answers);
    // Logique de confirmation à implémenter
  };

  const questionData = getCurrentQuestionData();

  if (isComplete) {
    return (
      <>
      <Navigation />
      <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
        <Card className="p-12 max-w-2xl w-full shadow-elegant bg-gradient-card text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elegant">
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Inscription Complétée !
          </h2>
          <p className="text-muted-foreground text-lg">
            Merci d'avoir complété votre profil. Nous allons personnaliser votre expérience.
          </p>
          
          {/* Récapitulatif */}
          <div className="bg-muted rounded-lg p-6 text-left space-y-3">
            <h3 className="font-semibold text-foreground mb-4">Récapitulatif de vos réponses:</h3>
            {Object.entries(answers).map(([key, value], index) => (
              <div key={key} className="flex items-start gap-2 text-sm">
                <span className="font-medium text-primary">Q{index + 1}:</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => window.open('/dashboard', '_self')}
            className="w-full bg-primary text-primary-foreground py-6 text-lg hover:opacity-90 shadow-elegant"
          >
            Confirmer mon inscription
          </Button>
        </Card>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-transparent flex items-center justify-center py-50 px-4">
      <div className="max-w-2xl w-full space-y-6 py-20">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {Object.keys(answers).length + 1} sur {totalQuestions}</span>
            <span>{Math.round(currentProgress)}%</span>
          </div>
          <Progress value={currentProgress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-card bg-gradient-card">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {questionData.question}
            </h2>

            {questionData.type === "radio" && questionData.options && (
              <RadioGroup 
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questionData.options.map((option: QuestionOption) => (
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

            {questionData.type === "text" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={questionData.placeholder}
                  value={answers[currentQuestion] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAnswers({ ...answers, [currentQuestion]: e.target.value })
                  }
                  className="py-6 text-lg border-border"
                />
                <Button 
                  onClick={() => handleAnswer(answers[currentQuestion] || "")}
                  disabled={!answers[currentQuestion]}
                  className="w-full bg-primary text-primary-foreground py-6 hover:opacity-90 shadow-elegant"
                >
                  Suivant
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        {history.length > 0 && (
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
};

export default QuiseRegistration;