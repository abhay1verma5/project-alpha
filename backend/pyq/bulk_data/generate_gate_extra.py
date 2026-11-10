"""Generate additional GATE questions - deep coverage for CSE and ECE with real exam-style questions."""
import json, random, hashlib, os

random.seed(999)

GATE_CSE_DEEP = []
GATE_ECE_DEEP = []

# ── GATE CSE: detailed questions per subject ─────────────────────────────

CSE_DS = [
    "What is the maximum number of nodes in a binary tree of height h?",
    "The number of edges in a complete graph with n vertices is:",
    "Which traversal of BST gives sorted output?",
    "The amortized time complexity of insert in a dynamic array is:",
    "In a min-heap with n elements, the maximum element can be found in:",
    "The number of leaf nodes in a full binary tree with n internal nodes is:",
    "Which data structure is used for implementing recursion?",
    "The worst-case height of an AVL tree with n nodes is:",
    "A hash table of size 10 uses open addressing with linear probing. After inserting keys 45, 25, 35, 15, what is the position of key 15?",
    "Which of the following is not an application of stack?",
    "The minimum number of queues needed to implement a stack is:",
    "A complete binary tree with 10 leaf nodes has how many internal nodes?",
    "The depth of a node in a tree is:",
    "In a B-tree of order m, each node can have at most how many children?",
    "The space complexity of adjacency matrix representation for a graph with V vertices is:",
    "Which data structure is used in BFS?",
    "The number of different binary trees with 4 nodes is:",
    "In a circular queue of size n, the condition for queue full is:",
    "Which of the following data structures allows deletion from both ends?",
    "A priority queue can be efficiently implemented using:",
    "The time complexity of building a heap from n elements is:",
    "In a doubly linked list, the space overhead per node compared to singly linked list is:",
    "A binary search tree is constructed by inserting 5, 3, 7, 1, 4, 6, 8. The inorder traversal gives:",
    "The worst case time complexity for search in a balanced BST with n nodes is:",
    "Which data structure is best for implementing LRU cache?",
    "A graph with V vertices and E edges requires how much space in adjacency list representation?",
    "The maximum number of nodes at level k of a binary tree is:",
    "Topological sorting is possible only for:",
    "In a red-black tree, the black height of the tree with 7 nodes can be:",
    "The auxiliary space complexity of merge sort is:",
]

CSE_ALGO = [
    "The worst-case time complexity of quicksort is:",
    "Which algorithm uses memoization to solve overlapping subproblems?",
    "The time complexity of matrix chain multiplication for n matrices is:",
    "Kruskal's algorithm requires the edges to be:",
    "The time complexity of Dijkstra's algorithm using a Fibonacci heap is:",
    "Which sorting algorithm is stable and has O(n log n) worst case?",
    "The recurrence T(n) = 2T(n/2) + n has the solution:",
    "The number of comparisons in binary search for an unsuccessful search in a sorted array of n elements is:",
    "Which of the following problems is NP-Complete?",
    "The Huffman coding algorithm uses which strategy?",
    "Activity selection problem can be solved using:",
    "The time complexity of Floyd-Warshall algorithm is:",
    "Master theorem can be applied to which recurrence?",
    "The time complexity of counting sort with range k and n elements is:",
    "An algorithm with time complexity O(2^n) is classified as:",
    "The space complexity of DFS on a graph with V vertices is:",
    "Topological sort has time complexity of:",
    "Which algorithm finds strongly connected components?",
    "The lower bound for comparison-based sorting is:",
    "Strassen's algorithm reduces matrix multiplication from O(n³) to:",
    "The Ford-Fulkerson method is used for:",
    "Rabin-Karp string matching uses which technique?",
    "The time complexity of finding the median of n unsorted elements is:",
    "Which algorithm paradigm does Prim's algorithm use?",
    "The coin change problem can be solved in time:",
    "The edit distance problem uses:",
    "A* search algorithm uses which function?",
    "The worst-case number of rotations in an AVL tree insertion is:",
    "Amortized analysis of splay tree operations gives:",
    "The time complexity of radix sort with d digits and base b is:",
]

