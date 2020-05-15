let questions = [{
    question: "Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?",
  
    input: {
        type: "radio",
        qNumber: "Q1",
        answer: [{
                text: "Oui",
                icon: "fa-check",
            },
            {
                text: "Non",
                icon: "fa-times",
            },
        ],
    },
  },
  {
    question: "Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?",
  
    input: {
        type: "radio",
        qNumber: "Q2",
        answer: [{
                text: "Oui",
                icon: "fa-check",
            },
            {
                text: "Non",
                icon: "fa-times",
            },
        ],
    },
  },
  {
    question: "Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?",
  
    input: {
        type: "radio",
        qNumber: "Q3",
        answer: [{
                text: "Oui",
                icon: "fa-check",
            },
            {
                text: "Non",
                icon: "fa-times",
            },
        ],
    },
  },
  {
    question: "Avez-vous eu des courbatures inhabituelles au cours des derniers jours ?",
  
    input: {
        type: "radio",
        qNumber: "Q4",
        answer: [{
                text: "Oui",
                icon: "fa-check",
            },
            {
                text: "Non",
                icon: "fa-times",
            },
        ],
    },
  },
  ];
  let startBtn = document.getElementById("start");
  let questionnaire = document.getElementById("questionnaire");
  let Préambule = document.getElementById("Préambule");
  let stepper = document.querySelectorAll(".stepper h1");
  let nextBtn = document.querySelector(".next");
  let previousBtn = document.querySelector(".previous");
  let currentquestion = document.querySelector(".question");
  let answerInputs = document.querySelector(".answer-inputs");
  let progressBar = document.querySelector(".bar");
  let questionNumber = document.querySelector(".question-number");
  let inputBox = document.querySelector(".inputBox");
  
  let result = document.querySelector(".header");
  let resultMessage = document.querySelector(".end"); 
  let resultMessage2 = document.querySelector('.end2')  
  
  console.log(previousBtn)
  let currentQuestionIndex = 0;
  
  // start test (hiding startbtn and preambule ,showing question section)
  startBtn.addEventListener("click", startTest);
  function startTest() {
    stepper[0].classList.remove("active");
    stepper[1].classList.add("active");
    startBtn.style.display = "none";
    Préambule.style.display = "none";
    questionnaire.style.display = "block";
    previousBtn.style.display ='none'
    // startBtn.disabled = true;
    showQuestion(questions[currentQuestionIndex]);
  }
  //pushing the question and answer
  function showQuestion(question) {
    currentquestion.innerText = question.question;
    answerInputs.innerHTML = "";
    let inputAnswer = question.input.answer;
    let input = question.input;
    inputAnswer.forEach((answer) => {
      answerInputs.innerHTML += `
              <div>
                  <input type="radio" name="${input.qNumber}" id="${answer.text}">
                  <label for="${answer.text}">
                  <i class="fas ${answer.icon}"></i>
                  <span>${answer.text}</span> </label>
              </div>`;
  });
  }
  function folowProgress(number) {
  
    const currentNmber = number + 1
  
    questionNumber.innerText = currentNmber
    progressBar.style.width = `calc(${currentNmber} * calc(99% / 4))`
  
  }
  
  nextBtn.addEventListener('click', nextQuestion)
  //showing next question by incrementing the index and stopping when reaching index n3 ()
  function nextQuestion() {
    if (currentQuestionIndex < 3) {
      currentQuestionIndex++;
      showQuestion(questions[currentQuestionIndex]);
      folowProgress(currentQuestionIndex);
      
      previousBtn.style.display ='block'
  
      nextBtn.disabled = false;
    }
      if (currentQuestionIndex === 3) {
          nextBtn.innerText = "Terminer le test";
          nextBtn.classList.add("result");
          let resultBtn = document.querySelector(".result");
          resultBtn.addEventListener("click", Results);
      } else {
          nextBtn.innerText = "Suivant";
          previousBtn.style.display ='block'
          
      }
    }
  
    previousBtn.addEventListener('click',previousQuestion);
  
    function previousQuestion() {
      if (currentQuestionIndex < 3){
      currentQuestionIndex--;
      showQuestion(questions[currentQuestionIndex]);
      folowProgress(currentQuestionIndex);
      nextBtn.disabled = true;}
      if (currentQuestionIndex === 3) {
          nextBtn.innerText = "Terminer le test";
      } else {
          nextBtn.innerText = "Suivant";
          nextBtn.classList.remove("result");
      }
    }
  
    
    inputBox.addEventListener("change", (event) => {
      let input = event.target;
          answers[input.name] = input.id;
          console.log(answers);
          nextBtn.disabled = false;
      
  });
  
  let answers = {};
  let severity = 0;
  
  function Results() {
    // patient with no symptoms  

    if ((answers['Q1'] === 'oui')&& (answers['Q2'] === 'oui') && (answers['Q3'] === 'oui') && (answers['Q4'] === 'oui')) {
  
        resultMessage.innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
        'N’hésitez pas à contacter votre médecin en cas de doute.' + 'Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.' + 'Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
        resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
        'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.color = '#369D53'
    }
      if ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Non')) {
  
        resultMessage.innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
        'N’hésitez pas à contacter votre médecin en cas de doute.' + 'Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.' + 'Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
        resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
        'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.color = '#369D53'
    }
    // patient with fever or a cough + body pain
      if (((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Non')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Non'))) {
  
        resultMessage.innerText = 'Nous vous conseillons de rester à votre domicile et de contacter votre médecin' +
        ' en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouv' +
        'eau l’application pour réévaluer vos symptômes'
        
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.color = '#369D53'
    }
    // patient with fever or a cough + body pain (with aggravating prognostic )
      if (((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Oui')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Oui'))) {
  
        resultMessage.innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
        "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
        "our s’alimenter ou boire pendant plus de 24h apparaissent."
        resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
        'ez votre température deux fois par jour. Rappel des mesures d’hygiène. '
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.fontWeight = 'bold'
        resultMessage.style.color = '#369D53'
    }
    // patient with fever and  cough
    if ((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Non')){
      resultMessage.innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
      "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
      "our s’alimenter ou boire pendant plus de 24h apparaissent."
      resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
      'ez votre température deux fois par jour. Rappel des mesures d’hygiène. '
      resultMessage.style.fontWeight = 'bold'
      resultMessage.style.fontWeight = 'bold'
      resultMessage.style.color = '#369D53'
    }
    // patient with fever and  cough (with aggravating prognostic)
    if ((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Oui')){
      resultMessage.innerText = "Appelez le 141"
      resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
              'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
      resultMessage.style.color = '#FF0000'
      resultMessage.style.fontSize = '48px'
      resultMessage.style.fontWeight = 'bold'
    }
    // patient with one symptom amongst fever ,cough and body pain
    if (((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Non')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Non')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Non'))) {
              resultMessage.innerText = 'Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute.'
          resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
                  'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
          resultMessage.style.fontWeight = 'bold'
          resultMessage.style.color = '#369D53'
    }
    // patient with one symptom amongst fever ,cough and body pain(with aggravating symptom)
    if (((answers['Q1'] === 'Oui') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Oui')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Oui') && (answers['Q4'] === 'Non') && (answers['Q2'] === 'Oui')) || ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Oui') && (answers['Q2'] === 'Oui'))) {
              resultMessage.innerText = 'Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute.Appelez le 141'
          resultMessage2.innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
                  'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
          resultMessage.style.fontWeight = 'bold'
          resultMessage.style.color = '#369D53'
    }
       showResult(severity)
    
    }
  function showResult(severity) {
  
    stepper[1].classList.remove('active')
        
        
    stepper[2] .classList.add('active')
       
        
    startBtn.style.display = ''
    Préambule.style.display = 'block'
    questionnaire.style.display = 'none'
    startBtn.textContent = ' Recommencer le test'
    startBtn.addEventListener('click', reload)
  
    result.innerText = "Résultats";
  }
  
  function reload() {
    window.location.reload()
  }