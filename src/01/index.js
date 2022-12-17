const elBox = document.querySelector('#box');
const elDiv = document.querySelector('#div');


// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  switch (state) {
    case 'inactive':
      switch(event){
        case 'click': return 'active'
        default:return state;
      }
    case 'active':
      switch(event){
        case 'click': return 'inactive'
        default:return state;
      }
    default:return state;
  }
}
const machine={
  initital:'inactive',
  states:{
    inactive:{
      on:{
        click: 'active'
      }
    },
    active:{
      on:{
      click: 'inactive'
      }
    }
  }
}
const transitiona=(state,event)=>{
 return machine.states[state]?.on?.[event] || event
}

// Keep track of your current state
let currentState = 'inactive';

function send(event) {
  // Determine the next value of `currentState`
  const nextState=transition(currentState,event)
  currentState=nextState

  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  // send a click event
  send('click')
});
