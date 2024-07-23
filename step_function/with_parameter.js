/*

{
  "Comment": "A workflow processing user request with dynamic variables",
  "StartAt": "ValidateRequest",
  "States": {
    "ValidateRequest": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:ValidateRequestFunction",
      "Next": "ReadImage",
      "Parameters": {
        "name.$": "$.name",
        "image.$": "$.image",
        "date.$": "$.date"
      },
      "Catch": [{
        "ErrorEquals": ["ValidationError"],
        "Next": "RequestFailed"
      }]
    },
    "ReadImage": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:ReadImageFunction",
      "Next": "ResizeImage",
      "Parameters": {
        "imageName.$": "$.image"
      },
      "Catch": [{
        "ErrorEquals": ["ImageReadError"],
        "Next": "RequestFailed"
      }]
    },
    "ResizeImage": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:ResizeImageFunction",
      "Next": "AddWatermark",
      "Parameters": {
        "image.$": "$.image"
      },
      "Catch": [{
        "ErrorEquals": ["ResizeError"],
        "Next": "RequestFailed"
      }]
    },
    "AddWatermark": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:AddWatermarkFunction",
      "Next": "StoreImage",
      "Parameters": {
        "image.$": "$.image",
        "personName.$": "$.name"
      },
      "Catch": [{
        "ErrorEquals": ["WatermarkError"],
        "Next": "RequestFailed"
      }]
    },
    "StoreImage": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:region:account-id:function:StoreImageFunction",
      "End": true,
      "Parameters": {
        "image.$": "$.image"
      },
      "Catch": [{
        "ErrorEquals": ["StoreError"],
        "Next": "RequestFailed"
      }]
    },
    "RequestFailed": {
      "Type": "Fail",
      "Error": "RequestProcessingFailed",
      "Cause": "An error occurred during request processing"
    }
  }
}


*/