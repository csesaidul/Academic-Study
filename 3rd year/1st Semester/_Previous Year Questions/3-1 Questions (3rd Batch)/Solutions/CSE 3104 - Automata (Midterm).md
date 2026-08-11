![[3-1 Questions (3rd Batch).pdf#page=5&rect=162,383,674,501&color=important|3-1 Questions (3rd Batch), p.5]]![[3-1 Questions (3rd Batch).pdf#page=5&rect=162,348,675,364&color=red|3-1 Questions (3rd Batch), p.5]]

??"

[**Solution**:](https://share.google/aimode/UvsjAh7zqc28EJqSl)
	In theoretical computer science, these terms define how computational models process information:
	- **Alphabet ($\Sigma$):** A finite, non-empty set of symbols.
	    - _Example:_ The binary alphabet \($\Sigma$ = \{0, 1\}\). [1](https://www.geeksforgeeks.org/theory-of-computation/introduction-of-theory-of-computation/)]
	- **String:** A finite sequence of symbols taken from a specific alphabet.
	    - _Example:_ Over the binary alphabet, "0110" is a valid string. [1](https://www.geeksforgeeks.org/theory-of-computation/introduction-of-theory-of-computation/)
	- **Language:** A set of strings constructed from a given alphabet.
    - _Example:_ The set of all strings that start with 'a' over the alphabet \(\Sigma = \{a, b\}\). [1](https://www.slideshare.net/slideshow/alphabets-strings-languages-and-grammars/160916079), [2](https://www.geeksforgeeks.org/theory-of-computation/introduction-of-theory-of-computation/)

"??

![[3-1 Questions (3rd Batch).pdf#page=5&rect=162,273,674,345&color=red|3-1 Questions (3rd Batch), p.5]]

??"

# 1
The image shows two problems requiring the construction of Deterministic Finite Automata (DFAs) over the alphabet $\Sigma = \{0, 1\}$. Below are the step-by-step solutions for both parts.

Part i: Number of 0's is divisible by 3

To keep track of whether the number of `0`s is divisible by 3, we need to track the remainder when the total count of `0`s is divided by 3. There are three possible remainders: 0, 1, and 2.

1. States Definition

- q₀: The number of `0`s read so far has a remainder of 0 modulo 3 (Initial and Final state).
- q₁: The number of `0`s read so far has a remainder of 1 modulo 3.
- q₂: The number of `0`s read so far has a remainder of 2 modulo 3.

2. Transition Rules

- Reading a `1` does not change the count of `0`s, so every state loops to itself on `1`.
- Reading a `0` transitions to the next remainder state: $q_0 \xrightarrow{0} q_1 \xrightarrow{0} q_2 \xrightarrow{0} q_0$.

3. Formal Tuple Description

- States (Q): $\{q_0, q_1, q_2\}$
- Alphabet (Σ): $\{0, 1\}$
- Start State (q₀): q₀
- Accepting States (F): $\{q_0\}$
- Transition Table:

|Present State|Input = 0|Input = 1|
|---|---|---|
|*_→ _q₀__|q₁|q₀|
|q₁|q₂|q₁|
|q₂|q₀|q₂|

Part ii: Strings that begin or end (or both) with "01"

This language is a union of two conditions: $L = L_{begin} \cup L_{end}$. It is easiest to track both conditions simultaneously using a product construction or a unified state graph.

1. States Definition

- $q_{start}$: Initial state (empty string).
- q₀: Found prefix `0`, waiting for `1` to complete the "begins with 01" condition.
- $q_{B}$: Successfully begins with `01`. It now tracks the trailing suffix to see if it _also_ currently ends in `01` or not.
    
    - $q_{B0}$: Begins with `01`, and the last character read was `0`.
    - $q_{B01}$: Begins with `01`, and the last two characters read were `01` (Accepting state).
    
- $q_{N0}$: Did not begin with `01`, but the last character read was `0`.
- $q_{N01}$: Did not begin with `01`, but successfully ends with `01` (Accepting state).
- $q_{dead}$: Did not begin with `01`, and cannot end with `01` because the string ended elsewhere (handled dynamically by transitions).

2. Transition Table

Let's build the complete, minimal tracking transition table:

|State|Input = 0|Input = 1|Description|Status|
|---|---|---|---|---|
|$\rightarrow q_{start}$|q₀|$q_{dead}$|Initial state|Non-accepting|
|q₀|q₀|$q_{B01}$|Saw first `0`|Non-accepting|
|$q_{dead}$|$q_{N0}$|$q_{dead}$|Missed prefix `01`, reset tracking|Non-accepting|
|$q_{N0}$|$q_{N0}$|$q_{N01}$|Missed prefix, last character is `0`|Non-accepting|
|$*q_{N01}$|$q_{N0}$|$q_{dead}$|Missed prefix, ends with `01`|Accepting|
|$*q_{B01}$|$q_{B0}$|$q_{B01}$|Valid prefix, ends with `01`|Accepting|
|$*q_{B0}$|$q_{B0}$|$q_{B01}$|Valid prefix, last character is `0`|Accepting|

"??

![[3-1 Questions (3rd Batch).pdf#page=5&rect=163,231,674,271&color=red|3-1 Questions (3rd Batch), p.5]]![[3-1 Questions (3rd Batch).pdf#page=5&rect=164,197,674,230&color=red|3-1 Questions (3rd Batch), p.5]]![[3-1 Questions (3rd Batch).pdf#page=6&rect=165,472,658,503|3-1 Questions (3rd Batch), p.6]]![[3-1 Questions (3rd Batch).pdf#page=6&rect=165,415,658,474|3-1 Questions (3rd Batch), p.6]]![[3-1 Questions (3rd Batch).pdf#page=6&rect=165,359,658,417|3-1 Questions (3rd Batch), p.6]]![[3-1 Questions (3rd Batch).pdf#page=6&rect=164,227,657,361|3-1 Questions (3rd Batch), p.6]]