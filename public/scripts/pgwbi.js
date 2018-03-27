
(  function() {
  var questions = [{
    question: "How have you been feeling in general?(DURING THE PAST MONTH)",
    choices: ["In excellent spirits","In very good spririts","In good spirits mostly","I have been up and down in spirits a lot","In low spirits mostly","In very low spirits"],
    type : 3,
    isReverse: true
  }, {
    question: "How often were you bothered by any illness, bodily disorder, aches or pains?(DURING THE PAST MONTH)",
    choices: ["Every day","Almost every day","About half of the time","Now and then, but less than half the time","Rarely","None of the time"],
    type : 5,
    isReverse: false
  }, {
    question: "Did you feel depressed?(DURING THE PAST MONTH)",
    choices: ["Everyday","Almost every day","About half of the time","Now and then, but less than half the time","Rarely","None of the time"],
    type : 2,
    isReverse: false
  }, {
    question: "Have you been in firm control of your behavior, thoughts, emotions, or feelings?(DURING THE PAST MONTH)",
    choices: ["yes,definitely so","yes, for the most part","Generally so","Not too well","No, and I am somewhat disturbed","No, and I am very disturbed"],
    type : 4,
    isReverse: true
  },  {
    question: "Have you been bothered by nervousness or your \"nerves\"?(DURING THE PAST MONTH) ",
    choices: ["Extremely so-to the point where I could not work or take care of things","Very much so","Quite a bit","Some-enough to bother me","A little","Not at all"],
    type : 1,
    isReverse: false
  },{
    question: "How much energy, pop, or vitality did you have or feel?(DURING THE PAST MONTH)",
    choices: ["Very full of energy-lots of pep","Fairly enegetic most of the time","My energy level varied quite a bit","Generally low in energy or pep","Very low in energy or pep most of the time","No energy or pep at all-I felt drained, sapped"],
    type : 6,
    isReverse: true
  },{
    question: "I felt downhearted and blue (DURING THE PAST MONTH)",
    choices: ["None of the time","A little of the time","Some of the time", "A good bit of the time","Most of the time","All of the time"],
    type : 2,
    isReverse: true
  },{
    question: "Were you generally tense or did you feel any tension?(DURING THE PAST MONTH)",
    choices: ["Yes-extremely tense, most or all of the time","Yes-very tense most of the time","Not generally tense, but did feel fairly tense several times","I felt a little tense a few times","My general tension level was quite low","I never felt tense or any tension at all"],
    type : 1,
    isReverse: false
  },{
    question: "How happy, satisfied, or pleased have you been with your personal life?(DURING THE PAST MONTH)",
    choices: ["Extremely happy-could not have been more satisfied or pleased","Very happy most of the time","Generally satisfied-pleased","Sometimes fairly happy, sometimes fairly unhappy","Generally dissatisfied, unhappy","Very dissatisfied or unhappy most or all the time"],
    type : 3,
    isReverse: true
  },{
    question: "Did you feel healthy enough to carry out the things you like to do or had to do?(DURING THE PAST MONTH)",
    choices: ["Yes-definitely so","For the most part","Health problems limited me in some important ways","I was only healthy enough to take care of myself","I needed some help in taking catr of myself","I needed someone to help me with most or all of the thing I had to do"],
    type : 5,
    isReverse: true
  },{
    question: "Have you felt so sad, discouraged, hopeless, or had'so many problems that you wondered if anything was worthwhile?(DURING THE PAST MONTH)",
    choices: ["Extremely so-to the point that I have just about given up","Very much so","Quite a bit","Some-enough to bother me","A little bit","Not at all"],
    type : 2,
    isReverse: false
  },{
    question: "I woke up feeling fresh and rested (DURING THE PAST MONTH)",
    choices: ["None of the time","A little of the time","Some of the time","A good bit of the time","Most of the time","All of the time"],
    type : 6,
    isReverse: false
  },{
    question: "Have you been concerned, worried, or had any fesr about your health?",
    choices: ["Extremely so","Very much so","Quite a bit","Some, but not a lot","Practically never","Not at all"],
    type : 5,
    isReverse: false
  },{
    question: "Have you had any reason to wonder if you were losing your mind, or losing control over the way you act, talk, think, feel or of your memory?(DURING THE PAST MONTH)",
    choices: ["Not at all","Only a little","Some-but not enough to be concerned or worried about","Some and I have been a little concerned","Some and I am quite concerned","Yes, very much so and I am very concerned"],
    type : 4,
    isReverse: true
  },{
    question: "My daily life was full of things that were interesting to me (DURING THE PAST MONTH) ",
    choices: ["None of the time","A little of the time","Some of the time","A good bit of the time","Most of the time","All of the time"],
    type : 3,
    isReverse: false
  },{
    question: "Did you feel active, vigorous, or dull, sluggish?",
    choices: ["Very active, vigorous every day","Mostly active, vigorous-never really dull, sluggish","Fairly active, vigorous-never really, dull, sluggish","Fairly dull, sluggish-seldom active, vigorous","Mostly dull, sluggish-never really active, vigorous","Very dull, sluggish every day"],
    type : 6,
    isReverse: true
  },{
    question: "Have you been anxious, worried, or upset?(DURING THE PAST MONTH)",
    choices: ["Extremely so-to the point of being sick or almost sick","Very much so","Quite a bit","Some-enough to bother me","A little bit","Not at all"],
    type : 1
  },{
    question: "I was emotionally stable and sure of myself (DURING THE PAST MONTH)",
    choices: ["None of the time", "A little of the time","Some of the time","A good bit of the time","Most of the time","All of the time"],
    type : 4,
    isReverse: false
  },{
    question: "Did you feel relaxed, at ease or high strung, tight or keyed-up?(DURING THE PAST MONTH)",
    choices: ["Felt relaxed and at ease the whole month","Felt relaxed and at ease most of the time","Generally felt relaxed but at times felt fairly high strung","Generally fe;t high strung but at times felt fairly relaxed","Felt high strung,tight, or keyed up most of the time","Felt high strung, tight or keyed up the whole month"],
    type : 1,
    isReverse: true
  },{
    question: "I felt cheerful, lighthearted (DURING THE PAST MONTH)",
    choices: ["None of the time","A little of the time","Some of the time","A good bit of the time","Most of the time","All of the time"],
    type : 3,
    isReverse: false
  },{
    question: "I felt tired, worn out, used up, or exhausted(DURING THE PAST MONTH)",
    choices: ["None of the time","A little of the time","Some of the time","A good bit of the time","Most of the time","All of the time"],
    type : 6,
    isReverse: true
  },{
    question: "Have you been under or felt you were under any stain, stress, or pressure?(DURING THE PAST MONTH)",
    choices: ["Yes, almost more than I could bear or stand","Yes, quite a bit of pressure","Yes, some-more than usual","yes, some-but about usual","Yes, a little","Not at all"],
    type : 1,
    isReverse: false
  }];
  var progressAtt=0;
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var progressInc = 100/questions.length; 
  var sum = 0;
  var SC=0,
      PWB=0,
      ANX=0,
      GH=0,
      VT=0,
      TGWB=0,
      DEP=0;
      
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
    ANX=0;
    SC=0;
    DEP=0;
    GH=0;
    VT=0;
    PWB=0;
    TGWB=0;
    sum=0;
    var isCritical = false;
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
      if(questions[index].isReverse)
        input = '<input type="radio" name="answer" value=' + (5-i) + ' />';
      else
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
    if( SC <= 5 || ANX <= 8 || DEP <=5 || PWB <=7 || GH <=5 || VT <= 6 || TGWB <=33) isCritical = true;
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
        $("#stressbox").val(SC);
        $("#anxietybox").val(ANX);
        $("#depressionbox").val(DEP);
        $("#well-beingbox").val(PWB);
        $("#healthbox").val(GH);
        $("#vitalitybox").val(VT);
        $("#globalbox").val(TGWB);
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
          case 1 : ANX = ANX + selections[i];
                    break;
          case 2 : DEP=DEP + selections[i];
                    break;
          case 3 : PWB=PWB + selections[i];
                    break;
          case 4 : SC=SC + selections[i];
                    break;
          case 5 : GH=GH + selections[i];
                    break;
          case 6 : VT=VT + selections[i];
                    break;          
          
                              
        }
        TGWB = TGWB + selections[i];
      }
    
    
    score.append('Stress: ' +SC + '<br>Anxiety: ' + ANX + '<br>Depression: ' + DEP + "<br>Positive Well-being: " + PWB + "<br>General Health: " + GH +"<br>Vitality: " + VT +"<br><br> Global Score: "+ TGWB 
                 );
    return score;
  }
})();
