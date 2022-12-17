import { createMachine } from 'xstate';

const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log('Welcome to the XState workshop!');

const user = {
  name: 'David Khourshid',
  company: 'Microsoft',
  interests: ['piano', 'state machines'],
};

function transition(state,event){
  switch (state) {
    case 'idle':
      switch(event){
        case 'fetch': return 'pending'
        default: return state
      }
    case 'pending':
      switch(event){
        case 'resolve': return 'resolved'
        case 'reject': return 'rejected'
        default: return state
      }
    case 'resolved':
    case 'rejected':  
    default:return state;
  }
}

const machine={
  initial:'idle',
  states:{
    idle:{
      on:{
        fetch:'pending'
      }
    },
    pending:{
      on:{
        resolve:'resolved',
        reject:'rejected'
      }
    },
    resolved:{},
    rejected:{},
  }
}

const transitiona=(state,event)=>{
  return machine.states[state]?.on?.[event] || state
}

let currentState=machine.initial;
const send=(event)=>{
  const nextstate=transitiona(currentState,event)
  console.log(nextstate);
  currentState=nextstate;
}
output(user);
window.send=send;

const feedbackMachine=createMachine({
  initial:'question',
  states:{
    question:{
      on:{
        CLICK_GOOD:'thanks',
        CLICK_BAD:'form'
      }
    },
    form:{
      on:{
        SUBMIT:'thanks',
      }
    },
    thanks:{
      on:{
        CLOSE:'closed',
      }
    },
    closed:{

    }
  }
})
const clickGoodEvent={
  type:'CLICK_GOOD',
  time:Date.now()
}
const nextstate=feedbackMachine.transition(
  feedbackMachine.initial,clickGoodEvent
)
console.log(nextstate);
//console.log(transitiona('pending','a'));
