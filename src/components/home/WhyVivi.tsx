import './WhyVivi.css';

const features = [
  {
    number: '01',
    title: (
      <>
        <span>Long-form AI videos</span>, in one click
      </>
    ),
    description:
      'Turn a simple idea into a complete, long-form video. vivi handles the story, scenes, characters and pacing for you.',
    type: 'longform',
  },
  {
    number: '02',
    title: (
      <>
        Characters that <span>stay consistent</span>
      </>
    ),
    description:
      'Keep your characters looking the same across every scene, even as the story, location and camera angle change.',
    type: 'characters',
  },
  {
    number: '03',
    title: (
      <>
        Seamless <span>shot-to-shot continuity</span>
      </>
    ),
    description:
      'Create connected scenes that flow naturally from one shot to the next, without losing the visual thread of your story.',
    type: 'continuity',
  },
  {
    number: '04',
    title: (
      <>
        <span>Cinematic scenes</span>, automatically
      </>
    ),
    description:
      'Generate multiple shots, camera angles and compositions that make your story feel like a real production.',
    type: 'cinematic',
  },
  {
    number: '05',
    title: (
      <>
        <span>Voices & music</span> that fit the story
      </>
    ),
    description:
      'Give every scene the right voice, music, mood and sound — all working together with the story.',
    type: 'audio',
  },
  {
    number: '06',
    title: (
      <>
        <span>Edit your video</span> by chatting
      </>
    ),
    description:
      'Just tell vivi what to change. No timeline, no complicated controls and no editing experience required.',
    type: 'chat',
  },
];

