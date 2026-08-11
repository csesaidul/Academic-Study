# Quiz Notation — Standalone Only (No Wrapper)

এই ফাইলে কোনো `??quiz[...] ... quiz??` wrapper নেই — সবগুলো প্রশ্ন সরাসরি নোটের মধ্যে বসানো। এই ধরনের প্রশ্ন নোটের ভেতরেই render হবে, উত্তর check করা যাবে, কিন্তু score/attempt history কোথাও save হবে না (আগের প্ল্যান অনুযায়ী)।

---

### MCQ — single select

আচ্ছা, Regular Expression নিয়ে একটু practice করি —

??mcq:single
Q: নিচের কোনটি সঠিক regular expression যেটা শুধু "a" দিয়ে শুরু হওয়া string match করে?
- [ ] b(a|b)*
- [x] a(a|b)*
- [ ] (a|b)*a
- [ ] (a|b)*
mcq??

সাধারণ প্যারাগ্রাফ টেক্সট, কোনো প্রশ্ন না।

### MCQ — multi select

??mcq:multi
Q: নিচের কোনগুলো Context-Free Grammar-এর উপাদান?
- [x] Terminals
- [x] Non-terminals
- [ ] Transition function
- [x] Production rules
- [ ] Accepting states
mcq??

---

### উদ্দীপক (Passage) + একাধিক MCQ

??passage
নিচের তথ্যটি পড়ে পরের দুইটি প্রশ্নের উত্তর দাও:

একটি Turing Machine-এর tape অসীম (infinite) দৈর্ঘ্যের এবং এটি tape-এ read ও write দুটোই করতে পারে।

??mcq:single
Q: Turing Machine-এর tape-এর দৈর্ঘ্য কেমন?
- [ ] সসীম (finite)
- [x] অসীম (infinite)
- [ ] শূন্য
mcq??

??mcq:multi
Q: Turing Machine tape-এ কী কী করতে পারে?
- [x] Read
- [x] Write
- [ ] শুধু Read
mcq??
passage??

মাঝে আবার সাধারণ টেক্সট — এটা যেন কোনো প্রশ্ন ব্লকে জড়িয়ে না যায়, শুধু normal paragraph হিসেবে থাকা উচিত।

---

### শূন্যস্থান পূরণ

??fill
একটি {{DFA}}-তে প্রতিটি state-এর জন্য প্রতিটি input symbol-এর ঠিক {{একটি|1টি}} transition থাকে। একটি NFA-তে {{ε|epsilon|এপসাইলন}}-move থাকতে পারে।
fill??

### True / False

??tf
Q: Pumping Lemma ব্যবহার করে কোনো ভাষা Regular কিনা তা প্রমাণ করা যায়।
= true
tf??

??tf
Q: সব Context-Free Language Regular Language-ও বটে।
= false
tf??

---

### Matching

??match
Chomsky Type 0 = Recursively Enumerable
Chomsky Type 1 = Context-Sensitive
Chomsky Type 2 = Context-Free
Chomsky Type 3 = Regular
match??

### Ordering

??order
Q: Automata theory-তে ভাষার শক্তি (power) অনুযায়ী নিচের মডেলগুলো ক্ষুদ্রতম থেকে বৃহত্তম ক্রমে সাজাও
1. Regular (DFA/NFA)
2. Context-Free (PDA)
3. Context-Sensitive
4. Recursively Enumerable (Turing Machine)
order??

### Drag into category

??dragmatch
[Deterministic মডেল]
- DFA
- Deterministic PDA
[Non-deterministic মডেল]
- NFA
- Turing Machine
dragmatch??

---

শেষে আরেকটা সাধারণ paragraph — যাচাই করার জন্য যে উপরের কোনো প্রশ্ন ব্লক এই টেক্সটটাকেও নিজের ভেতরে টেনে নেয়নি।

### চেকলিস্ট

- [ ] সবগুলো প্রশ্ন block-এর মাঝে থাকা সাধারণ paragraph টেক্সট (headings-এর নিচে ভূমিকা, মাঝের নোট) কোনো প্রশ্ন ব্লকে জড়িয়ে যায়নি
- [ ] প্রতিটা প্রশ্ন আলাদাভাবে render/check করা যাচ্ছে
- [ ] কোথাও কোনো `??quiz...quiz??` না থাকায় score/history related কিছু দেখাচ্ছে না বা save হচ্ছে না
- [ ] passage-এর ভেতরের nested mcq গুলো এখানে (wrapper ছাড়া অবস্থায়) ঠিকভাবে কাজ করছে
