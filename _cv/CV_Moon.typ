#set page(paper: "a4", margin: (x: 1.6cm, y: 1.5cm))
#set text(font: ("Helvetica Neue", "Arial"), size: 9.5pt, fill: rgb("#18181b"))
#set par(leading: 0.6em)

#let accent = rgb("#1a56db")
#let muted = rgb("#6b7280")

#let section(title) = {
  v(0.9em)
  text(size: 11.5pt, weight: "bold", title)
  v(-0.5em)
  line(length: 100%, stroke: 0.6pt + rgb("#d1d5db"))
  v(0.1em)
}

#let entry(dates, body) = {
  grid(
    columns: (3.2cm, 1fr),
    column-gutter: 0.6cm,
    text(size: 8.5pt, weight: "semibold", fill: muted, dates),
    body,
  )
  v(0.45em)
}

// ===== Header =====
#align(center)[
  #text(size: 20pt, weight: "bold", tracking: 0.02em, "HUISEOK MOON")
  #v(-0.4em)
  #text(size: 9pt, fill: muted)[
    Bourg-la-Reine, 92430, France · (+33) 06 83 47 65 35 ·
    #link("mailto:koipo1229@gmail.com")[koipo1229\@gmail.com] ·
    #link("https://github.com/huiseok-moon")[github.com/huiseok-moon] ·
    #link("https://huiseok-moon.github.io")[huiseok-moon.github.io]
  ]
]

#section("Research Interests")
My research combines *Assistive Robotics* and *Physical Human-Robot Interaction*, with the foundation of my experience in the design of clinically validated real-time intent detection frameworks and assistive robotic control based on sensor systems (EMG, IMU, etc.). I am interested in physics-based modeling and simulation, model-based control, and multimodal AI for understanding and predicting human motion, with a focus on mobility assistance for wearable robotics.

#v(0.3em)
*Keywords:* Wearable Robotics, Assistive Robotics, Multimodal Learning, Nonlinear Control

#section("Education")

#entry("Nov 2019 – Jan 2024")[
  *Ph.D. in Signal, Image and Control* — Université Paris-Est Créteil, France \
  #text(fill: muted, size: 8.8pt)[Advisor: Dr. Samer Mohammed] \
  Thesis: _Human-in-the-loop Paradigms for Mobility Assistance Using Powered Exoskeleton_
]

#entry("Mar 2017 – Feb 2019")[
  *M.S. in Mechanical Engineering* — Sogang University, Seoul, South Korea \
  #text(fill: muted, size: 8.8pt)[Advisor: Dr. Kyoungchul Kong] \
  Thesis: _Control Algorithm of a Robotic Leg for Reducing Interaction Force Between a Load and the Human Body_ \
  Graduate research fellowship, Ilwun Science and Technology Foundation (2017–2019)
]

#entry("Mar 2010 – Feb 2017")[
  *B.S. in Robotics (Intelligence System)* — Kwangwoon University, Seoul, South Korea \
  Thesis: _Research on personal mobility using ball balancing robot_
]

#section("Professional Experience")

#entry("Jul 2026 – Present")[
  *Postdoctoral Researcher* — Université Paris-Est Créteil, France
  - Designed a high-precision gait mode recognition system using LSTM networks, achieving 98% classification accuracy and enabling real-time intent detection for actuated ankle-foot orthoses.
  - Developed an energy-efficient adaptive FES control strategy based on surface EMG signals, reducing stimulation energy consumption by 30% while mitigating muscle fatigue in clinical trials.
  - Implemented a multi-sensor fusion framework (7 IMUs) for lower-limb joint analysis and Parkinson's disease diagnosis in a portable clinical device.
]

#entry("Sep 2025 – Mar 2026")[
  *Postdoctoral Researcher* — KAIST, Daejeon, South Korea (Advisor: Dr. Jaegul Choo)
  - Developed physics-informed AI models for human motion intention inference, leveraging motion-primitive representations of wearable IMU signals.
]

#entry("Sep 2023 – Aug 2025")[
  *Research Engineer* — Université Paris-Est Créteil, France
  - Gait mode recognition (LSTM, 98% accuracy) for real-time intent detection on actuated ankle-foot orthoses.
  - Energy-efficient adaptive FES control validated in clinical trials.
  - Multi-sensor fusion framework (7 IMUs) for clinical gait analysis and Parkinson's disease diagnosis.
]

#entry("Nov 2022 – Aug 2023")[
  *ATER (Teaching & Research Assistant)* — Université Paris-Est Créteil, France
  - Undergraduate lectures and hands-on labs on wearable sensor integration (EMG, IMU, FSR) and biomechanical signal processing using Python and MATLAB.
]

#entry("Nov 2019 – Oct 2022")[
  *Research Assistant* — Université Paris-Est Créteil, France
  - Nonlinear control architectures (impedance control, reference tracking) for human-exoskeleton interaction, applied to lower-limb exoskeletons and sit-to-stand assistance robots.
  - Real-time activity recognition pipeline combining Random Forests and deep learning with Kalman-filtered IMU features.
]

