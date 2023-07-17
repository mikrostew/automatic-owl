---
title: Current Unix Timestamp
description: Seconds since Jan 1, 1970
layout: page
jsFiles:
- unix-timestamp

---

The Unix timestamp tracks time as the number of seconds[^leap] since the Unix Epoch[^epoch], which is January 1st, 1970[^many] at UTC.

[^leap]: Not including leap seconds, apparently ¯&bsol;\_(ツ)\_/¯.

[^epoch]: "a date and time from which a computer measures system time" (see https://en.wikipedia.org/wiki/Epoch_(computing))

[^many]: There are many different epochs used by different operating systems and programming languages, see [this Stack Overflow answer](https://stackoverflow.com/a/26391999) for an overview.


Current timestamps:

<table>
<tr>
<td>Local date and time:&nbsp;</td><td id="locale-timestamp"></td>
</tr>
<tr>
<td>Unix (seconds):&nbsp;</td><td id="unix-timestamp-sec"></td>
</tr>
<tr>
<td>Unix (milliseconds):&nbsp;</td><td id="unix-timestamp-ms"></td>
</tr>
</table>
