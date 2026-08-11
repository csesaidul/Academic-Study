# Answer Toggle — Test Note

এই নোটটা Reading view (Preview)-এ খুলে দেখুন। Answer Toggle প্লাগইন enable থাকলে নিচের প্রতিটা প্যাটার্ন আলাদাভাবে কাজ করার কথা।

---

## ১. Inline — ডিফল্ট টাইটেল

প্রশ্ন: ২ + ২ = কত? উত্তর হলো ?"৪"? — এখানে বাটনে "Show answer" দেখানোর কথা।

---

## ২. Inline — কাস্টম টাইটেল

Time complexity: ?[complexity]"$O(n log n)$"? — এখানে বাটনে "Show complexity" দেখানোর কথা।

একই লাইনে একাধিক inline blank: The alphabet is ?"{0,1}"? and a valid string example is ?[example]"0110"?

---

## ৩. Block — ডিফল্ট টাইটেল (blank line সহ আলাদা প্যারাগ্রাফ)

প্রশ্ন: Alphabet, String, এবং Language define করো।

??"

- **Alphabet (Σ):** A finite, non-empty set of symbols.
    - _Example:_ Σ = {0, 1}
- **String:** A finite sequence of symbols from a specific alphabet.
    - _Example:_ "0110" is a valid string over the binary alphabet.
- **Language:** A set of strings constructed from a given alphabet.
    - _Example:_ The set of all strings starting with 'a' over Σ = {a, b}.

"??

---

## ৪. Block — কাস্টম টাইটেল

প্রশ্ন: DFA এবং NFA-এর মধ্যে পার্থক্য কী?

??[dfa-vs-nfa]"

|বিষয়|DFA|NFA|
|---|---|---|
|Transition|প্রতি state-এ প্রতিটা input symbol-এর জন্য ঠিক একটা transition|একাধিক বা শূন্য transition থাকতে পারে|
|ε-move|নেই|থাকতে পারে|
|শক্তি|Regular language accept করে|একই শক্তি, কিন্তু representation-এ বেশি flexible|

"??

---

## ৫. পুরনো "Solution:" ফরম্যাট (backward compatible)

প্রশ্ন: Automata theory-তে "computation" বলতে কী বোঝায়?

[**Solution**:](https://example.com/fake-link) Computation বলতে বোঝায় কোনো সুনির্দিষ্ট নিয়ম (rule/algorithm) অনুসরণ করে input থেকে output উৎপন্ন করার প্রক্রিয়া। - এটি একটি formal model (যেমন: Finite Automaton, Turing Machine) দ্বারা পরিচালিত হয়।

---

## ৬. PDF++ embed-এর মতো একটা placeholder (embed নিজে vault-এ না থাকলে broken দেখাবে, সমস্যা নেই — শুধু দেখতে চাই এটা block scanning বন্ধ করে কিনা)

![[Some-Fake-PDF.pdf#page=1]]

প্রশ্ন: উপরের embed-এর পরের এই লাইনটা একটা নতুন, স্বাধীন প্যারাগ্রাফ হিসেবে থাকা উচিত — কোনো answer-toggle বক্সের ভেতরে ঢুকে যাওয়া উচিত না।

---

## ৭. Nested — list item-এর ভেতরে inline

- প্রথম পয়েন্ট, উত্তর ?"এখানে"? লুকানো থাকবে।
- দ্বিতীয় পয়েন্ট, সাধারণ টেক্সট, কোনো toggle নেই।

---

### চেকলিস্ট (টেস্ট করার পর মিলিয়ে দেখুন)

- [ ] সেকশন ১: "Show answer" বাটনে ক্লিক করলে "৪" দেখায়, বাটন "Close answer" হয়ে যায়
- [ ] সেকশন ২: দুইটা আলাদা inline বাটন ("Show complexity" ও দুইটা আরও inline) ঠিকমতো নিজেদের কনটেন্ট টগল করে, একটা আরেকটাকে প্রভাবিত করে না
- [ ] সেকশন ৩: পুরো bullet list hidden থেকে "Show answer" ক্লিকে দেখা যায়
- [ ] সেকশন ৪: টেবিলসহ পুরো কনটেন্ট "Show dfa-vs-nfa" / "Close dfa-vs-nfa" নামে টগল হয়
- [ ] সেকশন ৫: পুরনো Solution: ফরম্যাটও "Show answer"/"Close answer" হিসেবে কাজ করে
- [ ] সেকশন ৬: embed-এর পরের প্যারাগ্রাফ কোনো toggle বক্সে জড়িয়ে যায়নি
- [ ] সেকশন ৭: list item-এর ভেতরের inline টগলও কাজ করে
- [ ] Live Preview / Editing mode-এ raw notation (`?"`, `??"` ইত্যাদি) স্বাভাবিক টেক্সট হিসেবে দেখা যায়, কোনো ভাঙা রেন্ডারিং নেই
- [ ] PDF++ embed-এর নিজস্ব ফিচার (annotation, rectangle highlight ইত্যাদি) অক্ষত আছে