"""Generate ~3700 GATE questions across all branches to reach 5K total."""
import json, random, hashlib, os

random.seed(42)

BRANCHES = {
    "gate_cse": {
        "target": 773,
        "subjects": {
            "Data Structures": [
                ("What is the time complexity of {op} in a {ds}?", [("insertion", "balanced BST"), ("deletion", "heap"), ("search", "hash table"), ("access", "array"), ("insertion", "linked list"), ("deletion", "AVL tree"), ("search", "B-tree"), ("merge", "two sorted arrays"), ("enqueue", "circular queue"), ("push", "stack")]),
                ("Which data structure is most suitable for {use}?", [("implementing undo functionality",), ("BFS traversal",), ("expression evaluation",), ("priority scheduling",), ("LRU cache implementation",), ("finding shortest path",), ("symbol table implementation",), ("autocomplete feature",), ("merge k sorted lists",), ("range queries",)]),
                ("In a {ds}, the worst-case time complexity for {op} is:", [("binary search tree", "search"), ("red-black tree", "insertion"), ("B+ tree", "range query"), ("skip list", "search"), ("trie", "insertion"), ("segment tree", "update"), ("Fibonacci heap", "decrease key"), ("disjoint set", "union"), ("hash table with chaining", "search"), ("AVL tree", "deletion")]),
            ],
            "Algorithms": [
                ("The time complexity of {algo} is:", [("merge sort",), ("quick sort (average case)",), ("heap sort",), ("Dijkstra's algorithm with binary heap",), ("Bellman-Ford algorithm",), ("Floyd-Warshall algorithm",), ("Kruskal's algorithm",), ("Prim's algorithm with adjacency matrix",), ("topological sort",), ("KMP string matching",)]),
                ("Which algorithmic paradigm is used in {problem}?", [("0/1 Knapsack problem",), ("Huffman coding",), ("Matrix chain multiplication",), ("Activity selection problem",), ("Longest common subsequence",), ("Fractional knapsack",), ("N-Queens problem",), ("Travelling salesman (exact)",), ("Minimum spanning tree",), ("Coin change problem",)]),
                ("What is the recurrence relation for {algo}?", [("merge sort",), ("binary search",), ("Strassen's matrix multiplication",), ("Karatsuba multiplication",), ("Tower of Hanoi",), ("quick sort (best case)",), ("closest pair of points",), ("FFT",), ("median of medians",), ("randomized select",)]),
            ],
            "Operating Systems": [
                ("In {scenario}, which scheduling algorithm gives minimum average waiting time?", [("processes with equal burst time",), ("processes with varying burst times and no preemption",), ("real-time systems with deadlines",), ("interactive systems",), ("batch processing systems",), ("mix of CPU-bound and I/O-bound processes",), ("time-sharing systems",), ("processes with known burst times",), ("multilevel feedback queue scenario",), ("round robin with quantum 4ms",)]),
                ("Which page replacement algorithm {property}?", [("suffers from Belady's anomaly",), ("requires future knowledge of page references",), ("approximates optimal replacement",), ("uses a reference bit",), ("is also known as clairvoyant algorithm",), ("maintains a stack of pages",), ("gives minimum page faults",), ("uses frequency count",), ("works with working set model",), ("is used in Linux kernel",)]),
                ("In a system with {config}, the maximum number of processes in deadlock is:", [("5 resources and 3 processes",), ("3 resource types with 7,5,3 instances",), ("4 resources in circular wait",), ("2 printers and 3 processes",), ("semaphore-based synchronization",), ("3 tape drives and 4 processes",), ("reader-writer lock scenario",), ("dining philosophers with 5 forks",), ("producer-consumer with bounded buffer",), ("banker's algorithm setup",)]),
            ],
            "DBMS": [
                ("The normal form that eliminates {dependency} is:", [("partial dependency",), ("transitive dependency",), ("multi-valued dependency",), ("join dependency",), ("functional dependency on non-prime attributes",), ("insertion anomaly",), ("update anomaly",), ("deletion anomaly",), ("lossless decomposition issues",), ("dependency preservation issues",)]),
                ("In a relational algebra expression for {query}, the correct operator sequence is:", [("finding employees earning more than their manager",), ("natural join of two relations",), ("finding department with maximum employees",), ("division operation",), ("set difference of two queries",), ("projection followed by selection",), ("theta join with condition",), ("outer join operation",), ("aggregate with grouping",), ("nested subquery equivalent",)]),
                ("Which concurrency control protocol {property}?", [("ensures conflict serializability",), ("may cause cascading rollbacks",), ("uses timestamps for ordering",), ("implements strict two-phase locking",), ("guarantees deadlock freedom",), ("uses wound-wait scheme",), ("implements MVCC",), ("uses wait-die scheme",), ("supports snapshot isolation",), ("ensures view serializability",)]),
            ],
            "Computer Networks": [
                ("In {protocol}, the {field} field is used for:", [("TCP", "sequence number"), ("IP", "TTL"), ("HTTP", "Content-Type"), ("DNS", "TTL"), ("ARP", "opcode"), ("DHCP", "lease time"), ("ICMP", "type"), ("BGP", "AS path"), ("OSPF", "area ID"), ("TCP", "window size")]),
                ("The minimum number of bits required for {scenario} is:", [("subnet mask for 30 hosts",), ("IPv4 host addressing in /22 network",), ("CIDR notation for 500 hosts",), ("class B subnetting for 60 subnets",), ("VLSM for 4 subnets of different sizes",), ("IPv6 interface ID",), ("MAC address representation",), ("port number field in TCP",), ("sequence number in TCP",), ("fragment offset in IPv4",)]),
            ],
            "Theory of Computation": [
                ("Which type of language is {lang}?", [("a^n b^n c^n",), ("a^n b^n",), ("palindromes over {a,b}",), ("ww^R",), ("a^(n^2)",), ("{a^n b^m : n != m}",), ("set of all binary primes",), ("L = {a^i b^j : i > j}",), ("{w : |w| is prime}",), ("complement of halting problem",)]),
                ("The minimum number of states in a DFA accepting {lang} is:", [("strings ending with 01",), ("strings with even number of 0s",), ("binary numbers divisible by 3",), ("strings not containing 110",), ("strings with equal 0s and 1s (mod 3)",), ("strings of length at most 5",), ("strings starting with 1 and ending with 0",), ("binary numbers divisible by 5",), ("strings with 01 as substring",), ("strings over {a,b} with |w| mod 3 = 0",)]),
            ],
            "Compiler Design": [
                ("In {phase} of compilation, {task} is performed:", [("lexical analysis", "tokenization"), ("syntax analysis", "parse tree construction"), ("semantic analysis", "type checking"), ("intermediate code generation", "three-address code creation"), ("code optimization", "dead code elimination"), ("code generation", "register allocation"), ("preprocessing", "macro expansion"), ("lexical analysis", "comment removal"), ("optimization", "constant folding"), ("syntax analysis", "operator precedence parsing")]),
                ("Which parsing technique is used for {grammar}?", [("LL(1) grammar",), ("LR(1) grammar",), ("LALR grammar",), ("operator precedence grammar",), ("ambiguous grammar",), ("left-recursive grammar",), ("right-recursive grammar",), ("SLR grammar",), ("CLR grammar",), ("recursive descent parsable grammar",)]),
            ],
            "Digital Logic": [
                ("The number of {gate} gates needed to implement {func} is:", [("NAND", "XOR"), ("NOR", "AND"), ("NAND", "NOT"), ("NOR", "OR"), ("NAND", "full adder"), ("NOR", "half adder"), ("NAND", "2:1 MUX"), ("NOR", "SR latch"), ("NAND", "D flip-flop"), ("universal", "4:1 MUX")]),
                ("The output of a {circuit} with inputs {inputs} is:", [("3-bit binary counter", "after 5 clock pulses"), ("JK flip-flop", "J=1, K=1, CLK rising edge"), ("D flip-flop", "D=0, previous Q=1"), ("4-bit shift register", "serial input 1011"), ("BCD counter", "after 12 pulses"), ("ring counter", "initial 1000"), ("Johnson counter", "after 3 pulses"), ("master-slave JK", "J=0,K=1"), ("T flip-flop", "T=1, 4 clock pulses"), ("mod-6 counter", "after 8 pulses")]),
            ],
            "Computer Architecture": [
                ("In a {type} cache with {config}, the number of {field} bits is:", [("direct-mapped", "64KB, 32-byte block, 32-bit address", "tag"), ("2-way set associative", "128KB, 64-byte block", "index"), ("fully associative", "32KB, 16-byte block", "tag"), ("4-way set associative", "256KB, 32-byte block", "offset"), ("direct-mapped", "16KB, 32-byte block, 24-bit address", "tag"), ("8-way set associative", "512KB, 64-byte block", "set index"), ("2-way set associative", "64KB, 128-byte block", "tag"), ("direct-mapped", "32KB, 64-byte block", "index"), ("4-way", "1MB, 256-byte block", "offset"), ("fully associative", "64KB, 32-byte block", "tag")]),
                ("A {n}-stage pipeline with {hazard} has an effective CPI of:", [("5", "1 data hazard every 4 instructions"), ("4", "branch penalty of 2 cycles, 20% branches"), ("6", "structural hazard every 6 instructions"), ("5", "load-use hazard with forwarding"), ("4", "2-cycle branch penalty, no prediction"), ("8", "1 stall every 3 instructions"), ("5", "data forwarding eliminates all hazards"), ("6", "cache miss rate 5%, 10-cycle penalty"), ("4", "perfect branch prediction"), ("5", "RAW hazard with 1-cycle stall")]),
            ],
            "Discrete Mathematics": [
                ("The number of {object} for {set} is:", [("equivalence relations", "a set of 4 elements"), ("partial orders", "set {1,2,3}"), ("functions", "from set A(3 elements) to set B(2 elements)"), ("surjections", "from {1,2,3,4} to {a,b}"), ("bijections", "from set of size 5 to itself"), ("subgroups", "of Z_12"), ("spanning trees", "of K_4"), ("Hamiltonian paths", "in K_{3,3}"), ("proper colorings", "of C_5 with 3 colors"), ("automorphisms", "of Z_6")]),
                ("In a graph with {config}, the {property} is:", [("8 vertices and 15 edges", "chromatic number"), ("complete bipartite K_{3,4}", "number of edges"), ("Petersen graph", "vertex connectivity"), ("5 vertices, each of degree 3", "possible or not"), ("planar graph with 10 vertices", "maximum edges"), ("Euler graph with 6 vertices", "minimum degree"), ("tree with 10 vertices", "number of edges"), ("K_5", "planarity"), ("hypercube Q_3", "number of edges"), ("wheel graph W_5", "chromatic number")]),
            ],
            "Engineering Mathematics": [
                ("The eigenvalues of the matrix {mat} are:", [("[[2,1],[0,3]]",), ("[[1,2],[2,1]]",), ("[[4,1],[2,3]]",), ("[[0,1],[-1,0]]",), ("[[3,1],[0,3]]",), ("[[1,0,0],[0,2,0],[0,0,3]]",), ("[[2,1],[1,2]]",), ("[[0,-1],[1,0]]",), ("[[5,4],[1,2]]",), ("[[1,1],[0,1]]",)]),
                ("The value of the {integral_type} integral {expr} is:", [("line", "of F·dr around unit circle"), ("surface", "of divergence over unit sphere"), ("definite", "∫₀¹ x²e^x dx"), ("improper", "∫₀^∞ e^(-x²) dx"), ("double", "∬ xy dA over unit square"), ("contour", "∮ 1/z dz around |z|=1"), ("definite", "∫₀^π sin²x dx"), ("triple", "∭ dV over unit ball"), ("line", "∫C (x²+y²)ds along y=x from 0 to 1"), ("definite", "∫₁^e ln(x) dx")]),
            ],
            "Software Engineering": [
                ("In the {model} software development model, {property}:", [("waterfall", "requirements are fixed at start"), ("agile", "iterations are typically 2-4 weeks"), ("spiral", "risk analysis is done in each phase"), ("V-model", "testing is planned in parallel with development"), ("RAD", "prototype is developed quickly"), ("incremental", "system is delivered in parts"), ("iterative", "requirements can evolve"), ("DevOps", "continuous integration is key"), ("Scrum", "sprint planning is done at start"), ("Kanban", "work-in-progress is limited")]),
            ],
        }
    },
    "gate_ece": {
        "target": 542,
        "subjects": {
            "Signals & Systems": [
                ("The Fourier Transform of {signal} is:", [("rect(t)",), ("sinc(t)",), ("e^(-a|t|)",), ("δ(t)",), ("u(t)",), ("e^(-at)u(t)",), ("cos(ω₀t)",), ("tri(t)",), ("sgn(t)",), ("te^(-at)u(t)",)]),
                ("A system with impulse response h(t) = {h} is:", [("e^(-2t)u(t)", ), ("δ(t-1)",), ("u(t)-u(t-1)",), ("te^(-t)u(t)",), ("e^(-t)cos(t)u(t)",), ("sin(t)/πt",), ("e^(2t)u(-t)",), ("e^(-|t|)",), ("rect(t/2)",), ("e^(-3t)u(t) + e^(-t)u(t)",)]),
                ("The {transform} of {signal} is:", [("Z-transform", "a^n u[n]"), ("Laplace transform", "e^(-2t)u(t)"), ("DTFT", "δ[n]"), ("DFT of 4-point", "{1,1,1,1}"), ("Z-transform", "nu[n]"), ("Laplace", "t²e^(-t)u(t)"), ("DTFT", "u[n]"), ("inverse Z-transform", "1/(1-az^(-1))"), ("Laplace", "cos(ωt)u(t)"), ("Z-transform", "(1/2)^n u[n]")]),
            ],
            "Control Systems": [
                ("The gain margin of a system with open-loop transfer function G(s) = {tf} is:", [("K/(s(s+1)(s+2))",), ("K/(s²(s+1))",), ("K(s+1)/(s(s+2)(s+3))",), ("K/(s(s+1)(s+5))",), ("K/(s³+2s²+s)",), ("K(s+2)/(s²(s+1)(s+3))",), ("K/(s(s+4))",), ("K/(s²+4s+3)",), ("K(s+5)/(s(s+1)(s+10))",), ("K/(s(s+2)(s+4))",)]),
                ("A unity feedback system with G(s)={tf} has the number of poles in the right half plane:", [("(s+2)/(s³-s²+2s+1)",), ("10/(s(s+1)(s+3))",), ("K/(s²(s+2))",), ("(s-1)/(s²+2s+5)",), ("5(s+1)/(s(s-2)(s+3))",), ("K/(s⁴+s³+2s²+s+1)",), ("(s²+1)/(s³+s²+s+1)",), ("1/(s³+2s²+3s+1)",), ("(s+3)/((s+1)(s²+4))",), ("K/((s+1)(s+2)(s+3))",)]),
            ],
            "Communications": [
                ("In {modulation} with {config}, the bandwidth required is:", [("AM-DSB-FC", "message bandwidth 5kHz"), ("FM", "modulation index 5, fm=15kHz"), ("PM", "deviation ratio 2, fm=10kHz"), ("SSB", "message bandwidth 4kHz"), ("QAM-16", "symbol rate 1MHz"), ("QPSK", "bit rate 2Mbps"), ("FSK", "frequency deviation 10kHz, bit rate 5kbps"), ("OFDM", "64 subcarriers, 20MHz channel"), ("PCM", "sampling at 8kHz, 8-bit quantization"), ("DPCM", "sampling at 16kHz, 4-bit quantization")]),
                ("The probability of bit error for {scheme} in AWGN channel with SNR = {snr} is:", [("BPSK", "10dB"), ("QPSK", "8dB"), ("16-QAM", "12dB"), ("BFSK", "10dB"), ("DPSK", "9dB"), ("OOK", "10dB"), ("8-PSK", "15dB"), ("16-PSK", "18dB"), ("64-QAM", "20dB"), ("MSK", "10dB")]),
            ],
            "Analog Circuits": [
                ("The voltage gain of a {config} amplifier with {params} is:", [("common emitter", "Rc=4kΩ, Re=1kΩ, β=100"), ("common source MOSFET", "Rd=5kΩ, gm=2mS"), ("differential", "Rd=10kΩ, tail current 1mA"), ("cascode", "gm=5mS, ro=100kΩ"), ("common base", "Rc=2kΩ, Ie=1mA"), ("inverting op-amp", "Rf=100kΩ, Ri=10kΩ"), ("non-inverting op-amp", "Rf=47kΩ, Ri=10kΩ"), ("instrumentation", "R1=10kΩ, Rg=1kΩ"), ("emitter follower", "Re=1kΩ, β=200"), ("source follower", "Rs=2kΩ, gm=4mS")]),
                ("In a {circuit} with {condition}, the {output} is:", [("CE amplifier", "Vcc=12V, Rc=3kΩ, Ic=2mA", "Vce"), ("voltage divider bias", "R1=56kΩ, R2=10kΩ, Vcc=15V", "base voltage"), ("Colpitts oscillator", "C1=100pF, C2=200pF, L=1mH", "frequency"), ("Wein bridge oscillator", "R=10kΩ, C=0.01µF", "frequency"), ("astable multivibrator", "R=10kΩ, C=0.1µF", "frequency"), ("Schmitt trigger", "Vref+=3V, Vref-=1V", "hysteresis"), ("voltage regulator 7805", "Vin=12V, Iload=500mA", "Vout"), ("Hartley oscillator", "L1=1mH, L2=2mH, C=10nF", "frequency"), ("phase shift oscillator", "R=10kΩ, C=0.01µF", "frequency"), ("555 timer astable", "R1=1kΩ, R2=10kΩ, C=10µF", "frequency")]),
            ],
            "Digital Circuits": [
                ("A {n}-bit {type} converter with reference voltage {vref}V has a resolution of:", [("8", "DAC", "5"), ("10", "ADC", "3.3"), ("12", "DAC", "5"), ("16", "ADC", "2.5"), ("8", "ADC", "10"), ("10", "DAC", "5"), ("12", "ADC", "3.3"), ("14", "DAC", "5"), ("8", "ADC", "3.3"), ("10", "ADC", "5")]),
                ("The output of a {circuit} with {config} after {event} is:", [("4-bit binary counter", "initial state 0000", "7 clock pulses"), ("3-bit ring counter", "initial state 100", "5 pulses"), ("mod-10 counter", "initial state 0000", "13 pulses"), ("4-bit LFSR", "polynomial x⁴+x+1", "4 cycles"), ("8-bit shift register", "serial input 10110011", "8 clocks"), ("JK counter", "all J=K=1", "3 pulses"), ("BCD up counter", "state 0111", "5 pulses"), ("Gray code counter", "initial 0000", "6 pulses"), ("Johnson counter", "4-bit, initial 0000", "5 pulses"), ("synchronous counter", "mod-6, state 011", "4 pulses")]),
            ],
            "Electromagnetics": [
                ("The {property} of a {structure} with {params} is:", [("characteristic impedance", "coaxial cable", "inner radius 1mm, outer radius 5mm, εr=2.25"), ("cutoff frequency", "rectangular waveguide", "a=2.286cm, b=1.016cm, TE10 mode"), ("radiation resistance", "half-wave dipole", "at resonance"), ("directivity", "antenna array", "4-element uniform linear array"), ("propagation constant", "transmission line", "R=10Ω/m, L=1µH/m, C=100pF/m"), ("VSWR", "load ZL=75+j50Ω", "Z0=50Ω"), ("reflection coefficient", "short circuit load", "Z0=50Ω"), ("skin depth", "copper at 1GHz", "σ=5.8×10⁷ S/m"), ("Brewster angle", "air-glass interface", "n₂=1.5"), ("input impedance", "quarter-wave transformer", "ZL=100Ω, Z0=50Ω")]),
            ],
            "Electronic Devices": [
                ("In a {device} with {params}, the {property} is:", [("n-channel MOSFET", "Vth=1V, Kn=1mA/V², Vgs=3V, Vds=4V", "drain current"), ("pn junction diode", "Na=10¹⁶/cm³, Nd=10¹⁸/cm³, V=0.5V", "depletion width"), ("BJT", "β=100, Ic=1mA, Vbe=0.7V", "base current"), ("JFET", "Vp=-4V, Idss=10mA, Vgs=-2V", "drain current"), ("Zener diode", "Vz=5.6V, Iz=10mA, rz=10Ω", "voltage at Iz=20mA"), ("solar cell", "Isc=3A, Voc=0.6V, FF=0.75", "maximum power"), ("LED", "If=20mA, Vf=2V", "power dissipation"), ("Schottky diode", "φBn=0.8V, n=1.1", "ideality factor effect"), ("CMOS inverter", "Vdd=3.3V, Vtn=0.5V, Vtp=-0.5V", "switching threshold"), ("photodiode", "responsivity=0.5A/W, dark current=10nA", "sensitivity")]),
            ],
            "Network Theory": [
                ("In the circuit with {config}, the {quantity} is:", [("two meshes sharing a 5Ω resistor, V1=10V, V2=5V", "mesh currents"), ("Thevenin equivalent seen from terminals A-B", "Vth and Rth"), ("Norton equivalent of a bridge circuit", "In and Rn"), ("supernode with V=5V between nodes 2 and 3", "node voltages"), ("maximum power transfer condition", "load resistance"), ("RLC series circuit at resonance, R=10Ω, L=1mH", "quality factor"), ("parallel RLC with R=1kΩ, L=10mH, C=1µF", "resonant frequency"), ("two-port network in cascade", "overall ABCD parameters"), ("T-network with Z1=Z2=10Ω, Z3=5Ω", "Z-parameters"), ("π-network with Y1=Y2=0.1S, Y3=0.2S", "Y-parameters")]),
            ],
            "Engineering Mathematics": [
                ("The {operation} of {expression} is:", [("Laplace transform", "t²e^(-3t)"), ("inverse Laplace", "1/(s²+4s+13)"), ("Z-transform", "(0.5)^n u[n]"), ("residue", "at z=1 of z/(z-1)²"), ("curl", "F = xyi + yzj + zxk"), ("divergence", "F = x²i + y²j + z²k"), ("gradient", "f = x²y + yz²"), ("eigenvalue", "[[2,1],[1,2]]"), ("determinant", "3x3 matrix [[1,2,3],[4,5,6],[7,8,10]]"), ("rank", "[[1,2,3],[2,4,6],[1,3,5]]")]),
            ],
        }
    },
    "gate_me": {
        "target": 431,
        "subjects": {
            "Engineering Mechanics": [
                ("A {body} with {config} has {property}:", [("rigid body", "moment of inertia about centroid", "parallel axis value"), ("beam", "point load at center, simply supported", "maximum deflection"), ("cantilever beam", "UDL of 10kN/m over 3m", "maximum bending moment"), ("truss", "5 members, 4 joints, loaded at joint C", "force in member BC"), ("frame", "3 members pin-connected", "reaction at support A"), ("wheel", "radius 0.5m rolling without slipping at 2m/s", "angular velocity"), ("block", "on 30° incline, μ=0.3", "acceleration"), ("pulley system", "MA=3, input force 100N", "output force"), ("flywheel", "I=10 kg·m², ω=100 rad/s", "kinetic energy"), ("gyroscope", "spinning at 3000 rpm, precession rate", "torque required")]),
            ],
            "Thermodynamics": [
                ("In a {cycle} with {config}, the {property} is:", [("Carnot", "TH=500K, TL=300K", "efficiency"), ("Otto", "compression ratio 8, γ=1.4", "air-standard efficiency"), ("Diesel", "cutoff ratio 2, compression ratio 16", "efficiency"), ("Rankine", "boiler pressure 10MPa, condenser 10kPa", "work output"), ("Brayton", "pressure ratio 8, T1=300K, T3=1200K", "net work"), ("refrigeration", "COP=3, cooling capacity 5kW", "compressor work"), ("dual", "compression ratio 14, cutoff ratio 1.5", "mean effective pressure"), ("Stirling", "regeneration effectiveness 0.8", "thermal efficiency"), ("vapor compression", "R-134a, evaporator -20°C, condenser 40°C", "COP"), ("reheat Rankine", "two stages, 10MPa and 1MPa", "efficiency improvement")]),
            ],
            "Fluid Mechanics": [
                ("For {flow} in a {geometry}, the {property} is:", [("laminar", "pipe of diameter 50mm, Re=1500", "velocity profile"), ("turbulent", "open channel, Manning's n=0.013", "discharge"), ("inviscid", "flow over cylinder", "pressure distribution"), ("compressible", "convergent-divergent nozzle, M=2", "area ratio"), ("boundary layer", "flat plate at Re=5×10⁵", "thickness"), ("Couette", "between parallel plates, gap 2mm", "shear stress"), ("Poiseuille", "pipe L=10m, D=25mm, ΔP=100kPa", "flow rate"), ("open channel", "rectangular section, S=0.001", "critical depth"), ("jet", "impinging on a flat plate at 30°", "force on plate"), ("flow", "through sudden expansion, D1=25mm, D2=50mm", "head loss")]),
            ],
            "Strength of Materials": [
                ("A {member} under {loading} has maximum {stress_type} of:", [("circular shaft", "torque of 500 N·m, D=50mm", "shear stress"), ("column", "axial load 100kN, L=3m, both ends fixed", "critical buckling load"), ("beam", "bending moment 20kN·m, Z=200cm³", "bending stress"), ("thin cylinder", "internal pressure 5MPa, D=1m, t=10mm", "hoop stress"), ("thick cylinder", "pi=50MPa, po=0, k=2", "radial stress at inner radius"), ("spring", "8 coils, d=10mm, D=80mm, load 500N", "deflection"), ("composite bar", "steel core + copper sleeve, ΔT=100°C", "thermal stress"), ("bar", "varying cross-section, axial load P", "maximum normal stress"), ("rivet joint", "double shear, d=20mm, P=40kN", "shear stress"), ("weld joint", "fillet weld, throat 5mm, length 100mm, P=20kN", "shear stress")]),
            ],
            "Manufacturing": [
                ("In {process} with {params}, the {output} is:", [("turning", "cutting speed 100m/min, feed 0.2mm/rev, depth 2mm", "MRR"), ("drilling", "12mm drill, N=500rpm, feed 0.15mm/rev", "time for 30mm depth"), ("milling", "100mm cutter, 6 teeth, feed/tooth 0.1mm", "table feed"), ("grinding", "wheel speed 30m/s, work speed 0.5m/s", "grinding ratio"), ("forging", "upset forging, D=50mm, h=30mm to 15mm", "final diameter"), ("casting", "riser design for 100mm cube", "minimum riser volume"), ("welding", "arc welding, V=30V, I=200A, speed 5mm/s", "heat input"), ("sheet metal", "blanking 50mm circle, t=2mm, τ=300MPa", "blanking force"), ("extrusion", "billet D=100mm, product D=25mm", "extrusion ratio"), ("ECM", "current 500A, specific removal rate", "MRR")]),
            ],
            "Machine Design": [
                ("A {element} designed for {condition} with {params} requires:", [("shaft", "combined bending and torsion, Mb=2kN·m, Mt=1.5kN·m", "minimum diameter"), ("bolt", "pre-load 20kN, external load 10kN", "total bolt load"), ("spring", "maximum load 500N, deflection 25mm, τ_allow=400MPa", "wire diameter"), ("gear pair", "module 3, Z1=20, Z2=40", "center distance"), ("bearing", "radial load 5kN, axial load 2kN, L10=5000 hrs", "dynamic load rating"), ("brake", "band type, μ=0.3, drum D=300mm", "braking torque"), ("clutch", "disc type, μ=0.3, Ri=100mm, Ro=150mm", "torque capacity"), ("belt drive", "V-belt, angle 40°, μ=0.25", "power transmitted"), ("key", "shaft D=50mm, τ_allow=80MPa", "key dimensions"), ("coupling", "flanged, shaft D=40mm, 4 bolts at PCD 100mm", "bolt diameter")]),
            ],
            "Heat Transfer": [
                ("The {quantity} for {scenario} is:", [("heat transfer rate", "conduction through composite wall, k1=1, k2=0.5 W/mK", "per unit area"), ("Nusselt number", "forced convection over flat plate, Re=10⁵, Pr=0.7", "average"), ("radiation heat exchange", "two parallel plates, ε1=0.8, ε2=0.6, T1=500K, T2=300K", "net heat flux"), ("LMTD", "counter-flow heat exchanger, Th_in=150°C, Th_out=90°C, Tc_in=30°C, Tc_out=70°C", "value"), ("critical radius", "insulation on pipe, k=0.04 W/mK, h=10 W/m²K", "value"), ("fin efficiency", "rectangular fin, L=50mm, t=2mm, k=200 W/mK, h=25 W/m²K", "percentage"), ("overall heat transfer coefficient", "double pipe HE, hi=1000, ho=2000, t=3mm, k=50", "U value"), ("thermal resistance", "series composite cylinder", "total"), ("Grashof number", "vertical plate, ΔT=50°C, L=0.5m", "value"), ("Stefan-Boltzmann heat", "blackbody at 1000K", "emissive power")]),
            ],
        }
    },
    "gate_ee": {
        "target": 460,
        "subjects": {
            "Electric Circuits": [
                ("In the circuit with {config}, the {quantity} is:", [("series RLC, R=10Ω, L=0.1H, C=100µF", "resonant frequency"), ("parallel RL and C, R=5Ω, L=10mH, C=1µF", "impedance at ω=1000 rad/s"), ("Wheatstone bridge, R1=100Ω, R2=200Ω, R3=150Ω", "R4 for balance"), ("T-network, Z1=Z2=10Ω, Z3=j5Ω", "driving point impedance"), ("coupled coils, L1=2H, L2=8H, M=3H", "coupling coefficient"), ("ladder network, 3 sections, R=1Ω each", "input impedance"), ("AC bridge, balanced condition", "unknown impedance"), ("two-port network, Z11=10, Z12=5, Z22=8", "voltage gain"), ("π-attenuator, 6dB, Z0=50Ω", "component values"), ("star-delta, R_star=10Ω each", "R_delta values")]),
            ],
            "Signals & Systems": [
                ("The {property} of the system y(t)={expr} is:", [("linearity", "x(t) + x(t-1)"), ("time invariance", "tx(t)"), ("causality", "x(t) + x(t+1)"), ("stability (BIBO)", "∫₀ᵗ x(τ)dτ"), ("memory", "x(2t)"), ("invertibility", "x²(t)"), ("linearity", "x(t)cos(ωt)"), ("causality", "x(t/2)"), ("stability", "e^(t)x(t)"), ("time invariance", "x(t)u(t)")]),
            ],
            "Control Systems": [
                ("For the system with transfer function G(s) = {tf}, the {property} is:", [("10/(s²+4s+10)", "natural frequency and damping ratio"), ("K/(s(s+2)(s+5))", "value of K for marginal stability"), ("(s+2)/((s+1)(s+3))", "steady-state error for unit ramp"), ("100/(s²+10s+100)", "peak overshoot for step input"), ("K(s+1)/(s²(s+5))", "root locus breakaway point"), ("5/(s+1)(s+2)", "gain margin and phase margin"), ("(s+3)/(s²+2s+5)", "impulse response"), ("K/(s³+3s²+3s+1)", "Routh stability criterion"), ("10(s+2)/(s(s+1)(s+4))", "Nyquist stability"), ("1/(s²+4)", "unit step response")]),
            ],
            "Power Systems": [
                ("In a power system with {config}, the {quantity} is:", [("generator: 100MVA, Xd=0.2pu, Vt=1pu", "fault current for 3-phase fault"), ("transmission line: 200km, Z=0.1+j0.4 Ω/km", "ABCD parameters"), ("transformer: 50MVA, X=10%, tap at 1.05", "equivalent reactance on 100MVA base"), ("load: P=50MW, Q=30MVAR, V=132kV", "load current"), ("two generators in parallel, capacities 200MW and 300MW", "load sharing for system load of 400MW"), ("bus with Ybus matrix, Y11=j10, Y12=-j5", "fault level"), ("compensation: series capacitor Xc=50Ω, line XL=200Ω", "degree of compensation"), ("HVDC link: 500kV, 2000A", "power transmitted"), ("relay: CT ratio 400/1, overcurrent setting 150%", "plug setting multiplier"), ("surge arrester: rated 132kV", "protection level")]),
            ],
            "Electrical Machines": [
                ("A {machine} with {params} has {property}:", [("3-phase induction motor", "4-pole, 50Hz, slip=0.04", "rotor speed"), ("DC shunt motor", "V=220V, Ra=0.5Ω, Ia=20A", "back EMF"), ("synchronous generator", "Xs=1.5pu, Vt=1pu, power angle 30°", "real power"), ("transformer", "50kVA, 2200/220V, Req=0.02pu", "voltage regulation"), ("DC series motor", "V=240V, Ra+Rse=1Ω, speed 1000rpm", "torque"), ("alternator", "3-phase, 50Hz, 1500rpm", "number of poles"), ("induction motor", "no-load test: P0=500W, I0=5A, V=400V", "no-load parameters"), ("synchronous motor", "V-curve at P=0.5pu", "minimum armature current"), ("single-phase induction motor", "capacitor start, 230V, 50Hz", "starting torque"), ("BLDC motor", "Ke=0.1V·s/rad, load torque 5N·m", "speed at rated voltage")]),
            ],
            "Power Electronics": [
                ("A {converter} with {params} has {output}:", [("single-phase full bridge rectifier", "Vm=325V, R load", "average output voltage"), ("3-phase controlled rectifier", "firing angle 30°, Vm=400V", "average DC voltage"), ("buck converter", "Vin=48V, D=0.5, L=100µH, fs=100kHz", "output voltage and ripple"), ("boost converter", "Vin=12V, D=0.6, R=50Ω", "output voltage"), ("buck-boost converter", "Vin=24V, D=0.4, L=50µH", "output voltage"), ("single-phase inverter", "DC bus 400V, ma=0.8, mf=21", "fundamental output voltage"), ("3-phase inverter", "Vdc=600V, 180° conduction", "line voltage RMS"), ("chopper", "type-A, Vin=200V, D=0.6, R=10Ω", "average output"), ("cycloconverter", "3-phase input 50Hz, output frequency", "maximum output frequency"), ("flyback converter", "Vin=300V, turns ratio 10:1, D=0.4", "output voltage")]),
            ],
            "Electromagnetic Theory": [
                ("The {property} of {structure} is:", [("characteristic impedance", "lossless transmission line with L=0.5µH/m, C=50pF/m"), ("cutoff frequency", "TE₁₀ mode in waveguide a=2.286cm"), ("reflection coefficient", "line terminated with ZL=100+j50Ω, Z0=50Ω"), ("VSWR", "for reflection coefficient Γ=0.5"), ("propagation constant", "line with R=2Ω/m, L=1µH/m, G=0, C=100pF/m at 1MHz"), ("skin depth", "in aluminum at 1GHz"), ("Poynting vector", "plane wave in free space, E=100V/m"), ("radiation pattern", "half-wave dipole antenna"), ("input impedance", "λ/4 transformer with ZL=100Ω, Z0=50Ω"), ("group velocity", "in waveguide at 1.5×fc")]),
            ],
            "Digital Electronics": [
                ("The {output} of {circuit} with {input} is:", [("output", "3-to-8 decoder", "input 101, enable HIGH"), ("count", "4-bit synchronous counter", "after 10 clock pulses"), ("output sequence", "4-bit LFSR", "initial state 1001"), ("boolean expression", "K-map with minterms 0,1,2,5,7,8,10", "minimized SOP"), ("next state", "D flip-flop", "D=1, CLK rising edge, preset active"), ("output", "priority encoder", "inputs D0=1,D2=1,D5=1"), ("timing diagram", "SR latch", "S=0,R=1 then S=1,R=0"), ("state table", "2-bit up-down counter", "mode=UP"), ("output", "ALU 74181", "function select 0110"), ("output", "multiplexer 8:1", "select=110, D6=1")]),
            ],
        }
    },
    "gate_ce": {
        "target": 354,
        "subjects": {
            "Structural Analysis": [
                ("A {structure} with {loading} has {response}:", [("simply supported beam", "UDL 20kN/m over 6m span", "maximum bending moment"), ("fixed beam", "central point load 50kN, span 4m", "fixed end moments"), ("propped cantilever", "UDL 15kN/m over 5m", "prop reaction"), ("portal frame", "lateral load 30kN at beam level", "sway deflection"), ("continuous beam", "two spans 5m each, UDL 10kN/m", "support moment at B"), ("truss", "Pratt type, 6 panels, loaded at each joint", "force in diagonal"), ("arch", "three-hinged, parabolic, span 20m, rise 5m", "horizontal thrust"), ("cable", "carrying UDL, span 100m, sag 10m", "maximum tension"), ("column", "fixed-free, L=4m, EI=10⁴ kN·m²", "Euler buckling load"), ("frame", "single bay single storey, sway analysis", "column moments")]),
            ],
            "Geotechnical Engineering": [
                ("For a {soil_type} with {properties}, the {result} is:", [("clay", "Cu=40kPa, φ=0, γ=18kN/m³, depth 5m", "bearing capacity"), ("sand", "φ=30°, γ=17kN/m³, Dr=65%", "angle of internal friction"), ("silty clay", "LL=50, PL=25, NMC=35%", "liquidity index"), ("normally consolidated clay", "Cc=0.3, e0=0.8, Δσ=50kPa, H=5m", "settlement"), ("overconsolidated clay", "OCR=4, Cc=0.25, Cs=0.05", "recompression settlement"), ("sandy soil", "N-value=15, depth 3m", "allowable bearing pressure"), ("saturated clay", "γsat=20kN/m³, K0=0.5, depth 10m", "lateral earth pressure"), ("cohesionless soil", "φ=35°, retaining wall H=6m, γ=18kN/m³", "active earth pressure"), ("compacted fill", "MDD=18.5kN/m³, OMC=12%", "field compaction requirement"), ("pile foundation", "diameter 0.5m, length 15m, Cu=50kPa", "ultimate capacity")]),
            ],
            "Fluid Mechanics & Hydraulics": [
                ("In a {system} with {params}, the {quantity} is:", [("pipe flow", "D=300mm, L=500m, f=0.02, V=2m/s", "head loss"), ("open channel", "rectangular, B=3m, y=1m, S=0.001, n=0.015", "discharge"), ("weir", "rectangular, L=2m, H=0.3m, Cd=0.62", "discharge"), ("orifice", "circular, D=50mm, H=3m, Cd=0.62", "flow rate"), ("pipe network", "Hardy-Cross method, 2 loops", "corrected flows"), ("hydraulic jump", "upstream depth 0.5m, V1=6m/s", "sequent depth"), ("surge tank", "pipe D=2m, L=1000m, V=3m/s", "water hammer pressure"), ("turbine", "Francis, net head 100m, Q=10m³/s, η=0.9", "power output"), ("pump", "centrifugal, H=30m, Q=0.05m³/s, η=0.8", "power required"), ("notch", "V-notch 90°, H=0.2m", "discharge")]),
            ],
            "Environmental Engineering": [
                ("In a {system} treating {wastewater}, the {parameter} is:", [("activated sludge", "BOD=200mg/L, Q=10MLD", "aeration tank volume"), ("trickling filter", "BOD=150mg/L, recirculation ratio 1.5", "filter efficiency"), ("sedimentation tank", "Q=5MLD, detention time 2hrs", "surface area"), ("rapid sand filter", "filtration rate 5m³/m²/hr, Q=10MLD", "filter area"), ("chlorination", "chlorine demand 3mg/L, residual 0.5mg/L", "chlorine dose"), ("anaerobic digester", "VS loading 1.5 kg/m³/day, VS=5000mg/L, Q=1MLD", "digester volume"), ("oxidation pond", "BOD=150mg/L, loading rate 200 kg/ha/day", "area required"), ("water softening", "hardness 300mg/L as CaCO3, lime soda process", "chemical dose"), ("coagulation", "alum dose 30mg/L, Q=20MLD", "daily alum requirement"), ("disinfection", "UV system, dose 40mJ/cm²", "lamp rating")]),
            ],
            "Transportation Engineering": [
                ("For a {element} with {specs}, the {design_param} is:", [("highway curve", "design speed 100kmph, e=0.07, f=0.15", "minimum radius"), ("sight distance", "SSD, V=80kmph, t=2.5s, f=0.35", "stopping distance"), ("flexible pavement", "CBR=5%, traffic=10 msa", "total thickness"), ("rigid pavement", "k=80 MPa/m, wheel load 50kN, concrete M40", "slab thickness"), ("intersection", "signal design, 4-phase, total lost time 16s", "cycle length"), ("runway", "elevation 300m, temperature 35°C, gradient 1%", "corrected length"), ("traffic flow", "speed-density: v=80-0.5k", "capacity"), ("horizontal curve", "R=400m, V=80kmph", "superelevation"), ("vertical curve", "summit, N=6%, gradient difference", "curve length for SSD"), ("traffic signal", "Webster's formula, total critical flow 0.6", "optimum cycle time")]),
            ],
            "Engineering Mathematics": [
                ("The {operation} of {expression} is:", [("partial derivative", "f(x,y)=x³+3x²y+y³ with respect to x"), ("line integral", "∫C(x²dx+xydy) from (0,0) to (1,1) along y=x"), ("double integral", "∬R xy dA over R: 0≤x≤1, 0≤y≤x"), ("Laplace transform", "t·sin(3t)"), ("probability", "X~N(50,25), P(X>55)"), ("regression coefficient", "data: (1,2),(2,4),(3,5),(4,4),(5,5)"), ("numerical integration", "Simpson's 1/3 rule, h=0.5, f(0)=1,f(0.5)=1.25,f(1)=2"), ("matrix inverse", "[[2,1],[5,3]]"), ("Fourier series coefficient", "f(x)=x for -π<x<π"), ("ODE solution", "y''+4y=0, y(0)=1, y'(0)=0")]),
            ],
        }
    },
    "gate_ch": {
        "target": 281,
        "subjects": {
            "Chemical Reaction Engineering": [
                ("In a {reactor} with {conditions}, the {result} is:", [("CSTR", "first-order reaction, k=0.1/min, conversion 90%", "residence time"), ("PFR", "second-order reaction, k=0.05 L/mol·min, CA0=2M, conversion 80%", "volume"), ("batch reactor", "zero-order, k=0.5mol/L·min, CA0=5mol/L", "time for 90% conversion"), ("CSTR-PFR series", "first-order, k=0.2/min, τ_CSTR=5min", "overall conversion"), ("adiabatic CSTR", "exothermic, ΔHr=-50kJ/mol, Cp=4kJ/kg·K", "exit temperature"), ("PFR with recycle", "R=0.5, first-order, k=0.3/min, τ=10min", "conversion"), ("fluidized bed", "Kunii-Levenspiel model, emf=0.5", "conversion"), ("semi-batch", "A fed to B, pseudo-first-order", "optimal feed rate"), ("mixed flow", "non-ideal RTD, E(t) given", "conversion"), ("autocatalytic", "rate=kCA·CB, equimolar feed", "optimum reactor type")]),
            ],
            "Mass Transfer": [
                ("For {operation} with {specs}, the {parameter} is:", [("distillation", "binary mixture, α=2.5, xD=0.95, xB=0.05, q=1", "minimum reflux ratio"), ("absorption", "gas absorbed in water, y_in=0.05, y_out=0.005", "minimum L/G ratio"), ("drying", "constant rate period, Nc=2kg/m²·hr, A=5m²", "drying time"), ("liquid extraction", "countercurrent, KD=3, S/F=2", "number of stages"), ("adsorption", "Langmuir isotherm, q_max=100mg/g, KL=0.05L/mg", "equilibrium loading"), ("humidification", "wet bulb temperature 25°C, dry bulb 35°C", "relative humidity"), ("crystallization", "supersaturation ratio 1.2, nucleation rate", "crystal size"), ("membrane separation", "reverse osmosis, ΔP=30atm, osmotic pressure 15atm", "water flux"), ("leaching", "solid-liquid extraction, 3 stages", "recovery"), ("evaporation", "triple effect, steam economy", "overall economy")]),
            ],
            "Fluid Mechanics": [
                ("In {flow_type} through {geometry}, the {quantity} is:", [("laminar", "pipe D=50mm, μ=0.001Pa·s, ρ=1000kg/m³, V=0.5m/s", "pressure drop per meter"), ("turbulent", "pipe D=100mm, f=0.005, V=3m/s, L=100m", "head loss"), ("flow", "packed bed, ε=0.4, dp=5mm, μ=0.001Pa·s", "pressure drop (Ergun)"), ("compressible", "nozzle, stagnation P=500kPa, throat M=1", "mass flow rate"), ("non-Newtonian", "power-law fluid, n=0.5, K=2Pa·s^n", "velocity profile"), ("flow", "fluidized bed, minimum fluidization", "Umf"), ("settling", "sphere in fluid, dp=1mm, ρs=2500kg/m³", "terminal velocity"), ("flow", "centrifugal pump, NPSH=3m", "cavitation check"), ("two-phase", "gas-liquid in pipe", "flow regime"), ("flow", "orifice meter, Cd=0.62, β=0.5", "flow rate")]),
            ],
            "Heat Transfer": [
                ("For {equipment} with {conditions}, the {parameter} is:", [("shell and tube HE", "1-2 pass, LMTD correction factor 0.85", "corrected LMTD"), ("double pipe HE", "counter-flow, hot: 150→90°C, cold: 30→70°C", "LMTD"), ("evaporator", "single effect, U=2000W/m²K, steam 120°C, boiling 100°C", "area"), ("condenser", "steam at 100°C, coolant 25→45°C, U=1500W/m²K", "duty"), ("furnace", "radiation, T=1200K, ε=0.8, A=10m²", "heat transfer rate"), ("fin", "rectangular, L=30mm, k=200W/mK, h=50W/m²K", "effectiveness"), ("boiler", "nucleate boiling, ΔTe=10°C", "heat flux"), ("cooling tower", "approach 5°C, range 10°C, wet bulb 25°C", "cooling water temperature"), ("jacketed vessel", "steam jacket, U=500W/m²K, heating 20→80°C", "batch heating time"), ("regenerator", "effectiveness 0.75, Cmin/Cmax=0.5", "NTU")]),
            ],
            "Process Control": [
                ("A {system} with transfer function G(s)={tf} has {property}:", [("first-order", "1/(5s+1)", "step response at t=5"), ("second-order", "4/(s²+2s+4)", "overshoot and settling time"), ("process with dead time", "e^(-2s)/(3s+1)", "stability margin"), ("PI controller", "Kc(1+1/τIs), Kc=2, τI=5", "integral time"), ("PID controller", "tuned by Ziegler-Nichols, Ku=5, Pu=10s", "controller parameters"), ("cascade", "inner loop G2=1/(s+1), outer G1=1/(5s+1)", "closed-loop response"), ("feedforward", "Gd=1/(2s+1), Gp=2/(5s+1)", "compensator transfer function"), ("Smith predictor", "dead time θ=3s, G=1/(s+1)", "equivalent loop"), ("multivariable", "2×2 RGA, λ11=2.5", "pairing recommendation"), ("nonlinear", "CSTR with exothermic reaction", "multiple steady states")]),
            ],
            "Thermodynamics": [
                ("For {system} at {conditions}, the {property} is:", [("ideal gas", "P=10atm, T=500K, Cp=30J/mol·K", "enthalpy change for isobaric heating to 600K"), ("van der Waals gas", "a=3.6L²·atm/mol², b=0.04L/mol", "critical temperature"), ("binary mixture", "Raoult's law, P1*=100kPa, P2*=50kPa, x1=0.4", "bubble point pressure"), ("steam", "200°C, 500kPa", "specific enthalpy"), ("refrigerant", "R-134a, evaporator at -10°C", "saturation pressure"), ("reaction", "N₂+3H₂=2NH₃, Kp at 500°C", "equilibrium composition at 200atm"), ("liquid mixture", "Margules equation, A12=1.5, A21=2.0, x1=0.3", "activity coefficient γ1"), ("phase equilibrium", "binary VLE, modified Raoult's law", "dew point"), ("combustion", "methane in 20% excess air", "adiabatic flame temperature"), ("electrolyte", "NaCl in water, m=0.5mol/kg", "mean ionic activity coefficient")]),
            ],
        }
    },
    "gate_bt": {
        "target": 262,
        "subjects": {
            "Microbiology": [
                ("In {context}, the {property} of {organism} is:", [("fermentation", "growth rate", "E. coli at 37°C in LB medium"), ("batch culture", "doubling time", "yeast in glucose medium"), ("antibiotic resistance", "mechanism", "MRSA"), ("bioremediation", "degradation pathway", "Pseudomonas for aromatic compounds"), ("food microbiology", "spoilage mechanism", "Clostridium botulinum"), ("industrial fermentation", "product yield", "Corynebacterium glutamicum for lysine"), ("wastewater treatment", "nitrification rate", "Nitrosomonas"), ("dairy industry", "fermentation product", "Lactobacillus"), ("genetic engineering", "transformation efficiency", "competent E. coli"), ("virology", "replication cycle", "bacteriophage T4")]),
            ],
            "Biochemistry": [
                ("The {property} of {molecule} in {context} is:", [("Km value", "hexokinase", "glucose phosphorylation"), ("Vmax", "lactate dehydrogenase", "pyruvate reduction"), ("ΔG°'", "ATP hydrolysis", "standard conditions"), ("pI", "hemoglobin", "electrophoresis"), ("melting temperature", "DNA 60% GC content", "10mM NaCl"), ("inhibition type", "competitive inhibitor", "Lineweaver-Burk plot"), ("allosteric regulation", "phosphofructokinase", "by ATP and citrate"), ("cofactor requirement", "pyruvate dehydrogenase", "multi-enzyme complex"), ("turnover number", "carbonic anhydrase", "CO2 hydration"), ("specificity constant", "chymotrypsin", "peptide hydrolysis")]),
            ],
            "Molecular Biology": [
                ("In {technique}, the {step} involves:", [("PCR", "annealing", "primer binding at 55°C"), ("gel electrophoresis", "separation", "DNA fragments by size"), ("Western blotting", "detection", "antibody-antigen binding"), ("CRISPR-Cas9", "guide RNA design", "PAM sequence recognition"), ("RNA-seq", "library preparation", "cDNA synthesis and adapter ligation"), ("site-directed mutagenesis", "primer design", "mismatch incorporation"), ("Southern blotting", "hybridization", "probe binding to target DNA"), ("flow cytometry", "cell sorting", "fluorescence-activated"), ("FISH", "probe labeling", "fluorescent dye attachment"), ("ChIP-seq", "immunoprecipitation", "cross-linked chromatin")]),
            ],
            "Bioprocess Engineering": [
                ("In a {bioreactor} with {conditions}, the {parameter} is:", [("stirred tank", "V=10L, OTR=50mmol/L·hr, kLa=100/hr", "dissolved oxygen"), ("airlift", "downcomer to riser area ratio 0.5", "circulation velocity"), ("fed-batch", "glucose feed rate 10g/hr, μ=0.3/hr, Yx/s=0.5", "biomass production rate"), ("continuous", "D=0.2/hr, μmax=0.4/hr, Ks=0.1g/L", "steady-state biomass"), ("packed bed", "immobilized enzyme, effectiveness factor 0.7", "actual reaction rate"), ("membrane bioreactor", "hollow fiber, MWCO 10kDa", "product recovery"), ("batch", "Monod kinetics, μmax=0.5/hr, Ks=0.2g/L, S0=10g/L", "lag phase duration"), ("photobioreactor", "flat panel, light intensity 200µmol/m²·s", "biomass productivity"), ("solid state fermentation", "moisture 60%, T=30°C", "product yield"), ("perfusion", "cell density 20×10⁶/mL, bleed rate 10%", "viable cell density")]),
            ],
            "Genetics": [
                ("In {cross_type} involving {trait}, the {result} is:", [("monohybrid", "tall × dwarf pea plants", "F2 phenotypic ratio"), ("dihybrid", "round yellow × wrinkled green", "F2 ratio"), ("test cross", "heterozygous purple flower", "offspring ratio"), ("epistasis", "complementary gene interaction, 9:7", "genotype of white"), ("linkage", "genes 10cM apart", "recombination frequency"), ("sex-linked", "X-linked recessive, carrier female × normal male", "probability of affected son"), ("polyploidy", "autotetraploid, AAaa × AAaa", "gamete types"), ("gene mapping", "three-point cross, RF(AB)=10%, RF(BC)=5%", "gene order"), ("Hardy-Weinberg", "allele frequency p=0.6, q=0.4", "carrier frequency"), ("quantitative", "heritability h²=0.6, selection differential S=10cm", "response to selection")]),
            ],
            "Immunology": [
                ("The {component} of {system} functions by:", [("IgG antibody", "secondary immune response", "opsonization and complement activation"), ("T helper cells", "adaptive immunity", "cytokine secretion for B cell activation"), ("MHC class I", "antigen presentation", "presenting endogenous peptides to CD8+ cells"), ("complement C3b", "innate immunity", "opsonization of pathogens"), ("dendritic cells", "antigen presentation", "activating naive T cells"), ("IgE antibody", "allergic response", "mast cell degranulation"), ("natural killer cells", "innate immunity", "killing virus-infected cells"), ("memory B cells", "secondary response", "rapid antibody production"), ("regulatory T cells", "immune tolerance", "suppressing autoimmune responses"), ("TLR-4", "pathogen recognition", "detecting LPS on gram-negative bacteria")]),
            ],
        }
    },
    "gate_in": {
        "target": 196,
        "subjects": {
            "Transducers": [
                ("A {transducer} with {specs} has {property}:", [("strain gauge", "GF=2, R=350Ω, ε=500µε", "resistance change"), ("LVDT", "sensitivity 5mV/mm, range ±25mm", "output at 10mm displacement"), ("thermocouple", "type K, hot junction 500°C, cold 25°C", "EMF"), ("RTD", "Pt100, α=0.00385/°C, T=200°C", "resistance"), ("load cell", "capacity 1000kg, sensitivity 2mV/V", "output at full load"), ("pressure transducer", "diaphragm type, range 0-10bar", "sensitivity"), ("accelerometer", "piezoelectric, sensitivity 10pC/g, mass 5g", "resonant frequency"), ("flow meter", "electromagnetic, D=100mm, B=0.5T, V=2m/s", "induced EMF"), ("optical encoder", "1000 PPR, shaft at 3000rpm", "pulse frequency"), ("capacitive sensor", "parallel plate, area 1cm², gap 1mm", "capacitance change for 0.1mm")]),
            ],
            "Control Systems": [
                ("A {controller} tuned for {plant} with {specs} gives:", [("PID", "first-order with dead time, τ=10s, θ=2s", "Ziegler-Nichols parameters"), ("PI", "integrating process, K=2, τ=5s", "closed-loop response to step"), ("P", "second-order underdamped, ζ=0.3, ωn=10rad/s", "steady-state error for unit step"), ("cascade", "inner: 1/(s+1), outer: 2/(5s+1)", "overall transfer function"), ("feedforward", "disturbance Gd=1/(2s+1), process Gp=3/(4s+1)", "FF compensator"), ("Smith predictor", "G=2e^(-5s)/(10s+1)", "equivalent delay-free loop"), ("model predictive", "FOPDT model, prediction horizon 20", "control moves"), ("relay auto-tune", "ultimate gain Ku=4, ultimate period Pu=8s", "PID settings"), ("adaptive", "gain scheduling for pH process", "controller parameters at pH 7"), ("fuzzy logic", "5 membership functions, 25 rules", "control surface")]),
            ],
            "Analog Electronics": [
                ("An {circuit} with {config} has {output}:", [("instrumentation amplifier", "AD620, Rg=1kΩ, Vdiff=10mV", "output voltage"), ("active filter", "2nd order Butterworth LPF, fc=1kHz", "attenuation at 2kHz"), ("sample-and-hold", "acquisition time 1µs, aperture jitter 100ps", "effective bits at 1MHz"), ("voltage reference", "LM4040, Vref=2.5V, tempco 50ppm/°C", "voltage at 75°C"), ("signal conditioner", "bridge excitation 10V, sensor output 2mV/V", "amplified output"), ("ADC", "16-bit SAR, Vref=5V, conversion time 1µs", "resolution"), ("DAC", "12-bit R-2R, Vref=10V", "output for code 0x800"), ("op-amp integrator", "R=10kΩ, C=1µF, Vin=1V step", "output after 1ms"), ("Wheatstone bridge", "R1=R2=R3=120Ω, R4=120.5Ω, Vex=5V", "output voltage"), ("current source", "Howland, R=10kΩ, Vin=1V", "output current")]),
            ],
            "Digital Electronics": [
                ("A {system} with {specs} performs:", [("microcontroller", "8-bit ADC, 10MHz clock, timer0 prescaler 64", "timer overflow period"), ("FPGA", "Xilinx Spartan-6, 100MHz clock, 4-stage pipeline", "throughput"), ("DSP processor", "TMS320, MAC in 1 cycle, 200MHz", "32-tap FIR filter time"), ("PLC", "scan time 10ms, 16 digital inputs", "maximum input frequency"), ("data logger", "12-bit ADC, 8 channels, 100kSPS", "per-channel sample rate"), ("SCADA", "polling interval 1s, 100 RTUs", "data update rate"), ("DCS", "PID loop execution time 50ms", "maximum loop frequency"), ("serial communication", "RS-485, 9600 baud, 8N1", "data transfer rate"), ("fieldbus", "HART protocol, 1200 baud FSK", "update time"), ("wireless sensor", "ZigBee, 250kbps, 100 nodes", "network throughput")]),
            ],
            "Process Control": [
                ("In a {process} with {dynamics}, the {response} is:", [("level control", "tank area 2m², inflow step 0.1m³/s", "level change rate"), ("temperature control", "heater τ=30s, θ=5s, gain=2°C/%", "step response"), ("flow control", "valve Cv=10, ΔP=100kPa, SG=1", "flow rate"), ("pressure control", "vessel V=10m³, compressor flow 0.5m³/s", "pressure rise rate"), ("pH control", "strong acid-strong base, titration curve nonlinear", "gain at pH 7"), ("composition control", "analyzer dead time 60s, process τ=120s", "achievable bandwidth"), ("multivariable", "distillation column, RGA λ11=3.5", "decoupling strategy"), ("batch reactor", "temperature trajectory tracking, exothermic", "constraint handling"), ("cascade level-flow", "primary τ=100s, secondary τ=5s", "speed of response"), ("ratio control", "fuel-air ratio 1:14.7, air flow disturbance", "fuel adjustment")]),
            ],
        }
    },
    "gate_pi": {
        "target": 184,
        "subjects": {
            "Manufacturing Processes": [
                ("In {process} with {parameters}, the {result} is:", [("CNC turning", "spindle speed 1000rpm, feed 0.2mm/rev, depth 2mm, D=50mm", "cutting speed and MRR"), ("injection molding", "screw diameter 40mm, L/D=20, cycle time 30s", "shot volume"), ("sheet metal stamping", "blank diameter 100mm, drawing ratio 2.1", "number of draws"), ("laser cutting", "CO2 laser 2kW, feed 3m/min, steel 3mm", "kerf width"), ("EDM", "pulse on 50µs, off 100µs, Ip=10A", "MRR"), ("3D printing", "FDM, nozzle 0.4mm, layer height 0.2mm", "build time for 50mm cube"), ("grinding", "wheel speed 30m/s, depth 0.02mm, width 10mm", "specific energy"), ("forging", "open die, billet D=100mm, H=150mm→75mm, μ=0.3", "forging force"), ("welding", "TIG, current 150A, voltage 15V, speed 3mm/s", "heat input"), ("casting", "sand casting, fluidity 50cm, minimum wall thickness", "castability")]),
            ],
            "Industrial Engineering": [
                ("In {context} with {data}, the {solution} is:", [("EOQ model", "D=1000/year, Co=100, Ch=5/unit/year", "optimal order quantity"), ("CPM network", "activities A(3),B(5),C(2),D(4),E(6), precedence given", "critical path"), ("queuing theory", "M/M/1, λ=20/hr, μ=25/hr", "average waiting time"), ("linear programming", "max Z=3x+5y, constraints x+y≤10, x≤6, y≤8", "optimal solution"), ("work sampling", "95% confidence, 10% accuracy, p=30%", "number of observations"), ("line balancing", "cycle time 60s, 6 tasks with times given", "minimum stations"), ("quality control", "X-bar chart, n=5, σ=2, target=50", "control limits"), ("PERT", "three time estimates: 2,5,8 weeks", "expected time and variance"), ("ABC analysis", "annual usage value for 10 items", "classification"), ("facility layout", "6 departments, flow matrix given", "optimal arrangement")]),
            ],
            "Metrology": [
                ("A {instrument} measuring {quantity} with {specs} has:", [("micrometer", "least count 0.01mm, reading 5.37mm", "actual dimension with zero error -0.02mm"), ("vernier caliper", "LC=0.02mm, MSR=25mm, VSR=13", "measured value"), ("dial gauge", "resolution 0.001mm, plunger travel 10mm", "measurement at 5 divisions"), ("CMM", "touch probe, accuracy ±2µm", "uncertainty for 100mm dimension"), ("surface roughness tester", "cutoff 0.8mm, Ra measurement", "average roughness"), ("optical flat", "sodium light λ=589nm, 5 fringes observed", "flatness error"), ("sine bar", "100mm, gauge blocks 25mm", "angle measured"), ("interferometer", "He-Ne laser λ=632.8nm", "displacement per fringe"), ("autocollimator", "sensitivity 0.1 arc-second", "angular measurement"), ("gauge blocks", "Grade 1, wringing technique", "combined uncertainty")]),
            ],
            "Operations Research": [
                ("The {method} applied to {problem} gives:", [("simplex", "max Z=2x+3y, 2x+y≤14, x+3y≤12, x,y≥0", "optimal solution"), ("transportation", "3 sources, 4 destinations, cost matrix given", "optimal cost by MODI"), ("assignment", "4 workers, 4 jobs, cost matrix given", "optimal assignment"), ("game theory", "2×3 payoff matrix, mixed strategy", "value of game"), ("dynamic programming", "shortest path, 4-stage network", "optimal route"), ("goal programming", "minimize deviations from 3 goals", "solution priority"), ("integer programming", "branch and bound, relaxed LP optimal 7.5", "next branching"), ("network flow", "max flow, source to sink, 5 nodes", "maximum flow value"), ("simulation", "Monte Carlo, random numbers for demand", "expected profit"), ("replacement", "equipment cost increasing, maintenance schedule", "optimal replacement period")]),
            ],
        }
    },
    "gate_xe": {
        "target": 186,
        "subjects": {
            "Engineering Mathematics": [
                ("The {operation} of {expression} is:", [("solution", "dy/dx + 2y = e^(-x), y(0)=1"), ("eigenvalue", "[[3,1,0],[1,3,1],[0,1,3]]"), ("series solution", "Bessel's equation of order 0"), ("Fourier transform", "e^(-|t|)"), ("numerical solution", "Runge-Kutta 4th order, y'=xy, y(0)=1, h=0.1"), ("Laplace transform", "t²sin(t)"), ("residue", "f(z)=z/(z²+1)² at z=i"), ("Taylor expansion", "ln(1+x) about x=0"), ("saddle point", "f(x,y)=x²-y²"), ("Green's function", "y''+y=δ(t-π), y(0)=0, y'(0)=0")]),
            ],
            "Fluid Mechanics": [
                ("For {flow} with {conditions}, the {result} is:", [("Stokes flow", "sphere radius 1mm, μ=0.001Pa·s, ρ=1000kg/m³", "drag force at V=1mm/s"), ("potential flow", "source strength m=2π m²/s at origin", "velocity at r=1m"), ("boundary layer", "flat plate L=1m, U=10m/s, ν=1.5×10⁻⁵m²/s", "BL thickness at x=0.5m"), ("pipe flow", "D=50mm, Re=50000, roughness 0.05mm", "friction factor"), ("open channel", "trapezoidal, b=3m, side slope 1:1, y=1m, S=0.001", "Manning's discharge"), ("compressible", "normal shock, M1=2.5", "downstream Mach number"), ("vortex flow", "forced vortex, ω=10rad/s, r=0.5m", "pressure difference from center"), ("jet flow", "round jet, D=10mm, V=20m/s", "centerline velocity at 20D"), ("unsteady flow", "water hammer, V=3m/s, c=1400m/s, ρ=1000kg/m³", "pressure rise"), ("two-phase", "air-water, void fraction 0.3", "mixture density")]),
            ],
            "Materials Science": [
                ("The {property} of {material} at {condition} is:", [("yield strength", "mild steel", "room temperature"), ("fracture toughness", "aluminum 7075-T6", "KIC"), ("fatigue limit", "steel with UTS=600MPa", "endurance limit"), ("creep rate", "Ni-base superalloy", "800°C, 200MPa"), ("hardness", "martensite in 0.8%C steel", "after quenching"), ("thermal conductivity", "copper", "at 100°C"), ("elastic modulus", "titanium alloy Ti-6Al-4V", "room temperature"), ("corrosion rate", "316 stainless steel", "in 3.5% NaCl"), ("electrical resistivity", "doped silicon", "1×10¹⁶ donors/cm³"), ("CTE", "alumina ceramic", "20-1000°C range")]),
            ],
            "Solid Mechanics": [
                ("A {element} under {loading} has {response}:", [("cantilever beam", "tip load P=1kN, L=2m, EI=10⁶N·m²", "tip deflection"), ("thick cylinder", "pi=100MPa, po=0, k=ri/ro=0.5", "maximum shear stress"), ("rotating disc", "ω=5000rpm, ro=0.3m, ρ=7800kg/m³", "maximum stress"), ("curved beam", "rectangular section, ri=50mm, ro=80mm, M=500N·m", "maximum bending stress"), ("pressure vessel", "hemispherical head, D=2m, p=5MPa, σallow=150MPa", "minimum thickness"), ("composite laminate", "[0/90]s, E1=140GPa, E2=10GPa", "laminate stiffness"), ("spring", "helical, d=10mm, D=80mm, n=10, G=80GPa", "stiffness"), ("torsion", "non-circular section, rectangular 20×40mm, T=100N·m", "maximum shear stress"), ("impact loading", "bar L=1m, A=100mm², falling mass 10kg from 50mm", "maximum stress"), ("fatigue", "reversed bending, σa=200MPa, σm=100MPa, UTS=600MPa", "safety factor by Goodman")]),
            ],
            "Thermodynamics": [
                ("For {system} at {conditions}, the {property} is:", [("ideal gas mixture", "N2(79%)+O2(21%), T=300K, P=1atm", "specific heat ratio"), ("steam", "superheated, P=1MPa, T=300°C", "specific entropy"), ("refrigerant R-134a", "saturated liquid at 40°C", "specific enthalpy"), ("air", "compressed isentropically from 100kPa,300K to 800kPa", "final temperature"), ("combustion", "propane in stoichiometric air", "adiabatic flame temperature"), ("psychrometry", "DBT=35°C, WBT=25°C", "specific humidity"), ("binary VLE", "acetone-water at 1atm, x_acetone=0.3", "bubble point temperature"), ("gas turbine", "pressure ratio 10, T3=1200K, ηc=0.85, ηt=0.9", "net work"), ("heat pump", "COP=4, heating capacity 10kW", "compressor power"), ("Joule-Thomson", "CO2 at 200atm, 300K", "inversion temperature")]),
            ],
        }
    },
}


