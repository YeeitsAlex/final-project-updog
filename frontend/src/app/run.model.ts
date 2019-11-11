interface Outcome{
  OutcomeTopic: String,
  Score: Number
} //interace is needed to accept http requests in subscribe() function
interface Events{
  Event: String,
  EventOutcome: Array<Outcome>
} //interace is needed to accept http requests in subscribe() function
export interface Run{
  Year: Number,
  Block: Number,
  Eventlist: Array<Events>
} //interace is needed to accept http requests in subscribe() function
export interface OutcomeList{ //NEED RESARCH: WILL THIS BE ANY FASTER THAN USING RUN FOR LIST ALL OUTCOME FUNCTION
  Eventlist: Array<{OutcomeTopic: String}>
}
  