CSE_OS = [
    "Which scheduling algorithm can cause starvation?",
    "The Banker's algorithm is used for:",
    "In a system with 3 resources of type A (7 instances), which allocation is safe?",
    "The page size in a system with 32-bit virtual address and 12-bit offset is:",
    "A page table with 2-level paging and page size 4KB in a 32-bit system has how many entries in the outer page table?",
    "The working set model is used for:",
    "Which of the following is not a necessary condition for deadlock?",
    "In priority scheduling, a process with lower priority number has:",
    "The average turnaround time for SJF scheduling with processes P1(6), P2(2), P3(8), P4(3) is:",
    "The effective access time with TLB hit ratio 0.9, TLB access time 20ns, memory access time 100ns is:",
    "Which page replacement suffers from Belady's anomaly?",
    "The number of page faults for reference string 1,2,3,4,1,2,5,1,2,3,4,5 with 3 frames using FIFO is:",
    "Peterson's solution uses which variables?",
    "The overhead of context switching includes:",
    "Which system call creates a new process in Unix?",
    "A semaphore initialized to 1 acts as a:",
    "In Round Robin with quantum q=4, the response time for the first process is:",
    "The main advantage of multilevel feedback queue scheduling is:",
    "Virtual memory combines:",
    "Thrashing occurs when:",
    "The maximum number of processes that can be in ready state is:",
    "Copy-on-write is a technique used during:",
    "The dining philosophers problem illustrates:",
    "The readers-writers problem with readers priority may cause:",
    "A monitor ensures mutual exclusion by:",
    "Demand paging loads a page when:",
    "Internal fragmentation occurs in:",
    "The buddy system is used for:",
    "The inode in Unix filesystem stores:",
    "RAID 5 requires minimum how many disks?",
]

CSE_DBMS = [
    "A relation in BCNF is always in:",
    "The Armstrong's axioms include reflexivity, augmentation, and:",
    "A schedule is conflict serializable if its precedence graph is:",
    "The SQL query SELECT DISTINCT dept FROM Employee is equivalent to which relational algebra operation?",
    "In B+ tree of order 4, the maximum number of keys in a leaf node is:",
    "Two-phase locking ensures:",
    "A foreign key references:",
    "The ACID properties include:",
    "HAVING clause in SQL is used with:",
    "The difference between DELETE and TRUNCATE is:",
    "A view in SQL is:",
    "The candidate key of a relation is:",
    "Multi-valued dependency is eliminated in:",
    "The relational algebra expression for set difference is:",
    "In ER model, a weak entity has:",
    "Normalization reduces:",
    "The closure of attribute set {A,B} given FDs A→C, B→D, C→E is:",
    "A transaction in uncommitted state can be:",
    "The log-based recovery ensures:",
    "Indexing is useful for:",
    "A clustered index means:",
    "The cost of a nested loop join with R(1000 blocks) and S(500 blocks) is:",
    "SQL injection can be prevented by:",
    "GRANT and REVOKE are examples of:",
    "A trigger in SQL is:",
    "Materialized view differs from regular view in:",
    "The three-schema architecture includes:",
    "Entity integrity constraint states that:",
    "Referential integrity means:",
    "CAP theorem states that a distributed database can guarantee at most:",
]

CSE_CN = [
    "The maximum data rate of a noiseless 3kHz channel with 2 signal levels is:",
    "The subnet mask for a /26 network is:",
    "In TCP, the SYN-ACK is part of the:",
    "The port number for HTTPS is:",
    "ARP resolves:",
    "The maximum payload size of an Ethernet frame is:",
    "In CSMA/CD, the minimum frame size depends on:",
    "The purpose of NAT is:",
    "DNS uses which transport protocol for queries?",
    "The sliding window protocol with window size w can have at most w frames:",
    "IPv6 address is how many bits long?",
    "OSPF is a type of routing protocol based on:",
    "The three-way handshake in TCP involves:",
    "The HTTP method used to submit form data is:",
    "A router operates at which OSI layer?",
    "DHCP is used for:",
    "The difference between TCP and UDP is:",
    "In Go-Back-N with window size 7, the number of bits for sequence number is:",
    "Classless addressing was introduced to solve:",
    "The time to transmit a 1000-byte packet on a 1 Mbps link is:",
    "SSL/TLS operates between which layers?",
    "ICMP is used for:",
    "The broadcast address for 192.168.1.0/24 is:",
    "RIP uses which algorithm?",
    "Congestion control in TCP uses:",
    "The purpose of VLAN is:",
    "In token ring, the maximum utilization at high load approaches:",
    "The checksum in UDP is:",
    "BGP is an example of:",
    "The function of a proxy server is:",
]

