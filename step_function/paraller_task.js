/*

{
  "StartAt": "ParallelState",
  "States": {
    "ParallelState": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "TaskA",
          "States": {
            "TaskA": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:region:account-id:function:TaskAFunction",
              "End": true
            }
          }
        },
        {
          "StartAt": "TaskB",
          "States": {
            "TaskB": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:region:account-id:function:TaskBFunction",
              "End": true
            }
          }
        }
      ],
      "Next": "FinalTask"
    },
    "FinalTask": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:FinalTaskFunction",
      "End": true
    }
  }
}


*/