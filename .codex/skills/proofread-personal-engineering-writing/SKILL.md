---
name: proofread-personal-engineering-writing
description: Proofread, edit, or lightly restructure Swashata Ghosh's personal engineering writing while preserving his practical, reflective voice. Use for articles, blog posts, MDX drafts, changelog-style updates, social posts, rough notes, and personal essays about engineering, product, SaaS, WordPress, Freemius, AI systems, developer experience, or leadership.
---

# Proofread Personal Engineering Writing

## Purpose

Polish the writing without turning it into generic thought leadership. Preserve the author's direct, practical, reflective voice while making the piece clearer, tighter, and easier to read.

The goal is not to make the writing sound more impressive. The goal is to help the author's real point land with less friction.

## Writing Philosophy

Treat the piece as lived engineering and product reflection, not advice from a consultant.

Focus on:

- The problem being observed.
- Why the problem matters.
- What changed in the author's thinking.
- The likely outcome of a better solution.
- The trade-offs, context, and constraints behind the decision.

Prefer writing that invites discussion. Do not turn context-dependent experience into universal rules.

## Voice and Tone

Keep the tone:

- Practical.
- Experienced.
- Thoughtful.
- Direct.
- Calm.
- Personal but not overly emotional.
- Clear without sounding over-produced.

Allow light informality when it belongs. Do not remove all personality in the name of polish.

The final text should feel like a senior engineering leader reflecting from real work, not someone trying to impress an audience.

## Editing Priorities

Apply edits in this order:

1. Fix grammar, spelling, punctuation, and awkward phrasing.
2. Improve sentence flow and readability.
3. Remove repetition and unnecessary filler.
4. Clarify vague statements while preserving the original meaning.
5. Strengthen the core insight only when it is already present in the draft.
6. Preserve the author's point of view and level of certainty.
7. Keep terminology accurate for engineering, product, SaaS, WordPress, Freemius, AI systems, developer experience, and leadership contexts.

Do not over-edit. Prefer the smallest change that makes the sentence better.

## Preserve

Preserve:

- The author's intent and meaning.
- The author's first-person perspective.
- Domain-specific terminology.
- Product and engineering nuance.
- Honest uncertainty.
- The distinction between observation, opinion, and conclusion.
- Examples grounded in real work.
- Markdown structure unless there is a clear readability issue.

Keep phrases like "I think", "in my experience", "often", "probably", and "usually" when they reflect honest nuance. Do not convert careful thinking into absolute claims.

## Avoid

Avoid:

- Turning the article into a tutorial unless the draft is already written that way.
- Adding generic motivational language.
- Adding buzzwords such as "unlock", "leverage", "game-changer", "synergy", "paradigm", or "10x" unless they are intentional in the original.
- Making claims stronger than the draft supports.
- Adding frameworks, lists, or lessons the author did not imply.
- Making the tone salesy, preachy, or overly polished.
- Replacing practical wording with abstract corporate phrasing.
- Removing the author's natural rhythm completely.
- Adding emojis unless already present and appropriate.

## Preferred Patterns

Prefer simple, direct sentences.

Good:

> I used to think the hard part was writing the code. Over time, I realized the harder part is knowing which code should exist at all.

Avoid:

> The true hallmark of engineering maturity is the strategic optimization of implementation scope.

Good:

> This is not a process I would blindly recommend. It worked for our context because the problem was already visible in production.

Avoid:

> Every engineering team should adopt this approach to maximize productivity.

Good:

> The interesting part was not the solution itself. It was understanding why the previous solution kept creating the same problem.

Avoid:

> The solution was simple, obvious, and something every senior engineer should know.

## Changelog and Product Updates

For changelog-style writing, keep it clear and maker-focused.

Use a tone that is informative, concise, product-aware, helpful to users and makers, and not overly promotional.

Focus on:

1. What changed.
2. Why it was needed.
3. What the user can do now or what improves for them.

Avoid inflated release language. Do not make small fixes sound like major launches.

Preferred:

> We fixed a regression where team members with the Developer role could not manage webhooks. This is now restored, so teams can continue managing webhook configuration without requiring owner-level access.

Avoid:

> We are thrilled to announce a powerful new improvement that revolutionizes webhook management for development teams.

## Personal Blog Checks

For personal engineering articles, check whether the piece answers some of these questions:

- What problem did I notice?
- Why did it matter?
- What did I learn from it?
- What changed in how I think or work?
- What outcome was I trying to create?
- Where might this not apply?

Do not force all of these into the article. Use them only as clarity checks.

## Social Post Proofreading

When proofreading short posts, keep them compact and conversational.

Prefer:

- One clear idea.
- A strong opening observation.
- Short paragraphs.
- No unnecessary hashtags.
- No engagement bait.
- No fake certainty.

Avoid endings like:

- "Agree?"
- "Thoughts?"
- "What's your take?"
- "Let me know in the comments."

If a discussion-oriented ending is useful, make it natural:

> I am still thinking about where the line is between useful flexibility and unnecessary abstraction.

## Markdown Handling

When the input is Markdown:

- Preserve headings, links, code blocks, lists, and inline code.
- Do not alter code unless explicitly asked.
- Do not reformat code blocks unless the formatting is broken.
- Keep technical identifiers exactly as written unless there is an obvious typo.
- Keep valid GitHub-flavored Markdown when the destination is GitHub or MDX.
- Use `~~~` for outer Markdown fences when nested code fences require it.

## Output

Unless the user asks for a different format, return:

1. The edited version.
2. A short list of notable changes, only if useful.

For simple proofreading requests, do not explain every edit.

If the user asks for only corrected text, return only corrected text.

If the user provides Markdown and asks for Markdown output, return the edited article inside a Markdown code fence.

If the user asks for a stricter review, include:

- Edited version.
- What changed.
- Any remaining concerns.
- Optional stronger title or opening suggestion.

## Ambiguity

Do not ask clarifying questions for normal proofreading. Make a best-effort edit using visible context.

Ask only when:

- The intended audience is impossible to infer and would materially change the edit.
- The text appears to contain a factual claim that may be wrong or outdated.
- The user explicitly asks for a strategic rewrite rather than proofreading.

When uncertain, preserve the author's meaning instead of inventing a stronger one.

## Final Check

Before returning the edited text, verify that:

- The meaning did not drift.
- The tone still sounds like the author.
- The piece does not sound like generic LinkedIn advice.
- The text is clearer and tighter than the input.
- The article invites thought or discussion rather than prescribing a universal process.
- Product or engineering claims remain precise.
