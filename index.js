/* ═══════════════════════════════════════════════════════════
   SPRING FRAMEWORK – INTERAKTIVE PRÄSENTATION
   script.js
═══════════════════════════════════════════════════════════ */

// ── Sprechernotizen ──────────────────────────────────────────
const NOTES = [
    // Slide 1
    "Herzlich willkommen! Heute schauen wir uns Spring an – das beliebteste Java-Framework für Webanwendungen. Ich erkläre die wichtigsten Konzepte Schritt für Schritt, ganz ohne Vorwissen. Ihr werdet sehen: Spring macht Java-Entwicklung viel einfacher!",
    // Slide 2
    "Hier seht ihr unsere Agenda für heute. Wir starten von ganz vorne – was Spring überhaupt ist – und arbeiten uns durch die wichtigsten Konzepte. Spring Boot und REST Controller sind das, womit man in der Praxis täglich arbeitet.",
    // Slide 3
    "Spring ist ein Framework – also ein Gerüst für Java-Anwendungen. Stellt euch vor, ihr baut ein Haus: ihr müsst nicht jeden Stein selbst mischen. Spring liefert euch fertige Bausteine. Es ist seit über 20 Jahren im Einsatz und wird von Netflix, Airbnb und Amazon genutzt.",
    // Slide 4
    "IoC bedeutet: Normalerweise erschafft dein Code selbst alle Objekte, die er braucht. Mit IoC dreht sich das um – Spring übernimmt diese Aufgabe. Wie ein Restaurant: früher musstest du kochen; jetzt bestellst du nur, und die Küche (Spring) liefert dir das fertige Gericht.",
    // Slide 5
    "Dependency Injection ist die praktische Umsetzung von IoC. Statt 'new EmailService()' zu schreiben, setzt du einfach @Autowired drüber – und Spring legt dir das fertige Objekt in die Variable. Wie ein Lieferservice: du sagst 'Ich brauche Pizza', und jemand bringt sie dir.",
    // Slide 6
    "Der Spring Container ist wie ein großes Lager: Er erzeugt beim Start der Anwendung alle Objekte – diese heißen 'Beans'. Wenn dein Code eine Bean braucht, holt er sie vom Container. Du musst dich nie um Erstellung oder Verwaltung kümmern.",
    // Slide 7
    "Spring Boot ist quasi 'Spring mit Autopilot'. Früher musste man dutzende Konfigurationsdateien schreiben. Spring Boot erledigt das alles automatisch. Mit nur dieser einen Klasse habt ihr eine komplett laufende Webanwendung!",
    // Slide 8
    "Ein REST Controller ist die 'Tür' eurer Anwendung nach außen. Wenn ein Browser oder eine App Daten anfragt, landet die Anfrage hier. Mit @GetMapping sagt ihr: 'Bei diesem URL antworte ich mit einer Liste'. Das ist das Grundprinzip hinter jeder modernen API.",
    // Slide 9
    "In einer gut strukturierten Spring-App gibt es drei Schichten: Der Controller empfängt Anfragen, der Service verarbeitet sie, und das Repository speichert oder liest Daten. Diese Trennung macht den Code übersichtlich und wartbar.",
    // Slide 10
    "Herzlichen Glückwunsch – ihr kennt jetzt die wichtigsten Spring-Konzepte! Der beste nächste Schritt ist start.spring.io: dort könnt ihr in 2 Minuten ein neues Spring-Boot-Projekt generieren und direkt loslegen. Habt ihr noch Fragen?",
    // Slide 11
    "Jetzt schauen wir uns Quarkus an – ein modernes Java-Framework, das speziell für Cloud und Microservices entwickelt wurde. Der Fokus liegt auf Geschwindigkeit, Effizienz und einfacher Entwicklung.",
    // Slide 12
    "Quarkus ist ein modernes Java-Framework von Red Hat. Es wurde speziell für Cloud und Microservices entwickelt. Der große Vorteil: Es startet extrem schnell und verbraucht sehr wenig Speicher.",
    // Slide 13
    "Quarkus wird vor allem in Cloud-Umgebungen eingesetzt. Wenn man viele kleine Services hat, ist Geschwindigkeit wichtig – genau da spielt Quarkus seine Stärken aus.",
    // Slide 14
    "Ein großer Unterschied zu Spring: Quarkus macht viele Optimierungen schon beim Build. Außerdem gibt es Live Reload und die Möglichkeit, Native Images zu erstellen.",
    // Slide 15
    "Spring ist der Standard – sehr mächtig und weit verbreitet. Quarkus dagegen ist moderner und schneller. Man könnte sagen: Spring für große Systeme, Quarkus für Cloud-native Apps.",
    // Slide 16
    "Vielen Dank fürs Zuhören! Ihr habt jetzt einen Überblick über Spring und Quarkus. Mein Tipp: Probiert beide Frameworks selbst aus – nur so bekommt man wirklich ein Gefühl dafür. Habt ihr noch Fragen?"
  ];
  
  // ── State ─────────────────────────────────────────────────────
  const slides    = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let current = 0;
  let isAnimating = false;
  
  // ── DOM refs ──────────────────────────────────────────────────
  const prevBtn      = document.getElementById('prevBtn');
  const nextBtn      = document.getElementById('nextBtn');
  const progressBar  = document.getElementById('progressBar');
  const slideCounter = document.getElementById('slideCounter');
  const dotNav       = document.getElementById('dotNav');
  const notesToggle  = document.getElementById('notesToggle');
  const notesPanel   = document.getElementById('notesPanel');
  const notesClose   = document.getElementById('notesClose');
  const notesText    = document.getElementById('notesText');
  
  // ── Build dot nav ─────────────────────────────────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Folie ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotNav.appendChild(dot);
  });
  
  // ── Navigation ────────────────────────────────────────────────
  function goTo(index, direction = 'next') {
    if (isAnimating || index === current || index < 0 || index >= totalSlides) return;
    isAnimating = true;
  
    const outSlide = slides[current];
    const inSlide  = slides[index];
  
    // Determine animation direction
    const goingForward = index > current;
  
    outSlide.classList.add('exit');
  
    // Reset entrance side for incoming slide
    inSlide.style.transform = goingForward
      ? 'translateX(60px) scale(.97)'
      : 'translateX(-60px) scale(.97)';
    inSlide.style.opacity = '0';
    inSlide.style.transition = 'none';
  
    // Tiny delay so browser registers the starting state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inSlide.style.transition = '';
        inSlide.classList.add('active');
  
        current = index;
        updateUI();
  
        // Cleanup after transition
        setTimeout(() => {
          outSlide.classList.remove('active', 'exit');
          inSlide.style.transform = '';
          inSlide.style.opacity   = '';
          isAnimating = false;
        }, 450);
      });
    });
  }
  
  function next() { goTo(current + 1, 'next'); }
  function prev() { goTo(current - 1, 'prev'); }
  
  // ── Update UI helpers ──────────────────────────────────────────
  function updateUI() {
    // Progress bar
    progressBar.style.width = `${((current + 1) / totalSlides) * 100}%`;
  
    // Counter
    slideCounter.textContent = `${current + 1} / ${totalSlides}`;
  
    // Buttons
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === totalSlides - 1;
  
    // Dots
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  
    // Speaker notes
    notesText.textContent = NOTES[current] || '';
  }
  
  // ── Event listeners ────────────────────────────────────────────
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ')  { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                      { e.preventDefault(); prev(); }
    if (e.key === 'Escape') closNotes();
  });
  
  // Touch / swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });
  
  // ── Speaker Notes ──────────────────────────────────────────────
  notesToggle.addEventListener('click', () => {
    notesPanel.classList.toggle('open');
  });
  notesClose.addEventListener('click', closNotes);
  function closNotes() { notesPanel.classList.remove('open'); }
  
  // ── Init ───────────────────────────────────────────────────────
  updateUI();
  slides[0].classList.add('active');