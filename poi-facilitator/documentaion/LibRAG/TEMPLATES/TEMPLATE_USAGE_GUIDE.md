# Template Usage Guide

## Overview

This guide explains how to use the Points of You AI Studio content creation templates effectively. Whether you're creating AI training resources, card content, training programs, or case studies, this guide will help you navigate the template structure and create high-quality content.

**Version**: 1.0  
**Last Updated**: October 16, 2025  
**Target Audience**: Content creators, trainers, facilitators

---

## Table of Contents

1. [Before You Begin](#before-you-begin)
2. [Understanding Template Structure](#understanding-template-structure)
3. [Using Guided Input Fields](#using-guided-input-fields)
4. [Character Limits and Validation](#character-limits-and-validation)
5. [Best Practice Examples](#best-practice-examples)
6. [Cultural Sensitivity](#cultural-sensitivity)
7. [Translation Preparation](#translation-preparation)
8. [Validation and Submission](#validation-and-submission)
9. [Common Questions](#common-questions)
10. [Tips for Success](#tips-for-success)

---

## Before You Begin

### Step 1: Choose the Right Template

1. **Identify your content type**: What are you creating?
   - AI training material → `ai-training/` folder
   - Card content → `cards/` or `game-systems/` folder
   - Training program → `training/` folder
   - Trainer resource → `trainer-development/` folder

2. **Check prerequisites**:
   - Do you have required certification?
   - Do you have necessary background materials?
   - Do you understand the content type purpose?

3. **Review examples**:
   - Look in the `/examples` subfolder
   - Study completed examples before starting
   - Note the quality and detail level expected

### Step 2: Gather Your Materials

Before opening the template, gather:
- **Research materials**: Books, articles, existing content
- **Visual assets**: Images, cards, diagrams (if applicable)
- **Reference content**: Similar examples, related building blocks
- **Time commitment**: Check estimated completion time in template

### Step 3: Review Quality Standards

Read [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md) to understand:
- Quality criteria for your content type
- Common mistakes to avoid
- Cultural sensitivity requirements
- Translation readiness expectations

---

## Understanding Template Structure

Every template follows the same 7-part structure:

### 1. Header Metadata Block

```markdown
---
template_version: 1.0
content_type: reflection_prompt
last_updated: 2025-10-16
estimated_time: 45 minutes
difficulty_level: intermediate
requires_certification: no
---
```

**Purpose**: Provides quick reference information  
**Action**: Review but don't edit (except last_updated when revising)

### 2. Quick Start Section

```markdown
# Quick Start

## What You're Creating
A 5-reflection prompt set for a Points of You photo card...

## Who This Is For
- AI systems generating card reflections
- Facilitators preparing card prompts
...
```

**Purpose**: Orient you to the content you're creating  
**Action**: Read carefully to ensure you're in the right template

### 3. Prerequisites Section

Lists required knowledge, materials, or certifications.

**Action**: Confirm you meet all prerequisites before continuing

### 4. Guided Input Fields

The main content creation area. See [Using Guided Input Fields](#using-guided-input-fields) below.

### 5. Validation Checklist

Pre-submission quality checks.

**Action**: Complete after finishing all input fields

### 6. Translation Readiness

Preparation for multilingual deployment.

**Action**: Complete to help translators and ensure quality

### 7. Integration Preview

Shows how your content appears in the system.

**Action**: Review to understand impact and connections

---

## Using Guided Input Fields

Each input field follows this structure:

### Field Anatomy

```markdown
## Reflection Theme #1 *REQUIRED* | Max 100 characters

**What this is**: The first thematic reflection connecting the visual element to personal insight.

**Guidelines**:
- Start with a descriptive theme name (e.g., "Balance and Stability")
- Identify a specific visual element in the image
- Connect element to universal human experience
- End with an open-ended personal question
- Character limit: 0/100

**Best Practices**:
✅ DO: "The bicycle leaning against the tree symbolizes finding support..."
❌ DON'T: "You should find someone to lean on because..."

**Example**:
**Balance and Stability**: The bicycle leaning against the tree can symbolize the support systems in our lives. Reflect on the relationships and structures that provide you stability. Who or what do you lean on when life feels unbalanced?

**Your Input**:
[Type your reflection theme here...]
```

### How to Complete

1. **Read "What this is"**: Understand the field's purpose

2. **Review Guidelines**: Follow all listed requirements
   - Note character limits
   - Check required vs optional status
   - Understand validation rules

3. **Study Best Practices**: Learn from examples
   - ✅ DO examples show correct approach
   - ❌ DON'T examples show common mistakes

4. **Review Full Example**: See a complete,high-quality version

5. **Write Your Content**: In the "Your Input" section
   - Start drafting
   - Check character count as you write
   - Refer back to guidelines as needed

6. **Self-Validate**: Before moving to next field
   - Meets character limit?
   - Follows guidelines?
   - Matches quality of example?

### Field Types

#### Text Fields (Short)
- **Purpose**: Names, titles, brief descriptions
- **Length**: 5-200 characters typically
- **Tips**: Be concise, descriptive, clear

#### Text Fields (Long)
- **Purpose**: Stories, detailed explanations, narratives
- **Length**: 200-2000 characters typically
- **Tips**: Break into paragraphs, use clear structure

#### List Fields
- **Purpose**: Multiple related items (questions, quotes, steps)
- **Format**: Bullet points or numbered list
- **Tips**: Keep items parallel in structure

#### Selection Fields
- **Purpose**: Choose from predefined options
- **Format**: Listed options with descriptions
- **Tips**: Read all options before choosing

#### Multi-Part Fields
- **Purpose**: Complex content requiring multiple components
- **Format**: Sub-sections with individual requirements
- **Tips**: Complete all parts, maintain consistency

---

## Character Limits and Validation

### Why Character Limits Matter

1. **Database constraints**: System has field size limits
2. **Translation expansion**: Other languages need 15-30% more space
3. **UI display**: Content must fit in interface layouts
4. **Readability**: Concise content is more effective

### How to Track Character Limits

Each field shows: `Character limit: 0/100`

**As you type**, mentally track your count:
- Short phrase: ~20-50 characters
- Single sentence: ~50-150 characters
- Paragraph: ~150-500 characters
- Multi-paragraph: ~500-2000 characters

### What to Do When Over Limit

1. **Review for redundancy**: Can you say it more concisely?
2. **Cut filler words**: Remove "very", "really", "actually", etc.
3. **Simplify structure**: Use simpler sentence construction
4. **Prioritize key points**: Keep most important information
5. **Split if possible**: Some fields allow multiple entries

### Validation Rules

Templates include inline validation. Common rules:

- **Required field empty**: Must be completed
- **Character limit exceeded**: Must be reduced
- **Invalid format**: Must match specified pattern
- **Missing prerequisite**: Must complete related field first
- **Quality threshold**: Must meet minimum standard

---

## Best Practice Examples

### Understanding ✅ DO Examples

These show high-quality, correct implementations:

```markdown
✅ DO: "What dreams have I given up on and why? How might I reconnect with them?"
```

**Why this works**:
- Open-ended (no yes/no answer)
- Personal and reflective
- Non-judgmental language
- Invites deep exploration
- Culturally universal

### Understanding ❌ DON'T Examples

These show common mistakes to avoid:

```markdown
❌ DON'T: "Did you give up on your dreams? You should pursue them now."
```

**Why this doesn't work**:
- Closed-ended (yes/no)
- Prescriptive (tells what to do)
- Judgmental tone
- Assumes user hasn't acted
- Potentially culturally insensitive

### Learning from Examples

1. **Compare side-by-side**: See the difference
2. **Identify patterns**: What makes good examples work?
3. **Apply to your content**: Use same principles
4. **Check your work**: Does it match good examples?

---

## Cultural Sensitivity

### Why Cultural Sensitivity Matters

Content will be used globally across diverse cultures. What works in one culture may not work in another.

### Cultural Sensitivity Checklist

When creating content, ask:

#### Language
- [ ] Avoids idioms and colloquialisms?
- [ ] Uses inclusive pronouns (they/them when possible)?
- [ ] Avoids assumptions about family structure?
- [ ] Respects various religious/spiritual perspectives?

#### Examples
- [ ] Uses diverse, universal examples?
- [ ] Avoids culture-specific references?
- [ ] Represents various backgrounds?
- [ ] Doesn't assume Western context?

#### Concepts
- [ ] Themes are universally relatable?
- [ ] Emotions acknowledge cultural expression differences?
- [ ] Success/failure definitions are flexible?
- [ ] Relationships respect various cultural norms?

### Cultural Adaptation Notes

Most templates include a section for cultural adaptation notes:

```markdown
**Cultural Adaptation Notes**:
- This reflection assumes individual autonomy; may need adaptation for collectivist cultures
- "Work-life balance" concept varies significantly across cultures
- Consider alternative framings for cultures with different family structures
```

**How to complete**:
1. Identify culturally-specific elements in your content
2. Note how these might need adaptation
3. Suggest alternative framings where possible
4. Flag for translator/cultural consultant review

---

## Translation Preparation

### Translatable vs Non-Translatable Content

#### Translatable (Needs translation):
- Descriptive text
- Instructions and explanations
- Questions and prompts
- Stories and narratives
- Examples and illustrations

#### Non-Translatable (Stays in English):
- IDs and codes
- Technical field names
- File paths and URLs
- Version numbers
- System variables

### Translation Readiness Section

```markdown
## Translation Readiness

**Translatable Content**:
- Theme names (5 items)
- Reflection questions (5 items)
- Story narrative (1 item)
- Best practice examples (8 items)

**Non-Translatable Content**:
- Template ID
- Version number
- Character limits

**Cultural Adaptation Notes**:
[Your notes from above]

**Character Expansion Factors**:
- Spanish: +20% (allow 120 characters for 100-character field)
- German: +30% (allow 130 characters)
- French: +15% (allow 115 characters)
- Hebrew: +10% (allow 110 characters + RTL considerations)
```

**How to complete**:
1. List all content requiring translation
2. Confirm non-translatable elements
3. Include cultural adaptation notes from above
4. Verify character limits accommodate expansion

---

## Validation and Submission

### Step 1: Complete the Validation Checklist

Every template includes a validation checklist:

```markdown
### Validation Checklist

- [ ] All *REQUIRED* fields are completed
- [ ] Character limits are respected for all fields
- [ ] Content aligns with Points of You methodology
- [ ] Questions are open-ended and non-judgmental
- [ ] Examples are culturally sensitive and inclusive
- [ ] Language is clear, concise, and professional
- [ ] Translation readiness section is completed
- [ ] Integration points are identified
- [ ] Quality matches or exceeds provided examples
- [ ] Content has been proofread for errors
```

**Action**: Check each box only when truly complete

### Step 2: Peer Review (Recommended)

Before submission:
1. **Share with colleague**: Get fresh eyes on content
2. **Test with target audience**: If possible, test usability
3. **Check against examples**: Does your quality match?
4. **Review methodology alignment**: Consistent with POY values?

### Step 3: Submission Process

1. **Save your completed template**: Keep original format
2. **Name file appropriately**: Follow naming conventions
3. **Include metadata**: Ensure header block is complete
4. **Submit through designated channel**: Follow your organization's process
5. **Note any questions**: Flag areas needing reviewer attention

### Step 4: Revision Process

If content is returned for revision:
1. **Review feedback carefully**: Understand all comments
2. **Address all points**: Don't skip any feedback items
3. **Re-validate**: Complete checklist again
4. **Track changes**: Note what was revised
5. **Resubmit**: Follow same submission process

---

## Common Questions

### Q: How long should it take to complete a template?

**A**: Check the `estimated_time` in the header metadata. Times range from:
- Simple cards: 15-30 minutes
- Reflection prompts: 30-60 minutes
- Training programs: 2-4 hours
- Case studies: 4-8 hours

First-time use may take 1.5-2x longer as you learn the process.

### Q: What if I don't understand a field?

**A**: 
1. Re-read the "What this is" explanation
2. Review the full example provided
3. Check completed examples in `/examples` folder
4. Consult the [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md)
5. Contact content-support@pointsofyou.com

### Q: Can I skip optional fields?

**A**: Yes, but consider:
- Optional fields enhance content quality
- They provide context for translators
- They help with system integration
- Complete = higher quality rating

Only skip if truly not applicable.

### Q: What if my content doesn't fit the character limit?

**A**: See [Character Limits and Validation](#character-limits-and-validation) above. If you've tried all editing strategies and still can't fit:
1. Note this in submission
2. Explain why more space is needed
3. Provide edited version at limit
4. Provide full version for review

Reviewers may approve exceptions or suggest restructuring.

### Q: How do I know if my content is culturally sensitive?

**A**: Use the [Cultural Sensitivity Checklist](#cultural-sensitivity-checklist). If uncertain:
1. Ask colleagues from different backgrounds
2. Note concern in Cultural Adaptation section
3. Flag for cultural consultant review
4. Err on side of caution (more universal vs specific)

### Q: Can I reuse content from other sources?

**A**: Only if:
- You have explicit permission
- Content is public domain
- You cite the source appropriately
- It aligns with POY methodology
- You adapt it to template requirements

Never plagiarize. Original content is always best.

### Q: What happens after I submit?

**A**:
1. **Review** (2-5 days): Content expert reviews submission
2. **Feedback** (if needed): Revision requests sent to you
3. **Revision** (your timeline): Make requested changes
4. **Approval**: Content approved for translation/deployment
5. **Translation** (2-4 weeks): Translated to 5 languages
6. **Deployment**: Integrated into platform

---

## Tips for Success

### Before Starting

1. **Block sufficient time**: Don't rush, allocate estimated time
2. **Minimize distractions**: Focus environment aids quality
3. **Review examples first**: Learn from high-quality models
4. **Gather materials**: Have everything you need accessible

### During Creation

5. **Follow template sequence**: Complete fields in order
6. **Save frequently**: Don't lose your work
7. **Take breaks**: Fresh eyes catch more errors
8. **Check examples often**: Ensure quality consistency
9. **Ask questions early**: Don't struggle in silence

### After Completing

10. **Walk away briefly**: Return with fresh perspective
11. **Read aloud**: Catch awkward phrasing
12. **Check completeness**: All required fields done?
13. **Validate thoroughly**: Don't skip checklist items
14. **Get peer feedback**: Second opinion valuable

### Quality Mindset

15. **Examples are minimums**: Aim higher than examples
16. **Cultural sensitivity always**: Consider global audience
17. **Clarity over cleverness**: Clear and simple beats fancy
18. **User-focused**: Will this help the end user?
19. **Methodology-aligned**: Does this serve POY values?

### Professional Standards

20. **Proofread carefully**: Typos undermine credibility
21. **Cite sources**: Give credit where due
22. **Meet deadlines**: Respect reviewer time
23. **Accept feedback gracefully**: Revisions improve quality
24. **Ask for help**: Collaboration creates better content

---

## Next Steps

Now that you understand how to use the templates:

1. **Choose your template**: Based on content type you're creating
2. **Review the example**: In the `/examples` subfolder
3. **Read the VALIDATION_GUIDE**: Understand quality standards
4. **Start creating**: Follow the guided process
5. **Submit confidently**: You're well-prepared!

---

## Support

**Questions about templates?**  
Email: content-support@pointsofyou.com

**Technical issues?**  
Email: tech-support@pointsofyou.com

**Methodology questions?**  
Consult your certification training materials or mentor

---

**Remember**: Templates are designed to guide you to success. Trust the process, follow the guidance, and create content you're proud of!

**Happy Creating! 🎨**

