import { createMachine, assign, interpret } from 'xstate';

const elBox = document.querySelector('#box');
const elBody = document.body;

const machine = createMachine({
  initial: 'idle',
  // Set the initial context
  // Clue: {
  //   x: 0,
  //   y: 0,
  //   dx: 0,
  //   dy: 0,
  //   px: 0,
  //   py: 0,
  // }
  // context: ...,
  context:{
    x:0,
    y:0,
    dx:0,
    dy:0,
    px:0,
    py:0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          // Assign the point
          // ...
          actions:assign({
              px:(context,event)=>event.clientX,
              py:(context,event)=>event.clientY,
            }),
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          // Assign the delta
          // ...
          // (no target!)
          actions:assign({
            dx: (context, event) => {
              return event.clientX - context.px;
            },
            dy: (context, event) => {
              return event.clientY - context.py;
            },
           
          }),
        },
        mouseup: {
          // Assign the position
          actions:assign({
            x: (context, event) => {
              return context.x + context.dx;
            },
            y: (context, event) => {
              return context.y + context.dy;
            },
            dx: 0,
            dy: 0,
            px: 0,
            py: 0,
          }),
          target: 'idle',
        },
        'keyup.escape': {
          target: 'idle',
          actions: assign({
            dx: 0,
            dy: 0,
            px: 0,
            py: 0,
          }),
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);

    elBox.dataset.state = state.value;

    elBox.style.setProperty('--dx', state.context.dx);
    elBox.style.setProperty('--dy', state.context.dy);
    elBox.style.setProperty('--x', state.context.x);
    elBox.style.setProperty('--y', state.context.y);
  }
});

service.start();

// Add event listeners for:
// - mousedown on elBox
// - mousemove on elBody
// - mouseup on elBody

elBox.addEventListener('mousedown',(event)=>{
  service.send(event)
})
elBody.addEventListener('mousemove',(event)=>{
  service.send(event)
})
elBody.addEventListener('mouseup',(event)=>{
  service.send(event)
})

elBody.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    service.send('keyup.escape');
  }
});