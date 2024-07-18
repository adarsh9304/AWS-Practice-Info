// setup and intialization

const AWS = require('aws-sdk');

// Configure the AWS region
AWS.config.update({
  region: 'us-west-2'
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();




//Creating a Table with Primary Key and Indexes

const params = {
    TableName: 'Movies',
    KeySchema: [
      { AttributeName: 'MovieID', KeyType: 'HASH' },  // Partition Key
      { AttributeName: 'Title', KeyType: 'RANGE' }    // Sort Key
    ],
    AttributeDefinitions: [
      { AttributeName: 'MovieID', AttributeType: 'S' },
      { AttributeName: 'Title', AttributeType: 'S' },
      { AttributeName: 'Genre', AttributeType: 'S' },
      { AttributeName: 'ReleaseYear', AttributeType: 'N' },
      { AttributeName: 'Director', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'GenreIndex',
        KeySchema: [
          { AttributeName: 'Genre', KeyType: 'HASH' },  // Partition Key
          { AttributeName: 'ReleaseYear', KeyType: 'RANGE' }  // Sort Key
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'DirectorIndex',
        KeySchema: [
          { AttributeName: 'Director', KeyType: 'HASH' },  // Partition Key
          { AttributeName: 'ReleaseYear', KeyType: 'RANGE' }  // Sort Key
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: 'ReleaseYearIndex',
        KeySchema: [
          { AttributeName: 'MovieID', KeyType: 'HASH' },  // Partition Key (same as primary key)
          { AttributeName: 'ReleaseYear', KeyType: 'RANGE' }  // Sort Key
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      }
    ]
  };
  
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });

  



  //Add data to table

  const addMovie = (movie) => {
    const params = {
      TableName: 'Movies',
      Item: movie
    };
  
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add movie", movie.Title, ". Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("PutItem succeeded:", movie.Title);
      }
    });
  };
  
  const movies = [
    { MovieID: '1', Title: 'Inception', Genre: 'Sci-Fi', ReleaseYear: 2010, Director: 'Christopher Nolan' },
    { MovieID: '2', Title: 'The Dark Knight', Genre: 'Action', ReleaseYear: 2008, Director: 'Christopher Nolan' },
    { MovieID: '3', Title: 'Interstellar', Genre: 'Sci-Fi', ReleaseYear: 2014, Director: 'Christopher Nolan' },
    { MovieID: '4', Title: 'The Matrix', Genre: 'Sci-Fi', ReleaseYear: 1999, Director: 'Lana Wachowski' },
    { MovieID: '5', Title: 'John Wick', Genre: 'Action', ReleaseYear: 2014, Director: 'Chad Stahelski' }
  ];
  
  movies.forEach(movie => addMovie(movie));






  // Query Using Primary Key:

  const queryByMovieID = (movieID) => {
    const params = {
      TableName: 'Movies',
      KeyConditionExpression: 'MovieID = :movieID',
      ExpressionAttributeValues: {
        ':movieID': movieID
      }
    };
  
    docClient.query(params, (err, data) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        console.log("Query succeeded:", JSON.stringify(data, null, 2));
      }
    });
  };
  
  queryByMovieID('1');

  


  //Query Using Global Secondary Index:

  const queryByGenre = (genre) => {
    const params = {
      TableName: 'Movies',
      IndexName: 'GenreIndex',
      KeyConditionExpression: 'Genre = :genre',
      ExpressionAttributeValues: {
        ':genre': genre
      }
    };
  
    docClient.query(params, (err, data) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        console.log("Query succeeded:", JSON.stringify(data, null, 2));
      }
    });
  };
  
  queryByGenre('Sci-Fi');

  






  //Query Using Local Secondary Index:

  const queryByMovieIDAndYear = (movieID) => {
    const params = {
      TableName: 'Movies',
      IndexName: 'ReleaseYearIndex',
      KeyConditionExpression: 'MovieID = :movieID',
      ExpressionAttributeValues: {
        ':movieID': movieID
      }
    };
  
    docClient.query(params, (err, data) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        console.log("Query succeeded:", JSON.stringify(data, null, 2));
      }
    });
  };
  
  queryByMovieIDAndYear('1');
  


  