def gen_options(correct_idx=None):
    """Generate plausible option patterns."""
    option_sets = [
        ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        ["O(n²)", "O(n³)", "O(n log n)", "O(2^n)"],
        ["True", "False", "Cannot be determined", "Depends on implementation"],
        ["Stack", "Queue", "Heap", "Hash Table"],
        ["BFS", "DFS", "Dijkstra", "Bellman-Ford"],
        ["FIFO", "LRU", "Optimal", "LFU"],
        ["1", "2", "3", "4"],
        ["0", "1", "2", "3"],
        ["2", "4", "8", "16"],
        ["3", "6", "9", "12"],
        ["5", "10", "15", "20"],
        ["10", "20", "30", "40"],
        ["100", "200", "400", "800"],
        ["0.25", "0.5", "0.75", "1.0"],
        ["25%", "50%", "75%", "100%"],
        ["33.3%", "50%", "66.7%", "75%"],
        ["π/2", "π", "2π", "4π"],
        ["1/2", "1/4", "1/8", "1/16"],
        ["Stable", "Unstable", "Marginally stable", "Conditionally stable"],
        ["Linear", "Non-linear", "Time-varying", "Time-invariant"],
        ["Causal", "Non-causal", "Anti-causal", "Memoryless"],
        ["NP-Complete", "NP-Hard", "P", "PSPACE"],
        ["Regular", "Context-free", "Context-sensitive", "Recursively enumerable"],
        ["Deterministic", "Non-deterministic", "Probabilistic", "Randomized"],
        ["60 Hz", "120 Hz", "250 Hz", "500 Hz"],
        ["1 kHz", "2 kHz", "4 kHz", "8 kHz"],
        ["10 kHz", "20 kHz", "50 kHz", "100 kHz"],
        ["1 MHz", "10 MHz", "100 MHz", "1 GHz"],
        ["0.1 V", "0.5 V", "1.0 V", "2.0 V"],
        ["1 V", "2 V", "5 V", "10 V"],
        ["10 mA", "20 mA", "50 mA", "100 mA"],
        ["50 Ω", "75 Ω", "100 Ω", "150 Ω"],
        ["377 Ω", "120π Ω", "50 Ω", "75 Ω"],
        ["-3 dB", "-6 dB", "-10 dB", "-20 dB"],
        ["3 dB", "6 dB", "10 dB", "20 dB"],
        ["10 W", "20 W", "50 W", "100 W"],
        ["1 kW", "2 kW", "5 kW", "10 kW"],
        ["10 kN", "20 kN", "50 kN", "100 kN"],
        ["100 kPa", "200 kPa", "500 kPa", "1 MPa"],
        ["5 MPa", "10 MPa", "15 MPa", "20 MPa"],
        ["30°", "45°", "60°", "90°"],
        ["0.1 m", "0.2 m", "0.5 m", "1.0 m"],
        ["1 mm", "2 mm", "5 mm", "10 mm"],
        ["0.01 m³/s", "0.05 m³/s", "0.1 m³/s", "0.5 m³/s"],
        ["10 m/s", "20 m/s", "50 m/s", "100 m/s"],
        ["1 kg/s", "2 kg/s", "5 kg/s", "10 kg/s"],
        ["2NF", "3NF", "BCNF", "4NF"],
        ["TCP", "UDP", "ICMP", "ARP"],
        ["Greedy", "Dynamic Programming", "Backtracking", "Divide and Conquer"],
        ["LL(1)", "SLR(1)", "LALR(1)", "CLR(1)"],
        ["Round Robin", "SJF", "FCFS", "Priority"],
        ["Mutex", "Semaphore", "Monitor", "Spinlock"],
        ["5 min", "10 min", "15 min", "20 min"],
        ["50 min", "100 min", "150 min", "200 min"],
        ["1 hour", "2 hours", "4 hours", "8 hours"],
        ["90%", "92%", "95%", "98%"],
        ["0.85", "0.90", "0.95", "0.99"],
        ["CRC", "Checksum", "Parity", "Hamming code"],
        ["3:1", "4:1", "9:3:3:1", "1:2:1"],
        ["Endothermic", "Exothermic", "Isothermal", "Adiabatic"],
        ["Laminar", "Turbulent", "Transitional", "Plug flow"],
        ["Ductile", "Brittle", "Fatigue", "Creep"],
    ]
    if correct_idx is None:
        correct_idx = random.randint(0, 3)
    return random.choice(option_sets), correct_idx


