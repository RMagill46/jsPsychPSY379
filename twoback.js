/* initialize jsPsych */
var jsPsych = initJsPsych({show_progress_bar: true, auto_update_progress_bar: false});

/* create timeline */
var timeline = [];

/* number of trials */
var num_trials = 25;

var enter_id = {
  type: jsPsychSurveyText,
  questions: [
      {prompt: "Please enter your unique participant ID:", name: 'uniqueID', required: true, placeholder: "Enter ID here"},
      {prompt: "Please enter your group number:", name: 'groupID', required:true, placeholder: "Enter group number here"}
  ],
  preamble: "Welcome to the study. Before we begin, I need to collect your unique participant ID and group number."
};
timeline.push(enter_id);

/* define welcome message trial */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment! <p>Press any key to begin.</p>",
  on_start: function() {
    // set progress bar to 0 at the start of experiment
    jsPsych.setProgressBar(0);
  }
};
timeline.push(welcome);

/* define instructions message */
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p>This is a 2-back task. In this task, you will see a series of letters appear one at a time on the screen.</p> <p><strong>Your job is to press the 'M' key if the current letter matches the one that appeared two letters ago. Do not press any key if there is no match.</strong></p> <p>For example, if you see the sequence Q, A, X, A, Q, B, F, B you should press 'M' when the second A appears, and similarly when the second B appears.</p> <p>Press any key to continue</p>"
};
timeline.push(instructions);

var instructions_two = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Please be prepared; the experiment will begin after this page following a countdown. Remember to press the 'M' key when you see a match. <p>Press any key to continue</p>"
};
timeline.push(instructions_two);

/* countdown */
var countdown_three = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 1500,
  post_trial_gap: 500,
  response_ends_trial: false,
  stimulus: '<span style="font-size: 96px;">3</span>'
}
timeline.push(countdown_three);

var countdown_two = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 1500,
  post_trial_gap: 500,
  response_ends_trial: false,
  stimulus: '<span style="font-size: 96px;">2</span>'
}
timeline.push(countdown_two);

var countdown_one = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 1500,
  post_trial_gap: 500,
  response_ends_trial: false,
  stimulus: '<span style="font-size: 96px;">1</span>'
}
timeline.push(countdown_one);

var n_back_set = ['H', 'L', 'H', 'K', 'L', 'T', 'K', 'J', 'L', 'J', 'L', 'P', 'P', 'H', 'T', 'K', 'T', 'H', 'T', 'K', 'H', 'J', 'K', 'J', 'P'];

var i = 0;

var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var character = n_back_set[i];
    // i++;
    return '<span style="font-size: 96px;">'+ character +'</span>';
  },
  on_start: function() {
      // at the end of each trial, update the progress bar
      // based on the current value and the proportion to update for each trial
      var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
      jsPsych.setProgressBar(curr_progress_bar_value + (1/num_trials));
  },
  choices: ['M'],
  trial_duration: 1500,
  post_trial_gap: 500,
  response_ends_trial: false,
  on_finish: function(data) {
    if (jsPsych.pluginAPI.compareKeys(data.response, 'm')){
      if (i - 2 >= 0 && n_back_set[i] === n_back_set[i - 2]){
        data.correct = true;
      } else {
        data.correct = false;
      }
    } else {
      if (i - 2 >= 0 && n_back_set[i] === n_back_set[i - 2]){
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
    i++;
  }
};

var trials = {
  timeline: [trial],
  repetitions: 25
}
timeline.push(trials);

var done = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p>Done! Thank you for participating!</p> <p>Please remember to complete the Cognitive Failures Questionnaire and the Social Media Disorder Scale Questionnaire.</p> <p>Press any key to continue, you can close this page after.</p>",
  on_start: function(){
    jsPsych.setProgressBar(1);
  }
};
timeline.push(done);

/* start the experiment */
jsPsych.run(timeline);