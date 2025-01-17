import React, { useState, useEffect } from 'react';  
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';  
  
const App = () => {  
  const [questions, setQuestions] = useState([]);  
  const [currentQuestion, setCurrentQuestion] = useState(0);  
  const [userAnswer, setUserAnswer] = useState('');  
  const [score, setScore] = useState(0);  
  const [timer, setTimer] = useState(10);  
  const [quizCompleted, setQuizCompleted] = useState(false);  
  const [isMenuVisible, setIsMenuVisible] = useState(true);  
  
  useEffect(() => {  
    const generateQuestions = () => {  
      const newQuestions = [];  
      for (let i = 0; i < 10; i++) {  
        const num1 = Math.floor(Math.random() * 10) + 1;  
        const num2 = Math.floor(Math.random() * 10) + 1;  
        newQuestions.push({ num1, num2, answer: num1 * num2 });  
      }  
      setQuestions(newQuestions);  
    };  
    generateQuestions();  
  }, []);  
  
  useEffect(() => {  
    if (timer > 0 && currentQuestion < 10) {  
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);  
      return () => clearTimeout(countdown);  
    } else if (timer === 0) {  
      handleNextQuestion();  
    }  
  }, [timer, currentQuestion]);  
  
  const handleAnswer = () => {  
    if (parseInt(userAnswer) === questions[currentQuestion].answer) {  
      setScore(score + 1);  
    }  
    handleNextQuestion();  
  };  
  
  const handleNextQuestion = () => {  
    setUserAnswer('');  
    setTimer(10);  
  
    if (currentQuestion < 9) {  
      setCurrentQuestion(currentQuestion + 1);  
    } else {  
      setQuizCompleted(true);  
    }  
  };  
  
  const restartQuiz = () => {  
    setScore(0);  
    setCurrentQuestion(0);  
    setQuizCompleted(false);  
    setTimer(10);  
    setQuestions(questions.map(q => ({ ...q, answer: q.num1 * q.num2 })));  
  };  
  
  const startQuiz = () => {  
    setIsMenuVisible(false);  
    restartQuiz();  
  };  
  
  const getFeedbackMessage = () => {  
    if (score < 3) return "Onde Mande";  
    if (score < 5) return "Belajar lagi dek";  
    if (score < 8) return "Lumayan lah";  
    return "Mahkota mu ketinggalan king";  
  };  
  
  return (  
    <View style={styles.container}>  
      <Text style={styles.title}>mY Pengukur SDM</Text>  
      <View style={styles.contentContainer}>  
        {isMenuVisible ? (  
          <View style={styles.menuContainer}>  
            <Text style={styles.menuText}>Selamat Datang di Kuis!</Text>  
            <TouchableOpacity style={styles.button} onPress={startQuiz}>  
              <Text style={styles.buttonText}>Mulai Kuis</Text>  
            </TouchableOpacity>  
          </View>  
        ) : quizCompleted ? (  
          <View style={styles.resultContainer}>  
            <Text style={styles.resultText}>Quiz Completed!</Text>  
            <Text style={styles.resultText}>Your Score: {score}/10</Text>  
            <Text style={styles.feedbackText}>{getFeedbackMessage()}</Text>  
            <TouchableOpacity style={styles.button} onPress={restartQuiz}>  
              <Text style={styles.buttonText}>Restart Quiz</Text>  
            </TouchableOpacity>  
            <View style={styles.buttonSpacing} />  
            <TouchableOpacity style={styles.button} onPress={() => setIsMenuVisible(true)}>  
              <Text style={styles.buttonText}>Back to Menu</Text>  
            </TouchableOpacity>  
          </View>  
        ) : (  
          <View style={styles.quizContainer}>  
            <Text style={styles.timerText}>Time Left: {timer}s</Text>  
            <Text style={styles.questionText}>  
              {`Question ${currentQuestion + 1}: ${questions[currentQuestion]?.num1} x ${questions[currentQuestion]?.num2}`}  
            </Text>  
            <TextInput  
              style={styles.input}  
              keyboardType="numeric"  
              value={userAnswer}  
              onChangeText={setUserAnswer}  
              placeholder="Your Answer"  
            />  
            <TouchableOpacity style={styles.button} onPress={handleAnswer}>  
              <Text style={styles.buttonText}>Submit</Text>  
            </TouchableOpacity>  
          </View>  
        )}  
      </View>  
    </View>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'flex-start',  
    alignItems: 'center',  
    backgroundColor: '#e0f7fa', // Warna latar belakang yang lebih cerah  
    padding: 20,  
  },  
  title: {  
    fontSize: 32,  
    fontWeight: 'bold',  
    color: '#00796b', // Warna teks judul  
    marginBottom: 20,  
    textAlign: 'center',  
  },  
  contentContainer: {  
    width: '100%',  
    alignItems: 'center',  
  },  
  menuContainer: {  
    alignItems: 'center',  
  },  
  menuText: {  
    fontSize: 24,  
    marginBottom: 20,  
    color: '#004d40', // Warna teks menu  
  },  
  quizContainer: {  
    width: '80%',  
    alignItems: 'center',  
  },  
  timerText: {  
    fontSize: 20,  
    marginBottom: 10,  
    color: '#d32f2f', // Warna teks timer  
  },  
  questionText: {  
    fontSize: 24,  
    marginBottom: 20,  
    color: '#1976d2', // Warna teks pertanyaan  
  },  
  input: {  
    height: 40,  
    borderColor: '#00796b',  
    borderWidth: 2,  
    marginBottom: 20,  
    width: '100%',  
    paddingHorizontal: 10,  
    borderRadius: 5,  
  },  
  resultContainer: {  
    alignItems: 'center',  
  },  
  resultText: {  
    fontSize: 24,  
    marginBottom: 10,  
    color: '#004d40',  
  },  
  feedbackText: {  
    fontSize: 20,  
    marginBottom: 20,  
    color: '#555',  
  },  
  button: {  
    backgroundColor: '#00796b', // Warna tombol  
    padding: 10,  
    borderRadius: 5,  
    width: '80%',  
    alignItems: 'center',  
    marginVertical: 5,  
    elevation: 3, // Bayangan untuk efek kedalaman  
  },  
  buttonText: {  
    color: '#ffffff', // Warna teks tombol  
    fontSize: 18,  
  },  
  buttonSpacing: {  
    marginVertical: 10,  
  },  
});  
  
export default App;  
