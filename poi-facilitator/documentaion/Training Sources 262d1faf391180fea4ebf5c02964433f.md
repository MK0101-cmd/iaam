# Training Sources

Owner: Miron Krokhmal

# Emotional sensing (text)

- **GoEmotions** — 58k Reddit comments, 27 fine-grained emotions. Good for valence/arousal proxies and multi-label training. (License/hosting varies by mirror; see paper & TFDS entry.) [arXiv](https://arxiv.org/abs/2005.00547?utm_source=chatgpt.com)[ACL Anthology](https://aclanthology.org/2020.acl-main.372/?utm_source=chatgpt.com)[TensorFlow](https://www.tensorflow.org/datasets/catalog/goemotions?utm_source=chatgpt.com)
- **EmpatheticDialogues** — 25k dialogues grounded in emotional situations; solid for empathetic response generation and emotion cues. *(CC BY-NC-SA → research/non-commercial)* [arXiv](https://arxiv.org/abs/1811.00207?utm_source=chatgpt.com)[ACL Anthology](https://aclanthology.org/P19-1534/?utm_source=chatgpt.com)[Kaggle](https://www.kaggle.com/datasets/atharvjairath/empathetic-dialogues-facebook-ai?utm_source=chatgpt.com)
- **DailyDialog** — multi-turn daily conversations with **emotion + dialogue-act** labels; handy for multi-task heads. *(CC BY-NC-SA → research)* [ACL Anthology](https://aclanthology.org/I17-1099/?utm_source=chatgpt.com)[Hugging Face](https://huggingface.co/datasets/roskoN/dailydialog?utm_source=chatgpt.com)
- **MELD** — multimodal (text+audio+video) emotion from *Friends*; good for cross-modal affect fusion. *(Research; check terms on the official page)* [affective-meld.github.io](https://affective-meld.github.io/?utm_source=chatgpt.com)[ACL Anthology](https://aclanthology.org/P19-1050/?utm_source=chatgpt.com)

# Active listening & dialogue acts (backchannels, acknowledgements, etc.)

- **Switchboard Dialog Act (SwDA)** — telephone conversations with DAMSL tags (e.g., *Acknowledge/Backchannel*). *(CC BY-NC-SA → research)* [compprag.christopherpotts.net](https://compprag.christopherpotts.net/swda.html?utm_source=chatgpt.com)[convokit.cornell.edu](https://convokit.cornell.edu/documentation/switchboard.html?utm_source=chatgpt.com)
- **MRDA (ICSI Meeting Recorder Dialog Act)** — ~72h meetings with rich dialog-act tags; great for facilitator behaviors in multi-party settings. *(Research distribution)* [ACL Anthology](https://aclanthology.org/W04-2319/?utm_source=chatgpt.com)[ntrl.ntis.gov](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/ADA460980.xhtml?utm_source=chatgpt.com)
- **AMI & ICSI Meeting Corpora** — real meetings with transcripts and annotations; AMI is **CC BY 4.0**. Useful for turn-taking, overlap, and summaries. [Informatics Group+1](https://groups.inf.ed.ac.uk/ami/corpus/?utm_source=chatgpt.com)

# Open-question vs closed-question detection

- **BoolQ** — naturally occurring **yes/no** questions; perfect “closed Q” negative class. *(CC BY-SA 3.0)* [GitHub](https://github.com/google-research-datasets/boolean-questions?utm_source=chatgpt.com)[Hugging Face](https://huggingface.co/datasets/google/boolq?utm_source=chatgpt.com)
- **Natural Questions (NQ)** — real user questions (has a yes/no field); mix with BoolQ to sharpen closed-form cues. *(CC BY-SA 3.0)* [Google AI](https://ai.google.com/research/NaturalQuestions/download?utm_source=chatgpt.com)
- **QuAC** — information-seeking dialogues with many **open-ended** questions; good positive class for open questions. *(MIT / CC BY-SA mirrors)* [Hugging Face](https://huggingface.co/datasets/allenai/quac?utm_source=chatgpt.com)[quac.ai](https://quac.ai/?utm_source=chatgpt.com)
- **TREC Question Classification** — coarse/fine types (WHO/WHEN/NUM…); useful as an auxiliary task. [Hugging Face](https://huggingface.co/datasets/CogComp/trec?utm_source=chatgpt.com)[TensorFlow](https://www.tensorflow.org/datasets/catalog/trec?utm_source=chatgpt.com)

# Reflective prompts / empathy & counseling style

- **CounselChat (scraped)** — therapist answers to user questions; useful for *supportive tone* and reflective phrasing mining. *(Scrape; review site ToS/legal before commercial use)* [Hugging Face](https://huggingface.co/datasets/nbertagnolli/counsel-chat?utm_source=chatgpt.com)[GitHub](https://github.com/nbertagnolli/counsel-chat?utm_source=chatgpt.com)
- **AnnoMI / BiMISC (Motivational Interviewing)** — small but **expert-annotated** MI corpora with behavior codes (e.g., reflections). *(Research licenses; check terms)* [MDPI](https://www.mdpi.com/1999-5903/15/3/110?utm_source=chatgpt.com)[ACL Anthology](https://aclanthology.org/2024.lrec-main.498/?utm_source=chatgpt.com)
- **EmpatheticDialogues** (again) as a base for empathetic wording; pair with your prompt library for RAG generation. [arXiv](https://arxiv.org/abs/1811.00207?utm_source=chatgpt.com)

# Prosody & speech emotion (for affect fusion with text)

- **CREMA-D** — acted emotions; **ODbL**; permits commercial use with attribution. Good for prosody features (F0/energy). [GitHub](https://github.com/CheyneyComputerScience/CREMA-D?utm_source=chatgpt.com)[Audeering](https://audeering.github.io/datasets/datasets/crema-d.html?utm_source=chatgpt.com)
- **RAVDESS** — acted speech & song; **CC BY-NC-SA** (commercial license available). [PLOS](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0196391&utm_source=chatgpt.com)[Hugging Face](https://huggingface.co/datasets/ehcalabres/ravdess_speech?utm_source=chatgpt.com)
- **MSP-Podcast / MSP-Conversation** — large, naturalistic emotional speech; *academic license, commercial option available*; great for “in-the-wild” emotion. [Erik Jonsson School](https://ecs.utdallas.edu/research/researchlabs/msp-lab/MSP-Podcast.html?utm_source=chatgpt.com)[ISCA Archive](https://www.isca-archive.org/interspeech_2020/martinezlucas20_interspeech.pdf?utm_source=chatgpt.com)[Multimodal Speech Processing Laboratory](https://www.lab-msp.com/MSP/MSP-Conversation.html?utm_source=chatgpt.com)
- **IEMOCAP** — multimodal acted dialogues; access via USC release form. *(Research)* [Sail USC+1](https://sail.usc.edu/iemocap/?utm_source=chatgpt.com)

# ASR (transcripts) & diarization (who-spoke-when)

- **Common Voice** — massive multilingual speech under **CC0** (public domain) → very commercial-friendly. [Mozilla Foundation](https://www.mozillafoundation.org/en/blog/common-voice-18-dataset-release/?utm_source=chatgpt.com)
- **LibriSpeech / MLS** — read audiobooks; **CC BY 4.0**; good for acoustic models & LM. [OpenSLR+1](https://www.openslr.org/12?utm_source=chatgpt.com)
- **TED-LIUM** — TED talks; **CC BY-NC-ND** (research-only). [OpenSLR](https://www.openslr.org/51/?utm_source=chatgpt.com)
- **AMI Meeting Corpus** — 100h meetings; **CC BY 4.0**; staple for *far-field*, overlap, and diarization. [Informatics Group](https://groups.inf.ed.ac.uk/ami/corpus/license.shtml?utm_source=chatgpt.com)
- **DIHARD Challenges** — tough diarization benchmark; access via **LDC license**. [Linguistic Data Consortium](https://catalog.ldc.upenn.edu/LDC2022S14?utm_source=chatgpt.com)[dihardchallenge.github.io](https://dihardchallenge.github.io/dihard3/registration.html?utm_source=chatgpt.com)
- **VoxCeleb 1/2** — large speaker ID corpora; **CC BY/CC BY-SA** terms for audio/metadata → great for diarization embeddings. [Oxygen Robotics+1](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/files/license.txt?utm_source=chatgpt.com)[mm.kaist.ac.kr](https://mm.kaist.ac.kr/datasets/voxceleb/?utm_source=chatgpt.com)

# VAD & noise augmentation (for robust real-time)

- **MUSAN** — music/speech/noise for augmentation & VAD; **CC BY 4.0**. [OpenSLR](https://www.openslr.org/17/?utm_source=chatgpt.com)
- **AudioSet** — 2M+ labeled 10-s clips; **CC BY 4.0** (ontology CC BY-SA). Great for non-speech noise mixing. [Google Research+1](https://research.google.com/audioset/download.html?utm_source=chatgpt.com)

---

## Quick picks by **commercial-friendliness**

**Generally OK for commercial** (check specifics): *Common Voice (CC0), LibriSpeech/MLS (CC BY 4.0), AMI (CC BY 4.0), VoxCeleb (CC BY/CC BY-SA), MUSAN (CC BY 4.0), CREMA-D (ODbL), MSP-Conversation (commercial license available).* [Mozilla Foundation](https://www.mozillafoundation.org/en/blog/common-voice-18-dataset-release/?utm_source=chatgpt.com)[OpenSLR+2OpenSLR+2](https://www.openslr.org/12?utm_source=chatgpt.com)[Informatics Group](https://groups.inf.ed.ac.uk/ami/corpus/license.shtml?utm_source=chatgpt.com)[Oxygen Robotics](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/files/license.txt?utm_source=chatgpt.com)[mm.kaist.ac.kr](https://mm.kaist.ac.kr/datasets/voxceleb/?utm_source=chatgpt.com)[Audeering](https://audeering.github.io/datasets/datasets/crema-d.html?utm_source=chatgpt.com)[Multimodal Speech Processing Laboratory](https://www.lab-msp.com/MSP/MSP-Conversation.html?utm_source=chatgpt.com)

**Research-only / non-commercial** (good for pretraining, not shipping): *EmpatheticDialogues, DailyDialog, TED-LIUM, RAVDESS (unless you purchase commercial license), many MI corpora (IEMOCAP via release).* [Kaggle](https://www.kaggle.com/datasets/atharvjairath/empathetic-dialogues-facebook-ai?utm_source=chatgpt.com)[Hugging Face+1](https://huggingface.co/datasets/roskoN/dailydialog?utm_source=chatgpt.com)[OpenSLR](https://www.openslr.org/51/?utm_source=chatgpt.com)[Sail USC](https://sail.usc.edu/iemocap/iemocap_release.htm?utm_source=chatgpt.com)

---