#entry("Mar 2017 – Feb 2019")[
  *Research Assistant* — Sogang University, Seoul, South Korea
  - Interaction force control strategies for lower-limb exoskeletons for load-carrying tasks.
]

#section("Publications")

*Journal articles*

#entry("2025")[
  Real-Time LSTM-Driven Dynamic Gait Mode Detection for Enhanced Control of Actuated Ankle-Foot Orthosis. \
  *H. Moon*, O. Bey, A. Boubezoul, L. Oukhellou, S. Mohammed. _IEEE Transactions on Robotics_, 41, 4794–4809.
]

#entry("2023")[
  Fuzzy Convolutional Attention-based GRU Network for Human Activity Recognition. \
  G. Khodabandelou, *H. Moon*, Y. Amirat, S. Mohammed. _Engineering Applications of Artificial Intelligence_, 118, 105702.
]

#entry("2022")[
  Hybrid Half-Gaussian Selectively Adaptive Fuzzy Control of an Actuated Ankle-Foot Orthosis. \
  *H. Moon*, R. Maiti, K. Das Sharma, Y. Amirat, P. Siarry, S. Mohammed. _IEEE Robotics and Automation Letters_, 7, 9635–9642. (ICRA 2023 oral)
]

#entry("2022")[
  An Assistive Explicit Model Predictive Control Framework for a Knee Rehabilitation Exoskeleton. \
  I. Jammeli, A. Chemori, *H. Moon*, S. Elloumi, S. Mohammed. _IEEE/ASME Transactions on Mechatronics_, 27, 3636–3647.
]

#entry("2022")[
  Impedance Modulation Control of a Lower-Limb Exoskeleton to Assist Sit-to-Stand Movements. \
  W. Huo, *H. Moon*, M. A. Alouane, V. Bonnet, J. Huang, Y. Amirat, R. Vaidyanathan, S. Mohammed. _IEEE Transactions on Robotics_, 38, 1230–1249.
]

*Conference proceedings*

#entry("2024")[
  A Novel Funnel-Based L1 Adaptive Fuzzy Approach for the Control of an Actuated Ankle Foot Orthosis. \
  O. Bey, R. Jradi, *H. Moon*, H. Rifai, K. Das Sharma, Y. Amirat, S. Mohammed. _IEEE ICRA_.
]

#entry("2022")[
  Online Human Intention Detection through Machine-learning based Algorithm for the Control of Lower-limbs Wearable Robot. \
  *H. Moon*, A. Boubezoul, L. Oukhellou, Y. Amirat, S. Mohammed. _IEEE-RAS Humanoids_.
]

#entry("2021")[
  A Novel Gait Phase Detection Algorithm for Foot Drop Correction through Optimal Hybrid FES-Orthosis Assistance. \
  P.-G. Jung, W. Huo, *H. Moon*, Y. Amirat, S. Mohammed. _IEEE ICRA_.
]

#section("Academic Service & Teaching")

#entry("Peer review")[IEEE Transactions on Robotics, IROS, ICRA, Engineering Applications of Artificial Intelligence, Mechatronics, etc.]

#entry("Invited talks")[
  2025: REHAssist Visiting Seminar, EPFL (Switzerland) · 2024: LISSI–BIOTN Joint Seminar, UPEC (France) · 2020–2023: LISSI Research Seminars, UPEC (4 sessions).
]

#entry("Volunteering")[
  2025: IFAC World Congress · 2024: IUT Research Day · 2023: Fête de la Science · 2017: Korea Defense Science & Tech Fair.
]

#entry("Teaching")[
  May 2022 – Aug 2023: ATER, UPEC — core Python and multimodal sensor integration (EMG, IMU, FSR).
]

#entry("Mentoring (M.S.)")[
  L. Marusu (2025), A. A. Benhamlaoui (2024), D. Plet (2024), W. Legendre (2023), J. M. Fadous (2022), R. Ravaka & M. Diaby (2021).
]

#section("Skills")

#entry("Programming")[Python, C, C++, MATLAB, LabVIEW, Solidworks]
#entry("Frameworks & tools")[PyTorch, TensorFlow, Simulink]
#entry("Expertise")[Real-time ML deployment, multimodal sensor fusion, embedded systems, adaptive & impedance control, human-robot interaction, wearable robotics, signal processing]
#entry("Languages")[Korean (native), English (fluent), French (basic)]

#section("References")

#entry("Postdoc advisor")[*Jaegul Choo* — Associate Professor, Kim Jaechul Graduate School of AI, KAIST · jchoo\@kaist.ac.kr]
#entry("Ph.D. advisor")[*Samer Mohammed* — Associate Professor, LISSI, Université Paris-Est Créteil · samer.mohammed\@u-pec.fr]
#entry("M.S. advisor")[*Kyungchul Kong* — Associate Professor, KAIST · kckong\@kaist.ac.kr]
