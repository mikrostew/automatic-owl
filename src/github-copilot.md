---
title: Github Copilot (TODO)
description: Trying it out, seeing how that goes (TODO)
layout: script
scriptName: copilot.js

---

I did some screen captures of things I found interesting when trying out GH Copilot (https://github.com/features/copilot), and instead of including multi-megabyte videos or gifs here, I decided to animate them, like the animations on the copilot site.


I don't need your judgement, Copilot

<pre class="language-js"><code class="language-js"><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// parse options</span>
  <span class="token comment"><span class="js-type hidden">// (I should </span><span class="js-type copilot-suggest hidden">probably use commander or something, but I'm lazy)</span></span>
  <span class="token keyword">const</span> <span class="token literal-property property">cliOptions</span><span class="token operator">:</span> CliOptions <span class="token operator">=</span> <span class="token function">yargs</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">scriptName</span><span class="token punctuation">(</span><span class="token string">'some-script'</span><span class="token punctuation">)</span>
    <span class="token comment">// etc.</span></code></pre>


Copilot does know the best password to suggest

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># default user and password</span>
<span class="token assign-left variable js-type hidden">USER</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"user"</span>
<span class="token assign-left variable js-type hidden">PASS</span><span class="token operator js-type hidden">=</span><span class="token string js-type hidden">"h</span><span class="js-type copilot-suggest hidden">unter2"</span></code></pre>


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
```</span></code></pre>


If I change the comment slightly, then it gives me some correct code (and starts adding comments after to explain it, instead of markdown)

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">some_things</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token string">"one"</span> <span class="token string">"two"</span> <span class="token string">"three four"</span> <span class="token string">"five"</span> <span class="token punctuation">)</span>

<span class="token comment js-type hidden"># combine array elements using commas</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span>,</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden"><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${some_things<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>"</span></span>
<span class="js-type hidden"></span><span class="token comment js-type copilot-suggest copilot-accept hidden"># one,two,three four,five</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">note that the third element has a space in it</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">but it's still treated as a single element</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because it's quoted</span></code></pre>


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
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest copilot-accept hidden">because IFS is set to comma</span></code></pre>


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
```</span></code></pre>


For an empty script, this is probably what copilot has pulled from the most

(example of why this doesn't really _know_ what you're trying to do)

<pre class="language-bash"><code class="language-bash"><span class="token shebang important js-type hidden">#!/usr/bin/env bash</span>
<span class="token comment"><span class="js-type hidden"># </span><span class="js-type copilot-suggest hidden">This script is called by the systemd service</span></span></code></pre>


Seems like it has some guards around providing secrets from its training data

<pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment js-type hidden"># key for AWS</span>
<span class="js-type hidden"><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span>"</span><span class="js-type copilot-suggest hidden">XXXXXXXX</span></code></pre>


Also, it will provide the contents of the GPLv3 if I start typing that, so I'm not sure about the legality of what this is doing...

<pre class="language-text"><code class="language-text"><span class="js-type hidden">GNU GENERAL PUBLIC LICENCSE</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Version 3, 29 June 2007</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">Everyone is permitted to copy and distribute verbatim copies</span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest copilot-accept hidden">of this license document, but changing it is not allowed.</span>
<span class="js-type hidden"></span>
<span class="js-type hidden"></span><span class="js-type copilot-suggest hidden">Preamble</span></code></pre>


Also, when my internet is down (like today), it doesn't work