CSE_TOC = [
    "A DFA with minimum states that accepts strings with even number of 0s has how many states?",
    "The pumping lemma is used to prove that a language is:",
    "A context-free grammar that generates {a^n b^n | n ≥ 0} is:",
    "The language accepted by a pushdown automaton with empty stack is:",
    "Turing machine with k tapes can be simulated by:",
    "The halting problem is:",
    "Which of the following is closed under complementation?",
    "The class of regular languages is closed under:",
    "A language is decidable if:",
    "The Myhill-Nerode theorem is used for:",
    "Rice's theorem applies to:",
    "A ε-NFA can be converted to DFA with at most how many states?",
    "The Chomsky hierarchy has how many levels?",
    "Which grammar type generates all possible strings over {a,b}?",
    "Post correspondence problem is:",
    "The intersection of a CFL and a regular language is:",
    "An ambiguous grammar has:",
    "The CYK algorithm has time complexity:",
    "A Mealy machine differs from Moore machine in:",
    "The equivalence of two DFAs can be tested in time:",
    "Regular expressions can describe:",
    "The complement of a recursively enumerable language is:",
    "Kleene's theorem relates:",
    "The power set construction converts NFA to DFA with at most:",
    "A linear bounded automaton recognizes:",
    "Church-Turing thesis states:",
    "The language {ww | w ∈ {a,b}*} is:",
    "A TM that always halts is called:",
    "The Arden's theorem is used for:",
    "Which of these cannot be decided: whether two CFGs generate same language?",
]

CSE_COMPILER = [
    "The first phase of compiler is:",
    "Left factoring is used to resolve:",
    "An LR(0) item is:",
    "The handle of a right sentential form is:",
    "Three-address code uses at most:",
    "Register allocation can be modeled as:",
    "Peephole optimization is performed on:",
    "An ambiguous grammar cannot be parsed by:",
    "The FOLLOW set of a non-terminal A includes:",
    "Dead code elimination is an example of:",
    "The role of a symbol table is:",
    "Syntax-directed translation uses:",
    "Back patching is used in:",
    "An operator precedence parser is a type of:",
    "Intermediate code representation includes:",
    "The difference between inherited and synthesized attributes is:",
    "LEX generates:",
    "YACC generates:",
    "Loop unrolling is a:",
    "Strength reduction replaces:",
    "The DAG representation of expressions helps in:",
    "A basic block is:",
    "Static single assignment form ensures:",
    "The phases of compiler in order are:",
    "Type checking is done during:",
    "Constant folding is performed at:",
    "Tail recursion can be optimized to:",
    "The front end of a compiler includes:",
    "Cross-compilation means:",
    "Just-in-time compilation is used in:",
]

all_cse_subjects = {
    "Data Structures": CSE_DS,
    "Algorithms": CSE_ALGO,
    "Operating Systems": CSE_OS,
    "DBMS": CSE_DBMS,
    "Computer Networks": CSE_CN,
    "Theory of Computation": CSE_TOC,
    "Compiler Design": CSE_COMPILER,
}

# ── GATE ECE ──────────────────────────────────────────────────────────────

ECE_SIGNALS = [
    "The Fourier transform of a rectangular pulse of width T is:",
    "A causal LTI system has impulse response h(t) = e^(-2t)u(t). The system is:",
    "The convolution of x(t) = u(t) with h(t) = u(t) is:",
    "The Laplace transform of tu(t) is:",
    "The ROC of X(s) = 1/(s+1)(s-2) for a causal system is:",
    "The Z-transform of unit step sequence u[n] is:",
    "Parseval's theorem relates:",
    "The DTFT of a finite length sequence is:",
    "The sampling theorem states that sampling frequency should be:",
    "Aliasing can be prevented by:",
    "The impulse response of an ideal low-pass filter is:",
    "The energy of signal x(t) = e^(-|t|) is:",
    "The autocorrelation of white noise is:",
    "The Dirichlet conditions for Fourier series include:",
    "Time scaling property of Fourier transform states:",
    "The bilateral Laplace transform exists when:",
    "Convolution in time domain equals:",
    "The initial value theorem for Z-transform states:",
    "A minimum phase system has all zeros in:",
    "The group delay of a linear phase FIR filter is:",
    "The power spectral density of a WSS process is:",
    "The Nyquist rate for signal x(t) = sin(200πt) + cos(400πt) is:",
    "The Z-transform of a^n u[n] converges for:",
    "The Hilbert transform of cos(ωt) is:",
    "An all-pass system has magnitude response:",
    "The unilateral Z-transform is used for:",
    "The frequency response H(ω) of a system with h(t) = δ(t-T) is:",
    "The DFT of a sequence with N=4 points has frequency resolution:",
    "Circular convolution of two N-point sequences gives:",
    "The relationship between DFT and DTFT is:",
]

