var options=["Did not apply to me at all<br>&emsp; बिल्कुल नही<br>","Applied to me to some degree, or some of the time<br> &emsp;कुछ हद तक<br>","Applied to me to a considerable degree or a good part of time<br>&emsp;  काफी ज्यादा<br>", "Applied to me very much or most of the time<br> &emsp; पूरी तरह से<BR>"];
(  function() {
  var questions = [{
    question: "I found it hard to wind down ",
    hindi :"धीरे धीरे कार्य  क्षमता मे क्षींणता/कमी ने मुझे परेशान किया था ।",
    choices: options,
    type : 1
  }, {
    question: "I was aware of dryness of my mouth",
    hindi :"मुझे पता है कि मेरा मुह सूख जाता था ।",
    choices: options,
    type : 2
  }, {
    question: "I couldn’t seem to experience any positive feeling at all",
    hindi :"मैं कोई सकारात्मक भाव नहीं अनुभव कर सकता ।",
    choices: options,
    type : 3
  }, {
    question: "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
    hindi :"मैने श्वास लेने मे तकलीफ महसूस की (जैसे कि सामान्य से तेज श्वास लेना,शारीरिक श्रम के बिना भी श्वास का फुलना महसूस किया) ।",
    choices: options,
    type : 2
  },  {
    question: "I found it difficult to work up the initiative to do things",
    hindi :"किसी भी कार्य की शुरूआत मे मुझे दिक्कत होती है ।",
    choices: options,
    type : 3
  },{
    question: "I tended to over-react to situations",
    hindi :"मैंने परिस्थितियों को जरूरत से ज्यादा प्रतिक्रिया दी ।",
    choices: options,
    type : 1
  },{
    question: "I experienced trembling (e.g. in the hands)",
    hindi :"मैंने कम्पन महसूस किया(जैसे हाथों मे) ।",
    choices: options,
    type : 2
  },{
    question: "I felt that I was using a lot of nervous energy",
    hindi :"मैंने ऐसा महसूस किया कि मैं को जरूरत से ज्यादा घबरा जाता हूँ ।",
    choices: options,
    type : 1
  },{
    question: "I was worried about situations in which I might panic and make a fool of myself",
    hindi :"मैं  उस परिस्थिति के बारे मे बहुत चिन्तित था, जिसमे मैं बहुत बेचैन हो गया था और मैंने बेवकुफी की ।",
    choices: options,
    type : 2
  },{
    question: "I felt that I had nothing to look forward to",
    hindi :"मैंने अपने आपको ग्लानित/दोषी महसूस किया ।",
    choices: options,
    type : 3
  },{
    question: "I found myself getting agitated",
    hindi :"मैंने अपने आपको घबराया हुआ महसूस किया ।",
    choices: options,
    type : 1
  },{
    question: "I found it difficult to relax",
    hindi :"मैंने विश्राम करना मुश्किल पाया ।",
    choices: options,
    type : 1
  },{
    question: "I felt down-hearted and blue",
    hindi :"मैंने अपने आपको दुखी और हीन महसूस किया ।",
    choices: options,
    type : 3
  },{
    question: "I was intolerant of anything that kept me from getting on with what I was doing",
    hindi :"किसी विशेष उपक्रम या व्यवसथा द्वारा मेरे कार्यों पर नज़र रखी जाये यह मुझे बर्दाश्त नहीं है ।",
    choices: options,
    type : 1
  },{
    question: "I felt I was close to panic",
    hindi :"मैंने आतंकित महसूस किया ।",
    choices: options,
    type : 2
  },{
    question: "I was unable to become enthusiastic about anything",
    hindi :"मैं किसी भी कार्य को करने के लिये अपने आपको उत्साहित करने मे असमर्थ था ।",
    choices: options,
    type : 3
  },{
    question: "I felt I wasn’t worth much as a person",
    hindi :"मैंने महसूस किया कि मैं ज्यादा योग्य व्यक्ति नहीं था ।",
    choices: options,
    type : 3
  },{
    question: "I felt that I was rather touchy",
    hindi :"मैंने महसूस किया कि मैं ज्यादा भावुक हो गया था ।",
    choices: options,
    type : 1
  },{
    question: "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
    hindi :"शिरीरिक परिश्रम के अभाव मे भी मैं अपने दिल की धड़कनो को महसूस करता था(जैसे तेज़ गति से धड़कना या कभी रूक जाना) ।",
    choices: options,
    type : 2
  },{
    question: "I felt scared without any good reason",
    hindi :"मैंने बिना कारण के डर  महसूस किया ।",
    choices: options,
    type : 2
  },{
    question: "I felt that life was meaningless",
    hindi :"मैंने महसूस किया कि जीवन बेकार है ।",
    choices: options,
    type : 3
  }];
  var progressAtt=0;
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var progressInc = 100/21; 
  var sum = 0;
  var Sresult=0,
      Aresult=0,
      Dresult=0;
  var isCritical = false;
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      progressAtt  = document.getElementById("progress").style.width ;
      sum += progressInc;
      progressAtt =  sum + "%";
      document.getElementById("progress").style.width = progressAtt;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    progressAtt  = document.getElementById("progress").style.width ;
    sum -= progressInc;
    progressAtt =  sum + "%";
    document.getElementById("progress").style.width = progressAtt;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter = 0;
    var progress = document.getElementById("progress");//.getAttribute("style.width");
    console.log(progress);
   progress.setAttribute("style", "width:0%");
   console.log(progress);
    Aresult=0;
    Sresult=0;
    Dresult=0;
    selections = [];
    displayNext();
    //document.setAttributeById("progress").style("width","0%");
   // document.getAttributeById("progress").style.width = 0%;
   
  //  $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h4>Question ' + (index + 1) + ':</h4>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    var hindi = $('<p>').append(questions[index].hindi);
    qElement.append(hindi);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  function calculateSeverity() {
    if( Sresult >= 15 || Aresult >= 15 || Dresult >=15) isCritical = true;
    return isCritical;
    console.log(isCritical);
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
         
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $("#stressbox").val(2*Sresult);
        $("#anxietybox").val(2*Aresult);
        $("#depressionbox").val(2*Dresult);
        $("#criticalbox").val(calculateSeverity());
        $('#postit').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    
    for (var i = 0; i < selections.length; i++) {
     /* if (selections[i] === questions[i].type ) {
        numCorrect++; --> */
        switch(questions[i].type)
        {
          case 1 : Sresult=Sresult + selections[i];
                    break;
          case 2 : Aresult=Aresult + selections[i];
                    break;
          case 3 : Dresult=Dresult + selections[i];
                    break;                    
        }
      }
    
    
    score.append('Stress: ' + 2*Sresult + '<br>Anxiety: ' + 2*Aresult + '<br>Depression: ' + 2*Dresult
                 );
    return score;
  }
})();
