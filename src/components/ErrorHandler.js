import PubSub from 'pubsub-js';

export default class ErrorHandler{ 

    manageError(json){
        json.errors.forEach(erro => {
           PubSub.publish("validation-error", erro); 
        });
    }
} 