export function WhyVivi() {
  return (
    <section id="why-vivi" className="why-vivi">
      <div className="why-vivi-intro">
        <div className="why-vivi-overline">
          WHY VIVI
        </div>

        <h2>
          From idea to story.
          <br />
          <em>Without the busywork.</em>
        </h2>

        <p>
          vivi takes care of the production details so you can focus on
          the story you want to tell.
        </p>

<div className="why-vivi-create-demo">

  {/* ambient particles */}
  <span className="demo-particle p1" />
  <span className="demo-particle p2" />
  <span className="demo-particle p3" />
  <span className="demo-particle p4" />
  <span className="demo-particle p5" />
  <span className="demo-particle p6" />

  {/* PROMPT */}
  <div className="demo-prompt-card">

    <div className="demo-prompt-top">
      <span>VIVI PROMPT</span>
      <span className="demo-live">
        <i />
        LIVE
      </span>
    </div>

    <div className="demo-prompt-text">
      <span className="typed-line">
        A woman walks through Mumbai at night...
      </span>
      <span className="typed-cursor" />
    </div>

    <div className="demo-prompt-footer">
      <span>cinematic</span>
      <span>emotional</span>
      <span>16:9</span>
    </div>

  </div>


  {/* PROCESSING BEAM */}
  <div className="demo-processing">

    <span className="processing-dot" />

    <div className="processing-line">
      <i />
    </div>

    <span className="processing-label">
      vivi is creating
    </span>

  </div>


  {/* FILM STRIP */}
  <div className="demo-filmstrip">

    <div className="film-frame frame-1">
      <span>01</span>
    </div>

    <div className="film-frame frame-2">
      <span>02</span>
    </div>

    <div className="film-frame frame-3">
      <span>03</span>
    </div>

    <div className="film-frame frame-4">
      <span>04</span>
    </div>

    <div className="film-frame frame-5">
      <span>05</span>
    </div>

    <div className="film-frame frame-6">
      <span>06</span>
    </div>

  </div>


  {/* CAMERA SCAN */}
  <div className="demo-camera">

    <div className="camera-corners">
      <span />
      <span />
      <span />
      <span />
    </div>

    <div className="camera-crosshair">
      <i />
      <i />
    </div>

    <span className="camera-label">
      24 FPS
    </span>

  </div>


  {/* FINAL VIDEO */}
  <div className="demo-video">

    <div className="video-glow" />

    <div className="video-image">

      <div className="video-moon" />

      <div className="video-city">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="video-character">
        <div className="video-character-head" />
        <div className="video-character-body" />
      </div>

      <div className="video-mist" />

    </div>

    <div className="video-ui">

      <span>SCENE 04</span>

      <div className="video-progress">
        <i />
      </div>

      <span>00:08</span>

    </div>

    <div className="video-badge">
      <i />
      VIDEO READY
    </div>

  </div>


  {/* LITTLE STORY LABELS */}
  <div className="demo-label label-prompt">
    <span>01</span>
    YOUR IDEA
  </div>

  <div className="demo-label label-story">
    <span>02</span>
    STORY
  </div>

  <div className="demo-label label-video">
    <span>03</span>
    FINISHED VIDEO
  </div>

</div>
      </div>

      <div className="why-vivi-features">
        {features.map((feature) => (
          <article
            className={`why-vivi-feature why-vivi-feature--${feature.type}`}
            key={feature.number}
          >
            <div className="why-vivi-feature-inner">

              {/* LEFT — COPY */}
              <div className="why-vivi-copy">
                <div className="why-vivi-number">
                  {feature.number}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="why-vivi-line" />
              </div>

              {/* RIGHT — VISUAL */}
              <div className="why-vivi-visual">
                {feature.type === 'longform' && (
                  <LongFormVisual />
                )}

                {feature.type === 'characters' && (
                  <CharactersVisual />
                )}

                {feature.type === 'continuity' && (
                  <ContinuityVisual />
                )}

                {feature.type === 'cinematic' && (
                  <CinematicVisual />
                )}

                {feature.type === 'audio' && (
                  <AudioVisual />
                )}

                {feature.type === 'chat' && (
                  <ChatVisual />
                )}
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


/* =========================================================
   FEATURE 01 — LONG FORM
   ========================================================= */

function LongFormVisual() {
  return (
    <div className="longform-visual">

      <div className="longform-prompt">
        <span className="visual-label">YOUR IDEA</span>

        <p>
          A detective arrives in Mumbai
          on a rainy night...
        </p>

        <span className="prompt-cursor" />
      </div>

      <div className="longform-arrow">→</div>

      <div className="longform-output">

        <div className="output-top">
          <span>VIVI</span>
          <span>08:42</span>
        </div>

        <div className="output-scenes">

          <div className="mini-scene scene-one">
            <span>01</span>
          </div>

          <div className="mini-scene scene-two">
            <span>02</span>
          </div>

          <div className="mini-scene scene-three">
            <span>03</span>
          </div>

          <div className="mini-scene scene-four">
            <span>04</span>
          </div>

        </div>

        <div className="output-footer">
          <span>STORY</span>
          <span>SCENES</span>
          <span>CHARACTERS</span>
          <span>AUDIO</span>
        </div>

      </div>
    </div>
  );
}


/* =========================================================
   FEATURE 02 — CHARACTERS
   ========================================================= */

function CharactersVisual() {
  return (
    <div className="characters-visual">

      <div className="character-scene">
        <span className="scene-number">SCENE 01</span>

        <div className="character character-blue">
          <div className="character-head" />
          <div className="character-body" />
        </div>

        <span className="scene-location">
          MUMBAI · NIGHT
        </span>
      </div>

      <div className="character-connector">
        <span>same character</span>
        <div />
      </div>

      <div className="character-scene">
        <span className="scene-number">SCENE 08</span>

        <div className="character character-blue character-second">
          <div className="character-head" />
          <div className="character-body" />
        </div>

        <span className="scene-location">
          DELHI · MORNING
        </span>
      </div>

      <div className="consistency-pill">
        <span />
        CHARACTER CONSISTENCY
      </div>

    </div>
  );
}


/* =========================================================
   FEATURE 03 — CONTINUITY
   ========================================================= */

function ContinuityVisual() {
  return (
    <div className="continuity-visual">

      <div className="continuity-track">

        <div className="continuity-shot">
          <span>SHOT 01</span>
          <div className="shot-image shot-one" />
          <strong>Wide</strong>
        </div>

        <div className="continuity-link">
          <span />
          <span />
          <span />
        </div>

        <div className="continuity-shot">
          <span>SHOT 02</span>
          <div className="shot-image shot-two" />
          <strong>Medium</strong>
        </div>

        <div className="continuity-link">
          <span />
          <span />
          <span />
        </div>

        <div className="continuity-shot">
          <span>SHOT 03</span>
          <div className="shot-image shot-three" />
          <strong>Close</strong>
        </div>

      </div>

      <div className="continuity-caption">
        <span>CONTINUITY LOCKED</span>
        <div className="continuity-progress">
          <i />
        </div>
      </div>

    </div>
  );
}


/* =========================================================
   FEATURE 04 — CINEMATIC
   ========================================================= */

function CinematicVisual() {
  return (
    <div className="cinematic-visual">

      <div className="cinematic-frame cinematic-frame-large">
        <div className="cinematic-overlay">
          <span>24mm</span>
          <span>WIDE</span>
        </div>
        <div className="cinematic-subject" />
      </div>

      <div className="cinematic-frame cinematic-frame-small top">
        <span>50mm</span>
      </div>

      <div className="cinematic-frame cinematic-frame-small bottom">
        <span>85mm</span>
      </div>

      <div className="cinematic-crosshair">
        <span />
        <span />
      </div>

    </div>
  );
}


/* =========================================================
   FEATURE 05 — AUDIO
   ========================================================= */

function AudioVisual() {
  return (
    <div className="audio-visual">

      <div className="audio-card">

        <div className="audio-header">
          <span>SCENE 04</span>
          <span>00:17</span>
        </div>

        <div className="audio-row">
          <div className="audio-icon">VO</div>

          <div className="audio-info">
            <strong>Detective · Calm</strong>
            <span>Voice</span>
          </div>

          <div className="audio-wave voice-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="audio-row">
          <div className="audio-icon music-icon">♪</div>

          <div className="audio-info">
            <strong>Midnight City</strong>
            <span>Music</span>
          </div>

          <div className="audio-wave music-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="audio-row">
          <div className="audio-icon">FX</div>

          <div className="audio-info">
            <strong>Rain · Street</strong>
            <span>Sound design</span>
          </div>

          <div className="audio-wave fx-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

      </div>

      <div className="audio-tags">
        <span>VOICE</span>
        <span>MUSIC</span>
        <span>MOOD</span>
        <span>SFX</span>
      </div>

    </div>
  );
}


/* =========================================================
   FEATURE 06 — CHAT EDITING
   ========================================================= */

function ChatVisual() {
  return (
    <div className="chat-visual">

      <div className="chat-window">

        <div className="chat-header">
          <span className="chat-dot" />
          VIVI EDITOR
          <span>● LIVE</span>
        </div>

        <div className="chat-content">

          <div className="chat-message user-message">
            Make the scene feel more cinematic.
            Darken the sky and add rain.
          </div>

          <div className="chat-message vivi-message">
            Done. I updated the lighting,
            weather and atmosphere.
          </div>

          <div className="chat-change">
            <div className="change-preview before">
              <span>BEFORE</span>
            </div>

            <div className="change-arrow">→</div>

            <div className="change-preview after">
              <span>AFTER</span>
            </div>
          </div>

        </div>

        <div className="chat-input">
          <span>Tell vivi what to change...</span>
          <b>↑</b>
        </div>

      </div>

    </div>
  );
}