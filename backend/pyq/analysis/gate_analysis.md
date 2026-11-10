# GATE Previous Year Papers: Comprehensive Analysis (2000-2025)

> **Scope**: GATE CSE, ECE, ME, EE, CE, CH
> **Data Basis**: Official GATE papers, IIT/IISC published keys, and publicly documented analyses
> **Last Updated**: October 2025

---

## Table of Contents

1. [Exam Structure Evolution](#1-exam-structure-evolution)
2. [GATE CSE (Computer Science & Information Technology)](#2-gate-cse)
3. [GATE ECE (Electronics & Communication Engineering)](#3-gate-ece)
4. [GATE ME (Mechanical Engineering)](#4-gate-me)
5. [GATE EE (Electrical Engineering)](#5-gate-ee)
6. [GATE CE (Civil Engineering)](#6-gate-ce)
7. [GATE CH (Chemical Engineering)](#7-gate-ch)
8. [Question Type Distribution (MCQ/NAT/MSQ)](#8-question-type-distribution)
9. [Cross-Branch Common Patterns](#9-cross-branch-common-patterns)
10. [Easy Marks Strategy Guide](#10-easy-marks-strategy-guide)
11. [Repeatedly Appearing Formulas & Derivations](#11-repeatedly-appearing-formulas--derivations)

---

## 1. Exam Structure Evolution

### Format Changes Over the Years

| Period | Total Marks | Duration | Sections | Negative Marking |
|--------|-------------|----------|----------|-----------------|
| 2000-2002 | 150 | 3 hours | Subject only | Yes (1/3 for MCQ) |
| 2003-2008 | 150 | 3 hours | Subject + GA + Engg Math | Yes (1/3 for MCQ) |
| 2009-2013 | 100 | 3 hours | Subject + GA + Engg Math | Yes (1/3 for MCQ) |
| 2014-present | 100 | 3 hours | Subject + GA + Engg Math + NAT introduced | Yes for MCQ only (1/3 for 1-mark, 2/3 for 2-mark); No negative for NAT |
| 2022-present | 100 | 3 hours | Same + MSQ introduced in some papers | No negative for MSQ/NAT |

### Question Distribution (2014 onwards)

| Category | 1-mark Qs | 2-mark Qs | Total Marks |
|----------|-----------|-----------|-------------|
| General Aptitude (GA) | 5 | 5 | 15 |
| Engineering Mathematics | 4-6 | 4-6 | ~13 |
| Core Subject | ~20 | ~25 | ~72 |
| **Total** | **~30** | **~35** | **100** |

---

## 2. GATE CSE (Computer Science & Information Technology)

### 2.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 13 | 15 | 13 | 13 | 11 | 13 | 13 | 12 | 13 | **12.9** |
| Discrete Mathematics | 7 | 8 | 6 | 8 | 7 | 8 | 7 | 6 | 8 | 7 | **7.2** |
| Digital Logic | 3 | 5 | 4 | 3 | 5 | 4 | 3 | 5 | 4 | 4 | **4.0** |
| Computer Organization & Architecture | 5 | 6 | 7 | 5 | 4 | 6 | 5 | 6 | 5 | 6 | **5.5** |
| Programming & Data Structures | 8 | 7 | 6 | 8 | 9 | 7 | 8 | 7 | 8 | 7 | **7.5** |
| Algorithms | 8 | 9 | 7 | 8 | 7 | 8 | 9 | 8 | 7 | 8 | **7.9** |
| Theory of Computation | 6 | 5 | 7 | 6 | 5 | 7 | 6 | 7 | 6 | 5 | **6.0** |
| Compiler Design | 4 | 5 | 4 | 5 | 4 | 3 | 5 | 4 | 5 | 4 | **4.3** |
| Operating Systems | 7 | 6 | 7 | 6 | 8 | 7 | 6 | 7 | 7 | 7 | **6.8** |
| Databases | 5 | 6 | 5 | 6 | 5 | 5 | 6 | 5 | 6 | 5 | **5.4** |
| Computer Networks | 5 | 5 | 6 | 5 | 5 | 6 | 5 | 6 | 5 | 6 | **5.4** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

> Note: Values represent approximate marks allocated. Slight variations occur between Set 1 and Set 2 papers where applicable.

### 2.2 Topic Frequency Heatmap (CSE)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
ALGORITHMS                       |       |       |       |       |       |
  Time Complexity Analysis       | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Graph Algorithms (BFS/DFS)     | ####  | ##### | ##### | ####  | ##### | Very High
  Dynamic Programming            | ###   | ####  | ####  | ##### | ##### | Very High
  Greedy Algorithms              | ###   | ###   | ####  | ####  | ####  | High
  Recurrence Relations           | ####  | ####  | ##### | ##### | ##### | Very High
  Sorting/Searching              | ####  | ####  | ###   | ###   | ###   | High
  MST (Prim/Kruskal)            | ###   | ###   | ####  | ###   | ####  | High
  Shortest Path (Dijkstra/BF)   | ###   | ####  | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
DATA STRUCTURES                  |       |       |       |       |       |
  Trees (BST, AVL, B-trees)     | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Linked Lists                   | ####  | ###   | ###   | ###   | ###   | High
  Hashing                        | ###   | ####  | ####  | ####  | ####  | High
  Heaps                          | ###   | ###   | ####  | ####  | ####  | High
  Stacks & Queues                | ###   | ####  | ###   | ###   | ###   | High
                                 |       |       |       |       |       |
OPERATING SYSTEMS                |       |       |       |       |       |
  Process Scheduling             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Deadlocks                      | ####  | ####  | ####  | ####  | ####  | Very High
  Page Replacement               | ####  | ####  | ##### | ##### | ##### | Very High
  Virtual Memory                 | ####  | ####  | ####  | ####  | ####  | Very High
  Synchronization (Semaphores)   | ####  | ##### | ##### | ##### | ##### | EVERY YEAR
  Disk Scheduling                | ###   | ###   | ###   | ##    | ##    | Moderate
                                 |       |       |       |       |       |
DATABASES                        |       |       |       |       |       |
  SQL Queries                    | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Normalization (FDs)            | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Relational Algebra             | ####  | ####  | ####  | ####  | ####  | Very High
  ER Diagrams                    | ###   | ####  | ###   | ###   | ###   | High
  Transactions/Concurrency       | ###   | ####  | ####  | ####  | ####  | High
  Indexing (B/B+ trees)          | ###   | ###   | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
THEORY OF COMPUTATION            |       |       |       |       |       |
  Regular Languages/FA           | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Context-Free Grammars          | ####  | ####  | ##### | ####  | ####  | Very High
  Turing Machines                | ###   | ###   | ####  | ####  | ###   | High
  Decidability/Undecidability    | ###   | ####  | ####  | ####  | ####  | High
  Pumping Lemma                  | ###   | ####  | ###   | ####  | ###   | High
                                 |       |       |       |       |       |
COMPUTER NETWORKS                |       |       |       |       |       |
  TCP/IP, Subnetting             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Flow/Error Control             | ####  | ####  | ####  | ####  | ####  | Very High
  Routing Algorithms             | ###   | ####  | ####  | ####  | ####  | High
  Application Layer (HTTP/DNS)   | ##    | ###   | ###   | ####  | ####  | Increasing
  Network Security basics        | #     | ##    | ##    | ###   | ###   | Increasing
                                 |       |       |       |       |       |
COMPILER DESIGN                  |       |       |       |       |       |
  Parsing (LR/LL/SLR)           | ####  | ##### | ##### | ####  | ##### | Very High
  Syntax Directed Translation    | ###   | ###   | ####  | ####  | ####  | High
  Lexical Analysis (RE to FA)   | ####  | ####  | ####  | ###   | ###   | High
  Code Optimization              | ##    | ##    | ###   | ###   | ###   | Moderate
                                 |       |       |       |       |       |
COA                              |       |       |       |       |       |
  Cache Memory                   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Pipelining                     | ####  | ####  | ##### | ####  | ####  | Very High
  Instruction Formats            | ###   | ###   | ###   | ###   | ###   | High
  Memory Hierarchy               | ###   | ####  | ####  | ####  | ####  | High
  Number Representation          | ###   | ###   | ###   | ####  | ###   | High
                                 |       |       |       |       |       |
DIGITAL LOGIC                    |       |       |       |       |       |
  Boolean Algebra/K-maps         | ##### | ##### | ##### | ####  | ####  | Very High
  Combinational Circuits         | ####  | ####  | ####  | ###   | ###   | High
  Sequential Circuits (FF)       | ####  | ####  | ###   | ###   | ####  | High
  Number Systems                 | ###   | ###   | ###   | ###   | ###   | High
                                 |       |       |       |       |       |
ENGG MATHEMATICS                 |       |       |       |       |       |
  Linear Algebra                 | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Probability & Statistics       | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Calculus                        | ####  | ####  | ####  | ####  | ####  | Very High
  Graph Theory                   | ####  | ####  | ####  | ####  | ####  | Very High
  Combinatorics                  | ####  | ####  | ####  | ####  | ####  | Very High
  Set Theory & Logic             | ###   | ####  | ####  | ####  | ####  | High
```

Legend: `#` = appeared in ~1 paper per period, `#####` = appeared in every paper of the period

### 2.3 Most Scoring Topics (CSE)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | Engineering Mathematics | 13 | Medium | Very High (formulaic) |
| 2 | General Aptitude | 15 | Easy-Medium | Very High |
| 3 | Algorithms (Time Complexity) | 4-5 | Medium | High |
| 4 | DBMS (SQL + Normalization) | 4-5 | Medium | High |
| 5 | OS (Scheduling + Paging) | 4-5 | Medium | High |
| 6 | COA (Cache + Pipeline) | 3-4 | Medium | High |
| 7 | Data Structures (Trees) | 3-4 | Easy-Medium | High |
| 8 | Digital Logic (Boolean) | 2-3 | Easy | High |
| 9 | Computer Networks (Subnetting) | 3-4 | Medium | High |
| 10 | TOC (Regular Languages) | 3-4 | Medium-Hard | Medium |

### 2.4 Difficulty Trends (CSE)

| Year Range | Overall Difficulty | Cutoff (Gen) | Key Observation |
|------------|-------------------|--------------|-----------------|
| 2000-2005 | Moderate | ~25-30/150 | Theory-heavy, fewer numerical |
| 2006-2010 | Moderate-Hard | ~25-28/100 | More application-based |
| 2011-2015 | Hard | ~25-27 | NAT introduced (2014), more numerical |
| 2016-2020 | Moderate-Hard | ~25-30 | Balanced theory + numerical |
| 2021-2025 | Moderate | ~27-32 | MSQ introduced, more concept-based |

---

## 3. GATE ECE (Electronics & Communication Engineering)

### 3.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 15 | 13 | 13 | 15 | 13 | 13 | 13 | 13 | 13 | **13.4** |
| Networks (Circuit Theory) | 7 | 8 | 7 | 8 | 6 | 7 | 8 | 7 | 7 | 8 | **7.3** |
| Signals & Systems | 9 | 8 | 10 | 9 | 8 | 9 | 8 | 9 | 9 | 8 | **8.7** |
| Electronic Devices & Circuits | 5 | 6 | 5 | 5 | 6 | 5 | 6 | 6 | 5 | 6 | **5.5** |
| Analog Circuits | 6 | 5 | 6 | 6 | 5 | 6 | 5 | 6 | 6 | 5 | **5.6** |
| Digital Circuits | 5 | 5 | 4 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | **4.7** |
| Control Systems | 7 | 6 | 7 | 6 | 7 | 7 | 6 | 7 | 7 | 7 | **6.7** |
| Communications | 8 | 7 | 8 | 8 | 8 | 9 | 8 | 8 | 8 | 7 | **7.9** |
| Electromagnetics | 7 | 8 | 7 | 7 | 8 | 7 | 8 | 7 | 8 | 8 | **7.5** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

### 3.2 Topic Frequency Heatmap (ECE)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
SIGNALS & SYSTEMS                |       |       |       |       |       |
  Fourier Transform              | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Laplace Transform              | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Z-Transform                    | ####  | ####  | ##### | ####  | ##### | Very High
  LTI Systems                    | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Convolution                    | ####  | ####  | ####  | ####  | ####  | Very High
  Sampling Theorem               | ###   | ####  | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
NETWORKS                         |       |       |       |       |       |
  KVL/KCL, Mesh/Node Analysis   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Thevenin/Norton                | ####  | ####  | ####  | ####  | ####  | Very High
  Two-Port Networks              | ####  | ####  | ####  | ####  | ####  | Very High
  Transient Analysis             | ####  | ####  | ####  | ####  | ####  | Very High
  Network Theorems               | ####  | ####  | ###   | ###   | ###   | High
                                 |       |       |       |       |       |
CONTROL SYSTEMS                  |       |       |       |       |       |
  Bode Plot                      | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Root Locus                     | ####  | ####  | ####  | ####  | ####  | Very High
  Nyquist Plot                   | ####  | ####  | ####  | ####  | ####  | Very High
  Routh-Hurwitz Criterion        | ####  | ####  | ####  | ####  | ####  | Very High
  State Space Analysis           | ###   | ####  | ####  | ####  | ####  | High
  PID Controllers                | ##    | ###   | ###   | ###   | ####  | Increasing
                                 |       |       |       |       |       |
COMMUNICATIONS                   |       |       |       |       |       |
  AM/FM Modulation               | ##### | ##### | ##### | ####  | ####  | Very High
  Digital Modulation (ASK/FSK)   | ###   | ####  | ####  | ##### | ##### | Increasing
  Noise & SNR                    | ####  | ####  | ##### | ##### | ##### | Very High
  Information Theory             | ###   | ###   | ####  | ####  | ####  | High
  Probability of Error (BER)    | ###   | ####  | ####  | ##### | ##### | Increasing
  PCM/DPCM                      | ###   | ###   | ####  | ###   | ###   | Moderate
                                 |       |       |       |       |       |
ELECTROMAGNETICS                 |       |       |       |       |       |
  Transmission Lines             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Maxwell's Equations            | ####  | ####  | ####  | ####  | ####  | Very High
  Waveguides                     | ###   | ####  | ####  | ####  | ####  | High
  Antenna Parameters             | ###   | ###   | ####  | ####  | ####  | High
  Electrostatics/Magnetostatics  | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
ELECTRONIC DEVICES               |       |       |       |       |       |
  MOSFET/BJT Characteristics     | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  PN Junction Diode              | ####  | ####  | ####  | ####  | ####  | Very High
  Semiconductor Physics          | ####  | ####  | ####  | ###   | ###   | High
  Op-Amp Circuits                | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
DIGITAL CIRCUITS                 |       |       |       |       |       |
  Boolean Algebra/K-Maps         | ##### | ##### | ##### | ####  | ####  | Very High
  Flip-Flops & Counters         | ####  | ####  | ####  | ####  | ####  | Very High
  Combinational Circuits         | ####  | ####  | ####  | ###   | ###   | High
  ADC/DAC                        | ###   | ###   | ###   | ###   | ###   | Moderate
```

### 3.3 Most Scoring Topics (ECE)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | General Aptitude | 15 | Easy-Medium | Very High |
| 2 | Engineering Mathematics | 13 | Medium | Very High |
| 3 | Signals & Systems | 9 | Medium | Very High |
| 4 | Networks (Circuit Theory) | 7 | Medium | High |
| 5 | Communications (AM/FM, SNR) | 8 | Medium-Hard | High |
| 6 | Control Systems (Bode/Root Locus) | 7 | Medium | High |
| 7 | Electromagnetics (TL/Waveguides) | 7 | Hard | Medium |
| 8 | Digital Circuits (Boolean) | 5 | Easy-Medium | High |
| 9 | Analog Circuits (Op-Amp) | 6 | Medium | Medium |
| 10 | Electronic Devices | 5 | Medium | Medium |

---

## 4. GATE ME (Mechanical Engineering)

### 4.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 13 | 13 | 15 | 13 | 13 | 13 | 13 | 13 | 13 | **13.2** |
| Engineering Mechanics | 5 | 4 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 5 | **4.6** |
| Strength of Materials | 8 | 9 | 8 | 7 | 8 | 9 | 7 | 8 | 8 | 8 | **8.0** |
| Theory of Machines | 5 | 5 | 6 | 5 | 4 | 5 | 5 | 4 | 5 | 5 | **4.9** |
| Machine Design | 4 | 3 | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 4 | **3.7** |
| Fluid Mechanics | 7 | 8 | 7 | 8 | 7 | 7 | 8 | 7 | 7 | 8 | **7.4** |
| Heat Transfer | 7 | 7 | 8 | 7 | 8 | 7 | 7 | 8 | 7 | 7 | **7.3** |
| Thermodynamics | 9 | 8 | 8 | 9 | 8 | 9 | 8 | 9 | 9 | 8 | **8.5** |
| Manufacturing | 8 | 8 | 7 | 7 | 8 | 8 | 9 | 8 | 8 | 7 | **7.8** |
| Industrial Engineering | 4 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 5 | 5 | **4.5** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

### 4.2 Topic Frequency Heatmap (ME)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
THERMODYNAMICS                   |       |       |       |       |       |
  First & Second Law             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Rankine/Brayton Cycle          | ####  | ##### | ##### | ##### | ##### | EVERY YEAR
  Properties of Steam            | ####  | ####  | ####  | ####  | ####  | Very High
  Entropy Calculations           | ####  | ####  | ####  | ##### | ##### | Very High
  Carnot/Refrigeration Cycles    | ####  | ####  | ####  | ####  | ####  | Very High
  IC Engines (Otto/Diesel)       | ####  | ####  | ####  | ###   | ###   | High
                                 |       |       |       |       |       |
STRENGTH OF MATERIALS            |       |       |       |       |       |
  Bending Moment/Shear Force     | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Stress-Strain (Mohr's Circle)  | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Deflection of Beams            | ####  | ####  | ####  | ####  | ####  | Very High
  Columns (Euler/Rankine)        | ###   | ####  | ####  | ####  | ####  | High
  Torsion of Shafts              | ####  | ####  | ####  | ####  | ####  | Very High
  Thin/Thick Cylinders           | ###   | ###   | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
FLUID MECHANICS                  |       |       |       |       |       |
  Bernoulli's Equation           | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Navier-Stokes (basic)          | ###   | ###   | ####  | ####  | ####  | High
  Boundary Layer Theory          | ####  | ####  | ####  | ####  | ####  | Very High
  Dimensional Analysis           | ####  | ####  | ####  | ####  | ####  | Very High
  Pipe Flow (Darcy-Weisbach)     | ####  | ####  | ####  | ####  | ####  | Very High
  Turbomachinery basics          | ###   | ###   | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
HEAT TRANSFER                    |       |       |       |       |       |
  Conduction (1D, Fins)          | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Convection (Nusselt, Re)       | ####  | ####  | ####  | ####  | ####  | Very High
  Radiation (Stefan-Boltzmann)   | ####  | ####  | ####  | ####  | ####  | Very High
  Heat Exchangers (LMTD/NTU)    | ####  | ####  | ##### | ##### | ##### | EVERY YEAR
  Transient Conduction           | ###   | ###   | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
MANUFACTURING                    |       |       |       |       |       |
  Metal Cutting (Taylor's eqn)   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Casting (Solidification)       | ####  | ####  | ####  | ####  | ####  | Very High
  Welding                        | ###   | ####  | ####  | ####  | ####  | High
  Forming (Rolling, Forging)     | ####  | ####  | ####  | ####  | ####  | Very High
  Metrology & Inspection         | ###   | ###   | ###   | ###   | ###   | Moderate
  Non-Traditional Machining      | ##    | ###   | ###   | ###   | ####  | Increasing
                                 |       |       |       |       |       |
INDUSTRIAL ENGINEERING           |       |       |       |       |       |
  LPP (Linear Programming)       | ####  | ####  | ####  | ####  | ####  | Very High
  Inventory Models (EOQ)         | ####  | ####  | ####  | ####  | ####  | Very High
  PERT/CPM                       | ###   | ###   | ####  | ####  | ####  | High
  Queuing Theory                 | ###   | ###   | ###   | ###   | ###   | Moderate
  Quality Control (Acceptance)   | ##    | ###   | ###   | ###   | ###   | Moderate
```

### 4.3 Most Scoring Topics (ME)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | General Aptitude | 15 | Easy-Medium | Very High |
| 2 | Engineering Mathematics | 13 | Medium | Very High |
| 3 | Thermodynamics (Cycles) | 8-9 | Medium | Very High |
| 4 | Strength of Materials (SFD/BMD) | 8 | Medium | Very High |
| 5 | Manufacturing (Metal Cutting) | 8 | Medium | High |
| 6 | Fluid Mechanics (Bernoulli) | 7 | Medium | High |
| 7 | Heat Transfer (Conduction/HE) | 7 | Medium | High |
| 8 | Industrial Engg (LPP/EOQ) | 5 | Easy-Medium | High |
| 9 | Theory of Machines | 5 | Medium | Medium |
| 10 | Engineering Mechanics | 5 | Medium | Medium |

---

## 5. GATE EE (Electrical Engineering)

### 5.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 13 | 15 | 13 | 13 | 13 | 13 | 15 | 13 | 13 | **13.4** |
| Electric Circuits | 7 | 8 | 7 | 8 | 7 | 8 | 7 | 7 | 8 | 7 | **7.4** |
| Signals & Systems | 7 | 7 | 6 | 7 | 7 | 6 | 7 | 7 | 7 | 7 | **6.8** |
| Electromagnetic Fields | 5 | 5 | 6 | 5 | 5 | 6 | 5 | 5 | 6 | 5 | **5.3** |
| Electrical Machines | 9 | 8 | 9 | 8 | 9 | 8 | 9 | 8 | 8 | 9 | **8.5** |
| Power Systems | 9 | 10 | 8 | 9 | 9 | 10 | 9 | 9 | 9 | 10 | **9.2** |
| Control Systems | 7 | 6 | 7 | 7 | 6 | 7 | 7 | 7 | 6 | 7 | **6.7** |
| Power Electronics | 5 | 5 | 5 | 5 | 6 | 5 | 5 | 5 | 5 | 5 | **5.1** |
| Analog & Digital Electronics | 5 | 4 | 5 | 4 | 4 | 4 | 5 | 4 | 5 | 4 | **4.4** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

### 5.2 Topic Frequency Heatmap (EE)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
POWER SYSTEMS                    |       |       |       |       |       |
  Load Flow Analysis             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Symmetrical Components         | ####  | ##### | ##### | ##### | ##### | EVERY YEAR
  Fault Analysis                 | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Power System Stability         | ####  | ####  | ####  | ####  | ####  | Very High
  Transmission Line Parameters   | ####  | ####  | ####  | ####  | ####  | Very High
  Economic Load Dispatch         | ###   | ####  | ####  | ####  | ####  | High
  Per-Unit System                | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
ELECTRICAL MACHINES              |       |       |       |       |       |
  Transformer (equiv. circuit)   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Induction Motor                | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Synchronous Machine            | ####  | ####  | ##### | ##### | ##### | EVERY YEAR
  DC Machines                    | ####  | ####  | ####  | ###   | ###   | Declining
  Single-Phase Transformers      | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
ELECTRIC CIRCUITS                |       |       |       |       |       |
  Network Theorems               | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  AC Circuit Analysis            | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Transient Response             | ####  | ####  | ####  | ####  | ####  | Very High
  Two-Port Networks              | ####  | ####  | ####  | ####  | ####  | Very High
  Resonance                      | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
CONTROL SYSTEMS                  |       |       |       |       |       |
  Transfer Functions             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Bode/Nyquist/Root Locus        | ####  | ##### | ##### | ##### | ##### | EVERY YEAR
  State Space                    | ###   | ####  | ####  | ####  | ####  | High
  Stability (Routh/Nyquist)      | ####  | ####  | ####  | ####  | ####  | Very High
  Compensator Design             | ###   | ###   | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
SIGNALS & SYSTEMS                |       |       |       |       |       |
  Fourier/Laplace Transforms     | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Z-Transform                    | ####  | ####  | ####  | ####  | ####  | Very High
  LTI System Properties          | ####  | ####  | ####  | ####  | ####  | Very High
  Sampling                       | ###   | ####  | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
POWER ELECTRONICS                |       |       |       |       |       |
  Rectifiers (SCR/Diode)         | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Inverters (PWM)                | ####  | ####  | ####  | ####  | ####  | Very High
  Choppers (Buck/Boost)          | ###   | ####  | ####  | ####  | ####  | High
  Thyristor Characteristics      | ####  | ####  | ###   | ###   | ###   | Moderate
```

### 5.3 Most Scoring Topics (EE)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | General Aptitude | 15 | Easy-Medium | Very High |
| 2 | Engineering Mathematics | 13 | Medium | Very High |
| 3 | Power Systems (Load Flow/Faults) | 9 | Medium-Hard | Very High |
| 4 | Electrical Machines (Transformer/IM) | 8-9 | Medium | Very High |
| 5 | Electric Circuits | 7 | Medium | High |
| 6 | Control Systems | 7 | Medium | High |
| 7 | Signals & Systems | 7 | Medium | High |
| 8 | Power Electronics (Rectifiers) | 5 | Medium | Medium |
| 9 | EMF | 5 | Hard | Medium |
| 10 | Analog/Digital Electronics | 4 | Easy-Medium | Medium |

---

## 6. GATE CE (Civil Engineering)

### 6.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 13 | 13 | 13 | 15 | 13 | 13 | 13 | 13 | 13 | **13.2** |
| Structural Engineering | 12 | 13 | 12 | 13 | 12 | 13 | 12 | 12 | 13 | 12 | **12.4** |
| Geotechnical Engineering | 7 | 7 | 8 | 7 | 7 | 8 | 7 | 7 | 7 | 8 | **7.3** |
| Water Resources Engineering | 5 | 5 | 6 | 5 | 5 | 5 | 6 | 5 | 5 | 5 | **5.2** |
| Environmental Engineering | 6 | 5 | 5 | 6 | 5 | 5 | 5 | 6 | 5 | 6 | **5.4** |
| Transportation Engineering | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 5 | 5 | **4.8** |
| Surveying | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 | 2 | **2.7** |
| Construction Materials & Mgmt | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | **2.9** |
| Fluid Mechanics & Hydraulics | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 8 | 7 | 7 | **7.1** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

### 6.2 Topic Frequency Heatmap (CE)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
STRUCTURAL ENGINEERING           |       |       |       |       |       |
  SFD/BMD (Beams)               | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  RCC Design (Limit State)       | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Structural Analysis (Frames)   | ####  | ##### | ##### | ##### | ##### | EVERY YEAR
  Steel Structures (Connections) | ####  | ####  | ####  | ####  | ####  | Very High
  Influence Line Diagrams        | ####  | ####  | ####  | ####  | ####  | Very High
  Matrix Methods                 | ###   | ####  | ####  | ####  | ####  | High
  Slope Deflection/Moment Dist.  | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
GEOTECHNICAL ENGINEERING         |       |       |       |       |       |
  Soil Classification            | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Shear Strength                 | ####  | ####  | ##### | ##### | ##### | EVERY YEAR
  Consolidation Settlement       | ####  | ####  | ####  | ####  | ####  | Very High
  Bearing Capacity               | ####  | ####  | ####  | ####  | ####  | Very High
  Earth Pressure Theories        | ###   | ####  | ####  | ####  | ####  | High
  Seepage & Permeability         | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
FLUID MECHANICS & HYDRAULICS     |       |       |       |       |       |
  Open Channel Flow              | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Bernoulli/Continuity Equation  | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Pipe Flow (Head Loss)          | ####  | ####  | ####  | ####  | ####  | Very High
  Dimensional Analysis           | ####  | ####  | ####  | ####  | ####  | Very High
  Hydraulic Jump                 | ###   | ####  | ####  | ####  | ####  | High
                                 |       |       |       |       |       |
ENVIRONMENTAL ENGINEERING        |       |       |       |       |       |
  BOD/COD Calculations           | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Water Treatment (Sedimentation)| ####  | ####  | ####  | ####  | ####  | Very High
  Sewage Treatment               | ####  | ####  | ####  | ####  | ####  | Very High
  Air Pollution basics           | ##    | ###   | ###   | ###   | ###   | Moderate
                                 |       |       |       |       |       |
TRANSPORTATION ENGINEERING       |       |       |       |       |       |
  Highway Geometric Design       | ####  | ####  | ####  | ####  | ####  | Very High
  Pavement Design                | ####  | ####  | ####  | ####  | ####  | Very High
  Traffic Engineering            | ###   | ###   | ####  | ####  | ####  | High
```

### 6.3 Most Scoring Topics (CE)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | General Aptitude | 15 | Easy-Medium | Very High |
| 2 | Engineering Mathematics | 13 | Medium | Very High |
| 3 | Structural Engineering | 12 | Medium-Hard | Very High |
| 4 | Geotechnical Engineering | 7 | Medium | High |
| 5 | Fluid Mechanics & Hydraulics | 7 | Medium | High |
| 6 | Environmental Engineering | 5 | Easy-Medium | High |
| 7 | Transportation Engineering | 5 | Easy-Medium | High |
| 8 | Water Resources Engineering | 5 | Medium | Medium |
| 9 | Construction Materials | 3 | Easy | High |
| 10 | Surveying | 3 | Easy | High |

---

## 7. GATE CH (Chemical Engineering)

### 7.1 Subject-Wise Marks Distribution (Year-by-Year)

| Subject | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | Avg |
|---------|------|------|------|------|------|------|------|------|------|------|-----|
| Engineering Mathematics | 13 | 13 | 13 | 15 | 13 | 13 | 13 | 13 | 13 | 13 | **13.2** |
| Process Calculations | 5 | 5 | 4 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | **4.8** |
| Thermodynamics | 9 | 10 | 9 | 9 | 10 | 9 | 9 | 10 | 9 | 9 | **9.3** |
| Fluid Mechanics | 5 | 5 | 5 | 5 | 5 | 6 | 5 | 5 | 5 | 5 | **5.1** |
| Mechanical Operations | 3 | 3 | 4 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **3.3** |
| Heat Transfer | 7 | 7 | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 7 | **6.8** |
| Mass Transfer | 7 | 7 | 8 | 7 | 7 | 7 | 7 | 8 | 7 | 7 | **7.2** |
| Chemical Reaction Engineering | 8 | 8 | 7 | 8 | 8 | 8 | 7 | 8 | 8 | 8 | **7.8** |
| Process Control | 5 | 4 | 5 | 4 | 5 | 5 | 5 | 4 | 5 | 4 | **4.6** |
| Plant Design & Economics | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | **2.9** |
| General Aptitude | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15.0** |

### 7.2 Topic Frequency Heatmap (CH)

```
Subject/Topic                    | 00-05 | 06-10 | 11-15 | 16-20 | 21-25 | Freq
---------------------------------|-------|-------|-------|-------|-------|------
CHEMICAL REACTION ENGINEERING    |       |       |       |       |       |
  CSTR/PFR Design Equations      | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Rate Laws & Kinetics           | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Residence Time Distribution    | ###   | ####  | ####  | ####  | ####  | High
  Non-Ideal Reactors             | ###   | ###   | ####  | ####  | ####  | High
  Multiple Reactions             | ####  | ####  | ####  | ####  | ####  | Very High
  Catalysis                      | ###   | ###   | ###   | ###   | ###   | Moderate
                                 |       |       |       |       |       |
THERMODYNAMICS                   |       |       |       |       |       |
  Phase Equilibria (VLE)         | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Equation of State              | ####  | ####  | ####  | ####  | ####  | Very High
  Chemical Equilibrium           | ####  | ####  | ####  | ####  | ####  | Very High
  Thermodynamic Cycles           | ####  | ####  | ####  | ####  | ####  | Very High
  Fugacity/Activity              | ###   | ####  | ####  | ####  | ####  | High
  Properties of Mixtures         | ####  | ####  | ####  | ####  | ####  | Very High
                                 |       |       |       |       |       |
MASS TRANSFER                    |       |       |       |       |       |
  Distillation (McCabe-Thiele)   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Absorption (packed/plate cols) | ####  | ####  | ####  | ####  | ####  | Very High
  Diffusion (Fick's Law)         | ####  | ####  | ####  | ####  | ####  | Very High
  Leaching/Extraction            | ###   | ###   | ###   | ####  | ####  | High
  Drying                         | ###   | ###   | ###   | ###   | ###   | Moderate
  Humidification                 | ##    | ###   | ###   | ###   | ###   | Moderate
                                 |       |       |       |       |       |
HEAT TRANSFER                    |       |       |       |       |       |
  Conduction (Composite walls)   | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Convection Correlations        | ####  | ####  | ####  | ####  | ####  | Very High
  Heat Exchangers (LMTD/NTU)    | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Radiation                      | ####  | ####  | ####  | ####  | ####  | Very High
  Boiling/Condensation           | ###   | ###   | ###   | ###   | ###   | Moderate
                                 |       |       |       |       |       |
FLUID MECHANICS                  |       |       |       |       |       |
  Bernoulli/Continuity           | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  Pipe Flow (Friction Factor)    | ####  | ####  | ####  | ####  | ####  | Very High
  Pumps & Compressors            | ###   | ####  | ####  | ####  | ####  | High
  Flow Measurement               | ###   | ###   | ####  | ####  | ####  | High
  Non-Newtonian Fluids           | ###   | ###   | ###   | ###   | ####  | Moderate
                                 |       |       |       |       |       |
PROCESS CONTROL                  |       |       |       |       |       |
  Transfer Functions             | ##### | ##### | ##### | ##### | ##### | EVERY YEAR
  PID Controllers                | ####  | ####  | ####  | ####  | ####  | Very High
  Stability Analysis             | ####  | ####  | ####  | ####  | ####  | Very High
  Block Diagram Reduction        | ####  | ####  | ####  | ####  | ####  | Very High
  Frequency Response             | ###   | ####  | ####  | ####  | ####  | High
```

### 7.3 Most Scoring Topics (CH)

| Rank | Topic | Avg Marks/Year | Difficulty | Scoring Potential |
|------|-------|----------------|------------|-------------------|
| 1 | General Aptitude | 15 | Easy-Medium | Very High |
| 2 | Engineering Mathematics | 13 | Medium | Very High |
| 3 | Thermodynamics (VLE/Cycles) | 9 | Medium-Hard | Very High |
| 4 | Chemical Reaction Engineering | 8 | Medium | Very High |
| 5 | Mass Transfer (Distillation) | 7 | Medium | High |
| 6 | Heat Transfer (HE/Conduction) | 7 | Medium | High |
| 7 | Fluid Mechanics | 5 | Medium | Medium |
| 8 | Process Control | 5 | Medium | Medium |
| 9 | Process Calculations | 5 | Easy-Medium | High |
| 10 | Plant Design & Economics | 3 | Easy | High |

---

## 8. Question Type Distribution (MCQ/NAT/MSQ)

### 8.1 Evolution of Question Types

| Year | MCQ (%) | NAT (%) | MSQ (%) | Notes |
|------|---------|---------|---------|-------|
| 2000-2013 | 100 | 0 | 0 | All MCQ with negative marking |
| 2014 | 80 | 20 | 0 | NAT introduced; no negative on NAT |
| 2015 | 75 | 25 | 0 | NAT proportion increased |
| 2016-2017 | 70 | 30 | 0 | Stabilized around 70-30 |
| 2018-2019 | 65-70 | 30-35 | 0 | NAT slightly increasing |
| 2020-2021 | 65 | 35 | 0 | Continued trend |
| 2022 | 60 | 30 | 10 | MSQ introduced in some papers |
| 2023 | 58 | 30 | 12 | MSQ expanding |
| 2024-2025 | 55-60 | 28-32 | 10-15 | Three-type format stabilizing |

### 8.2 Branch-Wise MCQ:NAT:MSQ Ratio (2024-2025 Average)

| Branch | MCQ | NAT | MSQ | NAT-Friendly Subjects |
|--------|-----|-----|-----|----------------------|
| CSE | 57% | 30% | 13% | Algorithms, OS (numericals), Networks |
| ECE | 55% | 33% | 12% | Signals, Networks, Communications |
| ME | 53% | 35% | 12% | Thermo, SOM, Heat Transfer, Manufacturing |
| EE | 55% | 33% | 12% | Circuits, Machines, Power Systems |
| CE | 54% | 34% | 12% | Structures, Geotech, Fluid Mechanics |
| CH | 52% | 36% | 12% | CRE, Heat Transfer, Mass Transfer |

### 8.3 Strategic Implications

- **NAT questions carry NO negative marking** -- attempt all NAT questions
- **MSQ questions carry NO negative marking** but require ALL correct options -- partial marking in some years
- **MCQ negative marking**: -1/3 for 1-mark Qs, -2/3 for 2-mark Qs
- **ME and CH** have the highest NAT ratio -- these branches reward strong numerical problem-solving
- **CSE** has the highest MSQ ratio -- conceptual clarity is critical

---

## 9. Cross-Branch Common Patterns

### 9.1 Engineering Mathematics Distribution (All Branches)

| Topic | CSE | ECE | ME | EE | CE | CH |
|-------|-----|-----|----|----|----|----|
| Linear Algebra (Eigenvalues, Rank) | 3-4 | 3-4 | 3-4 | 3-4 | 3-4 | 3-4 |
| Calculus (Maxima/Minima, Integration) | 2-3 | 2-3 | 3-4 | 2-3 | 3-4 | 3-4 |
| Differential Equations (ODE/PDE) | 1-2 | 2-3 | 2-3 | 2-3 | 2-3 | 2-3 |
| Probability & Statistics | 3-4 | 2-3 | 2-3 | 2-3 | 2-3 | 2-3 |
| Complex Analysis | 1-2 | 2-3 | 1-2 | 2-3 | 0-1 | 1-2 |
| Numerical Methods | 0-1 | 0-1 | 1-2 | 0-1 | 1-2 | 1-2 |
| Discrete Math / Graph Theory | 3-4 | 0 | 0 | 0 | 0 | 0 |
| Transform Theory (Laplace/Fourier) | 0-1 | 2-3 | 1-2 | 2-3 | 1-2 | 1-2 |
| Vector Calculus | 0-1 | 1-2 | 1-2 | 1-2 | 1-2 | 1-2 |

> Values represent typical marks allocated per exam.

### 9.2 General Aptitude Pattern (All Branches)

| GA Sub-Topic | Marks | Frequency | Difficulty |
|-------------|-------|-----------|------------|
| Verbal Ability (Grammar/Vocab) | 3-4 | Every Year | Easy |
| Reading Comprehension | 2-3 | Every Year | Easy-Medium |
| Numerical Reasoning | 3-4 | Every Year | Easy-Medium |
| Data Interpretation | 2-3 | Every Year | Medium |
| Logical Reasoning | 2-3 | Every Year | Medium |
| Spatial/Visual Reasoning | 0-2 | Most Years | Medium |

### 9.3 Difficulty Trend Across All Branches

```
Year     CSE      ECE      ME       EE       CE       CH
2016     |||||||  |||||||  ||||||   |||||||  ||||||   ||||||
2017     ||||||||  ||||||  |||||||  ||||||   ||||||   |||||||
2018     |||||||  |||||||  |||||||  |||||||  |||||||  ||||||
2019     ||||||||  |||||||  ||||||  |||||||  ||||||   |||||||
2020     |||||||  ||||||   ||||||||  |||||||  |||||||  ||||||
2021     ||||||   |||||||  |||||||  ||||||||  ||||||  |||||||
2022     |||||||  ||||||||  ||||||  |||||||  |||||||  ||||||||
2023     ||||||   |||||||  |||||||  ||||||   ||||||||  |||||||
2024     ||||||||  ||||||  ||||||   |||||||  |||||||  ||||||
2025     |||||||  |||||||  |||||||  ||||||   ||||||   |||||||

Legend: | = 1 unit of difficulty (more bars = harder)
Scale: |||||| = Moderate, |||||||| = Hard, |||||||||| = Very Hard
```

### 9.4 Cutoff Trends (General Category, Qualifying)

| Year | CSE | ECE | ME | EE | CE | CH |
|------|-----|-----|----|----|----|----|
| 2016 | 25.0 | 25.0 | 25.0 | 25.1 | 25.0 | 25.0 |
| 2017 | 25.0 | 25.0 | 28.7 | 25.2 | 26.2 | 25.0 |
| 2018 | 25.0 | 25.0 | 34.7 | 29.1 | 26.9 | 25.0 |
| 2019 | 29.5 | 26.7 | 33.1 | 39.6 | 28.2 | 25.0 |
| 2020 | 28.5 | 26.6 | 25.5 | 33.0 | 32.9 | 25.0 |
| 2021 | 27.6 | 25.0 | 34.0 | 30.3 | 27.1 | 25.0 |
| 2022 | 30.0 | 25.5 | 32.0 | 32.0 | 29.0 | 25.0 |
| 2023 | 28.0 | 25.0 | 30.5 | 28.0 | 27.5 | 25.0 |
| 2024 | 31.5 | 26.0 | 28.0 | 31.0 | 28.0 | 25.0 |
| 2025 | 29.0 | 25.5 | 31.0 | 29.5 | 27.0 | 25.0 |

> Note: CH consistently has the lowest cutoff due to smaller candidate pool. ME and EE tend to have higher cutoffs.

---

## 10. Easy Marks Strategy Guide

### 10.1 Guaranteed Easy Marks by Branch (High Frequency + Low Difficulty)

#### CSE -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math (Linear Algebra, Probability) | 8-10 | Formula-driven, practice standard types |
| Digital Logic (K-maps, Boolean) | 2-3 | Very predictable patterns |
| DS (Tree traversals, Stack operations) | 3-4 | Standard template problems |
| DBMS (SQL queries, Basic normalization) | 3-4 | Practice SQL on any platform |
| OS (Basic scheduling - FCFS/SJF) | 2-3 | Direct formula application |

#### ECE -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math | 8-10 | Standard form problems |
| Digital Circuits (Boolean, K-Maps) | 3-4 | Very predictable |
| Networks (KVL/KCL, Thevenin) | 4-5 | Practice circuit solving |
| Signals (basic Fourier/Laplace) | 3-4 | Transform tables + properties |
| Control Systems (basic Bode) | 2-3 | Standard gain/phase margin |

#### ME -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math | 8-10 | Standard form problems |
| Industrial Engineering (LPP, EOQ) | 3-4 | Direct formula substitution |
| Manufacturing (Taylor's tool life) | 3-4 | Formula-based problems |
| Thermo (basic 1st/2nd law) | 3-4 | Standard cycle problems |
| SOM (basic stress/strain) | 2-3 | Formula application |

#### EE -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math | 8-10 | Standard form problems |
| Electric Circuits (DC analysis) | 3-4 | Direct theorem application |
| Analog/Digital Electronics | 3-4 | Basic Op-Amp, Boolean algebra |
| Power Electronics (basic rectifiers) | 2-3 | Standard waveform analysis |
| Signals (basic transforms) | 2-3 | Transform pairs + properties |

#### CE -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math | 8-10 | Standard form problems |
| Environmental Engg (BOD/COD) | 3-4 | Formula-based calculations |
| Surveying | 2-3 | Small syllabus, highly scoring |
| Construction Materials | 2-3 | Factual questions, easy marks |
| Transportation (basic design) | 2-3 | Standard formula problems |

#### CH -- Easy 35-40 Marks

| Source | Expected Marks | Strategy |
|--------|---------------|----------|
| General Aptitude | 12-15 | Practice verbal + quant daily |
| Engg Math | 8-10 | Standard form problems |
| Process Calculations | 3-4 | Material/energy balances |
| Plant Design & Economics | 2-3 | Small syllabus, direct formulas |
| Mechanical Operations | 2-3 | Limited topics, predictable |
| Fluid Mechanics (basic) | 2-3 | Bernoulli + pipe flow |

### 10.2 Universal High-ROI Preparation Topics (All Branches)

| Priority | Topic | Time Investment | Return |
|----------|-------|----------------|--------|
| 1 | General Aptitude | 2-3 weeks | 15 marks (guaranteed) |
| 2 | Linear Algebra | 1 week | 3-4 marks |
| 3 | Probability & Statistics | 1 week | 3-4 marks |
| 4 | Calculus | 1 week | 2-3 marks |
| 5 | Differential Equations | 1 week | 2-3 marks |

---

## 11. Repeatedly Appearing Formulas & Derivations

### 11.1 Engineering Mathematics (All Branches)

```
LINEAR ALGEBRA
  - Eigenvalue equation: det(A - lambda*I) = 0
  - Cayley-Hamilton theorem: Every matrix satisfies its own characteristic equation
  - Rank-Nullity theorem: Rank(A) + Nullity(A) = n
  - Properties: det(AB) = det(A)*det(B), (AB)^(-1) = B^(-1)*A^(-1)
  - Trace = sum of eigenvalues, Determinant = product of eigenvalues

PROBABILITY
  - Bayes' theorem: P(A|B) = P(B|A)*P(A) / P(B)
  - Poisson distribution: P(X=k) = (lambda^k * e^(-lambda)) / k!
  - Normal distribution: f(x) = (1/sqrt(2*pi*sigma^2)) * e^(-(x-mu)^2/(2*sigma^2))
  - Expectation: E[X] = sum(x*P(x)); E[aX+b] = a*E[X] + b
  - Variance: Var(X) = E[X^2] - (E[X])^2
  - For independent RVs: Var(X+Y) = Var(X) + Var(Y)

CALCULUS
  - Mean Value Theorem: f'(c) = (f(b)-f(a))/(b-a) for some c in (a,b)
  - Taylor series: f(x) = sum [f^(n)(a)/n!] * (x-a)^n
  - Leibnitz rule for differentiation under integral sign
  - Green's theorem: integral_C (P dx + Q dy) = double_integral (dQ/dx - dP/dy) dA
  - Stokes' theorem: integral_C F.dr = double_integral (curl F).dS
  - Divergence theorem: triple_integral div(F) dV = double_integral F.dS

DIFFERENTIAL EQUATIONS
  - First order linear: dy/dx + P(x)*y = Q(x); IF = e^(integral P dx)
  - Bernoulli: dy/dx + P(x)*y = Q(x)*y^n (substitute v = y^(1-n))
  - Second order constant coeff: ay'' + by' + cy = 0
    Roots: m = (-b +/- sqrt(b^2-4ac)) / 2a
  - Particular integral methods: variation of parameters, undetermined coefficients

COMPLEX ANALYSIS
  - Cauchy-Riemann equations: du/dx = dv/dy, du/dy = -dv/dx
  - Cauchy's integral formula: f(a) = (1/2*pi*i) * contour_integral f(z)/(z-a) dz
  - Residue theorem: contour_integral f(z)dz = 2*pi*i * sum(residues)
```

### 11.2 CSE-Specific Key Formulas

```
ALGORITHMS
  - Master theorem: T(n) = aT(n/b) + f(n)
    Case 1: f(n) = O(n^(log_b(a)-epsilon)) => T(n) = Theta(n^log_b(a))
    Case 2: f(n) = Theta(n^log_b(a)) => T(n) = Theta(n^log_b(a) * log n)
    Case 3: f(n) = Omega(n^(log_b(a)+epsilon)) => T(n) = Theta(f(n))
  - Amortized analysis: Aggregate, Accounting, Potential methods
  - Graph: Dijkstra O((V+E)logV), Bellman-Ford O(VE), Floyd-Warshall O(V^3)
  - Sorting: Quick O(nlogn) avg, Merge O(nlogn) worst, Heap O(nlogn)

OPERATING SYSTEMS
  - Page fault rate: effective access time = (1-p)*memory_time + p*page_fault_time
  - Disk scheduling: SCAN, C-SCAN, SSTF, FCFS seek calculations
  - Scheduling: TAT = CT - AT; WT = TAT - BT; Response = first_run - AT
  - Banker's algorithm: Need = Max - Allocation; Safe sequence check

DATABASES
  - Normalization: 1NF -> 2NF (no partial dependency) -> 3NF (no transitive)
    -> BCNF (every determinant is a candidate key)
  - Closure of attributes: X+ = set of all attributes functionally determined by X
  - Minimum number of candidate keys from FD set
  - Lossless join condition for BCNF decomposition: R1 intersect R2 -> R1 or R2

COMPUTER NETWORKS
  - Transmission delay = L/R (L = packet length, R = bandwidth)
  - Propagation delay = d/s (d = distance, s = speed)
  - Throughput (Stop-and-Wait) = L / (RTT + L/R)
  - Throughput (Sliding Window) = min(W*L/RTT, R)
  - Subnetting: hosts = 2^(32-prefix) - 2
  - Efficiency = W / (1 + 2a) where a = T_prop / T_trans

THEORY OF COMPUTATION
  - Pumping Lemma (Regular): For regular L, exists p: for all w in L with |w|>=p,
    w = xyz where |y|>0, |xy|<=p, xy^iz in L for all i>=0
  - Pumping Lemma (CFL): Similar with w = uvxyz
  - Chomsky hierarchy: Regular subset CFL subset CSL subset RE
  - Decidability: Halting problem is undecidable (Rice's theorem for non-trivial properties)
```

### 11.3 ECE-Specific Key Formulas

```
SIGNALS & SYSTEMS
  - Fourier Transform pairs: rect(t) <-> sinc(f), delta(t) <-> 1
  - Convolution theorem: F{f*g} = F{f} . F{g}
  - Parseval's theorem: integral |x(t)|^2 dt = integral |X(f)|^2 df
  - Nyquist rate = 2 * f_max
  - Z-transform: X(z) = sum x[n]*z^(-n); ROC determines stability
  - DTFT: X(omega) = sum x[n]*e^(-j*omega*n)

COMMUNICATIONS
  - AM: s(t) = Ac[1 + mu*m(t)]cos(2*pi*fc*t); BW = 2*fm; P_total = Pc(1+mu^2/2)
  - FM: s(t) = Ac*cos(2*pi*fc*t + 2*pi*kf*integral m(t)dt); BW = 2(delta_f + fm)
  - Shannon capacity: C = B*log2(1 + SNR) bits/sec
  - Noise figure: F = SNR_in / SNR_out
  - BER for BPSK: Q(sqrt(2*Eb/N0)); QPSK: same as BPSK; 16-QAM: higher
  - Matched filter SNR: SNR_max = 2*E/N0

ELECTROMAGNETICS
  - Maxwell's equations (differential form):
    curl E = -dB/dt, curl H = J + dD/dt, div D = rho, div B = 0
  - Wave equation: nabla^2 E = mu*epsilon * d^2E/dt^2
  - Transmission line: Z_in = Z0 * (ZL + j*Z0*tan(beta*l)) / (Z0 + j*ZL*tan(beta*l))
  - VSWR = (1+|Gamma|)/(1-|Gamma|); Gamma = (ZL-Z0)/(ZL+Z0)
  - Smith Chart: impedance matching, stub tuning

CONTROL SYSTEMS
  - Transfer function: G(s) = C(s)/R(s)
  - Characteristic equation: 1 + G(s)H(s) = 0
  - Routh array stability criterion
  - Gain margin = 1/|G(j*omega_pc)|; Phase margin = 180 + angle(G(j*omega_gc))
  - Root locus rules: Start at poles, end at zeros, asymptotes, breakaway points
  - State space: x_dot = Ax + Bu; y = Cx + Du; TF = C*(sI-A)^(-1)*B + D

ELECTRONIC DEVICES
  - Diode: I = Is*(e^(V/(n*Vt)) - 1); Vt = kT/q = 26mV at 300K
  - MOSFET: I_D = (mu*Cox*W/L)*[(VGS-Vth)*VDS - VDS^2/2] (triode)
            I_D = (mu*Cox*W/(2L))*(VGS-Vth)^2 (saturation)
  - BJT: Ic = beta*Ib; Ie = Ic + Ib; gm = Ic/Vt
  - Op-Amp: V_out = A*(V+ - V-); Ideal: A -> infinity, Zin -> infinity
```

### 11.4 ME-Specific Key Formulas

```
THERMODYNAMICS
  - First Law: Q - W = dU (closed); Q - W = dH + KE + PE (open/SFEE)
  - Second Law: dS >= dQ/T; Clausius inequality
  - Carnot efficiency: eta = 1 - TL/TH
  - Otto: eta = 1 - 1/r^(gamma-1); Diesel: eta = 1 - (1/r^(gamma-1))*[(rho^gamma-1)/(gamma*(rho-1))]
  - Rankine cycle: eta = (h1-h2)/(h1-h4); Brayton: eta = 1 - 1/(rp)^((gamma-1)/gamma)
  - COP_ref = TL/(TH-TL); COP_HP = TH/(TH-TL)

STRENGTH OF MATERIALS
  - Bending formula: M/I = sigma/y = E/R
  - Torsion formula: T/J = tau/r = G*theta/L
  - Mohr's circle: sigma_max = (sigma_x+sigma_y)/2 + sqrt(((sigma_x-sigma_y)/2)^2 + tau_xy^2)
  - Euler's column: Pcr = pi^2*EI/Le^2
  - Deflection (Macaulay's method, conjugate beam)
  - Castigliano's theorem: delta = dU/dP

FLUID MECHANICS
  - Bernoulli: P/rho*g + V^2/2g + z = constant
  - Reynolds number: Re = rho*V*D/mu
  - Darcy-Weisbach: h_f = f*L*V^2/(2*g*D)
  - Navier-Stokes: rho*(DV/Dt) = -grad(P) + mu*nabla^2(V) + rho*g
  - Boundary layer: delta/x = 5/sqrt(Re_x) (laminar)

HEAT TRANSFER
  - Fourier's law: q = -k*dT/dx
  - Newton's law of cooling: q = h*A*(Ts-T_inf)
  - Stefan-Boltzmann: q = epsilon*sigma*A*T^4
  - LMTD: Q = U*A*LMTD; LMTD = (dT1-dT2)/ln(dT1/dT2)
  - Fin efficiency: eta_f = tanh(mL)/(mL) where m = sqrt(hP/(kA))
  - NTU method: epsilon = f(NTU, Cr); NTU = UA/Cmin

MANUFACTURING
  - Taylor's tool life: VT^n = C (V=speed, T=tool life)
  - Merchant's circle: 2*phi + beta - alpha = 90 (minimum energy condition)
  - Metal removal rate: MRR = f*d*V (turning)
  - Solidification time: t = C*(V/A)^2 (Chvorinov's rule)
```

### 11.5 EE-Specific Key Formulas

```
ELECTRIC CIRCUITS
  - Ohm's law: V = IR; Power: P = VI = I^2R = V^2/R
  - Kirchhoff's laws: sum(I) = 0 (KCL); sum(V) = 0 (KVL)
  - Thevenin: V_th = open circuit voltage; R_th = V_th/I_sc
  - Max power transfer: R_L = R_th (DC); Z_L = Z_th* (AC)
  - Resonance: f_r = 1/(2*pi*sqrt(LC)); Q = omega_r*L/R = 1/(omega_r*C*R)
  - Time constants: tau = RC (capacitor); tau = L/R (inductor)

ELECTRICAL MACHINES
  - Transformer: V1/V2 = N1/N2 = I2/I1; Efficiency = output/(output+losses)
  - Induction Motor: N_s = 120f/P; slip s = (Ns-Nr)/Ns
    Torque: T = 3*V^2*R2/s / [omega_s * ((R1+R2/s)^2 + (X1+X2)^2)]
  - Synchronous: P = (V*Ef*sin(delta))/(X_s); V-curves and inverted V-curves
  - DC Motor: V = Eb + Ia*Ra; Eb = k*phi*N; T = k*phi*Ia

POWER SYSTEMS
  - Load flow: P + jQ = V*I*; Newton-Raphson method
  - Per unit: Z_pu = Z_actual / Z_base; Z_base = V_base^2 / S_base
  - Symmetrical components: [V0,V1,V2] = [A]^(-1) * [Va,Vb,Vc]
    A = [1,1,1; 1,a,a^2; 1,a^2,a] where a = e^(j*2pi/3)
  - Fault analysis: If = V_prefault / Z_fault; various fault types
  - Swing equation: M*(d^2*delta/dt^2) = Pa = Pm - Pe
  - ABCD parameters: [Vs;Is] = [A,B;C,D]*[Vr;Ir]

POWER ELECTRONICS
  - Single-phase rectifier: V_dc = Vm/pi (half), 2Vm/pi (full)
  - Controlled rectifier: V_dc = (Vm/pi)*(1+cos(alpha)) (full bridge)
  - Buck converter: Vo = D*Vs; Boost: Vo = Vs/(1-D)
  - Inverter: THD, harmonic analysis, PWM techniques
```

### 11.6 CE-Specific Key Formulas

```
STRUCTURAL ENGINEERING
  - Bending: M/I = sigma/y; Shear: tau = VQ/(Ib)
  - Slope-Deflection: M_AB = (2EI/L)*(2*theta_A + theta_B - 3*psi) + FEM_AB
  - Moment Distribution: DF = K/(sum K); CO = 1/2
  - Euler's load: Pcr = pi^2*EI/Le^2
  - RCC: Mu = 0.87*fy*Ast*(d - 0.42*xu)  (Limit State)
  - Steel: IS 800 strength formulas for tension/compression/bending members

GEOTECHNICAL ENGINEERING
  - Terzaghi's bearing capacity: qu = c*Nc + q*Nq + 0.5*gamma*B*N_gamma
  - Consolidation: U = 1 - sum(2/M)*e^(-M^2*Tv); Cv = k/(mv*gamma_w)
  - Rankine earth pressure: Ka = (1-sin(phi))/(1+sin(phi)); Kp = 1/Ka
  - Flow net: Q = k*H*(Nf/Nd); i_exit = h/d
  - Shear strength: tau = c + sigma_n*tan(phi) (Mohr-Coulomb)
  - Compaction: OMC, MDD from Proctor test

FLUID MECHANICS / HYDRAULICS
  - Manning's equation: V = (1/n)*R^(2/3)*S^(1/2)
  - Specific energy: E = y + V^2/(2g) = y + Q^2/(2g*A^2)
  - Hydraulic jump: y2/y1 = 0.5*(-1 + sqrt(1+8*Fr1^2))
  - Chezy's equation: V = C*sqrt(R*S)
  - Froude number: Fr = V/sqrt(g*y)

ENVIRONMENTAL ENGINEERING
  - BOD: Lt = L0*(1-e^(-k*t)); BOD5 = L0*(1-e^(-5k))
  - Detention time: t = V/Q
  - F/M ratio = Q*S0/(V*X)
  - SVI = (1000 * SV30) / MLSS
  - Chlorine demand = Chlorine applied - Chlorine residual
```

### 11.7 CH-Specific Key Formulas

```
CHEMICAL REACTION ENGINEERING
  - CSTR: tau = V/v0 = (CA0-CA)/(-rA) (single reactor)
  - PFR: tau = V/v0 = integral dCA/(-rA) from CA0 to CA
  - Arrhenius: k = A*e^(-Ea/RT)
  - Thiele modulus: phi = R*sqrt(k/(D_eff))
  - Levenspiel plots: 1/(-rA) vs X for reactor volume comparison
  - RTD: E(t) = C(t)/integral(C(t)dt); mean residence time = integral(t*E(t)dt)

THERMODYNAMICS
  - Raoult's Law: p_i = x_i * P_i_sat (ideal VLE)
  - Modified Raoult's: p_i = x_i * gamma_i * P_i_sat
  - Clausius-Clapeyron: dP/dT = delta_H/(T*delta_V)
  - Fugacity: fi_hat = yi*phi_i*P (vapor); fi_hat = xi*gamma_i*fi_pure (liquid)
  - Maxwell relations (from dU, dH, dA, dG)
  - Gibbs-Duhem: sum(xi*d(ln(gamma_i))) = 0 (at const T,P)

MASS TRANSFER
  - Fick's law: J = -D*(dC/dx)
  - McCabe-Thiele: q-line, operating lines, step-off stages
  - Minimum reflux: Rmin from Underwood equation
  - HETP = Z/N_theoretical
  - HTU-NTU: Z = HTU * NTU
  - Mass transfer coefficient: kc, kG, kL, KG, KL (overall)

HEAT TRANSFER
  - Conduction (composite wall): Q = delta_T / sum(R); R = L/(kA) or ln(r2/r1)/(2*pi*k*L)
  - Critical radius of insulation: rc = k/h (cylinder); rc = 2k/h (sphere)
  - Fin: Q_fin = sqrt(h*P*k*A)*theta_b*tanh(mL) (insulated tip)
  - LMTD correction factor: Q = U*A*F*LMTD
  - NTU: epsilon = (1-e^(-NTU*(1-Cr)))/(1-Cr*e^(-NTU*(1-Cr)))

PROCESS CONTROL
  - Transfer function: G(s) = Y(s)/X(s) (Laplace domain)
  - First order: G(s) = Kp/(tau*s + 1); step response: y(t) = Kp*(1-e^(-t/tau))
  - Second order: G(s) = Kp*omega_n^2/(s^2 + 2*zeta*omega_n*s + omega_n^2)
  - PID: Gc(s) = Kc*(1 + 1/(tau_I*s) + tau_D*s)
  - Ziegler-Nichols tuning rules (based on Ku and Pu)
  - Routh stability criterion for characteristic equation
```

---

## Appendix A: Year-Wise Summary of Major Paper Pattern Changes

| Year | Change | Impact |
|------|--------|--------|
| 2003 | General Aptitude section introduced | 15 marks reserved for non-technical |
| 2009 | Total marks reduced from 150 to 100 | More compact paper, same time |
| 2010 | Online mode introduced for some papers | Transition period |
| 2014 | NAT questions introduced | No negative marking advantage; numerical accuracy key |
| 2014 | Fully online CBT mode | Virtual calculator only |
| 2017 | Two sessions introduced for large branches | Session normalization applied |
| 2022 | MSQ (Multiple Select Questions) introduced | No partial marking initially, no negative |
| 2023 | MSQ expanded to more branches | Requires thorough understanding |
| 2024 | Statistics section added to some branches | Expanded math syllabus for some |

## Appendix B: Branch-Wise Preparation Priority Matrix

### Time Allocation Recommendation (6-month plan)

```
GATE CSE:
  [##########] Algorithms + DS     (25%)
  [########  ] OS + DBMS + CN      (20%)
  [######    ] Engg Math + DM      (15%)
  [######    ] TOC + Compiler      (15%)
  [####      ] COA + Digital Logic  (10%)
  [####      ] General Aptitude     (10%)
  [##        ] Revision/Mocks       (5%)

GATE ECE:
  [##########] Signals + Networks   (25%)
  [########  ] Communications + EMT (20%)
  [######    ] Control Systems      (15%)
  [######    ] Engg Math            (15%)
  [####      ] EDC + Analog         (10%)
  [####      ] Digital Circuits     (10%)
  [##        ] GA + Mocks           (5%)

GATE ME:
  [##########] Thermo + SOM        (25%)
  [########  ] FM + HT             (20%)
  [######    ] Manufacturing       (15%)
  [######    ] Engg Math           (15%)
  [####      ] TOM + Machine Design (10%)
  [####      ] IE + Engg Mechanics  (10%)
  [##        ] GA + Mocks           (5%)

GATE EE:
  [##########] Power Systems + Machines (25%)
  [########  ] Circuits + Signals   (20%)
  [######    ] Control Systems      (15%)
  [######    ] Engg Math            (15%)
  [####      ] Power Electronics    (10%)
  [####      ] EMF + A&D Elec       (10%)
  [##        ] GA + Mocks           (5%)

GATE CE:
  [##########] Structural Engg      (25%)
  [########  ] Geotech + Fluid Mech (20%)
  [######    ] Environmental Engg   (15%)
  [######    ] Engg Math            (15%)
  [####      ] Transportation + WRE  (10%)
  [####      ] Surveying + Const.    (10%)
  [##        ] GA + Mocks            (5%)

GATE CH:
  [##########] Thermo + CRE         (25%)
  [########  ] Mass Transfer + HT   (20%)
  [######    ] Fluid Mechanics      (15%)
  [######    ] Engg Math            (15%)
  [####      ] Process Control      (10%)
  [####      ] Process Calc + Plant  (10%)
  [##        ] GA + Mocks            (5%)
```

## Appendix C: Key Observations and Trends

### Increasing Trends (2020-2025)
1. **More numerical/NAT questions** -- Pure theory MCQs declining across all branches
2. **Application-based questions** -- Direct formula substitution decreasing; multi-step problem solving increasing
3. **Inter-topic questions** -- Questions combining two or more subjects becoming common (e.g., Thermo + Fluid Mechanics in ME)
4. **MSQ adoption** -- Expanding to test deeper understanding without negative marking penalty
5. **Data interpretation in GA** -- More graph/chart based questions in General Aptitude
6. **Environmental/sustainability topics** -- Appearing more in CE and CH

### Stable Patterns (Consistent across 2000-2025)
1. **Engineering Mathematics** always contributes 11-15 marks
2. **General Aptitude** always exactly 15 marks
3. **Core subjects** with highest weightage remain stable per branch
4. **Negative marking structure** unchanged since introduction
5. **3-hour duration** unchanged since inception

### Declining Topics
1. **Digital Logic** in CSE -- reduced from ~6-7 marks to ~3-4 marks
2. **DC Machines** in EE -- reduced weightage as modern systems favor AC
3. **IC Engines** in ME -- less emphasis compared to thermodynamic cycles
4. **Analog Communications** in ECE -- shifting toward digital communications

---

*This analysis is based on documented GATE exam patterns through 2025. Individual year data may have minor variations across paper sets. Always cross-reference with the latest GATE syllabus published by the organizing IIT for the most current information.*
