import React, { useState, useEffect } from 'react';  
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';  
  
const App = () => {  
  const [questions, setQuestions] = useState([]);  
  const [currentQuestion, setCurrentQuestion] = useState(0);  
  const [userAnswer, setUserAnswer] = useState('');  
  const [score, setScore] = useState(0);  
  const [timer, setTimer] = useState(10);  
  const [quizCompleted, setQuizCompleted] = useState(false);  
  const [isMenuVisible, setIsMenuVisible] = useState(true); // State untuk menampilkan menu  
  
  // Generate random multiplication questions  
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
  
  // Timer countdown  
  useEffect(() => {  
    if (timer > 0 && currentQuestion < 10) {  
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);  
      return () => clearTimeout(countdown);  
    } else if (timer === 0) {  
      handleNextQuestion();  
    }  
  }, [timer, currentQuestion]);  
  
  // Handle answer submission  
  const handleAnswer = () => {  
    if (parseInt(userAnswer) === questions[currentQuestion].answer) {  
      setScore(score + 1);  
    }  
    handleNextQuestion();  
  };  
  
  // Move to the next question or finish the quiz  
  const handleNextQuestion = () => {  
    setUserAnswer('');  
    setTimer(10);  
  
    if (currentQuestion < 9) {  
      setCurrentQuestion(currentQuestion + 1);  
    } else {  
      setQuizCompleted(true);  
    }  
  };  
  
  // Restart the quiz  
  const restartQuiz = () => {  
    setScore(0);  
    setCurrentQuestion(0);  
    setQuizCompleted(false);  
    setTimer(10);  
    setQuestions(questions.map(q => ({ ...q, answer: q.num1 * q.num2 }))); // Reset questions  
  };  
  
  // Start the quiz  
  const startQuiz = () => {  
    setIsMenuVisible(false);  
    restartQuiz();  
  };  
  
  // Feedback message based on the score  
  const getFeedbackMessage = () => {  
    if (score < 3) return "Onde Mande";  
    if (score < 5) return "Belajar lagi dek";  
    if (score < 8) return "Lumayan lah";  
    return "Mahkota mu ketinggalan king";  
  };  
  
  return (  
    <View style={styles.container}>  
      <Text style={styles.title}>mY Pengukur SDM</Text> {/* Judul di atas */}  
      <View style={styles.contentContainer}> {/* Konten lainnya dalam View terpisah */}  
        {isMenuVisible ? ( // Menampilkan menu utama  
          <View style={styles.menuContainer}>  
            <Text style={styles.menuText}>Selamat Datang di Kuis!</Text>  
            <Button title="Mulai Kuis" onPress={startQuiz} />  
          </View>  
        ) : quizCompleted ? ( // Menampilkan hasil kuis  
          <View style={styles.resultContainer}>  
            <Text style={styles.resultText}>Quiz Completed!</Text>  
            <Text style={styles.resultText}>Your Score: {score}/10</Text>  
            <Text style={styles.feedbackText}>{getFeedbackMessage()}</Text>  
            <Button title="Restart Quiz" onPress={restartQuiz} />  
            <View style={styles.buttonSpacing} /> {/* Tambahkan jarak di sini */}  
            <Button title="Back to Menu" onPress={() => setIsMenuVisible(true)} />  
          </View>  
        ) : ( // Menampilkan kuis  
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
            <Button title="Submit" onPress={handleAnswer} />  
          </View>  
        )}  
      </View>  
    </View>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'flex-start', // Mengatur konten ke atas  
    alignItems: 'flex-start', // Mengatur konten ke kiri  
    backgroundColor: '#f5f5f5',  
    padding: 20, // Menambahkan padding untuk memberikan ruang  
  },  
  title: {  
    fontSize: 32,  
    fontWeight: 'bold',  
    color: '#333',  
    marginBottom: 20, // Jarak antara judul dan konten lainnya  
  },  
  contentContainer: {  
    width: '100%', // Memastikan konten mengambil lebar penuh  
    alignItems: 'center', // Mengatur konten di tengah  
  },  
  menuContainer: {  
    alignItems: 'center',  
  },  
  menuText: {  
    fontSize: 24,  
    marginBottom: 20,  
  },  
  quizContainer: {  
    width: '80%',  
    alignItems: 'center',  
  },  
  timerText: {  
    fontSize: 20,  
    marginBottom: 10,  
  },  
  questionText: {  
    fontSize: 24,  
    marginBottom: 20,  
  },  
  input: {  
    height: 40,  
    borderColor: '#ccc',  
    borderWidth: 1,  
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
  },  
  feedbackText: {  
    fontSize: 20,  
    marginBottom: 20,  
    color: '#555',  
  },  
  buttonSpacing: {  
    marginVertical: 10, // Menambahkan jarak vertikal antara tombol  
  },  
});  
  
export default App;  
