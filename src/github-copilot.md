---
title: Github Copilot (TODO)
description: Trying it out, seeing how that goes (TODO)
layout: script
scriptName: copilot.js
extraCSS:
 - code-blocks

---



{% note %}
I captured some screen recordings when trying out Copilot, but didn't want to include multi-megabyte videos or gifs here. It was more fun to animate them using JS (similar to the animations on the Copilot site).
{% endnote %}
I don't need your judgement, Copilot

<pre class="language-js"><code class="language-js"><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// parse options</span>
  <span class="token comment"><span class="js-type hidden">// (I should </span><span class="js-type copilot-suggest hidden">probably use commander or something, but I'm lazy)</span></span>
  <span class="token keyword">const</span> <span class="token literal-property property">cliOptions</span><span class="token operator">:</span> CliOptions <span class="token operator">=</span> <span class="token function">yargs</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">scriptName</span><span class="token punctuation">(</span><span class="token string">'some-script'</span><span class="token punctuation">)</span>
    <span class="token comment">// etc.</span>
<button class="hidden">&#8635; Replay</button></code></pre>


Copilot does know the best password to suggest

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># default user and password</span>
<span class="token assign-left variable js-type hidden">USER</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"user"</span>
<span class="token assign-left variable js-type hidden">PASS</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"h</span><span class="js-type copilot-suggest hidden">unter2"</span>
<button class="hidden">&#8635; Replay</button></code></pre>


The suggestion isn't quite right, and then you're giving me markdown?

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment js-type hidden"># combine elements using commas</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>"</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">' '</span> <span class="token string">','</span></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">```</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Output:
```</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">$ ./new-script.sh</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">one,two,three four,five
```</span>
<button class="hidden">&#8635; Replay</button></code></pre>


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
<button class="hidden">&#8635; Replay</button></code></pre>


But, if I keep going with that comment, it will keep going and start to repeat

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment"># combine array elements using commas</span>
<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span>,
<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>"</span>
<span class="js-type hidden"></span><span class="token comment js-type copilot-suggest copilot-accept hidden"># one,two,three four,five</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">note that the third element has a space in it</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">but it's still treated as a single element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the space is not treated as a delimiter</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because IFS is set to comma</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not treated as a delimiter</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not part of the element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not treated as a delimiter</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because IFS is set to comma</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not part of the element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not treated as a delimiter</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because IFS is set to comma</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not part of the element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's not quoted</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">and the comma is not treated as a delimiter</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because IFS is set to comma</span>
<button class="hidden">&#8635; Replay</button></code></pre>


More markdown nonsense in a bash script

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># don't do anything</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">exit</span> <span class="token number">0</span>
```
Then, make it executable:
```</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token function">chmod</span> +x new-script.sh
```
Then, add it to your crontab:
```</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token function">crontab</span> -e
```</span>
<button class="hidden">&#8635; Replay</button></code></pre>


For an empty script, this is probably what copilot has pulled from the most

(example of why this doesn't really _know_ what you're trying to do)

<pre class="language-bash"><code class="language-bash"><span class="token shebang important js-type hidden">#!/usr/bin/env bash</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest hidden">This script is called by the systemd service</span></span>
<button class="hidden">&#8635; Replay</button></code></pre>


Seems like it has some guards around providing secrets from its training data

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># key for AWS</span>
<span class="js-type hidden"><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span>"</span><span class="js-type copilot-suggest hidden">XXXXXXXX</span>
<button class="hidden">&#8635; Replay</button></code></pre>


Also, it will provide the contents of the GPLv3 if I start typing that, so I'm not sure about the legality of what this is doing...

<pre class="language-text"><code class="language-text"><span class="js-type hidden">GNU GENERAL PUBLIC LICENCSE</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Version 3, 29 June 2007</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Everyone is permitted to copy and distribute verbatim copies</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">of this license document, but changing it is not allowed.</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest hidden">Preamble</span>
<button class="hidden">&#8635; Replay</button></code></pre>


The occasions where I find it most helpful are when it suggests the thing that I was already planning to type.

So I don't have to think about what it is suggesting, to decide if it is what I want, or if it makes sense, etc. I can just accept the suggestion and keep going. It's not introducing anything novel or complicated, it's just saving me keystrokes, making my work go faster.

Like in this instance where I was collecting the output of [`tokei`](https://github.com/XAMPPRocky/tokei) to count lines of code for some files:

<pre class="language-typescript"><code class="language-typescript"><span class="token comment">// (rest of the code snipped)</span>

<span class="token keyword js-type hidden">interface</span><span class="js-type hidden"> </span><span class="token class-name js-type hidden">LocInfo</span><span class="js-type hidden"> </span><span class="token punctuation js-type hidden">{</span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-reject hidden">code: number;</span><span class="js-type hidden">l</span><span class="js-type copilot-suggest copilot-accept hidden">ines<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">code<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">comments<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
  <span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">blanks<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
<span class="js-type hidden"></span><span class="token punctuation js-type copilot-suggest hidden">}</span>
<button class="hidden">&#8635; Replay</button></code></pre>


Also, when my internet is down (like today), it doesn't work
