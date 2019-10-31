export interface Run{
    Block: Number,
    Year: Number,
    Event: String,
    OutcomeTopic: String,
    Score: Number
  } //interace is needed to accept http requests in subscribe() function