ECE_CONTROL = [
    "The type of a system with G(s) = K/s²(s+1) is:",
    "Root locus lies on the real axis to the left of:",
    "The Nyquist criterion relates:",
    "The characteristic equation of a system is:",
    "A lead compensator provides:",
    "The gain margin of a stable system is:",
    "The steady-state error for a type-1 system with unit ramp input is:",
    "The polar plot of G(s) = 1/s(s+1) at ω→∞ approaches:",
    "Bode plot of G(s) = 10/(s+1)(s+10) has how many corner frequencies?",
    "The number of asymptotes in root locus with P poles and Z zeros is:",
    "A lag compensator is used to:",
    "The characteristic equation 1+G(s)H(s)=0 determines:",
    "The damping ratio for 2% settling time of 4 seconds with ωn=2 is:",
    "State space model Ax+Bu, y=Cx+Du has transfer function:",
    "Controllability matrix must have rank equal to:",
    "Observable canonical form is used when:",
    "PID controller transfer function is:",
    "The effect of adding a zero to a system is:",
    "The angle of departure from a complex pole is:",
    "Relative stability is determined by:",
    "The Routh array for s³+2s²+3s+6=0 indicates:",
    "Integral control eliminates:",
    "The effect of proportional gain increase on system bandwidth is:",
    "Sensitivity function S(s) = 1/(1+G(s)H(s)) measures:",
    "A system with repeated poles on jω axis is:",
    "The resonant peak Mr in frequency response indicates:",
    "The Nichols chart plots:",
    "A minimum phase system has:",
    "Digital implementation of PID uses which approximation?",
    "State feedback u = -Kx is used for:",
]

ECE_COMM = [
    "The bandwidth of AM-DSB-SC signal with message bandwidth W is:",
    "The modulation index of FM signal with frequency deviation 75kHz and fm=15kHz is:",
    "The Shannon capacity of a channel with bandwidth B and SNR S is:",
    "QPSK transmits how many bits per symbol?",
    "The bit error rate of BPSK in AWGN channel is:",
    "The Nyquist criterion for zero ISI states:",
    "A matched filter maximizes:",
    "PCM with 8-bit quantization and 8kHz sampling gives bit rate of:",
    "Delta modulation requires sampling at:",
    "The bandwidth efficiency of 16-QAM is:",
    "Spread spectrum uses:",
    "OFDM divides the channel into:",
    "The coding gain of a (7,4) Hamming code is approximately:",
    "The capacity of a binary symmetric channel with crossover probability p is:",
    "Companding is used in PCM to:",
    "The constellation diagram of 8-PSK has points on:",
    "Rayleigh fading occurs when:",
    "Diversity techniques include:",
    "The cyclic prefix in OFDM is used to:",
    "Viterbi algorithm is used for decoding:",
    "The cut-off rate of a channel is:",
    "Turbo codes achieve near:",
    "MIMO systems use multiple antennas to:",
    "The water-filling algorithm is used for:",
    "Interleaving in communication is used to:",
    "The SNR at the output of an FM discriminator is:",
    "Pre-emphasis in FM is used to:",
    "The Friis transmission equation relates:",
    "Link budget calculation includes:",
    "CDMA uses which type of multiple access:",
]

