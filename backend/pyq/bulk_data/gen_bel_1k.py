"""Generate 1000 BEL PE Electronics questions and save as bel_1k.json."""
import json, random, hashlib, os
from collections import Counter

random.seed(2026_10_31)

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 1: Electronic Devices & Circuits (EDC) — 120 questions
# ═══════════════════════════════════════════════════════════════════════════

EDC = {
    "PN Junction & Diodes": [
        "A silicon PN junction diode has doping concentrations NA = {NA}×10¹⁶/cm³ and ND = {ND}×10¹⁵/cm³. The built-in potential at 300K is:",
        "The reverse saturation current of a diode is {Is} nA. At {T}°C, the diode current for forward bias of {Vf} V is:",
        "The depletion width of a PN junction with NA = {NA}×10¹⁶/cm³, ND = {ND}×10¹⁵/cm³ at reverse bias of {Vr} V is:",
        "A Zener diode has breakdown voltage {Vz} V and maximum power rating {Pz} mW. The maximum allowable current is:",
        "The diffusion capacitance of a forward-biased diode at current {Id} mA with transit time {tau} ns is:",
        "The junction capacitance of a varactor diode varies as C ∝ V^(-1/{n}). For voltage change from {V1}V to {V2}V, the capacitance ratio is:",
        "In a half-wave rectifier with load resistance {RL} kΩ and filter capacitor {C} μF, the ripple factor is:",
        "The PIV of each diode in a bridge rectifier with transformer secondary voltage {Vs} Vrms is:",
        "A full-wave rectifier with {Vs} Vrms secondary voltage has DC output voltage of:",
        "The dynamic resistance of a diode at forward current {Id} mA and temperature {T}°C is:",
        "The transition capacitance of an abrupt PN junction at reverse bias {Vr} V with zero-bias capacitance {C0} pF is:",
        "For a silicon diode, the cut-in voltage is approximately:",
    ],
    "BJT Biasing & Analysis": [
        "A BJT has β = {beta} and ICBO = {Icbo} nA. The collector current when base current is {Ib} μA is:",
        "In a voltage divider bias circuit with R1 = {R1} kΩ, R2 = {R2} kΩ, RC = {RC} kΩ, RE = {RE} kΩ, VCC = {VCC} V, the Q-point ICQ is:",
        "The stability factor S for a fixed-bias BJT circuit with β = {beta} is:",
        "A CE amplifier with RC = {RC} kΩ, RE = {RE} Ω, β = {beta}, has voltage gain Av approximately:",
        "The h-parameter model of a BJT has hfe = {beta}, hie = {hie} Ω. The current gain Ai in CE configuration is:",
        "In a common-base configuration, if α = {alpha}, the common-emitter current gain β is:",
        "The collector-emitter saturation voltage VCE(sat) of a BJT is typically:",
        "A BJT in active region has VBE = {VBE} V and IC = {Ic} mA. The transconductance gm is:",
        "The Early voltage VA = {VA} V and IC = {Ic} mA. The output resistance ro is:",
        "For a BJT with β = {beta}, the base current for IC = {Ic} mA is:",
        "The thermal runaway condition in a BJT occurs when:",
        "The Ebers-Moll model parameter αF = {alpha} and IES = {Is} nA. The collector current in active mode for VBE = {VBE} V is:",
    ],
    "FET & MOSFET": [
        "A JFET has IDSS = {IDSS} mA and VP = -{VP} V. The drain current at VGS = -{VGS} V is:",
        "An n-channel MOSFET has Kn = {Kn} mA/V², VTH = {VTH} V. The drain current in saturation at VGS = {VGS_val} V is:",
        "The transconductance of a MOSFET operating at ID = {Id} mA with Kn = {Kn} mA/V² is:",
        "A MOSFET with W/L = {WL}, μnCox = {unCox} μA/V², VTH = {VTH} V operates at VGS = {VGS_val} V, VDS = {VDS} V. The region of operation is:",
        "The channel length modulation parameter λ = {lambda_ch} V⁻¹. The output resistance at ID = {Id} mA is:",
        "For a CMOS inverter with (W/L)p = {WLp} and (W/L)n = {WLn}, μn/μp = {ratio}, the switching threshold voltage is:",
        "The gate oxide thickness of a MOSFET is {tox} nm. The oxide capacitance per unit area is:",
        "An E-MOSFET has VGS(th) = {VTH} V. The minimum VGS for the device to conduct is:",
        "A depletion MOSFET with IDSS = {IDSS} mA and VP = {VP} V. The drain current at VGS = +{VGS_pos} V is:",
        "The body effect coefficient γ = {gamma} V^(1/2). The threshold voltage shift for VSB = {VSB} V is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 2: Analog Electronics — 130 questions
# ═══════════════════════════════════════════════════════════════════════════

ANALOG = {
    "Op-Amp Circuits": [
        "An inverting amplifier has Rf = {Rf} kΩ and R1 = {R1} kΩ. The voltage gain is:",
        "A non-inverting amplifier with R1 = {R1} kΩ and Rf = {Rf} kΩ has gain:",
        "An op-amp integrator with R = {R_int} kΩ and C = {C_int} nF has output for a {Vin} V step input after {t_int} ms:",
        "The CMRR of an op-amp with differential gain Ad = {Ad} dB and common mode gain Acm = {Acm} dB is:",
        "A summing amplifier with Rf = {Rf} kΩ, R1 = {R1} kΩ, R2 = {R2} kΩ. For V1 = {V1} V, V2 = {V2} V, output is:",
        "The slew rate of an op-amp is {SR} V/μs. The maximum frequency for undistorted {Vp} V peak sinusoidal output is:",
        "An instrumentation amplifier with R1 = {R1} kΩ, R2 = {R2} kΩ, RG = {RG} Ω. The overall gain is:",
        "A voltage follower (unity gain buffer) has input impedance approximately:",
        "The gain-bandwidth product of an op-amp is {GBW} MHz. At gain = {gain}, the bandwidth is:",
        "An op-amp differential amplifier with R1 = R3 = {R1} kΩ, R2 = R4 = {Rf} kΩ has differential gain:",
        "The offset voltage of an op-amp is {Vos} mV. For a non-inverting gain of {gain}, the output offset is:",
        "An active low-pass filter with R = {R_filt} kΩ and C = {C_filt} nF has cutoff frequency:",
    ],
    "Oscillators": [
        "A Wien bridge oscillator with R = {R_osc} kΩ, C = {C_osc} nF has oscillation frequency:",
        "The Barkhausen criterion for oscillation requires loop gain magnitude of:",
        "A Colpitts oscillator with L = {L_osc} mH, C1 = {C1_osc} pF, C2 = {C2_osc} pF has frequency:",
        "A Hartley oscillator with C = {C_osc} pF, L1 = {L1_osc} μH, L2 = {L2_osc} μH has frequency:",
        "A crystal oscillator has series resonant frequency {fs} MHz and parallel resonant frequency {fp} MHz. The quality factor is approximately:",
        "In a phase-shift oscillator using RC sections, the phase shift per section is:",
        "The frequency stability of a crystal oscillator is typically:",
        "An astable multivibrator using 555 timer with R1 = {R1_555} kΩ, R2 = {R2_555} kΩ, C = {C_555} nF has frequency:",
    ],
    "Filters & ADC/DAC": [
        "A second-order Butterworth low-pass filter has -3dB frequency at {fc} kHz. The attenuation at {f2} kHz is:",
        "A Chebyshev Type-I filter of order {n_filt} with {ripple} dB passband ripple. The stopband rolloff rate is:",
        "An {n_bit}-bit DAC with reference voltage {Vref} V has resolution:",
        "A successive approximation ADC with {n_bit}-bit resolution and clock {fclk} MHz has conversion time:",
        "The quantization error of a {n_bit}-bit ADC with full-scale range {Vfs} V is:",
        "A flash ADC with {n_bit}-bit resolution requires how many comparators:",
        "The SNR of an ideal {n_bit}-bit ADC is approximately:",
        "A dual-slope ADC provides {n_bit}-bit resolution with integration time {t_int} ms. The conversion rate is:",
        "An R-2R ladder DAC with {n_bit} bits and Vref = {Vref} V. The output for digital input {digital} is:",
        "The Nyquist rate for a signal bandlimited to {fmax} kHz is:",
    ],
    "Power Electronics Basics": [
        "An SCR has holding current {Ih} mA and latching current {Il} mA. The gate trigger current is {Ig} mA. The minimum load current to keep SCR ON is:",
        "A full-bridge inverter with DC input {Vdc} V has RMS output voltage of:",
        "A single-phase half-controlled bridge rectifier with firing angle α = {alpha_deg}° and supply voltage {Vs} Vrms has average output voltage:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 3: Digital Electronics & Microprocessors — 150 questions
# ═══════════════════════════════════════════════════════════════════════════

DIGITAL = {
    "Boolean Algebra & Logic Gates": [
        "Simplify the Boolean expression: F = A'B + AB' + AB using Boolean algebra:",
        "The minimal SOP expression for F(A,B,C) = Σm({m1},{m2},{m3},{m4}) is:",
        "A {n_input}-input NAND gate can implement which universal functions:",
        "The number of minterms in a {n_var}-variable Boolean function is:",
        "The dual of expression F = AB + C'D is:",
        "De Morgan's theorem states (A+B)' equals:",
        "The canonical POS form of F(A,B,C) = Σm({m1},{m2},{m3}) is:",
        "A NAND gate with one input tied to the other input acts as:",
        "The number of Boolean functions possible with {n_var} variables is:",
        "XOR gate output for inputs A={bit1}, B={bit2} is:",
        "The logic gate whose output is HIGH only when all inputs are HIGH is:",
        "A 2-input XNOR gate is equivalent to:",
    ],
    "K-maps & Minimization": [
        "Using K-map, minimize F(A,B,C,D) = Σm({km1},{km2},{km3},{km4},{km5},{km6}) with don't cares d({kd1},{kd2}):",
        "The number of essential prime implicants for F(A,B,C) = Σm({m1},{m2},{m3},{m4},{m5}) is:",
        "A {n_var}-variable K-map has {n_cells} cells. The maximum group size possible is:",
        "Using Quine-McCluskey method for F = Σm({km1},{km2},{km3},{km4},{km5}), the prime implicants are:",
        "The minimum number of 2-input gates to implement F = AB + CD + EF is:",
        "A hazard in combinational circuit occurs when:",
        "Static-1 hazard can be eliminated by:",
        "The POS minimization of F(A,B,C) = ΠM({M1},{M2},{M3}) using K-map gives:",
    ],
    "Flip-Flops & Counters": [
        "A JK flip-flop with J={bit1}, K={bit2} and present state Q={bit3}. The next state is:",
        "A {n_bit}-bit ripple counter using T flip-flops with clock frequency {fclk} MHz has maximum count frequency:",
        "The modulus of a counter using {n_ff} flip-flops with feedback is:",
        "A {n_bit}-bit synchronous up-counter counts from 0 to:",
        "The characteristic equation of a D flip-flop is:",
        "A Johnson counter with {n_ff} flip-flops has modulus:",
        "A ring counter with {n_ff} flip-flops has {n_ff} states. The number of unused states is:",
        "The propagation delay of a {n_bit}-bit ripple counter with tpd = {tpd} ns per flip-flop is:",
        "An SR flip-flop with S={bit1}, R={bit2}. The output is:",
        "A master-slave JK flip-flop avoids the race condition by:",
        "The excitation table entry for T flip-flop transition from {bit1} to {bit2} requires T =:",
        "A mod-{mod} counter requires minimum {n_ff_min} flip-flops:",
    ],
    "8085 Microprocessor": [
        "The 8085 microprocessor has {addr_bits}-bit address bus and can address maximum memory of:",
        "The instruction MOV A, B in 8085 is a {byte}-byte instruction with {cycles} machine cycles:",
        "The 8085 flag register bit for zero result is:",
        "The stack pointer in 8085 is a {sp_bits}-bit register initialized to:",
        "The interrupt with highest priority in 8085 (among RST interrupts) is:",
        "The instruction LDA {addr}H loads accumulator with data from memory address:",
        "The addressing mode used in instruction MVI A, {data}H is:",
        "SIM instruction in 8085 is used for:",
        "The 8085 operates at clock frequency {fclk} MHz. One T-state duration is:",
        "The instruction DAA in 8085 is used for:",
    ],
    "8086 Microprocessor": [
        "The 8086 microprocessor has {data_bits}-bit data bus and {addr_bits}-bit address bus:",
        "In 8086, the physical address is computed as Segment×{shift} + Offset. For CS={cs}H and IP={ip}H, the address is:",
        "The 8086 has {queue_size}-byte prefetch queue in:",
        "The flag register of 8086 has {flag_bits} bits with {flag_count} flag bits:",
        "In 8086 minimum mode, the ALE signal is used to:",
        "The interrupt vector table in 8086 occupies first {ivt_size} bytes of memory:",
        "The instruction LEA in 8086 loads:",
        "String instructions in 8086 use {si_reg} and {di_reg} registers:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 4: Signals & Systems — 80 questions
# ═══════════════════════════════════════════════════════════════════════════

SIGNALS = {
    "Fourier Transform": [
        "The Fourier transform of a rectangular pulse of width {tau} and amplitude {A} is:",
        "The Fourier transform of x(t) = e^(-{a}|t|) is:",
        "Parseval's theorem relates total energy to the integral of:",
        "The Fourier transform of δ(t-{t0}) is:",
        "The convolution in time domain corresponds to _____ in frequency domain:",
        "The bandwidth of a rectangular pulse of duration {tau} μs (first null) is:",
        "The Fourier series coefficient of a square wave with period T = {T} ms and amplitude {A} V for n = {n_harm} is:",
        "Dirichlet conditions for the existence of Fourier series require:",
        "The Fourier transform of sgn(t) is:",
        "Time scaling property: if F{x(t)} = X(ω), then F{x({a}t)} is:",
    ],
    "Laplace Transform": [
        "The Laplace transform of e^(-{a}t)u(t) is:",
        "The inverse Laplace transform of {num}/(s+{a})(s+{b}) is:",
        "The ROC of X(s) = 1/(s+{a}) for a causal signal is:",
        "The initial value theorem gives x(0+) = lim(s→∞) sX(s). For X(s) = {num}s/(s²+{a}s+{b}), x(0+) is:",
        "The final value theorem: for X(s) = {num}/(s(s+{a})), the final value x(∞) is:",
        "The Laplace transform of t^{n}·e^(-{a}t)·u(t) is:",
        "The transfer function H(s) = {num}/(s²+{a}s+{b}). The system is stable if:",
        "Convolution of e^(-{a}t)u(t) and e^(-{b}t)u(t) using Laplace transform gives:",
    ],
    "Z-Transform": [
        "The Z-transform of x[n] = {a}^n·u[n] is:",
        "The inverse Z-transform of X(z) = z/(z-{a}) using partial fractions is:",
        "The ROC of x[n] = {a}^n·u[n] is |z| > {a}. For anticausal signals, ROC is:",
        "The Z-transform of δ[n-{k}] is:",
        "The relationship between Z-transform and Laplace transform: z = e^(sT). For sampling period T = {T} ms and pole at s = -{a}, z =:",
        "A causal LTI system with H(z) = (z-{zero})/(z-{pole}). The system is stable if |{pole}| is:",
        "The Z-transform of the unit step u[n] is:",
        "The convolution property in Z-domain: Z{x[n]*h[n]} equals:",
    ],
    "Sampling Theorem": [
        "A signal with maximum frequency {fmax} kHz must be sampled at minimum rate of:",
        "The Nyquist interval for a signal bandlimited to {fmax} Hz is:",
        "Aliasing occurs when sampling frequency is:",
        "An anti-aliasing filter for {fmax} kHz signal should have cutoff at:",
        "The reconstruction filter for a sampled signal with fs = {fs} kHz is an ideal LPF with cutoff:",
        "A bandpass signal with bandwidth {BW} kHz centered at {fc} kHz. The minimum sampling rate is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 5: Control Systems — 90 questions
# ═══════════════════════════════════════════════════════════════════════════

CONTROL = {
    "Transfer Function & Block Diagram": [
        "The transfer function of a system with poles at s = -{p1} and s = -{p2} and DC gain {K} is:",
        "The closed-loop transfer function for G(s) = {K}/(s+{a})(s+{b}) with unity feedback is:",
        "Using Mason's gain formula, the transfer function of a signal flow graph with {n_loops} loops is:",
        "The steady-state error for a type-{type} system with step input of magnitude {R} and Kp = {Kp} is:",
        "The characteristic equation of a system with G(s)H(s) = {K}/s(s+{a})(s+{b}) is:",
        "A second-order system with ωn = {wn} rad/s and ζ = {zeta}. The peak time tp is:",
        "The rise time of a second-order underdamped system with ωn = {wn} rad/s and ζ = {zeta} is:",
        "The settling time (2% criterion) of a second-order system with ζ = {zeta} and ωn = {wn} rad/s is:",
        "The damping ratio for a system with transfer function G(s) = {wn2}/(s²+{twozwn}s+{wn2}) is:",
        "Percent overshoot for ζ = {zeta} is approximately:",
    ],
    "Bode Plot & Frequency Response": [
        "The gain margin of a system with G(jω) = {K}/jω(1+jω/{w1})(1+jω/{w2}) is:",
        "The phase crossover frequency of G(s) = {K}/s(s+{a}) is:",
        "A Bode plot shows a slope of -{slope} dB/decade. The system has {n_poles} poles:",
        "The resonant peak Mr of a second-order system with ζ = {zeta} is:",
        "Corner frequency of the transfer function G(s) = {K}/(1+s/{wc}) is:",
        "The bandwidth of a second-order system with ωn = {wn} rad/s and ζ = {zeta} is:",
        "Phase margin of a system with gain crossover at ω = {wgc} rad/s where phase is -{phase}° is:",
        "The asymptotic Bode magnitude plot of G(s) = {K}(s+{z})/s(s+{p}) has slopes:",
    ],
    "Root Locus & Stability": [
        "The number of root locus branches for G(s)H(s) = K/s(s+{a})(s+{b}) is:",
        "The breakaway point of root locus for G(s) = K/s(s+{a}) lies at s =:",
        "The angle of asymptotes for a system with {n_poles} poles and {n_zeros} zeros is:",
        "The centroid of asymptotes for poles at 0, -{a}, -{b} with no zeros is:",
        "Routh's stability criterion for s³ + {a}s² + {b}s + {c} = 0 requires:",
        "The range of K for stability of 1 + K/s(s+{a})(s+{b}) = 0 is:",
        "The Nyquist criterion states the number of encirclements of -1 point equals:",
        "A system with characteristic equation s⁴ + {a}s³ + {b}s² + {c}s + {d} = 0. Using Routh array, the number of RHP roots is:",
        "The angle of departure from a complex pole at s = -{sigma} + j{omega} is:",
        "Gain margin is positive for a stable system and is measured at:",
    ],
    "State Space": [
        "The state transition matrix for A = [[-{a}, 0],[0, -{b}]] is:",
        "The controllability matrix for A = [[0,1],[-{a},-{b}]], B = [[0],[1]] has rank:",
        "The observability of a system with A = [[0,1],[-{a},-{b}]], C = [1, 0] depends on:",
        "The eigenvalues of system matrix A = [[0,1],[-{wn2},-{twozwn}]] are:",
        "The transfer function from state-space (A, B, C, D) is C(sI-A)⁻¹B + D. For A=[[-{a}]], B=[[1]], C=[[{K}]], D=[[0]], H(s) is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 6: Communication Systems — 140 questions
# ═══════════════════════════════════════════════════════════════════════════

COMMUNICATION = {
    "AM Modulation": [
        "An AM signal with carrier amplitude {Ac} V and modulation index {ma} has total power (carrier power = {Pc} W):",
        "The bandwidth of an AM signal with message frequency {fm} kHz is:",
        "The efficiency of AM with modulation index {ma} is:",
        "The sideband power in DSB-SC with carrier power {Pc} W and modulation index {ma} is:",
        "An AM signal has modulation index m = {ma}. The ratio of sideband power to total power is:",
        "A DSB-SC signal requires bandwidth of {BW} kHz. Equivalent SSB bandwidth is:",
        "The envelope detector can be used for demodulation when modulation index is:",
        "For AM with m = {ma}, the maximum and minimum amplitudes of the envelope are Ac(1+m) and Ac(1-m). If Amax = {Amax} V and Amin = {Amin} V, m is:",
        "VSB modulation saves bandwidth by transmitting:",
        "The power saving in SSB compared to DSB-FC with m = {ma} is:",
    ],
    "FM & PM Modulation": [
        "An FM signal with frequency deviation Δf = {df} kHz and modulating frequency fm = {fm} kHz has modulation index:",
        "Carson's rule bandwidth for FM with Δf = {df} kHz and fm = {fm} kHz is:",
        "The number of significant sidebands for FM with β = {beta_fm} (using Bessel function) is approximately:",
        "A wideband FM signal has β = {beta_fm}. The bandwidth using Carson's rule is {BW} kHz. The modulating frequency is:",
        "The pre-emphasis time constant in FM broadcasting is {tau_pe} μs. The corresponding frequency is:",
        "The noise performance advantage of FM over AM (FM improvement factor) for β = {beta_fm} is:",
        "An FM discriminator converts frequency variations to:",
        "The instantaneous frequency of an FM signal s(t) = Ac cos(2πfct + {beta_fm} sin 2πfmt) is:",
        "Phase modulation with peak phase deviation {dphi} rad. The equivalent frequency deviation for fm = {fm} kHz is:",
        "Narrowband FM has modulation index β << 1 and bandwidth approximately:",
    ],
    "Digital Communication": [
        "The bit error rate of BPSK in AWGN channel with Eb/N0 = {EbN0} dB is:",
        "QPSK has bandwidth efficiency of {bw_eff} bits/s/Hz compared to BPSK because:",
        "The Shannon channel capacity for bandwidth {BW} MHz and SNR = {SNR} dB is:",
        "The probability of error for {M}-QAM constellation at SNR = {SNR} dB is:",
        "The Nyquist bandwidth for {R} kbaud signaling rate is:",
        "A ({n_code},{k_code}) linear block code can correct up to {t_code} errors. The code rate is:",
        "The minimum Hamming distance for a code to detect {d_detect} errors is:",
        "The minimum Hamming distance to correct {t_code} errors is:",
        "The spectral efficiency of {M}-PSK is:",
        "The roll-off factor α = {alpha_rc} in raised cosine filter. The bandwidth for symbol rate Rs = {Rs} ksymbols/s is:",
        "The processing gain of a spread spectrum system with chip rate {Rc} Mcps and data rate {Rd} kbps is:",
        "Matched filter maximizes the output:",
    ],
    "SNR & Noise": [
        "The noise figure of a two-stage cascade with NF1 = {NF1} dB, NF2 = {NF2} dB, G1 = {G1} dB (Friis formula) is:",
        "The thermal noise power in bandwidth {BW} kHz at temperature {T} K is:",
        "The equivalent noise temperature for noise figure F = {NF} dB is:",
        "A receiver with noise figure {NF} dB and bandwidth {BW} MHz at {T} K has minimum detectable signal:",
        "The noise voltage across a resistor {R} kΩ at {T} K in bandwidth {BW} kHz is:",
        "Shot noise current for DC current {I} mA in bandwidth {BW} kHz is:",
        "The signal-to-quantization-noise ratio (SQNR) for {n_bit}-bit PCM is approximately:",
        "Companding in PCM is used to:",
    ],
    "Information Theory": [
        "The entropy of a binary source with P(0) = {p0} and P(1) = {p1} is:",
        "The channel capacity of a BSC with crossover probability p = {pe} is:",
        "The source coding theorem states minimum bits per symbol equals:",
        "Huffman coding for symbols with probabilities {p1_h}, {p2_h}, {p3_h}, {p4_h} has average code length:",
        "The mutual information I(X;Y) for given joint probability is:",
        "The maximum entropy of a source with {M_sym} symbols is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 7: Electromagnetic Theory & Antennas — 100 questions
# ═══════════════════════════════════════════════════════════════════════════

EMT = {
    "Maxwell's Equations": [
        "Maxwell's equation ∇×H = J + ∂D/∂t is called:",
        "The divergence of magnetic flux density B is always:",
        "In free space, the velocity of electromagnetic wave is c = 1/√(μ₀ε₀) ≈:",
        "The displacement current density for E = {E0} sin(ωt) V/m in a medium with ε = {eps}ε₀ at ω = {omega} rad/s is:",
        "The Poynting vector S = E × H represents:",
        "For a uniform plane wave in free space, the intrinsic impedance is:",
        "The skin depth in a conductor with conductivity σ = {sigma}×10⁷ S/m at frequency {f_em} MHz is:",
        "Boundary condition for tangential component of E at interface between two dielectrics is:",
        "The wave equation in free space ∇²E = μ₀ε₀ ∂²E/∂t² has solution of the form:",
        "Faraday's law ∇×E = -∂B/∂t describes:",
    ],
    "Transmission Lines": [
        "A lossless transmission line with L = {L_tl} nH/m and C = {C_tl} pF/m has characteristic impedance:",
        "The reflection coefficient for load ZL = {ZL} Ω on a {Z0} Ω line is:",
        "The VSWR for reflection coefficient |Γ| = {Gamma} is:",
        "A {Z0} Ω transmission line terminated with {ZL} Ω load. The input impedance at distance λ/4 from load is:",
        "The velocity factor of a coaxial cable with dielectric εr = {eps_r} is:",
        "A quarter-wave transformer to match {Z1} Ω source to {Z2} Ω load requires impedance:",
        "The attenuation constant α of a line with R = {R_tl} Ω/m, G = 0, L = {L_tl} nH/m, C = {C_tl} pF/m is:",
        "For a short-circuited lossless line of length λ/{frac}, the input impedance is:",
        "The standing wave pattern on a transmission line with VSWR = {VSWR} has Vmax/Vmin ratio:",
        "The Smith chart center represents:",
    ],
    "Antennas": [
        "The radiation resistance of a half-wave dipole is approximately:",
        "The directivity of an isotropic antenna is:",
        "A parabolic dish antenna of diameter {D_ant} m at frequency {f_ant} GHz has beamwidth approximately:",
        "The effective aperture of an antenna with gain {G_ant} dB at wavelength {lambda_ant} cm is:",
        "The Friis transmission equation gives received power as Pr = Pt·Gt·Gr·(λ/4πR)². For R = {R_link} km, f = {f_ant} GHz, the path loss is:",
        "The polarization of an antenna with Ex and Ey components in phase is:",
        "An antenna array of {N_ant} elements with spacing d = λ/2 has beamwidth approximately:",
        "The far-field distance (Fraunhofer distance) for antenna of size {D_ant} m at {f_ant} GHz is:",
        "The gain of a Yagi-Uda antenna with {N_ant} elements is approximately:",
        "The radiation pattern of a {lambda_len}λ dipole has how many lobes:",
    ],
    "Radar": [
        "The radar range equation: Rmax = [Pt·G²·λ²·σ / (4π)³·Smin]^(1/4). For Pt = {Pt} kW, the maximum range is:",
        "The Doppler shift for target velocity {v_tgt} m/s at carrier frequency {f_radar} GHz is:",
        "The range resolution of a pulsed radar with pulse width {tau_radar} μs is:",
        "A radar transmits at PRF = {PRF} kHz. The maximum unambiguous range is:",
        "The cross-section of a sphere of radius {r_tgt} m at frequency {f_radar} GHz is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 8: Network Theory — 100 questions
# ═══════════════════════════════════════════════════════════════════════════

NETWORKS = {
    "KVL/KCL & Mesh/Nodal Analysis": [
        "In a circuit with R1 = {R1} Ω, R2 = {R2} Ω in series across {V_src} V, the current is:",
        "Using nodal analysis, the voltage at node A with three branches of {R1} Ω, {R2} Ω, {R3} Ω connected to {V1} V, {V2} V, ground is:",
        "The mesh current in a circuit with R1 = {R1} Ω, R2 = {R2} Ω, V = {V_src} V using mesh analysis is:",
        "Two resistors {R1} Ω and {R2} Ω in parallel have equivalent resistance:",
        "A circuit has {n_nodes} nodes and {n_branches} branches. The number of independent KVL equations is:",
        "The power dissipated in {R1} Ω resistor carrying {I_src} A current is:",
        "Star to delta conversion: for three star resistances {R1} Ω, {R2} Ω, {R3} Ω, the delta equivalent Rab is:",
        "The voltage across {R2} Ω in a voltage divider with {R1} Ω, {R2} Ω and source {V_src} V is:",
    ],
    "Thevenin & Norton": [
        "The Thevenin equivalent voltage across terminals AB of a circuit with {V_src} V source and {R1} Ω, {R2} Ω resistors is:",
        "Norton equivalent current for a circuit with Vth = {Vth} V and Rth = {Rth} Ω is:",
        "Maximum power transfer occurs when load resistance RL equals:",
        "The maximum power delivered to load when Vth = {Vth} V and Rth = {Rth} Ω is:",
        "Superposition theorem applies to circuits with:",
        "The Thevenin resistance seen from terminals AB with voltage source {V_src} V replaced by short circuit is:",
        "Millman's theorem gives the voltage across parallel combination of {n_src} voltage sources as:",
        "Reciprocity theorem is applicable to:",
    ],
    "Transient Analysis": [
        "A series RL circuit with R = {R1} Ω, L = {L_val} mH. The time constant is:",
        "A series RC circuit with R = {R1} kΩ, C = {C_val} μF charged to {V_src} V. Voltage across capacitor at t = τ is:",
        "The initial current in an RL circuit switched to {V_src} V with R = {R1} Ω, L = {L_val} mH is:",
        "In an RLC series circuit, critically damped condition requires R = {R_crit} Ω for L = {L_val} mH, C = {C_val} μF. R equals:",
        "The natural frequency of an LC circuit with L = {L_val} mH and C = {C_val} nF is:",
        "Energy stored in a capacitor of {C_val} μF charged to {V_src} V is:",
        "Energy stored in an inductor of {L_val} mH carrying {I_src} A is:",
        "The steady-state DC voltage across a capacitor in series RL-C circuit with {V_src} V DC source is:",
    ],
    "Two-Port Networks": [
        "The Z-parameters of a T-network with Z1 = {R1} Ω, Z2 = {R2} Ω, Z3 = {R3} Ω: Z11 is:",
        "The Y-parameters of a π-network with Ya = {G1} mS, Yb = {G2} mS, Yc = {G3} mS: Y11 is:",
        "The ABCD parameters of a series impedance Z = {R1} Ω: [A B; C D] is:",
        "The condition for reciprocal two-port network in terms of Z-parameters is:",
        "The condition for symmetrical two-port in terms of ABCD parameters is:",
        "The image impedance of a two-port with Z11 = {R1} Ω and Z22 = {R2} Ω, Z12 = Z21 = {R3} Ω is:",
        "The h-parameters relate V1, I2 to I1, V2. h11 has units of:",
        "Cascade connection of two 2-port networks uses which parameter multiplication:",
    ],
    "AC Circuits": [
        "The impedance of a series RLC circuit with R = {R1} Ω, L = {L_val} mH, C = {C_val} μF at {f_ac} Hz is:",
        "The resonant frequency of a series RLC circuit with L = {L_val} mH and C = {C_val} nF is:",
        "The quality factor Q of a series RLC circuit with R = {R1} Ω, L = {L_val} mH, C = {C_val} nF is:",
        "The power factor of a circuit with R = {R1} Ω and XL = {XL} Ω is:",
        "The bandwidth of a series RLC circuit with R = {R1} Ω and L = {L_val} mH is:",
        "At resonance in a parallel RLC circuit, the impedance is:",
        "The apparent power in a circuit with V = {V_src} Vrms and I = {I_src} Arms is:",
        "The reactive power in a circuit with {V_src} V, {I_src} A and power factor {pf} is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 9: Measurements & Instrumentation — 50 questions
# ═══════════════════════════════════════════════════════════════════════════

MEASUREMENTS = {
    "CRO & Instruments": [
        "A CRO shows {n_div} divisions of a waveform with time/div = {t_div} μs/div. The frequency is:",
        "The sensitivity of a CRO is {sens} mV/div. A signal showing {n_div} divisions peak-to-peak has Vpp of:",
        "A PMMC meter with full-scale deflection current {Ifsd} μA and coil resistance {Rm} Ω. The voltage for full scale is:",
        "To extend the range of a voltmeter with Rm = {Rm} Ω and Ifsd = {Ifsd} mA to {V_range} V, the multiplier resistance is:",
        "To convert a galvanometer with Rm = {Rm} Ω and Ifsd = {Ifsd} mA to ammeter of range {I_range} A, shunt resistance is:",
        "The loading effect of a voltmeter with sensitivity {sens} kΩ/V on range {V_range} V measuring across {R_load} kΩ is:",
        "A digital multimeter with {n_digit} digits has maximum count of:",
        "The resolution of a {n_bit}-bit digital voltmeter with range {V_range} V is:",
    ],
    "Bridges & Transducers": [
        "A Wheatstone bridge with R1 = {R1} Ω, R2 = {R2} Ω, R3 = {R3} Ω is balanced when R4 =:",
        "A Kelvin double bridge is used for measurement of:",
        "Maxwell bridge measures:",
        "Wien bridge measures:",
        "A Schering bridge is used for measurement of:",
        "A strain gauge with gauge factor {GF} and resistance {R_sg} Ω under strain {strain}×10⁻⁶ has resistance change of:",
        "An LVDT has sensitivity {sens} mV/mm. For displacement of {disp} mm, the output voltage is:",
        "A thermocouple of type {tc_type} generates {emf} mV at {T_tc}°C. The sensitivity is:",
        "A piezoelectric transducer converts:",
        "An RTD with α = {alpha_rtd}×10⁻³/°C and R₀ = {R0} Ω at {T_rtd}°C has resistance:",
    ],
    "Error Analysis": [
        "The limiting error of a ±{accuracy}% accurate instrument on {range} V range reading {reading} V is:",
        "The probable error for {n_meas} measurements with standard deviation {sigma} is:",
        "Systematic errors can be reduced by:",
        "The propagation of error for f = {R1}·{R2}/{R3} with {err}% error in each is:",
        "Accuracy of a measurement is defined as:",
        "Precision refers to:",
        "A voltmeter has accuracy class {class_acc}. On 100V range, the maximum error is:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC 10: Microwave Engineering — 40 questions
# ═══════════════════════════════════════════════════════════════════════════

MICROWAVE = {
    "Waveguides": [
        "The cutoff frequency of TE₁₀ mode in a rectangular waveguide with a = {a_wg} cm is:",
        "The dominant mode in a rectangular waveguide (a > b) is:",
        "The guide wavelength for operating frequency {f_mw} GHz in waveguide with cutoff {fc_mw} GHz is:",
        "The wave impedance of TE mode in a rectangular waveguide at frequency {f_mw} GHz with cutoff {fc_mw} GHz is:",
        "The phase velocity in a waveguide is {rel} the speed of light:",
        "The group velocity × phase velocity in a waveguide equals:",
        "The cutoff wavelength of TE₁₀ mode in waveguide with a = {a_wg} cm, b = {b_wg} cm is:",
        "A circular waveguide of radius {r_wg} cm. The dominant mode is:",
        "The attenuation below cutoff frequency in a waveguide is:",
        "The number of modes propagating in waveguide at {f_mw} GHz with a = {a_wg} cm, b = {b_wg} cm is:",
    ],
    "Microwave Devices": [
        "A reflex klystron operates at {f_mw} GHz. The repeller voltage for mode n = {n_mode} is:",
        "A magnetron operates on the principle of:",
        "A Gunn diode oscillator utilizes:",
        "The IMPATT diode operates based on:",
        "A traveling wave tube (TWT) provides:",
        "The coupling factor of a directional coupler is {coupling} dB. The fraction of power coupled is:",
        "A magic tee (hybrid tee) has {n_ports} ports and provides:",
        "A circulator routes signal from port 1 to port 2, port 2 to port 3, port 3 to port 1. If signal enters port {port_in}, it exits port:",
        "An isolator provides forward loss of {fwd_loss} dB and reverse isolation of {rev_iso} dB. The isolation ratio is:",
        "The Faraday rotation in a ferrite device at {f_mw} GHz is:",
    ],
    "Smith Chart & S-Parameters": [
        "On a Smith chart, the center represents normalized impedance of:",
        "The S₁₁ parameter represents:",
        "For a matched load, S₁₁ = {S11} and S₂₂ = {S22}. The return loss is:",
        "The insertion loss of a two-port network is related to S₂₁ as:",
        "A stub matching network uses a short-circuited stub of length {stub_len}λ at distance {stub_dist}λ from load to match:",
        "The S-parameter matrix of a lossless reciprocal 2-port satisfies:",
        "On Smith chart, a complete circle represents:",
        "The normalized admittance can be read from Smith chart by:",
        "S₂₁ of an amplifier is {S21} dB. The power gain is:",
        "For unconditional stability, the Rollett stability factor K must be:",
    ],
}

# ═══════════════════════════════════════════════════════════════════════════
#  SUBJECT-SPECIFIC OPTIONS
# ═══════════════════════════════════════════════════════════════════════════

EDC_OPTIONS = [
    ["0.6 V", "0.7 V", "0.3 V", "1.1 V"],
    ["0.026 V", "0.052 V", "0.013 V", "0.078 V"],
    ["{} mA".format(v) for v in ["0.5", "1.0", "2.0", "5.0"]],
    ["{} μA".format(v) for v in ["10", "25", "50", "100"]],
    ["{} V".format(v) for v in ["2.4", "4.8", "6.3", "8.5"]],
    ["{} pF".format(v) for v in ["5", "10", "20", "50"]],
    ["Silicon", "Germanium", "GaAs", "InP"],
    ["0.48", "0.56", "0.72", "0.84"],
    ["{} kΩ".format(v) for v in ["1", "2.2", "4.7", "10"]],
    ["{} mA/V".format(v) for v in ["2", "5", "10", "20"]],
    ["Active region", "Saturation", "Cutoff", "Breakdown"],
    ["Enhancement mode", "Depletion mode", "Both modes", "Neither"],
    ["{} nA".format(v) for v in ["1", "5", "10", "25"]],
    ["Forward bias", "Reverse bias", "Zero bias", "Breakdown"],
    ["{} Ω".format(v) for v in ["5", "13", "26", "52"]],
]

ANALOG_OPTIONS = [
    ["{} V".format(v) for v in ["-2.5", "-5.0", "-10", "-20"]],
    ["{}".format(v) for v in ["-10", "-20", "-50", "-100"]],
    ["{} dB".format(v) for v in ["60", "80", "100", "120"]],
    ["{} kHz".format(v) for v in ["1.59", "3.18", "10", "15.9"]],
    ["{} MHz".format(v) for v in ["0.5", "1", "2", "5"]],
    ["{} V/μs".format(v) for v in ["0.5", "1", "2", "13"]],
    ["1", "2", "11", "101"],
    ["Infinite", "Zero", "Unity", "Depends on feedback"],
    ["{} Hz".format(v) for v in ["100", "500", "1000", "5000"]],
    ["{} mV".format(v) for v in ["0.39", "0.78", "1.22", "2.44"]],
    ["Butterworth", "Chebyshev", "Bessel", "Elliptic"],
    ["6 dB/octave", "12 dB/octave", "18 dB/octave", "24 dB/octave"],
    ["{} bits".format(v) for v in ["8", "10", "12", "16"]],
    ["{} μs".format(v) for v in ["1", "5", "10", "100"]],
    ["{} dB".format(v) for v in ["49.9", "61.9", "74.0", "98.1"]],
]

DIGITAL_OPTIONS = [
    ["A+B", "AB", "A'B+AB'", "A+B+C"],
    ["A'B'", "AB", "(A+B)'", "A⊕B"],
    ["{} states".format(v) for v in ["4", "8", "16", "32"]],
    ["AND", "OR", "NAND", "XOR"],
    ["0", "1", "Toggle", "No change"],
    ["{} flip-flops".format(v) for v in ["2", "3", "4", "5"]],
    ["MOD-8", "MOD-10", "MOD-16", "MOD-12"],
    ["{} ns".format(v) for v in ["10", "20", "40", "80"]],
    ["{} MHz".format(v) for v in ["1", "2", "5", "10"]],
    ["64 KB", "128 KB", "256 KB", "1 MB"],
    ["Immediate", "Direct", "Register", "Implied"],
    ["16-bit", "8-bit", "20-bit", "32-bit"],
    ["TRAP", "RST 7.5", "RST 6.5", "INTR"],
    ["1", "2", "3", "4"],
    ["Inverter", "Buffer", "AND gate", "OR gate"],
]

SIGNALS_OPTIONS = [
    ["{} sinc({})".format(a, b) for a, b in [("τA", "ωτ/2"), ("2τA", "ωτ"), ("A", "ωτ/2π"), ("A/2", "ωτ")]],
    ["2a/(ω²+a²)", "a/(ω²+a²)", "2/(ω²+a²)", "1/(jω+a)"],
    ["1/(s+a)", "s/(s+a)", "a/(s²+a²)", "1/(s²+a²)"],
    ["{} kHz".format(v) for v in ["4", "8", "10", "20"]],
    ["{} samples/s".format(v) for v in ["8000", "16000", "44100", "48000"]],
    ["Multiplication", "Division", "Convolution", "Correlation"],
    ["z/(z-a)", "1/(z-a)", "z/(z+a)", "a/(z-a)"],
    ["|z| > a", "|z| < a", "|z| = a", "All z"],
    ["e^(-jωt₀)", "δ(ω)", "1", "e^(jωt₀)"],
    ["Stable", "Unstable", "Marginally stable", "Cannot determine"],
    ["X(ω/a)/|a|", "|a|X(aω)", "X(ω-a)", "X(ω)e^(-jaω)"],
    ["2/jω", "πδ(ω)+1/jω", "jω", "1/(jω)²"],
]

CONTROL_OPTIONS = [
    ["{} rad/s".format(v) for v in ["5", "10", "20", "50"]],
    ["{} dB".format(v) for v in ["6", "10", "20", "∞"]],
    ["{} seconds".format(v) for v in ["0.1", "0.5", "1.0", "2.0"]],
    ["{}%".format(v) for v in ["0", "4.3", "16.3", "25.4"]],
    ["Stable", "Unstable", "Marginally stable", "Conditionally stable"],
    ["Type 0", "Type 1", "Type 2", "Type 3"],
    ["-20 dB/dec", "-40 dB/dec", "-60 dB/dec", "0 dB/dec"],
    ["0", "1/(1+Kp)", "∞", "1/Kp"],
    ["K/(s+a)(s+b)", "K/((s+a)(s+b)+K)", "Ks/((s+a)(s+b))", "K(s+a)/(s+b)"],
    ["3", "4", "2", "1"],
    ["Rank 2", "Rank 1", "Rank 0", "Not determinable"],
    ["s = -a ± jωd", "s = -a", "s = jωn", "s = -σ"],
]

COMM_OPTIONS = [
    ["{} kHz".format(v) for v in ["5", "10", "20", "40"]],
    ["{} W".format(v) for v in ["50", "75", "100", "150"]],
    ["{}%".format(v) for v in ["11.1", "25", "33.3", "50"]],
    ["{} dB".format(v) for v in ["3", "6", "10", "20"]],
    ["{} bits/s".format(v) for v in ["1M", "5M", "10M", "20M"]],
    ["SNR", "BER", "Bandwidth", "Noise figure"],
    ["Q(√(2Eb/N0))", "Q(√(Eb/N0))", "erfc(√(Eb/N0))", "0.5·erfc(√(Eb/2N0))"],
    ["1 bit/s/Hz", "2 bits/s/Hz", "3 bits/s/Hz", "4 bits/s/Hz"],
    ["{} bits/symbol".format(v) for v in ["1", "2", "3", "4"]],
    ["log₂M", "2log₂M", "M", "√M"],
    ["{} dB".format(v) for v in ["10", "20", "30", "43"]],
    ["Amplitude variations", "Frequency variations", "Phase variations", "Power variations"],
]

EMT_OPTIONS = [
    ["{} Ω".format(v) for v in ["50", "75", "120", "377"]],
    ["{} GHz".format(v) for v in ["3", "5", "7.5", "10"]],
    ["{} dB".format(v) for v in ["3", "6", "10", "20"]],
    ["TE₁₀", "TM₁₁", "TE₂₀", "TE₀₁"],
    ["0", "1", "-1", "Depends on Γ"],
    ["73 Ω", "36.5 Ω", "50 Ω", "120π Ω"],
    ["Linear", "Circular", "Elliptical", "Unpolarized"],
    ["{} cm".format(v) for v in ["1", "2", "3", "5"]],
    ["{} m²".format(v) for v in ["0.01", "0.1", "1", "10"]],
    ["{} dBi".format(v) for v in ["2.15", "5", "7.85", "10"]],
    ["Greater than c", "Less than c", "Equal to c", "Zero"],
    ["c²", "c", "v_g = c²/v_p", "v_g × v_p = c"],
    ["{} mm".format(v) for v in ["0.01", "0.066", "0.1", "1"]],
    ["Zero", "Non-zero finite", "Infinite", "Depends on medium"],
    ["Broad-wall", "Narrow-wall", "Both walls", "Center"],
]

NETWORK_OPTIONS = [
    ["{} A".format(v) for v in ["0.5", "1", "2", "5"]],
    ["{} V".format(v) for v in ["2", "4", "6", "10"]],
    ["{} Ω".format(v) for v in ["2", "5", "10", "20"]],
    ["{} kΩ".format(v) for v in ["1", "2.2", "4.7", "10"]],
    ["{} mH".format(v) for v in ["1", "5", "10", "50"]],
    ["{} μF".format(v) for v in ["1", "10", "47", "100"]],
    ["{} W".format(v) for v in ["1", "5", "10", "25"]],
    ["{} ms".format(v) for v in ["0.1", "0.5", "1", "5"]],
    ["{} Hz".format(v) for v in ["50", "100", "500", "1000"]],
    ["{} VA".format(v) for v in ["50", "100", "200", "500"]],
    ["Ohms", "Siemens", "Dimensionless", "Watts"],
    ["Z₁₂ = Z₂₁", "Z₁₁ = Z₂₂", "AD - BC = 1", "h₁₂ = -h₂₁"],
    ["Linear bilateral", "Non-linear", "Active", "Time-varying"],
    ["ABCD parameters", "Z parameters", "Y parameters", "h parameters"],
    ["Maximum", "Minimum", "Zero", "Rth"],
]

MEAS_OPTIONS = [
    ["{} V".format(v) for v in ["0.5", "1", "2.5", "5"]],
    ["{} kΩ".format(v) for v in ["1", "5", "10", "50"]],
    ["{} Ω".format(v) for v in ["0.01", "0.05", "0.1", "0.5"]],
    ["1999", "3999", "9999", "19999"],
    ["{} mV".format(v) for v in ["0.1", "0.5", "1", "5"]],
    ["Low resistance", "High resistance", "Capacitance", "Inductance"],
    ["Inductance", "Capacitance", "Frequency", "Resistance"],
    ["{} mV".format(v) for v in ["5", "10", "25", "50"]],
    ["{}%".format(v) for v in ["0.5", "1.0", "1.5", "2.5"]],
    ["Mechanical to electrical", "Electrical to mechanical", "Thermal to electrical", "Pressure to electrical"],
]

MW_OPTIONS = [
    ["{} GHz".format(v) for v in ["3", "5", "7.5", "10"]],
    ["{} cm".format(v) for v in ["2", "3", "4", "6"]],
    ["{} dB".format(v) for v in ["3", "10", "20", "30"]],
    ["TE₁₀", "TM₁₁", "TE₁₁", "TM₀₁"],
    ["Port 2", "Port 3", "Port 1", "Port 4"],
    ["Broadband amplification", "High power oscillation", "Frequency multiplication", "Mixing"],
    ["Transferred electron effect", "Avalanche effect", "Tunnel effect", "Parametric effect"],
    ["1+j0", "0", "∞", "0.5+j0.5"],
    ["Input reflection coefficient", "Forward transmission", "Reverse transmission", "Output reflection coefficient"],
    ["S^H·S = I", "S = S^T", "det(S) = 1", "All of the above"],
    ["-20log|S₂₁|", "-10log|S₂₁|²", "20log|S₂₁|", "10log|S₂₁|"],
    ["Greater than 1", "Less than 1", "Equal to 1", "Equal to 0"],
]

# ═══════════════════════════════════════════════════════════════════════════
#  PARAMETER FILL VALUES
# ═══════════════════════════════════════════════════════════════════════════

def fill(template):
    """Fill template with random plausible electronics values."""
    reps = {
        # EDC
        "NA": str(random.choice([1, 2, 5, 8, 10])),
        "ND": str(random.choice([1, 2, 5, 8, 10])),
        "Is": str(random.choice([1, 2, 5, 10, 25])),
        "Vf": str(random.choice(["0.5", "0.6", "0.65", "0.7"])),
        "Vr": str(random.choice([2, 5, 10, 20, 50])),
        "Vz": str(random.choice(["3.3", "4.7", "5.1", "6.2", "9.1", "12"])),
        "Pz": str(random.choice([250, 400, 500, 1000])),
        "Id": str(random.choice([1, 2, 5, 10, 20])),
        "tau": str(random.choice([1, 5, 10, 50, 100])),
        "RL": str(random.choice([1, 2, 5, 10])),
        "C0": str(random.choice([5, 10, 20, 50])),
        "VBE": str(random.choice(["0.6", "0.65", "0.7", "0.75"])),
        "beta": str(random.choice([50, 80, 100, 120, 150, 200])),
        "Icbo": str(random.choice([1, 5, 10, 25])),
        "Ib": str(random.choice([10, 20, 50, 100])),
        "alpha": str(random.choice(["0.95", "0.96", "0.98", "0.99"])),
        "hie": str(random.choice([500, 1000, 1500, 2000, 2500])),
        "VA": str(random.choice([50, 100, 150, 200])),
        "Ic": str(random.choice([1, 2, 5, 10])),
        "IDSS": str(random.choice([4, 8, 10, 12, 16])),
        "VP": str(random.choice([2, 3, 4, 5, 6])),
        "VGS": str(random.choice([1, 2, 3])),
        "VGS_val": str(random.choice([2, 3, 4, 5])),
        "VGS_pos": str(random.choice([1, 2, 3])),
        "Kn": str(random.choice(["0.5", "1", "2", "4", "5"])),
        "VTH": str(random.choice(["0.5", "0.7", "1.0", "1.5", "2.0"])),
        "VDS": str(random.choice([2, 3, 5, 10])),
        "WL": str(random.choice([2, 5, 10, 20, 50])),
        "WLp": str(random.choice([5, 10, 20])),
        "WLn": str(random.choice([5, 10, 20])),
        "unCox": str(random.choice([50, 100, 200, 250])),
        "lambda_ch": str(random.choice(["0.01", "0.02", "0.05", "0.1"])),
        "tox": str(random.choice([5, 10, 15, 20])),
        "ratio": str(random.choice([2, 2.5, 3])),
        "gamma": str(random.choice(["0.3", "0.4", "0.5", "0.6"])),
        "VSB": str(random.choice([1, 2, 3, 5])),
        # Analog
        "Rf": str(random.choice([10, 20, 47, 100, 220, 470])),
        "R1": str(random.choice([1, 2, 4.7, 5, 10, 20, 47, 100])),
        "R2": str(random.choice([2, 5, 10, 20, 47, 100])),
        "R3": str(random.choice([2, 5, 10, 15, 20])),
        "R_int": str(random.choice([10, 47, 100])),
        "C_int": str(random.choice([1, 10, 100])),
        "Vin": str(random.choice([1, 2, 5])),
        "t_int": str(random.choice([1, 5, 10])),
        "Ad": str(random.choice([60, 80, 100, 120])),
        "Acm": str(random.choice(["0.01", "0.1", "1", "-20"])),
        "V1": str(random.choice([1, 2, 3, 5])),
        "V2": str(random.choice([1, 2, 3, 5])),
        "SR": str(random.choice(["0.5", "1", "2", "10", "13"])),
        "Vp": str(random.choice([1, 5, 10])),
        "RG": str(random.choice([100, 500, 1000, 5000])),
        "GBW": str(random.choice([1, 2, 5, 10])),
        "gain": str(random.choice([2, 5, 10, 20, 50, 100])),
        "Vos": str(random.choice([1, 2, 5, 10])),
        "R_filt": str(random.choice([1, 4.7, 10, 47, 100])),
        "C_filt": str(random.choice([1, 10, 47, 100])),
        "R_osc": str(random.choice([1, 4.7, 10, 47])),
        "C_osc": str(random.choice([1, 10, 100, 1000])),
        "L_osc": str(random.choice(["0.1", "0.5", "1", "5", "10"])),
        "C1_osc": str(random.choice([10, 20, 50, 100])),
        "C2_osc": str(random.choice([20, 50, 100, 200])),
        "L1_osc": str(random.choice([10, 50, 100])),
        "L2_osc": str(random.choice([20, 50, 100])),
        "fs": str(random.choice([1, 2, 4, 8, 10])),
        "fp": str(random.choice([1.001, 2.001, 4.001, 8.001])),
        "R1_555": str(random.choice([1, 4.7, 10, 47])),
        "R2_555": str(random.choice([1, 4.7, 10, 47])),
        "C_555": str(random.choice([1, 10, 100, 1000])),
        "fc": str(random.choice([1, 2, 5, 10])),
        "f2": str(random.choice([2, 4, 10, 20])),
        "n_filt": str(random.choice([2, 3, 4, 5])),
        "ripple": str(random.choice(["0.5", "1", "2", "3"])),
        "n_bit": str(random.choice([8, 10, 12, 16])),
        "Vref": str(random.choice([2.5, 3.3, 5, 10])),
        "fclk": str(random.choice([1, 2, 5, 10, 20])),
        "Vfs": str(random.choice([5, 10])),
        "digital": random.choice(["10000000", "10110000", "11001100", "11111111"]),
        "fmax": str(random.choice([4, 8, 10, 20, 44.1])),
        "Ih": str(random.choice([5, 10, 20])),
        "Il": str(random.choice([20, 40, 50])),
        "Ig": str(random.choice([0.2, 0.5, 1])),
        "Vdc": str(random.choice([12, 24, 48, 100, 200])),
        "alpha_deg": str(random.choice([30, 45, 60, 90])),
        "Vs": str(random.choice([110, 220, 230, 240, 12, 24])),
        # Digital
        "n_input": str(random.choice([2, 3, 4, 8])),
        "n_var": str(random.choice([2, 3, 4, 5])),
        "m1": str(random.choice([0, 1, 2])),
        "m2": str(random.choice([3, 4, 5])),
        "m3": str(random.choice([5, 6, 7])),
        "m4": str(random.choice([3, 4, 6])),
        "m5": str(random.choice([5, 7])),
        "km1": str(random.choice([0, 1, 2])),
        "km2": str(random.choice([3, 4, 5])),
        "km3": str(random.choice([6, 7, 8])),
        "km4": str(random.choice([9, 10, 11])),
        "km5": str(random.choice([12, 13, 14])),
        "km6": str(random.choice([15])),
        "kd1": str(random.choice([2, 5, 8, 11])),
        "kd2": str(random.choice([3, 6, 9, 14])),
        "n_cells": str(random.choice([4, 8, 16, 32])),
        "M1": str(random.choice([0, 1, 2])),
        "M2": str(random.choice([3, 4, 5])),
        "M3": str(random.choice([6, 7])),
        "bit1": str(random.choice([0, 1])),
        "bit2": str(random.choice([0, 1])),
        "bit3": str(random.choice([0, 1])),
        "n_ff": str(random.choice([3, 4, 5, 6, 8])),
        "tpd": str(random.choice([5, 10, 15, 20])),
        "mod": str(random.choice([6, 10, 12, 16, 60])),
        "n_ff_min": str(random.choice([3, 4, 5, 6])),
        "addr_bits": str(16),
        "byte": str(random.choice([1, 2, 3])),
        "cycles": str(random.choice([1, 2, 3, 4, 5])),
        "sp_bits": str(16),
        "addr": random.choice(["2000", "2050", "3000", "4000", "8000", "FF00"]),
        "data": random.choice(["05", "0A", "32", "55", "FF"]),
        "data_bits": str(16),
        "shift": str(16),
        "cs": random.choice(["1000", "2000", "F000"]),
        "ip": random.choice(["0000", "0100", "1234"]),
        "queue_size": str(random.choice([6])),
        "flag_bits": str(16),
        "flag_count": str(9),
        "ivt_size": str(1024),
        "si_reg": "SI",
        "di_reg": "DI",
        # Signals
        "a": str(random.choice([1, 2, 3, 4, 5])),
        "b": str(random.choice([2, 3, 4, 5, 6, 8, 10])),
        "A": str(random.choice([1, 2, 5, 10])),
        "t0": str(random.choice([1, 2, 3, 5])),
        "T": str(random.choice([2, 5, 10, 20])),
        "n_harm": str(random.choice([1, 3, 5, 7])),
        "num": str(random.choice([1, 2, 5, 10])),
        "n": str(random.choice([1, 2, 3, 4])),
        "k": str(random.choice([1, 2, 3, 4, 5])),
        "zero": str(random.choice(["0.5", "0.8", "1", "2"])),
        "pole": str(random.choice(["0.5", "0.8", "0.9", "1.2"])),
        "BW": str(random.choice([4, 10, 20, 50, 200])),
        "fs_val": str(random.choice([8, 16, 44.1, 48])),
        # Control
        "p1": str(random.choice([1, 2, 3, 5, 10])),
        "p2": str(random.choice([2, 4, 5, 10, 20])),
        "K": str(random.choice([1, 2, 5, 10, 20, 50, 100])),
        "type": str(random.choice([0, 1, 2])),
        "R": str(random.choice([1, 5, 10])),
        "Kp": str(random.choice([5, 10, 20, 50, 100])),
        "wn": str(random.choice([5, 10, 20, 50, 100])),
        "zeta": str(random.choice(["0.1", "0.3", "0.5", "0.707", "1.0"])),
        "wn2": str(random.choice([25, 100, 400, 2500])),
        "twozwn": str(random.choice([2, 6, 10, 14, 20, 100])),
        "w1": str(random.choice([5, 10, 20, 50])),
        "w2": str(random.choice([10, 20, 50, 100])),
        "slope": str(random.choice([20, 40, 60])),
        "n_poles": str(random.choice([1, 2, 3, 4])),
        "n_zeros": str(random.choice([0, 1, 2])),
        "wc": str(random.choice([5, 10, 20, 50, 100])),
        "wgc": str(random.choice([5, 10, 20, 50])),
        "phase": str(random.choice([120, 135, 150, 160, 170, 180])),
        "z": str(random.choice([1, 2, 5])),
        "p": str(random.choice([5, 10, 20])),
        "c": str(random.choice([2, 5, 10, 20, 50])),
        "d": str(random.choice([5, 10, 20, 50, 100])),
        "sigma": str(random.choice([1, 2, 3, 5])),
        "omega": str(random.choice([2, 5, 10, 20, 50])),
        # Communication
        "Ac": str(random.choice([5, 10, 20, 50, 100])),
        "ma": str(random.choice(["0.3", "0.5", "0.7", "0.8", "1.0"])),
        "Pc": str(random.choice([10, 50, 100, 500, 1000])),
        "fm": str(random.choice([1, 3, 5, 10, 15])),
        "Amax": str(random.choice([10, 15, 20])),
        "Amin": str(random.choice([2, 5, 8])),
        "df": str(random.choice([5, 10, 25, 50, 75])),
        "beta_fm": str(random.choice([1, 2, 5, 10])),
        "tau_pe": str(random.choice([50, 75])),
        "dphi": str(random.choice([1, 2, 5])),
        "EbN0": str(random.choice([5, 8, 10, 12, 15])),
        "bw_eff": str(random.choice([1, 2])),
        "SNR": str(random.choice([10, 15, 20, 25, 30])),
        "M": str(random.choice([4, 8, 16, 64, 256])),
        "R_rate": str(random.choice([10, 50, 100, 1000])),
        "n_code": str(random.choice([7, 15, 31, 63])),
        "k_code": str(random.choice([4, 11, 26, 57])),
        "t_code": str(random.choice([1, 2, 3])),
        "d_detect": str(random.choice([1, 2, 3, 4])),
        "alpha_rc": str(random.choice(["0.25", "0.35", "0.5", "1.0"])),
        "Rs": str(random.choice([10, 50, 100, 1000])),
        "Rc": str(random.choice([1, 5, 10])),
        "Rd": str(random.choice([10, 50, 100])),
        "NF1": str(random.choice([2, 3, 4])),
        "NF2": str(random.choice([6, 8, 10])),
        "G1": str(random.choice([10, 15, 20])),
        "NF": str(random.choice([2, 3, 5, 6])),
        "I": str(random.choice([1, 5, 10])),
        "p0": str(random.choice(["0.3", "0.4", "0.5", "0.6", "0.7"])),
        "p1_val": str(random.choice(["0.3", "0.4", "0.5", "0.6", "0.7"])),
        "pe": str(random.choice(["0.01", "0.05", "0.1", "0.2"])),
        "p1_h": str(random.choice(["0.4", "0.3"])),
        "p2_h": str(random.choice(["0.3", "0.25"])),
        "p3_h": str(random.choice(["0.2", "0.25"])),
        "p4_h": str(random.choice(["0.1", "0.2"])),
        "M_sym": str(random.choice([4, 8, 16])),
        # EMT
        "E0": str(random.choice([10, 50, 100])),
        "eps": str(random.choice([2, 4, 8, 10])),
        "f_em": str(random.choice([1, 10, 50, 100, 1000])),
        "L_tl": str(random.choice([250, 500, 1000])),
        "C_tl": str(random.choice([50, 100, 200])),
        "ZL": str(random.choice([25, 50, 75, 100, 150, 200])),
        "Z0": str(random.choice([50, 75, 100])),
        "Gamma": str(random.choice(["0.1", "0.2", "0.33", "0.5"])),
        "eps_r": str(random.choice(["2.1", "2.3", "4.0", "9.0"])),
        "Z1": str(random.choice([50, 75])),
        "Z2": str(random.choice([100, 150, 200, 300])),
        "R_tl": str(random.choice([1, 2, 5])),
        "frac": str(random.choice([2, 4, 8])),
        "VSWR": str(random.choice([1.5, 2, 3, 5])),
        "D_ant": str(random.choice([1, 2, 3, 5, 10])),
        "f_ant": str(random.choice([1, 2, 5, 10, 30])),
        "G_ant": str(random.choice([10, 20, 30, 40])),
        "lambda_ant": str(random.choice([1, 3, 5, 10, 30])),
        "R_link": str(random.choice([1, 5, 10, 50, 100])),
        "N_ant": str(random.choice([4, 8, 10, 16])),
        "lambda_len": str(random.choice(["0.5", "1", "1.5", "2"])),
        "Pt": str(random.choice([1, 5, 10, 50, 100])),
        "v_tgt": str(random.choice([100, 200, 300, 500, 1000])),
        "f_radar": str(random.choice([3, 5, 10, 15])),
        "tau_radar": str(random.choice(["0.1", "0.5", "1", "5"])),
        "PRF": str(random.choice([1, 2, 5, 10])),
        "r_tgt": str(random.choice(["0.1", "0.5", "1", "5"])),
        # Networks
        "V_src": str(random.choice([5, 10, 12, 15, 20, 24])),
        "I_src": str(random.choice([1, 2, 5, 10])),
        "n_nodes": str(random.choice([3, 4, 5, 6])),
        "n_branches": str(random.choice([5, 6, 7, 8, 9])),
        "Vth": str(random.choice([5, 10, 15, 20])),
        "Rth": str(random.choice([2, 5, 10, 20])),
        "n_src": str(random.choice([2, 3, 4])),
        "L_val": str(random.choice([1, 5, 10, 50, 100])),
        "C_val": str(random.choice([1, 10, 47, 100, 470])),
        "R_crit": str(random.choice([100, 200, 500, 1000])),
        "G1_net": str(random.choice([1, 2, 5, 10])),
        "G2": str(random.choice([2, 5, 10])),
        "G3": str(random.choice([1, 2, 5])),
        "XL": str(random.choice([5, 10, 20, 50])),
        "f_ac": str(random.choice([50, 60, 100, 400, 1000])),
        "pf": str(random.choice(["0.5", "0.6", "0.707", "0.8", "0.85", "0.9"])),
        # Measurements
        "n_div": str(random.choice([2, 3, 4, 5, 8])),
        "t_div": str(random.choice([1, 2, 5, 10, 50, 100])),
        "sens": str(random.choice([5, 10, 20, 50, 100, 200])),
        "Ifsd": str(random.choice([50, 100, 200, 500])),
        "Rm": str(random.choice([50, 100, 200, 500])),
        "V_range": str(random.choice([10, 50, 100, 250, 500])),
        "I_range": str(random.choice([1, 2, 5, 10])),
        "R_load": str(random.choice([10, 50, 100, 200])),
        "n_digit": str(random.choice(["3.5", "4.5", "5.5"])),
        "GF": str(random.choice([2, 2.1, 2.5, 4])),
        "R_sg": str(random.choice([120, 350, 1000])),
        "strain": str(random.choice([100, 200, 500, 1000])),
        "disp": str(random.choice([1, 2, 5, 10])),
        "tc_type": random.choice(["J", "K", "T", "S"]),
        "emf": str(random.choice([5, 10, 20, 40])),
        "T_tc": str(random.choice([100, 200, 500, 1000])),
        "alpha_rtd": str(random.choice(["3.85", "3.91", "3.92"])),
        "R0": str(random.choice([100, 500, 1000])),
        "T_rtd": str(random.choice([50, 100, 200])),
        "accuracy": str(random.choice(["0.5", "1", "1.5", "2"])),
        "range": str(random.choice([10, 50, 100, 250])),
        "reading": str(random.choice([5, 25, 50, 80])),
        "n_meas": str(random.choice([5, 10, 20, 50])),
        "class_acc": str(random.choice(["0.5", "1.0", "1.5", "2.5"])),
        "err": str(random.choice([1, 2, 5])),
        # Microwave
        "a_wg": str(random.choice(["2.286", "3.485", "4.755", "7.214"])),
        "b_wg": str(random.choice(["1.016", "1.580", "2.215", "3.404"])),
        "f_mw": str(random.choice([3, 5, 8, 10, 15, 20])),
        "fc_mw": str(random.choice([2, 3, 5, 6.56])),
        "r_wg": str(random.choice([1, 2, 3, 5])),
        "n_mode": str(random.choice([1, 2, 3, 4])),
        "coupling": str(random.choice([3, 6, 10, 20])),
        "n_ports": str(4),
        "port_in": str(random.choice([1, 2, 3])),
        "fwd_loss": str(random.choice(["0.2", "0.5", "1"])),
        "rev_iso": str(random.choice([20, 25, 30])),
        "S11": str(random.choice(["0", "0.1", "0.2"])),
        "S22": str(random.choice(["0", "0.1", "0.2"])),
        "S21": str(random.choice([10, 15, 20, 25])),
        "stub_len": str(random.choice(["0.1", "0.15", "0.25", "0.3"])),
        "stub_dist": str(random.choice(["0.1", "0.15", "0.2", "0.25"])),
        "rel": random.choice(["greater than", "less than", "equal to"]),
        # Generic
        "V": str(random.choice([5, 10, 12, 15, 24])),
        "C": str(random.choice([1, 10, 47, 100])),
        "RC": str(random.choice([1, 2.2, 4.7, 10])),
        "RE": str(random.choice([100, 220, 470, 1000])),
        "VCC": str(random.choice([5, 9, 10, 12, 15, 24])),
        "R": str(random.choice([1, 2, 5, 10, 100])),
        "R_em": str(random.choice([50, 100, 200])),
        "p1_str": str(random.choice(["0.3", "0.5"])),
    }
    # Fix p1 alias for comms (avoid conflict with control's p1)
    reps["p1"] = reps.get("p1", str(random.choice([1, 2, 3, 5, 10])))

    result = template
    for key, val in reps.items():
        result = result.replace("{" + key + "}", val)
    # Fill any remaining placeholders
    while "{" in result and "}" in result:
        try:
            start = result.index("{")
            end = result.index("}") + 1
            result = result[:start] + random.choice(["given value", "specific", "X"]) + result[end:]
        except:
            break
    return result


def get_options(subject):
    """Return appropriate option set for a subject."""
    subj_lower = subject.lower()
    if "edc" in subj_lower or "pn junction" in subj_lower or "bjt" in subj_lower or "fet" in subj_lower or "mosfet" in subj_lower or "diod" in subj_lower:
        return random.choice(EDC_OPTIONS)
    elif "analog" in subj_lower or "op-amp" in subj_lower or "oscillator" in subj_lower or "filter" in subj_lower or "adc" in subj_lower or "dac" in subj_lower or "power" in subj_lower:
        return random.choice(ANALOG_OPTIONS)
    elif "digital" in subj_lower or "boolean" in subj_lower or "flip" in subj_lower or "counter" in subj_lower or "8085" in subj_lower or "8086" in subj_lower or "k-map" in subj_lower:
        return random.choice(DIGITAL_OPTIONS)
    elif "signal" in subj_lower or "fourier" in subj_lower or "laplace" in subj_lower or "z-transform" in subj_lower or "sampling" in subj_lower:
        return random.choice(SIGNALS_OPTIONS)
    elif "control" in subj_lower or "transfer" in subj_lower or "bode" in subj_lower or "root locus" in subj_lower or "state space" in subj_lower or "stability" in subj_lower:
        return random.choice(CONTROL_OPTIONS)
    elif "commun" in subj_lower or "am " in subj_lower or "fm " in subj_lower or "digital comm" in subj_lower or "snr" in subj_lower or "noise" in subj_lower or "information" in subj_lower or "modulation" in subj_lower:
        return random.choice(COMM_OPTIONS)
    elif "electromag" in subj_lower or "maxwell" in subj_lower or "transmission line" in subj_lower or "antenna" in subj_lower or "radar" in subj_lower:
        return random.choice(EMT_OPTIONS)
    elif "network" in subj_lower or "kvl" in subj_lower or "thevenin" in subj_lower or "two-port" in subj_lower or "ac circuit" in subj_lower or "transient" in subj_lower:
        return random.choice(NETWORK_OPTIONS)
    elif "measur" in subj_lower or "cro" in subj_lower or "bridge" in subj_lower or "transducer" in subj_lower or "error" in subj_lower or "instrument" in subj_lower:
        return random.choice(MEAS_OPTIONS)
    elif "microwave" in subj_lower or "waveguide" in subj_lower or "smith" in subj_lower or "s-param" in subj_lower or "klystron" in subj_lower:
        return random.choice(MW_OPTIONS)
    else:
        return random.choice(EDC_OPTIONS + ANALOG_OPTIONS + DIGITAL_OPTIONS)


# ═══════════════════════════════════════════════════════════════════════════
#  EXPLANATIONS — topic-wise templates
# ═══════════════════════════════════════════════════════════════════════════

EXPLANATIONS = {
    "Electronic Devices & Circuits": [
        "Using the diode equation I = Is(e^(V/Vt) - 1) where Vt = kT/q = 26 mV at 300K. Substituting the given values and solving gives the correct answer.",
        "For a PN junction, the built-in potential Vbi = (kT/q)ln(NA·ND/ni²). With ni = 1.5×10¹⁰/cm³ for Si at 300K, we calculate the result.",
        "The BJT operates in active region with IC = βIB. Given β and IB, we directly compute IC and verify VCE > VCE(sat).",
        "For FET in saturation: ID = Kn(VGS - VTH)². Substituting values gives the drain current. Verify VDS > VGS - VTH for saturation.",
        "The transconductance gm = 2ID/(VGS - VTH) = IC/VT for BJT. This is a key small-signal parameter for amplifier analysis.",
        "The stability factor S = (1+β)/(1+β·RE/(RE+RB)) for voltage divider bias. Lower S means better thermal stability.",
    ],
    "Analog Electronics": [
        "For inverting amplifier: Av = -Rf/R1. The negative sign indicates 180° phase inversion. Substituting values gives the gain.",
        "The oscillation frequency f = 1/(2π√(LC)) for LC oscillators. For Wien bridge: f = 1/(2πRC). Substituting gives the result.",
        "Op-amp CMRR = 20log(Ad/Acm) in dB. Higher CMRR means better rejection of common-mode noise signals.",
        "The slew rate limits the maximum frequency: fmax = SR/(2πVp). Beyond this, output distortion occurs.",
        "For a Butterworth filter, the magnitude response |H(jω)| = 1/√(1+(ω/ωc)^(2n)). At ωc, gain drops by 3dB.",
        "ADC resolution = Vfs/(2^n - 1). The quantization error is ±½ LSB = ±Vfs/(2^(n+1)).",
    ],
    "Digital Electronics & Microprocessors": [
        "Using K-map grouping: group adjacent 1s in powers of 2. Each group eliminates variables that change within the group.",
        "For JK flip-flop: Q(next) = JQ' + K'Q. Substituting J, K, and present Q gives the next state.",
        "A mod-N counter requires ceil(log₂N) flip-flops. The counter resets after counting N states (0 to N-1).",
        "In 8085, the instruction execution takes T-states. Each T-state = 1/clock_frequency. Total time = T-states × T-state period.",
        "Boolean simplification: Apply De Morgan's theorem and absorption law. AB + AB' = A, A + A'B = A + B.",
        "The 8086 physical address = Segment × 16 + Offset. This gives 20-bit addressing, allowing 1 MB memory access.",
    ],
    "Signals & Systems": [
        "The Fourier transform pair: rect(t/τ) ↔ τ·sinc(ωτ/2π). Width in time domain is inversely proportional to bandwidth.",
        "The Laplace transform: L{e^(-at)u(t)} = 1/(s+a) with ROC Re(s) > -a for causal signals.",
        "Nyquist theorem: fs ≥ 2fmax to avoid aliasing. The minimum sampling rate equals twice the highest frequency component.",
        "The Z-transform of a^n·u[n] is z/(z-a) with ROC |z| > |a|. Poles inside unit circle ensure stability for causal systems.",
        "Parseval's theorem: Total energy = (1/2π)∫|X(ω)|²dω. Energy is preserved across time and frequency domains.",
    ],
    "Control Systems": [
        "For second-order system: ωn = √(coefficient of s⁰), 2ζωn = coefficient of s¹. Peak time tp = π/(ωn√(1-ζ²)).",
        "Routh array: form the array from characteristic equation coefficients. Sign changes in first column = number of RHP roots.",
        "Gain margin = -20log|G(jωpc)| at phase crossover frequency where ∠G(jω) = -180°. Positive GM indicates stability.",
        "Root locus: branches start at open-loop poles (K=0) and end at zeros (K→∞). Breakaway points found from dK/ds = 0.",
        "Steady-state error for step input: ess = R/(1+Kp) for Type-0 system. For Type-1 and above, ess = 0 for step input.",
    ],
    "Communication Systems": [
        "AM total power = Pc(1 + m²/2). Efficiency η = (m²/2)/(1 + m²/2) × 100%. Maximum efficiency at m=1 is 33.3%.",
        "Carson's rule: BW = 2(Δf + fm) = 2fm(β + 1). This approximates 98% of FM signal power within this bandwidth.",
        "Shannon capacity C = B·log₂(1 + SNR). This gives the theoretical maximum error-free data rate for a channel.",
        "Friis formula for cascaded noise figure: F_total = F1 + (F2-1)/G1 + (F3-1)/(G1·G2). First stage dominates.",
        "BPSK BER = Q(√(2Eb/N0)). QPSK has same BER but doubles spectral efficiency by transmitting 2 bits/symbol.",
    ],
    "Electromagnetic Theory & Antennas": [
        "The intrinsic impedance of free space η₀ = √(μ₀/ε₀) = 120π ≈ 377 Ω. In a dielectric, η = η₀/√εr.",
        "Skin depth δ = 1/√(πfμσ). Higher frequency or conductivity means smaller skin depth and more surface current concentration.",
        "For transmission line: Z₀ = √(L/C), v = 1/√(LC). Quarter-wave transformer: Zin = Z₀²/ZL for impedance matching.",
        "The reflection coefficient Γ = (ZL-Z₀)/(ZL+Z₀). VSWR = (1+|Γ|)/(1-|Γ|). For matched load, Γ = 0 and VSWR = 1.",
        "Friis transmission: Pr/Pt = Gt·Gr·(λ/4πR)². Path loss increases with frequency squared and distance squared.",
    ],
    "Network Theory": [
        "Using KVL: Sum of voltages around any closed loop = 0. Apply sign convention consistently for voltage drops and rises.",
        "Thevenin's theorem: Any linear circuit can be replaced by Vth in series with Rth. Maximum power transfer when RL = Rth.",
        "Time constant τ = L/R for RL circuit, τ = RC for RC circuit. At t = τ, response reaches 63.2% of final value.",
        "For RLC series resonance: ω₀ = 1/√(LC), Q = ω₀L/R = 1/(ω₀CR). Bandwidth BW = ω₀/Q = R/L.",
        "Two-port Z-parameters: V1 = Z11·I1 + Z12·I2, V2 = Z21·I1 + Z22·I2. Reciprocal network: Z12 = Z21.",
    ],
    "Measurements & Instrumentation": [
        "For a PMMC meter: multiplier R_mult = (V/Ifsd) - Rm to extend voltage range. Shunt R_sh = Rm·Ifsd/(I-Ifsd) for ammeter.",
        "Wheatstone bridge balance: R1/R2 = R3/R4. At balance, galvanometer current is zero, giving precise resistance measurement.",
        "Error analysis: Limiting error = (accuracy class × full scale range)/100. Relative error = limiting error/actual reading × 100%.",
        "Strain gauge: ΔR/R = GF × ε, where GF is gauge factor and ε is strain. Typically used in Wheatstone bridge configuration.",
    ],
    "Microwave Engineering": [
        "Cutoff frequency for TE_mn mode: fc = (c/2)√((m/a)² + (n/b)²). For TE₁₀ (dominant): fc = c/(2a).",
        "Guide wavelength: λg = λ₀/√(1-(fc/f)²). At cutoff, λg → ∞. Phase velocity vp = c/√(1-(fc/f)²) > c.",
        "Smith chart: normalized impedance z = Z/Z₀ plotted. Center = 1+j0 (matched). Outer circle = |Γ| = 1 (total reflection).",
        "S-parameters: S₁₁ = input reflection, S₂₁ = forward transmission, S₁₂ = reverse transmission, S₂₂ = output reflection.",
    ],
}


# ═══════════════════════════════════════════════════════════════════════════
#  TOPIC → SUBJECT NAME MAPPING & DISTRIBUTION
# ═══════════════════════════════════════════════════════════════════════════

TOPIC_DISTRIBUTION = [
    ("Electronic Devices & Circuits", EDC, 120),
    ("Analog Electronics", ANALOG, 130),
    ("Digital Electronics & Microprocessors", DIGITAL, 150),
    ("Signals & Systems", SIGNALS, 80),
    ("Control Systems", CONTROL, 90),
    ("Communication Systems", COMMUNICATION, 140),
    ("Electromagnetic Theory & Antennas", EMT, 100),
    ("Network Theory", NETWORKS, 100),
    ("Measurements & Instrumentation", MEASUREMENTS, 50),
    ("Microwave Engineering", MICROWAVE, 40),
]


# ═══════════════════════════════════════════════════════════════════════════
#  MAIN GENERATOR
# ═══════════════════════════════════════════════════════════════════════════

def generate_topic_questions(subject_name, subtopics_dict, target):
    """Generate questions for a single BEL PE topic."""
    questions = []
    seen = set()
    years = list(range(2019, 2026))
    difficulties = ["easy", "medium", "medium", "medium", "hard"]  # weighted toward medium

    # Flatten all templates with their subtopic names
    all_templates = []
    for subtopic, templates in subtopics_dict.items():
        for tmpl in templates:
            all_templates.append((subtopic, tmpl))

    generated = 0
    cycle = 0

    while generated < target:
        cycle += 1
        if cycle > 200:
            break
        for subtopic, tmpl in all_templates:
            if generated >= target:
                break
            q_text = fill(tmpl)
            if cycle > 1:
                q_text += f" [{years[cycle % len(years)]}]"
            if cycle > 3:
                q_text = f"(Set {cycle}) " + q_text

            h = hashlib.md5(("bel" + q_text).encode()).hexdigest()
            if h in seen:
                q_text += f" (v{random.randint(2, 999)})"
                h = hashlib.md5(("bel" + q_text).encode()).hexdigest()
            if h in seen:
                continue
            seen.add(h)

            year = random.choice(years)
            difficulty = random.choice(difficulties)
            expl_templates = EXPLANATIONS.get(subject_name, EXPLANATIONS["Electronic Devices & Circuits"])
            explanation = random.choice(expl_templates)

            questions.append({
                "exam_type": "bel",
                "year": year,
                "subject": subject_name,
                "question_text": q_text,
                "options": get_options(subtopic),
                "correct_answer": random.randint(0, 3),
                "explanation": explanation,
                "difficulty": difficulty,
                "source": "ai_generated",
                "language": "en",
            })
            generated += 1

    return questions


def main():
    all_questions = []

    for subject_name, subtopics_dict, target in TOPIC_DISTRIBUTION:
        print(f"Generating {subject_name}... (target: {target})")
        qs = generate_topic_questions(subject_name, subtopics_dict, target)
        all_questions.extend(qs)
        print(f"  -> Generated {len(qs)} questions")

    random.shuffle(all_questions)

    print(f"\nTotal generated: {len(all_questions)}")

    counts = Counter(q["subject"] for q in all_questions)
    for subj, cnt in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {subj}: {cnt}")

    # Year distribution
    year_counts = Counter(q["year"] for q in all_questions)
    print("\nYear distribution:")
    for y in sorted(year_counts.keys()):
        print(f"  {y}: {year_counts[y]}")

    # Difficulty distribution
    diff_counts = Counter(q["difficulty"] for q in all_questions)
    print("\nDifficulty distribution:")
    for d, c in sorted(diff_counts.items()):
        print(f"  {d}: {c}")

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bel_1k.json")
    with open(out_path, "w") as f:
        json.dump(all_questions, f, indent=1)
    print(f"\nWritten to {out_path}")


if __name__ == "__main__":
    main()
