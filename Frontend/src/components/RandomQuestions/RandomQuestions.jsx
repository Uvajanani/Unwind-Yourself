const questions = [
  {
    "user_info": {
      "gender": {
        "question": "Select your gender:",
        "options": {
          "male": "Male",
          "female": "Female"
        },
        "type": "radio"
      },
      "age": {
        "question": "Enter your age:",
        "type": "number"
      }
    },
    "questions": {
      "female": [
        {
          "question": "You send a text to a friend, and they don't reply for hours. What do you think?",
          "options": {
            "A": { "text": "They must be busy.", "score": 1 },
            "B": { "text": "They might be upset with me.", "score": 2 },
            "C": { "text": "They probably forgot to reply.", "score": 1 },
            "D": { "text": "I wonder if they’re mad at me for something I said.", "score": 3 }
          }
        },
        {
          "question": "Do you ever lie in bed at night thinking about random things for too long?",
          "options": {
            "A": { "text": "Every night", "score": 3 },
            "B": { "text": "Most nights", "score": 2 },
            "C": { "text": "Sometimes", "score": 1 },
            "D": { "text": "Never, I sleep like a baby", "score": 0 }
          }
        },
        {
          "question": "Do you frequently feel restless, nervous, or on edge?",
          "options": {
            "A": { "text": "Yes", "score": 3 },
            "B": { "text": "No", "score": 0 }
          }
        },
        {
          "question": "How often do you feel overwhelmed by daily tasks?",
          "options": {
            "A": { "text": "Rarely", "score": 0 },
            "B": { "text": "Sometimes", "score": 1 },
            "C": { "text": "Often", "score": 2 },
            "D": { "text": "Always", "score": 3 }
          }   
        },
        {
          "question": "Do you rewatch old conversations in your head and think about what you should’ve said?",
          "options": {
            "A": { "text": "Yes, I do it all the time", "score": 3 },
            "B": { "text": "Sometimes", "score": 2 },
            "C": { "text": "Rarely", "score": 1 },
            "D": { "text": "No, I move on quickly", "score": 0 }
          }
        },
        {
          "question": "Do you frequently feel restless, nervous, or on edge?",
          "options": {
            "A": { "text": "Yes", "score": 2 },
            "B": { "text": "No", "score": 0 }
          }
        },
        {
          "question": "Have you lost interest in activities you once enjoyed?",
          "options": {
            "A": { "text": "Yes", "score": 2 },
            "B": { "text": "No", "score": 0 }
          }
        },
        {
          "question": "On a scale of 1-5, how emotionally balanced do you feel right now?",
          "options": {
            "A": { "text": "1 (Not at all)", "score": 4 },
            "B": { "text": "2", "score": 3 },
            "C": { "text": "3", "score": 2 },
            "D": { "text": "4", "score": 1 },
            "E": { "text": "5 (Completely balanced)", "score": 0 }
          }
        }
      ],

      "male": [
        {
          "question": "You receive an email from your boss that’s brief and to the point. What do you think?",
          "options": {
            "A": { "text": "They’re probably busy and didn’t have time for details.", "score": 1 },
            "B": { "text": "Maybe I didn’t do well enough, and they’re not happy with my work.", "score": 2 },
            "C": { "text": "I wonder if I missed something important or made a mistake.", "score": 2 },
            "D": { "text": "What if this is a sign of something bigger going wrong?", "score": 3 }
          }
        },
        {
          "question": "You finish a presentation at work, and your manager doesn’t immediately provide feedback. What goes through your mind?",
          "options": {
            "A": { "text": "They’re probably just processing the information.", "score": 1 },
            "B": { "text": "Maybe they didn’t think it was good enough.", "score": 2 },
            "C": { "text": "I wonder if they’re disappointed with my performance.", "score": 2 },
            "D": { "text": "Did I miss something critical in my presentation?", "score": 3 }
          }
        },
        {
          "question": "Do you ever take a long time to reply to texts because you’re overthinking what to say?",
          "options": {
            "A": { "text": "Yes, always", "score": 3 },
            "B": { "text": "Sometimes", "score": 2 },
            "C": { "text": "Rarely", "score": 1 },
            "D": { "text": "No, I reply instantly", "score": 0 }
          }
        },
        {
          "question": "Do you ever feel tired just from thinking too much?",
          "options": {
            "A": { "text": "Yes, all the time", "score": 3 },
            "B": { "text": "Sometimes", "score": 2 },
            "C": { "text": "Rarely", "score": 1 },
            "D": { "text": "No, my mind is always fresh", "score": 0 }
          }
        },
        {
          "question": "Do you rewatch old conversations in your head and think about what you should’ve said?",
          "options": {
            "A": { "text": "Yes, I do it all the time", "score": 3 },
            "B": { "text": "Sometimes", "score": 2 },
            "C": { "text": "Rarely", "score": 1 },
            "D": { "text": "No, I move on quickly", "score": 0 }
          }
        },
        {
          "question": "Do you ever get stuck thinking about what someone meant by a simple message?",
          "options": {
            "A": { "text": "Yes, I analyze every word", "score": 3 },
            "B": { "text": "Sometimes, if it’s important", "score": 2 },
            "C": { "text": "Rarely, I don’t think much about texts", "score": 1 },
            "D": { "text": "No, I take things at face value", "score": 0 }
          }
        },
        {
          "question": "Have you lost interest in activities you once enjoyed?",
          "options": {
            "A": { "text": "Yes", "score": 2 },
            "B": { "text": "No", "score": 0 }
          }
        },
        {
          "question": "On a scale of 1-5, how emotionally balanced do you feel right now?",
          "options": {
            "A": { "text": "1 (Not at all)", "score": 4 },
            "B": { "text": "2", "score": 3 },
            "C": { "text": "3", "score": 2 },
            "D": { "text": "4", "score": 1 },
            "E": { "text": "5 (Completely balanced)", "score": 0 }
          }
        }
      ]
    },
  }
  
    
]
  
  export default questions