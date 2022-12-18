import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial:'inactive',
  states:{
    inactive:{
      on:{
        CLICK:'active'
      }
    },
    active:{
      on:{
        CLICK:{
          target:'inactive'
      }
      }
    }
  }
});

// Change this to the initial state
let currentState = machine.initial;

function send(event) {
  currentState=machine.transition(currentState,event)

  elBox.dataset.state = currentState.value;

  console.log(currentState);
}

const clickEvent={
  type:'CLICK'
}

elBox.addEventListener('click', () => {
  // Send a click event
  send(clickEvent)
});



