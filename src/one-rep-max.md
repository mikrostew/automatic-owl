---
title: One Rep Max Calculator
description: Estimate your one repetition max (1RM), and derive percentages and reps from that.
layout: script
scriptName: one-rep-max.js

---

Calculate your one rep max, based on a sub-maximal lift:

Weight:
<input type="number" id="weight-input" name="weight" min="1" max="1500" value="125" size="6">
<input type="radio" id="radio-lb" name="units" value="radio-lb" checked><label for="radio-lb">lbs</label>
<input type="radio" id="radio-kg" name="units" value="radio-kg"><label for="radio-kg">kgs</label>
<span id="weight-error" class="error hidden"></span>

Reps:
<input type="number" id="reps-input" name="reps" min="1" max="50" value="8" size="3">
<span id="reps-error" class="error hidden"></span>

Your estimated one rep max is: **<span id="one-rep-max"></span>**

<div class="two-column-reflow">

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

You can also select an equation to use (these are the two most popular[^wiki]):

<input type="radio" id="brzycki" name="equation" value="brzycki" checked><label for="brzycki">Brzycki</label>
<input type="radio" id="epley" name="equation" value="epley"><label for="epley">Epley</label>

## Why use this?

Many strength training programs are setup so that the weights used are either:
* some percentage of your 1 rep max (1RM)
* in a specified rep range

To calculate a percentage of your 1RM, you need to know what it is. Actually performing a 1 rep max lift is fatiguing and prone to injury[^nfpt] (and if you're not a competitive powerlifter/strongman/weightlifter, you don't have to).

It's easier to use an equation to estimate your 1RM, based on your submaximal lifts. There are number of equations for this[^wiki-equations], and I chose the two most popular: Brzycki and Epley. I did a little internet research, and found that while these equations have limitations[^study1][^study2][^study3][^study4], they are accurate enough to be useful.

## Brzycki

Unlike some of the studies I referenced above, I have no idea what data was used to come up with this equation. The commonly cited reference for this[^brzycki-cite] is a physical book, which [seems to exist](https://www.book-info.com/isbn/1-57028-018-5.mobi.htm), but I haven't bought it.

==TODO: the equation, in mathjax: 1RM = w * 36 / (37 - r)==

## Epley

I also don't know what data was used to formulate this equation. The commonly cited reference for this[^epley-cite] seems to be out of print?

==TODO: the equation, in mathjax: 1RM = w * (1 + r/30)==


Anyway, there you go. Hope this calculator is useful.


[^wiki]: According to Wikipedia: <https://en.wikipedia.org/wiki/One-repetition_maximum>

[^nfpt]: From <https://www.nfpt.com/blog/calculating-a-clients-1rm>:

    > Attempting a 1RM requires a great deal of focus and mental preparation on the part of the lifter. A maximal exertion for a single repetition consumes a surplus of training time as well as drains an excessive amount of the trainee’s recuperative resources. Simply put, the time and energy spent in performing a 1RM detracts from the flow of the overall training regimen; moreover, any performance of exertions with maximal workloads may lead to significant stress imposed on muscle tissues, bone and ligaments, which in turn can trigger metabolic alterations. In light of this, many practitioners and coaches view the 1RM as dangerous and impractical in most exercise settings.

[^wiki-equations]: Wikipedia currently lists 12: <https://en.wikipedia.org/wiki/One-repetition_maximum#Calculating_1RM>

[^study1]: [This](https://journals.lww.com/nsca-jscr/abstract/1999/08000/validity_of_1rm_prediction_equations_for_older.11.aspx) was a study of older individuals (average age ~70yrs). It found that the 6 most popular equations underestimated the 1RM of the participants (by up to 10kg) on machine exercises, but were still useful for programming.

[^study2]: [This study](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4042664/) found that the relationship between 1RM and other rep ranges can vary based on athletic background (weight lifting vs running), and these equations were not as accurate for runners.

[^study3]: [This study](https://www.unm.edu/~rrobergs/478RMStrengthPrediction.pdf) found different strength curves between men and women, and between different exerises, but concluded that the popular equations are still close enough to be useful.

[^study4]: [This study](https://opensiuc.lib.siu.edu/cgi/viewcontent.cgi%3Farticle%3D1744%26context%3Dgs_rp), which used these equations to estimate the 1RM back squat of college football players, found that Epley was closer when using 3RM, and Brzycki was closer at 5RM.

[^brzycki-cite]: Brzycki, Matt (1998). A Practical Approach To Strength Training. McGraw-Hill. ISBN 978-1-57028-018-4.

[^epley-cite]: Epley, Boyd (1985). "Poundage Chart". Boyd Epley Workout. Lincoln, NE: Body Enterprises. p. 86.
