// didn't measure any of these, but they seem about right
const DELAY_INITIAL = 100;
const DELAY_TYPING = 20;
const DELAY_SUGGEST = 500;
const DELAY_ACCEPT = 800;
const DELAY_REJECT = 0;
// special delay indicating to stop the animation
const DELAY_DONE = -1;

// check that the entire element is visible in the viewport
function elementIsFullyVisible(element) {
  const rect = element.getBoundingClientRect();
  // don't care about left and right for these, just top and bottom
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

const codeBlocks = document.querySelectorAll('pre > code');

// for each code block, setup the animation steps for each element
for (const block of codeBlocks) {
  const animationSteps = [];
  let animationStep = 0;
  let elementWithCursor = undefined;
  const elementsToHideForReplay = [];
  const elementsToNoneForReplay = [];
  const elementsToSuggestForReplay = [];

  const elementsToAnimate = block.querySelectorAll('.js-type');
  const replayButton = block.querySelector('button');

  // figure out the steps to animate each element
  for (const element of elementsToAnimate) {
    elementsToHideForReplay.push(element);
    const text = element.textContent;

    // if it's a copilot suggestion, simulate waiting for that
    if (element.classList.contains('copilot-suggest')) {
      animationSteps.push({
        run: () => {
          /* do nothing, simulate me reviewing the suggested code */
        },
        delay: DELAY_SUGGEST,
      });

      if (element.classList.contains('copilot-accept')) {
        elementsToSuggestForReplay.push(element);
        // show the suggestion, accept it, then keep going
        // (slight problem here where it shifts by the cursor width when accepted, but ¯\_(ツ)_/¯)
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
      } else if (element.classList.contains('copilot-reject')) {
        elementsToNoneForReplay.push(element);
        // show the suggestion, hide it, then keep going
        animationSteps.push({
          run: () => {
            element.classList.remove('hidden');
          },
          delay: DELAY_ACCEPT,
        });
        animationSteps.push({
          run: () => {
            element.classList.add('none');
            element.classList.add('hidden');
          },
          delay: DELAY_REJECT,
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
    replayButton.classList.add('hidden');
    // reset classes for animated elements
    for (const element of elementsToHideForReplay) {
      element.classList.add('hidden');
    }
    for (const e of elementsToSuggestForReplay) {
      e.classList.add('copilot-suggest');
    }
    for (const e of elementsToNoneForReplay) {
      e.classList.remove('none');
    }
    // then re-run the animation
    animationStep = 0;
    animate();
  });

  const animateIfInView = () => {
    if (elementIsFullyVisible(block)) {
      setTimeout(animate, DELAY_INITIAL);
      // once this has been started, don't re-start it
      document.removeEventListener('scroll', animateIfInView);
    }
  };

  // start the animation if in view, or after scrolling into view
  if (elementIsFullyVisible(block)) {
    setTimeout(animate, DELAY_INITIAL);
  } else {
    document.addEventListener('scroll', animateIfInView);
  }
}
