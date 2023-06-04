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
  const elementsToHideForReplay = [];
  const elementsToSuggestForReplay = [];

  const elementsToAnimate = block.querySelectorAll('.js-type');
  const replayButton = block.querySelector('button');

  // insert a small delay before starting the animation
  animationSteps.push({
    run: () => {
      /* do nothing */
    },
    delay: DELAY_INITIAL,
  });

  // figure out the steps to animate each element
  for (const element of elementsToAnimate) {
    elementsToHideForReplay.push(element);
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
        elementsToSuggestForReplay.push(element);
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
          delay: DELAY_TYPING,
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

  // once the animation is done, show the replay button
  animationSteps.push({
    run: () => {
      replayButton.classList.remove('hidden');
    },
    delay: DELAY_DONE,
  });

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

  // how to replay the animation
  replayButton.addEventListener('click', () => {
    // hide the button so it can't be clicked again
    // (I should probably remove the event listener, in case the button is focused, whatever)
    replayButton.classList.add('hidden');
    // reset classes for animated elements
    for (const element of elementsToHideForReplay) {
      element.classList.add('hidden');
    }
    for (const e of elementsToSuggestForReplay) {
      e.classList.add('copilot-suggest');
    }
    // then re-run the animation
    animationStep = 0;
    animate();
  });

  // start the animation
  // TODO: only start when the code block is visible
  animate();
}
