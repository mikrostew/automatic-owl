---
title: Running Once a Week
description: Trying to run (or hike) once every week in 2023.
layout: page
wip: true
jsFiles:
 - run-once-a-week

---

{% import "calendar-macros.njk" as calendar %}

### January
{{ calendar.monthRunTable(2023, 1, activities) }}

### February
{{ calendar.monthRunTable(2023, 2, activities) }}

### March[^sick-march]
{{ calendar.monthRunTable(2023, 3, activities) }}

[^sick-march]: I was sick for most of the first full week of March, and didn't run or hike that week.

### April
{{ calendar.monthRunTable(2023, 4, activities) }}

### May
{{ calendar.monthRunTable(2023, 5, activities) }}

### June[^june-weeks]
{{ calendar.monthRunTable(2023, 6, activities) }}

[^june-weeks]: Didn't run two weeks in June. First week, the whole family was sick, and then it was really smoky outside from the Canadian fires. The other week, we did a family trip and I didn't feel like running during that.

### July
{{ calendar.monthRunTable(2023, 7, activities) }}

### August
{{ calendar.monthRunTable(2023, 8, activities) }}

### September
{{ calendar.monthRunTable(2023, 9, activities) }}

### October
{{ calendar.monthRunTable(2023, 10, activities) }}

### November
{{ calendar.monthRunTable(2023, 11, activities) }}

### December
{{ calendar.monthRunTable(2023, 12, activities) }}


## Weeks of the Year

{{ calendar.yearRunChart(2023, activities) }}

