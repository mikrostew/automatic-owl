---
title: Pairing with Copilot
description: Flying the friendly skies with my AI sidekick
layout: script
scriptName: copilot.js
extraCSS:
 - code-blocks

---

I recently got access to use [GitHub Copilot](https://github.com/features/copilot/), which has been [GA since June 2022](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/)[^copilot-x].
I have been playing around with it for the last ~month, and feel somewhat conflicted about it at this point.

[^copilot-x]: And Copilot X [was recently announced](https://github.com/features/preview/copilot-x), so I'm working with previous gen.

{% note %}
I captured some screen recordings when trying out Copilot, but didn't want to include multi-megabyte videos or gifs here. It was more fun to animate them using JS (similar to the animations on the Copilot site).
{% endnote %}


### The Good

Copilot can suggest comments, lines, and even whole functions.
The times that it feels most useful to me — and doesn't interrupt my flow — is when it suggests the thing that I was going to type anyway.
So I don't have to think much about it, I can accept the suggestion and keep going.
It's saving me keystrokes, making the process of dictating code from my brain to the screen a bit faster.

Typically that could be boilerplate-type code, or repetitive things that I would normally have to copy-paste-modify.
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

Anything it suggests that is not "what I was planning to type" requires me to switch context from _creating_ code to _reviewing_ code, which totally derails my flow.
I have to reason about what it is suggesting, to decide if it does what I want, or has bugs, or is even correct.
Much like copy-pasting from stack overflow, the code could be subtly wrong, or out-of-date, etc.

For example, the code suggestion that is _still_ featured on the main page of the Copilot site [has security issues](https://jakearchibald.com/2021/encoding-data-for-post-requests/).
I tried to reproduce that suggestion using the code snippet there, and it suggested...nothing.
But when I changed `'fetch-h2'` to `'node-fetch'`, it suggested some slightly different code:

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

But this code is just _wrong_. The [text-processing API uses POST](http://text-processing.com/docs/sentiment.html), not GET, so this doesn't work.

At this point, if Copilot is suggesting anything longer than a line, I don't bother trying to grok it.
It's too much of a disruption.


### The Bad: Legal Concerns

Apparently, Copilot will emit whole chunks of [OSS code that is licensed under GPL, LGPL, etc](https://www.reversinglabs.com/blog/devs-dont-rely-on-github-copilot-legal-risk-is-real).
I am not a lawyer, and I don't pretend to know how things like [attribution and derivative works](https://twitter.com/eevee/status/1410037309848752128) apply to this.
If Copilot is synthesizing code based on multiple different projects, is attribution necessary? And if so, how would that even work?

I found that it will suggest the contents of the GPLv3 if I start typing that, leading me to believe that it is definitely trained on GPL code (which specifically covers derivative works):

<pre class="language-text"><code class="language-text"><span class="js-type hidden">GNU GENERAL PUBLIC LICENCSE</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Version 3, 29 June 2007</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Everyone is permitted to copy and distribute verbatim copies</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">of this license document, but changing it is not allowed.</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest hidden">Preamble</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>

When I'm using Copilot, and I accept one of its suggestions, do I now have copyright of that code?
Am I liable for any copyright issues if that code is somehow infringing?

I don't want that potential liability, so I have disabled Copilot for my OSS work.


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

You can play around with some variations of `DIR=` and `PATH=` in bash, and it will show paths from its training data.
I will leave that as an exercise for the reader.


### Common AI Pitfalls

==TODO: It needs context, else it will spit out training data==

Fancy pattern matching, but missing context and intent
 - Markdown in my bash scripts
 - Also, things that don't work, like array join with comma

For an empty script, this is probably what copilot has pulled from the most

(example of why this doesn't really _know_ what you're trying to do)

<pre class="language-bash"><code class="language-bash"><span class="token shebang important js-type hidden">#!/usr/bin/env bash</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest hidden">This script is called by the systemd service</span></span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


More markdown nonsense in a bash script

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># don't do anything</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">exit</span> <span class="token number">0</span>
&#96;&#96;&#96;
Then, make it executable:
&#96;&#96;&#96;</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token function">chmod</span> +x new-script.sh
&#96;&#96;&#96;
Then, add it to your crontab:
&#96;&#96;&#96;</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token function">crontab</span> -e
&#96;&#96;&#96;</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>


The suggestion isn't quite right, and then you're giving me markdown?

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


If I change the comment slightly, then it gives me some correct code (and starts adding comments after to explain it, instead of markdown)

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment js-type hidden"># combine array elements using commas</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span>,</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>"</span></span>
<span class="js-type hidden"></span><span class="token comment js-type copilot-suggest copilot-accept hidden"># one,two,three four,five</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">note that the third element has a space in it</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">but it's still treated as a single element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's quoted</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>




### Funny Things

Funny things
 - comments


I don't need your judgement, Copilot

<pre class="language-js"><code class="language-js"><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// parse options</span>
  <span class="token comment"><span class="js-type hidden">// (I should </span><span class="js-type copilot-suggest hidden">probably use commander or something, but I'm lazy)</span></span>
  <span class="token keyword">const</span> <span class="token literal-property property">cliOptions</span><span class="token operator">:</span> CliOptions <span class="token operator">=</span> <span class="token function">yargs</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">scriptName</span><span class="token punctuation">(</span><span class="token string">'some-script'</span><span class="token punctuation">)</span>
    <span class="token comment">// etc.</span>
<button class="replay hidden">&#8635; Replay</button></code></pre>




TODO (from the GA announcement)

> we believe AI-assisted coding will fundamentally change the nature of software development, giving developers a new tool to write code easier and faster so they can be happier in their lives[^dev-happy].

[^dev-happy]: Not sure what they're on about here, developers are never happy.


TODO: code is fungible?

TODO: why do I code?



Like pair programming?
 - When pairing, the other person often points out issues with your code, copilot is only generative, not analytical
 - partner can introduce bugs, but can also be mentored, and the feedback loop is tight
 - copilot can improve, over time, on a much longer feedback loop, but until then keeps doing same things, same mistakes


Security concerns (API key, dir, password, etc)
 - seems like it has some logic to not do dumb stuff there
 - (Not for paths tho)



My coding "voice", or style
 - More than one way to do things
 - I've done hundreds of interviews, and no one has solved the same problem the same way
 - By the time I have designed how things will work, I know what the code is going to be, but copilot doesn't. It wants to be helpful, but just gets in the way


Conclusion
 - Stack overflow in your editor
 - "prompt engineering" - giving it a "better" prompt to get a better answer (as if to make it "understand" more clearly), vs. a more specific prompt so it can better pattern match against its training data?
     - (see the comma combine 1 & 2 movs)
 - Copilot doesn't know how to say "I don't know" - it will always give you something, even if it doesn't make sense
     - People do this too







