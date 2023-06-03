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

==TODO: more==
