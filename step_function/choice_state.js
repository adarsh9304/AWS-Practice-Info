/*

{
  "StartAt": "ChoiceState",
  "States": {
    "ChoiceState": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.value",
          "NumericGreaterThan": 10,
          "Next": "TaskA"
        },
        {
          "Variable": "$.value",
          "NumericLessThanEquals": 10,
          "Next": "TaskB"
        }
      ],
      "Default": "DefaultTask"
    },
    "TaskA": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:TaskAFunction",
      "End": true
    },
    "TaskB": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:TaskBFunction",
      "End": true
    },
    "DefaultTask": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:DefaultTaskFunction",
      "End": true
    }
  }
}


*/