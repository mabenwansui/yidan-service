import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Message, MessageSchema } from './schemas/message.schema'

@Injectable()
export class MessageService {
  private readonly subject = new Subject<any>()  
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,    
  ) {
    this.getEventStream()
  }  

  emitNewMessage(message: any) {
    this.subject.next(message)
  }

  getEventStream(): Observable<any> {
    return this.subject.asObservable().pipe(
      map((message) => {
        debugger
        return {
          type: 'message',
          data: message,
        }
      }),
    );
  }  

  async delete() {

  }
}