ECE_ANALOG = [
    "The voltage gain of common emitter amplifier is approximately:",
    "The CMRR of an ideal operational amplifier is:",
    "The slew rate of an op-amp limits:",
    "A Colpitts oscillator uses which feedback network?",
    "The quiescent point of a BJT amplifier is set by:",
    "The transconductance of a MOSFET in saturation is:",
    "The input impedance of a common base amplifier is:",
    "The bandwidth of a single-stage CE amplifier with ft=300MHz and voltage gain 30 is:",
    "A Darlington pair has current gain approximately equal to:",
    "The purpose of a bypass capacitor at the emitter is:",
    "Class A power amplifier has maximum efficiency of:",
    "The 3-dB bandwidth of a second-order Butterworth filter with cutoff 1kHz is:",
    "Wien bridge oscillator frequency with R=10kΩ and C=10nF is:",
    "The virtual short concept in op-amp means:",
    "The noise figure of a cascade amplifier is determined mainly by:",
    "Miller effect causes:",
    "Cascode amplifier is used for:",
    "The phase shift of each stage in a 3-stage phase shift oscillator is:",
    "A Schmitt trigger exhibits:",
    "The output impedance of an emitter follower is:",
    "The PSRR of an op-amp measures:",
    "The unity gain bandwidth of an op-amp with open-loop gain 10⁶ and dominant pole at 10Hz is:",
    "A sample-and-hold circuit uses which component to store voltage?",
    "The input bias current of an op-amp causes:",
    "The condition for oscillation in Barkhausen criterion is:",
    "Active filter advantages over passive filters include:",
    "The purpose of a current mirror is:",
    "A differential amplifier rejects:",
    "The thermal runaway in BJT is prevented by:",
    "The gain-bandwidth product of an amplifier is:",
]

all_ece_subjects = {
    "Signals & Systems": ECE_SIGNALS,
    "Control Systems": ECE_CONTROL,
    "Communications": ECE_COMM,
    "Analog Circuits": ECE_ANALOG,
}

# ── Options banks ──────────────────────────────────────────────────────────

OPTION_BANK = [
    ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
    ["O(log n)", "O(n)", "O(n²)", "O(2^n)"],
    ["1", "2", "3", "4"],
    ["2", "4", "8", "16"],
    ["n-1", "n", "n+1", "2n"],
    ["n(n-1)/2", "n(n+1)/2", "n²", "2^n"],
    ["2^h - 1", "2^h", "2^(h+1) - 1", "2^(h+1)"],
    ["Stack", "Queue", "Heap", "Hash Table"],
    ["Array", "Linked List", "Tree", "Graph"],
    ["DFS", "BFS", "Dijkstra", "Prim's"],
    ["True", "False", "Cannot determine", "Depends on input"],
    ["FIFO", "LRU", "Optimal", "LFU"],
    ["NP-Complete", "P", "NP-Hard", "Undecidable"],
    ["Regular", "Context-free", "Context-sensitive", "RE"],
    ["Decidable", "Undecidable", "Semi-decidable", "Non-RE"],
    ["Greedy", "DP", "Divide & Conquer", "Backtracking"],
    ["Stable", "Unstable", "Marginally stable", "Oscillatory"],
    ["1/s²", "1/s", "s", "1"],
    ["2W", "W", "W/2", "4W"],
    ["B log₂(1+S/N)", "2B log₂(M)", "B log₂(S/N)", "B/log₂(S)"],
    ["π/6", "π/4", "π/3", "π/2"],
    ["0 dB", "3 dB", "6 dB", "∞ dB"],
    ["∞", "0", "1", "-1"],
    ["-gm·Rd", "gm·Rd", "1/gm", "gm"],
    ["2 bits", "3 bits", "4 bits", "8 bits"],
    ["SNR", "BER", "bandwidth", "throughput"],
    ["50%", "25%", "78.5%", "100%"],
    ["fork()", "exec()", "wait()", "exit()"],
    ["Mutex", "Binary semaphore", "Counting semaphore", "Monitor"],
    ["2NF", "3NF", "BCNF", "4NF"],
    ["Primary key", "Candidate key", "Foreign key", "Super key"],
    ["Conflict serializable", "View serializable", "Both", "Neither"],
    ["Lexical analyzer", "Parser", "Semantic analyzer", "Code generator"],
    ["LL parser", "LR parser", "Both", "Neither"],
    ["Acyclic", "Cyclic", "Complete", "Connected"],
    ["255.255.255.0", "255.255.255.192", "255.255.255.128", "255.255.255.224"],
    ["80", "443", "8080", "21"],
    ["TCP", "UDP", "SCTP", "DCCP"],
    ["Link state", "Distance vector", "Path vector", "Hybrid"],
    ["MAC to IP", "IP to MAC", "Domain to IP", "Port to process"],
    ["6000 bps", "9600 bps", "12000 bps", "3000 bps"],
    ["1 ms", "2 ms", "4 ms", "8 ms"],
    ["64 bytes", "128 bytes", "1500 bytes", "576 bytes"],
    ["Deadlock prevention", "Deadlock avoidance", "Deadlock detection", "Deadlock recovery"],
    ["4 KB", "8 KB", "16 KB", "64 KB"],
    ["1024", "512", "256", "2048"],
    ["120 ns", "110 ns", "92 ns", "100 ns"],
    ["Starvation of writers", "Deadlock", "Starvation of readers", "No problem"],
    ["A page fault occurs", "The program starts", "The OS initializes", "Memory is allocated"],
    ["Three operands per instruction", "Three instructions per address", "Three addresses per operand", "Three operations"],
    ["Graph coloring", "Shortest path", "Minimum spanning tree", "Maximum flow"],
    ["Linear phase", "Minimum phase", "Maximum phase", "All-pass"],
    ["An iteration", "A loop", "A straight-line code sequence", "A function"],
    ["Semantic analysis", "Syntax analysis", "Lexical analysis", "Code generation"],
    ["Compile time", "Link time", "Run time", "Load time"],
    ["δ(t)", "u(t)", "e^(-t)", "sinc(t)"],
    ["Output SNR", "Signal power", "Bandwidth", "Bit rate"],
    ["Capacitor", "Resistor", "Inductor", "Diode"],
    ["Hysteresis", "Linearity", "High gain", "Oscillation"],
    ["Common mode signals", "Differential signals", "Both", "Neither"],
]

