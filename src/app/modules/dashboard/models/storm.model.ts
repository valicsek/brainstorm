/**
 * This object represents the information what the user wants to remember.
 * We store this object in a group. The group is the object what represents the subject itself.
 */
export class Storm {
  id: number;
  question: string;
  hintArray: string[];
  youtubeLinkArray: string[];
  answer: any;

  constructor(question: string, hintArray: string[], answer: any) {
    this.question = question;
    this.hintArray = hintArray;
    this.answer = answer;
    this.youtubeLinkArray = [];
  }
}
