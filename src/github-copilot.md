---
title: Copilot Check Ride
description: Flying the friendly editor skies with my "AI pair programmer"
layout: script
scriptName: copilot.js
extraCSS:
 - code-blocks

---

I recently got access to use [GitHub Copilot](https://github.com/features/copilot/), which has been [GA since June 2022](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/)[^copilot-x].
I've been using it for the last two months, and found it to be helpful, in a limited way.

[^copilot-x]: Copilot X preview [was recently announced](https://github.com/features/preview/copilot-x), so I'm already behind the curve.

::: note
I captured some screen recordings when trying out Copilot, but didn't want to include a bunch of multi-megabyte videos or gifs on this page.
I reproduced them here as animations[^animation] (similar to the Copilot site), which was more fun anyway.
:::

[^animation]: You can see the JavaScript for this page [here](https://github.com/mikrostew/automatic-owl/blob/main/js/{{ scriptName }}). For the code blocks, I initially included the code samples between &#96;&#96;&#96; blocks in this file. After building the site locally, I copied the [highlighted code blocks](https://www.11ty.dev/docs/plugins/syntaxhighlight/) from the output html back into this file, and added classes to indicate what and how to animate things.

### The Good

Copilot can suggest comments, lines, and even entire functions and classes.
The times that I have found it most useful are when it suggests the thing that I was going to type anyway.
I can accept the suggestion and keep going, without disrupting my [flow](https://en.wikipedia.org/wiki/Flow_(psychology)).
It saves me keystrokes, speeding up the process of dictating code from my brain to the screen.

Typically that has been boilerplate-type code, or repetitive things that I would normally have to copy-paste-modify.
It can even figure out fields and types from the context of the surrounding code, like when I was parsing the output of [`tokei`](https://github.com/XAMPPRocky/tokei) to count lines of code for some files:

<pre class="language-typescript"><code class="language-typescript"><span class="token comment">// (lots of context snipped)</span>

<span class="token keyword js-type hidden">interface</span><span class="js-type hidden"> </span><span class="token class-name js-type hidden">LocInfo</span><span class="js-type hidden"> </span><span class="token punctuation js-type hidden">{</span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-reject hidden">code: number;</span><span class="js-type hidden">l</span><span class="js-type copilot-suggest copilot-accept hidden">ines<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">code<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">comments<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">blanks<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
<span class="js-type hidden"></span><span class="token punctuation js-type copilot-suggest hidden">}</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

Super helpful. What would normally require more typing (even with tab completion), is now a series of tabs and enters.


### The Not As Good

Anything it suggests that is significantly different from "what I was planning to type" requires me to switch context from _creating_ code to _reviewing_ code, which totally derails my flow.
I have to reason about the suggestion, to decide if it does what I want, or has bugs, or is even correct.
Much like [copy-pasting from Stack Overflow](https://stackoverflow.blog/2021/03/31/the-key-copy-paste/), the code could be subtly wrong, or out-of-date, or slow, etc.

For example, the code suggestion that is _still_ featured on the main page of the Copilot site [has security issues](https://jakearchibald.com/2021/encoding-data-for-post-requests/).
I tried to reproduce that suggestion using the code snippet there, and it suggested...nothing.
When I changed `'fetch-h2'` to `'node-fetch'`, it suggested some slightly different code:

<pre class="language-typescript"><code class="language-typescript"><span class="token hashbang comment">#!/usr/bin/env ts-node</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> fetch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'node-fetch'</span><span class="token punctuation">;</span>

<span class="token comment js-type hidden">// Determine whether the sentiment of text is positive</span>
<span class="token comment js-type hidden">// Use a web service</span>
<span class="token keyword js-type hidden">async</span><span class="js-type hidden"> </span><span class="token keyword js-type hidden">function</span><span class="js-type hidden"> </span><span class="token function js-type hidden">isPositive</span><span class="token punctuation js-type hidden">(</span><span class="js-type hidden">text</span><span class="token operator js-type hidden">:</span><span class="js-type hidden"> </span><span class="token builtin js-type hidden">string</span><span class="token punctuation js-type hidden">)</span><span class="token operator js-type hidden">:</span><span class="js-type hidden"> </span><span class="token builtin js-type hidden">Promise</span><span class="token operator js-type hidden">&lt;</span><span class="token builtin js-type hidden">boolean</span><span class="token operator js-type hidden">></span><span class="js-type hidden"> </span><span class="token punctuation js-type hidden">{</span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">http://text-processing.com/api/sentiment/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">.</span>label <span class="token operator">===</span> <span class="token string">'pos'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

This code is just _wrong_. The [text-processing API uses POST](http://text-processing.com/docs/sentiment.html), not GET, so this doesn't work.

At this point, if Copilot is suggesting anything longer than a line, I don't bother trying to grok it.
It's too much of a disruption[^newer-dev].

[^newer-dev]: I can _almost_ see a case for generating whole functions and such for someone who is newer to software development (I've been doing this for some years now). They could write a comment to prompt Copilot about what they want to do, and it could generate code to do that. But the problem is that Copilot doesn't guarantee the generated code will work or even make sense (as I quote in the "Context" section above), so it might actually leave them more confused than when they started. That could be good debugging experience, but I would recommend that they look on Stack Overflow instead. When _that_ code doesn't work, they can yell at a person instead of a computer. Much more cathartic.


### Legal Concerns

Apparently, Copilot will emit whole chunks of [OSS code that is licensed under GPL, LGPL, etc](https://www.reversinglabs.com/blog/devs-dont-rely-on-github-copilot-legal-risk-is-real).
I found that it will suggest the contents of the GPLv3 if I start typing that, which would indicate that it is trained on GPL code:

<pre class="language-text"><code class="language-text"><span class="js-type hidden">GNU GENERAL PUBLIC LICENCSE</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Version 3, 29 June 2007</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Everyone is permitted to copy and distribute verbatim copies</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">of this license document, but changing it is not allowed.</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest hidden">Preamble</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

I am not a lawyer, and I don't pretend to know how things like [attribution and derivative works](https://twitter.com/eevee/status/1410037309848752128) apply to this.
If Copilot is synthesizing code based on multiple different projects, is attribution necessary? If so, how would that even work?
When I'm using Copilot, and I accept one of its suggestions, do I now have copyright of that code?
Am I liable for any copyright issues if that code is somehow infringing?

I don't want that potential liability, so I am only using it to more easily complete things I was going to type anyway.
I am not including big blocks of code with questionable provenance.


### Security Concerns

I would bet that there are many API keys and passwords and such contained in the code that Copilot is trained on.
But it does seem to have some safeguards there to avoid suggesting those:

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># key for AWS</span>
<span class="js-type hidden"><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span>"</span><span class="js-type copilot-suggest hidden">XXXXXXXX</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

I am happy to find that it does know the best password to suggest[^hunter2]:

[^hunter2]: I have been on the internet for too long: https://knowyourmeme.com/memes/hunter2

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># default user and password</span>
<span class="token assign-left variable js-type hidden">USER</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"user"</span>
<span class="token assign-left variable js-type hidden">PASS</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"h</span><span class="js-type copilot-suggest hidden">unter2"</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

You can play around with variations of `DIR=` and `PATH=` in bash, and Copilot will suggest some interesting paths.
I will leave that as an exercise for the reader.


### Context

From the FAQ section of the [Copilot site](https://github.com/features/copilot/):

> [Copilot] is designed to generate the best code possible given the context it has access to, but it doesn’t test the code it suggests so the code may not always work, or even make sense. GitHub Copilot can only hold a very limited context[^limited-context],...

[^limited-context]: Maybe due to token limitations of its GPT system? Guess it depends on which model of [Codex](https://platform.openai.com/docs/guides/code) it is using, although it looks like Codex is now deprecated?!

Like other AI systems, the more context that Copilot has, the more helpful its suggestions will be.
With limited context, it will show things from its [training data](https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets), or things that don't make sense.

For instance, an empty bash script. The suggested comment is probably something it has pulled from a lot of files:

<pre class="language-bash"><code class="language-bash"><span class="token shebang important js-type hidden">#!/usr/bin/env bash</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest hidden">This script is called by the systemd service</span></span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


With slightly more context, it still doesn't seem to recognize this as a shell script, and suggests markdown:

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># don't do anything</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest hidden"><span class="token builtin class-name">exit</span> <span class="token number">0</span>
&#96;&#96;&#96;
Then, make it executable:
&#96;&#96;&#96;</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


With more context, and a comment for prompting, it initially gives a reasonable (although slightly wrong[^comma-combine]) answer.
Then suggests more markdown right after that:

[^comma-combine]: The output will actually be `"one,two,three,four,five"`, because it is replacing all spaces in the generated string.

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment js-type hidden"># combine elements using commas</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>"</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">' '</span> <span class="token string">','</span></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">&#96;&#96;&#96;</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Output:
&#96;&#96;&#96;</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">$ ./new-script.sh</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">one,two,three four,five
&#96;&#96;&#96;</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


With a slightly different comment, it suggests correct code, and then suggests comments after to explain the code (no markdown this time):

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment js-type hidden"># combine array elements using commas</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span>,</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>&#42;<span class="token punctuation">]</span>}</span>"</span></span>
<span class="js-type hidden"></span><span class="token comment js-type copilot-suggest copilot-accept hidden"># one,two,three four,five</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">note that the third element has a space in it</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">but it's still treated as a single element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's quoted</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


I find it hard to know what context is necessary to get Copilot to do the thing I want sometimes, so I don't bother fussing with comments trying to [engineer the right prompt](https://hbr.org/2023/06/ai-prompt-engineering-isnt-the-future).


### Pair Programming?

The headline of the Copilot site is "Your AI pair programmer"[^marketing].
If you stand back far enough and squint, it might look something like that.
But Copilot suggesting code that you might want to use is not the same as pair programming.
It's not helping with the design of the code, or working through the problem with you, or pointing out issues[^copilot-gaps].
Copilot is generative, not analytical.
It does seem to "learn" as more context is added to the file, but when starting a new file or project it is also starting from scratch, with no context carried over from the previous session.

[^marketing]: Yes, of course it's marketing, but I want to be pendantic dang it!

[^copilot-gaps]: These seem to be gaps that [Copilot X](https://github.com/features/preview/copilot-x) is trying to solve? It has a chat interface where you can paste in code and get explanations, or find issues, maybe ask it how to design things. Would be interesting to try that out...

But like some developers I know, it can deliver a good burn:

<pre class="language-js"><code class="language-js"><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// parse options</span>
  <span class="token comment"><span class="js-type hidden">// (I should </span><span class="js-type copilot-suggest hidden">probably use commander or something, but I'm lazy)</span></span>
  <span class="token keyword">const</span> <span class="token literal-property property">cliOptions</span><span class="token operator">:</span> CliOptions <span class="token operator">=</span> <span class="token function">yargs</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">scriptName</span><span class="token punctuation">(</span><span class="token string">'some-script'</span><span class="token punctuation">)</span>
    <span class="token comment">// etc.</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


### Conclusion

The [GA announcement for Copilot](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/) positions it as a fundamental change to software development:

> Just like the rise of compilers and open source, we believe AI-assisted coding will fundamentally change the nature of software development, giving developers a new tool to write code easier and faster so they can be happier in their lives[^dev-happy].

[^dev-happy]: They should know that developers are never happy.

I don't see that as the case, at least not yet.

For me, it doesn't make sense to use it for anything more than completing single lines of code.
Big code blocks are too disruptive to my workflow, and are likely wrong, or non-sensical, or copyrighted.

I see Copilot as a better form of auto-complete, and that's how I will continue to use it.
It's helpful, but not a game-changer.
