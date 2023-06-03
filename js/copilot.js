// some delays for things
const DELAY_INITIAL = 100;
const DELAY_TYPING = 25;
const DELAY_SUGGEST = 500;
const DELAY_ACCEPT = 1000;
// special delay indicating to stop the animation
const DELAY_DONE = 0;

// find all the code blocks
const codeBlocks = document.querySelectorAll('pre > code');

// then for each code block find the elements to animate
for (const block of codeBlocks) {
  const animationSteps = [];
  let animationStep = 0;
  let elementWithCursor = undefined;

  const elementsToAnimate = block.querySelectorAll('.js-type');

  // insert a small delay before starting the animation
  animationSteps.push({
    run: () => {
      /* do nothing */
    },
    delay: DELAY_INITIAL,
  });

  // figure out the steps to animate each element
  for (const element of elementsToAnimate) {
    const text = element.textContent;

    // if it's a copilot suggestion, simulate waiting for that
    if (element.classList.contains('copilot-suggest')) {
      animationSteps.push({
        run: () => {
          /* do nothing */
        },
        delay: DELAY_SUGGEST,
      });

      if (element.classList.contains('copilot-accept')) {
        // show the suggestion, accept it, then keep going
        animationSteps.push({
          run: () => {
            element.classList.remove('hidden');
          },
          delay: DELAY_ACCEPT,
        });
        animationSteps.push({
          run: () => {
            element.classList.remove('copilot-suggest');
            // keep the cursor moving
            if (elementWithCursor !== undefined) {
              elementWithCursor.classList.remove('typing');
            }
            element.classList.add('typing');
            elementWithCursor = element;
          },
          delay: DELAY_TYPING,
        });
      } else {
        // otherwise show the suggestion and stop
        animationSteps.push({
          run: () => {
            element.classList.remove('hidden');
          },
          delay: DELAY_DONE,
        });
      }
    } else {
      // this is a typing block
      // first steps is to clear the element text and add a single letter
      animationSteps.push({
        run: () => {
          // keep the cursor moving
          if (elementWithCursor !== undefined) {
            elementWithCursor.classList.remove('typing');
          }
          element.classList.add('typing');
          elementWithCursor = element;

          // some elements are for cursor positioning, and have no text
          element.textContent = text[0] ?? '';
          // also have to show the element
          element.classList.remove('hidden');
        },
        delay: DELAY_TYPING,
      });

      // then animate all of the other letters
      for (let i = 1; i < text.length; i++) {
        animationSteps.push({
          run: () => {
            element.textContent += text[i];
          },
          delay: DELAY_TYPING,
        });
      }
    }
  }

  // how to do the animation, with delay
  const animate = () => {
    if (animationStep < animationSteps.length) {
      const step = animationSteps[animationStep];
      step.run();
      animationStep++;
      if (step.delay !== DELAY_DONE) {
        setTimeout(animate, step.delay);
      }
    }
  };

  // start the animation
  // TODO: only start when the code block is visible
  animate();
}
