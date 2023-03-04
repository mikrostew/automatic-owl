---
title: One Rep Max Calculator
description: Estimate your one repetition max (1RM), the maximum weight you can lift one time, for an exercise.
layout: script
scriptName: one-rep-max.js

---

Calculate your one rep max, based on a sub-maximal lift:

Weight: <input type="number" id="weight-input" name="foo" min="1" max="1500" value="125"> <input type="radio" id="radio-lb" name="units" value="radio-lb" checked><label for="radio-lb">lbs</label> <input type="radio" id="radio-kg" name="units" value="radio-kg"><label for="radio-kg">kgs</label>

Reps: <input type="number" id="reps-input" name="bar" min="1" max="50" value="8">

Your estimated one rep max is **<span id="one-rep-max"></span>**.

<div class="grid-two-column">

<div>
<h3 class="text-center">Percentages of 1RM</h3>
<table id="table-percent" class="full-width text-center">
<thead>
<tr><th class="third-width">Percent</th><th class="third-width">lbs</th><th>kg</th></tr>
</thead>
<tbody>
<tr><td>100%</td><td></td><td></td></tr>
<tr><td>95%</td><td></td><td></td></tr>
<tr><td>90%</td><td></td><td></td></tr>
<tr><td>85%</td><td></td><td></td></tr>
<tr><td>80%</td><td></td><td></td></tr>
<tr><td>75%</td><td></td><td></td></tr>
<tr><td>70%</td><td></td><td></td></tr>
<tr><td>65%</td><td></td><td></td></tr>
<tr><td>60%</td><td></td><td></td></tr>
<tr><td>55%</td><td></td><td></td></tr>
<tr><td>50%</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div>
<h3 class="text-center">Reps based on 1RM</h3>
<table id="table-reps" class="full-width text-center">
<thead>
<tr><th class="third-width">Reps</th><th class="third-width">lbs</th><th>kg</th></tr>
</thead>
<tbody>
<tr><td>1</td><td></td><td></td></tr>
<tr><td>2</td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td></tr>
<tr><td>6</td><td></td><td></td></tr>
<tr><td>7</td><td></td><td></td></tr>
<tr><td>8</td><td></td><td></td></tr>
<tr><td>9</td><td></td><td></td></tr>
<tr><td>10</td><td></td><td></td></tr>
<tr><td>11</td><td></td><td></td></tr>
<tr><td>12</td><td></td><td></td></tr>
<tr><td>13</td><td></td><td></td></tr>
<tr><td>14</td><td></td><td></td></tr>
<tr><td>15</td><td></td><td></td></tr>
</tbody>
</table>
</div>

</div>

==TODO: some desription down here, blah blah...==

==TODO: also, maybe allow selecting different forumlas??==
