/*

{
    "Comment": "An image processing workflow",
    "StartAt": "ReadImage",
    "States": {
      "ReadImage": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:region:account-id:function:ReadImageFunction",
        "Next": "ResizeImage",
        "Catch": [{
          "ErrorEquals": ["ImageReadError"],
          "Next": "ImageProcessingFailed"
        }]
      },
      "ResizeImage": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:region:account-id:function:ResizeImageFunction",
        "Next": "AddWatermark",
        "Catch": [{
          "ErrorEquals": ["ResizeError"],
          "Next": "ImageProcessingFailed"
        }]
      },
      "AddWatermark": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:region:account-id:function:AddWatermarkFunction",
        "Next": "StoreImage",
        "Catch": [{
          "ErrorEquals": ["WatermarkError"],
          "Next": "ImageProcessingFailed"
        }]
      },
      "StoreImage": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:region:account-id:function:StoreImageFunction",
        "End": true,
        "Catch": [{
          "ErrorEquals": ["StoreError"],
          "Next": "ImageProcessingFailed"
        }]
      },
      "ImageProcessingFailed": {
        "Type": "Fail",
        "Error": "ImageProcessingFailed",
        "Cause": "An error occurred while processing the image"
      }
    }
  }

  */