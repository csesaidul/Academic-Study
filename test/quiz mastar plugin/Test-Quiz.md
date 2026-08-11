# Quiz Notation — Test File

এই ফাইলটা quiz plugin বানানোর আগে শুধু **format পরিকল্পনা** ঠিক আছে কিনা যাচাই করার জন্য। প্রতিটা প্রশ্নের ধরন এখানে দুইভাবে দেখানো হলো — প্রথমে standalone (কোনো quiz wrapper ছাড়া), তারপর নিচে একটা পূর্ণাঙ্গ `??quiz ... quiz??` এর ভেতরে।

---

## ১. Standalone প্রশ্নগুলো (quiz wrapper ছাড়া — নোটের ভেতরেই চেক করা যাবে, score/history save হবে না)

### MCQ — single select

??mcq:single
Q: বাংলাদেশের রাজধানী কোনটি?
- [ ] চট্টগ্রাম
- [x] ঢাকা
- [ ] সিলেট
- [ ] রাজশাহী
mcq??

??mcq:single
Q: What is your name?
- [ ] Masud Rana
- [ ] Sojib Haque
- [x] Saidul Islam
- [ ] Mostofa masud
mcq??

### MCQ — multi select

??mcq:multi
Q: নিচের কোনগুলো মৌলিক সংখ্যা (prime number)?
- [x] ২
- [ ] ৪
- [x] ৩
- [ ] ৬
- [x] ৭
mcq??

### উদ্দীপক (Passage) + একাধিক MCQ

??passage
নিচের তথ্যটি পড়ে পরের দুইটি প্রশ্নের উত্তর দাও:

একটি DFA-তে ৫টি state আছে, যার মধ্যে ১টি start state এবং ২টি final state। Alphabet Σ = {0, 1}।

??mcq:single
Q: এই DFA-এর মোট কতটি state আছে?
- [ ] ৩
- [ ] ৪
- [x] ৫
- [ ] ৬
mcq??

??mcq:single
Q: এই DFA-এর alphabet-এ কতটি symbol আছে?
- [ ] ১
- [x] ২
- [ ] ৩
- [ ] ৪
mcq??
passage??

### শূন্যস্থান পূরণ (একাধিক blank + বিকল্প উত্তর `|` দিয়ে)

??fill
বাংলাদেশের রাজধানী {{ঢাকা}}। পানির রাসায়নিক সংকেত {{H2O|H₂O}}। একটি DFA-তে ঠিক {{একটি|1টি|১টি}} start state থাকে।
fill??

### True / False

??tf
Q: প্রতিটি NFA-কে একটি equivalent DFA-তে রূপান্তর করা যায়।
= true
tf??

??tf
Q: NFA সবসময় DFA-এর চেয়ে বেশি শক্তিশালী (more powerful)।
= false
tf??

### Matching

??match
DFA = Deterministic Finite Automaton
NFA = Non-deterministic Finite Automaton
PDA = Pushdown Automaton
TM = Turing Machine
match??

### Ordering

??order
Q: পানি চক্রের ধাপগুলো সঠিক ক্রমে সাজাও
1. বাষ্পীভবন (Evaporation)
2. ঘনীভবন (Condensation)
3. বৃষ্টিপাত (Precipitation)
4. সংগ্রহ (Collection)
order??

### Drag into category

??dragmatch
[Regular Language স্বীকৃতিদানকারী মডেল]
- DFA
- NFA
[Context-Free Language স্বীকৃতিদানকারী মডেল]
- PDA
- CFG
dragmatch??

---

## ২. একই প্রশ্নগুলো একটি পূর্ণাঙ্গ Quiz Test-এর ভেতরে (score + attempt history save হবে)

??quiz[id=q_91hrg5d1dn][title=CSE3104 Automata Practice][time=10][negative=0.25]

??mcq:single
Q: বাংলাদেশের রাজধানী কোনটি?
- [ ] চট্টগ্রাম
- [x] ঢাকা
- [ ] সিলেট
- [ ] রাজশাহী
mcq??

??mcq:multi
Q: নিচের কোনগুলো মৌলিক সংখ্যা?
- [x] ২
- [ ] ৪
- [x] ৩
- [ ] ৬
- [x] ৭
mcq??

??passage
নিচের তথ্যটি পড়ে পরের প্রশ্নের উত্তর দাও:

একটি DFA-তে ৫টি state আছে, যার মধ্যে ১টি start state এবং ২টি final state।

??mcq:single
Q: এই DFA-এর মোট কতটি state আছে?
- [ ] ৩
- [ ] ৪
- [x] ৫
- [ ] ৬
mcq??
passage??

??fill
পানির রাসায়নিক সংকেত {{H2O|H₂O}}।
fill??

??tf
Q: প্রতিটি NFA-কে একটি equivalent DFA-তে রূপান্তর করা যায়।
= true
tf??

??match
DFA = Deterministic Finite Automaton
NFA = Non-deterministic Finite Automaton
PDA = Pushdown Automaton
match??

??order
Q: পানি চক্রের ধাপগুলো সঠিক ক্রমে সাজাও
1. বাষ্পীভবন
2. ঘনীভবন
3. বৃষ্টিপাত
order??

quiz??

---

### চেকলিস্ট (format review করার সময় মিলিয়ে দেখুন)

- [ ] প্রতিটা notation ধরন আলাদাভাবে চেনা যাচ্ছে, একটার সাথে আরেকটা গুলিয়ে যাচ্ছে না
- [ ] `??passage ... passage??`-এর ভেতরে নেস্টেড `??mcq ... mcq??` ঠিকভাবে বসছে
- [ ] `??quiz[...] ... quiz??`-এর ভেতরে সবগুলো প্রশ্নের ধরন (mcq, passage+mcq, fill, tf, match, order) একসাথে রাখা গেছে
- [ ] `fill`-এ একাধিক `{{ }}` blank এবং `|` দিয়ে বিকল্প উত্তর লেখার নিয়ম স্পষ্ট
- [ ] `match`-এ `key = value` ফরম্যাট স্পষ্ট
- [ ] `order`-এ নম্বরই সঠিক ক্রম বোঝাচ্ছে (শাফল করে দেখানো হবে ধরে নিচ্ছি)
- [ ] `dragmatch`-এ `[ক্যাটাগরি]` হেডার এবং তার নিচে bullet আইটেম আলাদা করা যাচ্ছে
- [ ] `quiz[title=...][time=...][negative=...]` — optional attribute গুলোর syntax পরিষ্কার

কোনো notation-এর syntax বদলাতে চাইলে বা নতুন কোনো প্রশ্নের ধরন যোগ করতে চাইলে বলুন — plugin বানানো শুরুর আগেই format ঠিক করে নিই।
