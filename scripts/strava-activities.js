// Strava - get data for my recent activities
//
// How to run this:
//  - Open https://www.strava.com/athlete/training (have to login)
//  - Open Dev Tools (Command-Option-I on Mac)
//  - Go to the Console tab
//  - Copy and paste the script below, and hit enter to run it
//  - Right click and copy the JSON object into "activities" in
//      src/run-once-a-week.11tydata.json
//  - update the STOP_AT_DATE value

(() => {
  // don't process this date or anything after it
  const STOP_AT_DATE = '7/25/2023';
  const TRACKED_ACTIVITIES = ['Run', 'Hike'];
  let hitStopDate = false;
  const activityData = {};

  // convert whitespace to a single space, removing leading/trailing space
  function cleanSpace(text) {
    return text.replace(/\s+/g, ' ').trim();
  }
  // all the dates are like 'Tue, 1/2/2020', 'Wed, 2/10/2011', etc.
  function parseDate(text) {
    return text.replace(/^[A-Za-z]{3}, /, '');
  }

  // all of my activities currently fit onto a single page (it's 20 per page),
  // if they didn't, this would need some logic to click to the next page of results
  const trainingActivityRow = document.querySelectorAll(
    '.training-activity-row'
  );
  console.log(`found ${trainingActivityRow.length} activities`);

  for (const tr of trainingActivityRow.values()) {
    const kind = cleanSpace(tr.children[0].textContent);
    const date = parseDate(cleanSpace(tr.children[1].textContent));
    if (!TRACKED_ACTIVITIES.includes(kind)) {
      console.log(`skipping activity '${kind}' on ${date}`);
      continue;
    }
    if (hitStopDate || date === STOP_AT_DATE) {
      hitStopDate = true;
      console.log(`skipping '${kind}' on ${date} (past ${STOP_AT_DATE})`);
      continue;
    }
    const link = tr.children[2].children[0].getAttribute('href');
    const time = cleanSpace(tr.children[3].textContent);
    const distance = cleanSpace(tr.children[4].textContent);
    const elevation = cleanSpace(tr.children[5].textContent);
    console.log(
      `${kind}: ${date}, ${link}, ${time}, ${distance}, ${elevation}`
    );
    activityData[date] = {
      date,
      kind,
      link,
      time,
      distance,
      elevation,
    };
  }
  console.log(activityData);
})();