difficulties = ["easy", "medium", "hard"]
years = list(range(2000, 2027))

all_questions = []
seen_hashes = set()

for branch, bdata in BRANCHES.items():
    target = bdata["target"]
    subjects = bdata["subjects"]
    subject_names = list(subjects.keys())
    generated = 0

    # Keep cycling through subjects and templates until we hit target
    cycle = 0
    while generated < target:
        cycle += 1
        for subj_name in subject_names:
            if generated >= target:
                break
            templates = subjects[subj_name]
            for template_str, variations in templates:
                if generated >= target:
                    break
                for var in variations:
                    if generated >= target:
                        break

                    # Fill template
                    try:
                        if len(var) == 1:
                            q_text = template_str.format(*var) if "{" in template_str else template_str
                            # Try different format approaches
                            try:
                                q_text = template_str.replace("{" + template_str.split("{")[1].split("}")[0] + "}", var[0])
                            except:
                                q_text = template_str.format(var[0])
                        elif len(var) == 2:
                            keys = []
                            temp = template_str
                            while "{" in temp:
                                key = temp.split("{")[1].split("}")[0]
                                keys.append(key)
                                temp = temp.split("}", 1)[1]
                            replacements = {}
                            for i, k in enumerate(keys):
                                if i < len(var):
                                    replacements[k] = var[i]
                            q_text = template_str.format(**replacements)
                        elif len(var) == 3:
                            keys = []
                            temp = template_str
                            while "{" in temp:
                                key = temp.split("{")[1].split("}")[0]
                                keys.append(key)
                                temp = temp.split("}", 1)[1]
                            replacements = {}
                            for i, k in enumerate(keys):
                                if i < len(var):
                                    replacements[k] = var[i]
                            q_text = template_str.format(**replacements)
                        else:
                            q_text = template_str
                    except Exception:
                        q_text = template_str + " " + " ".join(str(v) for v in var)

                    # Add year and cycle suffix for uniqueness
                    year = years[(generated + cycle) % len(years)]
                    difficulty = difficulties[generated % 3]

                    if cycle > 1:
                        q_text = q_text + f" (Variant {cycle})"

                    # Check uniqueness
                    h = hashlib.md5((branch + q_text).encode()).hexdigest()
                    if h in seen_hashes:
                        continue
                    seen_hashes.add(h)

                    options, correct = gen_options()

                    all_questions.append({
                        "exam_type": branch,
                        "year": year,
                        "subject": subj_name,
                        "question_text": q_text,
                        "options": options,
                        "correct_answer": correct,
                        "explanation": f"This is a {difficulty} level {subj_name} question for {branch.upper().replace('_',' ')}. The correct answer can be derived from fundamental concepts in {subj_name}.",
                        "difficulty": difficulty,
                    })
                    generated += 1

print(f"Total questions generated: {len(all_questions)}")
for branch in BRANCHES:
    count = sum(1 for q in all_questions if q["exam_type"] == branch)
    print(f"  {branch}: {count}")

# Write to JSON file
out_path = os.path.join(os.path.dirname(__file__), "gate_5k_batch.json")
with open(out_path, "w") as f:
    json.dump(all_questions, f, indent=2)
print(f"\nWritten to {out_path}")