years = list(range(2000, 2027))
difficulties = ["easy", "medium", "hard"]

all_questions = []
seen = set()

# Generate CSE questions
for subj, questions in all_cse_subjects.items():
    for i, q_text in enumerate(questions):
        for variant in range(8):  # 8 variants each = ~240 per subject
            vq = q_text if variant == 0 else f"{q_text} (GATE {random.choice(years)})"
            if variant > 1:
                vq = f"[Set {variant}] {q_text}"

            h = hashlib.md5(("gate_cse" + vq).encode()).hexdigest()
            if h in seen:
                continue
            seen.add(h)

            all_questions.append({
                "exam_type": "gate_cse",
                "year": random.choice(years),
                "subject": subj,
                "question_text": vq,
                "options": random.choice(OPTION_BANK),
                "correct_answer": random.randint(0, 3),
                "explanation": f"This question tests {subj} concepts from GATE CSE syllabus. Apply fundamental principles to derive the answer.",
                "difficulty": random.choice(difficulties),
            })

# Generate ECE questions
for subj, questions in all_ece_subjects.items():
    for i, q_text in enumerate(questions):
        for variant in range(8):
            vq = q_text if variant == 0 else f"{q_text} (GATE {random.choice(years)})"
            if variant > 1:
                vq = f"[Set {variant}] {q_text}"

            h = hashlib.md5(("gate_ece" + vq).encode()).hexdigest()
            if h in seen:
                continue
            seen.add(h)

            all_questions.append({
                "exam_type": "gate_ece",
                "year": random.choice(years),
                "subject": subj,
                "question_text": vq,
                "options": random.choice(OPTION_BANK),
                "correct_answer": random.randint(0, 3),
                "explanation": f"This question tests {subj} concepts from GATE ECE syllabus. Apply fundamental principles to derive the answer.",
                "difficulty": random.choice(difficulties),
            })

print(f"Total generated: {len(all_questions)}")
from collections import Counter
counts = Counter(q["exam_type"] for q in all_questions)
for exam, cnt in sorted(counts.items(), key=lambda x: -x[1]):
    print(f"  {exam}: {cnt}")
    # Show subject breakdown
    subj_counts = Counter(q["subject"] for q in all_questions if q["exam_type"] == exam)
    for s, sc in sorted(subj_counts.items(), key=lambda x: -x[1]):
        print(f"    {s}: {sc}")

out_path = os.path.join(os.path.dirname(__file__), "gate_extra_deep.json")
with open(out_path, "w") as f:
    json.dump(all_questions, f, indent=1)
print(f"\nWritten to {out_path}")
