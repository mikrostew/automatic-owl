function showText(elemID) {
  const div = document.getElementById(elemID);
  // show if hidden, or vice versa
  if (div.classList.contains('hidden')) {
    div.classList.remove('hidden');
  } else {
    div.classList.add('hidden');
  }
  // make sure all other ones things are hidden
  const otherDivs = document.querySelectorAll('.run-data');
  for (const other of otherDivs) {
    if (other.id === elemID) {
      continue;
    }
    if (!other.classList.contains('hidden')) {
      other.classList.add('hidden');
    }
  }
}
